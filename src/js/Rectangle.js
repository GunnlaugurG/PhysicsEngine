import { Vec2 } from "./Vec2";
import { c, canvas } from './canvas';
import { CollisionInfo } from "./CollisionInfo";
// import { CollisionInfo } from "./CollisionInfo";

var gravity = 0.2;
var friction = 0.9;

export class Rectangle {
	constructor(center, width, height, velocity, color, angle) {
		this.center = center;
		this.x = center.x;
		this.y = center.y;
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
		this.faceNormal = []
		this.faceNormal[0] = this.vertexes[1].subtract(this.vertexes[2]);
		this.faceNormal[0] = this.faceNormal[0].normalize();
		this.faceNormal[1] = this.vertexes[2].subtract(this.vertexes[3]);
		this.faceNormal[1] = this.faceNormal[1].normalize();
		this.faceNormal[2] = this.vertexes[3].subtract(this.vertexes[0]);
		this.faceNormal[2] = this.faceNormal[2].normalize();
		this.faceNormal[3] = this.vertexes[0].subtract(this.vertexes[1]);
		this.faceNormal[3] = this.faceNormal[3].normalize();
		this.kFPS = 60;          // Frames per second
		this.kFrameTime = 1 / this.kFPS;
		this.mUpdateIntervalInSeconds = this.kFrameTime;
	}

	update() {
		this.draw();
	}

	move(v) {
		for (var i = 0; i < this.vertexes.length; i++) {
			this.vertexes[i] = this.vertexes[i].add(v);
		}
		this.center = this.center.add(v);
	}

	draw() {
		c.save();
		c.translate(this.vertexes[0].x, this.vertexes[0].y);
		c.rotate(this.angle);
		c.strokeStyle = this.color;
		c.strokeRect(0, 0, this.width, this.height);
		c.restore();
	}
};
