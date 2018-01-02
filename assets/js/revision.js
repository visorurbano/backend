var userURL = 'http://licenciasprueba.guadalajara.gob.mx/gdlusuarios/auth/';
//var baseURL = 'http://visorurbano.guadalajara.gob.mx/';
var baseURL = "http://localhost/backend/";
//var userURL = "http://localhost/usrGDL/auth/";*/
function incializarTbl(val){
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
            "zeroRecords": "No records to display"
        }
    });
}

function todas(){
    $.ajax({
        url: baseURL + "RevisionController/licencias",
        dataType:'json',
        type: 'POST',
        data:{
            "todas":'S',
        },
        success:function(data){
            console.log(data);
        },
    });
    $('#bodyTodas').append('<tr role="row">'+
        '<td>'+
            'AFDSDFGASD'+
        '</td>'+
        '<td>'+
            'HGDFHDSGFHJ'+
        '</td>'+
        '<td>'+
            'DSKFJKHDSFDS'+
        '</td>'+
        '<td style="text-align:center;">'+
            '<a href="#"><i class="fa fa-eye" aria-hidden="true"></i></a>'+
        '</td>'+
    '</tr>');
    incializarTbl('todas');
}

function revisadas(){
    $('#tblrevisadas').append();
}

function prioritarios(){
    $('#tblprioritarios').append();
}

todas();
