const block = document.querySelectorAll('td');
const page = document.querySelectorAll('body');
const cells = document.querySelectorAll('td');
const result = document.querySelector('#result');
function generateRandom(max){
    return Math.floor(Math.random() * max);
}

function ResetBoard(){
    board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var nums = [2,4];
    var possible = [],possible1 = [];
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0)possible.push((4*i)+j);
        }
    }
    var firstIdx = generateRandom(16);
    var boardIdx = possible[firstIdx];
    var n = generateRandom(2);
    var num = nums[n];
    var row = parseInt(parseInt(boardIdx)/4);
    var col = parseInt(boardIdx)%4;
    board[row][col] = num;
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0)possible1.push((4*i)+j);
        }
    }
    var secIdx = generateRandom(15);
    boardIdx = possible1[secIdx];
    n = generateRandom(2);
    num = nums[n];
    row = parseInt(parseInt(boardIdx)/4);
    col = parseInt(boardIdx)%4;
    board[row][col] = num;
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            cells[(4*i)+j].innerText=board[i][j];
        }
    }

}

class Stack {
    constructor() {
      this.stack = [];
    }
    push(item) {
      this.stack.push(item);
    }
    pop() {
      this.stack.pop();
    }
    top(){
        return this.stack[this.stack.length-1];
    }
    size(){
        return this.stack.length;
    }
    empty(){
        if(this.stack.length==0)return true;
        return false;
    }
}

function rotate(matrix){
    var v=[];
    for(var j=0;j<4;j++){
        var z=[];
        for(var i=3;i>=0;i--)z.push(matrix[i][j]);
        v.push(z);
    }
    return v;
}

function transformLogic(matrix){
    var ans=[];
    for(var i=0;i<4;i++){
        let st = new Stack;
        var r=[0,0,0,0];
        for(var j=0;j<4;j++){
            if(matrix[i][j]!=0){
                if(st.empty()){
                    st.push([matrix[i][j],0]);
                }else if(st.top()[0]==matrix[i][j] && st.top()[1]==0){
                    st.pop();st.push([2*matrix[i][j],1]);
                }else st.push([matrix[i][j],0]);
            }
        }
        while(!st.empty()){r[st.size()-1]=st.top()[0]; st.pop();}
        ans.push(r);
    }
    return ans;
}

function update2048(matrix,d){
        if(d[0]=='l'){
            matrix=transformLogic(matrix);
        }else if(d[0]=='r'){
            matrix = rotate(matrix); matrix = rotate(matrix);
            matrix = transformLogic(matrix);
            matrix = rotate(matrix); matrix = rotate(matrix);
        }else if(d[0]=='u'){
            matrix = rotate(matrix); matrix = rotate(matrix); matrix = rotate(matrix);
            matrix = transformLogic(matrix);
            matrix = rotate(matrix);
        }else {
            matrix = rotate(matrix);
            matrix = transformLogic(matrix);
            matrix = rotate(matrix); matrix = rotate(matrix); matrix = rotate(matrix);
        }
        return matrix;
}


page.forEach((b)=>{
    b.addEventListener('keydown',()=>{
        var board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        for(var i=0;i<16;i++){
            board[parseInt(i/4)][i%4] = parseInt(cells[i].innerText);
        }
        var dir =["l","r","u","d"];
        var d = event.key;
        if(d!='1' && d!='2' && d!='3' && d!='4')return;
        //Doing Operation
        var updatedBoard = Object.values(update2048(board,dir[parseInt(d)-1]));

        // Putting a 2 or a 4 at random empty location
        var nums = [2,4];
        var possible = [];
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                if(updatedBoard[i][j]==0)possible.push((4*i)+j);
            }
        }
        var firstIdx = generateRandom(parseInt(possible.length));
        var boardIdx = possible[firstIdx];
        var n = generateRandom(2);
        var num = nums[n];
        var row = parseInt(parseInt(boardIdx)/4);
        var col = parseInt(boardIdx)%4;
        updatedBoard[row][col] = num;
        var won = false;
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                cells[(4*i)+j].innerText=updatedBoard[i][j];
                if(updatedBoard[i][j]==16)won=true;
            }
        }
        if(won)result.innerText = "You Won!";
    });
})

window.onload = ResetBoard();