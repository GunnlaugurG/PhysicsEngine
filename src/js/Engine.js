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

