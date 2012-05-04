

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
	
	var domain = DOMAIN([[0,1],[0,1]])([n||20,n||20]);
	var mapping = BEZIER(S1)(controls);

	var c = MAP(mapping)(domain);
	if(draw){
		DRAW(c);
	}

	return c;
}