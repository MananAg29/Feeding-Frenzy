let inputDir={x:0, y:0};
let speed=5;
let lastPaintTime=0;
let snakeArr =[
{x:13, y:15}
]
food ={x:6, y:7};
let score=0;
let j=1;

function main(ctime)
{

	window.requestAnimationFrame(main);
	//console.log(ctime)
	//control the speed
	if((ctime-lastPaintTime)/1000 < 1/speed)
	{
		return;
	}
	lastPaintTime=ctime;
	gameEngine();

}

function isCollide(snakeArr)
{
	//if it bites itself
	for(let i=1;i<snakeArr.length;i++)
	{
		
		if(snakeArr[i].x=== snakeArr[0].x && snakeArr[i].y===snakeArr[0].y)
		{
			return true;
		}
	}
        //if it bumps into the wall
    if(snakeArr[0].x>=18 || snakeArr[0].x<=0 || snakeArr[0].y>=18 || snakeArr[0].y<=0)
	return true;

	return false;
}


function gameEngine()
{
    //if collision
	if(isCollide(snakeArr)){
		inputDir={x:0, y:0};
		alert("Game Over .Press any key to play again.");
		snakeArr=[{x:13, y:15}];
		score=0;
		speed=2;
		j=1;
		scoreBox.innerHTML= "Score: " +score;
	}

    //if food is eaten
	if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
	{
		snakeArr.unshift({x:snakeArr[0].x+inputDir.x, y:snakeArr[0].y+inputDir.y})
		let a=2;
		let b=16;
		food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
	    score++;
	    
	    if(score>=5*j)
	    	{
	    		speed+=2;
	    		j++;
	    	}
	    if(score>val)
	    {
	    	val=score;
	    	localStorage.setItem("hscore",JSON.stringify(val));
	    	hscoreBox.innerHTML="HighScore: "+val;
	    }
	    scoreBox.innerHTML= "Score: " +score;
	}

    //moving the snake
	for(let i=snakeArr.length-2;i>=0;i--)
	{
		snakeArr[i+1]={...snakeArr[i]};//to avoid referencing problem,creating a new object by using ...

	}
	snakeArr[0].x += inputDir.x;
	snakeArr[0].y += inputDir.y;


	//Display the snake
	board.innerHTML ="";
	snakeArr.forEach((e,index)=>{
		snakeElement = document.createElement('div');
		snakeElement.style.gridRowStart = e.y;
		snakeElement.style.gridColumnStart = e.x;
		
		if(index===0)
			snakeElement.classList.add('head');
		else
			snakeElement.classList.add('snake');
		board.appendChild(snakeElement);
	});

	//Display the food
		foodElement = document.createElement('div');
		foodElement.style.gridRowStart = food.y;
		foodElement.style.gridColumnStart = food.x;
		foodElement.classList.add('food');
		board.appendChild(foodElement);
}



//Logic
let val=0;
let hscore= localStorage.getItem("hscore");
if(hscore===null)
{
	val=0;
	localStorage.setItem("hscore",JSON.stringify(val))
}
else
{
	val=JSON.parse(hscore);
	hscoreBox.innerHTML="HighScore: "+hscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
	inputDir= {x:0, y:1}
    switch(e.key){
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
