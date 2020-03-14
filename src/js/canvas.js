import utils from './utils';
import {Ball} from './Ball';

export const canvas = document.querySelector('canvas');
export const c = canvas.getContext('2d');

canvas.width = innerWidth
canvas.height = innerHeight

let moving = false;
let line = [];
const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

/** PlaceHolder line for shooting directions */
class Line {
  constructor(x, y, toX, toY) {
    this.x = x;
    this.y = y;
    this.toX = toX;
    this.toY = toY;
  }

  update() {
    this.draw();
  }

  draw() {
    c.beginPath();
    c.moveTo(this.x, this.y);
    c.lineTo(mouse.x, mouse.y);
    c.stroke();
    c.strokeStyle = 'black';
  }
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  if (moving) {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
  }
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
});

let extra = {
  x: null,
  y: null,
  xd: null,
  xy: null
}
addEventListener('mousedown', (event) => {
  moving = true;
  extra.x = event.clientX;
  extra.y = event.clientY;
  line.push(new Line(extra.x, extra.y, mouse.x, mouse.y));
  ballArray.push(new Ball(extra.x, extra.y, 0, 0, 30, 'green', true));

})

addEventListener('mouseup', (event) => {
  moving = false;
  line.pop();
  ballArray.pop();
  ballArray.push(new Ball(extra.x, extra.y, -(event.clientX - extra.x) / 10, -(event.clientY - extra.y) / 10, 30, 'red', false));
})




// Implementation
var ballArray = [];

function init() {
	ballArray = [];

	for (let i = 0; i < 40; i++) {
		var radius = 30;
		var x = utils.randomIntFromRange(radius, canvas.width - radius)
		var y = utils.randomIntFromRange(radius, canvas.height - radius)
		var dx = utils.randomIntFromRange(-3, 3)
		var dy = utils.randomIntFromRange(-2, 2)
    
    if ( i !== 0) {
      for (let j = 0; j < ballArray.length; j++) {
          const prev = ballArray[j];
          if((distance(x, y, prev.x, prev.y) - (radius * 2))  < 0) {
            var x = utils.randomIntFromRange(radius, canvas.width - radius);
            var y = utils.randomIntFromRange(radius, canvas.height - radius);
            
            j = -1;
          }
      }
    } 

    ballArray.push(new Ball(x, y, dx, dy, radius, 'blue', false));
	}
}

export function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1;
  const yDist = y2 - y1;
  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, canvas.width, canvas.height)
  ballArray.forEach(ball => {
   ball.update(ballArray)
  });
  if (line) {
    line.forEach(li => {
      li.update();
    })
  }
}


init()
animate()
