import express from 'express';
const app = express();
import mongo from 'mongodb';
const MongoClient = mongo.MongoClient;
const port = 5173;
//const host = "localhost";
const host = "0.0.0.0";

const NUM_GAMES_RETURNED = 5;

app.use(express.json());
const url = "mongodb+srv://samuelwilensky:mYPfcGTI98Bvc987@samuelwilensky.r3mmr.mongodb.net/?retryWrites=true&w=majority&appName=SamuelWilensky";
const dbconnect = new MongoClient(url);
let db = "gamedecide";
let users = null,
    profiles = null,
    groups = null,
    games = null;

async function getCollections(){
    await dbconnect.connect().then(()=> console.log("Connected!"));
    users = await dbconnect.db(db).collection("users");
    profiles = await dbconnect.db(db).collection("profiles");
    groups = await dbconnect.db(db).collection("groups");
    games = await dbconnect.db(db).collection("games");
}
getCollections();

//#region mongodb queries
async function SendAllGames(res){
    const result = await games.find().toArray();
    res.end(JSON.stringify(result));
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

async function SendAllProfileNames(username, res){
    const result = await profiles.find({username:username.username}).toArray();

    const names = [];
    for(let i=0; i<result.length; i++){
        names.push(result[i].name);
    }
    res.end(JSON.stringify(names));
}

async function SendAllProfiles(res){
    const result = await profiles.find().toArray();
    const profileKeys = [];
    for(let i=0; i<result.length; i++){
        profileKeys.push({username:result[i].username,name:result[i].name});
    }
    res.end(JSON.stringify(profileKeys));
}

async function SendProfile(username, name, res){
    const result = await profiles.findOne({username:username, name:name});
    res.end(JSON.stringify(result));
}

async function DeleteProfile(username, name, res){
    const result = await profiles.deleteOne({username:username, name:name});
    res.end(JSON.stringify(result));
}

async function AttemptUpdateProfile(data){
    const result = await profiles.replaceOne({username:data.username, name:data.name}, data);

    if(result.modifiedCount === 0){
        await insertIntoCollection(data, profiles);
    }
}

async function EditProfile(data){
    const profile = ({username: data.username,
        name: data.name,
        library: data.library,
        favorites: data.favorites,
        blacklist: data.blacklist});
    const result = await profiles.replaceOne({username:data.username, name:data.oldname}, profile);
}

async function SendAllGroupNames(username, res){
    const result = await groups.find({username:username.username}).toArray();
    const names = [];
    for(let i=0; i<result.length; i++){
        names.push(result[i].name);
    }
    res.end(JSON.stringify(names));
}

async function SendGroup(username, name, res){
    const result = await groups.findOne({username:username, name:name});
    res.end(JSON.stringify(result));
}

async function AttemptUpdateGroup(data){
    const result = await groups.replaceOne({username:data.username, name:data.name}, data);

    if(result.modifiedCount === 0){
        await insertIntoCollection(data, groups);
    }
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

        SendAllProfileNames(data, res);
    })
})

app.post("/editprofile", (req, res) => {
    let dataString = ""

    req.on("data", function (data) {

        dataString += data

    })

    req.on("end", function () {
        const data = JSON.parse(dataString);

        SendProfile(data.username, data.name, res);
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
        DeleteProfile(data.username, data.name, res);
    })
});

app.post("/getgroups", (req, res) => {
    let dataString = ""

    req.on("data", function (data) {
        dataString += data

    })

    req.on("end", function () {
        const data = JSON.parse(dataString);

        SendAllGroupNames(data, res);
    })
})

app.post("/editgroup", (req, res) => {
    let dataString = ""

    req.on("data", function (data) {

        dataString += data

    })

    req.on("end", function () {
        const data = JSON.parse(dataString);

        SendGroup(data.username, data.name, res);
    })
})

app.post("/submitgroup", (req, res) => {
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

        AttemptUpdateGroup(data).then(()=>{
            res.end("Submitted");
        })
    })
})




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

        if(data.library === null || data.library === ""){
            res.end("No library found");
            return;
        }

        GenerateGame(data.username, data.group, data.library, data.platform, res);
    })
})

