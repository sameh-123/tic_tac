const right=document.querySelector('.right');
const cont2=document.querySelector('.cont2');
const PLAY=document.querySelector('.play');
const p1=document.querySelector('.p1');
const p2=document.querySelector('.p2');
const pl1=document.querySelector('.pl1');
const pl2=document.querySelector('.pl2');
const cl1=document.querySelector('.cl1');
const cl2=document.querySelector('.cl2');
let board=[];
let players=[null,null];
let turn=0,win=0;
function check(char){
    for(let i=0;i<3;i++){
        let h=1;
        for(let j=0;j<3;j++){
            if(board[i][j]!=char){
                h=0;
                break;
            }
        }
        if(h)return [3*i+1,3*i+2,3*i+3];
    }
    for(let i=0;i<3;i++){
        let h=1;
        for(let j=0;j<3;j++){
            if(board[j][i]!=char){
                h=0;
                break;
            }
        }
        if(h)return [i+1,i+4,i+7];
    }
    let g=1;
    for(let i=0;i<3;i++){
        if(board[i][i]!=char)g=0;
    }
    if(g)return [1,5,9];
    if(board[0][2]!=char || board[1][1]!=char || board[2][0]!=char)return [0];
    return [3,5,7];
}
function get(cont,k){
    for(let i=cont.firstChild;i;i=i.nextSibling){
        if(i.classList.contains(`b${k}`)){
            return i;
        }
    }
    return null;
}
function player(human,char){
    this.human=human;
    this.char=char;
}
function play(cont,msg){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]==''){
                board[i][j]=players[turn].char;
                let arr=check(players[turn].char);
                if(arr[0]!=0){
                    let k=3*i+j+1;
                    let temp=get(cont,k);
                    temp.textContent=board[i][j];
                    for(let h=0;h<3;h++){
                        let tmp=get(cont,arr[h]);
                        tmp.setAttribute('style','background-color: lightgreen');
                    }
                    msg.textContent=`PLAYRE ${turn+1} WON`;
                    win=1;
                    return;
                }
                board[i][j]='';
            }
        }
    }
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]==''){
                board[i][j]=players[(turn+1)%2].char;
                let arr=check(players[(turn+1)%2].char);
                if(arr[0]!=0){
                    board[i][j]=players[turn].char;
                    let k=3*i+j+1;
                    let temp=get(cont,k);
                    temp.textContent=board[i][j];
                    turn=(turn+1)%2;
                    return;
                }
                board[i][j]='';
            }
        }
    }
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]==''){
                board[i][j]=players[turn].char;
                let k=3*i+j+1;
                let temp=get(cont,k);
                temp.textContent=board[i][j];
                turn=(turn+1)%2;
                return;
            }
        }
    }
}
const warn1=document.createElement('div');
warn1.classList.add('warn');
warn1.textContent='Player 1 not choosen';
const warn2=document.createElement('div');
warn2.classList.add('warn');
warn2.textContent='Player 2 not choosen';
function go(){
    if(players[0]==null){
        p1.appendChild(warn1);
    }
    else if(p1.contains(warn1)) p1.removeChild(warn1);
    if(players[1]==null){
        p2.appendChild(warn2);
    }
    else if(p2.contains(warn2)) p2.removeChild(warn2);
    if(players[0]==null||players[1]==null)return;
    board=[];
    win=0;
    turn=0;
    const msg=document.createElement('div');
    msg.classList.add('msg');
    const left=document.createElement('div');
    const grid=document.createElement('div');
    grid.classList.add('grid');
    left.classList.add('left');
    for(let i=0;i<3;i++){
        let sub=[];
        for(let j=0;j<3;j++)sub.push('');
        board.push(sub);
    }
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            let k=3*i+j+1;
            const item=document.createElement('button');
            item.classList.add('item');
            item.classList.add(`b${k}`);
            item.textContent='';
            grid.appendChild(item);
        }
    }
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            let k=3*i+j+1;
            let item=get(grid,k);
            item.addEventListener('click',()=>{
                if(board[i][j]==''&&!win&&players[turn]!=null&&players[turn].human){
                    board[i][j]=players[turn].char;
                    item.textContent=players[turn].char;
                    let arr=check(players[turn].char);
                    if(arr[0]!=0){
                        for(let h=0;h<3;h++){
                            let tmp=get(grid,arr[h]);
                            tmp.setAttribute('style','background-color: lightgreen');
                        }
                        msg.textContent=`PLAYRE ${turn+1} WON`;
                        win=1;
                        return;
                    }
                    let full=1;
                    for(let i=0;i<3;i++){
                        for(let j=0;j<3;j++){
                            if(board[i][j]==''){
                                full=0;
                            }
                        }
                    }
                    if(full){
                        msg.textContent="IT'S A TIE";
                        win=1;
                        return;
                    }
                    turn=(turn+1)%2;
                    if(!players[turn].human){
                        play(grid,msg);
                    }
                    if(!win){
                        let full=1;
                        for(let i=0;i<3;i++){
                            for(let j=0;j<3;j++){
                                if(board[i][j]==''){
                                    full=0;
                                }
                            }
                        }
                        if(full){
                            msg.textContent="IT'S A TIE";
                            win=1;
                            return;
                        }
                    }
                }
            });
        }
    }
    left.append(msg);
    left.appendChild(grid);
    const btns=document.createElement('div');
    btns.classList.add('btns1');
    const btn1=document.createElement('button');
    btn1.classList.add('go');
    btn1.classList.add('restart');
    btn1.textContent='RESTART';
    btn1.addEventListener('click',()=>{
        cont2.removeChild(left);
        cont2.appendChild(right);
        go();
    });
    const btn2=document.createElement('button');
    btn2.classList.add('go');
    btn2.classList.add('back');
    btn2.textContent='BACK';
    btn2.addEventListener('click',()=>{
        if(pl1.classList.contains('sc'))pl1.classList.remove('sc');
        if(pl2.classList.contains('sc'))pl2.classList.remove('sc');
        if(cl1.classList.contains('sc'))cl1.classList.remove('sc');
        if(cl2.classList.contains('sc'))cl2.classList.remove('sc');
        players[0]=null;
        players[1]=null;
        cont2.replaceChild(right,left);
    });
    btns.appendChild(btn1);
    btns.appendChild(btn2);
    left.appendChild(btns);
    cont2.replaceChild(left,right);
    while(players[turn]!=null&&!players[turn].human&&!win){
        play(grid,msg);
        if(!win){
            let full=1;
            for(let i=0;i<3;i++){
                for(let j=0;j<3;j++){
                    if(board[i][j]==''){
                        full=0;
                    }
                }
            }
            if(full){
                msg.textContent="IT'S A TIE";
                win=1;
                return;
            }
        }
    }
}
PLAY.addEventListener('click',go);
pl1.addEventListener('click',()=>{
    if(pl1.classList.contains('sc')){
        pl1.classList.remove('sc');
        players[0]=null;
    }
    else{
        pl1.classList.add('sc');
        players[0]=new player(1,'X');
        if(cl1.classList.contains('sc')){
            cl1.classList.remove('sc');
        }
    }
});
cl1.addEventListener('click',()=>{
    if(cl1.classList.contains('sc')){
        cl1.classList.remove('sc');
        players[0]=null;
    }
    else{
        cl1.classList.add('sc');
        players[0]=new player(0,'X');
        if(pl1.classList.contains('sc')){
            pl1.classList.remove('sc');
        }
    }
});
pl2.addEventListener('click',()=>{
    if(pl2.classList.contains('sc')){
        pl2.classList.remove('sc');
        players[1]=null;
    }
    else{
        pl2.classList.add('sc');
        players[1]=new player(1,'O');
        if(cl2.classList.contains('sc')){
            cl2.classList.remove('sc');
        }
    }
});
cl2.addEventListener('click',()=>{
    if(cl2.classList.contains('sc')){
        cl2.classList.remove('sc');
        players[1]=null;
    }
    else{
        cl2.classList.add('sc');
        players[1]=new player(0,'O');
        if(pl2.classList.contains('sc')){
            pl2.classList.remove('sc');
        }
    }
});