
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


var coloreTimone = [25/255, 25/255, 112/255];

timoneOrizz.color(coloreTimone);
timoneVert.color([220/255,60/255,60/255]);


var timone = STRUCT([timoneOrizz,timoneVert]);
return timone;
}


DRAW(MAKETIMONE());

