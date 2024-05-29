require("dotenv").config();

const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const dbHandler = require("./db/dbHandler.js");
const { playerSchema } = require("./validations/schema.js");

async function main() {
  app.use(bodyParser.json());

  await dbHandler.connectDB();

  app.get("/isAlive", (req, res) => {
    res.status(200).send("listening on port 3000");
  });

  app.get("/getPlayers", async (req, res) => {
    try {
      const playersDetails = await dbHandler.getPlayers();

      res.status(200).send(playersDetails);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.post("/addPlayer", async (req, res) => {
    try {
      const { error, value } = playerSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);

      await dbHandler.addPlayer(req.body);

      res.status(200).send("player has added");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.delete("/deletePlayer/:playerIdString", async (req, res) => {
    try {
      await dbHandler.deletePlayer(req.params.playerIdString);

      res.status(200).send("player has deleted");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  // app.patch("/setPlayer", async (req, res) => {
  //   try {
  //     const { error, value } = playerSchema.validate(req.body);
  //     if (error) throw new Error(error.details[0].message);

  //     dbHandler.setPlayer(req.body);

  //     res.status(200).send("player has setted");
  //   } catch (error) {
  //     res.status(400).send(error.message);
  //   }
  // });

  app.listen(
    Number(process.env.PORT),
    console.log(`listening on port ${process.env.PORT}`)
  );
}

main();

module.exports = { app };
