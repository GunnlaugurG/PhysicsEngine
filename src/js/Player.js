import { Vec2 } from "./Vec2";
import { c, canvas, init } from './canvas';
import { playerRectCollision, rectCircleCollision } from "./Engine";

var gravity = 1.5;
var friction = 0.4;

export class Player {
	constructor(center, width, height, velocity, color, angle) {
		this.moving = {
			left: false,
			right: false,
			up: false
		};
		this.jumping = false;
		this.center = center;
		this.width = width;
		this.height = height;
		this.angle = angle;
		this.velocity = velocity;
		this.mass = 1;
		this.color = color;
		this.vertexes = [
			new Vec2(center.x - height / 2, center.y - height / 2),
			new Vec2(center.x + height / 2, center.y - height / 2),
			new Vec2(center.x + height / 2, center.y + height / 2),
			new Vec2(center.x - height / 2, center.y + height / 2),
		];
	}

	controll(key, value) {
		if (key === 'a') {
			this.moving.left = value
		} else if (key === 'd') {
			this.moving.right = value;
		} else if (key === ' ' || key === 'w') {
			this.moving.up = value;
		}

	}

	update(rectArray, ballArray) {
		this.velocity.y += gravity;
		this.velocity.x *= 0.9;

		// Check if player died
		if (this.center.y >= canvas.height) {
			init();
		}

		if (rectArray) {
			for (let rect of rectArray) {
				if (this.velocity.y >= 0) {
					playerRectCollision(this, rect);
				}
			}
		}
		if (ballArray) {
			for (let circle of ballArray) {
				if (rectCircleCollision(this, circle)) {
					init();
					console.log('collision');
				}
			}
		}
		if (this.center.x - (this.width / 2) + this.velocity.x <= 0 || this.center.x + (this.width / 2) + this.velocity.x >= innerWidth) {
			this.velocity.x = - this.velocity.x;
			this.velocity.x = this.velocity.x * friction;
		}
		if (this.moving.left) {
			this.velocity.x -= 1;
		} else if (this.moving.right) {
			this.velocity.x += 1;
		} else if (this.moving.up) {
			this.velocity.y = -20;
		}

		this.center.x += this.velocity.x;
		this.center.y += this.velocity.y;
		this.draw();
	}

	draw() {
		c.beginPath();
		c.rect(this.center.x, this.center.y, this.width, this.height);
		c.fill();
		c.fillStyle = 'red'
		c.strokeStyle = "red";
		c.stroke();
		c.closePath();
	}
}
