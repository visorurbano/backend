<div class="content-inner">
    <!-- Page Header-->
    <header class="page-header">
        <div class="container-fluid">
            <h2 class="no-margin-bottom">Listado de Trámites</h2>
        </div>
    </header>
    <!-- Projects Section-->
    <section class="projects">
        <div class="container-fluid">
            <ul class="mui-tabs__bar mui-tabs__bar--justified">
                <li class="mui--is-active"><a data-mui-toggle="tab" data-mui-controls="pane-justified-1">Trámites en Ventanilla</a></li>
                <li><a data-mui-toggle="tab" data-mui-controls="pane-justified-2">Trámites enviados para validación</a></li>
            </ul>
            <!-- tab Tramites Actuales -->
            <div class="mui-tabs__pane mui--is-active" id="pane-justified-1">
                <br><br>
                <div class="row">
                    <div class="col-md-12">
                        <table id="tblVentanilla" class="display table-striped dataTableVU" cellspacing="0" width="100%">
                            <thead>
                            <tr>
                                <th>No. Trámite</th>
                                <th>Solicitante</th>
                                <th>Giro</th>
                                <th>Clave Catastral</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php foreach($licenciasVentanilla as $licencia): ?>
                                <tr role="row">
                                    <td><b><?= $licencia->id_licencia ?></b></td>
                                    <td>
                                        <?= ucwords($licencia->st2_nombre_solicitante).' '.ucwords($licencia->st2_primer_apellido_solicitante).' '.ucwords($licencia->st2_segundo_apellido_solicitante);?>
                                    </td>
                                    <td>
                                        <?= $licencia->descripcion_factibilidad ?>
                                    </td>
                                    <td>
                                        <?= $licencia->clave_catastral ?>
                                    </td>
                                    <td style="text-align: right">
                                        <a href="<?=base_url()?>nueva-licencia/<?= $this->utils->encode($licencia->id_licencia);?>/<?= $this->utils->encode($licencia->id_usuario);?>" class="mui-btn mui-btn--primary"><i class="fa fa-pencil-square-o" aria-hidden="true"></i> Editar</a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- tab para validacion -->
            <div class="mui-tabs__pane" id="pane-justified-2">
                <br><br>
                <div class="row">
                    <div class="col-md-12">
                        <table id="tbltVentanilla" class="display table-striped dataTableVU" cellspacing="0" width="100%">
                            <thead>
                            <tr>
                                <th>No. Trámite</th>
                                <th>Solicitante</th>
                                <th>Giro</th>
                                <th>Clave Catastral</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            <?php foreach($licenciasTVentanilla as $licencia): ?>
                                <tr role="row">
                                    <td><b><?= $licencia->id_licencia ?></b></td>
                                    <td>
                                        <?= ucwords($licencia->st2_nombre_solicitante).' '.ucwords($licencia->st2_primer_apellido_solicitante).' '.ucwords($licencia->st2_segundo_apellido_solicitante);?>
                                    </td>
                                    <td>
                                        <?= $licencia->descripcion_factibilidad ?>
                                    </td>
                                    <td>
                                        <?= $licencia->clave_catastral ?>
                                    </td>
                                    <td style="text-align: right">
                                        <a href="<?=base_url()?>nueva-licencia/<?= $this->utils->encode($licencia->id_licencia);?>/<?= $this->utils->encode($licencia->id_usuario);?>" class="mui-btn mui-btn--primary"><i class="fa fa-user-circle-o" aria-hidden="true"></i> Validar</a>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
</div>
</div>
