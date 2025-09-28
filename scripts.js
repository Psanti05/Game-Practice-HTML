let score = 0;
let maxScore = 0;
let highScore = 0;
let level = 1;
let gameOver = false;
let pause = false;
let retry = false;


const backgroundColors = [
	'#21618C',
	'#0E6655',
	'#17202A',
	'#598AD2',
	'#289AA9'
];

const bubbleColours = [
	'#D7BDE2',
	'#A9CCE3',
	'#A3E4D7',
	'#A2D9C3',
	'#A9DFBF',
	'#ABEBC6',
	'#FCF3CF',
	'#FDEBDC'
];

const BubbleState = {
	NORMAL: 1,
	POPPING: 2,
	POPPED: 3
}

class Submarine {
	constructor(canvas, ctx, width, height, colour, dirn){
		this.ctx = ctx;
		this.x = width;
		this.y = height;
		this.dirn = dirn;
		this.colour = "rgb(255, "+colour+", 0)";
		this.LENGTH = canvas.width;
		this.HEIGHT = canvas.height;
		this.hit = 0;
		this.speedx = 0;
		this.speedy = 0;

	}
	draw(){
		this.ctx.beginPath();
		this.ctx.fill();
		
		this.ctx.beginPath();
		this.ctx.fillStyle = this.colour;
		if (this.dirn == 1){
			this.ctx.arc(this.x, this.y,20,0,2*Math.PI);
			this.ctx.rect(this.x, this.y-20, 80, 40);
			this.ctx.rect(this.x+10, this.y-60, 10, 40);
			this.ctx.rect(this.x, this.y-60, 10, 10);
			this.ctx.moveTo(this.x+60, this.y-20);
			this.ctx.lineTo(this.x+80, this.y-40);
			this.ctx.lineTo(this.x+80, this.y-20);
		} else {
			this.ctx.arc(this.x, this.y,20,0,2*Math.PI);
			this.ctx.rect(this.x-80, this.y-20, 80, 40);
			this.ctx.rect(this.x-20, this.y-60, 10, 40);
			this.ctx.rect(this.x-10, this.y-60, 10, 10);
			this.ctx.moveTo(this.x-80, this.y-20);
			this.ctx.lineTo(this.x-80, this.y-40);
			this.ctx.lineTo(this.x-60, this.y-20);
		}
		this.ctx.fill();

		if (this.hit > 0){
			this.ctx.beginPath();
			this.ctx.strokeStyle = "rgb(255, 128, 0)";
			this.ctx.lineWidth = 3;
			if (this.dirn == 1){
				this.ctx.moveTo(this.x+0, this.y-20);
				this.ctx.lineTo(this.x+10, this.y-20);
				this.ctx.lineTo(this.x+10, this.y-50);
				this.ctx.lineTo(this.x+0, this.y-50);
				this.ctx.lineTo(this.x+0, this.y-60);
				this.ctx.lineTo(this.x+20, this.y-60);
				this.ctx.lineTo(this.x+20, this.y-20);
				this.ctx.lineTo(this.x+60, this.y-20);
				this.ctx.lineTo(this.x+80, this.y-40);
				this.ctx.lineTo(this.x+80, this.y+20);
				this.ctx.lineTo(this.x+0, this.y+20);
				this.ctx.arc(this.x, this.y, 20, 0.5*Math.PI, 1.5*Math.PI, false);
			} else {
				this.ctx.moveTo(this.x+0, this.y-20);
				this.ctx.lineTo(this.x-10, this.y-20);
				this.ctx.lineTo(this.x-10, this.y-50);
				this.ctx.lineTo(this.x+0, this.y-50);
				this.ctx.lineTo(this.x+0, this.y-60);
				this.ctx.lineTo(this.x-20, this.y-60);
				this.ctx.lineTo(this.x-20, this.y-20);
				this.ctx.lineTo(this.x-60, this.y-20);
				this.ctx.lineTo(this.x-80, this.y-40);
				this.ctx.lineTo(this.x-80, this.y+20);
				this.ctx.lineTo(this.x+0, this.y+20);
				this.ctx.arc(this.x, this.y, 20, 0.5*Math.PI, 1.5*Math.PI, true);
			}
			this.ctx.stroke();
			this.ctx.lineWidth = 1;
			this.hit--;
		}
	}  // end of method draw

