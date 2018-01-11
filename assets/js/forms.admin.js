var userURL = 'http://licenciasprueba.guadalajara.gob.mx/gdlusuarios/auth/';
//var baseURL = 'http://visorurbano.guadalajara.gob.mx/';
var baseURL = "http://localhost/backend/";
//var userURL = "http://localhost/usrGDL/auth/";*/

var stepsForm = null;
var currentStep = $('#step').val();
var informado=false;
var arregloDatosP=[];

$(document).ready(function () {
    'use strict';
    // ------------------------------------------------------- //
    // Agregar efecto fade a los selects
    // ------------------------------------------------------ //
    $('.dropdown').on('show.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeIn();
    });
    $('.dropdown').on('hide.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).fadeOut();
    });

    // ------------------------------------------------------- //
    // Change pass Form
    // ------------------------------------------------------ //
    if ($('#frmContrasena').length){
        $('#frmContrasena').validate({
            rules: {
                nuevoPass: {
                    required: true,
                    minlength: 8,
                },
                confirmaNuevoPass:{
                    required: true,
                    equalTo: '#txtNuevoPass'
                }
            },
            messages:{
                passActual: 'La contraseña actual es requerida para continuar',
                nuevoPass:{
                    required: 'La nueva contraseña es requerida para continuar',
                    minlength: 'La contraseña debe contener al menos 8 caracteres'
                },
                confirmaNuevoPass:{
                    required: 'Confirma la nueva contraseña para continuar',
                    equalTo: 'No coinciden las contraseñas'
                }
            }
        })
    }

    $('#btnCambiarPass').on('click', function(e){
        e.preventDefault();
        if ($('#frmContrasena').valid()){
            setPass($('#txtNuevoPass').val(), $('#txtPassActual').val(), $('#txtEmailPass').val()).done(function(data){
                if (data.status == 200){
                    setMessage('exito', $('.message'), '<b>Bien echo:</b> la contraseña se actualizó correctamente.');
                }else{
                    setMessage1('<b>Error:</b> la contraseña actual no es correcta.', true);
                }
            });
        }
    })

    // ------------------------------------------------------- //
    // Update Profile
    // ------------------------------------------------------ //

    if ($('#frmPerfilUsuario').length){
        $('#frmPerfilUsuario').validate({
            rules:{
              email:{
                  required: true,
                  email: true
              }
            },
            messages:{
                nombre: 'El nombre es requerido para continuar',
                ape_pat: 'El primer apellido es requerido para continuar',
                ape_mat: 'El segundo apellido es requerido para continuar',
                email:{
                    required: 'El correo eletrónico es requerido para continuar',
                    email: 'La cuenta no es valida'
                }
            }
        })
    }

    $('#btnActualizarPerfil').on('click', function (e) {
        e.preventDefault();
        if ($('#frmPerfilUsuario').valid()){
            updateProfile($('#txtEmail').val(), $('#txtNombre').val(), $('#txtApepat').val(), $('#txtApemat').val(), $('#txtCelular').val()).done(function(data){
                if (data.status == 200){
                    $('#contUserName').text($('#txtNombre').val());
                    setProfile($('#txtNombre').val(), $('#txtApepat').val(), $('#txtApemat').val(), $('#txtCelular').val()).done(function(data){
                        setMessage('exito', $('.messagePerfil'), '<b>Bien echo:</b> Tus datos han sido actualizado correctamente');
                    });
                }else{
                    setMessage1('<b>Error:</b> Ocurrio un erro inesperado al momento de actualizar tus datos por favor intenta de nuevo mas tarde.', true);
                }
            });
        }
    });


    // ------------------------------------------------------- //
    // Iniciar Licencia de Giro
    // ------------------------------------------------------ //
    if ($('#frmIniciarTramiteLicencia').length){
        $('#frmIniciarTramiteLicencia').validate({
            messages:{
                claveCatastral: 'La Clave Catastral es requerida para continuar'
            }
        });
    }

    $('#btnInciarTramiteLicencia').on('click', function(e){
        e.preventDefault();
        if ($('#frmIniciarTramiteLicencia').valid()){
            window.location.replace("http://visorurbano.guadalajara.gob.mx/mapa/?criterio=" + $('#txtClaveCatastral').val());
        }
        /*if ($('#frmIniciarTramiteLicencia').valid()){
            validaCC($('#txtClaveCatastral').val()).done(function(data){
                if (data.status == 200){
                    window.location.href = baseURL+'nueva_licencia/'+$('#txtClaveCatastral').val();
                }else{
                    $('#txtClaveCatastral').val('');
                    setMessage('error', $('.msg'), 'La Clave Catastral ingresada no existe por favor revise la información e intente de nuevo.' )
                }
            });
        }*/
    });

    // ------------------------------------------------------- //
    // Confirmación Licencia de Giro
    // ------------------------------------------------------ //
    if ($('#frmLicenciaGiroConfirmar').length){
        $('#frmLicenciaGiroConfirmar').validate({
            messages:{
                numeroPredial: 'El número de cuenta predial es requerido para continuar',
                folioFactibilidad: 'El folio del trámite de factibilidad es requerido para continuar',
                agreeAvisoPrivacidad: 'Debes aceptar el aviso de privaciad para continuar'
            }
        });
    }
    $('#btnConfirmarLicencias').on('click', function(){
       if ($('#frmLicenciaGiroConfirmar').valid()){
           validaNCP($('#txtCuentaPredial').val(), $('#txtCPE').val(), $('#txtCC').val(), $('#txtFFactibilidad').val()).done(function(data){
                if (data.status == 200){
                    window.location.href = baseURL + 'nueva-licencia/'+data.data.sec+'/'+data.data.sec2;
                   setFolder(data.data.id).done(function(dataFolder){
                        if (dataFolder.status == 200){
                            unsetLoading();
                            //window.location.href = baseURL + 'nueva-licencia/'+data.data.sec+'/'+data.data.sec2;
                        }else{
                            unsetLoading();
                            //window.location.href = baseURL + 'nueva-licencia/'+data.data.sec+'/'+data.data.sec2;
                        }
                    });
                }else{
                    unsetLoading();
                    setMessage1(data.message, true);
                }
            });
       }
    });


    // ------------------------------------------------------- //
    // Steps Licencia de Giro
    // ------------------------------------------------------ //

    $.validator.addMethod( "extension", function( value, element, param ) {
        param = typeof param === "string" ? param.replace( /,/g, "|" ) : "png|jpe?g|gif";
        return this.optional( element ) || value.match( new RegExp( "\\.(" + param + ")$", "i" ) );
    }, $.validator.format( 'Este documento debe ser en formato ".pdf"' ) );


    if ($('#frmFirmar').length){
        $('#frmFirmar').validate({
            rules:{
                firmaCER:{
                    required: true,
                    extension: "cer"
                },
                firmaKEY:{
                  required: true,
                  extension: 'key'
                },
                firmaPass:{
                    required: true
                }
            },
            messages:{
                firmaCER:{
                    required: 'Ingresa el archivo .cer para continuar',
                    extension: 'Formato incorrecto, se espera un archivo con formato .cer'
                },
                firmaKEY:{
                    required: 'Ingresa el archivo .key para continuar',
                    extension: 'Formato incorrecto, se espera un archivo con formato .key'
                },
                firmaPass:{
                    required: 'Ingresa la contraseña de la firma electrónica para continuar'
                }
            }
        });
    }

    if ($('#frmSolicitudLicenciaGiro').length){
        var form = $("#frmSolicitudLicenciaGiro");
        form.validate({
            rules:{
                st1_carta_poder:{
                    required: true,
                    extension: "pdf"
                },
                fleIdentificacionOtorgante:{
                    required: true,
                    extension: "pdf"
                },
                fleTestigo1:{
                    required: true,
                    extension: "pdf"
                },
                fleTestigo2:{
                    required: true,
                    extension: "pdf"
                },
                fleContratoArrendamiento:{
                    required: true,
                    extension: "pdf"
                },
                fleAnuencia:{
                    required: true,
                    extension: "pdf"
                },
                st2_email_representante: {
                    required: true,
                    email: true
                },
                st2_num_ext_representante:{
                    required: true,
                    number: true
                },
                st2_num_int_representante:{
                    //required: true,
                    number: true
                },
                st2_cp_representante:{
                    required: true,
                    number: true
                },
                st2_telefono_representante:{
                    required: true,
                    number: true
                },
                st2_email_solicitante: {
                    required: true,
                    email: true
                },
                st2_num_ext_solicitante:{
                    required: true,
                    number: true
                },
                st2_num_int_solicitante:{
                    //required: true,
                    number: true
                },
                st2_cp_solicitante:{
                    required: true,
                    number: true
                },
                st2_telefono_solicitante:{
                    required: true,
                    number: true
                },
                st2_identificacion_representante:{
                    required: true,
                    extension: "pdf"
                },
                st2_identidficacion_solicitante:{
                    required: true,
                    extension: "pdf"
                },
                st3_num_ext_establecimiento:{
                    required: true,
                    number: true
                },
                st3_num_int_establecimiento:{
                    //required: true,
                    number: true
                },
                st3_cp_establecimiento:{
                    required: true,
                    number: true
                },
                st3_num_local_establecimiento:{
                    required: true,
                    number: true
                },
                st3_empleados_establecimiento:{
                    required: true,
                    number: true
                },
                st3_cajones_estacionamiento_establecimiento:{
                    required: true,
                    number: true
                },
                st3_sup_construida_establecimiento:{
                    required: true,
                    number: true
                },
                st3_area_utilizar_establecimiento:{
                    required: true,
                    number: true
                },
                st3_inversion_establecimiento:{
                    required: true,
                    number: true
                },
                st3_img1_establecimiento:{
                    required: true
                },
                st3_img2_establecimiento:{
                    required: true
                },
                st3_img3_establecimiento:{
                    required: true
                },
                st3_es_numero_interior:{
                    required: true
                },
                st3_dictamen_lineamiento:{
                    required: true
                }
            },
            messages:{
                st1_tipo_solicitante: {
                    required: 'Elige un tipo de solicitante para continuar'
                },
                st1_tipo_representante:{
                    required: 'Elige un tipo de representante para continuar'
                },
                st1_carta_poder:{
                    required: 'Adjunta la carta poder para continuar'
                },
                fleIdentificacionOtorgante:{
                    required: 'Adjunta la identificación del otorgante para continuar'
                },
                fleTestigo1:{
                    required: 'Adjunta la identificación del Testtigo #1 para continuar'
                },
                fleTestigo2:{
                    required: 'Adjunta la identificación del Testtigo #2 para continuar'
                },
                fleContratoArrendamiento:{
                    required: 'Adjunta el contrato de arrendamiento para continuar'
                },
                st1_faculta:{
                    required: 'Confirma si el contrato de arrendamiento te faculta para abrir un negocio'
                },
                st1_anuencia:{
                    required: 'Confirma si cuentas con la anuencia del propietario para abrir un negocio'
                },
                fleAnuencia: {
                    required: 'Adjunta la anuencia firmada por el propietario o representante  para continuar'
                },
                st2_email_representante: {
                    email: 'La cuenta de correo proporcionada no es valdia'
                },
                st2_num_ext_representante:{
                    number: 'Debe ser una valor numérico'
                },
                st2_num_int_representante:{
                    number: 'Debe ser una valor numérico'
                },
                st2_cp_representante:{
                    number: 'Debe ser una valor numérico'
                },
                st2_telefono_representante:{
                    number: 'Debe ser una valor numérico'
                },
                st2_email_solicitante: {
                    email: 'La cuenta de correo proporcionada no es valdia'
                },
                st2_num_ext_solicitante:{
                    number: 'Debe ser una valor numérico'
                },
                st2_num_int_solicitante:{
                    number: 'Debe ser una valor numérico'
                },
                st2_cp_solicitante:{
                    number: 'Debe ser una valor numérico'
                },
                st2_telefono_solicitante:{
                    number: 'Debe ser una valor numérico'
                },
                st2_identificacion_representante:{
                    required: 'Adjunta la Identificación del representante continuar'
                },
                st2_identidficacion_solicitante:{
                    required: 'Adjunta la Identificación del solicitante continuar'
                },
                st3_num_ext_establecimiento:{
                    number: 'Debe ser una valor numérico'
                },
                st3_num_int_establecimiento:{
                    number: 'Debe ser una valor numérico'
                },
                st3_cp_establecimiento:{
                    number: 'Debe ser una valor numérico'
                },
                st3_num_local_establecimiento:{
                    number: 'Debe ser una valor numérico'
                },
                st3_empleados_establecimiento:{
                    number: 'Debe ser una valor numérico'
                },
                st3_cajones_estacionamiento_establecimiento:{
                    number: 'Debe ser una valor numérico'
                },
                st3_sup_construida_establecimiento:{
                    number: 'Debe ser una valor numérico'
                },
                st3_area_utilizar_establecimiento:{
                    number: 'Debe ser una valor numérico'
                },
                st3_inversion_establecimiento:{
                    number: 'Debe ser una valor numérico'
                },
                st3_img1_establecimiento:{
                    required: 'Adjunta la fotografía panorámica de la fachada para continuar'
                },
                st3_img3_establecimiento:{
                    required: 'Adjunta la fotografía del Interior del establecimiento para continuar'
                },
                st3_img2_establecimiento:{
                    required: 'Adjunta la fotografía panorámica de la fachada con la puerta o cortina abierta para continuar'
                },
                st3_es_numero_interior:{
                    required: 'Confirma si la licencia será para número interior'
                },
                st3_dictamen_lineamiento:{
                    required: 'Adjunta el Dictamen de lineamiento y número ofical para continuar'
                },
                st4_declaratoria:{
                    required: 'La confirmación de que la información es correcta es requerida para continuar'
                }

            }
        });
        stepsForm = form.children("div").steps({
            headerTag: "h3",
            bodyTag: "section",
            transitionEffect: "slideLeft",
            startIndex: parseInt(currentStep),
            onStepChanging: function (event, currentIndex, newIndex)
            {
                if((newIndex+1) == 3){
                    arregloDatosP=[];

                    if(arregloPropietario.nombre != ""){
                        if(arregloPropietario.nombre != $('#txtNombre').val().toUpperCase()){
                            arregloDatosP.push('NOMBRE');
                        }
                    }
                    if(arregloPropietario.ape_paterno != ""){
                        if(arregloPropietario.ape_paterno != $('#txtPApellidoSolicitante').val().toUpperCase()){
                            arregloDatosP.push('APELLIDO PATERNO');
                        }
                    }
                    if(arregloPropietario.ape_materno != ""){
                        if(arregloPropietario.ape_materno != $('#txtSApellidoSolicitante').val().toUpperCase()){
                            arregloDatosP.push('APELLIDO MATERNO');
                        }
                    }
                    if(arregloPropietario.curp != ""){
                        if(arregloPropietario.curp != $('#txtCURP').val().toUpperCase()){
                            arregloDatosP.push('CURP');
                        }
                    }
                    if(arregloPropietario.rfc != ""){
                        if(arregloPropietario.rfc != $('#txtRFC').val().toUpperCase()){
                            arregloDatosP.push('RFC');
                        }
                    }
                    if(arregloPropietario.calle != ""){
                        if(arregloPropietario.calle != $('#txtDomicilio').val().toUpperCase()){
                            arregloDatosP.push('DOMICILIO');
                        }
                    }
                    if(arregloPropietario.n_exterior != ""){
                        if(arregloPropietario.n_exterior != $('#txtNExterior').val()){
                            arregloDatosP.push('No. EXTERIOR');
                        }
                    }
                    if(arregloPropietario.n_interior != ""){
                        if(arregloPropietario.n_interior != $('#txtNInterior').val()){
                            arregloDatosP.push('No. INTERIOR');
                        }
                    }
                    if(arregloPropietario.colonia != ""){
                        if(arregloPropietario.colonia != $('#txtColonia').val().toUpperCase()){
                            arregloDatosP.push('COLONIA');
                        }
                    }
                    if(arregloPropietario.ciudad != ""){
                        if(arregloPropietario.ciudad != $('#txtCiudad').val().toUpperCase()){
                            arregloDatosP.push('CIUDAD');
                        }
                    }
                    if(arregloPropietario.cp != ""){
                        if(arregloPropietario.cp != $('#txtCP').val().toUpperCase()){
                            arregloDatosP.push('CP');
                        }
                    }
                    form.validate().settings.ignore = ":disabled,:hidden,.valid";
                    if (form.valid()){
                        var frm  = form.find(":input:not(:hidden)").serializeArray();
                        updateForma(frm, newIndex, $('#tramite').val()).done(function(data){
                            if(data.validacionMultiLic){
                                $('#es_numero_interior').show();
                            }
                        });
                    }
                    if (newIndex == 3){
                        resumenLicenciaGiro();
                    }
                    if(arregloDatosP.length > 0 && !informado){
                        setWarning(arregloDatosP);
                        $('.footer').attr('onclick','nextPaso()');
                        return "";
                    }else {
                        return form.valid();
                    }

                }else if((newIndex+1) == 2){
                    getDataPropietario($('#claveCatastral').val()).done(function(data){
                        if (data.status == 200){
                            arregloPropietario=data.data;
                            arregloPropietario.n_exterior = (arregloPropietario.n_exterior != "" ? parseInt(arregloPropietario.n_exterior): "");
                            arregloPropietario.n_interior = (arregloPropietario.n_interior != "" ? parseInt(arregloPropietario.n_interior): "");
                        }
                    });
                    informado = false;
                }else if(currentIndex != 3){
                    form.validate().settings.ignore = ":disabled,:hidden,.valid";
                    if (form.valid()){
                        var frm  = form.find(":input:not(:hidden)").serializeArray();
                        updateForma(frm, newIndex, $('#tramite').val());
                    }
                    if (newIndex == 3){
                        resumenLicenciaGiro();
                    }
                    return form.valid();
                    informado = true;
                }

                return form.valid();

            },
            onInit: function(event, currentIndex){
                ResumeLicenciaGiro();
                informado = true;
                if (currentIndex == 3){
                    resumenLicenciaGiro();
                }
                if(currentIndex == 1){
                    informado = false;
                }
                if(currentIndex == 2){
                    consulLicP($('#tramite').val()).done(function(data){
                        if(data.validacionMultiLic){
                            $('#es_numero_interior').show();
                        }
                    });
                }
                getDataPropietario($('#claveCatastral').val()).done(function(data){
                    if (data.status == 200){
                        arregloPropietario=data.data;
                        arregloPropietario.n_exterior = (arregloPropietario.n_exterior != "" ? parseInt(arregloPropietario.n_exterior): "");
                        arregloPropietario.n_interior = (arregloPropietario.n_interior != "" ? parseInt(arregloPropietario.n_interior): "");
                    }
                });
                $('#frmSolicitudLicenciaGiro .actions li a').addClass('mui-btn mui-btn--primary');
            },
            onFinished: function (event, currentIndex) {
                var dataSend = {name:"status", value:"FP"};
                updateForma(new Array(dataSend), currentIndex, $('#tramite').val()).done(function(data){
                    window.location.href = baseURL + "admin";
                });

            },
            labels: {
                cancel: "Cancelar",
                current: "paso actual:",
                pagination: "Paginación",
                finish: "Finalizar",
                next: "Siguiente  <i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>",
                previous: "<i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>  Anterior",
                loading: "Cargando ..."
            },


        });
    }

    //tipo Solicitante
    $('input:radio[name=st1_tipo_solicitante]').each(function(index, el) {
        $(this).on('click', function (){
           var val =  $(this).val();
            $('#seccionPromotor, #seccionArrendatario').hide();
           switch (val){
               case 'propietario':
                   $('#secRepresentante').hide();
                    unsetError();
                    fillPropietario();
                   $('.cont-identificacion-solicitante').show();
               break;
               case 'promotor':
                   unsetError();
                   fillPropietario();
                   $('#seccionPromotor').show();
                   $('#secRepresentante').show();
                   $('.cont-identificacion-solicitante').hide();
                   $('input:radio[name=st1_faculta]').prop('checked', false);
                   $('input:radio[name=st1_anuencia]').prop('checked', false);
               break;
               case 'arrendatario':
                   cleanPropietario();
                   $('#seccionArrendatario').show();
                   $('#secRepresentante').hide();
                   $('.cont-identificacion-solicitante').show();
                   $('input:radio[name=st1_tipo_representante]').prop('checked', false);
                   $('input:radio[name=st1_tipo_carta_poder]').prop('checked', false);
                   $('#rbtCartaPoderSimple').prop('checked', true);
               break;
               default:
                   cleanPropietario();
                   $('#seccionPromotor, #seccionArrendatario').hide();
               break;

           }
        });
    });

    //tipo Promotor
    $('input:radio[name=st1_tipo_representante]').each(function(index, el) {
        $(this).on('click', function (){
            var val =  $(this).val();
            if (val == 'arrendatario'){
                $('#seccionArrendatario').show();
            }else{
                unsetError();
                $('#seccionArrendatario').hide();
            }
        });
    });

    // Tipod e Carta Poder
    $('input:radio[name=st1_tipo_carta_poder]').each(function(index, el) {
        $(this).on('click', function (){
            var val =  $(this).val();
            if (val == 'simple'){
                $('.anexoCartaPoder').show();
            }else{
                $('.anexoCartaPoder').hide();
            }
        });
    });

    //El contrato de arrendamento faculta
    $('input:radio[name=st1_faculta]').each(function(index, el) {
        $(this).on('click', function (){
            var val =  $(this).val();
            if (val == 'n'){
                $('#seccionAnuencia').show();
            }else{
                $('#seccionAnuencia').hide();
                $('#seccionCartaAnuencia').hide();
            }
        });
    });

    //Anuencia
    $('input:radio[name=st1_anuencia]').each(function(index, el) {
        $(this).on('click', function (){
            var val =  $(this).val();
            if (val == 's'){
                unsetError();
                $('#seccionCartaAnuencia').show();
            }else{
                var errores = [];
                errores[0] = 'El contrato de arrendamiento no te faculta para abrir un negocio.';
                errores[1] = 'No cuentas con la anuencia del propietario para abrir un negocio.';
                errorLicenciaGiro(1, errores);
                $('#seccionCartaAnuencia').hide();

            }
        });
    });

    // ------------------------------------------------------- //
    // Firmar
    // ------------------------------------------------------ //
    $('#btnFirmar').on('click', function(e){
        e.preventDefault();
        validateFirma();
    });

    // ------------------------------------------------------- //
    // Estilos botones steps
    // ------------------------------------------------------ //



});

