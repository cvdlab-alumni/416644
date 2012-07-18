


var makeTower = function(circleSegments,heightHRSegments,heightLRSegments){ //i parametri servono per impostare manualmente il numero di segmenti, altrimenti vengono presi valori di default

		circleSegments = circleSegments || 60;
		heightLRSegments = heightLRSegments || 10;
		heightHRSegments = heightHRSegments || 40;

		var mkCilinder = function(r,h,n){
			var domain = DOMAIN([[0,1],[0,2*PI],[0,1]])([1,n,1]);

			var mapping = function(p){
				var dr = p[0];
				var alfa = p[1];
				var dh = p[2];

				return [r*dr*COS(alfa),r*dr*SIN(alfa),h*dh];
			}

			return MAP(mapping)(domain);

		}

		var mkCoronaCircolare = function(r1,r2,h,n){
			var domain = DOMAIN([[r1,r2],[0,2*PI],[0,1]])([1,2*n,1]);

			var mapping = function(p){
				var r = p[0];
				var alfa = p[1];
				var dh = p[2];

				return [r*COS(alfa),r*SIN(alfa),h*dh];
			}

			return MAP(mapping)(domain);
		}

		var mkPartOfCoronaCircolare = function(r1,r2,h,alfa1,alfa2,n){
			var domain = DOMAIN([[r1,r2],[alfa1,alfa2],[0,1]])([1,n,1]);

			var mapping = function(p){
				var r = p[0];
				var alfa = p[1];
				var dh = p[2];

				return [r*COS(alfa),r*SIN(alfa),h*dh];
			}

			return MAP(mapping)(domain);
		}


		var baseTorre = mkCilinder(2,0.3,circleSegments);

		var rigonfiamentoBasso = CUBIC_HERMITE(S0)([[1.9,0,0.3],[1.8,0,1],[0.5,0,0.5],[-0.8,0,0.5]]); //p0 p1 t0 t1
		var raccordoRigonfiamento = CUBIC_HERMITE(S0)([[1.8,0,1],[1.5,0,1.5],[-0.8,0,0.5],[0,0,0.3]]); //p0 p1 t0 t1
		var scalino = CUBIC_HERMITE(S0)([[1.5,0,1.5],[1.4,0,1.6],[0,0,0.3],[-0.15,0,0.3]]); //p0 p1 t0 t1
		var corpo = CUBIC_HERMITE(S0)([[1.4,0,1.6],[1.2,0,3.8],[-0.3,0,0.5],[0,0,2.5]],40); //p0 p1 t0 t1
		var scalinoAlto = CUBIC_HERMITE(S0)([[1.2,0,3.8],[1.4,0,3.9],[0,0,0.3],[0.1,0,0.3]]); //p0 p1 t0 t1
		var collo = CUBIC_HERMITE(S0)([[1.4,0,3.9],[1.65,0,4.25],[0.1,0,0.3],[0.4,0,0.1]]); //p0 p1 t0 t1
		var coronaBassa = CUBIC_HERMITE(S0)([[1.65,0,4.25],[1.65,0,4.37],[0.2,0,0],[-0.2,0,0]]); //p0 p1 t0 t1
		var scanalatura = CUBIC_HERMITE(S0)([[1.65,0,4.37],[1.65,0,4.4],[-0.2,0,0],[0.2,0,0]]); //p0 p1 t0 t1
		var coronaMedia = CUBIC_HERMITE(S0)([[1.65,0,4.4],[1.7,0,4.7],[0.2,0,0],[0,0,0.5]]); //p0 p1 t0 t1


		var profiloLOWRes = [scalino,scalinoAlto,collo,coronaBassa,scanalatura,coronaMedia];

		var profiloHIGHRes = [rigonfiamentoBasso,raccordoRigonfiamento,corpo];

		var getSurf = function(curva,n1,n2){
			var domain = DOMAIN([[0,1],[0,2*PI]])([n1||10,n2||40]);
			var mapping = ROTATIONAL_SURFACE(curva);
			return MAP(mapping)(domain);
		}

		var getSurfLR = function(curva){
			return getSurf(curva,heightLRSegments,circleSegments);
		}
		var getSurfHR = function(curva){
			return getSurf(curva,heightHRSegments,circleSegments);
		}


		var torreLR = STRUCT(AA(getSurfLR)(profiloLOWRes));
		var torreHR = STRUCT(AA(getSurfHR)(profiloHIGHRes));

		var tappo = mkCilinder(1.7,0.1,circleSegments);
		tappo.translate([2],[4.7]);

		var coronaAlta = [];

		var numDenti = 6;
		var percVuoto = 0.2;

		for(var i = 0; i<numDenti; i++){
			var alfa1 = i*(2*PI/numDenti);
			var alfa2 = alfa1+(((1-percVuoto)*2*PI)/numDenti);

			var dente = mkPartOfCoronaCircolare(1.35,1.7,0.5,alfa1,alfa2,Math.round( (circleSegments*(1-percVuoto))/numDenti ) );
			dente.translate([2],[4.8]);

			coronaAlta.push(dente);
		}


		var TORRE = STRUCT([torreHR,torreLR,baseTorre,tappo,STRUCT(coronaAlta)]);

		var altezza = 2;
		var raggio = 0.4;

		TORRE.scale([0,1,2],[(raggio/2),(raggio/2),(altezza/5.3)]);
		TORRE.color([255/255,235/255,190/255]);


		return TORRE;

	}


var scmodel = makeTower();

DRAW(scmodel);

