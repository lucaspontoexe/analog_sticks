class Stick {
	constructor(maxLength, active) {
		this.active = active;
		this.atLimit = false;
		this.length = 1;
		this.maxLength = maxLength;
		this.limit = {
			x: 0,
			y: 0
		};
		this.input = {
			x: 0,
			y: 0
		};
	}

	getRadians(x, y) {
		return Math.atan2(x, -y);
	}

	getVectorFromRadians(radians, length) {
		length = (Number(length) || 1);
		return {
			x: (Math.sin(radians) * length),
			y: (-Math.cos(radians) * length)
		};
	}

	getVectorLength(v) {
		return Math.sqrt((v.x * v.x) + (v.y * v.y));
	}

	getVectorNormal(v) {
		let len = this.getVectorLength(v);
		if (len === 0) {
			return v;
		} else {
			return {
				x: (v.x * (1 / len)),
				y: (v.y * (1 / len))
			};
		}
	}

	setLimitXY(x, y) {
		this.limit = {x, y};
	}

	setInputXY(x, y) {
		this.input = {x, y};
	}

	subtractVectors(v1, v2) {
		return {
			x: (v1.x - v2.x),
			y: (v1.y - v2.y)
		};
	}
	
	update() {
		let diff = this.subtractVectors(this.input, this.limit);
		let length = this.getVectorLength(diff);
		
		if (Math.round(length) >= this.maxLength) {
			length = this.maxLength;
			let rads = this.getRadians(diff.x, diff.y);
			this.atLimit = true;
			this.input = this.getVectorFromRadians(rads, length);
			this.input.x += this.limit.x;
			this.input.y += this.limit.y;
		} 
		
		else {
			this.atLimit = false;
		}

		this.length = length;
		this.normal = this.getVectorNormal(diff);
	}
};