function nextPaso(){
    informado=true;
}

function campos_extra(val){
    if (val == "S") {
        $('#adjunto_lineamiento').show();
        unsetError();
    }else{
        $('#adjunto_lineamiento').hide();
        var error=[];
        error[0]="";
        setError();
        errorLicenciaGiro(1, error);
    }
}

function setPass(npass, pass, email) {
    var params = {};
    params["email"] = email;
    params["password"] = md5(pass);
    params["npassword"] = md5(npass);
    return $.ajax({
        url: userURL + "password",
        type: "post",
        dataType: 'json',
        //headers: {'Auth-Key': '5vi2ihELV95OFiA2GsFB34scLH3vZzOC3pH', 'Client-Service': 'app-client'},
        data: params
    });
}


function updateProfile(email, nombres, apepat, apemat, celular){
    var params = {};
    params["email"] = email;
    params["nombres"] = nombres;
    params["ape_pat"] = apepat;
    params["ape_mat"] = apemat;
    params["celular"] = celular;
    return $.ajax({
        url: userURL + "perfil",
        type: "post",
        dataType: 'json',
        //headers: {'Auth-Key': '5vi2ihELV95OFiA2GsFB34scLH3vZzOC3pH', 'Client-Service': 'app-client'},
        data: params
    });
}

