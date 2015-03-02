// updated 19 Feb 2014
// use `createImageData()` to get a byte array for pixel manipulation
// much faster than callings tons of draws for 2px by 2px rectangles
// and it makes more sense to have predefined arrays of pixels than
// to recreate them every draw

var context, width, height;
var level, currentLevel, MAX_LEVEL = 11;
var blockdude;
var block;
var door;
var brick;
var blockdudeRight;
var blockdudeLeft;

var ua = navigator.userAgent.toLowerCase();
var isAndroid = (ua.indexOf("android") > -1);
var isIPhone = (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))

function init_blockdude(id) {
	var tmp = document.getElementById(id);
	context = tmp.getContext("2d");
	width = tmp.width;
	height = tmp.height;
	block = context.createImageData(16, 16);
	defineBlock();
	door = context.createImageData(16, 16);
	defineDoor();
	brick = context.createImageData(16, 16);
	defineBrick();
	blockdudeRight = context.createImageData(16, 16);
	defineBlockDudeRight();
	blockdudeLeft = context.createImageData(16, 16);
	defineBlockDudeLeft();
	currentLevel = getParameterByName('I_shouldnt_but_I_am') || 0;
	win();
	draw();
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setPixel(data, x, y, r, g, b) {
	var index = Math.floor((x + y * 16) * 4);
	data[index] = r;
	data[index + 1] = g;
	data[index + 2] = b;
	data[index + 3] = 255;
}

function defineBlock() {
	var blockColors = [
		[0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0],
		[0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0],
		[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,0,0,0,1,1,1,1,1,1,1,1,1,1,0,0],
		[0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0]

	];
	for (var y = 0; y < 16; y++) {
		for (var x = 0; x < 16; x++) {
			var color = blockColors[y][x];
			setPixel(block.data, x, y, 255, color ? 0 : 255, color ? 0 : 255);
		}
	}
}

function defineDoor() {
	var x, y;
	var data = door.data;
	
	for (y = 2; y < 14; y++) {
		for (x = 4; x < 12; x++) {
			setPixel(data, x, y, 255, 255, 255);
		}
	}
	for (y = 0; y < 16; y++) {
		for (x = 0; x < 2; x++) {
			setPixel(data, x, y, 255, 255, 255);
		}
	}
	for (y = 0; y < 16; y++) {
		for (x = 14; x < 16; x++) {
			setPixel(data, x, y, 255, 255, 255);
		}
	}
	setPixel(data, 10, 7, 0, 0, 0);
	setPixel(data, 10, 8, 0, 0, 0);
	setPixel(data, 11, 7, 0, 0, 0);
	setPixel(data, 11, 8, 0, 0, 0);
}

function defineBrick() {
	var x, y;
	var data = brick.data;
	
	for (x = 10; x < 12; x++) {
		for (y = 0; y < 4; y++) {
			setPixel(data, x, y, 255, 255, 255);
		}
	}
	for (x = 0; x < 16; x++) {
		setPixel(data, x, 4, 255, 255, 255);
		setPixel(data, x, 5, 255, 255, 255);
		setPixel(data, x, 10, 255, 255, 255);
		setPixel(data, x, 11, 255, 255, 255);
	}
	for (x = 14; x < 16; x++) {
		for (y = 6; y < 12; y++) {
			setPixel(data, x, y, 255, 255, 255);
		}
	}
	for (x = 10; x < 12; x++) {
		for (y = 12; y < 16; y++) {
			setPixel(data, x, y, 255, 255, 255);
		}
	}
}

function defineBlockDudeRight() {
	var x, y;
	var data = blockdudeRight.data;
	
	for (x = 0; x < 16; x++) {
		for (y = 0; y < 16; y++) {
			setPixel(data, x, y, 255, 255, 255);
		}
	}
	
	for (x = 6; x < 12; x++) {
		setPixel(data, x, 0, 0, 0, 0);
		setPixel(data, x, 1, 0, 0, 0);
	}
	for (x = 4; x < 16; x++) {
		setPixel(data, x, 2, 0, 0, 0);
		setPixel(data, x, 3, 0, 0, 0);
	}
	for (x = 4; x < 6; x++) {
		for (y = 4; y < 8; y++) {
			setPixel(data, x, y, 0, 0, 0);
		}
	}
	for (x = 10; x < 12; x++) {
		for (y = 4; y < 6; y++) {
			setPixel(data, x, y, 0, 0, 0);
		}
	}
	for (x = 12; x < 14; x++) {
		for (y = 6; y < 8; y++) {
			setPixel(data, x, y, 0, 0, 0);
		}
	}
	
	defineBlockDudeLegs(data);
}

function defineBlockDudeLeft() {
	var x, y;
	var data = blockdudeLeft.data;
	
	for (x = 0; x < 16; x++) {
		for (y = 0; y < 16; y++) {
			setPixel(data, x, y, 255, 255, 255);
		}
	}
	
	for (x = 6; x < 12; x++) {
		setPixel(data, x, 0, 0, 0, 0);
		setPixel(data, x, 1, 0, 0, 0);
	}
	for (x = 2; x < 14; x++) {
		setPixel(data, x, 2, 0, 0, 0);
		setPixel(data, x, 3, 0, 0, 0);
	}
	for (x = 6; x < 8; x++) {
		for (y = 4; y < 6; y++) {
			setPixel(data, x, y, 0, 0, 0);
		}
	}
	for (x = 12; x < 14; x++) {
		for (y = 4; y < 8; y++) {
			setPixel(data, x, y, 0, 0, 0);
		}
	}
	for (x = 4; x < 6; x++) {
		for (y = 6; y < 8; y++) {
			setPixel(data, x, y, 0, 0, 0);
		}
	}
	
	defineBlockDudeLegs(data);
}

function defineBlockDudeLegs(data) {
	var x, y;
	for (x = 6; x < 8; x++) {
		for (y = 8; y < 10; y++) {
			setPixel(data, x, y, 0, 0, 0);
		}
	}
	for (x = 10; x < 12; x++) {
		for (y = 8; y < 10; y++) {
			setPixel(data, x, y, 0, 0, 0);
		}
	}
	for (x = 4; x < 6; x++) {
		for (y = 10; y < 12; y++) {
			setPixel(data, x, y, 0, 0, 0);
		}
	}
	for (x = 8; x < 10; x++) {
		for (y = 10; y < 14; y++) {
			setPixel(data, x, y, 0, 0, 0);
		}
	}
	for (x = 12; x < 14; x++) {
		for (y = 10; y < 12; y++) {
			setPixel(data, x, y, 0, 0, 0);
		}
	}
	for (x = 4; x < 8; x++) {
		for (y = 14; y < 16; y++) {
			setPixel(data, x, y, 0, 0, 0);
		}
	}
	for (x = 10; x < 14; x++) {
		for (y = 14; y < 16; y++) {
			setPixel(data, x, y, 0, 0, 0);
		}
	}
}

document.onkeydown = function(e) {
	e = e || window.event;
	if (e.keyCode == 37 || (isAndroid && e.keyCode == 65)) { //left arrow/a (Android)
		walkLeft();
	} else
	if (e.keyCode == 39 || (isAndroid && e.keyCode == 68)) { //right arrow/d (Android)
		walkRight();
	} else
	if (e.keyCode == 38 || (isAndroid && e.keyCode == 87)) { //up arrow/w (Android)
		climbBlock();
	} else
	if (e.keyCode == 40 || (isAndroid && e.keyCode == 83)) { //down arrow/s (Android)
		if (blockdude.isHoldingBlock()) {
			dropBlock();
		} else {
			pickUpBlock();
		}
	} else
	if (e.keyCode == 82) { //r
		currentLevel--;
		win();
		draw();
	} else 
	if (e.keyCode == 27) { //escape
		window.location.href = "../";
	}
}

function draw() {
	var startHeight;
	var startWidth;
	
	if (level.length > 15) {
		startHeight = blockdude.getY() - 8;
		if (startHeight < 0)
			startHeight = 0;
	} else {
		startHeight = 0;
	}
	if (level[0].length > 30) {
		startWidth = blockdude.getX() - 15;
		if (startWidth < 0)
			startWidth = 0;
	} else {
		startWidth = 0;
	}
	
	var endHeight = startHeight + 15;
	if (endHeight > level.length) {
		endHeight = level.length;
	}
	
	var endWidth = startWidth + 30;
	if (endWidth > level[0].length) {
		endWidth = level[0].length;
	}
	var offsetx = (30 - endWidth) / 2 * 16;
	var offsety = (15 - endHeight) / 2 * 16;
	
	context.fillStyle = "rgb(255, 255, 255)";
	context.fillRect(0, 0, width, height);
	context.fillStyle = "rgb(0, 0, 0)";
	
	for (var i = startHeight; i < endHeight; i++) {
		for (var j = startWidth; j < endWidth; j++) {
			var h = i - startHeight;
			var w = j - startWidth;
			
			if (this.level[i][j] == 1) {
				context.putImageData(block, w * 16 + offsetx, (15 - h - 1) * 16 - offsety);
			} else if (this.level[i][j] == 2) {
				context.putImageData(brick, w * 16 + offsetx, (15 - h - 1) * 16 - offsety);
			} else if (this.level[i][j] == 3) {
				context.putImageData(door, w * 16 + offsetx, (15 - h - 1) * 16 - offsety);
			}
		}
	}
	
	var offset = 15;
	if ((endHeight > 15) && (offset - blockdude.getY() < 7)) {
		offset = blockdude.getY() + 7;
	}
	
	if (blockdude.isHoldingBlock()) {
		context.putImageData(block, blockdude.getX() * 16 + offsetx, (offset - blockdude.getY() - 2) * 16 - offsety);
	}
	
	if (blockdude.getDirection()) {
		context.putImageData(blockdudeLeft, blockdude.getX() * 16 + offsetx, (offset - blockdude.getY()) * 16 - offsety - 16);
	} else {
		context.putImageData(blockdudeRight, blockdude.getX() * 16 + offsetx, (offset - blockdude.getY()) * 16 - offsety - 16);
	}
}

function walkLeft() {
	if (level[blockdude.getY()][blockdude.getX() - 1] == 0) {
		if (blockdude.isHoldingBlock()) {
			if (level[blockdude.getY() + 1][blockdude.getX() - 1] != 0) {
				var count = 0;
				while (level[blockdude.getY() - count - 1][blockdude.getX()] == 0) {
					count++;
				}
				level[blockdude.getY() - count][blockdude.getX()] = 1;
				blockdude.dropBlock();
			}
		}
		
		blockdude.moveLeft();
		
		var count = 0;
		while (level[blockdude.getY() - count - 1][blockdude.getX()] == 0) {
			count++;
		}
		blockdude.fall(count);
		
		if (level[blockdude.getY() - 1][blockdude.getX()] == 3) {
			win();
		}
	} else
	if (level[blockdude.getY()][blockdude.getX() - 1] == 3) {
		win();
	} else {
		blockdude.lookLeft();
	}
	draw();
}
function walkRight() {
	if (level[blockdude.getY()][blockdude.getX() + 1] == 0) {
		if (blockdude.isHoldingBlock()) {
			if (level[blockdude.getY() + 1][blockdude.getX() + 1] != 0) {
				var count = 0;
				while (level[blockdude.getY() - count - 1][blockdude.getX()] == 0) {
					count++;
				}
				level[blockdude.getY() - count][blockdude.getX()] = 1;
				blockdude.dropBlock();
			}
		}
		
		blockdude.moveRight();
		
		var count = 0;
		while (level[blockdude.getY() - count - 1][blockdude.getX()] == 0) {
			count++;
		}
		blockdude.fall(count);
		
		if (level[blockdude.getY() - 1][blockdude.getX()] == 3) {
			win();
		}
	} else
	if (level[blockdude.getY()][blockdude.getX() + 1] == 3) {
		win();
	} else {
		blockdude.lookRight();
	}
	draw();
}
function climbBlock() {
	if (blockdude.getDirection()) {
		if (level[blockdude.getY()][blockdude.getX() - 1] != 0) {
			if (level[blockdude.getY() + 1][blockdude.getX() - 1] == 0) {
				blockdude.moveUp();
			} else
			if (level[blockdude.getY() + 1][blockdude.getX() - 1] == 3) {
				win();
			}
		}
	} else {
		if (level[blockdude.getY()][blockdude.getX() + 1] != 0) {
			if (level[blockdude.getY() + 1][blockdude.getX() + 1] == 0) {
				blockdude.moveUp();
			} else
			if (level[blockdude.getY() + 1][blockdude.getX() + 1] == 3) {
				win();
			}
		}
	}
	draw();
}
function dropBlock() {
	if (blockdude.getDirection()) {
		if (level[blockdude.getY()][blockdude.getX() - 1] == 0) {
			var count = 0;
			while (level[blockdude.getY() - count - 1][blockdude.getX() - 1] == 0) {
				count++;
			}
			level[blockdude.getY() - count][blockdude.getX() - 1] = 1;
			blockdude.dropBlock();
		} else
		if (level[blockdude.getY() + 1][blockdude.getX() - 1] == 0) {
			level[blockdude.getY() + 1][blockdude.getX() - 1] = 1;
			blockdude.dropBlock();
		}
	} else
	if (!blockdude.getDirection()) {
		if (level[blockdude.getY()][blockdude.getX() + 1] == 0) {
			var count = 0;
			while (level[blockdude.getY() - count - 1][blockdude.getX() + 1] == 0) {
				count++;
			}
			level[blockdude.getY() - count][blockdude.getX() + 1] = 1;
			blockdude.dropBlock();
		} else
		if (level[blockdude.getY() + 1][blockdude.getX() + 1] == 0) {
			level[blockdude.getY() + 1][blockdude.getX() + 1] = 1;
			blockdude.dropBlock();
		}
	}
	draw();
}
function pickUpBlock() {
	if (blockdude.getDirection()) {
		if (level[blockdude.getY()][blockdude.getX() - 1] == 1) {
			if (level[blockdude.getY() + 1][blockdude.getX() - 1] == 0
			 && level[blockdude.getY() + 1][blockdude.getX()] == 0) {
				level[blockdude.getY()][blockdude.getX() - 1] = 0;
				blockdude.pickUpBlock();
			}
		}
	} else {
		if (level[blockdude.getY()][blockdude.getX() + 1] == 1) {
			if (level[blockdude.getY() + 1][blockdude.getX() + 1] == 0
			 && level[blockdude.getY() + 1][blockdude.getX()] == 0) {
				level[blockdude.getY()][blockdude.getX() + 1] = 0;
				blockdude.pickUpBlock();
			}
		}
	}
	draw();
}

function win() {
	if (currentLevel < MAX_LEVEL) {
		currentLevel++;
		var tmp = getLevel(currentLevel);
		level = new Array(tmp.length);
		for (var i = 0; i < tmp.length; i++) {
			level[i] = new Array(tmp[i].length);
			for (var j = 0; j < tmp[i].length; j++) {
				level[i][j] = tmp[level.length - 1 - i][j];
			}
		}
		return;
	}
	alert("You won");
}

function getLevel(lvl) {
	switch (lvl) {
	case 1:
		blockdude = new BlockDude(16, 2);
		var level1 = [
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 3, 0, 0, 2, 0, 0, 0, 2, 0, 1, 0, 2, 0, 1, 0, 0, 0, 0, 2 ],
			[ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
		];
		return level1;
	case 2:
		blockdude = new BlockDude(18, 3);
		var level2 = [
			[ 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0 ],
			[ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0 ],
			[ 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0 ],
			[ 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0 ],
			[ 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 2 ],
			[ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 1, 1, 0, 0, 0, 2 ],
			[ 0, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
			[ 0, 0, 0, 0, 0, 2, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
		];
		return level2;
	case 3:
		blockdude = new BlockDude(9, 4);
		var level3 = [
			[ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], 
			[ 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0 ],
			[ 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2 ],
			[ 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 0, 2, 2, 2 ],
			[ 2, 0, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 0, 0 ],
			[ 2, 0, 2, 0, 2, 1, 1, 0, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0 ],
			[ 2, 3, 2, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 0, 0, 0, 0, 0, 0 ],
			[ 2, 2, 2, 0, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0 ]
		];
		return level3;
	case 4:
		blockdude = new BlockDude(17, 6);
		var level4 = [
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0 ],
			[ 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0 ],
			[ 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2 ],
			[ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2 ],
			[ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2 ],
			[ 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0 ],
			[ 2, 3, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0 ],
			[ 2, 2, 2, 2, 2, 0, 2, 0, 1, 0, 0, 0, 1, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 2, 0, 2, 0, 1, 0, 2, 0, 2, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
		];
		return level4;
	case 5:
		blockdude = new BlockDude(12, 5);
		var level5 = [
			[ 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0 ],
			[ 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 0, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 3, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 0, 1, 2 ],
			[ 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 1, 1, 2 ],
			[ 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 1, 1, 1, 2 ],
			[ 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 2 ],
			[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0 ]
		];
		return level5;
	case 6:
		blockdude = new BlockDude(13, 5);
		var level6 = [
			[ 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2 ],
			[ 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2 ],
			[ 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2 ],
			[ 0, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 2, 2, 2 ],
			[ 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 0, 2, 0, 0 ],
			[ 0, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 2, 0, 0 ],
			[ 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0 ],
			[ 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
		];
		return level6;
	case 7:
		blockdude = new BlockDude(17, 4);
		var level7 = [
			[ 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0 ],
			[ 0, 2, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 2, 0, 2, 0, 0, 0, 2, 0 ],
			[ 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2 ],
			[ 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2 ],
			[ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2 ],
			[ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2 ],
			[ 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2 ],
			[ 2, 3, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2 ],
			[ 2, 2, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 2, 0, 0 ],
			[ 0, 2, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 2, 2, 0, 1, 0, 0, 2, 2, 2, 2, 0, 0 ],
			[ 0, 2, 2, 0, 0, 2, 0, 1, 1, 1, 0, 0, 2, 2, 0, 1, 1, 1, 2, 0, 0, 0, 0, 0 ],
			[ 0, 0, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0 ],
			[ 0, 0, 2, 2, 0, 2, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
		];
		return level7;
	case 8:
		blockdude = new BlockDude(20, 1);
		var level8 = [
			[ 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0 ],
			[ 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0 ],
			[ 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 1, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2 ],
			[ 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 2, 0, 0, 2 ],
			[ 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 0, 2 ],
			[ 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 2 ],
			[ 0, 0, 2, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2 ],
			[ 0, 0, 2, 0, 0, 0, 0, 1, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 2 ],
			[ 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 1, 2 ],
			[ 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 1, 1, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2 ],
			[ 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 2 ],
			[ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
		];
		return level8;
	case 9:
		blockdude = new BlockDude(14, 8);
		var level9 = [
			[ 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2, 2 ],
			[ 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2 ],
			[ 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2 ],
			[ 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 1, 1, 2 ],
			[ 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2 ],
			[ 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2 ],
			[ 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 2 ],
			[ 0, 2, 0, 0, 0, 0, 2, 2, 1, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 2 ],
			[ 0, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0 ],
			[ 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0 ],
			[ 0, 0, 0, 2, 0, 2, 2, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0 ],
			[ 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
		];
		return level9;
	case 10:
		blockdude = new BlockDude(14, 7);
		var level10 = [
			[ 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0 ],
			[ 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0 ],
			[ 2, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 1, 0, 0, 0, 1, 1, 1, 0, 1, 2, 2, 0 ],
			[ 2, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 1, 2, 2, 2, 0, 2, 2, 0, 2 ],
			[ 2, 0, 0, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 2, 2, 2, 0, 0, 2 ],
			[ 2, 0, 0, 0, 2, 2, 0, 0, 2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 3, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2 ],
			[ 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 0, 2, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2 ],
			[ 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2 ],
			[ 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0 ],
			[ 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 0 ],
			[ 0, 0, 0, 2, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 1, 1, 2, 0 ],
			[ 0, 0, 0, 2, 1, 1, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 1, 1, 1, 2, 0 ],
			[ 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0 ]
		];
		return level10;
	case 11:
		blockdude = new BlockDude(13, 14);
		var level11 = [
			[ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ],
			[ 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 0, 1, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 2 ],
			[ 2, 1, 0, 0, 0, 2, 2, 2, 0, 1, 2, 2, 0, 0, 0, 0, 0, 1, 0, 0, 2, 2, 0, 0, 3, 0, 2, 0, 2 ],
			[ 2, 1, 1, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 2 ],
			[ 2, 2, 2, 0, 0, 1, 1, 2, 0, 0, 0, 0, 0, 2, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2 ],
			[ 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 0, 0, 0, 2, 2, 2, 0, 0, 2 ],
			[ 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 2 ],
			[ 2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 2, 0, 2, 1, 0, 0, 0, 0, 2, 0, 0, 2, 2, 2, 2 ],
			[ 2, 2, 2, 2, 0, 1, 0, 0, 0, 2, 2, 2, 0, 0, 2, 0, 2, 2, 1, 0, 0, 2, 0, 1, 0, 2, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 2, 2, 2, 0, 0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 2, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 2 ],
			[ 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 2, 0, 2 ],
			[ 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 0, 1, 1, 2, 0, 2 ],
			[ 2, 1, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 2 ],
			[ 2, 2, 1, 2, 2, 2, 0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 2 ],
			[ 2, 1, 2, 1, 2, 1, 2, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 2 ],
			[ 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ]
		];
		return level11;
	}
	return [];
}

var BlockDude = function(x, y) {
	var self = this;
	
	self.x = x;
	self.y = y;
	self.direction = true;
	self.holdingBlock = false;
	
	self.moveLeft = function() {
		self.x--;
		self.direction = true;
	}
	self.moveRight = function() {
		self.x++;
		self.direction = false;
	}
	self.lookLeft = function() {
		self.direction = true;
	}
	self.lookRight = function() {
		self.direction = false;
	}
	self.moveUp = function() {
		self.y++;
		if (self.direction) {
			self.x--;
		} else {
			self.x++;
		}
	}
	self.pickUpBlock = function() {
		self.holdingBlock = true;
	}
	self.dropBlock = function() {
		self.holdingBlock = false;
	}
	self.getX = function() {
		return self.x;
	}
	self.getY = function() {
		return self.y;
	}
	self.fall = function(height) {
		self.y -= height;
	}
	self.getDirection = function() {
		return self.direction;
	}
	self.isHoldingBlock = function() {
		return self.holdingBlock;
	}
}
