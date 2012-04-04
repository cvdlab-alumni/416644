

//var pezzettinosx = SIMPLEX_GRID([[],[],[hbase]]);

var hbase = 2;
var hmuri = 3;

var pezzettinoSx = SIMPLEX_GRID([[1],[2],[hbase]]);
var bloccoPiscina = SIMPLEX_GRID([[-1,20],[1,-9,7],[hbase]]);
var ufficio = SIMPLEX_GRID([[-1,9],[-17,5],[hbase]]);
var piscina = SIMPLEX_GRID([[-1,20],[-1,9],[-0.5,hbase-0.75]]);
var fondoPiscina = SIMPLEX_GRID([[-1,20],[-1,9],[0.5]]);
var bloccoCentrale = SIMPLEX_GRID([[-21,15],[17],[hbase]]);
var baseSezioneScalette = SIMPLEX_GRID([[-21,-15,3],[1,-3,13],[hbase]]);
var baseCasa = SIMPLEX_GRID([[-39,8],[-4,12],[hbase]]);
var pezzettinoDx1 = SIMPLEX_GRID([[-39,-8,4],[-4,1],[hbase]]);
var pezzettinoDx2 = SIMPLEX_GRID([[-39,-8,-4,1],[-4,2],[hbase]]);

var arrScalette = [];
	for (var i=0; i<8; i++){
		var scalino = SIMPLEX_GRID([[-36,3-(i*(3/8))],[-1,3],[(i+1)*(hbase/8)]]);
		arrScalette.push(scalino);
	}
var scalette = STRUCT(arrScalette);
var piscinaPiccola = SIMPLEX_GRID([[-47,4],[-5,11],[-0.5,hbase-0.75]]);
var fondoPiscinaPiccola = SIMPLEX_GRID([[-47,4],[-5,11],[0.5]]);


var base = STRUCT([pezzettinoSx,bloccoPiscina,ufficio,fondoPiscina,
					bloccoCentrale,baseSezioneScalette,scalette,baseCasa,
					pezzettinoDx1,pezzettinoDx2,fondoPiscinaPiccola]);

var piscine = STRUCT([piscina,piscinaPiccola]);

var muroSotto = SIMPLEX_GRID([[-1,7],[0.8,0.2],[hbase+hmuri]]);
var muroSinistra = SIMPLEX_GRID([[-0.8,0.2],[-0.8,21.4],[hbase+hmuri]]);
var muroSopraUfficio = SIMPLEX_GRID([[-1,8],[-22.2,0.2],[hbase+hmuri]]);
var muroDestraUfficio = SIMPLEX_GRID([[-9,0.2],[-16.8,5.4],[hbase+hmuri]]);
var muroSopraPiscina = SIMPLEX_GRID([[-7.5,19],[-15,0.2],[hbase+hmuri]]);
var muroSottoVetrate = SIMPLEX_GRID([[-25.2,8.6],[-7.3,0.2],[hbase+hmuri]]);

var muroDestraVetrate = SIMPLEX_GRID([[-37.1,5.4],[-11.4,0.2],[hbase+hmuri]]);
var muroSopraCasa = SIMPLEX_GRID([[-37.8,14.4],[-16,0.2],[hbase+hmuri]]);
var muroSottoCasa = SIMPLEX_GRID([[-41.5,9.7],[-4.8,0.2],[hbase+hmuri]]);
var muroDestraCasa = SIMPLEX_GRID([[-51,0.2],[-5,11],[hbase+hmuri]]);

var muroSottoUfficio = SIMPLEX_GRID([[-1,8],[-16.95,0.1],[hbase+hmuri]]);
var muroCentroUfficio = SIMPLEX_GRID([[-4.95,0.1],[-17.05,5.15],[hbase+hmuri]]);
var muroSottoBagno = SIMPLEX_GRID([[-5.05,3.95],[-20.7,0.1],[hbase+hmuri]]);



var muri = STRUCT([muroSotto,muroSinistra,muroDestraUfficio,muroSopraUfficio,muroSopraPiscina,muroSottoVetrate,
					muroSopraCasa,muroDestraVetrate,muroSottoCasa,muroDestraCasa
					muroSottoUfficio,muroCentroUfficio,muroSottoBagno]);




var pavillon = STRUCT([base,piscine,muri]);
DRAW(pavillon);
