


var getBezierS0 = function (controls){
	
	var domain = INTERVALS(1)(30);
	var mapping = BEZIER(S0)(controls);

	var c = MAP(mapping)(domain);


	return c;
}



var getBezierS1 = function (controls,n1,n2){
	
	var domain = DOMAIN([[0,1],[0,1]])([n1 || 20, n2 || 20]);
	var mapping = BEZIER(S1)(controls);

	var c = MAP(mapping)(domain);

	return c;
}

var getSuperficie = function (cpoints,n1,n2){
	var bzs = AA(BEZIER(S0))(cpoints);

	return getBezierS1(bzs,n1,n2);
}


var traslaPunti = function (arr,x,y,z){
	return arr.map(function(el){return [el[0]+x,el[1]+y,el[2]+z];});
}
var scalaPunti = function (arr,x,y,z){
	return arr.map(function(el){return [el[0]*x,el[1]*y,el[2]*z];});
}

var drawBz0 = function(controls){
	DRAW(getBezierS0(controls));
}
var scaleAll = function (model,factor){
	return S([0,1,2])([factor,factor,factor])(model);
}

var circleConMolteplicita = function (arr) {

	var ret = [];
	var punto = {
		0 : [0,0,-dpth],
		1 : [-2,0,-dpth],
		2 : [-2,0,dpth],
		3 : [0,0,dpth],
		4 : [2,0,dpth],
		5 : [2,0,-dpth],
		6 : [0,0,-dpth]
	};
	for(var i in arr){
		var molt = arr[i];
		for(var j = 0; j<molt; j++){
			ret.push(punto[i]);
		}
	}
	return ret;
};



var dpth = 1.8;
var circle = [[0,0,-dpth],[-2,0,-dpth],[-2,0,dpth],[2,0,dpth],[2,0,-dpth],[0,0,-dpth]];

// PUNTA TELAIO -------------------------------------------------------------------------------------
var punta = traslaPunti(scalaPunti(circle,0.4,0.4,0.4),0,-0.1,-0.4);

var puntatelaioaio = [];

// PUNTI DI CONTROLLO DELLA PUNTA DEL TELAIO 
puntatelaioaio.push(punta);
puntatelaioaio.push(circle);
puntatelaioaio.push(traslaPunti(circle,0,0.3,0));
var finepunta = traslaPunti(circle,0,0.8,0);
puntatelaioaio.push(finepunta);
var puntatelaio = getSuperficie(puntatelaioaio,25,15);


// copriamo le vegogne

var fakepoint = [punta[0],punta[0]];

var vergogne =  getSuperficie([traslaPunti(scalaPunti(punta,1.1,1.1,1.1),0,0,0.05),fakepoint]);


puntatelaio = STRUCT([puntatelaio,vergogne]);

// CORPO -----------------------------------

var corpotelaioaio = [];

//var contornoSmussatoNUB = scalaPunti(circleConMolteplicita([1,3,3,1,3,3,1]),0.6,0.6,0.6);
var contornoSmussato = scalaPunti(circleConMolteplicita([1,3,3,0,3,3,1]),0.65,0.65,0.65);


var quadrato = scalaPunti(circleConMolteplicita([1,9,9,1,9,9,1]),0.5,0.5,0.5);
var coda = scalaPunti(circleConMolteplicita([1,19,19,1,19,19,1]),0.00,0.5,0.2);

corpotelaioaio.push(finepunta);
/*
corpotelaioaio.push(traslaPunti(circleConMolteplicita([1,1,1,1,1,1,1]),0,1.5,0));
corpotelaioaio.push(traslaPunti(circleConMolteplicita([1,1,1,3,1,1,1]),0,2,0));
corpotelaioaio.push(traslaPunti(circleConMolteplicita([1,1,3,1,3,1,1]),0,2.5,0));
corpotelaioaio.push(traslaPunti(circleConMolteplicita([1,3,1,1,1,3,1]),0,3,0));
*/
corpotelaioaio.push(traslaPunti(contornoSmussato,0,1.5,-0.5));
corpotelaioaio.push(traslaPunti(contornoSmussato,0,3.5,-0.5));
corpotelaioaio.push(traslaPunti(quadrato,0,4.5,-0.6));
corpotelaioaio.push(traslaPunti(coda,0,8,-0.8));

//AA(drawBz0)(corpotelaioaio);

//AA(DRAW)(AA(POLYLINE)(corpotelaioaio));

var corpo = getSuperficie(corpotelaioaio);

var colorePunta =[255/255, 255/255, 255/255];
var coloreCorpo = [25/255, 25/255, 112/255];

puntatelaio.color(colorePunta);
corpo.color(coloreCorpo);

var telaio = STRUCT([puntatelaio,corpo]);

DRAW(telaio);