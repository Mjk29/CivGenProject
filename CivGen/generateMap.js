

//This writes data to the canvas
function generateMap(argument) {
	var canvas=document.getElementById("myCanvas");
	var ctx=canvas.getContext("2d");

	var scaleFactor =  Number(document.getElementById("scaleFactor").value)
	var N = Number(document.getElementById("nVal").value);
	var nVal =   Math.pow(2,N);
	var nvalP1 = Math.pow(2,N)+1;
	var seed = document.getElementById("seed").value;
	Math.seedrandom(seed);


	randVal = Number(document.getElementById("randVal").value);

	// console.log("N : "+N);
	// console.log("NVal : "+nVal);
	// console.log("NvalP1 : "+nvalP1);

	// var canvasHeight = Number(document.getElementById("Height").value);


	
	// console.log(imgData.data.length);
	//imgData.data.length = 4000000
	//x * y * 4

	var DSArray = [];

	DSArray = DiamondSquareAlgo(nVal,nvalP1,seed,N);

	var scaleArray =[];
	scaleArray = scaleImageArray(DSArray);

	canvas.width=scaleArray.length;
	canvas.height=scaleArray.length;

	// console.log("SCALE ARRATY SIZE "+ scaleArray.length);
	// console.log("canvas SIZE "+ canvas.width);
	// console.log("canvas SIZE "+ canvas.height);

	// for (var i = 0; i < DSArray[0].length; i++) {
	// 	console.log(DSArray[i]);
	// }

	// console.log("DS ROW LEN "+DSArray.length);
	// console.log("DS COL LEN "+DSArray[0].length);
	// console.log("NVAL VAL "+ nvalP1);
	// console.log(scaleArray);

	var imgSingleArray = doubleArrayToSingleThreshold(scaleArray);

	// console.log("here is the img single arrayt");
	// console.log(imgSingleArray);



	// console.log("IMGDATA LENGTH :"+imgData.data.length);
	// console.log("IMGSINGLEARRAY LENGTH  : "+imgSingleArray.length);

	// for (var i = 0; i < imgSingleArray.length; i++) {
	// 	// console.log(imgSingleArray[i]);
	// 	imgData.data[i+0]=0;
	// 	imgData.data[i+1]=0;
	// 	imgData.data[i+2]=0;

	// 	imgData.data[i+3]=imgSingleArray[i];

	// }


	// console.log("IMGDATA LENGTH :"+imgData.data.length);
	// console.log("IMGSINGLEARRAY LENGTH  : "+imgSingleArray.length);
	
	// console.log("scale length "+scaleArray.length);

	var imgData=ctx.createImageData(scaleArray.length,scaleArray.length);


	writeToCanvas(imgData, imgSingleArray, ctx);


	// console.log(nvalP1/2);
	// console.log((nvalP1-1)/2);
	// console.log((nvalP1+1)/2);


	// console.log(DSArray);
	// // console.log(nVal);
	// // console.log(nvalP1);
	// console.log(DSArray[0][0]+'  '+DSArray[0][nVal]);
	// console.log(DSArray[nVal][0]+'  '+DSArray[nVal][nVal]);


	//Print grid
	// console.log("Printing in main function");
	// printGrid(DSArray,nvalP1);



}


function scaleImageArray(DSArray) {
	var scaleArray=[];

	var scale = Number(document.getElementById("scaleFactor").value);
	if (scale == 1) {
		return DSArray;
	}

	for (var i = 0; i < DSArray.length*scale; i++) {
		scaleArray[i] = [];
	}
	clearGrid(scaleArray,scaleArray.length);
	
	for (var i = 0; i < DSArray.length; i++) {
		for (var j = 0; j < DSArray[i].length; j++) {
			// console.log("test A "+i+' '+j);
			for (var l = 0; l < scale; l++) {

				for (var k = 0; k < scale; k++) {
									// console.log("test B "+i+' '+j);

					scaleArray[i*scale+l][j*scale+k] = DSArray[i][j];
					// console.log("test");
					// console.log("("+i*scale+l+","+j*scale+k+")");
				}
			}
		}
	}




	// for (var i = 0; i < DSArray.length; i++) {
	// 	for (var j = 0; j < DSArray[i].length; j++) {
	// 		scaleArray[i*scale][j*scale] = DSArray[i][j];
	// 		scaleArray[i*scale+1][j*scale] = DSArray[i][j];
	// 		scaleArray[i*scale][j*scale+1] = DSArray[i][j];
	// 		scaleArray[i*scale+1][j*scale+1] = DSArray[i][j];
	// 	}
	// }




	return scaleArray;
}


function readFromCanvas() {
	readArray = [];	
	var channel = Number(document.getElementById("channel").value);
	var datCount = channel;

	


	var N = Number(document.getElementById("nVal").value);
	var nvalP1 = Math.pow(2,N)+1;

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");
	 
// clearGrid(ReadArray);
	for (var i = 0; i < nvalP1; i++) {
		readArray[i] = [];
	}
	clearGrid(readArray);

	var imgData = ctx.getImageData(0, 0, nvalP1, nvalP1);

	console.log(imgData.data);
	for (var i = 0; i < nvalP1; i++) {
		for (var j = 0; j < nvalP1; j++) {
			readArray[i][j] = imgData[datCount+=channel];
			console.log("> "+ datCount+" > " +imgData.data[datCount+channel]);
		}
	}
	
	console.log(readArray);
	printGrid(readArray,nvalP1);

	
	// for (var i=0;i<imgData.data.length;i+=4)
	// 	imgData.data[i+3] = imgSingleArray[datCount++];
	// }
	



}




function writeToCanvas(imgData, imgSingleArray, ctx) {
	var datCount=0;

	// console.log("In Write to Canvas function");
	// console.log(imgData);
	var channel = Number(document.getElementById("channel").value);
	console.log(channel);

	if (channel == 3) {
	for (var i=0;i<imgData.data.length;i+=4)
		imgData.data[i+3] = imgSingleArray[datCount++];
	}
	else{
		for (var i=0;i<imgData.data.length;i+=4){
			imgData.data[i+channel] = imgSingleArray[datCount++];
			imgData.data[i+3] = 255;
		}

	}




	// for (var i=0;i<imgData.data.length;i+=4){
	// 	//[R G B A]
	// 	//Red
	// 	// imgData.data[i+0]=Math.random() * 255;
	// 	// // //Green
	// 	// imgData.data[i+1] = imgSingleArray[datCount++];
	// 	// imgData.data[i+1]=Math.random() * 255;
	// 	// // //Blue
	// 	// imgData.data[i+2]=Math.random() * 255;
	// 	//Alpha
	// 	// console.log(i);
	// 	imgData.data[i+3] = imgSingleArray[datCount++];
	// 	// imgData.data[i+3]=Math.random() * 256;
	// 	// imgData.data[i+3]= 256;
	// }

	ctx.putImageData(imgData,0,0);
	// ctx.scale(2,2);
}