function setProfile(nombres, apepat, apemat, celular){
    var params = {};
    params["nombres"] = nombres;
    params["ape_pat"] = apepat;
    params["ape_mat"] = apemat;
    params["celular"] = celular;
    return $.ajax({
        url: baseURL + "sUpdate",
        type: "post",
        dataType: 'json',
        //headers: {'Auth-Key': '5vi2ihELV95OFiA2GsFB34scLH3vZzOC3pH', 'Client-Service': 'app-client'},
        data: params
    });
}


function validaCC(clave){
    var params = {};
    params["clave"] = clave;
    return $.ajax({
        url: baseURL + "validaclavecatastral",
        type: "get",
        dataType: 'json',
        data: params
    });
}

function validaNCP(original, comparar, catastral, factibilidad){
    var params = {};
    params["original"] = original;
    params["compare"] = comparar;
    params["cuenta_catastro"] = catastral;
    params["factibilidad"] = factibilidad;
    return $.ajax({
        url: baseURL + "validacuentapredial",
        type: "get",
        dataType: 'json',
        data: params,
        beforeSend:function(){
            setLoading();
        }
    });
}

function getDataPropietario(clave){
    var params = {};
    params["clave"] = clave;
    return $.ajax({
        url: baseURL + "datosPropietario",
        type: "get",
        dataType: 'json',
        data: params
    });
}

