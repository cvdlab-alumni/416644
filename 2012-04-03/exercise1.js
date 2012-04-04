

var lineeVerticali = function(){
	var lines = [];

	var i;
	//linee verticali
	lines.push(POLYLINE([[0,0],[0,2]]));
	lines.push(POLYLINE([[1,0],[1,22]]));

	for (i=2; i<10 ; i++){ //piscina-bagno
		lines.push(POLYLINE([[i,0],[i,1]]));
		lines.push(POLYLINE([[i,10],[i,22]]));
	}
	for (i=10; i<21; i++){ //fine piscina
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
	//linea 1-9
	array = [17,18,19,20,21,22];
	for (i in array){
		console.log(array[i]);
		lines.push(POLYLINE([[1,array[i]],[9,array[i]] ] ));
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

var mkRect = function(x0,y0,w,h){
	return POLYLINE([[x0,y0],[x0,y0+h],[x0+w,y0+h],[x0+w,y0],[x0,y0]]);
}
var mkRect2 = function(x0,y0,x1,y1){
	return POLYLINE([[x0,y0],[x0,y1],[x1,y1],[x1,y0],[x0,y0]]);
}

var mkMuretti = function(){
	var muri = [];
	muri.push(mkRect(0.8,0.8,0.2,21.6));//piscina vert
	muri.push(mkRect(0.8,0.8,7.2,0.2)); //piscina sotto

	muri.push(mkRect(0.8,22.2,8.4,0.2));//ufficio sopra
	muri.push(mkRect(9,16.8,0.2,1.8));  //ufficio destra sotto
	muri.push(mkRect(9,16.8+1.8,0.2,1.8));  //ufficio destra centro
	muri.push(mkRect(9,16.8+1.8*2,0.2,2));  //ufficio destra sopra
	muri.push(mkRect(1,17,6,0.1));  //ufficio sotto sx
	muri.push(mkRect(8,17,1,0.1));  //ufficio sotto dx
	muri.push(mkRect(4.95,17,0.1,2.1));  //ufficio centro sotto
	muri.push(mkRect(4.95,19.9,0.1,2.3));  //ufficio centro sopra
	

	muri.push(mkRect(7.5,15,19,0.2)); //muro sopra la piscina
	muri.push(mkRect2(7.85,14.1,23.15,14.8)); //panchine sopra la piscina
	
	


	return STRUCT(muri);
}
var muretti = mkMuretti();

var pianta2D = STRUCT([griglia,muretti]);
DRAW(pianta2D);
