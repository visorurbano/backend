function setPass(e,a,t){var i={};return i.email=t,i.password=md5(a),i.npassword=md5(e),$.ajax({url:userURL+"password",type:"post",dataType:"json",data:i})}function updateProfile(e,a,t,i,n){var r={};return r.email=e,r.nombres=a,r.ape_pat=t,r.ape_mat=i,r.celular=n,$.ajax({url:userURL+"perfil",type:"post",dataType:"json",data:r})}function setProfile(e,a,t,i){var n={};return n.nombres=e,n.ape_pat=a,n.ape_mat=t,n.celular=i,$.ajax({url:baseURL+"sUpdate",type:"post",dataType:"json",data:n})}function validaCC(e){var a={};return a.clave=e,$.ajax({url:baseURL+"validaclavecatastral",type:"get",dataType:"json",data:a})}function validaNCP(e,a,t,i){var n={};return n.original=e,n.compare=a,n.cuenta_catastro=t,n.factibilidad=i,$.ajax({url:baseURL+"validacuentapredial",type:"get",dataType:"json",data:n,beforeSend:function(){setLoading()}})}function getDataPropietario(e){var a={};return a.clave=e,$.ajax({url:baseURL+"datosPropietario",type:"get",dataType:"json",data:a})}function setFolder(e){var a={};return a["auth-key"]="50f14b34Sru81o#10830981",a.id_tramite=e,a.tipo_tramite="g",$.ajax({url:"http://192.168.66.93/api/vu_mkdir.php",type:"post",dataType:"json",data:a})}function setMessage(e,a,t){"error"==e?classT="alert-danger":classT="alert-success",a.empty();var i=$("<div/>");i.addClass("alert "+classT).html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+t).appendTo(a)}function setMessage1(e,a){$(".msessage-cont").remove();var t=$("<div/>",{class:"msessage-cont mui--z2"}).prependTo("section.projects");t.html("<p>"+e+'</p><div class="close"></div>'),$(".msessage-cont .close").on("click",function(e){e.preventDefault(),$(".msessage-cont").remove()}),$(window).scrollTop($(".msessage-cont").offset().top)}function adjustIframeHeight(){var e=$("body"),a=e.data("iframe.fv");a&&a.height(e.height())}function cleanPropietario(){$("#txtNombre").val(""),$("#txtNombre").parent().find("label").removeClass("active"),$("#txtCURP").val(""),$("#txtCURP").parent().find("label").removeClass("active"),$("#txtRFC").val(""),$("#txtRFC").parent().find("label").removeClass("active"),$("#txtDomicilio").val(""),$("#txtDomicilio").parent().find("label").removeClass("active"),$("#txtNExterior").val(""),$("#txtNExterior").parent().find("label").removeClass("active"),$("#txtNInterior").val(""),$("#txtNInterior").parent().find("label").removeClass("active"),$("#txtColonia").val(""),$("#txtColonia").parent().find("label").removeClass("active"),$("#txtCiudad").val(""),$("#txtCiudad").parent().find("label").removeClass("active"),$("#txtCP").val(""),$("#txtCP").parent().find("label").removeClass("active")}function setError(e){$(".actions ul li a[href='#next']").hide(),$("li.current").addClass("error"),$("#errorModal .modal-body ul").empty(),$.each(e,function(e,a){$("#errorModal .modal-body ul").append("<li>"+a+"</li>")}),$("#errorModal").modal()}function unsetError(){$(".actions ul li a[href='#next']").show(),$("li.current").removeClass("error")}function updateForma(e,a,t){var i={};return $.each(e,function(e,a){i[a.name]=a.value}),i.step=a,$.ajax({url:baseURL+"licencia/a/update",type:"post",dataType:"json",data:{licencia:t,campos:i,firma:$("#firma_electronica").text()}})}function updateFiles(e,a,t){var i={};return i[e]=a,$.ajax({url:baseURL+"licencia/a/update",type:"post",dataType:"json",data:{licencia:t,campos:i,firma:$("#firma_electronica").text()}})}function fillPropietario(){getDataPropietario($("#claveCatastral").val()).done(function(e){200==e.status&&(cleanPropietario(),$("#txtNombre").parent().find("label").addClass("active"),$("#txtCURP").val(e.data.curp),$("#txtCURP").parent().find("label").addClass("active"),$("#txtRFC").val(e.data.rfc),$("#txtRFC").parent().find("label").addClass("active"),$("#txtDomicilio").val(e.data.calle),$("#txtDomicilio").parent().find("label").addClass("active"),$("#txtNExterior").val(e.data.n_exterior),$("#txtNExterior").parent().find("label").addClass("active"),$("#txtNInterior").val(e.data.n_interior),$("#txtNInterior").parent().find("label").addClass("active"),$("#txtColonia").val(e.data.colonia),$("#txtColonia").parent().find("label").addClass("active"),$("#txtCiudad").val(e.data.ciudad),$("#txtCiudad").parent().find("label").addClass("active"),$("#txtCP").val(e.data.cp),$("#txtCP").parent().find("label").addClass("active")),$("input:radio[name=st1_tipo_representante]").prop("checked",!1),$("input:radio[name=st1_tipo_carta_poder]").prop("checked",!1),$("#rbtCartaPoderSimple").prop("checked",!0),$("input:radio[name=st1_faculta]").prop("checked",!1),$("input:radio[name=st1_anuencia]").prop("checked",!1)})}function ResumeLicenciaGiro(){switch($("input:radio[name=st1_tipo_solicitante]:checked").val()){case"promotor":$("#seccionPromotor").show(),$("#secRepresentante").show(),$(".cont-identificacion-solicitante").hide();break;case"arrendatario":$("#seccionArrendatario").show(),$("#secRepresentante").hide(),$(".cont-identificacion-solicitante").show();break;default:$("#secRepresentante").hide(),$("#seccionArrendatario").hide(),$("#seccionPromotor").hide(),$(".cont-identificacion-solicitante").show()}"arrendatario"==$("input:radio[name=st1_tipo_representante]:checked").val()?$("#seccionArrendatario").show():$("#seccionArrendatario").hide(),"simple"==$("input:radio[name=st1_tipo_carta_poder]:checked").val()?$(".anexoCartaPoder").show():$(".anexoCartaPoder").hide(),"n"==$("input:radio[name=st1_faculta]:checked").val()?$("#seccionAnuencia").show():($("#seccionAnuencia").hide(),$("#seccionCartaAnuencia").hide()),"n"==$("input:radio[name=st1_anuencia]:checked").val()?(alert("hoña"),errorLicenciaGiro(),$("#seccionCartaAnuencia").hide()):(unsetError(),"s"==$("input:radio[name=st1_anuencia]:checked").val()&&$("#seccionCartaAnuencia").show())}function resumenLicenciaGiro(){$("#resumenIdentificacionSolicitante").remove();var e=$("<div/>",{id:"resumenIdentificacionSolicitante"}).appendTo("#resumen-container");e.append("<h3>Identificación del solicitante</h3><br>");var a=$("<div/>",{addClass:"row"}).appendTo(e);if(a.append('<div class="col-md-4">Tipo Solicitante: <b>'+capitalize($("input:radio[name=st1_tipo_solicitante]:checked").val())+"</b></div>"),"promotor"==$("input:radio[name=st1_tipo_solicitante]:checked").val()){"arrendatario"==$("input:radio[name=st1_tipo_representante]:checked").val()?des="Persona física/moral que está rentando el predio":des="Persona física/moral que es dueña del predio",a.append('<div class="col-md-8">Tipo Representante: <b>'+des+"</b></div>"),e.append("<br>");var t=$("<div/>",{addClass:"row"}).appendTo(e);if(t.append('<div class="col-md-4">Tipo Carta Poder: <b>'+capitalize($("input:radio[name=st1_tipo_carta_poder]:checked").val())+"</b></div>"),t.append('<div class="col-md-8">Carta Poder: <b><a href="http://192.168.66.93/licencia_giro/demo/carta_poder.pdf" target="_blank"><i class="fa fa-file-text" aria-hidden="true"></i> carta_poder.pdf</a></b></div>'),"simple"==$("input:radio[name=st1_tipo_carta_poder]:checked").val()){e.append("<br>");var i=$("<div/>",{addClass:"row"}).appendTo(e);i.append('<div class="col-md-4">Identificación del Otorgante: <b><a href="http://192.168.66.93/licencia_giro/demo/Identificacion.pdf" target="_blank"><i class="fa fa-user" aria-hidden="true"></i> identificaciion.pdf</a></b></div>'),i.append('<div class="col-md-4">Identificación Testigo 1: <b><a href="http://192.168.66.93/licencia_giro/demo/Identificacion.pdf" target="_blank"><i class="fa fa-user" aria-hidden="true"></i> identificaciion.pdf</a></b></div>'),i.append('<div class="col-md-4">Identificación Testigo 2: <b><a href="http://192.168.66.93/licencia_giro/demo/Identificacion.pdf" target="_blank"><i class="fa fa-user" aria-hidden="true"></i> identificaciion.pdf</a></b></div>')}}if("arrendatario"==$("input:radio[name=st1_tipo_solicitante]:checked").val()||"arrendatario"==$("input:radio[name=st1_tipo_representante]:checked").val()){e.append("<br>");var n=$("<div/>",{addClass:"row"}).appendTo(e);n.append('<div class="col-md-5">Contrato de Arrendamiento: <b><a href="http://192.168.66.93/licencia_giro/demo/contrato_arrendamiento.pdf" target="_blank"><i class="fa fa-file-text" aria-hidden="true"></i> contrato_arrendamiento.pdf</a></b></div>');var r="s"!=$("input:radio[name=st1_faculta]:checked").val()?"No":"Si";if(n.append('<div class="col-md-7">¿El contrato de arrendamiento te faculta para abrir un negocio? <b>'+r+"</b></div>"),"n"==$("input:radio[name=st1_faculta]:checked").val()){e.append("<br>");var o=$("<div/>",{addClass:"row"}).appendTo(e),s="s"!=$("input:radio[name=st1_anuencia]:checked").val()?"No":"Si";o.append('<div class="col-md-6">¿Cuentas con la anuencia del arrendador para abrir un negocio? <b>'+s+"</b></div>"),o.append('<div class="col-md-6">Carta de Anuencia: <b><a href="http://192.168.66.93/licencia_giro/demo/carta_anuencia.pdf" target="_blank"><i class="fa fa-file-text" aria-hidden="true"></i> carta_anuencia.pdf</a></b></div>')}}if(e.append("<br><hr><br>"),"promotor"==$("input:radio[name=st1_tipo_solicitante]:checked").val()){e.append("<h3>Datos del representante:</h3><br>");var d=$("<div/>",{addClass:"row"}).appendTo(e);d.append('<div class="col-md-12">Nombre del Representante: <b>'+$("input:text[name=st2_nombre_representante]").val()+"</b></div>"),d.append("<br><br>"),d.append('<div class="col-md-4">C.U.R.P.: <b>'+$("input:text[name=st2_curp_representante]").val()+"</b></div>"),d.append('<div class="col-md-4">R.F.C.: <b>'+$("input:text[name=st2_rfc_representante]").val()+"</b></div>"),d.append('<div class="col-md-4">Correo electrónico: <b>'+$("input[name=st2_email_representante]").val()+"</b></div>"),d.append("<br><br>"),d.append('<div class="col-md-8">Domicilio: <b>'+$("input:text[name=st2_domicilio_representante]").val()+"</b></div>"),d.append('<div class="col-md-2">Num. Exterior: <b>'+$("input:text[name=st2_num_ext_representante]").val()+"</b></div>"),d.append('<div class="col-md-2">Num. Interior: <b>'+$("input[name=st2_num_int_representante]").val()+"</b></div>"),d.append("<br><br>"),d.append('<div class="col-md-4">Colonia: <b>'+$("input:text[name=st2_colonia_representante]").val()+"</b></div>"),d.append('<div class="col-md-4">Ciudad: <b>'+$("input:text[name=st2_ciudad_representante]").val()+"</b></div>"),d.append('<div class="col-md-2">C.P.: <b>'+$("input[name=st2_cp_representante]").val()+"</b></div>"),d.append('<div class="col-md-2">Teléfono: <b>'+$("input[name=st2_telefono_representante]").val()+"</b></div>"),d.append("<br><br>"),d.append('<div class="col-md-12">Identificación del Representante: <b><a href="http://192.168.66.93/licencia_giro/demo/Identificacion.pdf" target="_blank"><i class="fa fa-user" aria-hidden="true"></i> identificaciion.pdf</a></b></div>'),e.append("<br><hr><br>")}e.append("<h3>Datos del solicitante:</h3><br>");var c=$("<div/>",{addClass:"row"}).appendTo(e);c.append('<div class="col-md-12">Nombre del Representante: <b>'+$("input:text[name=st2_nombre_solicitante]").val()+"</b></div>"),c.append("<br><br>"),c.append('<div class="col-md-4">C.U.R.P.: <b>'+$("input:text[name=st2_curp_solicitante]").val()+"</b></div>"),c.append('<div class="col-md-4">R.F.C.: <b>'+$("input:text[name=st2_rfc_solicitante]").val()+"</b></div>"),c.append('<div class="col-md-4">Correo electrónico: <b>'+$("input[name=st2_email_solicitante]").val()+"</b></div>"),c.append("<br><br>"),c.append('<div class="col-md-8">Domicilio: <b>'+$("input:text[name=st2_domicilio_solicitante]").val()+"</b></div>"),c.append('<div class="col-md-2">Num. Exterior: <b>'+$("input:text[name=st2_num_ext_solicitante]").val()+"</b></div>"),c.append('<div class="col-md-2">Num. Interior: <b>'+$("input[name=st2_num_int_solicitante]").val()+"</b></div>"),c.append("<br><br>"),c.append('<div class="col-md-4">Colonia: <b>'+$("input:text[name=st2_colonia_solicitante]").val()+"</b></div>"),c.append('<div class="col-md-4">Ciudad: <b>'+$("input:text[name=st2_ciudad_solicitante]").val()+"</b></div>"),c.append('<div class="col-md-2">C.P.: <b>'+$("input[name=st2_cp_solicitante]").val()+"</b></div>"),c.append('<div class="col-md-2">Teléfono: <b>'+$("input[name=st2_telefono_solicitante]").val()+"</b></div>"),e.append("<br><hr><br>"),e.append("<h3>Datos del predio:</h3><br>");var l=$("<div/>",{addClass:"row"}).appendTo(e);l.append('<div class="col-md-3">Clave Catastral: <b>'+$("#claveCatastral").val()+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-12">Actividad espesifica: <b>'+$("input:text[name=descripcion_factibilidad]").val()+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-12">Nombre del negocio: <b>'+$("input:text[name=st3_nombre_establecimiento]").val()+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-8">Domicilio: <b>'+$("input:text[name=st3_domicilio_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-2">Num. Exterior: <b>'+$("input:text[name=st3_num_ext_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-2">Letra Exterior: <b>'+$("input:text[name=st3_letra_ext_establecimiento]").val()+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-8">Colonia: <b>'+$("input:text[name=st3_colonia_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-2">Num. Interior: <b>'+$("input:text[name=st3_num_int_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-2">Letra Interior: <b>'+$("input:text[name=st3_letra_int_establecimiento]").val()+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-12">Especificaciones: <b>'+$("input:text[name=st3_especificaciones_establecimiento]").val()+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-3">Tipo de Edificacion: <b>'+$("input:text[name=st3_edificio_plaza_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-3">Num. Local: <b>#'+$("input:text[name=st3_num_local_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-3">Superficie Construida: <b>'+$("input:text[name=st3_sup_construida_establecimiento]").val()+"mts.</b></div>"),l.append('<div class="col-md-3">Area a utilizar: <b>'+$("input:text[name=st3_area_utilizar_establecimiento]").val()+"mts.</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-4">Inversión estimada: <b>$'+$("input:text[name=st3_inversion_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-4">Cajones Estacionamiento: <b>'+$("input:text[name=st3_cajones_estacionamiento_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-4">Num. Empleados: <b>'+$("input:text[name=st3_empleados_establecimiento]").val()+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-4">Fotografia Fachada: <b><a href="http://192.168.66.93/licencia_giro/demo/imagen1.jpg" data-lightbox="imagen establecimiento 1"> <i class="fa fa-picture-o" aria-hidden="true"></i> fotografia.jpg</a></b></div>'),l.append('<div class="col-md-4">Fotografia puerta abierta: <b><a href="http://192.168.66.93/licencia_giro/demo/imagen2.jpg" data-lightbox="imagen establecimiento 2"> <i class="fa fa-picture-o" aria-hidden="true"></i> fotografia1.jpg</a></b></div>'),l.append('<div class="col-md-4">Fotografia interior: <b><a href="http://192.168.66.93/licencia_giro/demo/imagen3.jpg" data-lightbox="imagen establecimiento 3"> <i class="fa fa-picture-o" aria-hidden="true"></i> fotografia2.jpg</a></b></div>'),e.append("<br><hr><br><br>"),$(".cadenaFirmar").empty();var p="promotor"==$("input:radio[name=st1_tipo_solicitante]:checked").val()?$("input:text[name=st2_nombre_representante]").val():$("input:text[name=st2_nombre_solicitante]").val(),u="promotor"==$("input:radio[name=st1_tipo_solicitante]:checked").val()?$("input:text[name=st2_priper_apellido_representante]").val():$("input:text[name=st2_primer_apellido_solicitante]").val(),m="promotor"==$("input:radio[name=st1_tipo_solicitante]:checked").val()?$("input:text[name=st2_segundo_apellido_representante]").val():$("input:text[name=st2_segundo_apellido_solicitante]").val(),v=new Date;$(".cadenaFirmar").html("Nombre|=|"+p+"|+|Primer Apellido|=|"+u+"|+|Segundo Apellido|=|"+u+"|+|Tramite|=|"+$("#tramite").val()+"|+|Actividad|=|"+$("#descActividad").text()+"|+|Fecha|=|"+v.getDate()+"/"+(v.getMonth()+1)+"/"+v.getFullYear())}function capitalize(e){return e[0].toUpperCase()+e.slice(1)}function loadFile(element){el=$("#"+element.id);var file=document.getElementById(element.id).files[0],data=new FormData;data.append("auth","50f14b34Sru81o#10830981"),data.append("folio",$("#tramite").val()),data.append("documento",file),data.append("name",el.data("type"));var contObj=el.parent();1==el.valid()&&$.ajax({type:"POST",url:"http://192.168.66.93/api/vu_up.php",contentType:!1,data:data,processData:!1,beforeSend:function(){$("#"+el.data("elastic")).css("margin","15px 0px");var e=new ProgressBar.Line("#"+el.data("elastic"),{color:"#8CBC5F",easing:"easeInOut"});e.animate(1,{duration:900},function(){e.destroy(),$("#"+el.data("elastic")).css("margin","0px")})},success:function(data){var serialized=eval("("+data+")");contObj.find(".link-to-file").remove(),contObj.append('<a href="'+serialized.url+'" target="_blank" class="link-to-file"><i class="fa fa-file-text-o" aria-hidden="true"></i> '+el.data("text")+"</a>"),updateFiles(el.data("type"),serialized.url,$("#tramite").val()).done(function(e){})},error:function(){}})}function firmar(e){if(""!=data_cer)if(""!=$("#txtPassFIEL").val()){el=$("#"+e.id);var a=document.getElementById(e.id).files[0],t=new FormData;t.append("folio",$("#tramite").val()),t.append("pass",$("#txtPassFIEL").val()),t.append("cadena_original",$(".cadenaFirmar").text()),t.append("tipo","key"),t.append("uploaded_file",a),1==el.valid()&&$.ajax({type:"POST",url:baseURL+"licenciasGiro/subir_archivos",contentType:!1,data:t,processData:!1,success:function(e){if(e.indexOf("status")==-1){var a=e.length;e=e.substr(0,a-3),$("#firma_electronica").text(e),unsetError()}else{e=JSON.parse(e),$("#uploaded_file").val("");var t=[];t[0]=e.data,setError(t)}},error:function(){}})}else{$("#uploaded_file").val("");var i=[];i[0]="Falta colocar contraseña para poder firmar",setError(i)}else{$("#uploaded_file").val("");var i=[];i[0]="Falta subir archivo .cer para poder firmar",setError(i)}}function get_certificado(e){el=$("#"+e.id);var a=document.getElementById(e.id).files[0],t=new FormData;t.append("folio",$("#tramite").val()),t.append("pass",$("#txtPassFIEL").val()),t.append("cadena_original",$(".cadenaFirmar").text()),t.append("tipo","cer"),t.append("uploaded_file1",a),1==el.valid()&&$.ajax({type:"POST",url:baseURL+"licenciasGiro/subir_archivos",contentType:!1,data:t,processData:!1,success:function(e){if(e=JSON.parse(e),e.status)data_cer=e.data,unsetError();else{$("#uploaded_file1").val("");var a=[];a[0]=e.data,setError(a)}},error:function(){}})}function validar_cer(){switch($("input[name=st1_tipo_solicitante]:checked").val()){case"propietario":if(data_cer[0]!=$("input:text[name=st2_nombre_solicitante]").val().toUpperCase()||data_cer[3]!=$("input:text[name=st2_rfc_solicitante]").val().toUpperCase()){var e=[];return e[0]="Datos del archivo .cer no son iguales a los proporcionados anteriormente",setError(e),!1}return!0;break;case"promotor":if(data_cer[0]!=$("input:text[name=st2_nombre_representante]").val().toUpperCase()||data_cer[3]!=$("input:text[name=st2_rfc_representante]").val().toUpperCase()){var e=[];return e[0]="Datos del archivo .cer no son iguales a los proporcionados anteriormente",setError(e),!1}return!0;break;default:if(data_cer[0]!=$("input:text[name=st2_nombre_solicitante]").val().toUpperCase()||data_cer[3]!=$("input:text[name=st2_rfc_solicitante]").val().toUpperCase()){var e=[];return e[0]="Datos del archivo .cer no son iguales a los proporcionados anteriormente",setError(e),!1}return!0}}function validateFirma(){if($("#frmFirmar").valid()){var cer=document.getElementById("fleCER").files[0],key=document.getElementById("fleKEY").files[0],data=new FormData;data.append("id_tramite",$("#txtFirmaTramite").val()),data.append("cadena_original",$(".cadenaFirmar").text()),data.append("pass",$("#txtPassFIEL").val()),data.append("cer",cer),data.append("key",key),$.ajax({type:"POST",url:"http://192.168.66.93/api/vu_firma.php",contentType:!1,data:data,processData:!1,beforeSend:function(){},success:function(data){$("#txtPassFIEL").val(""),$("#txtPassFIEL").removeClass("mui--is-dirty mui--is-not-empty valid mui--is-touched"),$("#fleKEY").val(""),$("#fleCER").val(""),$("#firmaModal").modal("hide");var sdata=eval("("+data+")");200!=sdata.status?($("#firma_electronica").empty(),$("#contMSGFirmaError").empty().append('<div class="alert alert-danger"><strong>Error: </strong>'+sdata.message+"</div>")):($("#contMSGFirmaError").empty(),$("#firma_electronica").empty().text(sdata.firma))},error:function(){}})}}var userURL="http://licenciasprueba.guadalajara.gob.mx/gdlusuarios/auth/",baseURL="http://localhost/backend/",stepsForm=null,currentStep=$("#step").val();$(document).ready(function(){"use strict";if($(".dropdown").on("show.bs.dropdown",function(){$(this).find(".dropdown-menu").first().stop(!0,!0).fadeIn()}),$(".dropdown").on("hide.bs.dropdown",function(){$(this).find(".dropdown-menu").first().stop(!0,!0).fadeOut()}),$("#frmContrasena").length&&$("#frmContrasena").validate({rules:{nuevoPass:{required:!0,minlength:8},confirmaNuevoPass:{required:!0,equalTo:"#txtNuevoPass"}},messages:{passActual:"La contraseña actual es requerida para continuar",nuevoPass:{required:"La nueva contraseña es requerida para continuar",minlength:"La contraseña debe contener al menos 8 caracteres"},confirmaNuevoPass:{required:"Confirma la nueva contraseña para continuar",equalTo:"No coinciden las contraseñas"}}}),$("#btnCambiarPass").on("click",function(e){e.preventDefault(),$("#frmContrasena").valid()&&setPass($("#txtNuevoPass").val(),$("#txtPassActual").val(),$("#txtEmailPass").val()).done(function(e){200==e.status?setMessage("exito",$(".message"),"<b>Bien echo:</b> la contraseña se actualizó correctamente."):setMessage1("<b>Error:</b> la contraseña actual no es correcta.",!0)})}),$("#frmPerfilUsuario").length&&$("#frmPerfilUsuario").validate({rules:{email:{required:!0,email:!0}},messages:{nombre:"El nombre es requerido para continuar",ape_pat:"El primer apellido es requerido para continuar",ape_mat:"El segundo apellido es requerido para continuar",email:{required:"El correo eletrónico es requerido para continuar",email:"La cuenta no es valida"}}}),$("#btnActualizarPerfil").on("click",function(e){e.preventDefault(),$("#frmPerfilUsuario").valid()&&updateProfile($("#txtEmail").val(),$("#txtNombre").val(),$("#txtApepat").val(),$("#txtApemat").val(),$("#txtCelular").val()).done(function(e){200==e.status?($("#contUserName").text($("#txtNombre").val()),setProfile($("#txtNombre").val(),$("#txtApepat").val(),$("#txtApemat").val(),$("#txtCelular").val()).done(function(e){setMessage("exito",$(".messagePerfil"),"<b>Bien echo:</b> Tus datos han sido actualizado correctamente")})):setMessage1("<b>Error:</b> Ocurrio un erro inesperado al momento de actualizar tus datos por favor intenta de nuevo mas tarde.",!0)})}),$("#frmIniciarTramiteLicencia").length&&$("#frmIniciarTramiteLicencia").validate({messages:{claveCatastral:"La Clave Catastral es requerida para continuar"}}),$("#btnInciarTramiteLicencia").on("click",function(e){e.preventDefault(),$("#frmIniciarTramiteLicencia").valid()&&window.location.replace("http://visorurbano.guadalajara.gob.mx/mapa/?criterio="+$("#txtClaveCatastral").val())}),$("#frmLicenciaGiroConfirmar").length&&$("#frmLicenciaGiroConfirmar").validate({messages:{numeroPredial:"El número de cuenta predial es requerido para continuar",folioFactibilidad:"El folio del trámite de factibilidad es requerido para continuar",agreeAvisoPrivacidad:"Debes aceptar el aviso de privaciad para continuar"}}),$("#btnConfirmarLicencias").on("click",function(){$("#frmLicenciaGiroConfirmar").valid()&&validaNCP($("#txtCuentaPredial").val(),$("#txtCPE").val(),$("#txtCC").val(),$("#txtFFactibilidad").val()).done(function(e){200==e.status?(window.location.href=baseURL+"nueva-licencia/"+e.data.sec+"/"+e.data.sec2,setFolder(e.data.id).done(function(e){200==e.status?unsetLoading():unsetLoading()})):(unsetLoading(),setMessage1(e.message,!0))})}),$.validator.addMethod("extension",function(e,a,t){return t="string"==typeof t?t.replace(/,/g,"|"):"png|jpe?g|gif",this.optional(a)||e.match(new RegExp("\\.("+t+")$","i"))},$.validator.format('Este documento debe ser en formato ".pdf"')),$("#frmFirmar").length&&$("#frmFirmar").validate({rules:{firmaCER:{required:!0,extension:"cer"},firmaKEY:{required:!0,extension:"key"},firmaPass:{required:!0}},messages:{firmaCER:{required:"Ingresa el archivo .cer para continuar",extension:"Formato incorrecto, se espera un archivo con formato .cer"},firmaKEY:{required:"Ingresa el archivo .key para continuar",extension:"Formato incorrecto, se espera un archivo con formato .key"},firmaPass:{required:"Ingresa la contraseña de la firma electrónica para continuar"}}}),$("#frmSolicitudLicenciaGiro").length){var e=$("#frmSolicitudLicenciaGiro");e.validate({rules:{st1_carta_poder:{required:!0,extension:"pdf"},fleIdentificacionOtorgante:{required:!0,extension:"pdf"},fleTestigo1:{required:!0,extension:"pdf"},fleTestigo2:{required:!0,extension:"pdf"},fleContratoArrendamiento:{required:!0,extension:"pdf"},fleAnuencia:{required:!0,extension:"pdf"},st2_email_representante:{required:!0,email:!0},st2_num_ext_representante:{required:!0,number:!0},st2_num_int_representante:{number:!0},st2_cp_representante:{required:!0,number:!0},st2_telefono_representante:{required:!0,number:!0},st2_email_solicitante:{required:!0,email:!0},st2_num_ext_solicitante:{required:!0,number:!0},st2_num_int_solicitante:{number:!0},st2_cp_solicitante:{required:!0,number:!0},st2_telefono_solicitante:{required:!0,number:!0},st2_identificacion_representante:{required:!0,extension:"pdf"},st2_identidficacion_solicitante:{required:!0,extension:"pdf"},st3_num_ext_establecimiento:{required:!0,number:!0},st3_num_int_establecimiento:{number:!0},st3_cp_establecimiento:{required:!0,number:!0},st3_num_local_establecimiento:{required:!0,number:!0},st3_empleados_establecimiento:{required:!0,number:!0},st3_cajones_estacionamiento_establecimiento:{required:!0,number:!0},st3_sup_construida_establecimiento:{required:!0,number:!0},st3_area_utilizar_establecimiento:{required:!0,number:!0},st3_inversion_establecimiento:{required:!0,number:!0},st3_img1_establecimiento:{required:!0},st3_img2_establecimiento:{required:!0},st3_img3_establecimiento:{required:!0}},messages:{st1_tipo_solicitante:{required:"Elige un tipo de solicitante para continuar"},st1_tipo_representante:{required:"Elige un tipo de representante para continuar"},st1_carta_poder:{required:"Adjunta la carta poder para continuar"},fleIdentificacionOtorgante:{required:"Adjunta la identificación del otorgante para continuar"},fleTestigo1:{required:"Adjunta la identificación del Testtigo #1 para continuar"},fleTestigo2:{required:"Adjunta la identificación del Testtigo #2 para continuar"},fleContratoArrendamiento:{required:"Adjunta el contrato de arrendamiento para continuar"},st1_faculta:{required:"Confirma si el contrato de arrendamiento te faculta para abrir un negocio"},st1_anuencia:{required:"Confirma si cuentas con la anuencia del propietario para abrir un negocio"},fleAnuencia:{required:"Adjunta la anuencia firmada por el propietario o representante  para continuar"},st2_email_representante:{email:"La cuenta de correo proporcionada no es valdia"},st2_num_ext_representante:{number:"Debe ser una valor numérico"},st2_num_int_representante:{number:"Debe ser una valor numérico"},st2_cp_representante:{number:"Debe ser una valor numérico"},st2_telefono_representante:{number:"Debe ser una valor numérico"},st2_email_solicitante:{email:"La cuenta de correo proporcionada no es valdia"},st2_num_ext_solicitante:{number:"Debe ser una valor numérico"},st2_num_int_solicitante:{number:"Debe ser una valor numérico"},st2_cp_solicitante:{number:"Debe ser una valor numérico"},st2_telefono_solicitante:{number:"Debe ser una valor numérico"},st2_identificacion_representante:{required:"Adjunta la Identificación del representante continuar"},st2_identidficacion_solicitante:{required:"Adjunta la Identificación del solicitante continuar"},st3_num_ext_establecimiento:{number:"Debe ser una valor numérico"},st3_num_int_establecimiento:{number:"Debe ser una valor numérico"},st3_cp_establecimiento:{number:"Debe ser una valor numérico"},st3_num_local_establecimiento:{number:"Debe ser una valor numérico"},st3_empleados_establecimiento:{number:"Debe ser una valor numérico"},st3_cajones_estacionamiento_establecimiento:{number:"Debe ser una valor numérico"},st3_sup_construida_establecimiento:{number:"Debe ser una valor numérico"},st3_area_utilizar_establecimiento:{number:"Debe ser una valor numérico"},st3_inversion_establecimiento:{number:"Debe ser una valor numérico"},st3_img1_establecimiento:{required:"Adjunta la fotografía panorámica de la fachada para continuar"},st3_img3_establecimiento:{required:"Adjunta la fotografía del Interior del establecimiento para continuar"},st3_img2_establecimiento:{required:"Adjunta la fotografía panorámica de la fachada con la puerta o cortina abierta para continuar"},st4_declaratoria:{required:"La confirmación de que la información es correcta es requerida para continuar"}}}),stepsForm=e.children("div").steps({headerTag:"h3",bodyTag:"section",transitionEffect:"slideLeft",startIndex:parseInt(currentStep),onStepChanging:function(a,t,i){if(3!=t){if(e.validate().settings.ignore=":disabled,:hidden,.valid",e.valid()){var n=e.find(":input:not(:hidden)").serializeArray();updateForma(n,i,$("#tramite").val())}return 3==i&&resumenLicenciaGiro(),e.valid()}return e.valid()},onInit:function(e,a){ResumeLicenciaGiro(),3==a&&resumenLicenciaGiro(),$("#frmSolicitudLicenciaGiro .actions li a").addClass("mui-btn mui-btn--primary")},onFinished:function(e,a){var t={name:"status",value:"FP"};updateForma(new Array(t),a,$("#tramite").val()).done(function(e){window.location.href=baseURL+"admin"})},labels:{cancel:"Cancelar",current:"paso actual:",pagination:"Paginación",finish:"Finalizar",next:'Siguiente  <i class="fa fa-chevron-right" aria-hidden="true"></i>',previous:'<i class="fa fa-chevron-left" aria-hidden="true"></i>  Anterior',loading:"Cargando ..."}})}$("input:radio[name=st1_tipo_solicitante]").each(function(e,a){$(this).on("click",function(){var e=$(this).val();switch($("#seccionPromotor, #seccionArrendatario").hide(),e){case"propietario":$("#secRepresentante").hide(),unsetError(),fillPropietario(),$(".cont-identificacion-solicitante").show();break;case"promotor":unsetError(),fillPropietario(),$("#seccionPromotor").show(),$("#secRepresentante").show(),$(".cont-identificacion-solicitante").hide(),$("input:radio[name=st1_faculta]").prop("checked",!1),$("input:radio[name=st1_anuencia]").prop("checked",!1);break;case"arrendatario":cleanPropietario(),$("#seccionArrendatario").show(),$("#secRepresentante").hide(),$(".cont-identificacion-solicitante").show(),$("input:radio[name=st1_tipo_representante]").prop("checked",!1),$("input:radio[name=st1_tipo_carta_poder]").prop("checked",!1),$("#rbtCartaPoderSimple").prop("checked",!0);break;default:cleanPropietario(),$("#seccionPromotor, #seccionArrendatario").hide()}})}),$("input:radio[name=st1_tipo_representante]").each(function(e,a){$(this).on("click",function(){var e=$(this).val();"arrendatario"==e?$("#seccionArrendatario").show():(unsetError(),$("#seccionArrendatario").hide())})}),$("input:radio[name=st1_tipo_carta_poder]").each(function(e,a){$(this).on("click",function(){var e=$(this).val();"simple"==e?$(".anexoCartaPoder").show():$(".anexoCartaPoder").hide()})}),$("input:radio[name=st1_faculta]").each(function(e,a){$(this).on("click",function(){var e=$(this).val();"n"==e?$("#seccionAnuencia").show():($("#seccionAnuencia").hide(),$("#seccionCartaAnuencia").hide())})}),$("input:radio[name=st1_anuencia]").each(function(e,a){$(this).on("click",function(){
var e=$(this).val();"s"==e?(unsetError(),$("#seccionCartaAnuencia").show()):(errorLicenciaGiro(1),$("#seccionCartaAnuencia").hide())})}),$("#btnPagoLinea").on("click",function(e){e.preventDefault();var a={name:"status",value:"FL"};updateForma(new Array(a),4,$("#tramite").val()).done(function(e){window.location.href=baseURL+"admin/mis-licencias"})}),$("#btnFirmar").on("click",function(e){e.preventDefault(),validateFirma()})});var data_cer=[];