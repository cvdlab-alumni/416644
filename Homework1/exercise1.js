

var lineeVerticali = function(){
	var lines = [];

	var i;
	//linee verticali
	lines.push(POLYLINE([[0,0],[0,2]]));
	lines.push(POLYLINE([[1,0],[1,22]]));

	for (i=2; i<9 ; i++){ //piscina-bagno
		lines.push(POLYLINE([[i,0],[i,1]]));
		lines.push(POLYLINE([[i,10],[i,22]]));
	}
	for (i=9; i<21; i++){ //fine piscina
		lines.push(POLYLINE([[i,0],[i,1]]));
		lines.push(POLYLINE([[i,10],[i,17]]));
	}
	for (i=21; i<37; i++){ //pezzo neutro
		lines.push(POLYLINE([[i,0],[i,17]]));
	}
	for (i=37; i<40; i++){ //scalette
		lines.push(POLYLINE([[i,0],[i,1]]));
		lines.push(POLYLINE([[i,4],[i,17]]));
	}
	for (i=40; i<48; i++){ //centro casa
		lines.push(POLYLINE([[i,4],[i,16]]));
	}
	for (i=48; i<51; i++){ //fine casa
		lines.push(POLYLINE([[i,4],[i,5]]));
	}
	lines.push(POLYLINE([[51,4],[51,16]]));
	lines.push(POLYLINE([[52,4],[52,6]]));
	return STRUCT(lines);
}
var lineeOrizzontali = function(){
	var lines = [];
	var i;
	var array;

	//linea 0-1
	for (i in [0,1,2]){
		lines.push(POLYLINE([[0,i],[1,i]]));
	}
	//linea 1-8
	array = [17,18,19,20,21,22];
	for (i in array){
		console.log(array[i]);
		lines.push(POLYLINE([[1,array[i]],[8,array[i]] ] ));
	}
	//linea 1-21
	array = [0,1,10,11,12,13,14,15,16,17];
	for (i in array){
		lines.push(POLYLINE([[1,array[i]],[21,array[i]]]));
	}
	//linea 21-36
	for (i=0; i<18; i++){
		lines.push(POLYLINE([[21,i],[36,i]]));
	}
	//linea 36-39
	array = [0,1];
	for (i in array){
		lines.push(POLYLINE([[36,array[i]],[39,array[i]]]));
	}
	//linea 36-39
	for (i=4; i<18; i++){
		lines.push(POLYLINE([[36,i],[39,i]]));
	}
	//linea 39-47
	for (i=4; i<17; i++){
		lines.push(POLYLINE([[39,i],[47,i]]));
	}
	//linea 47-51
	array = [4,5,16];
	for (i in array){
		lines.push(POLYLINE([[47,array[i]],[51,array[i]]]));
	}
	//linea 51-52
	array = [4,5,6];
	for (i in array){
		lines.push(POLYLINE([[51,array[i]],[52,array[i]]]));
	}
	return STRUCT(lines);
}

var griglia = STRUCT([lineeOrizzontali(),lineeVerticali()]);

DRAW(griglia);
