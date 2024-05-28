const { MongoClient } = require("mongodb");

const dbClient = new MongoClient(process.env.DB_URL);
let playersCol; //collections of the db

async function connectDB() {
  try {
    await dbClient.connect();
    playersCol = dbClient
      .db(process.env.DB_NAME)
      .collection(process.env.PLAYERS_COLLECTION);
    console.log("Connected successfully to db");
  } catch (error) {
    throw error;
  }
}

async function addPlayer(playerData) {
  await playersCol.insertOne(playerData);
}

module.exports = { connectDB, addPlayer };
