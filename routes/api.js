'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let value = req.body.value;
      let coordinate = req.body.coordinate;
      let puzzle = req.body.puzzle;
      if(!value || !coordinate || !puzzle){
        return res.json({error: 'Required field(s) missing'})
      }
      let temp = coordinate.split('');
      if(temp[0] == 'A' || temp[0] == 'B' || temp[0] == 'C' || temp[0] == 'D' || temp[0] == 'E' || temp[0] == 'F' || temp[0] == 'G' || temp[0] == 'H' || temp[0] == 'I'){
        switch (temp[0]) {
          case 'A':
            temp[0] = 0;
            break;
          case 'B':
            temp[0] = 1;
            break;
          case 'C':
            temp[0] = 2;
            break;
          case 'D':
            temp[0] = 3;
            break;
          case 'E':
            temp[0] = 4;
            break;
          case 'F':
            temp[0] = 5;
            break;
          case 'G':
            temp[0] = 6;
            break;
          case 'H':
            temp[0] = 7;
            break;
          case 'I':
            temp[0] = 8;
            break;
          
        }
      } else{
        return res.json({error: 'Invalid coordinate'})
      }
      if(temp[1] == 1 || temp[1] == 2 || temp[1] == 3 || temp[1] == 4 || temp[1] == 5 || temp[1] == 6 || temp[1] == 7 || temp[1] == 8 || temp[1] == 9){
        temp[1] -= 1;
      } else{
        return res.json({error: 'Invalid coordinate'})
      }
      console.log(temp);
      if(value == 1 || value == 2 || value == 3 || value == 4 || value == 5 || value == 6 || value == 7 || value == 8 || value == 9){
      } else{
        return res.json({error: 'Invalid value'})
      }
      if(puzzle.length!=81){
        return res.json({ error: 'Expected puzzle to be 81 characters long'})
      }

      var tempy = puzzle.split('');
      for(let i=0; i<tempy.length;i++){
        switch (tempy[i]) {
          case '.':
            break;
          case '1':
            break;
          case '2':
            break;
          case '3':
            break;
          case '4':
            break;
          case '5':
            break;
          case '6':
            break;
          case '7':
            break;
          case '8':
            break;
          case '9':
            break;
          default:
            return res.json({error: "Invalid characters in puzzle"});
        }
      }
      const conflictArray = [];
      solver.setGrid(puzzle);
      solver.grid[temp[0]][temp[1]] = value;
      if(solver.validate(solver.grid)){
        return res.json({valid: true});
      } else{
        if(!solver.checkRowPlacement(solver.grid)){
          conflictArray.push("row")
        }
        if(!solver.checkColPlacement(solver.grid)){
          conflictArray.push("column");
        }
        if(!solver.checkRegionPlacement(solver.grid)){
          conflictArray.push("region");
        }
        return res.json({valid: false , conflict : conflictArray});
      }
      res.json({fuck: 'You'});
      console.log(req.body);
      console.log(res);
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      console.log(req.body.puzzle);
      const puzzle = req.body.puzzle;
      if (!puzzle || puzzle == '') {
        console.log('yahoo');
        return res.json({ error: "Required field missing" });
      }
      console.log(puzzle.length);
      if(puzzle.length!=81){
        return res.json({ error: 'Expected puzzle to be 81 characters long'})
      }
      var temp = puzzle.split('');
      for(let i=0; i<temp.length;i++){
        switch (temp[i]) {
          case '.':
            break;
          case '1':
            break;
          case '2':
            break;
          case '3':
            break;
          case '4':
            break;
          case '5':
            break;
          case '6':
            break;
          case '7':
            break;
          case '8':
            break;
          case '9':
            break;
          default:
            return res.json({error: "Invalid characters in puzzle"});
        }
      }


      solver.setGrid(puzzle);
      if(!solver.validate(solver.grid)){
        return res.json({ error: "Puzzle cannot be solved"})
      }
      solver.solve();
      console.log({solver: solver.getGrid()});
      req.body.puzzle = solver.getGrid();
      return res.json({solution: solver.getGrid()});
    });
};
