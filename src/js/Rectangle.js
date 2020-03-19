import { Vec2 } from "./Vec2";
import { c, canvas } from './canvas';
import { CollisionInfo } from "./CollisionInfo";
// import { CollisionInfo } from "./CollisionInfo";

var gravity = 1.5;
var friction = 0.4;

export class Rectangle {
	constructor(center, width, height, velocity, color, angle) {
		this.center = center;
		this.width = width;
		this.height = height;
		this.angle = 0;
		this.velocity = velocity;
		this.mass = 1;
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

		// if (this.center.x - (this.width / 2) <= 0 || this.center.x + (this.width / 2) >= innerWidth) {
		// 	this.velocity.x = - this.velocity.x;
		// }
		// if (this.center.y + this.height / 2 <= 0 || (this.center.y + this.height / 2) + this.velocity.y >= innerHeight) {
		// 	this.velocity.y = - this.velocity.y;
		// 	this.velocity.y = this.velocity.y * friction;
		// 	this.velocity.x = this.velocity.x * friction; 
		// }
		// this.move(new Vec2(-this.velocity.x, this.velocity.y + this.velocity.y));
		// this.velocity.y += gravity;
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

var positionalCorrection = function (s1, s2, collisionInfo) {
	var s1InvMass = s1.mInvMass;
	var s2InvMass = s2.mInvMass;

	var num = collisionInfo.getDepth() / (s1InvMass + s2InvMass) * 0.8;
	var correctionAmount = collisionInfo.getNormal().scale(num);

	s1.move(correctionAmount.scale(-s1InvMass));
	s2.move(correctionAmount.scale(s2InvMass));
};

var resolveCollision = function (s1, s2, collisionInfo) {
	if ((s1.mInvMass === 0) && (s2.mInvMass === 0)) {
		return;
	}

	positionalCorrection(s1, s2, collisionInfo);

	var n = collisionInfo.getNormal();

	//the direction of collisionInfo is always from s1 to s2
	//but the Mass is inversed, so start scale with s2 and end scale with s1
	var start = collisionInfo.mStart.scale(s2.mInvMass / (s1.mInvMass + s2.mInvMass));
	var end = collisionInfo.mEnd.scale(s1.mInvMass / (s1.mInvMass + s2.mInvMass));
	var p = start.add(end);
	//r is vector from center of object to collision point
	var r1 = p.subtract(s1.center);
	var r2 = p.subtract(s2.center);

	//newV = V + mAngularVelocity cross R
	var v1 = s1.velocity.add(new Vec2(-1 * s1.angularVelocity * r1.y, s1.angularVelocity * r1.x));
	var v2 = s2.velocity.add(new Vec2(-1 * s2.angularVelocity * r2.y, s2.angularVelocity * r2.x));

	var relativeVelocity = v2.subtract(v1);

	// Relative velocity in normal direction
	var rVelocityInNormal = relativeVelocity.dot(n);

	//if objects moving apart ignore
	if (rVelocityInNormal > 0) {
		return;
	}

	// compute and apply response impulses for each object    
	var newRestituion = Math.min(s1.mRestitution, s2.mRestitution);
	var newFriction = Math.min(s1.mFriction, s2.mFriction);

	//R cross N
	var R1crossN = r1.cross(n);
	var R2crossN = r2.cross(n);


	// Calc impulse scalar
	// the formula of jN can be found in http://www.myphysicslab.com/collision.html
	var jN = -(1 + newRestituion) * rVelocityInNormal;
	jN = jN / (s1.mInvMass + s2.mInvMass +
			R1crossN * R1crossN * s1.mInertia +
			R2crossN * R2crossN * s2.mInertia);

	//impulse is in direction of normal ( from s1 to s2)
	var impulse = n.scale(jN);

	// impulse = F dt = m * ?v
	// ?v = impulse / m
	s1.velocity = s1.velocity.subtract(impulse.scale(1));
	s2.velocity = s2.velocity.add(impulse.scale(1));

	s1.angularVelocity -= R1crossN * jN * s1.mInertia;
	s2.angularVelocity += R2crossN * jN * s2.mInertia;

	var tangent = relativeVelocity.subtract(n.scale(relativeVelocity.dot(n)));

	//relativeVelocity.dot(tangent) should less than 0
	tangent = tangent.normalize().scale(-1);


	var R1crossT = r1.cross(tangent);
	var R2crossT = r2.cross(tangent);


	var jT = -(1 + newRestituion) * relativeVelocity.dot(tangent) * newFriction;
	jT = jT / (s1.mInvMass + s2.mInvMass + R1crossT * R1crossT * s1.mInertia + R2crossT * R2crossT * s2.mInertia);

	//friction should less than force in normal direction
	if (jT > jN) {
		jT = jN;
	}

	//impulse is from s1 to s2 (in opposite direction of velocity)
	impulse = tangent.scale(jT);

	s1.velocity = s1.velocity.subtract(impulse.scale(s1.mInvMass));
	s2.velocity = s2.velocity.add(impulse.scale(s2.mInvMass));
	s1.angularVelocity -= R1crossT * jT * s1.mInertia;
	s2.angularVelocity += R2crossT * jT * s2.mInertia;
};

Rectangle.prototype.collidedRectRect = function (r1, r2, collisionInfo) {
	
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