class Matrix{
    constructor(){
        this.sideMatrix = 3;
        this.matrix = [];
        this.isGameOver = false;
        this.winner = false;
        for(let i=0; i<this.sideMatrix; i++){
            this.matrix.push(Array(this.sideMatrix).fill(0));
        }
    }
    initialize(){
        this.matrix = [];
        this.winner = false;
        this.isGameOver = false;
        for(let i=0; i<this.sideMatrix; i++){
                this.matrix.push(Array(this.sideMatrix).fill(0));
        }
    }
        //mark  matrix's element
    markMatrixElement(x, y, mark){
        this.matrix[x][y] = mark;
    }
}
    
    //init matrix
class Matrix_fucs{

    searchVertical(matrix, sideMatrix){
        let sampleMark,currentMark;
        let i,j
        for(j=0; j<sideMatrix ; j++){
            sampleMark = matrix[0][j];
            currentMark = sampleMark;
            for(i=0; i<sideMatrix ; i++){
                currentMark = matrix[i][j];
                if(currentMark != sampleMark || currentMark == 0)break;
            }
            if(i === sideMatrix)return{"isGameOver":true,"winner":currentMark} 
        }
        return {"isGameOver":false,"winner":0}
    }

    searchHorizontal(matrix, sideMatrix){
        let sampleMark, currentMark;
        let i,j;
        for(i=0; i<sideMatrix; i++){
            sampleMark = matrix[i][0];
            for(j=0; j<sideMatrix ; j++){
                currentMark = matrix[i][j];
                if(currentMark != sampleMark || currentMark == 0)break;
            }
            //complete the loop
            if(j === sideMatrix)return{"isGameOver":true,"winner":currentMark} 
        }
        
        return {"isGameOver":false,"winner":0}
    }

    searchDiagonalLeftUpperToRightDown(matrix, sideMatrix){
        let sampleMark, currentMark;
        let i,j;
        sampleMark = matrix[0][0];
        for(i=0; i<sideMatrix; i++){
            currentMark = matrix[i][i]
            if(currentMark != sampleMark || currentMark == 0)break;
        }
        //complete the loop 
        if(i === sideMatrix)return{"isGameOver":true,"winner":currentMark}
        else return{"isGameOver":false,"winner":0}
    }

    searchDiagonalLeftDownToRightUpper(matrix, sideMatrix){
        let sampleMark, currentMark;
        let i,j;
        sampleMark = matrix[sideMatrix - 1][0]
        for(i=0; i<sideMatrix; i++){
            currentMark = matrix[sideMatrix - 1 -i][i];
            //find defferent mark or contain 0 is stop the loop
            if(currentMark != sampleMark || currentMark == 0)break;
        }
        //complete the loop
        if(i === sideMatrix)return{"isGameOver":true,"winner":currentMark}
        else return{"isGameOver":false,"winner":0}
    }

    getIsGameOverAndWinner(matrix, sideMatrix){
        const searchFunc = [this.searchVertical, this.searchHorizontal, this.searchDiagonalLeftUpperToRightDown, this.searchDiagonalLeftDownToRightUpper];
        let result;
        for(let i=0; i<searchFunc.length; i++){
            result = searchFunc[i](matrix, sideMatrix);
            if(result["isGameOver"] === true)break;
        }
        return result
    }
}


matrix = new Matrix();
funcs = new Matrix_fucs();
matrix.initialize();

let result;
result = funcs.getIsGameOverAndWinner(matrix.matrix, matrix.sideMatrix)
if (result["isGameOver"] === true){
    matrix.isGameOver = true;
    matrix.winner = result["winner"];
}
console.log(matrix)