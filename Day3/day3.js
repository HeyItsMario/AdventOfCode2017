
var Point = function(x,y) {
	this.x = x;
	this.y = y;
}

var Spiral = function() {
	this.source = new Point(0,0);
	this.path = new Point(0,0);

	this.topBorder = 1;
	this.bottomBorder = -1;
	this.leftBorder = -1;
	this.rightBorder = 1;
}

Spiral.prototype.getDistance = function(destination) {
	let pth = 1;
	pointArray.push(this.source);
	valueArray.push(1);

	while(pth < destination){
		// move right
		while(this.path.x < this.rightBorder && pth < destination){
			this.path.x += 1;
			assignValue(this.path.x, this.path.y);
			pth++;
		}

		this.rightBorder++;
		
		// move top
		while(this.path.y < this.topBorder && pth < destination){
			this.path.y += 1;
			assignValue(this.path.x, this.path.y)
			pth++;
		}
		
		this.topBorder++;
		
		// move left
		while(this.path.x > this.leftBorder && pth < destination){
			this.path.x -= 1;
			assignValue(this.path.x, this.path.y)
			pth++;
		}

		this.leftBorder--;
		
		// move bot
		while(this.path.y > this.bottomBorder && pth < destination){
			this.path.y -= 1;
			assignValue(this.path.x, this.path.y)
			pth++;
		}

		this.bottomBorder--;
		
	}

	var result = Math.abs(this.path.x) + Math.abs(this.path.y);
	console.log(valueArray);

};

function assignValue(x,y) {
	let point = new Point(x, y);
	pointArray.push(point);
	valueArray.push(getValue(point))
}

function getValue(source) {
	let xVal = source.x;
	let yVal = source.y;
	let sum = 0;

	var neighbors = [
		new Point(xVal - 1, yVal),
		new Point(xVal + 1, yVal),
		new Point(xVal, yVal - 1),
		new Point(xVal, yVal + 1),
		new Point(xVal + 1, yVal + 1),
		new Point(xVal - 1, yVal + 1),
		new Point(xVal + 1, yVal - 1),
		new Point(xVal - 1, yVal - 1),
	];

	neighbors.forEach(neighbor => {
		let index = pointArray.findIndex(neighbor);
		if( index !== -1 ){
			sum += valueArray[index];
		}
	})
	
	return sum;

}

var pointArray = [];
var valueArray = [];
var sprl = new Spiral();

pointArray.__proto__.findIndex = function(point) {
	let index = -1;

	for(let i = 0; i < this.length; i++){
		if(this[i].x === point.x && this[i].y === point.y){
			return i;
		}
	}
	return index;
}

sprl.getDistance(100);
