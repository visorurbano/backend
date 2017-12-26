<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class LicenciasGiro extends CI_Controller {
    function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        $this->load->model('LicenciasGiroModel');
        $this->load->library('utils');
        $this->load->section('top', 'admin/sections/top');
        $this->load->section('sidebar', 'admin/sections/sidebar');

        if (!$this->session->userdata('loged')){
            $cuenta = $this->uri->segment(2, 0);
            $this->session->sess_destroy();
            redirect(base_url().'ingresar?redirect='.$cuenta, 'refresh');
        }
    }
    public function index()
    {
        $this->output->set_template('admin');
        $this->load->js(base_url().'assets/js/jquery.validate.min.js');
        $this->load->view('giro/iniciarTramite');
    }
    public function requisitos(){
        $this->output->set_template('admin');
        $data['cuenta'] = $this->uri->segment(2, 0);
        $this->load->view('giro/index', $data);
    }
    public function licenciaGiroForma(){
        $this->output->set_template('admin');
        $idTramite = $this->utils->decode($this->uri->segment(2, 0));
        $idUsuario = $this->session->userdata('idU');
        $licencia = $this->LicenciasGiroModel->getLicencia($idUsuario, $idTramite);
        //var_dump($licencia);
        if (!empty($licencia)){
            $data['licencia'] = $licencia;
            $data['error']= false;
            $cuenta = $licencia->clave_catastral;
            $data['cuenta'] = $cuenta;
            $mercado =  $this->LicenciasGiroModel->isMercado($cuenta);
            $predio = json_decode($this->utils->getJson('http://192.168.66.94:3030/api/catastro/predio/VU?clave='.$cuenta));
            if (!$predio){
                $data['error']= true;
                $data['msg']= '<b>Upss</b> Lo sentimos estamos teniendo problemas temporalmente; estamos trabajando para resolver esta situación los mas pronto posible, por favor intenta de nuevo mas tarde  :(';
            }else{
                //Config
                if (empty($mercado)){
                    $data['mercado'] = false;
                }else{
                    $data['mercado'] = true;
                }
                //Step 1
                $data['st1_tipo_solicitante'] = $licencia->st1_tipo_solicitante;
                $data['st1_tipo_representante'] = $licencia->st1_tipo_representante;
                $data['st1_tipo_carta_poder'] = $licencia->st1_tipo_carta_poder;
                $data['st1_carta_poder'] = $licencia->st1_carta_poder;
                $data['st1_identificacion_otorgante'] = $licencia->st1_identificacion_otorgante;
                $data['st1_identificacion_testigo1'] = $licencia->st1_identificacion_testigo1;
                $data['st1_identificacion_testigo2'] = $licencia->st1_identificacion_testigo2;
                $data['st1_contrato_arrendamiento'] = $licencia->st1_contrato_arrendamiento;
                $data['st1_faculta'] = $licencia->st1_faculta;
                $data['st1_anuencia'] = $licencia->st1_anuencia;
                $data['st1_carta_anuencia'] = $licencia->st1_carta_anuencia;
                //Step 2
                $data['st2_nombre_representante'] = $licencia->st2_nombre_representante;
                $data['st2_curp_representante'] = $licencia->st2_curp_representante;
                $data['st2_rfc_representante'] = $licencia->st2_rfc_representante;
                if (!empty($licencia->st2_email_representante)){
                    $data['st2_email_representante'] = $licencia->st2_email_representante;
                }else{
                    $data['st2_email_representante'] = $this->session->userdata('email');
                }
                $data['st2_domicilio_representante'] = $licencia->st2_domicilio_representante;
                if ($licencia->st2_num_ext_representante > 0){
                    $data['st2_num_ext_representante'] = $licencia->st2_num_ext_representante;
                }else{
                    $data['st2_num_ext_representante'] = '';
                }
                if ($licencia->st2_num_int_representante > 0){
                    $data['st2_num_int_representante'] = $licencia->st2_num_int_representante;
                }else{
                    $data['st2_num_int_representante'] = '';
                }
                $data['st2_colonia_representante'] = $licencia->st2_colonia_representante;
                $data['st2_ciudad_representante'] = $licencia->st2_ciudad_representante;
                if ($licencia->st2_cp_representante > 0){
                    $data['st2_cp_representante'] = $licencia->st2_cp_representante;
                }else{
                    $data['st2_cp_representante'] = '';
                }
                if (!empty($licencia->st2_email_representante)){
                    $data['st2_telefono_representante'] = $licencia->st2_telefono_representante;
                }else{
                    $data['st2_telefono_representante'] = $this->session->userdata('celular');
                }
                $data['st2_identificacion_representante'] = $licencia->st2_identificacion_representante;
                //Step 2.1
                $data['st2_nombre_solicitante'] = $licencia->st2_nombre_solicitante;
                $data['st2_curp_solicitante'] = $licencia->st2_curp_solicitante;
                $data['st2_rfc_solicitante'] = $licencia->st2_rfc_solicitante;
                if (!empty($licencia->st2_email_representante)){
                    $data['st2_email_solicitante'] = $licencia->st2_email_solicitante;
                }else{
                    $data['st2_email_solicitante'] = $this->session->userdata('email');
                }
                $data['st2_domicilio_solicitante'] = $licencia->st2_domicilio_solicitante;
                if ($licencia->st2_num_ext_solicitante > 0){
                    $data['st2_num_ext_solicitante'] = $licencia->st2_num_ext_solicitante;
                }else{
                    $data['st2_num_ext_solicitante'] = '';
                }
                if ($licencia->st2_num_int_solicitante > 0){
                    $data['st2_num_int_solicitante'] = $licencia->st2_num_int_solicitante;
                }else{
                    $data['st2_num_int_solicitante'] = '';
                }
                $data['st2_colonia_solicitante'] = $licencia->st2_colonia_solicitante;
                $data['st2_ciudad_solicitante'] = $licencia->st2_ciudad_solicitante;
                if ($licencia->st2_cp_solicitante > 0){
                    $data['st2_cp_solicitante'] = $licencia->st2_cp_solicitante;
                }else{
                    $data['st2_cp_solicitante'] = '';
                }
                if (!empty($licencia->st2_email_representante)){
                    $data['st2_telefono_solicitante'] = $licencia->st2_telefono_solicitante;
                }else{
                    $data['st2_telefono_solicitante'] = $this->session->userdata('celular');
                }
                $data['st2_identidficacion_solicitante'] = $licencia->st2_identidficacion_solicitante;
                //Step3
                $data['descripcion_factibilidad'] = $licencia->descripcion_factibilidad;
                $data['st3_nombre_establecimiento'] = $licencia->st3_nombre_establecimiento;
                if (!empty($licencia->st3_domicilio_establecimiento)){
                    $data['st3_domicilio_establecimiento'] = $licencia->st3_domicilio_establecimiento;
                }else{
                    $data['st3_domicilio_establecimiento'] = $predio->data->calle;
                }
                if (!empty($licencia->st3_num_ext_establecimiento)){
                    $data['st3_num_ext_establecimiento'] = $licencia->st3_num_ext_establecimiento;
                }else{
                    $data['st3_num_ext_establecimiento'] = (int)$predio->data->numeroExterior;
                }
                if ($licencia->st3_num_int_establecimiento > 0){
                    $data['st3_num_int_establecimiento'] = $licencia->st3_num_int_establecimiento;
                }else{
                    $data['st3_num_int_establecimiento'] = '';
                }
                $data['st3_letra_ext_establecimiento'] = $licencia->st3_letra_ext_establecimiento;
                $data['st3_letra_int_establecimiento'] = $licencia->st3_letra_int_establecimiento;
                if (!empty($licencia->st3_colonia_establecimiento)){
                    $data['st3_colonia_establecimiento'] = $licencia->st3_colonia_establecimiento;
                }else{
                    $data['st3_colonia_establecimiento'] = $predio->data->colonia;
                }
                if (!empty($licencia->st3_ciudad_establecimiento)){
                    $data['st3_ciudad_establecimiento'] = $licencia->st3_ciudad_establecimiento;
                }else{
                    $data['st3_ciudad_establecimiento'] = $predio->data->poblacion;
                }
                if (!empty($licencia->st3_estado_establecimiento)){
                    $data['st3_estado_establecimiento'] = $licencia->st3_estado_establecimiento;
                }else{
                    $data['st3_estado_establecimiento'] = $predio->data->estado;
                }
                if ($licencia->st3_cp_establecimiento > 0){
                    $data['st3_cp_establecimiento'] = $licencia->st3_cp_establecimiento;
                }else{
                    $data['st3_cp_establecimiento'] = '';
                }
                $data['st3_especificaciones_establecimiento'] = $licencia->st3_especificaciones_establecimiento;
                $data['st3_edificio_plaza_establecimiento'] = $licencia->st3_edificio_plaza_establecimiento;
                if ($licencia->st3_num_local_establecimiento > 0){
                    $data['st3_num_local_establecimiento'] = $licencia->st3_num_local_establecimiento;
                }else{
                    $data['st3_num_local_establecimiento'] = '';
                }

                if (!empty($licencia->st3_sup_construida_establecimiento)){
                    $data['st3_sup_construida_establecimiento'] = $licencia->st3_sup_construida_establecimiento;
                }else{
                    $data['st3_sup_construida_establecimiento'] = (int)$predio->data->avaluo->areaConstruccionAvaluo;
                }
                if ($licencia->st3_area_utilizar_establecimiento > 0){
                    $data['st3_area_utilizar_establecimiento'] = $licencia->st3_area_utilizar_establecimiento;
                }else{
                    $data['st3_area_utilizar_establecimiento'] = '';
                }
                if ($licencia->st3_inversion_establecimiento > 0){
                    $data['st3_inversion_establecimiento'] = $licencia->st3_inversion_establecimiento;
                }else{
                    $data['st3_inversion_establecimiento'] = '';
                }
                if ($licencia->st3_empleados_establecimiento > 0){
                    $data['st3_empleados_establecimiento'] = $licencia->st3_empleados_establecimiento;
                }else{
                    $data['st3_empleados_establecimiento'] = '';
                }
                if ($licencia->st3_cajones_estacionamiento_establecimiento > 0){
                    $data['st3_cajones_estacionamiento_establecimiento'] = $licencia->st3_cajones_estacionamiento_establecimiento;
                }else{
                    $data['st3_cajones_estacionamiento_establecimiento'] = '';
                }
                $data['st3_img1_establecimiento'] = $licencia->st3_img1_establecimiento;
                $data['st3_img2_establecimiento'] = $licencia->st3_img2_establecimiento;
                $data['st3_img3_establecimiento'] = $licencia->st3_img3_establecimiento;
                $data['st4_declaratoria'] = $licencia->st4_declaratoria;
                $data['status'] = $predio->status;
            }

        }else{
            $data['error']= true;
            $data['msg']= '<b>Error.</b> La solicitud a la que estas intentando acceder no existe ó no tienes los permisos suficientes para continuar con el trámite.';
        }

        $this->load->css(base_url().'assets/css/admin/steps.css');
        $this->load->css(base_url().'assets/css/lightbox.min.css');
        $this->load->js(base_url().'assets/js/jquery.validate.min.js');
        $this->load->js(base_url().'assets/js/jquery.steps.min.js');
        $this->load->js(base_url().'assets/vendor/progressbar.js');
        $this->load->js(base_url().'assets/vendor/lightbox.min.js');
        $this->load->view('giro/licencia_de_giro_forma', $data);
    }
    public function licenciaGiroConfirmacion(){
        $this->output->set_template('admin');
        $cuenta = $this->uri->segment(3, 0);
        $data['cuenta'] = $cuenta;
        $predio = json_decode($this->utils->getJson('http://192.168.66.94:3030/api/catastro/predio/VU?clave='.$cuenta));
        $data['status'] = $predio->status;
        if ($predio->status == 200){
            $data['cpredial'] = $this->utils->encode($predio->data->cuenta);
            $data['adeudo'] = $predio->data->adeudo->saldo;
        }
        $this->load->js(base_url().'assets/js/jquery.validate.min.js');
        $this->load->view('giro/licencia_de_giro_confirmacion', $data);
    }

    public function updateForma(){
        try{
            if ($_SERVER['REQUEST_METHOD'] != 'POST') {
                throw new Exception('Bad request', 400);
            }
            $params = $_REQUEST;
            if (empty($params['licencia'])){
                throw new Exception('El folio del trámite es requerido', 404);
            }
            $data = $params['campos'];

            $result =  $this->LicenciasGiroModel->updateLicencia($params['licencia'], $data);
            if ($result['status']){
                $this->output->set_content_type('application/json');
                $this->output->set_output(json_encode(array('status' => 200, 'message' =>'Sucesfully')));
            }else{
                throw new Exception('Ocurrio un error inesperado por favor intenta mas tarde.', 401);
            }
        }catch (Exception $e) {
            $this->output->set_content_type('application/json');
            $this->output->set_output(json_encode(array('status' => $e->getCode(), 'message' => $e->getMessage())));
        }
    }



}
