var userURL = 'http://licenciasprueba.guadalajara.gob.mx/gdlusuarios/auth/';
//var baseURL = 'http://visorurbano.guadalajara.gob.mx/';
var baseURL = "http://localhost/backend/";
//var userURL = "http://localhost/usrGDL/auth/";*/
function incializarTbl(val){
  switch (val) {
    case "T":
        val="Todas";
      break;
    case "R":
        val="Revisadas";
      break;
    case "P":
        val="Prioritarios";
      break;
   }
    $('#tbl'+val).DataTable({
        "ordering": false,
        "info":     false,
        "paging":   false,
        "oLanguage": {
            "sSearch": "<span>Buscar licencias:</span> _INPUT_",
            "sEmptyTable": "No se encontrarón licencias :(",
            "sZeroRecords": "No se encontrarón coincidencias :(",
        },
        "language": {
            "sZeroRecords": "No records to display"
        }
    });
}

function encode(pass){
   var sha256 = new jsSHA('SHA-256', 'TEXT');
   sha256.update(pass);
   var hash = sha256.getHash("HEX");
   return [hash];
}

function traer_informacion(val){
  $.ajax({
      type: "POST",
      dataType: "json",
      url: baseURL + "RevisionController/licencias",
      data:{
        "tipo":val,
      },
      success:function(data){
          var identificador;
          var idTablas;
          switch (val) {
            case "T":
            identificador=$('#bodyTodas');
            idTablas="Todas";
            break;
            case "R":
            identificador=$('#bodyRevisadas');
            idTablas="Revisadas";
            break;
            case "P":
            identificador=$('#bodyPrioritarios');
            idTablas="Prioritarios";
            break;
          }
          if(data.status){
             for (var i = 0; i < data.data.length; i++) {
               identificador.append('<tr role="row">'+
               '<td>'+
               data.data[i].st2_nombre_solicitante+
               '</td>'+
               '<td>'+
               data.data[i].descripcion_factibilidad+
               '</td>'+
               '<td>'+
               data.data[i].fecha+
               '</td>'+
               '<td style="text-align:center;">'+
               '<a href="/revision"><i class="fa fa-eye" aria-hidden="true"></i></a>'+
               '</td>'+
               '</tr>');
             }
              incializarTbl(val);
          }else{
            identificador.append('<tr role="row">'+
            '<td colspan="4" style="text-align:center;">'+
              "No se encontrarón licencias :("+
            '</td>'+
            '</tr>');
          }
    }
    });
}
traer_informacion('T');
