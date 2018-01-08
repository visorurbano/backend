<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Confirmacion_licencia extends CI_Controller {
    function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        $this->load->model('LicenciasGiroModel');

        if (!$this->session->userdata('loged')){
            $this->session->sess_destroy();
            redirect(base_url().'ingresar', 'refresh');
        }
    }

    public function confirmacion_lic(){
        $id_s = 420202;//$this->utils->decode($this->input->get('id_s'));
        $id_l = $this->utils->decode($this->input->get('id_l'));
        $consulta = $this->LicenciasGiroModel->licencia_nueva($id_l,$id_s);
        echo json_encode($consulta);
    }
}
