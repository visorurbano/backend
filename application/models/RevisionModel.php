<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class RevisionModel extends CI_Model {
    public function getLicencias($idUser,$Tipo){
        switch ($Tipo) {
          case 'T':
              $query=$this->db->query('select * from tbl_licencias_giro where id_usuario='.$idUser.' and status="FL"');
            break;
          case 'R':
              $query=$this->db->query('select * from tbl_licencias_giro where id_usuario='.$idUser.' and status="FL" and revisada = 1');
            break;
          case 'P':
              $query=$this->db->query('select * from tbl_licencias_giro where id_usuario='.$idUser.' and status="FL" and revisada = 1');
            break;
        }
        if($query->num_rows()>0){
            $resultado=array("status"=>true,"data"=>$query->result());
        }else{
            $resultado=array("status"=>false,"data"=>"");
        }
        return $resultado;
    }
}
