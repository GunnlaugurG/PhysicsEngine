import { distance } from './canvas';

var gravity = 0.2;
var friction = 0.9;

export class Ball {
	constructor(x, y, dx, dy, radius, color, c, canvas) {
		this.x = x;
		this.y = y;
		this.velocity = {
			x: dx,
			y: dy
		}
		this.radius = radius;
		this.color = color;
		this.c = c;
		this.canvas = canvas;
		this.mass = 1;
	}


	update(balls) {
		let coll = false;
		for (let i = 0; i < balls.length; i++) {
			if (this === balls[i] ) continue;
			const prev = balls[i];
			if (distance(this.x + this.velocity.x, this.y + this.velocity.y, prev.x, prev.y) - this.radius * 2  < 0) {
				resolveCollision(this, balls[i]);
				coll = true;
			}
		}
		
		if (this.x - this.radius <= 0 || this.x + this.radius >= innerWidth) {
			this.velocity.x = - this.velocity.x;
		}
		if ((this.y - this.radius) + this.velocity.y <= 0 || (this.y + this.radius) + this.velocity.y >= innerHeight) {
			this.velocity.y = - this.velocity.y;
			this.velocity.y = this.velocity.y * friction;
			this.velocity.x = this.velocity.x * friction;
		}
		else {
			if (!coll) {
				this.velocity.y += gravity;
			} else {
			}
		}
		this.x += this.velocity.x;
		this.y += this.velocity.y;

		// if (this.y + this.radius + this.velocity.y > this.canvas.height) {
		// 	this.velocity.y = -this.velocity.y;
		// 	this.velocity.y = this.velocity.y * friction;
		// 	this.velocity.x = this.velocity.x * friction;
		// } else {
		// 	this.velocity.y += gravity;
		// }

		// if (this.x + this.radius >= this.canvas.width || this.x - this.radius <= 0) {
		// 	this.velocity.x = -this.velocity.x * friction;
		// }

		// this.x += this.velocity.x;
		// this.y += this.velocity.y;

		this.draw();
	};

	draw() {
		this.c.beginPath();
		this.c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		this.c.fillStyle = this.color;
		this.c.strokeStyle = this.color;
		// this.c.fill();
		this.c.stroke();
		this.c.closePath();
	};
}


function resolveCollision(ball, otherBall) {
    const xVelocityDiff = ball.velocity.x - otherBall.velocity.x;
    const yVelocityDiff = ball.velocity.y - otherBall.velocity.y;

    const xDist = otherBall.x - ball.x;
    const yDist = otherBall.y - ball.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherBall.y - ball.y, otherBall.x - ball.x);

        // Store mass in var for better readability in collision equation
        const m1 = ball.mass;
        const m2 = otherBall.mass;

        // Velocity before equation
        const u1 = rotate(ball.velocity, angle);
        const u2 = rotate(otherBall.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        ball.velocity.x = vFinal1.x;
        ball.velocity.y = vFinal1.y;

        otherBall.velocity.x = vFinal2.x;
        otherBall.velocity.y = vFinal2.y;
    }
}

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}