function setFolder(id){
    var params = {};
    params["auth-key"] = '50f14b34Sru81o#10830981';
    params["id_tramite"] = id;
    params["tipo_tramite"] = 'g';
    return $.ajax({
        url: 'http://192.168.66.93/api/vu_mkdir.php',
        type: "post",
        dataType: 'json',
        data: params
    });
}

function setMessage(type, cont, msg) {
    if (type == 'error'){
        classT = 'alert-danger';
    }
    else{
        classT = 'alert-success';
    }
    cont.empty();
    var el = $('<div/>');
    el.addClass('alert ' + classT).html('<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>' + msg).appendTo(cont);

}

function setMessage1(msg, error){
    $('.msessage-cont').remove();
    var messageContainer = $('<div/>', {class: 'msessage-cont mui--z2'}).prependTo('section.projects');
    if (error){

    }
    messageContainer.html('<p>' + msg + '</p><div class="close"></div>');
    $('.msessage-cont .close').on('click', function(e){
        e.preventDefault();
        $('.msessage-cont').remove();
    });

    $(window).scrollTop($('.msessage-cont').offset().top);
}

function adjustIframeHeight() {
    var $body   = $('body'),
        $iframe = $body.data('iframe.fv');
    if ($iframe) {
        $iframe.height($body.height());
    }
}

