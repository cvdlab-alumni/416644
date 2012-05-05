


var mkPista = function () {

var colorStriscie = [0.95,0.95,0.95];
var colorAsfalto = [0.3,0.3,0.3];

var asfalto = SIMPLEX_GRID([[10,-0.5,10],[30],[1]]);

var striscie = SIMPLEX_GRID([[-10,0.5],[-1,3,-3,3,-3,3,-3,3,-3,3,-2],[1]]);

var nonStriscie = SIMPLEX_GRID([[-10,0.5],[1,-3,3,-3,3,-3,3,-3,3,-3,2],[1]]);

striscie.color(colorStriscie);
asfalto.color(colorAsfalto);
nonStriscie.color(colorAsfalto);

return STRUCT([striscie,asfalto,nonStriscie]);
}


DRAW(mkPista());



//###############################################################################################################################################
var MAKEALA = function() { 

var getBezierS0 = function (controls,n,draw){
	
	var domain = INTERVALS(1)(n || 20);
	var mapping = BEZIER(S0)(controls);

	var c = MAP(mapping)(domain);
	if(draw){
		DRAW(c);
	}

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

var drawBz0 = function(controls){
	DRAW(getBezierS0(controls));
}
var scaleAll = function (model,factor){
	return S([0,1,2])([factor,factor,factor])(model);
}

//--------------------------------------------------------------------------

var coloreAli = [80/255, 80/255, 200/255];
var coloreStecche = [205/255, 133/255, 63/255];

var lunghezzaAla = 5;
var lunghezzaCentroAla = 1;
var offsetAla = 0.7;

var scheletroAlaBase = [[1.5,0,0],[0.1,0.05,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0.3,0],[1.5,0,0]];

//---------------------------------------------------------------------------
var mkAla = function  (pos) {
	pos = pos || [0,0,0];
	var domain = INTERVALS(1)(20);
	var scheletroAlaFine = [[1.5,0,lunghezzaAla],[1.3,0,lunghezzaAla+0.5],[1,0,lunghezzaAla+0.5],[0.4,0,lunghezzaAla+0.5],[0.2,0,lunghezzaAla+0.5],
							[0.1,0,lunghezzaAla],[0,0,lunghezzaAla],[0.1,0,lunghezzaAla],[0.2,0,lunghezzaAla+0.5],[0.4,0,lunghezzaAla+0.5],[1.1,0,lunghezzaAla+0.5],
							[1.3,0,lunghezzaAla+0.5],[1.5,0,lunghezzaAla]];
	var mapping = BEZIER(S0)(scheletroAlaBase);

	var c = MAP(mapping)(domain);
	// DRAW(c);
	// DRAW(COLOR([0.7,0.7,0.7])(POLYLINE(bezpoints)));

	var scheletri = [];

	for(var i = 0; i<11; i++){

		scheletri.push(
			scheletroAlaBase.map(
							function(el){
								return [el[0],el[1],el[2]+((i*lunghezzaAla)/10)];}
								)
						);
	}
	scheletri.push(scheletroAlaFine);

	var dbzs = AA(getBezierS0)(scheletri);
	var bzs = AA(BEZIER(S0))(scheletri);



	var ala = getBezierS1(bzs);

	var my = function(p){
		var x = p[0];
		var y = p[1];
		var z = p[2];
		return [x,y+((z*offsetAla)/lunghezzaAla),z];
	};

	var alaPro = MAP(my)(ala); 

	alaPro.rotate([0,1],PI/2);
	alaPro.rotate([0,2],PI/2);

	alaPro.translate([0,1,2],pos);

	return alaPro;
}


// DRAW(ala);
//DRAW(alaPro);

//OVALETTI
var mkStecca = function (pos){
	
	pos = pos || [0,0,0];

	var spessore = 0.3;

	var schOvaletto = [[0,0.75,0],[-spessore,0.75,0],[-spessore,-1.25,0],[spessore,-1.25,0],[spessore,0.75,0],[0,0.75,0]];
	var schPunta = schOvaletto.map(function(e){return[e[0]/4,e[1]/4,e[2]/4];})


	var punta = schPunta;
	var ovBase = traslaPunti(schOvaletto,0,0,2);
	var ovUp = traslaPunti(schOvaletto,0,0,8);
	var puntaUp = traslaPunti(schPunta,0,0,10);


//	var ovals = AA(BEZIER(S0))([punta,ovBase,ovUp,puntaUp]);

//	var stecca = getBezierS1(ovals);
	var stecca = getSuperficie([punta,ovBase,ovUp,puntaUp]);

	
	stecca = MAP(function(p){return [p[0],p[1]+0.5-(p[2]*0.5/2),p[2]];})(S([0,1,2])([0.2,0.2,0.2])(stecca));
	

	stecca.translate([0,1,2],pos);

	return stecca;
}
var mkCentroAla = function (){
	var scheletroAlaBaseTraslato = [[0,1.5,0],[0,0.1,0.05],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0.3],[0,1.5,0]];
	var scheletroCentroAlaBase = [[0,1,0],[0,0.1,0.05],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0.3],[0,1,0]];
	var schCentroAlaMedio = traslaPunti(scheletroCentroAlaBase,0.3,0,0);
	var schCentroAlaEsterno = traslaPunti(scheletroAlaBaseTraslato,0.5,0,0);
	var centroAlaA = getSuperficie([scheletroCentroAlaBase,schCentroAlaMedio,schCentroAlaEsterno]);
	
	centroAlaA.color(coloreAli);
	return centroAlaA;
}