function stackBlur() {
	
	var canvas=document.getElementById("myCanvas");
	var blur=document.getElementById("blur").value;

	var ctx=canvas.getContext("2d");

	// var N = Number(document.getElementById("nVal").value);
	// var nVal =   Math.pow(2,N);
	// var nvalP1 = Math.pow(2,N)+1;

	console.log(blur);

	processCanvasRGBA(canvas, 0, 0, canvas.width, canvas.height, blur )


}

function printGrid(DSArray,nvalP1) {
	for (var i = 0; i < nvalP1; i++) {
		var gridString = "";
		for (var j = 0; j < nvalP1; j++) {
			if (DSArray[i][j] == 0) {
				// DSArray[i][j] = '...';
			}
			gridString+=DSArray[i][j]+' ';
		}
		console.log('| '+gridString+'| '+"row"+i);
	}

}

function clearGrid(grid,nvalP1) {
	for (var i = 0; i < nvalP1; i++) {
		for (var j = 0; j < nvalP1; j++) {
			grid[i][j] = 0;
			// imgArray[i][j] = '('+i+','+j+')';
		}
	}
	return grid;
}




function printSquareObj(squareObj) {
	console.log(squareObj.TLR+' '+squareObj.TLC+' '+squareObj.TLV+'\n'+
				squareObj.TRR+' '+squareObj.TRC+' '+squareObj.TRC+'\n'+
				squareObj.BLR+' '+squareObj.BLC+' '+squareObj.BLV+'\n'+
				squareObj.BRR+' '+squareObj.BRC+' '+squareObj.BRV+'\n'+
				squareObj.avgV
			);
}



function doubleArrayToSingle(inArray) {
	singleArray=[];
	for (var i = 0; i < inArray.length; i++) {
		for (var j = 0; j < inArray[i].length; j++) {
			singleArray.push(inArray[i][j]);
		}
	}
	return singleArray;
}




function doubleArrayToSingleThreshold(inArray) {
	singleArray=[];
	// console.log("double Array To Single Threshold Function");
	// console.log(inArray);
	// var currentrow =[];
	for (var i = 0; i < inArray.length; i++) {
		// currentrow.length=0;
		for (var j = 0; j < inArray[i].length; j++) {
			// if (inArray[i][j] <= 500) {
			// 	singleArray.push(255);
			// 	continue;
			// }
			// else if ( inArray[i][j] <= 1000 ){
			// 	singleArray.push(128);
			// 	continue;
			// }
			// else if(inArray[i][j] >= 1001 ){
			// 	singleArray.push(0);

			// }
			// singleArray.push(inArray[i][j]*1.5);
			// console.log("REDUCTION"+Number(document.getElementById("reductionVal").value));
			singleArray.push((inArray[i][j]) * Number(document.getElementById("reductionVal").value));
			// singleArray.push(inArray[i][j]);
			// currentrow.push(inArray[i][j]);
		}
		// console.log(currentrow);
		// console.log(inArray[i]);
	}
	// console.log("#@##########################");
	// console.log(singleArray);

	return singleArray;
}





function DiamondSquareAlgo(nVal,nvalP1,seed,N) {
	var center = { row:0, col:0, val:0};
	imgArray=[];
	var squareObj = { 	
		TLR:0, TLC:0, TLV:0,
		TRR:0, TRC:0, TRV:0,
		BLR:0, BLC:0, BLV:0,
		BRR:0, BRC:0, BRV:0,
		avgV:0,
	};
	var diamondObj = { 
		ROW:0,	COL:0,
		TV:0,	RV:0,	LV:0,	BV:0,
	};
	var maxSize = Math.pow(2,N);
	//Allocates the double array for JS
	for (var i = 0; i < nvalP1; i++) {
		imgArray[i] = [];
	}

	var centerCoordArray = [];

	clearGrid(imgArray,nvalP1);
	//Top Left Corner Array for holding the TL corner of each square
	var topLeftCornerArray = [];
	var newCornerArray = [];

	// // Set corners of the img Array
	// imgArray[0][0] = 			Math.floor(Math.random() * 256); 
	// imgArray[nVal][0] = 		Math.floor(Math.random() * 256); 
	// imgArray[0][nVal] = 		Math.floor(Math.random() * 256); 
	// imgArray[nVal][nVal] = 		Math.floor(Math.random() * 256); 



	// imgArray[0][0] = 2000;
	// imgArray[nVal][0] =	1500; 
	// imgArray[0][nVal] = 500; 
	// imgArray[nVal][nVal] = 	1000;

	imgArray[0][0] = Number(document.getElementById("topLeft").value);
	imgArray[nVal][0] =	Number(document.getElementById("bottomLeft").value); 
	imgArray[0][nVal] = Number(document.getElementById("topRight").value); 
	imgArray[nVal][nVal] = 	Number(document.getElementById("bottomRight").value);


	//Push the starting top left corner to the TLCArray
	topLeftCornerArray.push({row:0,col:0});

	for (var i = 0; i < N; i++) {
		// console.log("TOP OF THE N FUNCTION ==========================================");
		// Calculate square size
		var squareSize = Math.pow(2,(N-i));
		// console.log("SQUARE SIZE : "+squareSize);
		// console.log("I VAL : "+i);

		//Calculate the square based on the TLCA
		// Each element in TLCA will have its own square
		

		//Preform the square phase
		centerCoordArray = squarePhase(topLeftCornerArray, squareSize);


			//Calculate the values and set them for img array
		newCornerArray = diamondPhase(centerCoordArray, squareSize);

	
		
			// console.log(newCornerArray.toString());
			// console.log("HERE IS THE NEW CORNER ARRAY BEFORE BOUNDRY");
			// for (var g = 0; g < newCornerArray.length; g++) {
			// 	console.log(newCornerArray[g].row+','+newCornerArray[g].col);
			// }


			// var removed = "";

			//Check for dupes and boundry collisions in newCornerArray
			for (var k = 0; k < topLeftCornerArray.length; k++) {
				//Check for boundry collisions
				// NCALen = newCornerArray.length;
				for (var l = 0; l < newCornerArray.length ; l++) {
					// console.log("HERE IS THE BOUND CHECK");
					// console.log(newCornerArray[l].row+','+newCornerArray[l].col);

					if (newCornerArray[l].row >= maxSize || newCornerArray[l].col >= maxSize  ) {
						// console.log("BOUND ERROR detected");
						newCornerArray.splice(l,1);
						// console.log("here is the removed element from bound check "+removed[0].row+','+removed[0].col);
						continue;
					}
	 
				}				
			}


			// console.log("HERE IS THE NEW CORNER ARRAY BEFORE DUPES");
			// for (var g = 0; g < newCornerArray.length; g++) {
			// 	console.log(newCornerArray[g].row+','+newCornerArray[g].col);
			// }

			for (var w = 0; w < topLeftCornerArray.length; w++) {
				for (var e = 0; e < newCornerArray.length ; e++) {

								//Check for dupes
					// console.log("HERE IS THE DUPE CHECK");
					// console.log(newCornerArray[e].row+','+newCornerArray[e].col);

					if (newCornerArray[e].row == topLeftCornerArray[w].row &&
						newCornerArray[e].col == topLeftCornerArray[w].col ) {
						// console.log("Dupe detected");
						newCornerArray.splice(e,1);
						// console.log("here is the removed element from dupe check"+removed);
						continue;
					}
				}
			}


			// console.log("HERE IS THE NEW CORNER AFTER CHECKING");
			// for (var g = 0; g < newCornerArray.length; g++) {
			// 	console.log(newCornerArray[g].row+','+newCornerArray[g].col);
			// }


			

			// console.log("HERE IS THE TOP LEFT ARRAY AFTER CHECKING");
			// for (var tlac = 0; tlac < topLeftCornerArray.length; tlac++) {
			// 	console.log(topLeftCornerArray[tlac].row+','+topLeftCornerArray[tlac].col);
			// }
			topLeftCornerArray = topLeftCornerArray.concat(newCornerArray);
			newCornerArray.length=0;

			// console.log("HERE IS THE TOP LEFT ARRAY AFTER CONCAT");
			// for (var tlac = 0; tlac < topLeftCornerArray.length; tlac++) {
			// 	console.log(topLeftCornerArray[tlac].row+','+topLeftCornerArray[tlac].col);
			// }









			// printGrid(imgArray,nvalP1);
			// console.log("\n");
		
		
	}//End of N array
	return imgArray;
}//End of Diamond Square function







