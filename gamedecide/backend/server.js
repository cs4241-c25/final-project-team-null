import express from 'express';
const app = express();
import mongo from 'mongodb';
const MongoClient = mongo.MongoClient;
const port = 3000;

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

async function SendAllProfileNames(username, res){
    const result = await profiles.find({username:username.username}).toArray();

    const names = [];
    for(let i=0; i<result.length; i++){
        names.push(result[i].name);
    }
    res.end(JSON.stringify(names));
}

async function SendProfile(username, name, res){
    const result = await profiles.findOne({username:username, name:name});
    res.end(JSON.stringify(result));
}

async function AttemptUpdateProfile(data){
    const result = await profiles.replaceOne({username:data.username, name:data.name}, data);

    if(result.modifiedCount === 0){
        await insertIntoCollection(data, profiles);
    }
}

async function SendAllGroupNames(username, res){
    const result = await groups.find({username:username}).toArray();
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

app.listen(port, () => {
    console.log("Server running on port: " + port);
});