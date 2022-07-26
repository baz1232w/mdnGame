alert('это небольшая игра, где нужно словить все шары, управление стрелочками')

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let para = document.querySelector('p');
let count = 0;


function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape{
  constructor(x, y, velX, velY){
      this.x = x;
      this.y = y;
      this.velX = velX;
      this.velY = velY;
      
  }
}


class Ball extends Shape {

  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);

    this.color = color;
    this.size = size;
    this.exists = true;
  }

   draw() {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
      ctx.fill();
   }

   update() {
      if ((this.x + this.size) >= width) {
         this.velX = -(this.velX);
      }

      if ((this.x - this.size) <= 0) {
         this.velX = -(this.velX);
      }

      if ((this.y + this.size) >= height) {
         this.velY = -(this.velY);
      }

      if ((this.y - this.size) <= 0) {
         this.velY = -(this.velY);
      }

      this.x += this.velX;
      this.y += this.velY;
   }

   collisionDetect() {
      for (const ball of balls) {
         if (!(this === ball)) {
            const dx = this.x - ball.x;
            const dy = this.y - ball.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + ball.size) {
              ball.color = this.color = randomRGB();
            }
         }
      }
   }
   refreshBall(){
    this.exists = true;
   }
}

class EvilCircle extends Shape{
  constructor(x, y, velX, velY){
    super(x,y,20,20);
    this.color = 'white';
    this.size = 10;
  }
  draw() {
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
 }
  checkBounds(){
    if(this.x + this.size >= width){
       this.x = this.x - this.size;
    }
    if(this.x - this.size <= 0){
      this.x = this.x + this.size;
    }
    if(this.y + this.size >= height){
      this.y = this.y - this.size;
    }
    if(this.y - this.size <= 0){
     this.y = this.y + this.size;
    }

  }
  
  setControls(){
    let _this = this;
    window.onkeydown = function(e) {
      if (e.keyCode === 37) {
        _this.x -= _this.velX;
      } else if (e.keyCode === 39) {
            _this.x += _this.velX;
      } else if (e.keyCode === 38) {
            _this.y -= _this.velY;
      } else if (e.keyCode === 40) {
            _this.y += _this.velY;
      }
    }
  }

  collisionDetect() {
    for (const ball of balls) {
       if (ball.exists) {
          const dx = this.x - ball.x;
          const dy = this.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < this.size + ball.size) {
            ball.exists = false;
            count--
          }if(count === 0){
            alert('Молодец)');
            location.reload();
          }
       }
    }
 }

}

const balls = [];

while (balls.length < 25) {
   const size = random(10,20);
   const ball = new Ball(
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      randomRGB(),
      size
   );
  count+= 1;
  balls.push(ball);
}

function loop() {
   ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
   ctx.fillRect(0, 0,  width, height);

   for (const ball of balls) {
     if(ball.exists){
        ball.draw();
        ball.update();
        ball.collisionDetect();
      }
   }

   requestAnimationFrame(loop);

 
    eBall.draw();
    eBall.checkBounds()
    eBall.collisionDetect();
    para.textContent = `Всего Шаров: ${count}`
}
let eBall = new EvilCircle(random(0,width),random(0,height));
eBall.setControls();

loop();

