class Matrix{

    /*
    Matrix class

    〇Xゲームの現在状況を管理するクラス
    クラス変数  matrixが現在のゲームの状況を表す
    メゾッド　initialize()->None 現在のmatrixを初期化する。
    メゾッド　markMatrixElement(x coordinate, y coordinate, mark)->None matirixにマークをつける。マークはcharの〇かXのみ  
    */
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
        //if (mark !== "x" || mark !== "〇")return console.log("[WARNING] === Invalid input ====");
        this.matrix[x][y] = mark;
    }
}
    
    //init matrix
class Matrix_funcs{

    /*
    Matrix func　class

    基本的にgetIsGameOverAndWinner(matirx, sideMatrix)を使用
    matrixとsideMatrix(行列の一辺の要素数)を引数として受け取り、勝者がいるか確認する
    返り値は{"isGameOver": bool, "winner":str or int}の仮想配列
    勝者がいたらisGameOverにtrue,winnerに〇or×(char)を入るよう想定
    そうでないならfalse, winnerに0(int)
    */

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

    getTurnCnt(matirx){
        let i,j,cnt;
        for(i=0; i<sideMatrix; i++){
            for(j=0; j<sideMatrix ; j++){
                if(matirx[i][j] != 0)cnt += 1;
            } 
        }
        return cnt
    }

    getIsGameOverAndWinner(matrix, sideMatrix){
        const searchFunc = [this.searchVertical, this.searchHorizontal, this.searchDiagonalLeftUpperToRightDown, this.searchDiagonalLeftDownToRightUpper];
        let result;
        for(let i=0; i<searchFunc.length; i++){
            result = searchFunc[i](matrix, sideMatrix);
            if(result["isGameOver"] === true)break;
        }
        //全てのマスを埋め終わって、ゲーム勝者がいないときは引き分け判定
        if( this.getTurnCnt(matrix) === 9 && result["isGameOver"] === false){
            result["isGameOver"] = true;
            result["winner"] = "draw";
        }
        return result
    }
}


//==== usage =====

matrix = new Matrix();
funcs = new Matrix_funcs();
matrix.initialize();

let result;
result = funcs.getIsGameOverAndWinner(matrix.matrix, matrix.sideMatrix)
console.log(result)
console.log(matrix)
