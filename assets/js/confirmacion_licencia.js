var getUrl = window.location;
var params1 = getUrl.pathname.split('/')[4];
var params2 = getUrl.pathname.split('/')[5];

if(!params1){
    $('#mensaje').append('<center><h3>La licencia no puede ser impresa</h3></center>');
}else{
    $.ajax({
        url: baseURL + 'admin/confirmacion_lic',
        type: "GET",
        dataType: 'json',
        data: params,
        success:function(data){
            console.log(data);
        }
    });
}
