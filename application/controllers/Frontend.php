<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class Frontend extends CI_Controller {
    function __construct()
    {
        parent::__construct();
        $this->load->helper('url');
        //$this->output->set_template('frontend');
    }

    public function index()
    {
        $this->load->view('front/home');
    }

    public function recuperarContrasena(){
        $this->load->view('front/recuperaContrasena');
    }
}