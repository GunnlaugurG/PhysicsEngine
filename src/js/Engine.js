import { Vec2 } from "./Vec2";


export const playerRectCollision = (player, rect) => {
	if (player.velocity.y >= 0
		&&player.center.y + player.height + player.velocity.y >= rect.center.y - rect.height / 2
		&& player.center.y - player.height <= rect.center.y
		&& player.center.x <= rect.center.x + rect.width - player.width
		&& player.center.x + player.width >= rect.center.x) {
			player.center.y = rect.center.y - player.height - rect.height / 2;
			player.velocity.y = 0;
	}
} 

export const rectCircleCollision = (player, circle) => {
	const distX = Math.abs(circle.x - player.center.x - player.width / 2);
	const distY = Math.abs(circle.y - player.center.y - player.height / 2);

	if (distX > (player.width / 2 + circle.radius)) {
		return false;
	}

	if (distY > (player.height / 2 + circle.radius)) {
		return false;
	}

	if (distX <= (player.width / 2)) {
		return true;
	}
	
	if (distY <= (player.height / 2)) {
		return true;
	}

	const dx = distX - player.width / 2;
	const dy = distY - player.height / 2;
	return (dx*dx+dy*dy <= (circle.radius*circle.radius));
}

export const circleRectCollisionResponse = (rect, circle) => {
	
}

export const ballToBallCollision = (ball, otherBall) => {
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

const rotate = (velocity, angle) => {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

var positionalCorrection = function (s1, s2, collisionInfo) {
	var s1InvMass = s1.mInvMass;
	var s2InvMass = s2.mInvMass;

	var num = collisionInfo.getDepth() / (s1InvMass + s2InvMass) * 0.8;
	var correctionAmount = collisionInfo.getNormal().scale(num);

	s1.move(correctionAmount.scale(-s1InvMass));
	s2.move(correctionAmount.scale(s2InvMass));
};

export const resolveCollision = function (s1, s2, collisionInfo) {
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



