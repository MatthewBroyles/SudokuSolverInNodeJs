const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

const testStrings = require("../controllers/puzzle-strings")
  .puzzlesAndSolutions;

suite('Functional Tests', () => {
  suite("POST requests to /solve", () =>{
    test("Valid puzzle", (done) => {
      chai.request(server)
          .post('/api/solve')
          .send({puzzle: testStrings[0][0]})
          .end((err, res) => {
            if (err) done(err);
            assert.equal(res.status, 200);
            assert.equal(res.body.solution, testStrings[0][1]);
            done();
          });
    });
    test("Missing string", (done) => {
      chai.request(server)
          .post('/api/solve')
          .send({puzzle: ""})
          .end((err, res) => {
            console.log(err);
            console.log(res.body.error);
            assert.equal(res.status, 200);
            assert.equal(res.body.error, "Required field missing")
            done();
          })
    });
    test("Invalid characters", (done) => {
      chai.request(server)
          .post('/api/solve')
          .send({puzzle: "ABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABABA"})
          .end((err, res) => {
            console.log(res.body.error);
            assert.equal(res.status, 200);
            assert.equal(res.body.error,'Invalid characters in puzzle');
            done();
          })
    })
    test("Incorrect Length", (done) => {
      chai.request(server)
          .post('/api/solve')
          .send({puzzle: "1"})
          .end((err, res) => {
            assert.equal(res.status,200);
            console.log(res.body.error);
            assert.equal(res.body.error, "Expected puzzle to be 81 characters long");
            done();
          })
    })
    test("Unsolvable", (done) => {
      chai.request(server)
          .post('/api/solve')
          .send({puzzle: "111111111111111111111111111111111111111111111111111111111111111111111111111111111"})
          .end((err, res) => {
            assert.equal(res.status,200);
            console.log(res.body.error);
            assert.equal(res.body.error,'Puzzle cannot be solved')
            done();
          })
    })
  });
  suite("POST requests to /check", () =>{
    test("All fields", (done) =>{
      chai.request(server)
          .post('/api/check')
          .send({ 
            value: "4",
            coordinate: "B1", 
            puzzle: "123456789........................................................................"})
          .end((err, res) => {
            console.log(res.body.valid, true);
            assert.equal(res.body.valid, true);
            done();
          })
    });
    test("single placement conflict", (done) => {
      chai.request(server)
          .post('/api/check')
          .send({ 
            value: "1",
            coordinate: "I1", 
            puzzle: "123456789........................................................................"})
          .end((err, res) => {
            console.log(res.body.valid);
            assert.equal(res.body.valid, false)
            done();
          })
    })
    test("double placement conflict", (done) => {
      chai.request(server)
          .post('/api/check')
          .send({ 
            value: "1",
            coordinate: "A1", 
            puzzle: ".2345678.1......................................................................."})
          .end((err, res) => {
            console.log(res.body.valid);
            assert.equal(res.body.valid, false)
            done();
          })
    })
    test("all placement conflicts", (done) =>{
      chai.request(server)
          .post('/api/check')
          .send({ 
            value: "1",
            coordinate: "A1", 
            puzzle: ".234567811......................................................................."})
          .end((err, res) => {
            console.log(res.body.valid);
            assert.equal(res.body.valid, false)
            done();
          });
    })
    test("missing fields", (done) => {
      chai.request(server)
          .post('/api/check')
          .send({ 
            value: "1",
            coordinate: "", 
            puzzle: ".234567811......................................................................."})
          .end((err, res) => {
            console.log(res.body);
            assert.equal(res.body.error, 'Required field(s) missing')
            done();
          });
    })
    test("invalid chars", (done) => {
      chai.request(server)
          .post('/api/check')
          .send({ 
            value: "1",
            coordinate: "A1", 
            puzzle: ".B34567811......................................................................."})
          .end((err, res) => {
            console.log(res.body);
            assert.equal(res.body.error, 'Invalid characters in puzzle')
            done();
          });
    })
    test("incorrect length", (done) => {
      chai.request(server)
          .post('/api/check')
          .send({ 
            value: "1",
            coordinate: "A1", 
            puzzle: ".234567811......................................................................"})
          .end((err, res) => {
            console.log(res.body);
            assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
            done();
          });
    })
    test("invalid placement coordinate", (done) => {
      chai.request(server)
          .post('/api/check')
          .send({ 
            value: "1",
            coordinate: "Q1", 
            puzzle: ".234567811......................................................................."})
          .end((err, res) => {
            console.log(res.body);
            assert.equal(res.body.error, 'Invalid coordinate')
            done();
          });
    })
    test("invalid value", (done) => {
      chai.request(server)
          .post('/api/check')
          .send({ 
            value: "Q",
            coordinate: "A1", 
            puzzle: ".234567811......................................................................."})
          .end((err, res) => {
            console.log(res.body);
            assert.equal(res.body.error, 'Invalid value')
            done();
          });
    })
  });
});

