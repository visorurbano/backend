<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class RevisionModel extends CI_Model {
    public function getLicencias($idUser, $todas, $revisadas, $prioritarios){
        $query=$this->db->query('select * from tbl_licencias_giro where id_usuario='.$idUser.' and status="FL"');
        if($query->num_rows()>0){
            $resultado=array("status"=>true,"data"=>$query->result());
        }else{
            $resultado=array("status"=>false,"data"=>"");
        }
        return $resultado;
    }
}
