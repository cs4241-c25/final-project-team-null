import express from 'express';
const app = express();
import ViteExpress from 'vite-express';
import mongo from 'mongodb';
import path from 'path';
import 'dotenv/config';
const MongoClient = mongo.MongoClient;
const port = 3000;
//const host = "localhost";
const host = "0.0.0.0";
let username="guest";


const NUM_GAMES_RETURNED = 5;

app.use(express.json());
const url = "mongodb+srv://samuelwilensky:mYPfcGTI98Bvc987@samuelwilensky.r3mmr.mongodb.net/?retryWrites=true&w=majority&appName=SamuelWilensky";
const dbconnect = new MongoClient(url);
let db = "sfs";
let profiles = null,
    games = null;




async function getCollections(){
    await dbconnect.connect().then(()=> console.log("Connected!"));
    profiles = await dbconnect.db(db).collection("profiles");
    games = await dbconnect.db(db).collection("games");
}
getCollections();


//#region mongodb queries
async function SendAllGames(res){
    const result = await games.find().toArray();
    res.end(JSON.stringify(result));
}

async function GetAllGames(){
    const result = await games.find().toArray();
    return result;
}

async function insertIntoCollection(data, collection){
    await collection.insertOne(data);
}

async function AttemptUpdateGame(data){
    const result = await games.replaceOne({name:data.name, year:data.year}, data);

    if(result.modifiedCount === 0){
        await insertIntoCollection(data, games);
    }
}

async function EditGame(data){
    const game = ({
        name: data.name,
        description: data.description,
        year: data.year,
        platform: data.platform,
        ownership: data.ownership,
        minplayers: data.minplayers,
        maxplayers: data.maxplayers});
    const result = await games.replaceOne({name:data.oldname, year:data.oldyear}, game);
}

async function DeleteGame(name, year, res){
    const result = await games.deleteOne({name:name, year:year});
    res.end(JSON.stringify(result));
}

async function SendAllProfiles(res){
    const result = await profiles.find().toArray();
    const profileKeys = [];
    for(let i=0; i<result.length; i++){
        profileKeys.push({name:result[i].name});
    }
    res.end(JSON.stringify(profileKeys));
}

async function SendProfile(name, res){
    const result = await profiles.findOne({name:name});
    res.end(JSON.stringify(result));
}

async function DeleteProfile(name, res){
    const result = await profiles.deleteOne({name:name});
    res.end(JSON.stringify(result));
}

async function AttemptUpdateProfile(data){
    const result = await profiles.replaceOne({name:data.name}, data);

    if(result.modifiedCount === 0){
        await insertIntoCollection(data, profiles);
    }
}

async function EditProfile(data){
    const profile = ({
        name: data.name,
        library: data.library,
        favorites: data.favorites,
        blacklist: data.blacklist});
    const result = await profiles.replaceOne({name:data.oldname}, profile);
}
//#endregion

app.post("/findgame", (req, res) => {
    SendAllGames(res);
})

app.post("/submitgame", (req, res) => {
    console.log("submitgame");

    let dataString = ""

    req.on("data", function (data) {

        dataString += data

    })

    req.on("end", function () {
        const data = JSON.parse(dataString);

        if(data.name === null || data.name === ""){
            res.end("Not submitted");
            return;
        }

        if(data.year === null || data.year === ""){
            data.year = "none";
        }

        AttemptUpdateGame(data).then(()=>{
            res.end("Submitted");
        })

    })

})

app.post("/updategame", (req, res) => {
    let dataString = ""

    req.on("data", function (data) {
        dataString += data

    })

    req.on("end", function () {
        const data = JSON.parse(dataString);

        if(data.name === null || data.name === ""){
            res.end("Not submitted");
            return;
        }

        if(data.year === null || data.year === ""){
            data.year = "none";
        }

        EditGame(data).then(()=>{
            res.end("Submitted");
        })
    })
})

app.delete("/deletegame", async (req, res) => {
    let dataString = ""

    req.on("data", async function (data) {
        dataString += data
    })

    req.on("end", function () {
        const data = JSON.parse(dataString);
        DeleteGame(data.name, data.year, res);
    })
});

app.post("/getprofiles", (req, res) => {
    let dataString = ""

    req.on("data", function (data) {
        dataString += data

    })

    req.on("end", function () {
        const data = JSON.parse(dataString);

        SendAllProfiles(res);
    })
})

app.post("/editprofile", (req, res) => {
    let dataString = ""

    req.on("data", function (data) {

        dataString += data

    })

    req.on("end", function () {
        const data = JSON.parse(dataString);

        SendProfile(data.name, res);
    })
})