function cleanPropietario(){
    $('#txtNombre').val('');
    $('#txtNombre').parent().find("label").removeClass('active');
    $('#txtCURP').val('');
    $('#txtCURP').parent().find("label").removeClass('active');
    $('#txtRFC').val('');
    $('#txtRFC').parent().find("label").removeClass('active');
    $('#txtDomicilio').val('');
    $('#txtDomicilio').parent().find("label").removeClass('active');
    $('#txtNExterior').val('');
    $('#txtNExterior').parent().find("label").removeClass('active');
    $('#txtNInterior').val('');
    $('#txtNInterior').parent().find("label").removeClass('active');
    $('#txtColonia').val('');
    $('#txtColonia').parent().find("label").removeClass('active');
    $('#txtCiudad').val('');
    $('#txtCiudad').parent().find("label").removeClass('active');
    $('#txtCP').val('');
    $('#txtCP').parent().find("label").removeClass('active');
}

function setError(msg){
    $('.actions ul li a[href=\'#next\']').hide();
    $('li.current').addClass('error');
    $('#errorModal .modal-body ul').empty();
    $.each(msg, function( index, value ) {
        $('#errorModal .modal-body ul').append('<li>'+value+'</li>');
    });
    $('#errorModal').modal();
}

function unsetError(){
    $('.actions ul li a[href=\'#next\']').show();
    $('li.current').removeClass('error');

}

function updateForma(campos, step, id){
    var data = {};
    $.each(campos, function(index, val){
        data[val.name] = val.value;
    });
    data['step'] = step;
    return $.ajax({
        url: baseURL + "licencia/a/update",
        type: "post",
        dataType: 'json',
        data: {'licencia': id, 'campos': data, 'firma':$('#firma_electronica').text()}
    });
}

function consulLicP(id){
    return $.ajax({
        url: baseURL + "LicenciasGiro/redir_validacion",
        type: "post",
        dataType: 'json',
        data: {'licencia': id}
    });
}

function updateFiles(field, fleName, id){
    var data = {};
    data[field] = fleName;
    return $.ajax({
        url: baseURL + "licencia/a/update",
        type: "post",
        dataType: 'json',
        data: {'licencia': id, 'campos': data, 'firma':$('#firma_electronica').text()}
    });
}

var arregloPropietario=[];
function fillPropietario(){
    //setLoading();
    getDataPropietario($('#claveCatastral').val()).done(function(data){
        if (data.status == 200){
            //unsetLoading();
            cleanPropietario();
            arregloPropietario=data.data;
            arregloPropietario.n_exterior = (arregloPropietario.n_exterior != "" ? parseInt(arregloPropietario.n_exterior): "");
            arregloPropietario.n_interior = (arregloPropietario.n_interior != "" ? parseInt(arregloPropietario.n_interior): "");

            $('#txtNombre').parent().find("label").addClass('active');
            $('#txtNombre').val(capitalize(data.data.nombre.toLowerCase()));
            $('#txtPApellidoSolicitante').parent().find("label").addClass('active');
            $('#txtPApellidoSolicitante').val(capitalize(data.data.ape_paterno.toLowerCase()));
            $('#txtSApellidoSolicitante').parent().find("label").addClass('active');
            $('#txtSApellidoSolicitante').val(capitalize(data.data.ape_materno.toLowerCase()));

            $('#txtNombre').parent().find("label").addClass('active');
            $('#txtCURP').val(data.data.curp);
            $('#txtCURP').parent().find("label").addClass('active');
            $('#txtRFC').val(data.data.rfc);
            $('#txtRFC').parent().find("label").addClass('active');
            $('#txtDomicilio').val(capitalize(data.data.calle.toLowerCase()));
            $('#txtDomicilio').parent().find("label").addClass('active');
            $('#txtNExterior').val(data.data.n_exterior);
            $('#txtNExterior').parent().find("label").addClass('active');
            $('#txtNInterior').val(data.data.n_interior);
            $('#txtNInterior').parent().find("label").addClass('active');
            $('#txtColonia').val(capitalize(data.data.colonia.toLowerCase()));
            $('#txtColonia').parent().find("label").addClass('active');
            $('#txtCiudad').val(capitalize(data.data.ciudad.toLowerCase()));
            $('#txtCiudad').parent().find("label").addClass('active');
            $('#txtCP').val(data.data.cp);
            $('#txtCP').parent().find("label").addClass('active');
        }
        $('input:radio[name=st1_tipo_representante]').prop('checked', false);
        $('input:radio[name=st1_tipo_carta_poder]').prop('checked', false);
        $('#rbtCartaPoderSimple').prop('checked', true);
        $('input:radio[name=st1_faculta]').prop('checked', false);
        $('input:radio[name=st1_anuencia]').prop('checked', false);
    });
}


