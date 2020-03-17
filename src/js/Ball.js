import { distance, c, canvas } from './canvas';
import { ballToBallCollision, rectCircleCollision, circleRectCollisionResponse } from './Engine';
import { Vec2 } from './Vec2';

var gravity = 0.2;
var friction = 0.7;

export class Ball {
	constructor(x, y, dx, dy, radius, color, placeHolder) {
		this.x = x;
		this.y = y;
		this.velocity = new Vec2(dx, dy);
		this.radius = radius;
		this.color = color;
		this.mass = 1;
		this.placeHolder = placeHolder;
	}


	update(balls, rectArray) {
		if (!this.placeHolder) {
			let coll = false;
			for (let i = 0; i < balls.length; i++) {
				if (this === balls[i] || balls[i].placeHolder) continue;
				const prev = balls[i];
				if (distance(this.x + this.velocity.x, this.y + this.velocity.y, prev.x, prev.y) - this.radius * 2  < 0) {
					ballToBallCollision(this, balls[i]);
					coll = true;
				}
			}

			for(let rect of rectArray) {
				if (rectCircleCollision(rect, this)) {
					circleRectCollisionResponse(rect, this);
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
		}

		this.draw();
	};

	draw() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);	
		c.strokeStyle = this.color;
		c.stroke();
		c.closePath();
	};
}
