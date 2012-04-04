

//var pezzettinosx = SIMPLEX_GRID([[],[],[hbase]]);

var hbase = 2;
var hmuri = 3;
var dimColonne = 0.4;
var hbpanca = 0.5;
var hpanca = 0.5;
var htetti = 0.5;
var i;
var array;

var coloreBase = [255/255, 248/255, 220/255];
var coloreMuri = [255/255, 250/255, 205/255]; //255 228 181
var coloreColonne = [255/255, 250/255, 205/255];
var colorePanca = [245/255, 222/255, 179/255]; //[255 250 250];
var coloreAcqua = [135/255, 206/255, 250/255]; //175 238 238
var coloreVetro = [0/255, 255/255, 255/255];
var coloreTetti = [188/255, 143/255, 143/255];
var coloreArredamento = [210/255, 105/255, 30/255];

var pezzettinoSx = SIMPLEX_GRID([[1],[2],[hbase]]);
var bloccoPiscina = SIMPLEX_GRID([[-1,20],[1,-9,7],[hbase]]);
var ufficio = SIMPLEX_GRID([[-1,8],[-17,5.2],[hbase]]);
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


var muroSotto = SIMPLEX_GRID([[-1,7],[-0.8,0.2],[hbase+hmuri]]);
var muroSinistra = SIMPLEX_GRID([[-0.8,0.2],[-0.8,21.6],[hbase+hmuri]]);
var muroSopraUfficio = SIMPLEX_GRID([[-1,8],[-22.2,0.2],[hbase+hmuri]]);
var muroDestraUfficio = SIMPLEX_GRID([[-9,0.2],[-16.8,5.6],[hbase+hmuri]]);
var muroSopraPiscina = SIMPLEX_GRID([[-7.5,19],[-15,0.2],[-hbase,hmuri]]);
var muroSottoVetrate = SIMPLEX_GRID([[-25.2,8.6],[-7.3,0.2],[-hbase,hmuri]]);

var muroDestraVetrate = SIMPLEX_GRID([[-37.1,5.4],[-11.4,0.2],[hbase+hmuri]]);
var muroSopraCasa = SIMPLEX_GRID([[-37.8,13.4],[-16,0.2],[hbase+hmuri]]);
var muroSottoCasa = SIMPLEX_GRID([[-41.5,9.7],[-4.8,0.2],[hbase+hmuri]]);
var muroDestraCasa = SIMPLEX_GRID([[-51,0.2],[-5,11],[hbase+hmuri]]);

var muroSottoUfficio1 = SIMPLEX_GRID([[-1,6.15],[-16.95,0.1],[-hbase,hmuri]]);
var muroSottoUfficio2 = SIMPLEX_GRID([[-7.85,1.15],[-16.95,0.1],[-hbase,hmuri]]);
var muroDentroUfficio1 = SIMPLEX_GRID([[-4.95,0.1],[-17.05,2.1],[-hbase,hmuri]]);
var muroDentroUfficio2 = SIMPLEX_GRID([[-4.95,0.1],[-19.85,2.35],[-hbase,hmuri]]);
var muroSottoBagno1 = SIMPLEX_GRID([[-5.05,0.85],[-20.7,0.1],[-hbase,hmuri]]);
var muroSottoBagno2 = SIMPLEX_GRID([[-6.6,2.4],[-20.7,0.1],[-hbase,hmuri]]);
var muroDentroBagno1 = SIMPLEX_GRID([[-6.95,0.1],[-20.8,0.35],[-hbase,hmuri]]);
var muroDentroBagno2 = SIMPLEX_GRID([[-6.95,0.1],[-21.85,0.35],[-hbase,hmuri]]);

var mkColonna = function(x,y,l){
	var rett1 = SIMPLEX_GRID([[-(x-(l/6)),l/3],[-(y-(l/2)),l],[-hbase,hmuri]]);
	var rett2 = SIMPLEX_GRID([[-(x-(l/2)),l/3],[-(y-(l/6)),l/3],[-hbase,hmuri]]);
	var rett3 = SIMPLEX_GRID([[-(x+(l/6)),l/3],[-(y-(l/6)),l/3],[-hbase,hmuri]]);
	return STRUCT([rett1,rett2,rett3]);
}
var arrColonne = [];
array = [26,32,39,45];
for(i in array){
	arrColonne.push(mkColonna(array[i],7,dimColonne));
	arrColonne.push(mkColonna(array[i],14,dimColonne));
}