function diamondPhase(centerCoordArray, squareSize ) {
	

	var diamondObj = { 
		ROW:0,	COL:0,
		TV:0,	RV:0,	LV:0,	BV:0,
	};

	var functionCornerArray = [];


	var SS = squareSize / 2;

	for (var i = 0; i < centerCoordArray.length; i++) {
		

		//TOP 
		var topVal = 	imgArray[centerCoordArray[i].ROW-SS] [centerCoordArray[i].COL - SS]+
						imgArray[centerCoordArray[i].ROW-SS] [centerCoordArray[i].COL + SS]+
						imgArray[centerCoordArray[i].ROW] 	[centerCoordArray[i].COL];

		//Boundry checking 
		// if (centerCoordArray.ROW - squareSize >= 0) {
		// 	topVal += imgArray[centerCoordArray[i].ROW - squareSize][centerCoordArray[i].COL];
		// 	diamondObj.TV = Math.floor(topVal/4);
		// }
		// else{
			diamondObj.TV = Math.floor(topVal/3);
		// }
		// //Dupe Checking
		// if (!(Number(imgArray[centerCoordArray[i].ROW-SS][centerCoordArray[i].COL] === 0))) {
		// 	// console.log("adding addition Top Val");
		// 	imgArray[centerCoordArray[i].ROW-SS][centerCoordArray[i].COL] = 
		// 		Math.floor((imgArray[centerCoordArray[i].ROW-SS][centerCoordArray[i].COL] +diamondObj.TV)/2);
		// }
		// else{
			// imgArray[squareObj.TLR][diamondObj.COL] = Math.floor(diamondObj.TV);
			imgArray[centerCoordArray[i].ROW-SS][centerCoordArray[i].COL] = Math.floor((diamondObj.TV+Math.floor(Math.random() * randVal))/2);
		// }






		//LEFT 
		var leftVal = 	imgArray[centerCoordArray[i].ROW-SS] [centerCoordArray[i].COL - SS]+
						imgArray[centerCoordArray[i].ROW+SS] [centerCoordArray[i].COL - SS]+
						imgArray[centerCoordArray[i].ROW] 	[centerCoordArray[i].COL];

		//Boundry checking 
		// if (centerCoordArray.COL - squareSize >= 0) {
		// 	leftVal += imgArray[centerCoordArray[i].ROW][centerCoordArray[i].COL - squareSize];
		// 	diamondObj.LV = Math.floor(leftVal/4);
		// }
		// else{
			diamondObj.LV = Math.floor(leftVal/3);
		// }
		// //Dupe Checking
		// if (!(Number(imgArray[centerCoordArray[i].ROW][centerCoordArray[i].COL-SS] === 0))) {
		// 	// console.log("adding addition Top Val");
		// 	imgArray[centerCoordArray[i].ROW][centerCoordArray[i].COL-SS] = 
		// 		Math.floor((imgArray[centerCoordArray[i].ROW][centerCoordArray[i].COL-SS] +diamondObj.LV)/2);
		// }
		// else{
			// imgArray[squareObj.TLR][diamondObj.COL] = Math.floor(diamondObj.TV);
			imgArray[centerCoordArray[i].ROW][centerCoordArray[i].COL-SS] = Math.floor((diamondObj.LV+Math.floor(Math.random() * randVal))/2);
		// }





		//RIGHT 
		var rightVal = 	imgArray[centerCoordArray[i].ROW - SS] [centerCoordArray[i].COL + SS]+
						imgArray[centerCoordArray[i].ROW + SS] [centerCoordArray[i].COL + SS]+
						imgArray[centerCoordArray[i].ROW] 	[centerCoordArray[i].COL];

		//Boundry checking 
		// if (centerCoordArray.COL + squareSize >= 0) {
		// 	rightVal += imgArray[centerCoordArray[i].ROW][centerCoordArray[i].COL + squareSize];
		// 	diamondObj.RV = Math.floor(rightVal/4);
		// }
		// else{
			diamondObj.RV = Math.floor(rightVal/3);
		// }
		// //Dupe Checking
		// if (!(Number(imgArray[centerCoordArray[i].ROW][centerCoordArray[i].COL+SS] === 0))) {
		// 	// console.log("adding addition Top Val");
		// 	imgArray[centerCoordArray[i].ROW][centerCoordArray[i].COL+SS] = 
		// 		Math.floor((imgArray[centerCoordArray[i].ROW][centerCoordArray[i].COL+SS] +diamondObj.RV)/2);
		// }
		// else{
			// imgArray[squareObj.TLR][diamondObj.COL] = Math.floor(diamondObj.TV);
			imgArray[centerCoordArray[i].ROW][centerCoordArray[i].COL+SS] = Math.floor((diamondObj.RV+Math.floor(Math.random() * randVal))/2);
		// }



	//BOTTOM 
		var bottomVal = imgArray[centerCoordArray[i].ROW+SS] [centerCoordArray[i].COL - SS]+
						imgArray[centerCoordArray[i].ROW+SS] [centerCoordArray[i].COL + SS]+
						imgArray[centerCoordArray[i].ROW] 	[centerCoordArray[i].COL];

		//Boundry checking 
		// if (centerCoordArray.ROW + squareSize >= 0) {
		// 	bottomVal += imgArray[centerCoordArray[i].ROW + squareSize][centerCoordArray[i].COL];
		// 	diamondObj.BV = Math.floor(bottomVal/4);
		// }
		// else{
			diamondObj.BV = Math.floor(bottomVal/3);
		// }
		//Dupe Checking
		// if (!(Number(imgArray[centerCoordArray[i].ROW+SS][centerCoordArray[i].COL] === 0))) {
		// 	// console.log("adding addition Top Val");
		// 	imgArray[centerCoordArray[i].ROW+SS][centerCoordArray[i].COL] = 
		// 		Math.floor((imgArray[centerCoordArray[i].ROW+SS][centerCoordArray[i].COL] +diamondObj.BV)/2);
		// }
		// else{
			// imgArray[squareObj.TLR][diamondObj.COL] = Math.floor(diamondObj.TV);
			imgArray[centerCoordArray[i].ROW+SS][centerCoordArray[i].COL] = Math.floor((diamondObj.BV+Math.floor(Math.random() * randVal))/2);
		// }

		functionCornerArray.push({row:centerCoordArray[i].ROW-SS, col:centerCoordArray[i].COL});
		functionCornerArray.push({row:centerCoordArray[i].ROW,	 col:centerCoordArray[i].COL-SS});
		functionCornerArray.push({row:centerCoordArray[i].ROW,	 col:centerCoordArray[i].COL});
		

	}
	
	return functionCornerArray;
}



