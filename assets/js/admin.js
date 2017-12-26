$(document).ready(function () {

    'use strict';

    // ------------------------------------------------------- //
    // Mensajes
    // ------------------------------------------------------ //
    if ($('#tblMensajes').length){
        $('#tblMensajes').DataTable({
            "ordering": false,
            "info":     false,
            "paging":   false,
            "oLanguage": {
                "sSearch": "<span>Buscar mensaje:</span> _INPUT_",
                "sEmptyTable": "No se encontraron mensajes :(",
                "zeroRecords": "No se encontraron coincidencias :(",
            },
            "language": {
                "zeroRecords": "No records to display"
            }
        });
    }

});

function logout(){
   acLogout().done(function(data){
        if (data.status == 200){
            window.location.href = baseURL + "ingresar";
        }
   });
}

function acLogout(){
    return $.ajax({
        url: baseURL + "auth/logout",
        type: "post",
        dataType: 'json',
    });
}