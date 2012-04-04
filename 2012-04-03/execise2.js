

//var pezzettinosx = SIMPLEX_GRID([[],[],[hbase]]);

var hbase = 2;

var pezzettinoSx = SIMPLEX_GRID([[1],[2],[hbase]]);
var bloccoPiscina = SIMPLEX_GRID([[-1,20],[1,-9,7],[hbase]]);
var ufficio = SIMPLEX_GRID([[-1,9],[-17,5],[hbase]]);
var piscina = SIMPLEX_GRID([[-1,20],[-1,9],[(hbase-0.25)]]);
var bloccoCentrale = SIMPLEX_GRID([[-21,15],[17],[hbase]]);
var baseSezioneScalette = SIMPLEX_GRID([[-21,-15,3],[1,-3,13],[hbase]]);
var baseCasa = SIMPLEX_GRID([[-39,8],[-4,12],[hbase]]);
var pezzettinoDx1 = SIMPLEX_GRID([[-39,-8,4],[-4,1],[hbase]]);
var pezzettinoDx2 = SIMPLEX_GRID([[-39,-8,-4,1],[-4,2],[hbase]]);

var arrScalette = [];
	for (var i=0; i<8; i++){
		var scalino = SIMPLEX_GRID([[-36,3-(i*(3/8))],[-1,3],[i*(hbase/8)]]);
		arrScalette.push(scalino);
	}
var scalette = STRUCT(arrScalette);

var base = STRUCT([pezzettinoSx,bloccoPiscina,ufficio,piscina,
					bloccoCentrale,baseSezioneScalette,scalette,baseCasa,
					pezzettinoDx1,pezzettinoDx2]);



DRAW(base);