app.post("/getallprofiles", (req, res) => {

    req.on("end", function () {
        SendAllProfiles(res);
    })
})

async function GenerateGame(username, groupname, libraryname, platform, res){
    if(libraryname.username === "" && libraryname.name === "Any"){
        return GenerateFromAnyLibrary(username, groupname, platform, res);
    }

    const group = await groups.findOne({username:username, name:groupname});
    const profile = await profiles.findOne({username:libraryname.username, name:libraryname.name});
    const library = profile.library;

    const profilesInGroup = [];
    const profileList = group.profiles;
    for(let i=0; i<profileList.length; i++){
        const curProfile = await profiles.findOne({username:profileList[i].username, name:profileList[i].name});
        profilesInGroup.push(curProfile);
    }
    const playerCount = profilesInGroup.length;

    const gamesInLibrary = [];
    for(let i=0; i<library.length; i++){
        const curGame = await games.findOne({name:library[i].name, year:library[i].year});
        const validPlayerCount = (curGame.minplayers <= playerCount && curGame.maxplayers >= playerCount);
        const validPlatform = (platform === "Any" || curGame.platform === platform);
        const validOwnership = (curGame.ownership === "Single");

        if(validPlayerCount && validPlatform && validOwnership) {
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

async function GenerateFromAnyLibrary(username, groupname, platform, res){
    const group = await groups.findOne({username:username, name:groupname});
    const profilesInGroup = [];
    const profileList = group.profiles;
    for(let i=0; i<profileList.length; i++){
        const curProfile = await profiles.findOne({username:profileList[i].username, name:profileList[i].name});
        profilesInGroup.push(curProfile);
    }
    const playerCount = profilesInGroup.length;

    const ownedByAny = [];
    const ownedByAll = [];
    let globalBlacklist = [];
    let globalFavorites = [];
    for(let i = 0; i<playerCount; i++){
        const curProfile = profilesInGroup[i];
        if(i === 0){
            globalBlacklist = curProfile.blacklist;
            globalFavorites = curProfile.favorites;
        }
        else{
            globalBlacklist.concat(profilesInGroup[i].blacklist);
            globalFavorites.concat(profilesInGroup[i].favorites);
        }

        const curLibrary = curProfile.library;
        for(let j = 0; j<curLibrary.length; j++){
            const curGame = await games.findOne({name:curLibrary[j].name, year:curLibrary[j].year});
            const validPlayerCount = (curGame.minplayers <= playerCount && curGame.maxplayers >= playerCount);
            const validPlatform = (platform === "Any" || curGame.platform === platform);
            if(validPlayerCount && validPlatform){
                if(curGame.ownership === "Any"){
                    ownedByAny.push(curGame);
                }
                else if(curGame.ownership === "All"){
                    ownedByAll.push(curGame);
                }
            }
        }
    }

    const globalLibrary = ownedByAny;
    ownedByAll.sort((a, b) => a.name.localeCompare(b.name)); //alphabetical order, putting duplicate games next to each other

    for(let i=0; i<ownedByAll.length; i++) {
        let curGame = ownedByAll[i];

        let everyoneOwns = true;
        for (let j = i; j < playerCount; j++) {
            if (j >= ownedByAll[j].length) {
                i = j;
                everyoneOwns = false;
                break;
            }

            if (ownedByAll[j] !== ownedByAll[i]) { //if there are not enough of the same game for everyone to own it
                i = j; //the current game is not a duplicate of a previous one, so jump to it
                everyoneOwns = false;
                break;
            }
        }

        if (everyoneOwns) {
            i+=playerCount; //there were playerCount copies of the game, so the next unique game is playerCount indices away
            globalLibrary.push(curGame);
        }
    }


    const selectedGames = SelectValidGames(globalLibrary, globalBlacklist, globalFavorites);

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
            if(curGame === blacklist[j]){
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
            if(curGame === favorites[j]){
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

app.listen(process.env.PORT || port, host,() => {
    console.log("Server running on port: " + port);
});
