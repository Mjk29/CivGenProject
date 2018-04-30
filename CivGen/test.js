

function writeMessage(canvas, message) {
	var context = canvas.getContext('2d');
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.font = '18pt Calibri';
	context.fillStyle = 'black';
	context.fillText(message, 10, 25);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}


function startCoord(argument) {

	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = getMousePos(canvas, evt);
		var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
		writeMessage(canvas, message);
		console.log(message);
	}, false);

}



function testfun(argument) {
console.log("WEHJRBHJLWEBL");
}