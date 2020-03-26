import { Vec2 } from "./Vec2";
import { c, canvas } from './canvas';
import { CollisionInfo } from "./CollisionInfo";
import { resolveCollision } from "./Engine";

var gravity = 1.5;
var friction = 0.4;

export class Rectangle {
	constructor(center, width, height, velocity, color, angle, shouldMove) {
		this.center = center;
		this.width = width;
		this.height = height;
		this.angle = 0;
		this.velocity = velocity;
		this.mass = 1;
		this.shouldMove = shouldMove;
		this.mFriction = friction;
		this.mInvMass = 1;
		this.angularVelocity = 0;
		this.angularAcceleration = 0;
		this.mRestitution = 0.2;
		this.color = color;
		this.acceleration = new Vec2(0, 40);
		this.mInertia = 0;
		this.mBoundRadius = Math.sqrt(width * width + height * height) / 2;
		this.vertexes = [
			new Vec2(center.x - width / 2, center.y - height / 2),
			new Vec2(center.x + width / 2, center.y - height / 2),
			new Vec2(center.x + width / 2, center.y + height / 2),
			new Vec2(center.x - width / 2, center.y + height / 2)
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
		this.kFPS = 20;          // Frames per second
		this.kFrameTime = 1 / this.kFPS;
		this.mUpdateIntervalInSeconds = this.kFrameTime;
		this.rotate(angle)
		this.updateInertia();
	}

	update(rectArray, ballArray) {

		const dt = this.mUpdateIntervalInSeconds;
		this.velocity = this.velocity.add(this.acceleration.scale(dt));
		this.move(this.velocity.scale(dt));
		this.angularVelocity += this.angularAcceleration * dt;
		this.rotate(this.angularVelocity * dt);

		for (let i = 0; i < rectArray.length; i++) {
			if (this === rectArray[i]) continue;
			if (this.boundTest(rectArray[i])) {
					let collisionInfo = new CollisionInfo();
					if (this.collidedRectRect(this, rectArray[i], collisionInfo)) {
						if (collisionInfo.getNormal().dot(rectArray[i].center.subtract(this.center)) < 0) {
							collisionInfo.changeDir();
						}
						resolveCollision(this, rectArray[i], collisionInfo);

					}
				}
		}

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
		c.beginPath();
		c.arc(this.center.x, this.center.y, 5, 0, Math.PI * 2, false);
		c.stroke();
		c.closePath();
	}

	
	rotate(angle) {
		this.angle += angle;

		for (var i = 0; i < this.vertexes.length; i++) {
			this.vertexes[i] = this.vertexes[i].rotate(this.center, angle);
		}
		this.faceNormal[0] = this.vertexes[1].subtract(this.vertexes[2]);
		this.faceNormal[0] = this.faceNormal[0].normalize();
		this.faceNormal[1] = this.vertexes[2].subtract(this.vertexes[3]);
		this.faceNormal[1] = this.faceNormal[1].normalize();
		this.faceNormal[2] = this.vertexes[3].subtract(this.vertexes[0]);
		this.faceNormal[2] = this.faceNormal[2].normalize();
		this.faceNormal[3] = this.vertexes[0].subtract(this.vertexes[1]);
		this.faceNormal[3] = this.faceNormal[3].normalize();
		return this;
	};

	updateInertia() {
		// Expect this.mInvMass to be already inverted!
		if (this.mInvMass === 0) {
			this.mInertia = 0;
		} else {
			//inertia=mass*width^2+height^2
			this.mInertia = (1 / this.mInvMass) * (this.width * this.width + this.height * this.height) / 12;
			this.mInertia = 1 / this.mInertia;
		}
	};

	boundTest(other) {
		var vFrom1to2 = other.center.subtract(this.center);
		var rSum = this.mBoundRadius + other.mBoundRadius;
		var dist = vFrom1to2.length();
		if (dist > rSum) {
			//not overlapping
			return false;
		}
		return true;
	};

	findAxisLeastPenetration(otherRect, collisionInfo) {

		var n;
		var supportPoint;
	
		var bestDistance = 999999;
		var bestIndex = null;
	
		var hasSupport = true;
		var i = 0;
		
		while ((hasSupport) && (i < this.faceNormal.length)) {
			// Retrieve a face normal from A
			n = this.faceNormal[i];
	
			// use -n as direction and the vectex on edge i as point on edge
			var dir = n.scale(-1);
			var ptOnEdge = this.vertexes[i];
			// find the support on B
			// the point has longest distance with edge i 
			otherRect.findSupportPoint(dir, ptOnEdge);
			hasSupport = (tmpSupport.mSupportPoint !== null);
			//get the shortest support point depth
			if ((hasSupport) && (tmpSupport.mSupportPointDist < bestDistance)) {
				bestDistance = tmpSupport.mSupportPointDist;
				bestIndex = i;
				supportPoint = tmpSupport.mSupportPoint;
			}
			i = i + 1;
		}
		if (hasSupport) {
			//all four directions have support point
			var bestVec = this.faceNormal[bestIndex].scale(bestDistance);
			collisionInfo.setInfo(bestDistance, this.faceNormal[bestIndex], supportPoint.add(bestVec));
		}

		return hasSupport;
	};

	collidedRectRect(r1, r2, collisionInfo) {
		var collisionInfoR1 = new CollisionInfo();
		var collisionInfoR2 = new CollisionInfo();
		var status1 = false;
		var status2 = false;
	
		//find Axis of Separation for both rectangle
		status1 = r1.findAxisLeastPenetration(r2, collisionInfoR1);
	
		if (status1) {
			status2 = r2.findAxisLeastPenetration(r1, collisionInfoR2);
			if (status2) {
				//if both of rectangles are overlapping, choose the shorter normal as the normal       
				if (collisionInfoR1.getDepth() < collisionInfoR2.getDepth()) {
					var depthVec = collisionInfoR1.getNormal().scale(collisionInfoR1.getDepth());
					collisionInfo.setInfo(collisionInfoR1.getDepth(), collisionInfoR1.getNormal(), collisionInfoR1.mStart.subtract(depthVec));
				} else {
					collisionInfo.setInfo(collisionInfoR2.getDepth(), collisionInfoR2.getNormal().scale(-1), collisionInfoR2.mStart);
				}
			} 
		}
		return status1 && status2;
	};
}



var SupportStruct = function () {
    this.mSupportPoint = null;
    this.mSupportPointDist = 0;
};
var tmpSupport = new SupportStruct();


Rectangle.prototype.findSupportPoint = function (dir, ptOnEdge) {
    //the longest project length
    var vToEdge;
    var projection;

    tmpSupport.mSupportPointDist = -9999999;
    tmpSupport.mSupportPoint = null;
    //check each vector of other object
    for (var i = 0; i < this.vertexes.length; i++) {
        vToEdge = this.vertexes[i].subtract(ptOnEdge);
        projection = vToEdge.dot(dir);
        
        //find the longest distance with certain edge
        //dir is -n direction, so the distance should be positive       
        if ((projection > 0) && (projection > tmpSupport.mSupportPointDist)) {
            tmpSupport.mSupportPoint = this.vertexes[i];
            tmpSupport.mSupportPointDist = projection;
        }
	}
};