function ResumeLicenciaGiro(){
    //alert($('input:radio[name=st1_tipo_solicitante]:checked').val());
    switch($('input:radio[name=st1_tipo_solicitante]:checked').val()){
        case 'promotor':
            $('#seccionPromotor').show();
            $('#secRepresentante').show();
            $('.cont-identificacion-solicitante').hide();
        break;
        case 'arrendatario':
            $('#seccionArrendatario').show();
            $('#secRepresentante').hide();
            $('.cont-identificacion-solicitante').show();
        break;
        default:
            $('#secRepresentante').hide();
            $('#seccionArrendatario').hide();
            $('#seccionPromotor').hide();
            $('.cont-identificacion-solicitante').show();
        break;
    }

    if($('input:radio[name=st1_tipo_representante]:checked').val() == 'arrendatario'){
        $('#seccionArrendatario').show();
    }else{
        $('#seccionArrendatario').hide();
    }

    if($('input:radio[name=st1_tipo_carta_poder]:checked').val() == 'simple'){
        $('.anexoCartaPoder').show();
    }else{
        $('.anexoCartaPoder').hide();
    }

    if($('input:radio[name=st1_faculta]:checked').val() == 'n'){
        $('#seccionAnuencia').show();
    }else{
        $('#seccionAnuencia').hide();
        $('#seccionCartaAnuencia').hide();
    }

    if($('input:radio[name=st1_anuencia]:checked').val() == 'n'){
        alert ('hoña');
        errorLicenciaGiro();
        $('#seccionCartaAnuencia').hide();
    }else{
        unsetError();
        if($('input:radio[name=st1_anuencia]:checked').val() == 's'){
            $('#seccionCartaAnuencia').show();
        }

    }
}