function squarePhase(topLeftCornerArray, squareSize ) {
	
var squareArray=[];

var squareObj = { 	
		TLR:0, TLC:0, TLV:0,
		TRR:0, TRC:0, TRV:0,
		BLR:0, BLC:0, BLV:0,
		BRR:0, BRC:0, BRV:0,
		avgV:0,
	};

var center = {
	row:0, col:0
};


	
	var TLCALEN = topLeftCornerArray.length;
	for (var j = 0; j < TLCALEN; j++) {

		//Top Left Coords and Value
		squareObj.TLR = topLeftCornerArray[j].row;
		squareObj.TLC = topLeftCornerArray[j].col;
		squareObj.TLV = imgArray[squareObj.TLR][squareObj.TLC];

		//Top Right Coords and Value
		squareObj.TRR = squareObj.TLR;
		squareObj.TRC = squareObj.TLC + squareSize;
		squareObj.TRV = imgArray[squareObj.TRR][squareObj.TRC];

		//Bottom Left Coords and Value
		squareObj.BLR = squareObj.TLR + squareSize;
		squareObj.BLC = squareObj.TLC;
		squareObj.BLV = imgArray[squareObj.BLR][squareObj.BLC];

		//Bottom Right Coords and Value
		squareObj.BRR = squareObj.TLR + squareSize;
		squareObj.BRC = squareObj.TLC + squareSize;
		squareObj.BRV = imgArray[squareObj.BRR][squareObj.BRC];

		//This is the average value of the 4 corners
		squareObj.avgV = Math.floor(((squareObj.TLV + squareObj.TRV + squareObj.BLV + squareObj.BRV+
			Math.floor(Math.random() * randVal))/5));

		//Calculate the center position of the square
		center.row = (squareObj.TLR + squareObj.BLR ) / 2;
		center.col = (squareObj.TLC + squareObj.TRC ) / 2;

		//Set the value of the center positiopn
		// center.val = squareObj.avgV;
		imgArray[center.row][center.col] = squareObj.avgV;


		// diamondObj.ROW = (squareObj.TLR + squareObj.BLR)/2;
		// diamondObj.COL = (squareObj.TLC + squareObj.TRC)/2;

		squareArray.push({ROW:center.row, COL:center.col});
	}
	return squareArray;

}





















//Working, but needs to reorganized so the diamond phase is done after all the squares
// function DiamondSquareAlgo(nVal,nvalP1,seed,N) {
// 	var center = { row:0, col:0, val:0};
// 	var imgArray=[];
// 	var squareObj = { 	
// 		TLR:0, TLC:0, TLV:0,
// 		TRR:0, TRC:0, TRV:0,
// 		BLR:0, BLC:0, BLV:0,
// 		BRR:0, BRC:0, BRV:0,
// 		avgV:0,
// 	};

// 	var diamondObj = { 
// 		ROW:0,	COL:0,
// 		TV:0,	RV:0,	LV:0,	BV:0,
// 	};


// 	var maxSize = Math.pow(2,N);



// 	//Allocates the double array for JS
// 	for (var i = 0; i < nvalP1; i++) {
// 		imgArray[i] = [];
// 	}

// 	clearGrid(imgArray,nvalP1);

// 	//Top Left Corner Array for holding the TL corner of each square
// 	var topLeftCornerArray = [];
// 	var newCornerArray = [];

// 	// // Set corners of the img Array
// 	// imgArray[0][0] = 			Math.floor(Math.random() * 256); 
// 	// imgArray[nVal][0] = 		Math.floor(Math.random() * 256); 
// 	// imgArray[0][nVal] = 		Math.floor(Math.random() * 256); 
// 	// imgArray[nVal][nVal] = 		Math.floor(Math.random() * 256); 
// 	imgArray[0][0] = 			100; 
// 	imgArray[nVal][0] = 		0; 
// 	imgArray[0][nVal] = 		150; 
// 	imgArray[nVal][nVal] = 		175; 


// 	//Push the starting top left corner to the TLCArray
// 	topLeftCornerArray.push({row:0,col:0});

// 	for (var i = 0; i < N; i++) {
// 		// console.log("TOP OF THE N FUNCTION ==========================================");
// 		// Calculate square size
// 		var squareSize = Math.pow(2,(N-i));
// 		// console.log("SQUARE SIZE : "+squareSize);
// 		// console.log("I VAL : "+i);

// 		//Calculate the square based on the TLCA
// 		// Each element in TLCA will have its own square
// 		var TLCALEN = topLeftCornerArray.length;
// 		for (var j = 0; j < TLCALEN; j++) {

// 			//Top Left Coords and Value
// 			squareObj.TLR = topLeftCornerArray[j].row;
// 			squareObj.TLC = topLeftCornerArray[j].col;
// 			squareObj.TLV = imgArray[squareObj.TLR][squareObj.TLC];

// 			//Top Right Coords and Value
// 			squareObj.TRR = squareObj.TLR;
// 			squareObj.TRC = squareObj.TLC + squareSize;
// 			squareObj.TRV = imgArray[squareObj.TRR][squareObj.TRC];

// 			//Bottom Left Coords and Value
// 			squareObj.BLR = squareObj.TLR + squareSize;
// 			squareObj.BLC = squareObj.TLC;
// 			// console.log("ASSGOBLINS");
// 			// console.log(squareObj.BLR);
// 			// console.log(squareObj.BLC);
// 			squareObj.BLV = imgArray[squareObj.BLR][squareObj.BLC];
// 			// console.log("ASSGOBLINS");

