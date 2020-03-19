import {c, canvas} from './canvas';

const gravity = 1.5;
const bounce = 0.9;
const friction = 0.9;

export class StickBox {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.points = [];
		this.sticks = [];
		this.create();
	};

	update() {
		this.updatePoints();
			this.constrainPoints();
		// for(var i = 0; i < 5; i++) {
			this.updateSticks();
		// }
		this.renderPoints();
		this.renderSticks();
	}

	create() {
		this.cratePoint(this.x, this.y);
		this.cratePoint(this.x + this.width, this.y);
		this.cratePoint(this.x + this.width, this.y + this.height);
		this.cratePoint(this.x, this.y + this.height);

		this.creatStick(0, 1);
		this.creatStick(1, 2);
		this.creatStick(2, 3);
		this.creatStick(3, 0);
		this.creatStick(0, 2);
		this.creatStick(1, 3);
	}

	creatStick(p1, p2) {
		this.sticks.push({
			p0: this.points[p1],
			p1: this.points[p2],
			length: this.distance(this.points[p1], this.points[p2])
		});
	}

	cratePoint(xCor, yCor) {
		this.points.push({
			x: xCor,
			y: yCor,
			oldx: xCor + Math.random() * 30 - 15,
			oldy: yCor + Math.random() * 30 - 15
		});
	}

	distance(p0, p1) {
		var dx = p1.x - p0.x,
			dy = p1.y - p0.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	updatePoints() {
		for(var i = 0; i < this.points.length; i++) {
			var p = this.points[i];
			var vx = (p.x - p.oldx) * friction;
			var vy = (p.y - p.oldy) * friction;

			p.oldx = p.x;
			p.oldy = p.y;
			p.x += vx;
			p.y += vy;
			p.y += gravity;
		}
	}

	constrainPoints() {
		for(var i = 0; i < this.points.length; i++) {
			var p = this.points[i],
				vx = (p.x - p.oldx) * friction,
				vy = (p.y - p.oldy) * friction;

			if(p.x > canvas.width) {
				p.x = canvas.width;
				p.oldx = p.x + vx * bounce;
			}
			else if(p.x < 0) {
				p.x = 0;
				p.oldx = p.x + vx * bounce;
			}
			if(p.y > canvas.height) {
				p.y = canvas.height;
				p.oldy = p.y + vy * bounce;
			}
			else if(p.y < 0) {
				p.y = 0;
				p.oldy = p.y + vy * bounce;
			}
		}
	}

	updateSticks() {
		for(var i = 0; i < this.sticks.length; i++) {
			var s = this.sticks[i],
				dx = s.p1.x - s.p0.x,
				dy = s.p1.y - s.p0.y,
				distance = Math.sqrt(dx * dx + dy * dy),
				difference = s.length - distance,
				percent = difference / distance / 2,
				offsetX = dx * percent,
				offsetY = dy * percent;

			s.p0.x -= offsetX;
			s.p0.y -= offsetY;
			s.p1.x += offsetX;
			s.p1.y += offsetY;
		}
	}

	renderPoints() {
		// for(var i = 0; i < this.points.length; i++) {
		// 	var p = this.points[i];
		// 	c.beginPath();
		// 	c.arc(p.x, p.y, 5, 0, Math.PI * 2);
		// 	c.fill();
		// 	c.fillStyle = 'red'
		// 	c.closePath()
		// }
	}

	renderSticks() {
		c.beginPath();
		for(var i = 0; i < this.sticks.length; i++) {
			var s = this.sticks[i];
			c.moveTo(s.p0.x, s.p0.y);
			c.lineTo(s.p1.x, s.p1.y);
			c.strokeStyle = 'red'
		}
		c.stroke();
		c.closePath();
	}
}