var vetroSotto= SIMPLEX_GRID([[-30,11.5],[-4.95,0.05],[-hbase,hmuri]]);
var vetroSopra= SIMPLEX_GRID([[-30,10],[-13.75,0.05],[-hbase,hmuri]]);
var vetroVertSx= SIMPLEX_GRID([[-30.95,0.05],[-7.5,6.25],[-hbase,hmuri]]);
var vetroVertDx= SIMPLEX_GRID([[-31.95,0.05],[-7.5,6.25],[-hbase,hmuri]]);
var vetroPiscinaPiccola= SIMPLEX_GRID([[-44.7,0.05],[-6.9,7.3],[-hbase,hmuri]]);



var sopraPanca = SIMPLEX_GRID([[-7.9,15.3],[-14.1,0.7],[-hbase,-hbpanca,hpanca]]);
var arrSottoPanca = []
array = [8,10,12,14,16,18,20,22];
var ycubipanca = 14.1+0.35;

var mkCuboPanca = function(x,y,l){
	return SIMPLEX_GRID([[-(x),l],[-(y-l/2),l],[-hbase,hbpanca]]);
}

for (i=8; i<23; i=i+2.1){
	arrSottoPanca.push(mkCuboPanca(i,ycubipanca,0.5));
}

var tettoUfficio = SIMPLEX_GRID([[-0.5,9],[-13.2,9.3],[-hbase,-hmuri,htetti]]);
var tettoCasa = SIMPLEX_GRID([[-24,23],[-4,13],[-hbase,-hmuri,htetti]]);

var mkSedia = function(){
  var gSedia = SIMPLEX_GRID([[0.2,-0.6,0.2],[0.2,-0.6,0.2],[0.5]]);
  var corpoSedia = SIMPLEX_GRID([[1],[1],[-0.5,0.2]]);
  var schienaleSedia = SIMPLEX_GRID([[1],[-0.8,0.2],[-0.7,0.3]]);

  return STRUCT([gSedia,corpoSedia,schienaleSedia]);
}

var sedia = mkSedia();
sedia = T([0,1,2])([3,13,hbase])(sedia);

var arredamento = STRUCT([sedia]);
COLOR(coloreArredamento)(arredamento);

var base = STRUCT([pezzettinoSx,bloccoPiscina,ufficio,fondoPiscina,
					bloccoCentrale,baseSezioneScalette,scalette,baseCasa,
					pezzettinoDx1,pezzettinoDx2,fondoPiscinaPiccola]);
COLOR(coloreBase)(base);

var piscine = STRUCT([piscina,piscinaPiccola]);
COLOR(coloreAcqua)(piscine);

var muri = STRUCT([muroSotto,muroSinistra,muroDestraUfficio,muroSopraUfficio,muroSopraPiscina,muroSottoVetrate,
					muroSopraCasa,muroDestraVetrate,muroSottoCasa,muroDestraCasa,
					muroSottoUfficio1,muroSottoUfficio2,muroDentroUfficio1,muroDentroUfficio2,
					muroSottoBagno1,muroSottoBagno2,muroDentroBagno1,muroDentroBagno2]);
COLOR(coloreMuri)(muri);

var colonne = STRUCT(arrColonne);
COLOR(coloreColonne)(colonne);

var vetrate = STRUCT([vetroSotto,vetroSopra,vetroVertSx,vetroVertDx,vetroPiscinaPiccola]);
COLOR(coloreVetro)(vetrate);

var panca = STRUCT([sopraPanca,STRUCT(arrSottoPanca)]);
COLOR(colorePanca)(panca);

var tetti = STRUCT([tettoUfficio,tettoCasa]);
COLOR(coloreTetti)(tetti);

var pavillon = STRUCT([base,piscine,muri,colonne,vetrate,panca,tetti,arredamento]);

DRAW(pavillon);
