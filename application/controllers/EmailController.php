<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class EmailController extends CI_Controller {
    function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        $this->load->model('EmailModel');
        $this->load->model('ProcesosModel');
    }

    public function Email(){
        extract($_POST);
        $respuesta=$this->EmailModel->sendEmail($emisor,$destino,$asunto,$mensaje);
        print_r($respuesta);
    }

    public function licencias_sincronizacion(){
        $respuesta = $this->ProcesosModel->proceso_sincronizar();
    }
}