// 			//Bottom Right Coords and Value
// 			squareObj.BRR = squareObj.TLR + squareSize;
// 			squareObj.BRC = squareObj.TLC + squareSize;
// 			squareObj.BRV = imgArray[squareObj.BRR][squareObj.BRC];

// 			//This is the average value of the 4 corners
// 			squareObj.avgV = Math.floor(((squareObj.TLV + squareObj.TRV + squareObj.BLV + squareObj.BRV+
// 				Math.floor(Math.random() * 256))/4));
// 			// squareObj.avgV = Math.floor((squareObj.TLV + squareObj.TRV + squareObj.BLV + squareObj.BRV)/4);

// 			//Calculate the center position of the square
// 			center.row = (squareObj.TLR + squareObj.TRR + squareObj.BLR + squareObj.BRR) / 4;
// 			center.col = (squareObj.TLC + squareObj.TRC + squareObj.BLC + squareObj.BRC) / 4;

// 			//Set the value of the center positiopn
// 			center.val = squareObj.avgV;

// 			//Set the value in the imageArray 
// 			//Check if already set
// 			// console.log("TYPE OF CENTER : "+typeof(Number(imgArray[center.row][center.col])));
// 			// console.log(imgArray[center.row][center.col]);
			

// 			//THis will always be true, not needed
// 			// if (Number(imgArray[center.row][center.col]) == 0) {
// 			// 	console.log("Center")
// 			// 	imgArray[center.row][center.col] = center.val;

// 			// 	// imgArray[center.row][center.col] = Math.floor((center.val+Math.floor(Math.random() * 96))/1.5);
// 			// }
// 			// else{
// 			// 	imgArray[center.row][center.col] = (center.val+Math.floor(Math.random() * 256))/2;
// 			// }

// 			//Calculate the row and col for the diamond
// 			//Row and Col are shared for all 4 points 

// 			diamondObj.ROW = (squareObj.TLR + squareObj.BLR)/2;
// 			diamondObj.COL = (squareObj.TLC + squareObj.TRC)/2;


// 			//Calculate the values and set them for img array

// 			//Top
// 			// var topVal = squareObj.TLV + squareObj.TRV + center.val + Math.floor(Math.random() * 124);
// 			var topVal = squareObj.TLV + squareObj.TRV + center.val;

// 			//Boundry checking 
// 			if (squareObj.TLR - squareSize >= 0) {
// 				topVal += imgArray[squareObj.TLR - squareSize][diamondObj.COL];
// 				diamondObj.TV = Math.floor(topVal/4);
// 			}
// 			else{
// 				diamondObj.TV = Math.floor(topVal/3);
// 			}
// 			if (!(Number(imgArray[squareObj.TLR][diamondObj.COL] === 0))) {
// 				// console.log("adding addition Top Val");
// 				imgArray[squareObj.TLR][diamondObj.COL] = Math.floor((imgArray[squareObj.TLR][diamondObj.COL] +diamondObj.TV)/2);
// 			}
// 			else{
// 				// imgArray[squareObj.TLR][diamondObj.COL] = Math.floor(diamondObj.TV);
// 				imgArray[squareObj.TLR][diamondObj.COL] = Math.floor((diamondObj.TV+Math.floor(Math.random() * 128))/2);
// 			}





// 			// Left
// 			// var leftVal = squareObj.TLV + squareObj.BLV + center.val + Math.floor(Math.random() * 256);
// 			var leftVal = squareObj.TLV + squareObj.BLV + center.val;

// 			//Boundry checking 
// 			if (squareObj.TLC - squareSize >= 0) {
// 				leftVal += imgArray[diamondObj.ROW][squareObj.TLC - squareSize];
// 				diamondObj.LV = Math.floor(leftVal/4);
// 			}
// 			else{
// 				diamondObj.LV = Math.floor(leftVal/3);
// 			}
// 			if (!(Number(imgArray[diamondObj.ROW][squareObj.TLC] === 0))) {
// 				imgArray[diamondObj.ROW][squareObj.TLC] = Math.floor((diamondObj.LV+imgArray[diamondObj.ROW][squareObj.TLC])/2);
// 			}
// 			else{
// 				// imgArray[diamondObj.ROW][squareObj.TLC] = Math.floor(diamondObj.LV);
// 				imgArray[diamondObj.ROW][squareObj.TLC] = Math.floor((diamondObj.LV+Math.floor(Math.random() * 128))/2);
// 			}




// 			// Right
// 			// var rightVal = squareObj.TRV + squareObj.BRV + center.val + Math.floor(Math.random() * 256);
// 			var rightVal = squareObj.TRV + squareObj.BRV + center.val;

// 			//Boundry checking 
// 			if (squareObj.TRC + squareSize <= maxSize) {
// 				rightVal += imgArray[diamondObj.ROW][squareObj.TRC + squareSize];
// 				diamondObj.RV = Math.floor(rightVal/4);
// 			}
// 			else{
// 				diamondObj.RV = Math.floor(rightVal/3);
// 			}
// 			if (!(Number(imgArray[diamondObj.ROW][squareObj.TRC] === 0))) {
// 				imgArray[diamondObj.ROW][squareObj.TRC] = Math.floor((diamondObj.RV+imgArray[diamondObj.ROW][squareObj.TRC])/2);
// 			}
// 			else{
// 				// imgArray[diamondObj.ROW][squareObj.TRC] = Math.floor(diamondObj.RV);
// 				imgArray[diamondObj.ROW][squareObj.TRC] = Math.floor((diamondObj.RV+Math.floor(Math.random() * 128))/2);
// 			}




// 			//Bottom
// 			// var bottomVal = squareObj.BLV + squareObj.BRV + center.val + Math.floor(Math.random() * 256);
// 			var bottomVal = squareObj.BLV + squareObj.BRV + center.val;

// 			//Boundry checking 
// 			if (squareObj.BLR + squareSize <= maxSize) {
// 				bottomVal += imgArray[squareObj.BLR + squareSize][diamondObj.COL];
// 				diamondObj.BV = Math.floor(bottomVal/4);
// 			}
// 			else{
// 				diamondObj.BV = Math.floor(bottomVal/3);
// 			}
// 			if (!(Number(imgArray[squareObj.BLR][diamondObj.COL] === 0))) { 
// 				imgArray[squareObj.BLR][diamondObj.COL] =Math.floor((diamondObj.BV + imgArray[squareObj.BLR][diamondObj.COL])/2);
// 			}
// 			else{
// 				// imgArray[squareObj.BLR][diamondObj.COL] = Math.floor(diamondObj.BV);
// 				imgArray[squareObj.BLR][diamondObj.COL] = Math.floor((diamondObj.BV+Math.floor(Math.random() * 128))/2);
// 			}


