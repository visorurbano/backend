var userURL="http://api.guadalajara.gob.mx/autenticacion/auth/",baseURL="http://localhost/backend/";$(document).ready(function(){"use strict";function e(e,a){var n={};return n.email=e,n.password=a,$.ajax({url:userURL+"login",type:"POST",dataType:"json",data:n})}function a(e){return $.ajax({url:baseURL+"auth/login",type:"post",dataType:"json",data:e})}function n(e,a){$(".msessage-cont").remove();var n=$("<div/>",{class:"msessage-cont mui--z2"}).prependTo("body");n.html("<p>"+e+'</p><div class="close"></div>'),$(".msessage-cont .close").on("click",function(e){e.preventDefault(),$(".msessage-cont").remove()}),$(window).scrollTop($(".msessage-cont").offset().top)}function r(e,a,n,r,o,t){var s={};return s.email=e,s.nombre=a,s.ape_paterno=n,s.ape_materno=r,s.celular=o,s.password=md5(t),s.origen=4,$.ajax({url:userURL+"registro",type:"post",dataType:"json",data:s})}function o(e,a,n){var r={};return r.de=e,r.para=a,r.mensaje=n,$.ajax({url:baseURL+"admin/setMensaje",type:"post",dataType:"json",data:r})}$(".dropdown").on("show.bs.dropdown",function(){$(this).find(".dropdown-menu").first().stop(!0,!0).fadeIn()}),$(".dropdown").on("hide.bs.dropdown",function(){$(this).find(".dropdown-menu").first().stop(!0,!0).fadeOut()}),$("#frmLogin").length&&($("#frmLogin").validate({rules:{email:{required:!0,email:!0}},messages:{email:{required:"El correo electrónico es requerido para continuar.",email:"No es una cuenta de correo valida,"},password:"La contraseña es requerida para continuar."}}),$(document).keypress(function(r){13==r.which&&$("#frmLogin").valid()&&e($("#txtEmail").val(),md5($("#txtPassword").val())).done(function(e){200==e.status?a(e.data).done(function(e){200==e.status&&(""!=$("#txtRedirect").val()?window.location.href=baseURL+"nueva-licencia/"+$("#txtRedirect").val():window.location.href=baseURL+"admin")}):401==e.status?n("Credenciales no validas, por favor revisa la información y vuelve a intentar",!0):n(e.message,!0)})})),$("#btnLogin").on("click",function(){$("#frmLogin").valid()&&e($("#txtEmail").val(),md5($("#txtPassword").val())).done(function(e){200==e.status?a(e.data).done(function(e){200==e.status&&(""!=$("#txtRedirect").val()?window.location.href=baseURL+"nueva-licencia/"+$("#txtRedirect").val():window.location.href=baseURL+"admin")}):401==e.status?n("Credenciales no validas, por favor revisa la información y vuelve a intentar",!0):n(e.message,!0)})}),$("#frmRegister").length&&$("#frmRegister").validate({rules:{email:{required:!0,email:!0},celular:{required:!0,minlength:10,number:!0},password:{required:!0,minlength:8},repassword:{equalTo:"#password"}},messages:{email:{required:"El correo electrónico es requerido para continuar",email:"No es una cuenta de correo valida,"},nombre:"El nombre es requerido para continuar",ape_paterno:"El primer apellido es requerido para continuar",celular:{required:"El número celular es requerido para continuar",minlength:"El numero celular debe contener al menos 10 digitos",number:"El número celular debe contener solo numeros"},password:{required:"La contraseña es requerida para continuar",minlength:"La contraseña debe contener al menos 8 caracteres"},repassword:{required:"Confirma la contraseña para continuar",equalTo:"No coinciden las contraseñas"},agree:"Debes aceptar los terminos y condiciones para continuar"}}),$("#btnRegistro").on("click",function(){$("#frmRegister").valid()&&r($("[name='email']").val(),$("[name='nombre']").val(),$("[name='ape_paterno']").val(),$("[name='ape_materno']").val(),$("[name='celular']").val(),$("[name='password']").val()).done(function(r){200==r.status?e($("[name='email']").val(),md5($("[name='password']").val())).done(function(e){a(e.data).done(function(a){200==a.status?o(1,e.data.idU,"Hola "+$("[name='nombre']").val()+", Bienvenido a Visor urbano").done(function(a){200==a.status?window.location.href=baseURL+"admin":n(e.message,!0)}):n(e.message,!0)})}):n(r.message,!0)})})});