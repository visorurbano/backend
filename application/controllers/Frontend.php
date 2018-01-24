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
        $this->output->set_template('frontend-home');
        $this->load->view('front/home');
    }

    public function recuperarContrasena(){
        $this->load->view('front/recuperaContrasena');
    }

    public function normatividad(){
        $this->output->set_template('frontend-home');
        $this->load->view('front/normatividad');
    }

    public function manuales(){
        $this->output->set_template('frontend-home');
        $this->load->view('front/manuales');
    }

    public function faq(){
        $this->output->set_template('frontend-home');
        $this->load->view('front/faq');
    }

    public function tramites1(){
        $this->output->set_template('frontend-home');
        $this->load->view('front/tramites1');
    }

    public function notFound(){
        $this->output->set_template('frontend-home');
        $this->load->view('front/404');
    }
}