function resumenLicenciaGiro(){
    $("#resumenIdentificacionSolicitante").remove();
    var resumen_isd = $('<div/>', {id: 'resumenIdentificacionSolicitante'}).appendTo('#resumen-container');
    resumen_isd.append('<h3>Identificación del solicitante</h3><br>');
    var RtipoSolicitante = $('<div/>', {addClass:'row'}).appendTo(resumen_isd);
    RtipoSolicitante.append('<div class="col-md-4">Tipo Solicitante: <b>'+capitalize($('input:radio[name=st1_tipo_solicitante]:checked').val().toLowerCase())+'</b></div>');
    if ($('input:radio[name=st1_tipo_solicitante]:checked').val() == 'promotor'){
        if ($('input:radio[name=st1_tipo_representante]:checked').val() == 'arrendatario'){
            des = 'Persona física/moral que está rentando el predio';
        }else{
            des = 'Persona física/moral que es dueña del predio';
        }
        RtipoSolicitante.append('<div class="col-md-8">Tipo Representante: <b>'+des+'</b></div>');


        resumen_isd.append('<br>');
        var RtipoCartaPoder = $('<div/>', {addClass:'row'}).appendTo(resumen_isd);
        RtipoCartaPoder.append('<div class="col-md-4">Tipo Carta Poder: <b>'+ capitalize($('input:radio[name=st1_tipo_carta_poder]:checked').val().toLowerCase()) +'</b></div>');
        RtipoCartaPoder.append('<div class="col-md-8">Carta Poder: <b><a href="http://192.168.66.93/licencia_giro/demo/carta_poder.pdf" target="_blank"><i class="fa fa-file-text" aria-hidden="true"></i> carta_poder.pdf</a></b></div>');
        if ($('input:radio[name=st1_tipo_carta_poder]:checked').val() == 'simple'){
            resumen_isd.append('<br>');
            var Rtestigos = $('<div/>', {addClass:'row'}).appendTo(resumen_isd);
            Rtestigos.append('<div class="col-md-4">Identificación del Otorgante: <b><a href="http://192.168.66.93/licencia_giro/demo/Identificacion.pdf" target="_blank"><i class="fa fa-user" aria-hidden="true"></i> identificaciion.pdf</a></b></div>');
            Rtestigos.append('<div class="col-md-4">Identificación Testigo 1: <b><a href="http://192.168.66.93/licencia_giro/demo/Identificacion.pdf" target="_blank"><i class="fa fa-user" aria-hidden="true"></i> identificaciion.pdf</a></b></div>');
            Rtestigos.append('<div class="col-md-4">Identificación Testigo 2: <b><a href="http://192.168.66.93/licencia_giro/demo/Identificacion.pdf" target="_blank"><i class="fa fa-user" aria-hidden="true"></i> identificaciion.pdf</a></b></div>');
        }
    }
    if ($('input:radio[name=st1_tipo_solicitante]:checked').val() == 'arrendatario' || $('input:radio[name=st1_tipo_representante]:checked').val() == 'arrendatario'){
        resumen_isd.append('<br>');
        var Rarrendamiento = $('<div/>', {addClass:'row'}).appendTo(resumen_isd);
        Rarrendamiento.append('<div class="col-md-5">Contrato de Arrendamiento: <b><a href="http://192.168.66.93/licencia_giro/demo/contrato_arrendamiento.pdf" target="_blank"><i class="fa fa-file-text" aria-hidden="true"></i> contrato_arrendamiento.pdf</a></b></div>');
        var Rfaculta = $('input:radio[name=st1_faculta]:checked').val() != 's'?'No':'Si'
        Rarrendamiento.append('<div class="col-md-7">¿El contrato de arrendamiento te faculta para abrir un negocio? <b>'+ Rfaculta +'</b></div>');
        if($('input:radio[name=st1_faculta]:checked').val() == 'n'){
            resumen_isd.append('<br>');
            var Ranuencia = $('<div/>', {addClass:'row'}).appendTo(resumen_isd);
            var RanuenciaDes = $('input:radio[name=st1_anuencia]:checked').val() != 's'?'No':'Si'
            Ranuencia.append('<div class="col-md-6">¿Cuentas con la anuencia del arrendador para abrir un negocio? <b>'+ RanuenciaDes +'</b></div>');
            Ranuencia.append('<div class="col-md-6">Carta de Anuencia: <b><a href="http://192.168.66.93/licencia_giro/demo/carta_anuencia.pdf" target="_blank"><i class="fa fa-file-text" aria-hidden="true"></i> carta_anuencia.pdf</a></b></div>');
        }
    }
    resumen_isd.append('<br><hr><br>');
    if ($('input:radio[name=st1_tipo_solicitante]:checked').val() == 'promotor'){
        resumen_isd.append('<h3>Datos del representante:</h3><br>');
        var Rrepresentante = $('<div/>', {addClass:'row'}).appendTo(resumen_isd);
        Rrepresentante.append('<div class="col-md-12">Nombre del Representante: <b>'+ $('input:text[name=st2_nombre_representante]').val()+'</b></div>');
        Rrepresentante.append('<br><br>');
        Rrepresentante.append('<div class="col-md-4">C.U.R.P.: <b>'+ $('input:text[name=st2_curp_representante]').val()+'</b></div>');
        Rrepresentante.append('<div class="col-md-4">R.F.C.: <b>'+ $('input:text[name=st2_rfc_representante]').val()+'</b></div>');
        Rrepresentante.append('<div class="col-md-4">Correo electrónico: <b>'+ $('input[name=st2_email_representante]').val()+'</b></div>');
        Rrepresentante.append('<br><br>');
        Rrepresentante.append('<div class="col-md-8">Domicilio: <b>'+ $('input:text[name=st2_domicilio_representante]').val()+'</b></div>');
        Rrepresentante.append('<div class="col-md-2">Num. Exterior: <b>'+ $('input:text[name=st2_num_ext_representante]').val()+'</b></div>');
        Rrepresentante.append('<div class="col-md-2">Num. Interior: <b>'+ $('input[name=st2_num_int_representante]').val()+'</b></div>');
        Rrepresentante.append('<br><br>');
        Rrepresentante.append('<div class="col-md-4">Colonia: <b>'+ $('input:text[name=st2_colonia_representante]').val()+'</b></div>');
        Rrepresentante.append('<div class="col-md-4">Ciudad: <b>'+ $('input:text[name=st2_ciudad_representante]').val()+'</b></div>');
        Rrepresentante.append('<div class="col-md-2">C.P.: <b>'+ $('input[name=st2_cp_representante]').val()+'</b></div>');
        Rrepresentante.append('<div class="col-md-2">Teléfono: <b>'+ $('input[name=st2_telefono_representante]').val()+'</b></div>');
        Rrepresentante.append('<br><br>');
        Rrepresentante.append('<div class="col-md-12">Identificación del Representante: <b><a href="http://192.168.66.93/licencia_giro/demo/Identificacion.pdf" target="_blank"><i class="fa fa-user" aria-hidden="true"></i> identificaciion.pdf</a></b></div>');
        resumen_isd.append('<br><hr><br>');
    }

    resumen_isd.append('<h3>Datos del solicitante:</h3><br>');
    var Rsolicitante = $('<div/>', {addClass:'row'}).appendTo(resumen_isd);
    Rsolicitante.append('<div class="col-md-12">Nombre del Representante: <b>'+ $('input:text[name=st2_nombre_solicitante]').val()+'</b></div>');
    Rsolicitante.append('<br><br>');
    Rsolicitante.append('<div class="col-md-4">C.U.R.P.: <b>'+ $('input:text[name=st2_curp_solicitante]').val()+'</b></div>');
    Rsolicitante.append('<div class="col-md-4">R.F.C.: <b>'+ $('input:text[name=st2_rfc_solicitante]').val()+'</b></div>');
    Rsolicitante.append('<div class="col-md-4">Correo electrónico: <b>'+ $('input[name=st2_email_solicitante]').val()+'</b></div>');
    Rsolicitante.append('<br><br>');
    Rsolicitante.append('<div class="col-md-8">Domicilio: <b>'+ $('input:text[name=st2_domicilio_solicitante]').val()+'</b></div>');
    Rsolicitante.append('<div class="col-md-2">Num. Exterior: <b>'+ $('input:text[name=st2_num_ext_solicitante]').val()+'</b></div>');
    Rsolicitante.append('<div class="col-md-2">Num. Interior: <b>'+ $('input[name=st2_num_int_solicitante]').val()+'</b></div>');
    Rsolicitante.append('<br><br>');
    Rsolicitante.append('<div class="col-md-4">Colonia: <b>'+ $('input:text[name=st2_colonia_solicitante]').val()+'</b></div>');
    Rsolicitante.append('<div class="col-md-4">Ciudad: <b>'+ $('input:text[name=st2_ciudad_solicitante]').val()+'</b></div>');
    Rsolicitante.append('<div class="col-md-2">C.P.: <b>'+ $('input[name=st2_cp_solicitante]').val()+'</b></div>');
    Rsolicitante.append('<div class="col-md-2">Teléfono: <b>'+ $('input[name=st2_telefono_solicitante]').val()+'</b></div>');
    resumen_isd.append('<br><hr><br>');

    resumen_isd.append('<h3>Datos del predio:</h3><br>');
    var Rpredio = $('<div/>', {addClass:'row'}).appendTo(resumen_isd);
    Rpredio.append('<div class="col-md-3">Clave Catastral: <b>'+ $('#claveCatastral').val()+'</b></div>');
    Rpredio.append('<br><br>');
    Rpredio.append('<div class="col-md-12">Actividad espesifica: <b>'+ $('input:text[name=descripcion_factibilidad]').val()+'</b></div>');
    Rpredio.append('<br><br>');
    Rpredio.append('<div class="col-md-12">Nombre del negocio: <b>'+ $('input:text[name=st3_nombre_establecimiento]').val()+'</b></div>');
    Rpredio.append('<br><br>');
    Rpredio.append('<div class="col-md-8">Domicilio: <b>'+ $('input:text[name=st3_domicilio_establecimiento]').val()+'</b></div>');
    Rpredio.append('<div class="col-md-2">Num. Exterior: <b>'+ $('input:text[name=st3_num_ext_establecimiento]').val()+'</b></div>');
    Rpredio.append('<div class="col-md-2">Letra Exterior: <b>'+ $('input:text[name=st3_letra_ext_establecimiento]').val()+'</b></div>');
    Rpredio.append('<br><br>');
    Rpredio.append('<div class="col-md-8">Colonia: <b>'+ $('input:text[name=st3_colonia_establecimiento]').val()+'</b></div>');
    Rpredio.append('<div class="col-md-2">Num. Interior: <b>'+ $('input:text[name=st3_num_int_establecimiento]').val()+'</b></div>');
    Rpredio.append('<div class="col-md-2">Letra Interior: <b>'+ $('input:text[name=st3_letra_int_establecimiento]').val()+'</b></div>');
    Rpredio.append('<br><br>');
    Rpredio.append('<div class="col-md-12">Especificaciones: <b>'+ $('input:text[name=st3_especificaciones_establecimiento]').val()+'</b></div>');
    Rpredio.append('<br><br>');
    Rpredio.append('<div class="col-md-3">Tipo de Edificacion: <b>'+ $('input:text[name=st3_edificio_plaza_establecimiento]').val()+'</b></div>');
    Rpredio.append('<div class="col-md-3">Num. Local: <b>#'+ $('input:text[name=st3_num_local_establecimiento]').val()+'</b></div>');
    Rpredio.append('<div class="col-md-3">Superficie Construida: <b>'+ $('input:text[name=st3_sup_construida_establecimiento]').val()+'mts.</b></div>');
    Rpredio.append('<div class="col-md-3">Area a utilizar: <b>'+ $('input:text[name=st3_area_utilizar_establecimiento]').val()+'mts.</b></div>');
    Rpredio.append('<br><br>');
    Rpredio.append('<div class="col-md-4">Inversión estimada: <b>$'+ $('input:text[name=st3_inversion_establecimiento]').val()+'</b></div>');
    Rpredio.append('<div class="col-md-4">Cajones Estacionamiento: <b>'+ $('input:text[name=st3_cajones_estacionamiento_establecimiento]').val()+'</b></div>');
    Rpredio.append('<div class="col-md-4">Num. Empleados: <b>'+ $('input:text[name=st3_empleados_establecimiento]').val()+'</b></div>');
    Rpredio.append('<br><br>');
    Rpredio.append('<div class="col-md-4">Fotografia Fachada: <b><a href="http://192.168.66.93/licencia_giro/demo/imagen1.jpg" data-lightbox="imagen establecimiento 1"> <i class="fa fa-picture-o" aria-hidden="true"></i> fotografia.jpg</a></b></div>');
    Rpredio.append('<div class="col-md-4">Fotografia puerta abierta: <b><a href="http://192.168.66.93/licencia_giro/demo/imagen2.jpg" data-lightbox="imagen establecimiento 2"> <i class="fa fa-picture-o" aria-hidden="true"></i> fotografia1.jpg</a></b></div>');
    Rpredio.append('<div class="col-md-4">Fotografia interior: <b><a href="http://192.168.66.93/licencia_giro/demo/imagen3.jpg" data-lightbox="imagen establecimiento 3"> <i class="fa fa-picture-o" aria-hidden="true"></i> fotografia2.jpg</a></b></div>');
    resumen_isd.append('<br><hr><br><br>');

    $('.cadenaFirmar').empty();
    var nombreFirmar = ($('input:radio[name=st1_tipo_solicitante]:checked').val() == 'promotor')?$('input:text[name=st2_nombre_representante]').val():$('input:text[name=st2_nombre_solicitante]').val();
    var primerApellidFirmar = ($('input:radio[name=st1_tipo_solicitante]:checked').val() == 'promotor')?$('input:text[name=st2_priper_apellido_representante]').val():$('input:text[name=st2_primer_apellido_solicitante]').val();
    var segundoApellidFirmar = ($('input:radio[name=st1_tipo_solicitante]:checked').val() == 'promotor')?$('input:text[name=st2_segundo_apellido_representante]').val():$('input:text[name=st2_segundo_apellido_solicitante]').val();
    var d = new Date();
    $('.cadenaFirmar').html('Nombre|=|'+nombreFirmar+'|+|Primer Apellido|=|'+primerApellidFirmar+'|+|Segundo Apellido|=|'+primerApellidFirmar+'|+|Tramite|=|'+$('#tramite').val()+'|+|Actividad|=|'+$('#descActividad').text()+'|+|Fecha|=|'+ d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear());
    //$('#firamarCadenaOriginal').html('Nombre|=|'+nombreFirmar+'|+|Primer Apellido|=|'+primerApellidFirmar+'|+|Segundo Apellido|=|'+primerApellidFirmar+'|+|Tramite|=|'+$('#tramite').val()+'|+|Actividad|=|'+$('#descActividad').text()+'|+|Fecha|=|'+ d.getDate()  + "/" + (d.getMonth()+1) + "/" + d.getFullYear());

}

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

