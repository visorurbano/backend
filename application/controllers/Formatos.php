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
}