// 			//Add new elemetns to the newTopCornerArray
// 			//Add Top, Left, Center

// 			newCornerArray.push({row:squareObj.TLR,col:diamondObj.COL});
// 			newCornerArray.push({row:diamondObj.ROW,col:squareObj.TLC});
// 			newCornerArray.push({row:center.row,col:center.col});

// 			// console.log(newCornerArray.toString());
// 			// console.log("HERE IS THE NEW CORNER ARRAY BEFORE BOUNDRY");
// 			// for (var g = 0; g < newCornerArray.length; g++) {
// 			// 	console.log(newCornerArray[g].row+','+newCornerArray[g].col);
// 			// }


// 			// var removed = "";

// 			//Check for dupes and boundry collisions in newCornerArray
// 			for (var k = 0; k < topLeftCornerArray.length; k++) {
// 				//Check for boundry collisions
// 				// NCALen = newCornerArray.length;
// 				for (var l = 0; l < newCornerArray.length ; l++) {
// 					// console.log("HERE IS THE BOUND CHECK");
// 					// console.log(newCornerArray[l].row+','+newCornerArray[l].col);

// 					if (newCornerArray[l].row >= maxSize || newCornerArray[l].col >= maxSize  ) {
// 						// console.log("BOUND ERROR detected");
// 						newCornerArray.splice(l,1);
// 						// console.log("here is the removed element from bound check "+removed[0].row+','+removed[0].col);
// 						continue;
// 					}
	 
// 				}				
// 			}


// 			// console.log("HERE IS THE NEW CORNER ARRAY BEFORE DUPES");
// 			// for (var g = 0; g < newCornerArray.length; g++) {
// 			// 	console.log(newCornerArray[g].row+','+newCornerArray[g].col);
// 			// }

// 			for (var w = 0; w < topLeftCornerArray.length; w++) {
// 				for (var e = 0; e < newCornerArray.length ; e++) {

// 								//Check for dupes
// 					// console.log("HERE IS THE DUPE CHECK");
// 					// console.log(newCornerArray[e].row+','+newCornerArray[e].col);

// 					if (newCornerArray[e].row == topLeftCornerArray[w].row &&
// 						newCornerArray[e].col == topLeftCornerArray[w].col ) {
// 						// console.log("Dupe detected");
// 						newCornerArray.splice(e,1);
// 						// console.log("here is the removed element from dupe check"+removed);
// 						continue;
// 					}
// 				}
// 			}


// 			// console.log("HERE IS THE NEW CORNER AFTER CHECKING");
// 			// for (var g = 0; g < newCornerArray.length; g++) {
// 			// 	console.log(newCornerArray[g].row+','+newCornerArray[g].col);
// 			// }


			

// 			// console.log("HERE IS THE TOP LEFT ARRAY AFTER CHECKING");
// 			// for (var tlac = 0; tlac < topLeftCornerArray.length; tlac++) {
// 			// 	console.log(topLeftCornerArray[tlac].row+','+topLeftCornerArray[tlac].col);
// 			// }
// 			topLeftCornerArray = topLeftCornerArray.concat(newCornerArray);
// 			newCornerArray.length=0;

// 			// console.log("HERE IS THE TOP LEFT ARRAY AFTER CONCAT");
// 			// for (var tlac = 0; tlac < topLeftCornerArray.length; tlac++) {
// 			// 	console.log(topLeftCornerArray[tlac].row+','+topLeftCornerArray[tlac].col);
// 			// }









// 			// printGrid(imgArray,nvalP1);
// 			// console.log("\n");
		
// 		}//End of TLCA.length Array
// 	}//End of N array
// 	return imgArray;
// }//End of Diamond Square function






// function DiamondSquareAlgoOld(nVal,nvalP1,seed,N) {
// 	var center = { row:0, col:0, val:0};
// 	var imgArray=[];
// 	var squareObj = { 	TLR:0, TLC:0, TLV:0,
// 						TRR:0, TRC:0, TRV:0,
// 						BLR:0, BLC:0, BLV:0,
// 						BRR:0, BRC:0, BRV:0,
// 						avgV:0,
// 					}

// 	var maxSize = Math.pow(2,N);



// 	//Allocates the double array for JS
// 	for (var i = 0; i < nvalP1; i++) {
// 		imgArray[i] = [];
// 	}

// 	clearGrid(imgArray,nvalP1);

// 	//Top Left Corner Array for holding the TL corner of each square
// 	var topLeftCornerArray = [];
// 	var newCornerArray = [];

// 	// Set corners of the img Array

// 	// imgArray[0][0] = '01'; 
// 	// imgArray[nVal][0] = '01'; 
// 	// imgArray[0][nVal] = '01'; 
// 	// imgArray[nVal][nVal] = '01'; 

// 	// imgArray[0][0] = 			" top left 0 0"; 
// 	// imgArray[nVal][0] = 		"Bottom Left nval 0"; 
// 	// imgArray[0][nVal] = 		"Top Right 0 nval"; 
// 	// imgArray[nVal][nVal] = 		"bottom right nval nval"; 

// 	imgArray[0][0] = 			Math.floor(Math.random() * 256); 
// 	imgArray[nVal][0] = 		Math.floor(Math.random() * 256); 
// 	imgArray[0][nVal] = 		Math.floor(Math.random() * 256); 
// 	imgArray[nVal][nVal] = 		Math.floor(Math.random() * 256); 


// 	//Push the starting top left corner to the TLCArray
// 	topLeftCornerArray.push({row:0,col:0});

// 	// console.log(topLeftCornerArray);
// 	// console.log(topLeftCornerArray[0]);
// 	// console.log(topLeftCornerArray[0].x);
// 	// console.log(topLeftCornerArray[0].y);



// 	// Square size  = 2^(N-i)+1
// 	// # of squares = (i+1)^2

// 	//Start Main algo loop
// 	for (var i = 0; i < N; i++) {
// 		console.log("HERE IS THE I : "+i);

// 		console.log("Here is the suqare obj");
// 		console.log(squareObj);

// 		printSquareObj(squareObj);

// 		console.log("Here is the TLCA ");
// 		console.log(topLeftCornerArray);

// 		//Find Center
// 		for (var j = 0; j < topLeftCornerArray.length; j++) {
// 			// console.log("TLCA LENGTH : ");
// 			// console.log(topLeftCornerArray.length);
// 			// console.log(topLeftCornerArray);

// 			// Calculate Square Size for this iteration
// 			//Square size is techincally n-i^2 +1, but for array
// 			//calculations it needs to be n-i^2 
// 			var squareSize = Math.pow(2,(N-i));
// 			console.log("squareSize: "+squareSize);
			
// 			//Get square based on square size and top left corner
// 			//Calculate four corners based on top left

