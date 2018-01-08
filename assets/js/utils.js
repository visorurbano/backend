function setLoading(){
    $('#overlayLoading').remove();
    var overlay = $('<div/>',{id:'overlayLoading'}).appendTo($('body'));
    var contLoading = $('<div/>',{id:'overlayLoadingContent', class:'mui--z2'}).appendTo(overlay);
    $('body').css('overflow', 'hidden');
}

function unsetLoading(){
    $('#overlayLoading').remove();
    $('body').css('overflow-y', 'auto');
}

function errorLicenciaGiro(n){
    $('#overlayError').remove();
    var overlay = $('<div/>',{id:'overlayError'}).appendTo($('body'));
    var contLoading = $('<div/>',{id:'overlayErrorContent', class:'mui--z2'}).appendTo(overlay);
    contLoading.append('<h3><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> El trámite no puede continuar por las siguientes razones:</h3>');
    contLoading.append('<div class="footer"><a href="javascript:removeErrorLicenciaGiro(\'+n+\')" class="mui-btn">Entiendo</a></div>')
    $('body').css('overflow', 'hidden');
}

function removeErrorLicenciaGiro(n){
    $('#overlayError').remove();
    $('body').css('overflow-y', 'auto');
    switch (n){
        case 1:
            $('input:radio[name=st1_anuencia]').prop('checked', false);
        break;
    }
}