function loadFile(element){
    el = $("#" + element.id);
    var file = document.getElementById(element.id).files[0];
    var data = new FormData();
    data.append('auth','50f14b34Sru81o#10830981');
    data.append('folio', $('#tramite').val());
    data.append('documento',file);
    data.append('name', el.data('type'));
    var contObj = el.parent();
    if (el.valid() == true) {
        $.ajax({
            type: 'POST',
            url: 'http://192.168.66.93/api/vu_up.php',
            contentType:false,
            data:data,
            processData:false,
            beforeSend:function(){
                $('#'+el.data('elastic')).css('margin','15px 0px');
                var circle = new ProgressBar.Line('#'+el.data('elastic'), {
                    color: '#8CBC5F',
                    easing: 'easeInOut'
                });

                circle.animate(1.0, {
                    duration: 900
                }, function() {
                   circle.destroy();
                    $('#'+el.data('elastic')).css('margin','0px');
                });


            },
            success:function(data){
                var serialized = eval("(" + data + ")");
                contObj.find('.link-to-file').remove();
                contObj.append('<a href="'+serialized.url+'" target="_blank" class="link-to-file"><i class="fa fa-file-text-o" aria-hidden="true"></i> '+el.data('text')+'</a>');
                updateFiles(el.data('type'), serialized.url ,$('#tramite').val()).done(function(data){
                });
            },
            error:function(){

            }
        });
    }
}

    function validateFirma(){
        if ($('#frmFirmar').valid()){
            var cer = document.getElementById('fleCER').files[0];
            var key = document.getElementById('fleKEY').files[0];
            var data = new FormData();
            data.append('id_tramite', $('#txtFirmaTramite').val());
            data.append('cadena_original', $('.cadenaFirmar').text());
            data.append('pass', $('#txtPassFIEL').val());
            data.append('cer',cer);
            data.append('key',key);
            $.ajax({
                type: 'POST',
                url: 'http://192.168.66.93/api/vu_firma.php',
                contentType:false,
                data:data,
                processData:false,
                beforeSend:function(){
                   /* $('#'+el.data('elastic')).css('margin','15px 0px');
                    var circle = new ProgressBar.Line('#'+el.data('elastic'), {
                        color: '#8CBC5F',
                        easing: 'easeInOut'
                    });

                    circle.animate(1.0, {
                        duration: 900
                    }, function() {
                        circle.destroy();
                        $('#'+el.data('elastic')).css('margin','0px');
                    });*/
                },
                success:function(data){
                    $('#txtPassFIEL').val('');
                    $('#txtPassFIEL').removeClass('mui--is-dirty mui--is-not-empty valid mui--is-touched');
                    $('#fleKEY').val('');
                    $('#fleCER').val('');
                    $('#firmaModal').modal('hide');
                    var sdata = eval("(" + data + ")");
                    if (sdata.status != 200){
                        $('#firma_electronica').empty();
                        $('#contMSGFirmaError').empty().append('<div class="alert alert-danger"><strong>Error: </strong>'+sdata.message+'</div>')
                    }else{
                        $('#contMSGFirmaError').empty();
                        $('#firma_electronica').empty().text(sdata.firma);
                    }
                },
                error:function(){

                }
            });
        }
    }
