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

  app.post("/addPlayer", (req, res) => {
    try {
      const { error, value } = playerSchema.validate(req.body);
      if (error) throw new Error(error.details[0].message);

      dbHandler.addPlayer(req.body);

      res.status(200).send("player added");
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

  app.listen(
    Number(process.env.PORT),
    console.log(`listening on port ${process.env.PORT}`)
  );
}

main();

module.exports = { app };
