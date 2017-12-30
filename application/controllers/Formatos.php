<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Formatos extends CI_Controller {
    function __construct()
    {
        parent::__construct();
        $this->load->library("Pdf");
        $this->load->helper('url');
        $this->load->model('LicenciasGiroModel');
        //$this->load->library('utils');
    }

    public function formaPagoLicencias()
    {
        $idTramite = $this->utils->decode($this->uri->segment(3, 0));
        $idUsuario = $this->utils->decode($this->uri->segment(4, 0));
        $licencia = $this->LicenciasGiroModel->getLicencia($idUsuario, $idTramite);


        date_default_timezone_set('America/Mexico_City');
        extract($_GET);
        $licencia = $this->LicenciasGiroModel->getLicencia($idUsuario, $idTramite);

        $tipolicencia = 'Tipo Licencia val';
        $nounico = 'NoUnico Val';
        $nocontrol = 'NoControl Val';
        $destinopredio = 'Destino Predio Val';
        $densidad = 'Densidad Val';
        $direccion = $licencia->predio_calle.', '.$licencia->predio_numero_ext.', '.$licencia->predio_numero_int;
        $entrecalles1 = 'Calle 1 Val';
        $entrecalles2 = 'Calle 2 Val';
        $colonia = $licencia->predio_colonia;
        $zona = 'Zona Val';
        $cuentapredial = $licencia->cuenta_predial;
        $clavecatastral = $licencia->clave_catastral;
        $diasconcedidos = 'Dias Concedidos Val';
        $nombre = $licencia->st2_nombre_solicitante;
        $direccion2 = $licencia->st2_domicilio_solicitante.', '.$licencia->st2_num_ext_solicitante.', '.$licencia->st2_num_int_solicitante;
        $colonia2 = $licencia->st2_colonia_solicitante;
        $zona2 = 'Zona 2 Val';

        //$detalle = $this->consultas->get_detalle_licencia_orden($id_licencia);

        /*if ($datos_licencia ) {


            $resumenAdeudos = '';

           foreach ($detalle as $detalles_array) {


                $resumenAdeudos = $resumenAdeudos .'
                <div class="divisor">
                    <div style="width:215px; float:left; height: 30px; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px;">
                        '.$detalles_array->Actividad.'
                    </div>
                    <div style="width:50px; float:left; height: 30px; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px;">
                        '.$detalles_array->Superficie.' '.$detalles_array->TipoCobro.'
                    </div>
                    <div style="width:50px; float:left; height: 30px; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px;">
                        '.number_format($detalles_array->Importe,2,".",",").'
                    </div>
                    <div style="width:40px; float:left; height: 30px; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px;">
                        '.$detalles_array->Porcentaje.'
                    </div>
                    <div style="width:50px; float:left; height: 30px; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px;">
                        '.number_format($detalles_array->ImporteDerecho,2,".",",").'
                    </div>
                    <div style="width:60px; float:left; height: 30px; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px;">
                        '.number_format($detalles_array->ImpuestoCosto,2,".",",").'
                    </div>
                    <div style="width:40px; float:left; height: 30px; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px;">
                        '.number_format($detalles_array->Impuesto,2,".",",").'
                    </div>
                    <div style="width:60px; float:left; height: 30px; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px;">
                        '.number_format($detalles_array->ImporteImpuesto,2,".",",").'
                    </div>
                    <div style="width:66px; float:left; height: 30px; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px;">
                        '.number_format($detalles_array->TotalActividad,2,".",",").'
                    </div>
                </div>';



            }*/




        $fileName = "licencia-construccion-guadalajara.pdf";
        $fileVentana = "Licencia de Construcción Guadalajara | Ayuntamiento de Guadalajara | Guadalajara - Gobierno Municipal";

        $fechaTitle = date("d/m/Y H:i");



        $html = '
    <style>
    ol, ul {
        text-align: justify;
    }

    .liste{
        list-style-type: disc;
    }

    .divisor{
        width:740px;
        float:left;
        font-size:9px;
    }

    .divisor11{
        width:740px;
        float:left;
        font-size:11px;
    }
    .divisor11bold{
        width:740px;
        float:left;
        font-size:12px;
        font-weight:bold;
    }
    </style>

    <div style="width:740px; float:left; font-size:9px !important;">
        <div class="divisor11" style="height:62px; font-weight:bold;">

            <div style="width:81px; height:66px; float:left">
                <img style="vertical-align: top" src="<?=base_url()?>assets/img/escudo-tesoreria.png" width="81px;" height="98px;"/>
            </div>

            <div style="width:236px; height:66px; float:left; padding-left:20px; color:#967BD2;">
                <p style="text-align:left; font-size:16px; margin-top:0px; margin-bottom:0px;">Municipio de Guadalajara</p>
                <p style="text-align:left; font-size:14px; margin-top:0px; margin-bottom:0px;">Tesorería Municipal</p>
                <p style="text-align:left; font-size:16px; margin-top:10px; margin-bottom:0px;">LICENCIAS DE CONSTRUCCIÓN</p>
            </div>

            <div style="width:282px; height:86px; float:left; text-align:center; padding: 0px 40px 0px 0px;">
                <div align="right" style="text-align:center; font-size:14px; color:#967BD2;">
                    <p style="text-align:center; font-size:16.5px; color:#7c858c;">
                        ORDEN DE PAGO TOTAL
                    </p>
                </div>
            </div>

            <div style="width:81px; height:66px; float:left">
                <img style="vertical-align: top" src="<?=base_url()?>assets/img/escudo-gdl.png" width="81px;" height="98px;"/>
            </div>
        </div>


        <div class="divisor11" style="margin-top: 10px;">
            <div style="width:206px; height: 15px; float:left; padding-top:15px; font-weight:bold;">
                <!--<img style="vertical-align: top" src="images/txt-info-predio.png" width="199px;" height="15px;" />-->
                INFORMACIÓN DE LICENCIA
                <!--RESUMEN DE ADEUDOS-->
            </div>
            <div style="width:226px; height: 30px; float:left; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Tipo Licencia</strong><br />
                '.$tipolicencia.'
            </div>
            <div style="width:135px; height: 30px; float:left; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>No. ÚNICO</strong><br />
                '.$nounico.'
            </div>
            <div style="width:136px; height: 30px; float:left; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>No. CONTROL</strong><br />
                '.$nocontrol.'
            </div>
        </div>

        <div class="divisor11">
            <div style="width:433px; float:left; height: 30px; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Destino Predio</strong><br />
                '.$destinopredio.'
            </div>
            <div style="width:282px; float:left; height: 30px; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Densidad</strong><br />
                '.$densidad.'
            </div>
        </div>
        <div class="divisor11">
            <div style="width:728px; height: 30px; float:left; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Dirección (Calle, No. Exterior, No. Interior)</strong><br />
                '.$direccion.'
            </div>
        </div>
        <div class="divisor11">
            <div style="width:728px; height: 30px; float:left; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Entre las  Calles</strong><br />
                '.$entrecalles1.' Y '.$entrecalles2.'
            </div>
        </div>
        <div class="divisor11">
            <div style="width:433px; float:left; height: 30px; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Colonia</strong><br />
                '.$colonia.'
            </div>
            <div style="width:282px; float:left; height: 30px; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Zona</strong><br />
                '.$zona.'
            </div>
        </div>


        <div class="divisor11" style="margin-top: 20px;">
            <div style="width:296px; height: 15px; float:left; padding-top:15px; font-weight:bold;">
                <!--<img style="vertical-align: top" src="images/txt-info-predio.png" width="199px;" height="15px;" />-->
                INFORMACIÓN DEL PROPIETARIO
                <!--RESUMEN DE ADEUDOS-->
            </div>
            <div style="width:136px; height: 30px; float:left; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Cuenta Predial</strong><br />
                '.$cuentapredial.'
            </div>
            <div style="width:135px; height: 30px; float:left; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Clave Catastral</strong><br />
                '.$clavecatastral.'
            </div>
            <div style="width:136px; height: 30px; float:left; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Días Concedidos</strong><br />
                '.$diasconcedidos.'
            </div>
        </div>

        <div class="divisor11">
            <div style="width:728px; height: 30px; float:left; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Nombre</strong><br />
                '.$nombre.'
            </div>
        </div>
        <div class="divisor11">
            <div style="width:728px; height: 30px; float:left; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Dirección (Calle, No. Exterior, No. Interior)</strong><br />
                '.$direccion2.'
            </div>
        </div>
        <div class="divisor11">
            <div style="width:433px; float:left; height: 30px; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Colonia</strong><br />
                '.$colonia2.'
            </div>
            <div style="width:282px; float:left; height: 30px; background-color: #ffffff; border-radius: 2mm; border:1px solid #000000; text-align:left; padding:0px 5px 0px 5px;">
                <strong>Zona</strong><br />
                '.$zona2.'
            </div>
        </div>

        <div class="divisor11">
            <div style="width:740px; height:auto; float:left; vertical-align:middle; text-align:left;">
            <br>
                <p style="color:#967BD2;">
                    <strong>*La presente Orden de Pago únicamente avala la aplicación de tarifas establecidas en la Ley de Ingresos, no implica la autorización de la Licencia de Construcción, sólo el cumplimiento de uno de los requisitos para la expedición de la misma, la cual quedará sujeta al cumplimiento de toda la Normatividad establecida en las Leyes,  Reglamentos, Programas Municipales y Estatales que sobre el Desarrollo Urbano rigen al Municipio, así como al pago referido.</strong>
                </p>
                <p>
                    <strong>** Estimado usuario, al recibir la orden de pago es su obligación verificar que los datos asentados en ella sean los correctos y antes de realizar el pago deberá solicitar la aclaración de las tarifas aplicadas si existieran dudas de su parte.</strong>
                </p>
            </div>
        </div>
        <div class="divisor">
            <div style="width:215px; float:left; height: 30px; background-color: #ffffff; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px;">
                <strong>Detalle de la obra</strong>
            </div>
            <div style="width:50px; float:left; height: 30px; background-color: #BDBDBD; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px; color: #ffffff;">
                <strong>Superficie / Cantidad</strong>
            </div>
            <div style="width:50px; float:left; height: 30px; background-color: #BDBDBD; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px; color: #ffffff;">
                <strong>Tarifa</strong>
            </div>
            <div style="width:40px; float:left; height: 30px; background-color: #BDBDBD; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px; color: #ffffff;">
                <strong>%</strong>
            </div>
            <div style="width:50px; float:left; height: 30px; background-color: #BDBDBD; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px; color: #ffffff;">
                <strong>Importe Derechos</strong>
            </div>
            <div style="width:60px; float:left; height: 30px; background-color: #585858; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px; color: #ffffff;">
                <strong>Valor Construcción</strong>
            </div>
            <div style="width:40px; float:left; height: 30px; background-color: #585858; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px; color: #ffffff;">
                <strong>%</strong>
            </div>
            <div style="width:60px; float:left; height: 30px; background-color: #585858; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px; color: #ffffff;">
                <strong>Importe Impuestos</strong>
            </div>
            <div style="width:66px; float:left; height: 30px; background-color: #000000; border:1px solid #000000; text-align:center; padding:0px 5px 0px 5px; color: #ffffff;">
                <strong>Importe Total</strong>
            </div>
        </div>
        '.'detalle?????????????'.'
        <div style="width:740px; height: auto; float:left;">
            <div style="width:434px; float:left; height: auto; padding:5px;">
                <p>ART. 101 DEL REGLAMENTO DE GESTIÓN DEL DESARROLLO PARA EL MUNICIPIO DE GUADALAJARA.
                <br>
                1.  El otorgamiento de las licencias causa los derechos a que se refieren la Ley de Ingresos. En caso de que habiéndose solicitado el otorgamiento hubiere quedado pendiente de expedirse la licencia por falta de pago de tales derechos por un término mayor de treinta días hábiles, se entiende, por parte de la Secretaría de Obras Publicas, por desistido el interesado de la solicitud de construcción para todos los efectos legales.</p>
            </div>
            <div style="width:293px; float:left; height:auto; background-color: #ffffff; border:1px solid #000000; text-align:right;">
                <div style="width:147px; float:left; height: auto; text-align:right;">
                    <strong><span style="font-weight:bold; font-size:10px;">Total</span></strong><br />
                    <strong><span style="color:#B5121B; font-weight:bold; font-size:11px;">Ajuste Art. 04 Ley de Ingresos</span></strong>
                </div>
                <div style="width:135px; float:left; height: auto; text-align:right; padding:0px 5px 0px 5px;">
                    $ '.number_format(2,2,".",",").'<br />
                    <span style="color:#B5121B; font-weight:bold; font-size:12px;">$ '.number_format(2,2,".",",").'</span>
                </div>

            </div>
        </div>

        <div class="divisor">
            <div style="width:740px; height:auto; float:left; vertical-align:middle; text-align:center; font-size:14px;">
                <p style="color:#967BD2;text-align:center;">
                    <strong>Esta orden de pago sólo serán válidas hasta la fecha Límite señalada a continuación:</strong>
                </p>
            </div>
        </div>

        <div class="divisor11bold">
            <div style="width:740px; height:auto; float:left; vertical-align:middle; text-align:right;">
                <strong>Fecha Límite de Pago: '. 'assdfsd' .'</strong>
            </div>
        </div>

        <div class="divisor11bold">
            <div style="width:740px; height:auto; float:left; vertical-align:middle; text-align:left;">
                <p>
                    <strong>Fecha de Impresión: '.$fechaTitle.' hrs.</strong>
                </p>
            </div>
            <barcode code="'.'assdfsd'.'" size=".90" type="C128A" error="M" class="barcode" />
        </div>


    </div>
    ';


        $mpdf=new mPDF('utf-8','Letter','','',10,10,5,0,0,0);

        $mpdf->setAutoTopMargin = 'stretch';
        $mpdf->setAutoBottomMargin = 'stretch';


        $mpdf->displayDefaultOrientation = true;

        $mpdf->forcePortraitHeaders = true;
        $mpdf->forcePortraitMargins = true;

        $mpdf->SetTitle($fileVentana);
        $mpdf->SetAuthor('Ayuntamiento de Guadalajara');
        $mpdf->SetCreator('Coordinación de Tecnologías de la Información | Tesorería');
        $mpdf->SetSubject($fileVentana);
        $mpdf->SetKeywords('Pago en linea impuesto municipal Guadalajara, Pago web impuesto municipal Guadalajara, Pago internet impuesto municipal Guadalajara');
        $mpdf->SetProtection(array('copy','print'), '', 'MeMo');
        $mpdf->SetDisplayMode('fullpage');

        $mpdf->mirrorMargins = 0;

        //$stylesheet = file_get_contents('assets/css-formato/mpdfstyletables.css');
        $stylesheet = file_get_contents('assets/css-formato/mpdfstyleA4.css');
        //$stylesheet = file_get_contents('assets/css-formato/mpdfstylePaged.css');

        //$mpdf->setHTMLHeader($html_head_body_1);
        //$mpdf->setHTMLHeader($html_head_page_1);
        $mpdf->SetHTMLFooter($footerTabla_1);

        $mpdf->WriteHTML($stylesheet,1);

        $mpdf->WriteHTML($html);


        //$mpdf->WriteHTML($html_page_3);

        $mpdf->Output($fileName,'I');

        exit;


    }

    public function licencia_pdf(){
       extract($_GET);
       $idTramite = $this->utils->decode($lic);
       $idUsuario = $this->utils->decode($usu);
       $licencia = $this->LicenciasGiroModel->getLicencia($idUsuario, $idTramite);
       $no_licencia=$licencia->clave_factibilidad;
       $actividad = $licencia->descripcion_factibilidad;
       $cajones_estacionamiento="0";
       $aforo_personas="0";
       $superficie="16";
       $horario="";
       $fecha_sesion="";
       $calle = $licencia->st3_domicilio_establecimiento;
       $no_ext = $licencia->st3_num_ext_establecimiento;
       $col = $licencia->st3_colonia_establecimiento;
       $clave_catastral = $licencia->clave_catastral;
       $no_int = $licencia->st3_num_int_establecimiento;
       $zona="4-4";
       $nombre = $licencia->st2_nombre_solicitante;
       $rfc = $licencia->st2_rfc_solicitante;
       $curp = $licencia->st2_curp_solicitante;
       $concepto="IMPRESOS 2017-2017 FORMA DE SOLICITUD";
       $importe="392.00";
       $pago="EFECTIVO";
       $total="427.00";
       $fechaTitle = date("d/m/Y H:i");

       $html ='<html>
       <head>
           <style>
               body{
                 font-family: exo;
               }
               .titulo{
                   text-align: center;
                   color:#919191;
                   font-size: 30px;
               }
               .subtitulos{
                   text-align: center;
                   background: #969696;
                   color: #fff;
                   font-weight: bold;
                   border-radius: 5px;
               }
               .subtitulos_sub{
                   text-align: center;
                   background: #969696;
                   color:#fff;
                   font-weight: bold;
                   border-radius: 4px;
                   font-size: 12px;
               }
               .margen_principal{
                   margin-top: 50px;
               }
               .margen_titulo{
                   margin-top: 100px;
               }
               .margen_30{
                   margin-top: 30px;
               }
               .margen_15{
                   margin-top: 15px;
               }
               .margen_20{
                   margin-top: 20px;
               }
               .separador_20{
                   margin-left:40px;
               }
               .tamano_14{
                   font-size: 14px;
               }
               .tamano_12{
                   font-size: 12px;
               }
               .tamana_10{
                   font-size: 8px;
               }

           </style>
       </head>
       <body>
           <div style="position:absolute; left:60px; top:4%; width:20%;">
               <img src="assets/logo-padron.png" alt="">
           </div>
           <div  style="position:absolute; left:160px; top:7%; text-align:center; width:60%;  color:#C40E91; font-size: 25px;">
               <span class="subrayado">LICENCIA MUNICIPAL</span>
           </div>
           <div style="position:absolute; right:10%; top:3%; width: 8%">
               <img src="assets/gdl-logo.png" alt="">
           </div>
           <div style="position:absolute; top:100px; width:85%; height:100%;  background-image: url(assets/logo-GDL-licencia.png); background-size:80%; background-repeat: no-repeat;  background-position: 50% 30%;">
               <div>
                   <div class="margen_principal" style="width:30%;">
                       <span style="font-weight: 500; float: right; font-size: 12px">NUEVA LICENCIA <span class="separador_20" style="font-weight: bold; font-size: 18px; margin-top:10px;">'.$no_licencia.'</span></span>
                   </div>
                   <br>
                   <div class="subtitulos" style="width:30%; font-size: 12px;">
                       <span>DATOS DEL GIRO</span>
                   </div>
               </div>
               <div class="margen_30">
                   <div class="tamano_14" style="width:100%; font-weight:bold;">
                         Actividad: &nbsp;'.$actividad.'
                   </div>

                   <div class="tamano_12">
                       <span>Cajones de estacimiento: '.$cajones_estacionamiento.'</span>
                       <span class="separador_20">Aforo de personas: '.$aforo_personas.' </span>
                       <span class="separador_20">Superficie Autorizadas: '.$superficie.' </span>
                       <span class="separador_20">Horario: '.$horario.'</span>
                   </div>
                   <div class="tamano_12">
                       <span>Fecha Sesión: '.$fecha_sesion.'</span>
                   </div>
                   <div class="tamano_12 margen_20">
                       OBLIGATORIO CONTAR CON CONTRATO DE RECOLECCIÓN DE RESIDUOS O DICTAMEN DE MICROGENERADOR
                       EMITIDO POR LA DIR DE MEDIO AMBIENTE Y CONTENEDORES CLASIFICADOS PARA LOS RESIDUOS
                   </div>
                   <div>
                       <div class="subtitulos_sub margen_15" style="width: 30%; float:left; margin-top: 20px;">
                           UBICACIÓN
                       </div>
                       <div class="subtitulos_sub" style="width: 30%; float:right;" >
                           CONTRIBUYENTE
                       </div>
                   </div>
                   <div class="tamano_12 margen_15">
                       <div style="width: 40%; float: left;">
                           Calle: '.$calle.'<br>
                           No Ext: '.$no_ext.'<br>
                           Colonia: '.$col.'<br>
                           Cve Catastral: '.$clave_catastral.'
                       </div>
                       <div style="width: 20%; float: left;">
                          No. Int: '.$no_int.'<br>
                          Zona: '.$zona.'
                       </div>
                       <div style="width: 30%; float: right; margin-left: 10%;">
                           Nombre: '.$nombre.'<br>
                           RFC: '.$rfc.'<br>
                           CURP: '.$curp.'
                       </div>
                   </div>

                   <div class="margen_15">
                       <div class="subtitulos_sub" style="width: 30%; float: left;">
                           LICENCIA
                       </div>
                       <div  style="width: 5%; float: left;">
                           &nbsp;
                       </div>
                       <div class="subtitulos_sub" style="width: 30%; float:left;">
                          CONCEPTO
                       </div>
                       <div class="subtitulos_sub" style="width: 30%; float:right;">
                          IMPORTE
                       </div>
                   </div>

                   <div class="tamano_12 margen_15">
                       <div style="width: 30%; float: left;">
                          '.$no_licencia.'
                       </div>
                       <div  style="width: 5%; float: left;">
                          &nbsp;
                       </div>
                       <div style="width: 30%; float: left;">
                           '.$concepto.'
                       </div>
                       <div style="width: 30%; float: right; text-align: right;">
                           '.$importe.' <br>
                           35.00
                       </div>
                   </div>

                   <div class="tamano_12 margen_15">
                       <div style="width: 30%; float: left;">
                          (Cuatrocientos Veintisiete Pesos 00/100 M.N.)
                       </div>
                       <div  style="width: 5%; float: left;">
                          &nbsp;
                       </div>
                       <div style="width: 30%; float: left;">
                           <b>PAGO EN: '.$pago.'</b>
                       </div>
                       <div style="width: 30%; float: right; text-align: right;">
                           <b>'.$total.'</b>
                       </div>
                   </div>
                   <div>
                       <div style="width: 30%; float: left;">
                          &nbsp;
                       </div>
                       <div  style="width: 5%; float: left;">
                          &nbsp;
                       </div>
                       <div style="width: 30%; float: left;">
                         &nbsp;
                       </div>
                       <div style="width: 30%; float: right; text-align: right;">
                           <br>
                           <barcode code="'.$no_licencia.'" type="QR" class="barcode" size="1.5"  style="border:none;"/><br>
                       </div>
                   </div>
                   <!--div>
                       <div style="width: 30%; float: left;">
                          &nbsp;
                       </div>
                       <div  style="width: 5%; float: left;">
                          &nbsp;
                       </div>
                       <div style="width: 30%; float: left;">
                         &nbsp;
                       </div>
                       <div class="tamana_10" style="width: 30%; text-align: center; margin-left:80%;">
                           <span>2 ch 20501 20/10/2017 13:59 <br> 4413188 425872 427.00 6062617</span><br>
                           <span>Adriana Robles Bustos</span>
                       </div>
                   </div-->
               </div>
           </div>


           <div style="position:absolute; bottom:22%; text-align: center; font-size: 12px;">
               <b>
                   LIC. DAGOBERTO CALDERÓN LEAL<br>
                   Director de Padrón y Licencias <br>
                   CURP: <br>
                   E-MAIL: <br>
                   Periodo de vigencia de la firma elctrónica:
               </b>
           </div>
           <div style="position:absolute; bottom:13%; text-align: left; font-size: 10px; width: 45%; border-right: solid #000000 1px">
              <div>
                   <b>
                       EXPEDIDO EN: <br>
                       DATOS DEL PRESTADOR DE SERVICIOS DE CERTIFICACIÓN: <br>
                       TECNOLOGÍA IMPLEMENTADA PARA LA CRECIÓN DE LAS FIRMAS: <br>
                       NÚMERO DE SERIE: <br>
                       AUTORIDAD CERTIFICADORA QUE LO EMITIÓ: <br>
                   </b>
               </div>
           </div>
           <div style="position:absolute; bottom:12%; right:7%; text-align: left; font-size: 10px;">
              <div style="border-left: #0d1318 solid 1px;">
                  <div style="margin-left: 10px;">Guadalajara, Jalisco, el día '.$fechaTitle.'</div><br><br><br><br>
                  <div style="margin-left: 10px;">SECRETARIA GENERAL DE GOBIERNO DEL ESTADO DE JALISCO</div>
              </div>
           </div>
           <div style="position:absolute; bottom:7%; text-align: left; font-size: 10px; width: 85%">
               <b>EL PRESENTE ACTO ADMINISTRATIVO CUENTA CON PLENA VALIDEZ, EFICACIA JURÍDICA Y OBLIGATORIEDAD DESDE LA FECHA DE SU EMISIÓN Y/O NOTIFICACIÓN TANTO PARA LOS PARTICULARES
               COMO PARA LAS AUTORIDADES</b>
           </div>
       </body>
       </html>';
       $this->pdf->WriteHTML($html);
       $this->pdf->AddPage();
       $html2 = '<html>
       <head>
           <style>
               body{
                   font-size: 11px;
               }
              .cuadro_principal{
                   border:solid 1px #b1b1b1;
                   text-align: justify;
              }
              .margen_2_p{
                   margin:2%;
              }
              .tamano_12{
                   font-size: 12px;
              }
              .margen_10_top{
                 margin-top: 5%;
              }
           </style>
       </head>
       <body>
          <div class="cuadro_principal">
               <div class="margen_2_p">
                   Hoy, más que nunca <b> Guadalajara necesita de tu participación y compromiso.</b> Te invitamos a respetar y
                   cumplir los reglamentos, el respeto a los mismos es el respeto a la ciudadania. Recuerda que el
                   desconocimiento de los mismos no nos exime de responsabilidad. A continuación hacemos mención de
                   algunos de los aspectos que debes tener muy presentes para el buen funcionamiento de tu giro.
               </div>
          </div>
          <div>
              <table class="margen_10_top">
                   <tr>
                       <td style="width: 35%">
                           <br>
                           <b>SON MOTIVOS DE CLAUSURA:</b>
                       </td>
                       <td style="width: 65%; padding-left: 15px">
                           <br>
                           <b>EL REFRENDO, BAJA, MODIFICACIONES Y TRASPASOS DE LICENCIAS.</b>
                       </td>
                   </tr>
                   <tr >
                       <td valign="top">
                           <br><br>
                           <b>A. </b>CARECER DE LA LICENCIA MUNICIPAL. <br>
                           <b>B. </b>OPERAR UNA ACTIVIDAD DISTINTA A LA MANIFESTADA EN LA LICENCIA. <br>
                           <b>C. </b>FUNCIONAR FUERA DEL HORARIO PERMITIDO. <br>
                           <b>D. </b>LA VENTA Y/O CONSUMO DE BEBIDAS ALCOHÓLICAS FUERA DE LO ESTABLECIDO EN LA LEY. <br>
                           <b>E. </b>QUE SE COMETAN DELITO CONTRA LA SALUD, LA VIDA O LA INTEGRIDAD FÍSICA DE LAS PERSONAS DENTRO DEL ESTABLECIMIENTO.<br>
                           <b>F. </b>COLOCAR ANUNCIOS SOBRE LA VÍA PÚBLICA. <br>
                           <b>G. </b>OBSTRUIR EL PASO PEATONAL. HACIENDO USO DE LA VÍA PÚBLICA SIN AUTORIZACIÓN.<br>
                           <b>H. </b>EXCEDER EL AFORO AUTORIZADO. <br>
                           <b>I. </b>EXCEDER CON EMISIONES DE RUIDO. NORMA AMBIENTAL NOM-081-SEMARNAT-94 DE DECIBELES. <br>
                           <b>J. </b>DESCARGA DE RESIDUOS NOCIVOS A LA RED MUNICIPAL. <br>
                           <b>K. </b>OPERAR MÁQUINAS DE JUEGOS DE AZAR. <br>
                           <b>L. </b>QUE LOS DOCUMENTOS Y DATOS PROPORCIONADOS EN LA PLATAFORMA SEAN FALSOS. <br>
                           <br><br><br><br>
                           <div>
                               DENUNCIA LAS ACTUACIONES <br>
                               IRREGULARES DE LOS FUNCIONARIOS <br>
                               MUNICIPALES A LA DIRECCIÓN DE <br>
                               RESPONSABILIDADES <br>
                               5 DE FEBRERO 248, UNIDAD <br>
                               ADMINISTRATIVA REFORMA <br>
                               TELÉFONOS: 15931569 Y 33348676 <br>
                               HORARIO: 09:00 A 17:00
                           </div>
                       </td>
                       <td valign="top" style="padding-left: 15px">
                           <br><br>
                           La licecia municipal deberá estar en un sitio visible. <br><br>
                           El <b>refrendo</b> de la licencia municipal es anual y deberá ser realizado durante los primeros dos meses del año fiscal correspondiente. <br><br>
                           En caso de que el negocio deje de operar, el titular de la licencia deberá <b>presentar aviso de baja </b>
                           ante de la Dirección de Padrón y licencias. <br><br>
                           Para realizar <b>traspaso y/o modificaciones en la licencia, </b>se deberá acudir a las oficinas de Padrón y Licencias para su debida autorización. <br><br>
                           <b>EL ESTABLECIMIENTO: MEDIO AMBIENTE, IMAGEN, ORDEN Y SEGURIDAD</b>. <br><br>
                           <li>Mantener una imagen <b>ordenada</b> y limpia en el exterior del establecimiento.</li> <br><br>
                           <li>Contar con las medidas en materia de <b>seguridad</b> y protección civil.</li> <br><br>
                           <li>Permitir el ingreso al personal autorizado por el Ayuntamiento, asi como proporcionarles la documentación requerida para el desarrollo de sus funciones.</li> <br><br>
                           <li>Acatar las disposiciones establecidas en el reglamento de <b>anuncios</b>.</li> <br><br>
                           <li>Queda prohibida la instalación de los <b>anuncios eventuales tipo pendón</b> en todo el Municipio de Guadalajara, de acuerdo al Articulo 39, del Reglamento de Anuncios para el Municipio de Guadalajara.</li><br><br><br><br>
                       </td>
                   </tr>
                   <tr>
                       <td></td>
                       <td style="text-align: center;">
                           <b>ADOPTA UN ESPACIO VERDE, RESPETA EL ESPACIO PÚBLICO</b>
                       </td>
                   </tr>
              </table>
          </div>
       </body>
       </html>';

       $this->pdf->WriteHTML($html2);
       $this->pdf->Output('Licencia_Municipal.pdf', 'I');
   }

   public function acuse_envio(){
       $dependencia="xxxxxx";
       $folio="xxxx";
       $tipo_asunto="xxxxxxxxx";
       $rfc="xxxxxxxxxx";
       $curp="xxxxxxxxxxxxx";
       $fecha_envio="xxxx-xx-xx";
       $hora_envio="xx:xx";
       $observaciones="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

       $html='<html>
       <head>
           <style>
               body{
                   font-size: 12px;
               }
               .margen_top_20{
                   margin-top: 20px;
               }
               .cuadro{
                   margin: 15px;
                   margin-bottom: 10px;
               }
           </style>
       </head>
       <body>
           <div style="position:absolute; top:20px; left:55px; width:10%;">
               <img src="assets/escudo-gdl.png" alt="">
           </div>
           <div style="position:absolute; top:8%; left:20px; width:90%;">
               <div style="text-align:center;  font-weight:bold; font-family: DejaVuSansCondensed-Bold;">
                   <span class="subrayado">Plataforma Visor Urbano del Municipio de Guadalajara, Jalisco</span><br><br>
                   <span>Acuse de Envío de Documentos.</span>
               </div>
           </div>
           <div style="position:absolute; top:30px; right:45px; width: 18%">
               <img src="assets/logo.png" alt="">
           </div>
           <div style="position:absolute; top:15%;">
               <div class="margen_top_20">
                   Dependencia receptora: '.$dependencia.'
               </div>
               <div class="margen_top_20">
                   Folio de recepción: '.$folio.'
               </div>
               <div class="margen_top_20">
                   Tipo de Asunto: '.$tipo_asunto.'
               </div>
               <div class="margen_top_20">
                   Registro Federal de Contribuyentes: '.$rfc.'
               </div>
               <div class="margen_top_20">
                   CURP: '.$curp.'
               </div>
               <div class="margen_top_20">
                   Fecha de envío: '.$fecha_envio.'
               </div>
               <div class="margen_top_20">
                   Hora de envío: '.$hora_envio.'
               </div>
               <div class="margen_top_20">
                   Observaciones: '.$observaciones.'
               </div>
               <div class="margen_top_20" style="border:solid 1px #000000; width:98%;">
                   <div class="cuadro">
                       <div class="margen_top_20">
                           Con evidencia criptográfica de firma electrónica de (nombre de la persona que firma).
                       </div>
                       <div class="margen_top_20">
                           (Puede tener alguna otra anotación de la plataforma);
                       </div>
                       <div class="margen_top_20" style="margin-bottom:20px;">
                           <b>El documento debe de contener caracteres de autenticidad del acuse.</b>
                       </div>
                       <div class="margen_top_20" style="margin-bottom:20px;">
                            &nbsp;
                       </div>
                   </div>
               </div>
               <div class="margen_top_20">
                   Nombre de los archivos enviados:
               </div>
               <div class="margen_top_20" style="border:solid 1px #000000; width:98%;">
                   <div class="cuadro">
                       <ul>
                           <li>(Nombre y tamaño de los archivos que se acompañen al formato electrónico del trámite y caracteres de autenticidad que garanticen la fiabilidad de los mismos;)</li>
                           <li>a</li>
                           <li>a</li>
                       </ul>
                       <div class="margen_top_20" style="margin-bottom:20px;">
                            &nbsp;
                       </div>
                   </div>
               </div>
           </div>
           <div style="position:absolute; bottom: 10px; font-size: 10px;">
               <div style="text-align: center; margin-left:30%; border:solid 1px #000000; width:40%;">
                   <div class="cuadro">
                       <div class="margen_top_20" style="margin-bottom:20px;">
                           Portal Visor Urbano del Ayuntamiento de <br>
                           Guadalajara, Jalisco.
                       </div>
                       <div class="margen_top_20" style="margin-bottom:20px;">
                           <h1>Recibido</h1>
                       </div>
                       <div class="margen_top_20" style="margin-bottom:20px;">
                           Fecha y Hora
                       </div>
                       <div class="margen_top_20" style="margin-bottom:20px;">
                            &nbsp;
                       </div>
                   </div>
               </div>
               <div style="text-align: justify; width: 95%; margin-top:15px;">
                   El presente acuse se emite con fundamento en los artículos 20 fracción IV del Reglamento del
                   Acto y del Procedimiento Administrativo del Municipio de Guadalajara, Jalisco, 13 del
                   Reglamento del Uso de Medios Electrónicos del Ayuntamiento de Guadalajara, octavo fracción
                   X de las Disposiciones Administrativas que contienen las Reglas para la Realización de Trámites
                   Electrónicos en Materia de Desarrollo Urbano del Municipio de Guadalajara
               </div>
           </div>
       </body>
       </html>';
       $this->pdf->WriteHTML($html);
       $this->pdf->Output('Acuse_envio.pdf', 'I');
   }

   public function orden_pago(){
       extract($_GET);
       $idTramite = $this->utils->decode($lic);
       $idUsuario = $this->utils->decode($usu);
       $licencia = $this->LicenciasGiroModel->getLicencia($idUsuario, $idTramite);
       $no_licencia=$licencia->clave_factibilidad;
       $actividad = $licencia->descripcion_factibilidad;
       $cajones_estacionamiento="0";
       $superficie="16";
       $calle = $licencia->st3_domicilio_establecimiento;
       $no_ext = $licencia->st3_num_ext_establecimiento;
       $col = $licencia->st3_colonia_establecimiento;
       $no_int = $licencia->st3_num_int_establecimiento;
       $nombre = $licencia->st2_nombre_solicitante;
       $rfc = $licencia->st2_rfc_solicitante;
       $curp = $licencia->st2_curp_solicitante;
       $fechaTitle = date("d/m/Y H:i");
       $vacio="&nbsp;";
       $html='<html>
       <head>
           <style>
                body{
                    font-family: exo;
                    font-size:12px;
                }
                table {
                    border-collapse: collapse;
                }

                table, th, td {
                    border: 1px solid black;
                }
           </style>
       </head>
       <body>
           <div style="position:absolute; left:60px; top:3%; width:8%;">
               <img src="assets/gdl-logo.png" alt="">
           </div>
           <div  style="position:absolute; left:17%; top:4%; text-align:left; font-weight:bold; width:40%;  color:#AC58FA; font-size: 15px;">
               <span>MUNICIPIO DE GUADALAJARA</span> <br>
               <span style="font-size:10px;">TESORERÍA MUNICIPAL</span> <br><br>
               <span>LICENCIA MUNICIPAL</span>
           </div>
           <div  style="position:absolute; right:12%; top:4%; text-align:center; font-weight:bold; width:40%;  color:gray; font-size: 15px;">
               <span>ORDEN DE PAGO TOTAL</span>
           </div>
           <div style="position:absolute; right:10%; top:3%; width: 8%">
               <img src="assets/gdl-logo.png" alt="">
           </div>
           <div style="position:absolute; top:12%; text-align:center; width:84%;">
                 <div>
                    <div style="float:right; width:25%; border:solid 1px #000; border-radius:5px;">
                        <b>FOLIO</b><br>
                        01122017
                     </div>
                     <div style="float:right; width:25%; border:solid 1px #000; border-radius:5px;">
                         <b>FECHA DE RECEPCIÓN</b><br>
                         01/12/2017
                     </div>
                     <div style="float:right; width:30%; border:solid 1px #000; border-radius:5px;">
                         <b>FECHA LIMITE DE PAGO</b><br>
                         01/12/2017
                     </div>
                 </div>
                 <div>
                    <div style="text-align:left; float:right; width:99.8%; border:solid 1px #000; border-radius:5px;">
                        <div style="margin-left:10px;">
                            <b>NOMBRE DEL CONTRIBUYENTE</b><br>
                            '.(empty($nombre)?$vacio:$nombre).'
                         </div>
                     </div>
                 </div>
                 <div>
                     <div style="text-align:left; float:left; width:60%; border:solid 1px #000; border-radius:5px;">
                        <div style="margin-left:10px;">
                            <b>DOMICILIO</b><br>
                            '.(empty($calle)?$vacio:$calle).' '.(empty($col)?$vacio:$col).'
                        </div>
                     </div>
                     <div style="text-align:center; float:left; width:20%; border:solid 1px #000; border-radius:5px;">
                        <b>NO. EXT.</b><br>
                        '.(empty($no_ext)?$vacio:$no_ext).'
                     </div>
                     <div style="text-align:center; float:right; width:19%; border:solid 1px #000; border-radius:5px;">
                        <b>NO. INT.</b><br>
                        '.(empty($no_int)?$vacio:$no_int).'
                     </div>
                 </div>
                 <div>
                    <div style="text-align:left; float:right; width:99.8%; border:solid 1px #000; border-radius:5px;">
                        <div style="margin-left:10px;">
                            <b>ACTIVIDAD</b><br>
                            '.(empty($actividad)?$vacio:$actividad).'
                        </div>
                     </div>
                 </div>
                 <div>
                     <div style="text-align:center; float:left; width:33%; border:solid 1px #000; border-radius:5px;">
                        <b>NO. CAJONES</b><br>
                        '.(empty($cajones_estacionamiento)? $vacio : $cajones_estacionamiento).'
                     </div>
                     <div style="text-align:center; float:left; width:33%; border:solid 1px #000; border-radius:5px;">
                        <b>SUPERFICIE AUTORIZADA</b><br>
                        '.(empty($superficie)?$vacio:$superficie).'
                     </div>
                     <div style="text-align:center; float:right; width:33%; border:solid 1px #000; border-radius:5px;">
                        <b>FOLIO FICHA</b><br>
                        263982
                     </div>
                 </div>
                 <div>
                    <div style="text-align:left; float:right; width:99.8%; border:solid 1px #000; border-radius:5px;">
                        <div style="margin-left:10px;">
                            <b>LICENCIA QUE SE AUTORIZA</b><br>
                            '.(empty($no_licencia)?$vacio:$no_licencia).'
                        </div>
                     </div>
                 </div>
                 <div style="text-align:justify; font-size:10px;">
                    <p style="color:#AC58FA;">*La presente Orden de Pago únicamente avala la aplicación de tarifas establecidas en la Ley de Ingresos, no implica la autorización
                        de la Licencia de Construcción, sólo el cumplimiento de uno de los requisitos para la expedición de la misma, la cual quedará sujeta
                        al cumplimiento de toda la Normatividad establecida en las Leyes, Reglamentos, Programas Municipales y Estatales que sobre el
                        Desarrollo Urbano rigen al Municipio, así como al pago referido.
                    </p>
                    <p>
                        ** Estimado usuario, al recibir la orden de pago es su obligación verificar que los datos asentados en ella sean los correctos y antes
                        de realizar el pago deberá solicitar la aclaración de las tarifas aplicadas si existieran dudas de su parte.
                    </p><br>
                 </div>
                 <div>
                    <table cellpadding="10">
                        <tr>
                            <td>
                                <b>Detalle de la obra</b>
                            </td>
                            <td style="text-align:center; color:#fff; background:#b6b6b6;">
                                <b>Superficie / Cantidad</b>
                            </td>
                            <td style="text-align:center; color:#fff; background:#b6b6b6;">
                                <b>Tarifa</b>
                            </td>
                            <td style="text-align:center; color:#fff; background:#b6b6b6;">
                                <b>%</b>
                            </td>
                            <td style="text-align:center; color:#fff; background:#b6b6b6;">
                                <b>Importe Derechos</b>
                            </td>
                            <td style="text-align:center; color:#fff;  background:gray;">
                                <b>Valor Construcción</b>
                            </td>
                            <td style="text-align:center; color:#fff;  background:gray;">
                                <b>%</b>
                            </td>
                            <td style="text-align:center; color:#fff;  background:gray;">
                                <b>Importe Impuestos</b>
                            </td>
                            <td style="text-align:center; color:#fff; background:#000;">
                                <b>Importe Total</b>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                RAMPA\BANQUETA\COMERCIO Y
                                SERVICIOS\COMERCIO Y SERVICIO BARRIAL
                            </td>
                            <td style="text-align:center;">
                                0 M2
                            </td>
                            <td style="text-align:center;">
                                120
                            </td>
                            <td style="text-align:center;">
                                20
                            </td>
                            <td style="text-align:center;">
                                0
                            </td>
                            <td style="text-align:center;">
                                5690
                            </td>
                            <td style="text-align:center;">
                                1.25
                            </td>
                            <td style="text-align:center;">
                                0
                            </td>
                            <td style="text-align:center;">
                                0
                            </td>
                        </tr>
                        <tr>
                            <td>
                                TEJABAN\EMPEDRADO\HABITACIONAL\UNIFAMILIAR
                            </td>
                            <td style="text-align:center;">
                                0 M2
                            </td>
                            <td style="text-align:center;">
                                24
                            </td>
                            <td style="text-align:center;">
                                30
                            </td>
                            <td style="text-align:center;">
                                0
                            </td>
                            <td style="text-align:center;">
                                900
                            </td>
                            <td style="text-align:center;">
                                1.25
                            </td>
                            <td style="text-align:center;">
                                0
                            </td>
                            <td style="text-align:center;">
                                0
                            </td>
                        </tr>
                    </table>
                    <div style="font-size:10px; text-align:justify; float:left; width:60%;">
                        ART. 101 DEL REGLAMENTO DE GESTIÓN DEL DESARROLLO PARA EL MUNICIPIO DE GUADALAJARA.<br>
                        1. El otorgamiento de las licencias causa los derechos a que se refieren la Ley de Ingresos. En caso de
                        que habiéndose solicitado el otorgamiento hubiere quedado pendiente de expedirse la licencia por falta
                        de pago de tales derechos por un término mayor de treinta días hábiles, se entiende, por parte de la
                        Secretaría de Obras Publicas, por desistido el interesado de la solicitud de construcción para todos los
                        efectos legales.
                    </div>
                    <div style="font-size:10px; border: 1px solid black; float:left; width:38.7%; margin-left:1%; text-align:normal;">
                        <table style="border:none;">
                            <tr>
                                <td style="width:50%; border:none;">
                                    <b>IMPORTE SOLICITUD:</b>
                                </td>
                                <td style="text-align:right; width:50%; border:none;">
                                    $35.00
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none;">
                                    <b>IMPORTE LICENCIA:</b>
                                </td>
                                <td style="text-align:right; border:none;">
                                    $473.00
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none;">
                                    <b>CONS. Y MEJ. MEDIO AMB.:</b>
                                </td>
                                <td style="text-align:right; border:none;">
                                    $8.10
                                </td>
                            </tr>
                            <tr>
                                <td style="border:none;">
                                    <b>IMPORTE A PAGAR:</b>
                                </td>
                                <td style="text-align:right; border:none;">
                                    $516.10
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div style="text-align:center; color:#AC58FA; font-weight:bold; font-size:15px; margin-top:10px;">
                        <span>Esta orden de pago sólo serán válidas hasta la fecha Límite señalada a continuación:</span>
                    </div>
                    <div>
                        <div style="text-align:left; width:50%; float:left; margin-top:10%;">
                            <span><b>Fecha de impresión: '.$fechaTitle.'</b></span><br><br>
                            <barcode code="'.$fechaTitle.'" type="C128A" class="barcode" size="0.5" style="margin-left:10px;"/>
                        </div>
                        <div style="text-align:right; float:right; width:50%;">
                            <span><b>Fecha límite de pago: </b></span>
                        </div>
                    </div>
                 </div>
           </div>
       </body>
       </html>';


       $this->pdf->WriteHTML($html);
       $this->pdf->Output('orden_pago.pdf', 'I');
   }

}