// 			// squareObj = { 	TLR:0, TLC:0,
// 			// 			TRR:0, TRC:0,
// 			// 			BLR:0, BLC:0,
// 			// 			BRR:0, BRC:0,
// 			// 		}

// 			// console.log("Square Obj");
// 			// for (var i = 0; i < squareObj.length; i++) {
// 				// console.log(squareObj);
// 			// }



// 			console.log("Here is TLR");
// 			console.log(topLeftCornerArray[j].row);
// 			squareObj.TLR = topLeftCornerArray[j].row;
// 			squareObj.TLC = topLeftCornerArray[j].col;
// 			squareObj.TLV = imgArray[squareObj.TLR][squareObj.TLC];

// 			squareObj.TRR = squareObj.TLR;
// 			squareObj.TRC = squareObj.TLC + squareSize;
// 			squareObj.TRV = imgArray[squareObj.TRR][squareObj.TRC];
// 			// newCornerArray.push({row:squareObj.TRR+(squareSize%2),col:squareObj.TRC+(squareSize%2)});


// 			// console.log("HERE IS TLR")
// 			// console.log(squareObj.TLR)
// 			// console.log("HERE IS S SUIZE");
// 			// console.log(squareSize);
// 			squareObj.BLR = squareObj.TLR + squareSize;
// 			squareObj.BLC = squareObj.TLC;
// 			// console.log("HERE IS TEH SQUARE OBJ");
// 			// printSquareObj(squareObj);

// 			squareObj.BLV = imgArray[squareObj.BLR][squareObj.BLC];
// 			// newCornerArray.push({row:squareObj.BLR+(squareSize%2),col:squareObj.BLC+(squareSize%2)});



// 			squareObj.BRR = squareObj.TLR + squareSize;
// 			squareObj.BRC = squareObj.TLC + squareSize;
// 			squareObj.BRV = imgArray[squareObj.BRR][squareObj.BRC];
// 			// newCornerArray.push({row:squareObj.BRR+(squareSize%2),col:squareObj.BRC+(squareSize%2)});


// 			squareObj.avgV = Math.floor((squareObj.TLV + squareObj.TRV + squareObj.BLV + squareObj.BRC)/4);

// 			// newCornerArray.push({row:0,col:0});

// 			// console.log("New Corner Array");
// 			// // console.log(newCornerArray.toString());

// 			// console.log("HERE IS THE NEWCORNER STRING");
// 			// for (var p = 0; p < newCornerArray.length; p++) {
// 			// 	console.log('('+newCornerArray[p].row.toString()+','+newCornerArray[p].col.toString()+')');
// 			// }

// 			// console.log("Top Left Corner Array");
// 			// // console.log(topLeftCornerArray.toString());



// 			//Check for dupes in TLC Array
// 			//Add new TLC if not dupe
// 			// printGrid(imgArray,nvalP1);
// 			// console.log("MAX SIZE =====================================: "+maxSize);

// 			// console.log("here is the new corner arraty");
// 			// console.log(newCornerArray);

// 			// for (var q = 0; q < newCornerArray.length; q++) {
// 			// 	console.log(newCornerArray[q]);
// 			// }


	


// 			// var tempArray = topLeftCornerArray;
// 			// var tempArray = topLeftCornerArray.concat(newCornerArray);
// 			// topLeftCornerArray.length=0;
// 			// topLeftCornerArray = tempArray;

// 			// topLeftCornerArray = topLeftCornerArray.concat(newCornerArray);

// 			// topLeftCornerArray = tempArray.concat(newCornerArray);
// 			// topLeftCornerArray.push(newCornerArray);
// 			// newCornerArray.length=0;
// 			// tempArray.length=0;

// 			// console.log("New Corner Array");
// 			// console.log(newCornerArray);
// 			// console.log("Top left Corner Array");
// 			// console.log(topLeftCornerArray);
// 			// console.log("Temp array");
// 			// console.log(tempArray);



// 			// var topLeftRow = topLeftCornerArray[j].row;
// 			// var topLeftCol = topLeftCornerArray[j].col;

// 			// var topRightRow = topLeftRow;
// 			// var topRightCol = topLeftCol+squareSize;

// 			// var bottomLeftRow = topLeftRow+squareSize;
// 			// var bottomLeftCol = topLeftCol;

// 			// var bottomRightRow = topLeftRow+squareSize;
// 			// var bottomRightCol = topLeftCol+squareSize;


// 			center.row = (squareObj.TLR + squareObj.TRR + squareObj.BLR + squareObj.BRR) / 4;
// 			center.col = (squareObj.TLC + squareObj.TRC + squareObj.BLC + squareObj.BRC) / 4;



// 			// center.row=(topLeftRow+topRightRow+bottomLeftRow+bottomRightRow)%4;
// 			// center.col=(topLeftCol+topRightCol+bottomLeftCol+bottomRightCol)%4;

// 			// console.log("Center point:");
// 			// console.log(centercol);

// 			//Set value to center position on imgArray
// 			//Average of the corners + random value

// 			// console.log(squareObj);

// 			center.val = Math.floor(squareObj.avgV);
// 			console.log(center);

// 			imgArray[center.row][center.col]=center.val;

// 			//Push the new TLCA at the end of teh square loop


// 		newCornerArray.push({row:squareObj.TRR+(squareSize%2),col:squareObj.TRC+(squareSize%2)});
// 		newCornerArray.push({row:squareObj.TRR+(squareSize%2),col:squareObj.TRC+(squareSize%2)});
// 		newCornerArray.push({row:squareObj.TRR+(squareSize%2),col:squareObj.TRC+(squareSize%2)});



// 			for (var k = 0; k < topLeftCornerArray.length; k++) {
// 				for (var l = 0; l < newCornerArray.length; l++) {
// 					console.log("HERE IS THE BOUND CHECK");
// 					console.log(newCornerArray[l].row+','+newCornerArray[l].col);
// 					if (newCornerArray[l].row >= maxSize || newCornerArray[l].col >= maxSize  ) {
// 						console.log("BOUND ERROR detected");
// 						// newCornerArray.splice(l,1);
// 						continue;
// 					}



// 					if (newCornerArray[l].row == topLeftCornerArray[k].row &&
// 						newCornerArray[l].col == topLeftCornerArray[k].col ) {
// 						console.log("Dupe detected");
// 						newCornerArray.splice(l,1);

// 					}	 
// 				}				
// 				// topLeftCornerArray.push({row:0,col:0});
// 			}



// 		}



// 		//Find Sides
// 		console.log("Finding Sides");

// 		// Top
// 		var topCol = (squareObj.TLC + squareObj.TRC)/2;
// 		var topVal = Math.floor((squareObj.TLV + squareObj.TRV + center.val)/3);
// 		imgArray[squareObj.TLR][topCol] = topVal;

