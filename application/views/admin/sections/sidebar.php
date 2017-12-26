<!--<pre>
    <? //var_dump($this->session->userdata());?>
</pre>-->
<div class="page-content d-flex align-items-stretch">
    <!-- Side Navbar -->
    <nav class="side-navbar">
        <!--<img class="admin-gdl-logo" src="<?php echo base_url(); ?>assets/img/g-logo.png" alt="Gobierno de Guadalajara">-->
        <!-- Sidebar Header-->
        <div class="sidebar-header d-flex align-items-center">
            <div class="avatar"><img src="<?php echo base_url(); ?>assets/img/default.png" alt="..." class="img-fluid rounded-circle"></div>
            <div class="title">
                <h1 class="h4" id="contUserName"><?php echo $this->session->userdata('nombre');?></h1>
                <small><a href="<?=base_url();?>admin/usuario"><i class="fa fa-pencil" aria-hidden="true"></i>Editar mi perfil</a></small>
            </div>
        </div>
        <!-- Sidebar Navidation Menus-->
        <ul class="list-unstyled">
            <li> <a href="<?=base_url()?>admin"><i class="fa fa-list" aria-hidden="true"></i> Mis Trámites</a></li>
            <li> <a href="<?=base_url()?>admin/mis-licencias"><i class="fa fa-file-text-o" aria-hidden="true"></i> Mis Licencias</a></li>
            <li> <a href="<?=base_url()?>admin/mis-mensajes"><i class="fa fa-envelope-o" aria-hidden="true"></i> Mis Mensajes</a></li>
            <li><a href="#tramites" aria-expanded="false" data-toggle="collapse"> <i class="fa fa-file" aria-hidden="true"></i> Nuevo Trámite </a>
                <ul id="tramites" class="collapse list-unstyled">
                    <li><a href="<?=base_url()?>nueva-licencia"><i class="fa fa-file-text-o" aria-hidden="true"></i> Licencia de giro tipo A</a></li>
                    <li><a href="https://servicios.guadalajara.gob.mx/registro_ciudadano/users/sign_in"><i class="fa fa-file-text-o" aria-hidden="true"></i> Licencia de construcción</a></li>
                </ul>
            </li>
            <!--<li class=""> <a href="./"><i class="fa fa-question" aria-hidden="true"></i> Ayuda</a></li>-->

        </ul>
    </nav>

