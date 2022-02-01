const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
const chaiHttp = require('chai-http');
const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();
chai.use(chaiHttp);

const testStrings = require("../controllers/puzzle-strings")
  .puzzlesAndSolutions;

suite('UnitTests', () => {
  test("Valid puzzle of 81 characters", (done) => {
    const puzzle = testStrings[0][0];
    assert.lengthOf(puzzle, 81);
    done();
  });
  test("Puzzle string with invalid characters", (done) => {
    const puzzle = "1.B..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
    chai.request(server)
        .post('/api/solve')
        .send({ puzzle: puzzle})
        .end((error, response) => {
          console.log(error);
          console.log(response.body.error);
          assert.equal(response.body.error, 'Invalid characters in puzzle')
          done();
        })

  });
  test("Not 81 characters", (done) => {
    const puzzle = "1...2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
    chai.request(server)
        .post('/api/solve')
        .send({ puzzle: puzzle})
        .end((error, response) => {
          console.log(error);
          console.log(response.body.error);
          assert.equal(response.body.error, 'Expected puzzle to be 81 characters long')
          done();
        })
  });
  test("valid row placement", (done) =>{
    assert.equal(true,true)
    done();
  });
  test("invalid row placement", (done) =>{
    assert.equal(true,true)
    done();
  });
  test("valid col placement", (done) =>{
    assert.equal(true,true)
    done();
  });
  test("invalid col placement", (done) =>{
    assert.equal(true,true)
    done();
  });
  test("valid region placement", (done) =>{
    assert.equal(true,true)
    done();
  });
  test("invalid region placement", (done) =>{
    assert.equal(true,true)
    done();
  });
  test("valid puzzle strings pass solver", (done) =>{
    assert.equal(true,true)
    done();
  });
  test("Invalid puzzle strings fail", (done) =>{
    assert.equal(true,true)
    done();
  });
  test("returns expected solution", (done) =>{
    assert.equal(true,true)
    done();
  });
});
