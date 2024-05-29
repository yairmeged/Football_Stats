const { MongoClient, ObjectId } = require("mongodb");

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

async function getPlayers() {
  return await playersCol.find({}).toArray();
}

async function deletePlayer(playerId) {
  const isDeleted = await playersCol.deleteOne({
    _id: new ObjectId(playerId),
  });
  if (isDeleted.deletedCount === 0) throw new Error("no such player");
}

async function test() {
  throw new Error("bad");
}

module.exports = { connectDB, addPlayer, deletePlayer, getPlayers, test };
