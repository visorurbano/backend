function pago_linea(){$("#enviar_form").trigger("click")}function fill_pago(){$.ajax({url:baseURL+"confirmacion_licencia/pago_linea",type:"post",dataType:"json",data:{licencia:$("#tramite").val()},success:function(a){$("#scian_form").val(a.data.scian),$("#zona_form").val(a.data.zona),$("#sub_zona_form").val(a.data.subzona),$("#actividad_form").val(a.data.actividad),$("#cvecuenta_form").val(a.data.cvecuenta),$("#propietario_form").val(a.data.propietario),$("#primer_ap_form").val(a.data.primer_ap),$("#segundo_ap_form").val(a.data.segundo_ap),$("#rfc_form").val(a.data.rfc),$("#curp_form").val(a.data.curp),$("#telefono_prop_form").val(a.data.telefono_prop),$("#email_form").val(a.data.email),$("#calle_form").val(a.data.calle),$("#num_ext_form").val(a.data.num_ext),$("#let_ext_form").val(a.data.let_ext),$("#num_int_form").val(a.data.num_int),$("#let_int_form").val(a.data.let_int),$("#colonia_form").val(a.data.colonia),$("#cp_form").val(a.data.cp),$("#sup_autorizada_form").val(a.data.sup_autorizada),$("#num_cajones_form").val(a.data.num_cajones),$("#num_empleados_form").val(a.data.num_empleados),$("#inversion_form").val(a.data.inversion),$("#licencia_form").val(a.data.licencia),$("#importe_form").val(a.data.importe),$("#id_usuario_form").val(a.data.id_usuario)}})}function campos_extra(a){if("S"==a)$("#adjunto_lineamiento").show(),unsetError();else{$("#adjunto_lineamiento").hide();var e=[];e[0]="Acuda a dar de baja estas licencias a ventanilla",setError(),errorLicenciaGiro(1,e)}}function setPass(a,e,i){var t={};return t.email=i,t.password=md5(e),t.npassword=md5(a),$.ajax({url:userURL+"password",type:"post",dataType:"json",data:t})}function updateProfile(a,e,i,t,n){var r={};return r.email=a,r.nombres=e,r.ape_pat=i,r.ape_mat=t,r.celular=n,$.ajax({url:userURL+"perfil",type:"post",dataType:"json",data:r})}function setProfile(a,e,i,t){var n={};return n.nombres=a,n.ape_pat=e,n.ape_mat=i,n.celular=t,$.ajax({url:baseURL+"sUpdate",type:"post",dataType:"json",data:n})}function validaCC(a){var e={};return e.clave=a,$.ajax({url:baseURL+"validaclavecatastral",type:"get",dataType:"json",data:e})}function validaNCP(a,e,i,t){var n={};return n.original=a,n.compare=e,n.cuenta_catastro=i,n.factibilidad=t,$.ajax({url:baseURL+"validacuentapredial",type:"get",dataType:"json",data:n,beforeSend:function(){setLoading()}})}function getDataPropietario(a){var e={};return e.clave=a,$.ajax({url:baseURL+"datosPropietario",type:"get",dataType:"json",data:e})}function setFolder(a){var e={};return e["auth-key"]="50f14b34Sru81o#10830981",e.id_tramite=a,e.tipo_tramite="g",$.ajax({url:"http://192.168.66.93/api/vu_mkdir.php",type:"post",dataType:"json",data:e})}function setMessage(a,e,i){classT="error"==a?"alert-danger":"alert-success",e.empty();$("<div/>").addClass("alert "+classT).html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+i).appendTo(e)}function setMessage1(a,e){$(".msessage-cont").remove();$("<div/>",{class:"msessage-cont mui--z2"}).prependTo("section.projects").html("<p>"+a+'</p><div class="close"></div>'),$(".msessage-cont .close").on("click",function(a){a.preventDefault(),$(".msessage-cont").remove()}),$(window).scrollTop($(".msessage-cont").offset().top)}function adjustIframeHeight(){var a=$("body"),e=a.data("iframe.fv");e&&e.height(a.height())}function cleanPropietario(){$("#txtNombre").val(""),$("#txtNombre").parent().find("label").removeClass("active"),$("#txtCURP").val(""),$("#txtCURP").parent().find("label").removeClass("active"),$("#txtRFC").val(""),$("#txtRFC").parent().find("label").removeClass("active"),$("#txtDomicilio").val(""),$("#txtDomicilio").parent().find("label").removeClass("active"),$("#txtNExterior").val(""),$("#txtNExterior").parent().find("label").removeClass("active"),$("#txtNInterior").val(""),$("#txtNInterior").parent().find("label").removeClass("active"),$("#txtColonia").val(""),$("#txtColonia").parent().find("label").removeClass("active"),$("#txtCiudad").val(""),$("#txtCiudad").parent().find("label").removeClass("active"),$("#txtCP").val(""),$("#txtCP").parent().find("label").removeClass("active")}function setError(a){$(".actions ul li a[href='#next']").hide(),$("li.current").addClass("error"),$("#errorModal .modal-body ul").empty(),$.each(a,function(a,e){$("#errorModal .modal-body ul").append("<li>"+e+"</li>")}),$("#errorModal").modal()}function unsetError(){$(".actions ul li a[href='#next']").show(),$("li.current").removeClass("error")}function updateForma(a,e,i){var t={};return $.each(a,function(a,e){t[e.name]=e.value}),t.step=e,$.ajax({url:baseURL+"licencia/a/update",type:"post",dataType:"json",data:{licencia:i,campos:t,firma:$("#firma_electronica").text()}})}function consulLicP(a){return $.ajax({url:baseURL+"LicenciasGiro/redir_validacion",type:"post",dataType:"json",data:{licencia:a}})}function updateFiles(a,e,i){var t={};return t[a]=e,$.ajax({url:baseURL+"licencia/a/update",type:"post",dataType:"json",data:{licencia:i,campos:t,firma:$("#firma_electronica").text()}})}function fillPropietario(){getDataPropietario($("#claveCatastral").val()).done(function(a){200==a.status&&(cleanPropietario(),(arregloPropietario=a.data).n_exterior=""!=arregloPropietario.n_exterior?parseInt(arregloPropietario.n_exterior):"",arregloPropietario.n_interior=""!=arregloPropietario.n_interior?parseInt(arregloPropietario.n_interior):"",$("#txtNombre").parent().find("label").addClass("active"),$("#txtPApellidoSolicitante").parent().find("label").addClass("active"),$("#txtSApellidoSolicitante").parent().find("label").addClass("active"),$("#txtCURP").parent().find("label").addClass("active"),$("#txtRFC").parent().find("label").addClass("active"),$("#txtDomicilio").parent().find("label").addClass("active"),$("#txtNExterior").parent().find("label").addClass("active"),$("#txtNInterior").parent().find("label").addClass("active"),$("#txtColonia").parent().find("label").addClass("active"),$("#txtCiudad").parent().find("label").addClass("active"),$("#txtCP").parent().find("label").addClass("active"),$("#txtNombre").val(capitalize(a.data.nombre.toLowerCase())),$("#txtPApellidoSolicitante").val(capitalize(a.data.ape_paterno.toLowerCase())),$("#txtSApellidoSolicitante").val(capitalize(a.data.ape_materno.toLowerCase())),$("#txtCURP").val(a.data.curp),$("#txtRFC").val(a.data.rfc),$("#txtDomicilio").val(capitalize(a.data.calle.toLowerCase())),$("#txtNExterior").val(a.data.n_exterior),$("#txtNInterior").val(a.data.n_interior),$("#txtColonia").val(capitalize(a.data.colonia.toLowerCase())),$("#txtCiudad").val(capitalize(a.data.ciudad.toLowerCase())),$("#txtCP").val(a.data.cp)),$("input:radio[name=st1_tipo_representante]").prop("checked",!1),$("input:radio[name=st1_tipo_carta_poder]").prop("checked",!1),$("#rbtCartaPoderSimple").prop("checked",!0),$("input:radio[name=st1_faculta]").prop("checked",!1),$("input:radio[name=st1_anuencia]").prop("checked",!1)})}function ResumeLicenciaGiro(){switch($("input:radio[name=st1_tipo_solicitante]:checked").val()){case"promotor":$("#seccionPromotor").show(),$("#secRepresentante").show(),$(".cont-identificacion-solicitante").hide();break;case"arrendatario":$("#seccionArrendatario").show(),$("#secRepresentante").hide(),$(".cont-identificacion-solicitante").show();break;default:$("#secRepresentante").hide(),$("#seccionArrendatario").hide(),$("#seccionPromotor").hide(),$(".cont-identificacion-solicitante").show()}"arrendatario"==$("input:radio[name=st1_tipo_representante]:checked").val()?$("#seccionArrendatario").show():$("#seccionArrendatario").hide(),"simple"==$("input:radio[name=st1_tipo_carta_poder]:checked").val()?$(".anexoCartaPoder").show():$(".anexoCartaPoder").hide(),"n"==$("input:radio[name=st1_faculta]:checked").val()?$("#seccionAnuencia").show():($("#seccionAnuencia").hide(),$("#seccionCartaAnuencia").hide()),"n"==$("input:radio[name=st1_anuencia]:checked").val()?(alert("hoña"),errorLicenciaGiro(),$("#seccionCartaAnuencia").hide()):(unsetError(),"s"==$("input:radio[name=st1_anuencia]:checked").val()&&$("#seccionCartaAnuencia").show())}function resumenLicenciaGiro(){$("#resumenIdentificacionSolicitante").remove();var a=$("<div/>",{id:"resumenIdentificacionSolicitante"}).appendTo("#resumen-container");a.append("<h3>Identificación del solicitante</h3><br>");var e=$("<div/>",{addClass:"row"}).appendTo(a);if(e.append('<div class="col-md-4">Tipo Solicitante: <b>'+capitalize($("input:radio[name=st1_tipo_solicitante]:checked").val().toLowerCase())+"</b></div>"),"promotor"==$("input:radio[name=st1_tipo_solicitante]:checked").val()){"arrendatario"==$("input:radio[name=st1_tipo_representante]:checked").val()?des="Persona física/moral que está rentando el predio":des="Persona física/moral que es dueña del predio",e.append('<div class="col-md-8">Tipo Representante: <b>'+des+"</b></div>"),a.append("<br>");var i=$("<div/>",{addClass:"row"}).appendTo(a);if(i.append('<div class="col-md-4">Tipo Carta Poder: <b>'+capitalize($("input:radio[name=st1_tipo_carta_poder]:checked").val().toLowerCase())+"</b></div>"),i.append('<div class="col-md-8">Carta Poder: <b><a href="http://192.168.66.93/licencia_giro/demo/carta_poder.pdf" target="_blank"><i class="fa fa-file-text" aria-hidden="true"></i> carta_poder.pdf</a></b></div>'),"simple"==$("input:radio[name=st1_tipo_carta_poder]:checked").val()){a.append("<br>");var t=$("<div/>",{addClass:"row"}).appendTo(a);t.append('<div class="col-md-4">Identificación del Otorgante: <b><a href="http://192.168.66.93/licencia_giro/demo/Identificacion.pdf" target="_blank"><i class="fa fa-user" aria-hidden="true"></i> identificaciion.pdf</a></b></div>'),t.append('<div class="col-md-4">Identificación Testigo 1: <b><a href="http://192.168.66.93/licencia_giro/demo/Identificacion.pdf" target="_blank"><i class="fa fa-user" aria-hidden="true"></i> identificaciion.pdf</a></b></div>'),t.append('<div class="col-md-4">Identificación Testigo 2: <b><a href="http://192.168.66.93/licencia_giro/demo/Identificacion.pdf" target="_blank"><i class="fa fa-user" aria-hidden="true"></i> identificaciion.pdf</a></b></div>')}}if("arrendatario"==$("input:radio[name=st1_tipo_solicitante]:checked").val()||"arrendatario"==$("input:radio[name=st1_tipo_representante]:checked").val()){a.append("<br>");var n=$("<div/>",{addClass:"row"}).appendTo(a);n.append('<div class="col-md-5">Contrato de Arrendamiento: <b><a href="http://192.168.66.93/licencia_giro/demo/contrato_arrendamiento.pdf" target="_blank"><i class="fa fa-file-text" aria-hidden="true"></i> contrato_arrendamiento.pdf</a></b></div>');var r="s"!=$("input:radio[name=st1_faculta]:checked").val()?"No":"Si";if(n.append('<div class="col-md-7">¿El contrato de arrendamiento te faculta para abrir un negocio? <b>'+r+"</b></div>"),"n"==$("input:radio[name=st1_faculta]:checked").val()){a.append("<br>");var o=$("<div/>",{addClass:"row"}).appendTo(a),d="s"!=$("input:radio[name=st1_anuencia]:checked").val()?"No":"Si";o.append('<div class="col-md-6">¿Cuentas con la anuencia del arrendador para abrir un negocio? <b>'+d+"</b></div>"),o.append('<div class="col-md-6">Carta de Anuencia: <b><a href="http://192.168.66.93/licencia_giro/demo/carta_anuencia.pdf" target="_blank"><i class="fa fa-file-text" aria-hidden="true"></i> carta_anuencia.pdf</a></b></div>')}}if(a.append("<br><hr><br>"),"promotor"==$("input:radio[name=st1_tipo_solicitante]:checked").val()){a.append("<h3>Datos del representante:</h3><br>");var c=$("<div/>",{addClass:"row"}).appendTo(a);c.append('<div class="col-md-12">Nombre del Representante: <b>'+$("input:text[name=st2_nombre_representante]").val()+"</b></div>"),c.append("<br><br>"),c.append('<div class="col-md-4">C.U.R.P.: <b>'+$("input:text[name=st2_curp_representante]").val()+"</b></div>"),c.append('<div class="col-md-4">R.F.C.: <b>'+$("input:text[name=st2_rfc_representante]").val()+"</b></div>"),c.append('<div class="col-md-4">Correo electrónico: <b>'+$("input[name=st2_email_representante]").val()+"</b></div>"),c.append("<br><br>"),c.append('<div class="col-md-8">Domicilio: <b>'+$("input:text[name=st2_domicilio_representante]").val()+"</b></div>"),c.append('<div class="col-md-2">Num. Exterior: <b>'+$("input:text[name=st2_num_ext_representante]").val()+"</b></div>"),c.append('<div class="col-md-2">Num. Interior: <b>'+$("input[name=st2_num_int_representante]").val()+"</b></div>"),c.append("<br><br>"),c.append('<div class="col-md-4">Colonia: <b>'+$("input:text[name=st2_colonia_representante]").val()+"</b></div>"),c.append('<div class="col-md-4">Ciudad: <b>'+$("input:text[name=st2_ciudad_representante]").val()+"</b></div>"),c.append('<div class="col-md-2">C.P.: <b>'+$("input[name=st2_cp_representante]").val()+"</b></div>"),c.append('<div class="col-md-2">Teléfono: <b>'+$("input[name=st2_telefono_representante]").val()+"</b></div>"),c.append("<br><br>"),c.append('<div class="col-md-12">Identificación del Representante: <b><a href="http://192.168.66.93/licencia_giro/demo/Identificacion.pdf" target="_blank"><i class="fa fa-user" aria-hidden="true"></i> identificaciion.pdf</a></b></div>'),a.append("<br><hr><br>")}a.append("<h3>Datos del solicitante:</h3><br>");var s=$("<div/>",{addClass:"row"}).appendTo(a);s.append('<div class="col-md-12">Nombre del Representante: <b>'+$("input:text[name=st2_nombre_solicitante]").val()+"</b></div>"),s.append("<br><br>"),s.append('<div class="col-md-4">C.U.R.P.: <b>'+$("input:text[name=st2_curp_solicitante]").val()+"</b></div>"),s.append('<div class="col-md-4">R.F.C.: <b>'+$("input:text[name=st2_rfc_solicitante]").val()+"</b></div>"),s.append('<div class="col-md-4">Correo electrónico: <b>'+$("input[name=st2_email_solicitante]").val()+"</b></div>"),s.append("<br><br>"),s.append('<div class="col-md-8">Domicilio: <b>'+$("input:text[name=st2_domicilio_solicitante]").val()+"</b></div>"),s.append('<div class="col-md-2">Num. Exterior: <b>'+$("input:text[name=st2_num_ext_solicitante]").val()+"</b></div>"),s.append('<div class="col-md-2">Num. Interior: <b>'+$("input[name=st2_num_int_solicitante]").val()+"</b></div>"),s.append("<br><br>"),s.append('<div class="col-md-4">Colonia: <b>'+$("input:text[name=st2_colonia_solicitante]").val()+"</b></div>"),s.append('<div class="col-md-4">Ciudad: <b>'+$("input:text[name=st2_ciudad_solicitante]").val()+"</b></div>"),s.append('<div class="col-md-2">C.P.: <b>'+$("input[name=st2_cp_solicitante]").val()+"</b></div>"),s.append('<div class="col-md-2">Teléfono: <b>'+$("input[name=st2_telefono_solicitante]").val()+"</b></div>"),a.append("<br><hr><br>"),a.append("<h3>Datos del predio:</h3><br>");var l=$("<div/>",{addClass:"row"}).appendTo(a);l.append('<div class="col-md-3">Clave Catastral: <b>'+$("#claveCatastral").val()+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-12">Actividad especifica: <b>'+($("input:text[name=descripcion_factibilidad]").val()?$("input:text[name=descripcion_factibilidad]").val():"")+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-12">Nombre del negocio: <b>'+$("input:text[name=st3_nombre_establecimiento]").val()+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-8">Domicilio: <b>'+$("input:text[name=st3_domicilio_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-2">Num. Exterior: <b>'+$("input:text[name=st3_num_ext_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-2">Letra Exterior: <b>'+$("input:text[name=st3_letra_ext_establecimiento]").val()+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-8">Colonia: <b>'+$("input:text[name=st3_colonia_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-2">Num. Interior: <b>'+$("input:text[name=st3_num_int_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-2">Letra Interior: <b>'+$("input:text[name=st3_letra_int_establecimiento]").val()+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-12">Especificaciones: <b>'+$("input:text[name=st3_especificaciones_establecimiento]").val()+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-3">Tipo de Edificacion: <b>'+$("input:text[name=st3_edificio_plaza_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-3">Num. Local: <b>#'+$("input:text[name=st3_num_local_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-3">Superficie Construida: <b>'+$("input:text[name=st3_sup_construida_establecimiento]").val()+"mts.</b></div>"),l.append('<div class="col-md-3">Area a utilizar: <b>'+$("input:text[name=st3_area_utilizar_establecimiento]").val()+"mts.</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-4">Inversión estimada: <b>$'+$("input:text[name=st3_inversion_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-4">Cajones Estacionamiento: <b>'+$("input:text[name=st3_cajones_estacionamiento_establecimiento]").val()+"</b></div>"),l.append('<div class="col-md-4">Num. Empleados: <b>'+$("input:text[name=st3_empleados_establecimiento]").val()+"</b></div>"),l.append("<br><br>"),l.append('<div class="col-md-4">Fotografia Fachada: <b><a href="http://192.168.66.93/licencia_giro/demo/imagen1.jpg" data-lightbox="imagen establecimiento 1"> <i class="fa fa-picture-o" aria-hidden="true"></i> fotografia.jpg</a></b></div>'),l.append('<div class="col-md-4">Fotografia puerta abierta: <b><a href="http://192.168.66.93/licencia_giro/demo/imagen2.jpg" data-lightbox="imagen establecimiento 2"> <i class="fa fa-picture-o" aria-hidden="true"></i> fotografia1.jpg</a></b></div>'),l.append('<div class="col-md-4">Fotografia interior: <b><a href="http://192.168.66.93/licencia_giro/demo/imagen3.jpg" data-lightbox="imagen establecimiento 3"> <i class="fa fa-picture-o" aria-hidden="true"></i> fotografia2.jpg</a></b></div>'),a.append("<br><hr><br><br>"),$(".cadenaFirmar").empty();var p="promotor"==$("input:radio[name=st1_tipo_solicitante]:checked").val()?$("input:text[name=st2_nombre_representante]").val():$("input:text[name=st2_nombre_solicitante]").val(),u="promotor"==$("input:radio[name=st1_tipo_solicitante]:checked").val()?$("input:text[name=st2_priper_apellido_representante]").val():$("input:text[name=st2_primer_apellido_solicitante]").val(),m=("promotor"==$("input:radio[name=st1_tipo_solicitante]:checked").val()?$("input:text[name=st2_segundo_apellido_representante]").val():$("input:text[name=st2_segundo_apellido_solicitante]").val(),new Date);$(".cadenaFirmar").html("Nombre|=|"+p+"|+|Primer Apellido|=|"+u+"|+|Segundo Apellido|=|"+u+"|+|Tramite|=|"+$("#tramite").val()+"|+|Actividad|=|"+$("#descActividad").text()+"|+|Fecha|=|"+m.getDate()+"/"+(m.getMonth()+1)+"/"+m.getFullYear())}function capitalize(a){return a[0].toUpperCase()+a.slice(1)}function loadFile(element){el=$("#"+element.id);var file=document.getElementById(element.id).files[0],data=new FormData;data.append("auth","50f14b34Sru81o#10830981"),data.append("folio",$("#tramite").val()),data.append("documento",file),data.append("name",el.data("type"));var contObj=el.parent();1==el.valid()&&$.ajax({type:"POST",url:"http://192.168.66.93/api/vu_up.php",contentType:!1,data:data,processData:!1,beforeSend:function(){$("#"+el.data("elastic")).css("margin","15px 0px");var a=new ProgressBar.Line("#"+el.data("elastic"),{color:"#8CBC5F",easing:"easeInOut"});a.animate(1,{duration:900},function(){a.destroy(),$("#"+el.data("elastic")).css("margin","0px")})},success:function(data){var serialized=eval("("+data+")");contObj.find(".link-to-file").remove(),contObj.append('<a href="'+serialized.url+'" target="_blank" class="link-to-file"><i class="fa fa-file-text-o" aria-hidden="true"></i> '+el.data("text")+"</a>"),updateFiles(el.data("type"),serialized.url,$("#tramite").val()).done(function(a){})},error:function(){}})}function validateFirma(){if($("#frmFirmar").valid()){var cer=document.getElementById("fleCER").files[0],key=document.getElementById("fleKEY").files[0],data=new FormData;data.append("id_tramite",$("#txtFirmaTramite").val()),data.append("cadena_original",$(".cadenaFirmar").text()),data.append("pass",$("#txtPassFIEL").val()),data.append("cer",cer),data.append("key",key),$.ajax({type:"POST",url:"http://192.168.66.93/api/vu_firma.php",contentType:!1,data:data,processData:!1,success:function(data){$("#txtPassFIEL").val(""),$("#txtPassFIEL").removeClass("mui--is-dirty mui--is-not-empty valid mui--is-touched"),$("#fleKEY").val(""),$("#fleCER").val(""),$("#firmaModal").modal("hide");var sdata=eval("("+data+")");if(200!=sdata.status)$("#firma_electronica").empty(),$("#contMSGFirmaError").empty().append('<div class="alert alert-danger"><strong>Error: </strong>'+sdata.message+"</div>");else{var nombreTitular=sdata.titular[0],curpTitular=sdata.titular[4],rfcTitular=sdata.titular[3];$("input:radio[name=st1_tipo_solicitante]:checked").val(),$("#contMSGFirmaError").empty(),$("#firma_electronica").empty().text(sdata.firma),$(".contErrorInsideFirma").remove()}},error:function(){}})}}var stepsForm=null,currentStep=$("#step").val(),informado=!1,arregloDatosP=[];$(document).ready(function(){"use strict";if($(".dropdown").on("show.bs.dropdown",function(){$(this).find(".dropdown-menu").first().stop(!0,!0).fadeIn()}),$(".dropdown").on("hide.bs.dropdown",function(){$(this).find(".dropdown-menu").first().stop(!0,!0).fadeOut()}),$("#frmContrasena").length&&$("#frmContrasena").validate({rules:{nuevoPass:{required:!0,minlength:8},confirmaNuevoPass:{required:!0,equalTo:"#txtNuevoPass"}},messages:{passActual:"La contraseña actual es requerida para continuar",nuevoPass:{required:"La nueva contraseña es requerida para continuar",minlength:"La contraseña debe contener al menos 8 caracteres"},confirmaNuevoPass:{required:"Confirma la nueva contraseña para continuar",equalTo:"No coinciden las contraseñas"}}}),$("#btnCambiarPass").on("click",function(a){a.preventDefault(),$("#frmContrasena").valid()&&setPass($("#txtNuevoPass").val(),$("#txtPassActual").val(),$("#txtEmailPass").val()).done(function(a){200==a.status?setMessage("exito",$(".message"),"<b>Bien echo:</b> la contraseña se actualizó correctamente."):setMessage1("<b>Error:</b> la contraseña actual no es correcta.",!0)})}),$("#frmPerfilUsuario").length&&$("#frmPerfilUsuario").validate({rules:{email:{required:!0,email:!0}},messages:{nombre:"El nombre es requerido para continuar",ape_pat:"El primer apellido es requerido para continuar",ape_mat:"El segundo apellido es requerido para continuar",email:{required:"El correo eletrónico es requerido para continuar",email:"La cuenta no es valida"}}}),$("#btnActualizarPerfil").on("click",function(a){a.preventDefault(),$("#frmPerfilUsuario").valid()&&updateProfile($("#txtEmail").val(),$("#txtNombre").val(),$("#txtApepat").val(),$("#txtApemat").val(),$("#txtCelular").val()).done(function(a){200==a.status?($("#contUserName").text($("#txtNombre").val()),setProfile($("#txtNombre").val(),$("#txtApepat").val(),$("#txtApemat").val(),$("#txtCelular").val()).done(function(a){setMessage("exito",$(".messagePerfil"),"<b>Bien echo:</b> Tus datos han sido actualizado correctamente")})):setMessage1("<b>Error:</b> Ocurrio un erro inesperado al momento de actualizar tus datos por favor intenta de nuevo mas tarde.",!0)})}),$("#frmIniciarTramiteLicencia").length&&$("#frmIniciarTramiteLicencia").validate({messages:{claveCatastral:"La Clave Catastral es requerida para continuar"}}),$("#btnInciarTramiteLicencia").on("click",function(a){a.preventDefault(),$("#frmIniciarTramiteLicencia").valid()&&window.location.replace("http://visorurbano.guadalajara.gob.mx/mapa/?criterio="+$("#txtClaveCatastral").val())}),$("#frmLicenciaGiroConfirmar").length&&$("#frmLicenciaGiroConfirmar").validate({messages:{numeroPredial:"El número de cuenta predial es requerido para continuar",folioFactibilidad:"El folio del trámite de factibilidad es requerido para continuar",agreeAvisoPrivacidad:"Debes aceptar el aviso de privaciad para continuar"}}),$("#btnConfirmarLicencias").on("click",function(){$("#frmLicenciaGiroConfirmar").valid()&&validaNCP($("#txtCuentaPredial").val(),$("#txtCPE").val(),$("#txtCC").val(),$("#txtFFactibilidad").val()).done(function(a){200==a.status?(window.location.href=baseURL+"nueva-licencia/"+a.data.sec+"/"+a.data.sec2,setFolder(a.data.id).done(function(a){a.status,unsetLoading()})):(unsetLoading(),setMessage1(a.message,!0))})}),$.validator.addMethod("extension",function(a,e,i){return i="string"==typeof i?i.replace(/,/g,"|"):"png|jpe?g|gif",this.optional(e)||a.match(new RegExp("\\.("+i+")$","i"))},$.validator.format('Este documento debe ser en formato ".pdf"')),$("#frmFirmar").length&&$("#frmFirmar").validate({rules:{firmaCER:{required:!0,extension:"cer"},firmaKEY:{required:!0,extension:"key"},firmaPass:{required:!0}},messages:{firmaCER:{required:"Ingresa el archivo .cer para continuar",extension:"Formato incorrecto, se espera un archivo con formato .cer"},firmaKEY:{required:"Ingresa el archivo .key para continuar",extension:"Formato incorrecto, se espera un archivo con formato .key"},firmaPass:{required:"Ingresa la contraseña de la firma electrónica para continuar"}}}),$("#frmSolicitudLicenciaGiro").length){var a=$("#frmSolicitudLicenciaGiro");a.validate({rules:{st1_carta_poder:{required:!0,extension:"pdf"},fleIdentificacionOtorgante:{required:!0,extension:"pdf"},fleTestigo1:{required:!0,extension:"pdf"},fleTestigo2:{required:!0,extension:"pdf"},fleContratoArrendamiento:{required:!0,extension:"pdf"},fleAnuencia:{required:!0,extension:"pdf"},st2_email_representante:{required:!0,email:!0},st2_num_ext_representante:{required:!0,number:!0},st2_num_int_representante:{number:!0},st2_cp_representante:{required:!0,number:!0},st2_telefono_representante:{required:!0,number:!0},st2_email_solicitante:{required:!0,email:!0},st2_num_ext_solicitante:{required:!0,number:!0},st2_num_int_solicitante:{number:!0},st2_cp_solicitante:{required:!0,number:!0},st2_telefono_solicitante:{required:!0,number:!0},st2_identificacion_representante:{required:!0,extension:"pdf"},st2_identidficacion_solicitante:{required:!0,extension:"pdf"},st3_num_ext_establecimiento:{required:!0,number:!0},st3_num_int_establecimiento:{number:!0},st3_cp_establecimiento:{required:!0,number:!0},st3_num_local_establecimiento:{required:!0,number:!0},st3_empleados_establecimiento:{required:!0,number:!0},st3_cajones_estacionamiento_establecimiento:{required:!0,number:!0},st3_sup_construida_establecimiento:{required:!0,number:!0},st3_area_utilizar_establecimiento:{required:!0,number:!0},st3_inversion_establecimiento:{required:!0,number:!0},st3_img1_establecimiento:{required:!0},st3_img2_establecimiento:{required:!0},st3_img3_establecimiento:{required:!0},st3_es_numero_interior:{required:!0},st3_dictamen_lineamiento:{required:!0}},messages:{st1_tipo_solicitante:{required:"Elige un tipo de solicitante para continuar"},st1_tipo_representante:{required:"Elige un tipo de representante para continuar"},st1_carta_poder:{required:"Adjunta la carta poder para continuar"},fleIdentificacionOtorgante:{required:"Adjunta la identificación del otorgante para continuar"},fleTestigo1:{required:"Adjunta la identificación del Testtigo #1 para continuar"},fleTestigo2:{required:"Adjunta la identificación del Testtigo #2 para continuar"},fleContratoArrendamiento:{required:"Adjunta el contrato de arrendamiento para continuar"},st1_faculta:{required:"Confirma si el contrato de arrendamiento te faculta para abrir un negocio"},st1_anuencia:{required:"Confirma si cuentas con la anuencia del propietario para abrir un negocio"},fleAnuencia:{required:"Adjunta la anuencia firmada por el propietario o representante  para continuar"},st2_email_representante:{email:"La cuenta de correo proporcionada no es valdia"},st2_num_ext_representante:{number:"Debe ser una valor numérico"},st2_num_int_representante:{number:"Debe ser una valor numérico"},st2_cp_representante:{number:"Debe ser una valor numérico"},st2_telefono_representante:{number:"Debe ser una valor numérico"},st2_email_solicitante:{email:"La cuenta de correo proporcionada no es valdia"},st2_num_ext_solicitante:{number:"Debe ser una valor numérico"},st2_num_int_solicitante:{number:"Debe ser una valor numérico"},st2_cp_solicitante:{number:"Debe ser una valor numérico"},st2_telefono_solicitante:{number:"Debe ser una valor numérico"},st2_identificacion_representante:{required:"Adjunta la Identificación del representante continuar"},st2_identidficacion_solicitante:{required:"Adjunta la Identificación del solicitante continuar"},st3_num_ext_establecimiento:{number:"Debe ser una valor numérico"},st3_num_int_establecimiento:{number:"Debe ser una valor numérico"},st3_cp_establecimiento:{number:"Debe ser una valor numérico"},st3_num_local_establecimiento:{number:"Debe ser una valor numérico"},st3_empleados_establecimiento:{number:"Debe ser una valor numérico"},st3_cajones_estacionamiento_establecimiento:{number:"Debe ser una valor numérico"},st3_sup_construida_establecimiento:{number:"Debe ser una valor numérico"},st3_area_utilizar_establecimiento:{number:"Debe ser una valor numérico"},st3_inversion_establecimiento:{number:"Debe ser una valor numérico"},st3_img1_establecimiento:{required:"Adjunta la fotografía panorámica de la fachada para continuar"},st3_img3_establecimiento:{required:"Adjunta la fotografía del Interior del establecimiento para continuar"},st3_img2_establecimiento:{required:"Adjunta la fotografía panorámica de la fachada con la puerta o cortina abierta para continuar"},st3_es_numero_interior:{required:"Confirma si la licencia será para número interior"},st3_dictamen_lineamiento:{required:"Adjunta el Dictamen de lineamiento y número ofical para continuar"},st4_declaratoria:{required:"La confirmación de que la información es correcta es requerida para continuar"}}}),stepsForm=a.children("div").steps({headerTag:"h3",bodyTag:"section",transitionEffect:"slideLeft",startIndex:parseInt(currentStep),onStepChanging:function(e,i,t){if(4==t&&fill_pago(),t+1==5){if(""==$("#firma_electronica").text())return $("#firma_electronica").text(""),$("#firmaContainer").append('<span style="color: #F35B53;" class="contErrorInsideFirma">Debes firmar la solicitud utilizando tu firma electronica (FIEL) para poder continuar.</span>'),$(window).scrollTop($("#firmaContainer").offset().top),!1;$(".contErrorInsideFirma").remove()}if(t+1==2&&(getDataPropietario($("#claveCatastral").val()).done(function(a){200==a.status&&((arregloPropietario=a.data).n_exterior=""!=arregloPropietario.n_exterior?parseInt(arregloPropietario.n_exterior):"",arregloPropietario.n_interior=""!=arregloPropietario.n_interior?parseInt(arregloPropietario.n_interior):"")}),informado=!1),3!=i){if(a.validate().settings.ignore=":disabled,:hidden,.valid",a.valid()){updateForma(a.find(":input:not(:hidden)").serializeArray(),t,$("#tramite").val())}return 3==t&&resumenLicenciaGiro(),a.valid()}return a.valid()},onInit:function(a,e){ResumeLicenciaGiro(),informado=!0,4==e&&fill_pago(),3==e&&resumenLicenciaGiro(),1==e&&(informado=!1),2==e&&consulLicP($("#tramite").val()).done(function(a){if(a.validacionMultiLic.status){$("#es_numero_interior").show(),$("#lista_lic").empty();for(var e=0;e<a.validacionMultiLic.licencias.length;e++)$("#lista_lic").append("<li>Licencia: "+a.validacionMultiLic.licencias[e].id+" - "+a.validacionMultiLic.licencias[e].actividad+"</li>")}}),getDataPropietario($("#claveCatastral").val()).done(function(a){200==a.status&&((arregloPropietario=a.data).n_exterior=""!=arregloPropietario.n_exterior?parseInt(arregloPropietario.n_exterior):"",arregloPropietario.n_interior=""!=arregloPropietario.n_interior?parseInt(arregloPropietario.n_interior):"")}),$("#frmSolicitudLicenciaGiro .actions li a").addClass("mui-btn mui-btn--primary")},onFinished:function(a,e){updateForma(new Array({name:"status",value:"FP"}),e,$("#tramite").val()).done(function(a){window.location.href=baseURL+"admin"})},labels:{cancel:"Cancelar",current:"paso actual:",pagination:"Paginación",finish:"Finalizar",next:'Siguiente  <i class="fa fa-chevron-right" aria-hidden="true"></i>',previous:'<i class="fa fa-chevron-left" aria-hidden="true"></i>  Anterior',loading:"Cargando ..."}})}$("input:radio[name=st1_tipo_solicitante]").each(function(a,e){$(this).on("click",function(){var a=$(this).val();switch($("#seccionPromotor, #seccionArrendatario").hide(),a){case"propietario":$("#secRepresentante").hide(),unsetError(),fillPropietario(),$(".cont-identificacion-solicitante").show();break;case"promotor":unsetError(),fillPropietario(),$("#seccionPromotor").show(),$("#secRepresentante").show(),$(".cont-identificacion-solicitante").hide(),$("input:radio[name=st1_faculta]").prop("checked",!1),$("input:radio[name=st1_anuencia]").prop("checked",!1);break;case"arrendatario":cleanPropietario(),$("#seccionArrendatario").show(),$("#secRepresentante").hide(),$(".cont-identificacion-solicitante").show(),$("input:radio[name=st1_tipo_representante]").prop("checked",!1),$("input:radio[name=st1_tipo_carta_poder]").prop("checked",!1),$("#rbtCartaPoderSimple").prop("checked",!0);break;default:cleanPropietario(),$("#seccionPromotor, #seccionArrendatario").hide()}})}),$("input:radio[name=st1_tipo_representante]").each(function(a,e){$(this).on("click",function(){"arrendatario"==$(this).val()?$("#seccionArrendatario").show():(unsetError(),$("#seccionArrendatario").hide())})}),$("input:radio[name=st1_tipo_carta_poder]").each(function(a,e){$(this).on("click",function(){"simple"==$(this).val()?$(".anexoCartaPoder").show():$(".anexoCartaPoder").hide()})}),$("input:radio[name=st1_faculta]").each(function(a,e){$(this).on("click",function(){"n"==$(this).val()?$("#seccionAnuencia").show():($("#seccionAnuencia").hide(),$("#seccionCartaAnuencia").hide())})}),$("input:radio[name=st1_anuencia]").each(function(a,e){$(this).on("click",function(){if("s"==$(this).val())unsetError(),$("#seccionCartaAnuencia").show();else{var a=[];a[0]="El contrato de arrendamiento no te faculta para abrir un negocio.",a[1]="No cuentas con la anuencia del propietario para abrir un negocio.",errorLicenciaGiro(1,a),$("#seccionCartaAnuencia").hide()}})}),$("#btnFirmar").on("click",function(a){a.preventDefault(),validateFirma()})});var arregloPropietario=[];