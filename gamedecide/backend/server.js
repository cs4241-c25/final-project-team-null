import express from 'express';
const app = express();
import mongo from 'mongodb';
const MongoClient = mongo.MongoClient;

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