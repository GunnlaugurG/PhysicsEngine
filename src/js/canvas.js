import utils from './utils';
import {Ball} from './Ball';

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth
canvas.height = innerHeight



const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66']

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
})

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight

  init()
})

addEventListener('click', (event) => {
  console.log('clicked');
  init()
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

    ballArray.push(new Ball(x, y, dx, dy, radius, 'blue', c, canvas));
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
  })
}


init()
animate()
