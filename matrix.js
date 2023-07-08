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

    getTurnCnt(matirx, sideMatrix){
        let i,j,cnt = 0;
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
        if( this.getTurnCnt(matrix, sideMatrix) === 9 && result["isGameOver"] === false){
            result["isGameOver"] = true;
            result["winner"] = "draw";
        }
        return result
    }
}


/*==== usage =====

let matrix = new Matrix();
const funcs = new Matrix_funcs();
matrix.initialize();

let result;
result = funcs.getIsGameOverAndWinner(matrix.matrix, matrix.sideMatrix)
console.log(result)
console.log(matrix)
*/


//MatrixとMatrix_funcsのインスタンスを生成
let matrix = new Matrix();
const funcs = new Matrix_funcs();

//先手として◯を設定
let turn = '〇';

/*
現在のボードの状態を表示し、各セルにクリックイベントを追加
クリックイベントは、セルがクリックされた時に発火し、
選択されたセルにマークを付け、ゲームの状態をチェック
ゲームが終了している場合、アラートを表示して、ゲームを再初期化
*/

function renderBoard() {
    //HTML内のidの'board'の要素(div要素）を取得し、その中身を空にする
    const board = document.getElementById('board');
    //board要素の中身を空にする
    board.innerHTML = '';
    //ボード（matrix）の各行に対してループ。
    for(let i = 0; i < matrix.sideMatrix; i++){
        //各行に対するdiv要素（行）を新たに作成
        let row = document.createElement('div');
        //div要素（行）に、'rowと'いうクラス名を設定
        row.classList.add('row');
        //各行内の各セルに対してさらにループ。
               //このセルにはテキスト（〇かX）を設定し、'cell'というクラスを追加
        for(let j = 0; j < matrix.sideMatrix; j++){
            //各セルに対するループ内で新たにdiv要素（セル）を作成
            let cell = document.createElement('div');
            //cellのテキストにmatrixの(i, j)要素の値をセットする。値がなければ0をセット
            cell.innerText = matrix.matrix[i][j] || ' ';
            // cellに対して'cell'というクラスを追加する
            cell.classList.add('cell');
            //各セルに'click'イベントリスナーを追加
            cell.addEventListener('click', function() {
                //すでにマークがついている場合(0でない場合)は何もしない(return)
                if(matrix.matrix[i][j] !== 0) return;
                //選択されたセルに、現在のプレイヤーのマークをつける
                matrix.markMatrixElement(i, j, turn);
                //現在のプレーヤーを切り替える
                turn = turn === '〇' ? 'X' : '〇';
                // ボードを再描画して、現在のゲームの状態を反映
                renderBoard();
                //ゲームが終了したか判定し結果を、変数resultに代入
                setTimeout(function(){
                    let result = funcs.getIsGameOverAndWinner(matrix.matrix, matrix.sideMatrix);
                    //result.isGameOver が true の場合、
                    if(result["isGameOver"]) {
                        //result.winner === 'draw'のとき「引き分け！」を表示
                        //そうでない場合 '〇の勝利!' または 'Xの勝利!'を表示
                        alert(result["winner"] === 'draw' ? '引き分け!' : `${result["winner"]}の勝利!`);
                        //マトリクスを初期化
                        matrix.initialize();
                        //ボードを再描画
                        renderBoard();
                    }
                },100);
            });
            //rowにcellを追加する
            row.appendChild(cell);
        }
        //boardにrowを追加する
        board.appendChild(row);
    }
}

//ゲーム途中で、ボードを再初期化するリセット機能
document.getElementById('reset').addEventListener('click', function() {
    matrix.initialize();
    renderBoard();
});

renderBoard();
