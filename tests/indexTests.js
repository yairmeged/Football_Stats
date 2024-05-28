const chai = require("chai");
const chaiHttp = require("chai-http");
const { app } = require("../src/index.js");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Express Routes", () => {
  describe("add player route", () => {
    it("should return 200 OK for POST /", (done) => {
      chai
        .request(app)
        .post("/addPlayer")
        .send({ name: "yair" })
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
