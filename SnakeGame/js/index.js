//game constants and variable

let inputDir={x:0,y:0};
const foodsound=new Audio("food.mp3");
const GameOverSound=new Audio("gameover.mp3");
const moveSound= new Audio("move.mp3");
const musicSound=new Audio("music.mp3");
let speed=9;
let lastPaintTime=0;
let snakeArr=[
    {x:13,y:15}
]
food={x:6,y:7};
let score=0;
//game functions

function main(ctime){
    window.requestAnimationFrame(main);
    //console.log(ctime)
    if((ctime-lastPaintTime)/1000< 1/speed){
        return;
    }
    lastPaintTime=ctime
    gameEngine();
    

}
function isCollide(snake){
    //if u bump into urseld
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y){
            return true;
        }
    }
    //if u bump on wall
    if(snake[0].x>=18 || snake[0].x<=0 || snake[0].y>=18 || snake[0].y<=0){
        return true;
            
    }
        
}
function gameEngine(){
    //part1 -updating the snake array and food
    if(isCollide(snakeArr)){
        GameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game over:presss any key to play again");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;

    }

    //if u have food increment score and generate score
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
        foodsound.play();
        score+=1;
        if(score>hiscoreVal){
            hiscoreVal = score;
            localStorage.setItem("hiscore",JSON.stringify(hiscore));
            hiscoreBox.innerHTML="High Score: "+ hiscoreVal;
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+ inputDir.y});
        let a =2;//from where the grid(0,18) start will be the range a and b
        let b=16;

        food={x:Math.round(a+(b-a)* Math.random()),y:Math.round(a+(b-a)* Math.random())}//formula to generate random number
    }
    //moving the snake
    for (let i =snakeArr.length-2;i >= 0;i--) {
        snakeArr[i+1]= {...snakeArr[i]}
        
    }
    snakeArr[0].x+= inputDir.x;
    snakeArr[0].y+= inputDir.y;
    

    //part2 : Display snake and food
    //display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        
        
        board.appendChild(snakeElement);
    });
    //display food

    foodElement=document.createElement('div');
        foodElement.style.gridRowStart=food.y;
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}




//main logic starts here
let hiscore = localStorage.getItem("hiscore");
let hiscoreVal=0;
if(hiscore===null){
    hiscoreVal=0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreVal));
}
else{
    hiscoreVal=JSON.parse(hiscore);
    hiscoreBox.innerHTML="High Score : "+ hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}//start the came
    musicSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;
            
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;
            break;
    
        default:
            break;
    }
});
