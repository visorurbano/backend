<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class RevisionController extends CI_Controller {
    function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        $this->load->model('RevisionModel');
        $this->output->set_template('admin');
        $this->load->section('top', 'admin/sections/top');
        $this->load->section('sidebar', 'admin/sections/sidebar');
        $this->load->css('https://cdn.datatables.net/v/bs4/dt-1.10.16/datatables.min.css');
        $this->load->js('https://cdn.datatables.net/v/bs4/dt-1.10.16/datatables.min.js');
        $this->load->js(base_url().'assets/js/revision.min.js');
        if (!$this->session->userdata('loged')){
            $this->session->sess_destroy();
            redirect(base_url().'ingresar', 'refresh');
        }
    }

    public function index(){
        $this->load->view('admin/revision');
    }

    public function licencias(){
        $todas = $this->input->post('todas');
        $revisadas = $this->input->post('revisadas');
        $prioritarios = $this->input->post('prioritarios');
        $id_user = $this->session->userdata('idU');

        $lista=$this->RevisionModel->getLicencias($id_user,$todas,$revisadas,$prioritarios);
        echo json_encode($lista);
    }
}
