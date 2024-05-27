require("dotenv").config();

const express = require("express");
const app = express();

async function main() {
  app.get("/isAlive", (req, res) => {
    res.status(200).send("listening on port 3000");
  });

  app.listen(
    Number(process.env.PORT),
    console.log(`listening on port ${process.env.PORT}`)
  );
}

main();