	collide(bubble){
		if (this.dirn == 1){
			if (bubble.x+bubble.radius > this.x-20
			&& bubble.x-bubble.radius < this.x+80 
			&& bubble.y+bubble.radius > this.y-20
			&& bubble.y-bubble.radius < this.y+20){
				return true;
			} else if (bubble.x+bubble.radius > this.x+10
			&& bubble.x-bubble.radius < this.x+20
			&& bubble.y+bubble.radius > this.y-50
			&& bubble.y+bubble.radius < this.y-20){
				return true;
			} else if (bubble.x+bubble.radius > this.x+0
			&& bubble.x-bubble.radius < this.x+20
			&& bubble.y+bubble.radius > this.y-60
			&& bubble.y-bubble.radius < this.y-50){
				return true;
			} else if (bubble.x+bubble.radius > this.x+60
			&& bubble.x-bubble.radius < this.x+80
			&& bubble.y+bubble.radius > this.y-40
			&& bubble.y-bubble.radius < this.y-20){
				return true;
			}
		} else {
			if (bubble.x+bubble.radius > this.x-80
			&& bubble.x-bubble.radius < this.x+20 
			&& bubble.y+bubble.radius > this.y-20
			&& bubble.y-bubble.radius < this.y+20){
				return true;
			} else if (bubble.x+bubble.radius > this.x-20
			&& bubble.x-bubble.radius < this.x-10
			&& bubble.y+bubble.radius > this.y-50
			&& bubble.y-bubble.radius < this.y-20){
				return true;
			} else if (bubble.x+bubble.radius > this.x-20
			&& bubble.x-bubble.radius < this.x+0
			&& bubble.y+bubble.radius > this.y-60
			&& bubble.y-bubble.radius < this.y-50){
				return true;
			} else if (bubble.x+bubble.radius > this.x-80
			&& bubble.x-bubble.radius < this.x-60
			&& bubble.y+bubble.radius > this.y-40
			&& bubble.y-bubble.radius < this.y-20){
				return true;
			}
		}
		return false;
	} // end of method collide

  	up(){
		this.speedy -= 0.6;
		this.y += this.speedy;

	}

	left(){
		this.speedx -= 1;
		this.dirn = 1;
		this.x += this.speedx;
	}

	right(){
		this.speedx += 1;
		this.dirn = 2;
		this.x += this.speedx;
	}

	down(){
		this.speedy += 0.6;
		this.y += this.speedy;
	}

} // end of class Submarine

class Bubble{

	constructor(w, ctx) {
		this.ctx = ctx;
		this.radius = Math.floor(Math.random()* 50 + 10);
		this.x = Math.random() * (w.innerWidth - this.radius * 2) + this.radius;
		this.y = Math.random() * (w.innerHeight - this.radius * 2) + this.radius;
		this.dx = (Math.random() - 0.5)*level;
		this.dy = (Math.random() - 0.5)*level;
		this.colour = bubbleColours [Math.floor(Math.random() * bubbleColours.length)];
		this.state = BubbleState.NORMAL;
		this.poppingPhase = 0;
	}
	
	
  	draw() {
		this.ctx.beginPath();
		this.ctx.strokeStyle = this.colour;
		if (BubbleState.NORMAL == this.state){
			this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2,false);
		} else if (BubbleState.POPPING == this.state){
			if (this.poppingPhase == 1){
				$('#audio').html('<audio autoplay><source src="bubbleSound.wav"></audio>');
			}
			if (this.poppingPhase > 20){
				
				this.state = BubbleState.POPPED;
			}
			let length = 20 - this.poppingPhase/2;
			this.ctx.moveTo(this.x, this.y-this.radius-this.poppingPhase);
			this.ctx.lineTo(this.x, this.y-this.radius-length-this.poppingPhase);
			this.ctx.moveTo(this.x-this.radius-this.poppingPhase, this.y);
			this.ctx.lineTo(this.x-this.radius-length-this.poppingPhase, this.y);
			this.ctx.moveTo(this.x, this.y+this.radius+this.poppingPhase);
			this.ctx.lineTo(this.x, this.y+this.radius+length+this.poppingPhase);
			this.ctx.moveTo(this.x+this.radius+this.poppingPhase, this.y);
			this.ctx.lineTo(this.x+this.radius+length+this.poppingPhase, this.y);
			this.poppingPhase++;
		}
		this.ctx.lineWidth = 3;
		this.ctx.stroke();
	} // end of method draw

	update(w) {
		if (this.state == BubbleState.NORMAL){
			if (this.x + this.radius > w.innerWidth || this.x - this.radius < 0) {
				this.state = BubbleState.POPPING;
				score -= Math.floor(level/2);
				this.dx = -this.dx;
			}
			if (this.y + this.radius > w.innerHeight || this.y - this.radius < 0) {
				this.state = BubbleState.POPPING;
				score -= Math.floor(level/2);
				this.dy = -this.dy;
			}
		}
		this.x += this.dx;
		this.y += this.dy;
		this.draw();
	} // end of method update

} // end of class Bubble