var ali = STRUCT([mkAla([0,0.5,0]), mkAla([0,0,2])]);
var stecche = STRUCT([mkStecca([2,0.4,0.3]), mkStecca([2,1.2,0.3]),
						mkStecca([4,0.4,0.6]), mkStecca([4,1.2,0.6])]);


//ali = COLOR(coloreAli)(ali);
//stecche = COLOR(coloreStecche)(stecche);
ali.color(coloreAli);
stecche.color(coloreStecche);


var alaDef = STRUCT([ali,stecche]);
alaDef.translate([0],[0.5]);


var cAla1 = mkCentroAla();
cAla1.translate([0,1,2],[0,0.5,0]);
var cAla2 = mkCentroAla();
cAla2.translate([0,1,2],[0,0,2]);

var alaDef = STRUCT([alaDef,cAla2,cAla1]);
alaDef = STRUCT([alaDef, S([0])([-1])(alaDef)]);

return alaDef;
}

//###############################################################################################################################################

var MAKETELAIO = function (){

var getBezierS0 = function (controls){
	
	var domain = INTERVALS(1)(30);
	var mapping = BEZIER(S0)(controls);

	var c = MAP(mapping)(domain);


	return c;
}

var mkSphere = function(r,n){
	var d = DOMAIN([[0,PI],[0,2*PI]])([n,2*n]);

	var map = function (p){
		var alfa = p[0]-(PI/2);
		var beta = p[1];

		var x = r*COS(alfa)*COS(beta);
		var y = r*COS(alfa)*SIN(beta);
		var z = r*SIN(alfa);

		return [x,y,z];
	}
	var m = MAP(map)(d);


	return m;
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


// punta e motore 
var naso = mkSphere(0.5,20);

naso.scale([0,1,2],[0.7,2,0.7]);
naso.translate([0,1,2],[0,0.5,-0.7]);

var elica1 = mkSphere(0.5,15);

elica1.scale([0,1,2],[0.1,1.7,0.25]);
elica1.rotate([0,1],PI/2);
elica1.translate([0,1,2],[-0.9,-0.4,-0.7]);

var elica2 = S([0])([-1])(elica1);

var elica = STRUCT([elica1,elica2]);
// copriamo le vegogne

var fakepoint = [punta[0],punta[0]];

var vergogne =  getSuperficie([traslaPunti(scalaPunti(punta,1.1,1.1,1.1),0,0,0.05),fakepoint]);


puntatelaio = STRUCT([puntatelaio,vergogne]);

// CORPO -----------------------------------

var corpotelaioaio = [];

//var contornoSmussatoNUB = scalaPunti(circleConMolteplicita([1,3,3,1,3,3,1]),0.6,0.6,0.6);
var contornoSmussato = scalaPunti(circleConMolteplicita([1,3,3,0,3,3,1]),0.65,0.65,0.65);


var quadrato = scalaPunti(circleConMolteplicita([1,9,9,1,9,9,1]),0.5,0.5,0.5);
var coda = scalaPunti(circleConMolteplicita([1,19,19,1,19,19,1]),0.00,0.5,0.15);

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

var colorePunta =[254/255, 254/255, 254/255];
var coloreCorpo = [80/255, 80/255, 255/255];
var coloreNaso = [205/255, 133/255, 63/255];
var coloreElica = [165/255, 42/255, 42/255];


puntatelaio.color(colorePunta);
corpo.color(coloreCorpo);
naso.color(coloreNaso);
elica.color(coloreElica);


var ruota = TORUS_SURFACE([0.1, 0.1])([15,15,8]);
ruota.rotate([0,2],[PI/2]);
ruota.scale([0,1,2],[1/0.6,1,1/0.6]);
ruota.translate([0,1,2],[0.7,2.05,-3]);
ruota.color([0.1,0.1,0.1]);


var stecca = CUBOID([0.1,0.1,2]);
stecca.translate([0,1,2],[0.5,2,-3]);
stecca.color(coloreNaso);

var carrello1 = STRUCT([ruota,stecca]);
var carrello2 = S([0])([-1])(carrello1);

var carrello = STRUCT([carrello1,carrello2]);

var coloreVetro = [0, 254/255, 254/255,0.4];
var vetro = CUBOID([1.6,0.02,1]);
var vetroCov = CUBOID([1.6,0.02,0.05]);

vetro.color(coloreVetro);
vetro.translate([0,1,2],[-0.8,1,0]);
vetroCov.color([0, 254/255, 254/255]);
vetroCov.translate([0,1,2],[-0.8,1,1]);




var telaio = STRUCT([puntatelaio,corpo,naso,elica,carrello,vetro,vetroCov]);

return telaio;
}

//###############################################################################################################################################
var MAKETIMONE = function(){

var getBezierS0 = function (controls){
	
	var domain = INTERVALS(1)(30);
	var mapping = BEZIER(S0)(controls);

	var c = MAP(mapping)(domain);


	return c;
}

var mkSphere = function(r,n){
	var d = DOMAIN([[0,PI],[0,2*PI]])([n,2*n]);

	var map = function (p){
		var alfa = p[0]-(PI/2);
		var beta = p[1];

		var x = r*COS(alfa)*COS(beta);
		var y = r*COS(alfa)*SIN(beta);
		var z = r*SIN(alfa);

		return [x,y,z];
	}
	var m = MAP(map)(d);


	return m;
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
		0 : [0,0,0],
		1 : [1,0,0],
		2 : [1,1,0],
		3 : [0.4,1,0],
		4 : [0,0.6,0],
		5 : [0,0,0],
	};
	for(var i in arr){
		var molt = arr[i];
		for(var j = 0; j<molt; j++){
			ret.push(punto[i]);
		}
	}
	return ret;
};

var circleConMolteplicita2 = function (arr) {

	var ret = [];
	var punto = {
		0 : [0,0.5,-0.3],
		1 : [0,1.5,-0.3],
		2 : [0,1.5,1.3],
		3 : [0,0,1.3],
		4 : [0,0,0],
		5 : [0,0.5,0],
		6 : [0,0.5,-0.3]
	};
	for(var i in arr){
		var molt = arr[i];
		for(var j = 0; j<molt; j++){
			ret.push(punto[i]);
		}
	}
	return ret;
};



var schTimOrizz = circleConMolteplicita([9,11,9,11,11,9]);
var schTimOrizz2 = traslaPunti(schTimOrizz,0,0,-0.1);

var surf1orizz = getSuperficie([schTimOrizz,[[0,0,0],[0,0,0]]]);
var surf2orizz = getSuperficie([schTimOrizz2,[[0,0,-0.1],[0,0,-0.1]]]);

var bordoOrizz = getSuperficie([schTimOrizz,schTimOrizz2]);

var timoneOrizz1 = STRUCT([surf1orizz,surf2orizz,bordoOrizz]);
var timoneOrizz2 = S([0])([-1])(timoneOrizz1);

/*
var fp = [[0.5,0.5,0.2],[0.5,0.5,0.2]];
var fp1 = [[0.5,0.5,-0.2],[0.5,0.5,-0.2]];

var timoneOrizz1 = getSuperficie([fp,schTimOrizz,schTimOrizz,schTimOrizz,schTimOrizz,schTimOrizz,schTimOrizz,schTimOrizz,fp1]);
*/

//drawBz0(schTimOrizz);
//drawBz0(schTimOrizz2);
var schTimVert = circleConMolteplicita2([1,1,1,1,1,1,0]);

var schTimVertA = traslaPunti(schTimVert,-0.05,0,0);
var schTimVertB = traslaPunti(schTimVert,0.05,0,0);

var surf1vert = getSuperficie([schTimVertA,[[-0.05,0.5,-0.3],[-0.05,0.5,0]]]);
var surf2vert = getSuperficie([schTimVertB,[[0.05,0.5,-0.3],[0.05,0.5,0]]]);
var bordoVert = getSuperficie([schTimVertA,schTimVertB]);

var vergogne = SIMPLEX_GRID([[0.1],[0.01],[0.3]]);
vergogne.translate([0,1,2],[-0.05,0.5,-0.3]);

var timoneVert = STRUCT([surf1vert,surf2vert,bordoVert,vergogne]);

var timoneOrizz = STRUCT([timoneOrizz1,timoneOrizz2]);


var coloreTimone = [80/255, 80/255, 255/255];

timoneOrizz.color(coloreTimone);
timoneVert.color([220/255,60/255,60/255]);


var timone = STRUCT([timoneOrizz,timoneVert]);
return timone;
}


var timone = MAKETIMONE();
var telaio = MAKETELAIO();
var ala = MAKEALA();

telaio.scale([0,1,2],[0.6,1,0.6]);
telaio.translate([2],[1.1]);
timone.translate([1,2],[7.4,0.75]);

var avro504k = STRUCT([ala,telaio,timone]);

avro504k.rotate([1,2],[-PI/15]);
avro504k.rotate([0,1],[PI/6]);

avro504k.translate([0,1,2],[15.25,5,5]);

DRAW(avro504k);