// 		// Left
// 		var leftRow = (squareObj.TLR + squareObj.BRR)/2;
// 		var leftVal = Math.floor((squareObj.TLV + squareObj.BLV + center.val)/3);
// 		imgArray[leftRow][squareObj.TLC] = leftVal;

// 		// Right

// 		var rightRow = (squareObj.TLR + squareObj.BRR)/2;
// 		var rightVal = Math.floor((squareObj.TRV + squareObj.BRV + center.val)/3);
// 		imgArray[rightRow][squareObj.TRC] = rightVal;

// 		// console.log(rightRow);
// 		// console.log(rightVal);


// 		// Bottom
// 		var bottomCol = (squareObj.TLC + squareObj.TRC)/2;
// 		var bottomVal = Math.floor((squareObj.BLV + squareObj.BRV + center.val)/3);
// 		imgArray[squareObj.BLR][bottomCol] = bottomVal;







// 	}





// 		topLeftCornerArray = topLeftCornerArray.concat(newCornerArray);

// 		printGrid(imgArray,nvalP1);

// }
























// function DiamondSquareAlgo(nVal,nvalP1,seed) {
	
// 	var imgArray=[];
// 	var inArray=[]
// 	var counter = 0;

// 	var test = Math.random() * 256;


// 	//Allocates the double array for JS
// 	for (var i = 0; i < nvalP1; i++) {
// 		imgArray[i] = [];
// 	}

// 	//Set all elements  for testing
// 	imgArray = clearGrid(imgArray,nvalP1);



// 	//Set corners
// 	// imgArray[0][0] = 			" top left 0 0"; 
// 	// imgArray[nVal][0] = 		"Bottom Left nval 0"; 
// 	// imgArray[0][nVal] = 		"Top Right 0 nval"; 
// 	// imgArray[nVal][nVal] = 		"bottom right nval nval"; 

// 	// imgArray[0][0] = 			Math.floor(Math.random() * 256); 
// 	// imgArray[nVal][0] = 		Math.floor(Math.random() * 256); 
// 	// imgArray[0][nVal] = 		Math.floor(Math.random() * 256); 
// 	// imgArray[nVal][nVal] = 		Math.floor(Math.random() * 256); 


// 	var halfN = nVal;
// 	var squareSize = 0;
// 	var numberOfSquares = 0;
// 	var	squareArray=[];
// 	var	squareString = "";

// 	//Square size  = 2^(N-i)+1
// 	//# of squares = (i+1)^2


// 	//This needs to run N times
// 	//Where N is the 2^n input number
// 	//Each diamond and square runs n times

// 	//This works for even number squares that overlap
// 	for (var i = 0; i < N; i++) {
// 		console.log("HERE IS THE TOP OF TE N ROOP");
// 		var topleftRow = 0;
// 		var topleftCol = 0

// 		//Square
// 		//Clear Sqare Array
// 		squareArray.length = 0;
// 		//Set Square Size
// 		squareSize = Math.pow(2,(N-i))+1;
// 		squareItter = squareSize-1;
// 		// console.log("Square Size is :"+squareSize);
// 		// console.log("Square Itter is :"+squareItter);
		
// 		//Set Number of Squares
// 		numberOfSquares = Math.pow((i+1),2);
// 		console.log("Num of Squares :"+numberOfSquares);
// 		// var teststring = "";
// 		// Setup squares

// 		for (var k = 0; k < numberOfSquares; k++) {
// 			// console.log("Square # "+k);
// 			// console.log("TEST"+k);
// 			// console.log(squareArray);
// 			// squareArray.push("test")
// 			//Top left
// 			//Keep Track of the top left corner
// 			// teststring += topleftRow+','+topleftCol+' '+k+'\n';

// 			squareArray.push(topleftRow+','+topleftCol);
// 			// squareArray.push(squareSize*k);
// 			imgArray[topleftRow][topleftCol]=k;

// 			//Top Right
// 			squareArray.push(topleftRow+','+(topleftCol+squareItter));
// 			imgArray[topleftRow][topleftCol+squareItter]=k;

// 			//Bottom Left

// 			squareArray.push((topleftRow+squareItter)+','+(topleftCol));
// 			imgArray[topleftRow+squareItter][topleftCol]=k;


// 			//Bottom Right

// 			squareArray.push((topleftRow+squareItter)+','+(topleftCol+squareItter));
// 			imgArray[topleftRow+squareItter][topleftCol+squareItter]=k;


// 			// topleftRow = topleftRow+squareItter;
// 			topleftCol = topleftCol+squareItter;

// 			// squareItter+=squareItter;
// 			squareArray.push('\n');
// 			// console.log(nVal);
// 			if (topleftCol == nVal) {
// 				console.log("Found the edge");
// 				topleftRow = squareItter;
// 				topleftCol = 0;
// 			}
// 			// printGrid(imgArray,nvalP1);
// 			// console.log("Square Number :"+k);




// 		// squareString = imgArray.toString();
// 		// 		console.log(squareString);

// 		}
// 	imgArray = clearGrid(imgArray,nvalP1);

// 		// console.log("here is the square array");
// 		// console.log(teststring);
// 		// console.log(squareArray);
// 		// console.log(squareArray.length);

// 		//Find middle point of the current square

// 		//Diamond
// 	}


	

// 	return imgArray;

// }





	//Sets the array to increasing values
	// for (var i = 0; i < nvalP1; i++) {
	// 	for (var j = 0; j < nvalP1; j++) {
	// 		testarray[i][j] = i+j;
	// 	}
	// }
//Set corners to input val
	


	// 		// counter += 1;
	// 		// inArray[j]=counter;
			

	// 		// console.log(i+j);
	// 		// testarray[i][j] = i+j;
	// 		// console.log(testarray[i][j]);
	// 	}
	// 	// testarray[i] = inArray;
	// }
	// console.log(testarray[0].length);
	// console.log(testarray);

	// var outstring = "";

	// for (var i = 0; i < 10; i++) {
	// 	outstring = "";
	// 	for (var j = 0; j < 10; j++) {
	// 		outstring+= testarray[i][j]+' ';
	// 	}
	// 	console.log(outstring);
	// }








// def diamond_square(width, height):
//   # Set up the array of z-values
//   let A = a width*height 2D array of 0s
//   pre-seed four corners of A with a value

//   let step_size = width - 1
//   let r = a random number within a range

//   # Main loop
//   while step_size > 1:
//     loop over A
//       do diamond_step for each square in A 

//     loop over A
//       do square_step for each diamond in A

//     step_size /= 2
//     reduce random range for r

// def diamond_step(x, y, step_size, r):
//   # Note: this assumes x, y is top-left of square
//   # but you can implement it how you like
//   let avg = average of square corners step_size apart
//   A[x + step_size/2][y + step_size/2] = avg + r

// def square_step(x, y, step_size, r):
//   # Note: x, y here are the middle of a diamond
//   let avg = average of four corners of diamond 
//   A[x][y] = avg + r