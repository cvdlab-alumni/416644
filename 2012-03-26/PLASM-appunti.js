

disegnare forme solide:

var a = CUBOID([1,2,3]);
DRAW(a);

altre funzioni:
HIDE(model);
SHOW(model);
DRAW(model);



domain:
accetta una lista di coppie che indica inizio e fine del nostro intervallo.
DOMAIN(intervals)(divisions);

//1 dim
var d1 = DOMAIN([[2,6]])([4]);
DRAW(d1);

// 2 dim
var d2 = DOMAIN([[2,6],[1,4]])([4,3]);
DRAW(d2);

// 3 dim
var d3 = DOMAIN([[2,6],[1,4],[3,5]])([4,3,2]);
DRAW(d3);


// MAPPING

MAP(mapping)(domain);

var m = MAP(mapping)(d);

esempio:
var mapping = function (p){
	var u = p[0];

	return[u,1];
};


bisettrice 1,3:

var mapping = function(p){
	var u = p[0];

	return [u,u];
}

bisettrice 3D:

var mapping = function(p){
	var u = p[0];

	return [u,u,u];
}

sinusoide:

var d = DOMAIN([[-10,10]])([60]);

var d = DOMAIN([[0,2*Math.PI]])([60]);
var mapping = function(p){
	var u = p[0];
	return [u, Math.sin(u)];
}


var m = MAP(mapping)(d);

//sinusoide3d:

var d = DOMAIN([[0,10],[0,3]])([30,3]);

var mapping = function(p){
	var u = p[0];
	return [u,p[1],Math.sin(u)];
}



//CIRCLE:

var d = DOMAIN([[0, 2*Math.PI]])([10]);

var mapping = function(p){
	return[Math.cos(p[0]), Math.sin(p[0])];
}

var drawCircle = function(r,n){
	var d = DOMAIN([[0,2*Math.PI]])([n]);
	var mapping = function(p){
		return[r*Math.cos(p[0]), r*Math.sin(p[0])];
	}
	var model = MAP(mapping)(d);
	COLOR([0,0,0])(model);

	DRAW(model);
	return model;
}



// CILINDRO:

var drawCilinder = function(r,h,n1,n2){
	var d = DOMAIN([[0,2*Math.PI],[0,1]])([n1,n2]);
	var mapping = function(p){
		var u = p[0];
		var v = p[1];

		return [r*Math.cos(u),r*Math.sin(u),h*v];
	}
	var m = MAP(mapping)(d);
	COLOR([0,0,0])(m);

	DRAW(m);
	return m;
}

// SFERA:

var drawSphere = function(r,n){
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


	DRAW(m);
	return m;
}

var drawPartOfSphere = function(r,n){
	var d = DOMAIN([[PI/2,PI*(4/5)],[0,2*PI]])([n,2*n]);

	var map = function (p){
		var alfa = p[0]-(PI/2);
		var beta = p[1];

		var x = r*COS(alfa)*COS(beta);
		var y = r*COS(alfa)*SIN(beta);
		var z = r*SIN(alfa);

		return [x,y,z];
	}
	var m = MAP(map)(d);


	DRAW(m);
	return m;
}