app.post("/submitprofile", (req, res) => {
    let dataString = ""

    req.on("data", function (data) {
        dataString += data

    })

    req.on("end", function () {
        const data = JSON.parse(dataString);

        if(data.name === null || data.name === ""){
            res.end("Not submitted");
            return;
        }

        AttemptUpdateProfile(data).then(()=>{
            res.end("Submitted");
        })
    })
})

app.post("/updateprofile", (req, res) => {
    let dataString = ""

    req.on("data", function (data) {
        dataString += data

    })

    req.on("end", function () {
        const data = JSON.parse(dataString);

        if(data.name === null || data.name === ""){
            res.end("Not updated");
            return;
        }

        EditProfile(data).then(()=>{
            res.end("Submitted");
        })
    })
})

app.delete("/deleteprofile", async (req, res) => {
    let dataString = ""

    req.on("data", async function (data) {
        dataString += data
    })

    req.on("end", function () {
        const data = JSON.parse(dataString);
        DeleteProfile(data.name, res);
    })
});

app.post("/generate", (req, res) => {
    let dataString = ""

    req.on("data", function (data) {

        dataString += data

    })

    req.on("end", function () {
        const data = JSON.parse(dataString);

        if(data.group === null || data.group === ""){
            res.end("No group found");
            return;
        }

        GenerateGame(data.group, res);
    })
})

app.post("/getallprofiles", (req, res) => {
    SendAllProfiles(res);
})

async function GenerateGame(group, res){
    const library = GetAllGames();

    const profilesInGroup = [];
    for(let i=0; i<group.length; i++){
        const curProfile = await profiles.findOne({name:group[i].name});
        profilesInGroup.push(curProfile);
    }
    const playerCount = profilesInGroup.length;

    const gamesInLibrary = [];
    for(let i=0; i<library.length; i++){
        const curGame = await games.findOne({name:library[i].name});
        const validPlayerCount = (curGame.minplayers <= playerCount && curGame.maxplayers >= playerCount);

        if(validPlayerCount) {
            gamesInLibrary.push(curGame);
        }
    }

    let globalBlacklist = [];
    let globalFavorites = [];
    for(let i = 0; i<profilesInGroup.length; i++){
        if(i === 0){
            globalBlacklist = profilesInGroup[i].blacklist;
            globalFavorites = profilesInGroup[i].favorites;
        }
        else{
            globalBlacklist.concat(profilesInGroup[i].blacklist);
            globalFavorites.concat(profilesInGroup[i].favorites);
        }
    }

    const selectedGames = SelectValidGames(gamesInLibrary, globalBlacklist, globalFavorites);

    res.end(JSON.stringify(selectedGames));
}

function SelectValidGames(games, blacklist, favorites){
    const validGames = [];
    const gameWeights = []; //parallel arrays

    let totalWeight = 0;
    for(let i = 0; i<games.length; i++){
        const curGame = games[i];
        let valid = true;
        for(let j = 0; j<blacklist.length; j++){
            if(curGame.name === blacklist[j].name){
                valid = false;
                break;
            }
        }

        if(valid){
            validGames.push(curGame);
            gameWeights.push(0);
        }
    }

    for(let i = 0; i<validGames.length; i++){
        const curGame = validGames[i];
        let gameWeight = 1;
        for(let j = 0; j<favorites.length; j++){
            if(curGame.name === favorites[j].name){
                gameWeight++;
            }
        }
        gameWeights[i] = gameWeight;
        totalWeight += gameWeight;
    }

    if(totalWeight <= NUM_GAMES_RETURNED){
        return validGames;
    }

    const selectedWeights = [];
    const selectedGames = [];
    for(let i = 0; i<NUM_GAMES_RETURNED; i++){
        let validWeight = false;
        let randomWeight = -1;
        while(!validWeight){
            randomWeight = Math.floor(Math.random()*(totalWeight-1));
            randomWeight++;
            validWeight = true;
            for(let j=0; j<selectedWeights.length; j++){
                if(randomWeight === selectedWeights[j]){
                    validWeight = false;
                    break;
                }
            }
        }
        selectedWeights[i]=randomWeight;
    }
    selectedWeights.sort((a, b)=>{return a - b});

    let curWeightIndex = 0;
    let curWeightTotal = 0;
    for(let i = 0; i<gameWeights.length; i++){
        curWeightTotal += gameWeights[i];
        if(curWeightTotal >= selectedWeights[curWeightIndex]){
            curWeightIndex++;
            selectedGames.push(validGames[i]);
        }
    }

    return selectedGames;
}


app.use(express.static('../frontend/dist'));

app.get("*", (req,res)=>{
    res.sendFile(path.join(import.meta.dirname, '..','frontend','dist','index.html'))
})

ViteExpress.listen(app, port, () => {
    console.log("Server running on port: " + port);
});

