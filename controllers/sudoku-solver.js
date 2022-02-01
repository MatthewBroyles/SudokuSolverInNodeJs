class SudokuSolver {

  
  setGrid(grid){
    const stringGrid = grid;
    const arrayGrid = stringGrid.split("");
    let finalGrid = [];
    finalGrid.push(arrayGrid.slice(0,9));
    finalGrid.push(arrayGrid.slice(9,18));
    finalGrid.push(arrayGrid.slice(18,27));
    finalGrid.push(arrayGrid.slice(27,36));
    finalGrid.push(arrayGrid.slice(36,45));
    finalGrid.push(arrayGrid.slice(45,54));
    finalGrid.push(arrayGrid.slice(54,63));
    finalGrid.push(arrayGrid.slice(63,72));
    finalGrid.push(arrayGrid.slice(72,81));
    for(var i=0; i<9; i++){
      for(var u=0; u<9; u++){
        if(finalGrid[i][u] == '.'){
          finalGrid[i][u] = 0;
        } else {
          finalGrid[i][u] = parseInt(finalGrid[i][u]);
        }
      }
    }
    console.log(finalGrid);
    this.grid = finalGrid;
  }
  getGrid(){
    return this.grid.toString('').replace(/,/g,'');
  }
  validate(base) {
    if(this.checkRowPlacement(base) && this.checkColPlacement(base) && this.checkRegionPlacement(base)){
      return true;
    } else{
      return false;
    }
  }

  validatebase(transposed){
    for(let x=0; x<9; x++){
            let oneFound = false;
            let twoFound = false;
            let threeFound = false;
            let fourFound = false;
            let fiveFound = false;
            let sixFound = false;
            let sevenFound = false;
            let eightFound = false;
            let nineFound = false;
            for(let y = 0; y<9; y++){
                if(transposed[x][y] == 1){
                    if(oneFound){
                        return false;
                    }
                    oneFound = true;
                } else if(transposed[x][y] == 2){
                    if(twoFound){
                        return false;
                    }
                    twoFound = true;
                } else if(transposed[x][y] == 3){
                    if(threeFound){
                        return false;
                    }
                    threeFound = true;
                } else if(transposed[x][y] == 4){
                    if(fourFound){
                        return false;
                    }
                    fourFound = true;
                } else if(transposed[x][y] == 5){
                    if(fiveFound){
                        return false;
                    }
                    fiveFound = true;
                } else if(transposed[x][y] == 6){
                    if(sixFound){
                        return false;
                    }
                    sixFound = true;
                } else if(transposed[x][y] == 7){
                    if(sevenFound){
                        return false;
                    }
                    sevenFound = true;
                } else if(transposed[x][y] == 8){
                    if(eightFound){
                        return false;
                    }
                    eightFound = true;
                } else if(transposed[x][y] == 9){
                    if(nineFound){
                        return false;
                    }
                    nineFound = true;
                }
            }
        }
        return true;
  }

  checkRowPlacement(base) {
    return this.validatebase(base);
  }

  checkColPlacement(base) {
    var transposed = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
    for(let x=0; x<9; x++){
      for(let y=0; y<9; y++){
        transposed[y][x] = base[x][y];
      }
    }
    return this.validatebase(transposed);
  }

  checkRegionPlacement(base) {
    var transposed = [
      [base[0][0],base[0][1],base[0][2],base[1][0],base[1][1],base[1][2],base[2][0],base[2][1],base[2][2]],
      [base[3][0],base[3][1],base[3][2],base[4][0],base[4][1],base[4][2],base[5][0],base[5][1],base[5][2]],
      [base[6][0],base[6][1],base[6][2],base[7][0],base[7][1],base[7][2],base[8][0],base[8][1],base[8][2]],
      [base[0][3],base[0][4],base[0][5],base[1][3],base[1][4],base[1][5],base[2][3],base[2][4],base[2][5]],
      [base[3][3],base[3][4],base[3][5],base[4][3],base[4][4],base[4][5],base[5][3],base[5][4],base[5][5]],
      [base[6][3],base[6][4],base[6][5],base[7][3],base[7][4],base[7][5],base[8][3],base[8][4],base[8][5]],
      [base[0][6],base[0][7],base[0][8],base[1][6],base[1][7],base[1][8],base[2][6],base[2][7],base[2][8]],
      [base[3][6],base[3][7],base[3][8],base[4][6],base[4][7],base[4][8],base[5][6],base[5][7],base[5][8]],
      [base[6][6],base[6][7],base[6][8],base[7][6],base[7][7],base[7][8],base[8][6],base[8][7],base[8][8]]
    ]
    return this.validatebase(transposed);
  }

  transposeValidToSquares(base){
  var transposed = [
                [base[0][0],base[0][1],base[0][2],base[1][0],base[1][1],base[1][2],base[2][0],base[2][1],base[2][2]],
                [base[3][0],base[3][1],base[3][2],base[4][0],base[4][1],base[4][2],base[5][0],base[5][1],base[5][2]],
                [base[6][0],base[6][1],base[6][2],base[7][0],base[7][1],base[7][2],base[8][0],base[8][1],base[8][2]],
                [base[0][3],base[0][4],base[0][5],base[1][3],base[1][4],base[1][5],base[2][3],base[2][4],base[2][5]],
                [base[3][3],base[3][4],base[3][5],base[4][3],base[4][4],base[4][5],base[5][3],base[5][4],base[5][5]],
                [base[6][3],base[6][4],base[6][5],base[7][3],base[7][4],base[7][5],base[8][3],base[8][4],base[8][5]],
                [base[0][6],base[0][7],base[0][8],base[1][6],base[1][7],base[1][8],base[2][6],base[2][7],base[2][8]],
                [base[3][6],base[3][7],base[3][8],base[4][6],base[4][7],base[4][8],base[5][6],base[5][7],base[5][8]],
                [base[6][6],base[6][7],base[6][8],base[7][6],base[7][7],base[7][8],base[8][6],base[8][7],base[8][8]]
      ]
  }

  solve() {

    for (let x=0; x<9; x++){
      for(let y=0; y<9; y++){
        if(this.grid[x][y] == 0){
          for(let i=1; i<10; i++){
            this.grid[x][y] = i;
            if(this.validate(this.grid)){
              if(this.solve()){
                return true;
              } else{
                this.grid[x][y] = 0;
              }
            }
            this.grid[x][y] = 0;
          }
          return false;
        }
      }
    }
    return true;

  }

}

module.exports = SudokuSolver;

