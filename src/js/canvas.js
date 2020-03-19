import utils from './utils';
import {Ball} from './Ball';
import { Rectangle } from './Rectangle';
import { Vec2 } from './Vec2';
import { Player } from './Player';
import { StickBox } from './StickBox';

export const canvas = document.querySelector('canvas');
export const c = canvas.getContext('2d');

canvas.width = innerWidth
canvas.height = innerHeight

let charInput = false;
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
    placeH.center.y = event.clientY;
    placeH.center.x = event.clientX; 
  }
});

addEventListener('keydown', (event) => {
  player.controll(event.key, true);
});

addEventListener('keyup', (event) => {
  player.controll(event.key, false);
});



addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
  init()
});

let placeH = null;
let extra = {
  x: null,
  y: null,
  width: null,
  height: null,
}

addEventListener('mousedown', (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  placeH = new Rectangle(new Vec2(mouse.x, mouse.y), 100, 20, new Vec2(0,0), 'purple', 0, false);
  moving = true;
})

addEventListener('mouseup', (event) => {
  moving = false;
  rectArray.push(placeH);
  placeH = null;
})




// Implementation
var ballArray = [];
var rectArray = [];
let player = null;
let stickyBox = null;

export function init() {
  ballArray = [];
  stickyBox = new StickBox(100, 100, 100, 100);
  player = new Player(new Vec2(canvas.width / 2, canvas.height / 2), 20, 20, new Vec2(0, 0), 'blue', 0);
  [0,1,2,3,4,5,6,6,7,8,3].map(() => {
    rectArray.push(new Rectangle(new Vec2(utils.randomIntFromRange(0, canvas.width), utils.randomIntFromRange(0, canvas.height)), 100, 20, new Vec2(utils.randomIntFromRange(-40, 40), utils.randomIntFromRange(-40, 40)), 'green', utils.randomIntFromRange(0, 4)));
  })
  rectArray.push(new Rectangle(new Vec2(canvas.width / 2, canvas.height / 2), 200, 30, new Vec2(0, 0), 'green', 0));

  // rectArray.push(new Rectangle(new Vec2(canvas.width / 2 - 100, canvas.height / 2), 100, 20, new Vec2(20, 0), 'green', utils.randomIntFromRange(0, 4)));
  // rectArray.push(new Rectangle(new Vec2(canvas.width / 2 + 100, canvas.height / 2), 100, 20, new Vec2(-20, 0), 'green', utils.randomIntFromRange(0, 4)));

	for (let i = 0; i < 7; i++) {
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
  
  // ballArray.forEach(ball => {
  //  ball.update(ballArray, rectArray);
  // });

  if (line) {
    line.forEach(li => {
      li.update();
    })
  }
  rectArray.forEach((rect) => {
    rect.update(rectArray, ballArray);
  })
  
  // player.update(rectArray, ballArray);
  // stickyBox.update();

  // if (placeH) {
  //   placeH.update();
  // }
}


init()
animate()
