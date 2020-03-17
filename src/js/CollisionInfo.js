import { Vec2 } from "./Vec2";

export class CollisionInfo {
	constructor() {
		this.mDepth = 0;
		this.mNormal = new Vec2(0, 0);
		this.mStart = new Vec2(0, 0);
		this.mEnd = new Vec2(0, 0);
	}
	
	setDepth(s) {
		this.mDepth = s;
	};

	setNormal(s) {
		this.mNormal = s;
	};

	getDepth() {
		return this.mDepth;
	};

	getNormal() {
		return this.mNormal;
	};

	setInfo(d, n, s) {
		this.mDepth = d;
		this.mNormal = n;
		this.mStart = s;
		this.mEnd = s.add(n.scale(d));
	};

	changeDir() {
		this.mNormal = this.mNormal.scale(-1);
		var n = this.mStart;
		this.mStart = this.mEnd;
		this.mEnd = n;
	};
}