(function(d, w){
	let background = d.getElementById("background");
	background.width = w.innerWidth;
	background.height = w.innerHeight;
	background.style.backgroundColor=backgroundColors[0];

	let foreground = d.getElementById("foreground");
	foreground.width = w.innerWidth;
	foreground.height = w.innerHeight;
	let ctx = foreground.getContext("2d");


	let me = new Submarine(foreground, ctx, (foreground.width/2)-200, (foreground.height/2)-100, 255, 0);
	let me2 = new Submarine(foreground, ctx, (foreground.width/2)+200, (foreground.height/2)+100, 0, 1);
	
	let bubblePhase = 0;
	let bubbles = [];

	// set up the animation loop
	let counter = 0;
	requestAnimationFrame(loop);
	function loop() {
		ctx.clearRect(0, 0, foreground.width, foreground.height);
		
		if (score > level*100){
			level ++;
			background.style.backgroundColor = backgroundColors[(level-1)%backgroundColors.length];
		}

		if (me.x < 20){
			me.x = 20;
			me.dirn = 2;
			me.speedx /= -1.25;
		} else if (me.x > me.LENGTH-20) {
			me.x = me.LENGTH-20;
			me.dirn = 1;
			me.speedx /= -1.25;
		} else {
			me.x += me.speedx;
		}
		if (me.y < 20) {
			me.y = 20;
			me.speedy /= -1.25;
		} else if (me.y > me.HEIGHT-20) {
			me.y = me.HEIGHT-20;
			me.speedy /= -1.25;
		} else {
			me.y += me.speedy;
		}
		me.speedx *= 0.95;
		me.speedy *= 0.95;

		if (me2.x < 20){
			me2.x = 20;
			me2.dirn = 2;
			me2.speedx /= -1.25;
		} else if (me2.x > me2.LENGTH-20) {
			me2.x = me2.LENGTH-20;
			me2.dirn = 1;
			me2.speedx /= -1.25;
		} else {
			me2.x += me2.speedx;
		}
		if (me2.y < 20) {
			me2.y = 20;
			me2.speedy /= -1.25;
		} else if (me2.y > me2.HEIGHT-20) {
			me2.y = me2.HEIGHT-20;
			me2.speedy /= -1.25;
		} else {
			me2.y += me2.speedy;
		}
		me2.speedx *= 0.95;
		me2.speedy *= 0.95;

		if (bubblePhase % Math.ceil(50/level)== 0){
			bubbles.push(new Bubble(w, ctx));
		}
		bubblePhase++;
		for (var i = 0; i < bubbles.length; i++){
			bubbles[i].update(w);
			collision(me, bubbles[i]);
			collision(me2, bubbles[i]);

			if (bubbles[i].state == BubbleState.NORMAL && me.collide(bubbles[i])){
				bubbles[i].state = BubbleState.POPPING;
				me.hit += 10;
			}
			if (bubbles[i].state == BubbleState.NORMAL && me2.collide(bubbles[i])){
				bubbles[i].state = BubbleState.POPPING;
				me2.hit += 10;
			}
		}
		if (counter % 100 == 0){
			let colourID = (counter/50)%backgroundColors.length;
			background.style.backgroundColor=backgroundColors[colourID];
		}
		counter++;
		displayScore (ctx);
		bubbles = bubbles.filter(item=> item.state != BubbleState.POPPED);
		me.draw();
		me2.draw();

		if (score < 0){
			gameOver = true;
			displayScore (ctx);
		} else {
			if (!pause){
				requestAnimationFrame(loop);
			}
		}
		
		if (retry) {
			ctx.clearRect(0, 0, foreground.width, foreground.height);
			score = 0;
			maxScore = 0;
			level = 1;
			gameOver = false;
			pause = false;
			me.x = (foreground.width/2)-200;
			me.y = (foreground.height/2)-100;
			me.speedx = 0;
			me.speedy = 0;
			me.hit = 0;
			me.dirn = 0;
			me2.speedx = 0;
			me2.speedy = 0;
			me2.x = (foreground.width/2)+200;
			me2.y = (foreground.height/2)+100;
			me2.hit = 0;
			me2.dirn = 1;
			bubbles = bubbles.filter(item=> item.state != BubbleState.NORMAL);
			requestAnimationFrame(loop);
			retry = false;
		}
	}

	function collision(me, bubble){
		if (bubble.state == BubbleState.NORMAL && me.collide(bubble)){
			bubble.state = BubbleState.POPPING;
			me.hit += 10;
			let value = Math.ceil(100/(bubble.radius+level)*(1+Math.hypot(bubble.dx,bubble.dy)));
			score+=value;
			if (score > maxScore){
				maxScore = score;
			}
			if (maxScore > highScore) {
				highScore = maxScore;
			}
		}
	}

	function collision(me2, bubble){
		if (bubble.state == BubbleState.NORMAL && me2.collide(bubble)){
			bubble.state = BubbleState.POPPING;
			me2.hit += 10;
			let value = Math.ceil(100/(bubble.radius+level)*(1+Math.hypot(bubble.dx,bubble.dy)));
			score+=value;
			if (score > maxScore){
				maxScore = score;
			}
			if (maxScore > highScore) {
				highScore = maxScore;
			}
		}
	}

	function displayScore(ctx){
		ctx.beginPath();
		ctx.textAlign = 'left';
		ctx.textBaseline = 'alphabetic';
		ctx.font = "20px Arial";
		ctx.fillStyle = "rgb(0,255,0)";
		ctx.fillText("Score : " + score, 10,20);
		ctx.fillText("Level : " + level, 10,40);
		ctx.fill();
		
		if (gameOver){
			ctx.beginPath();
			ctx.textBaseline = 'middle';
			ctx.textAlign = "center";
			ctx.font = "80px Arial";
			ctx.fillStyle = "rgb(255, 0, 0)";
			ctx.fillText("GAME OVER", innerWidth/2, innerHeight/2-45);
			ctx.fillText("Score: " + maxScore, innerWidth/2, innerHeight/2+45);
			ctx.fillText("High Score:" + highScore, innerWidth/2, innerHeight/2+135);
			ctx.fill();
		}


		if (pause){
			ctx.beginPath();
			ctx.textBaseLine = 'middle';
			ctx.textAlign = "center";
			ctx.font = "80px Arial";
			ctx.fillStyle = "rgb(255, 0, 0)";
			ctx.fillText("PAUSED", innerWidth/2, innerHeight/2);
			ctx.fill();
		}
	}

	let keysPressed = {};
  	d.addEventListener("keydown", (event) => {
		keysPressed[event.key] = true;
		if (keysPressed["w"] || keysPressed["W"]) {
			if (pause || gameOver){
				console.log(key);
			} else {
				me.up();
			}
		} 
		if (keysPressed["a"] || keysPressed["A"]) {
			if (pause || gameOver){
				console.log(key);
			} else {
				me.left();
			}
		}
		if (keysPressed["d"] || keysPressed ["D"]) {
			if (pause || gameOver){
				console.log(key);
			} else {
				me.right();
			}
		}
		if (keysPressed["s"] || keysPressed["S"]) {
			if (pause || gameOver){
				console.log(key);
			} else {
				me.down();
			}
		}
		if (keysPressed["ArrowUp"]) {
			if (pause || gameOver){
				console.log(key);
			} else {
				me2.up();
			}
		}
		if (keysPressed["ArrowLeft"]) {
			if (pause || gameOver){
				console.log(key);
			} else {
				me2.left();
			}
		}
		if (keysPressed["ArrowRight"]) {
			if (pause || gameOver){
				console.log(key);
			} else {
				me2.right();
			}
		}
		if (keysPressed["ArrowDown"]) {
			if (pause || gameOver){
				console.log(key);
			} else {
				me2.down();
			}
		}
		if (keysPressed["p"] || keysPressed["P"]) {
			if (gameOver) {
				console.log(key);
			} else {
				pause = !pause;
				if (!pause){
					requestAnimationFrame(loop);
				}
			}
		}
		if (keysPressed["r"] || keysPressed["R"]) {
			if(gameOver) {
				retry = !retry;
				if (retry){
					requestAnimationFrame(loop);
				}
			} else {
				console.log(key);
			}
		}
		if (keysPressed["h"]) {
			score -= 20;
		}
	});
	d.addEventListener("keyup", (event) => {
		delete keysPressed[event.key];
	});
})(document, window); 