<?php
defined('BASEPATH') OR exit('No direct script access allowed');
class LicenciasGiroModel extends CI_Model {
    public function setLicencia($idU, $predial, $catastral, $factibiliad, $descFactibilidad, $claveFactibilidad){
        $licencia =  $this->db->select('*')->from('tbl_licencias_giro')->where('id_usuario', $idU)->where('cuenta_predial', $predial)->where('clave_catastral', $catastral)->where('folio_factibilidad', $factibiliad)->get()->row();
        if (!empty($licencia)){
            return array('status'=>false);
        }else{
            $catastro = json_decode($this->utils->getJson('http://192.168.66.94:3030/api/catastro/predio/VU?clave='.$catastral));
            if (!empty($catastro)){
                $data = array(
                    'id_usuario'=>$idU,
                    'cuenta_predial'=>$predial,
                    'clave_catastral'=>$catastral,
                    'folio_factibilidad'=>$factibiliad,
                    'clave_factibilidad'=>$claveFactibilidad,
                    'descripcion_factibilidad'=>$descFactibilidad,
                    /* Predio */
                    'predio_recaudadora'=> $catastro->data->recaudadora,
                    'predio_tipo_predio'=> $catastro->data->tipoPredio,
                    'predio_subpredio'=> $catastro->data->subpredio,
                    'predio_vigente'=> $catastro->data->vigente,
                    'predio_calle'=> $catastro->data->calle,
                    'predio_colonia'=> $catastro->data->colonia,
                    'predio_numero_ext'=> $catastro->data->numeroExterior,
                    'predio_numero_int'=> $catastro->data->numeroInterior,
                    'predio_municipio'=> $catastro->data->poblacion,
                    'predio_estado'=> $catastro->data->estado,
                    'predio_area_titulo'=> $catastro->data->areaTitulo
                );

                $this->db->trans_start();
                $this->db->insert('tbl_licencias_giro',$data);
                $idLicencia = $this->db->insert_id();
                if ($this->db->trans_status() === FALSE){
                    $this->db->trans_rollback();
                    return array('status'=>false);
                } else {
                    $this->db->trans_commit();
                    return array('status'=>true, 'id'=>$idLicencia);
                }
            }else{
                return array('status'=>false);
            }

        }
    }

    public function getLicencias($idU, $type){
        if (!$type){
            $licencias =  $this->db->select('*')->from('tbl_licencias_giro')->where('id_usuario', $idU)->where('status !=', 'FL')->get()->result();
        }else{
            $licencias =  $this->db->select('*')->from('tbl_licencias_giro')->where('id_usuario', $idU)->where('status', 'FL')->get()->result();
        }

        return $licencias;
    }

    public function getLicencia($idU, $idLicencia){
        $licencia =  $this->db->select('*')->from('tbl_licencias_giro')->where('id_usuario', $idU)->where('id_licencia', $idLicencia)->get()->row();
        return $licencia;
    }

    public function updateLicencia($idTramite, $params){
        $this->db->trans_start();
        $this->db->where('id_licencia',$idTramite)->update('tbl_licencias_giro', $params);
        if ($this->db->trans_status() === FALSE){
            $this->db->trans_rollback();
            return array('status'=>false);
        } else {
            $this->db->trans_commit();
            return array('status'=>true);
        }
    }
    public function isMercado($clave){
        $mercado =  $this->db->select('*')->from('tbl_predios_mercado')->where('clave_catastral', $clave)->get()->row();
        return $mercado;
    }
}