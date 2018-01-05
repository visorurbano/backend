function setLoading(){
    $('#overlayLoading').remove();
    var overlay = $('<div/>',{id:'overlayLoading'}).appendTo($('body'));
    var contLoading = $('<div/>',{id:'overlayLoadingContent', class:'mui--z2'}).appendTo(overlay);
    $('body').css('overflow: hidden');
}

function unsetLoading(){
    $('#overlayLoading').remove();
    $('body').css('overflow-y: auto');
}