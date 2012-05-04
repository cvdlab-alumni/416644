
var getBezierS0 = function (controls,n,draw){
	
	var domain = INTERVALS(1)(n || 20);
	var mapping = BEZIER(S0)(controls);

	var c = MAP(mapping)(domain);
	if(draw){
		DRAW(c);
	}

	return c;
}

var getBezierS1 = function (controls,n,draw){
	
	var domain = DOMAIN([[0,1],[0,1]])([20,20]);
	var mapping = BEZIER(S1)(controls);

	var c = MAP(mapping)(domain);
	if(draw){
		DRAW(c);
	}

	return c;
}


var lunghezzaAla = 5;
var lunghezzaCentroAla = 1;


var domain = INTERVALS(1)(20);
var scheletroAlaBase = [[1.5,0,0],[0.1,0.05,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0.3,0],[1.5,0,0]];
var scheletroAlaFine = [[1.5,0,lunghezzaAla],[1.3,0,lunghezzaAla+0.5],[1,0,lunghezzaAla+0.5],[0.4,0,lunghezzaAla+0.5],[0.2,0,lunghezzaAla+0.5],
						[0.1,0,lunghezzaAla],[0,0,lunghezzaAla],[0.1,0,lunghezzaAla],[0.2,0,lunghezzaAla+0.5],[0.4,0,lunghezzaAla+0.5],[1.1,0,lunghezzaAla+0.5],
						[1.3,0,lunghezzaAla+0.5],[1.5,0,lunghezzaAla]];
var mapping = BEZIER(S0)(scheletroAlaBase);

var c = MAP(mapping)(domain);
DRAW(c);
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

DRAW(ala);
//DRAW(STRUCT(bzs));

