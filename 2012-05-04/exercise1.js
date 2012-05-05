
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

var coloreAli = [80/255, 80/255, 255/255];
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

return alaDef;
}


DRAW(MAKEALA());

//DRAW(alaDef,centroAlaA);