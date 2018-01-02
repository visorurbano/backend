<div class="content-inner">
    <!-- Page Header-->
    <header class="page-header">
        <div class="container-fluid">
            <h2 class="no-margin-bottom">Revisión</h2>
        </div>
    </header>
    <!-- Projects Section-->
    <section class="projects">
        <div class="container-fluid">
            <ul class="nav nav-tabs" id="Tab" role="tablist">
                <li class="nav-item">
                    <a class="nav-link active" id="todas-tab" data-toggle="tab" href="#todas" role="tab" aria-controls="todas" aria-selected="true" onclick="traer_informacion('T')">TODAS</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="revisadas-tab" data-toggle="tab" href="#revisadas" role="tab" aria-controls="revisadas" aria-selected="false" onclick="traer_informacion('R')">REVISADAS</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="prioritarios-tab" data-toggle="tab" href="#prioritarios" role="tab" aria-controls="prioritarios" aria-selected="false" onclick="traer_informacion('P')">PRIORITARIOS</a>
                </li>
            </ul>
            <div class="tab-content" id="TabContent">
                <div class="tab-pane fade show active" id="todas" role="tabpanel" aria-labelledby="todas-tab" style="margin-top:30px;">
                    <table id="tblTodas" class="display table-striped" cellspacing="0" width="100%" style="margin-top:20px;">
                        <thead>
                            <tr>
                                <th>NOMBRE DEL SOLICITANTE</th>
                                <th>GIRO</th>
                                <th>FECHA</th>
                                <th style="text-align:center;">VER</th>
                            </tr>
                        </thead>
                        <tbody id="bodyTodas">

                        </tbody>
                    </table>
                </div>
                <div class="tab-pane fade" id="revisadas" role="tabpanel" aria-labelledby="revisadas-tab" style="margin-top:30px;">
                    <table id="tblRevisadas" class="display table-striped" cellspacing="0" width="100%" style="margin-top:20px;">
                        <thead>
                            <tr>
                                <th>NOMBRE DEL SOLICITANTE</th>
                                <th>GIRO</th>
                                <th>FECHA</th>
                                <th style="text-align:center;">VER</th>
                            </tr>
                        </thead>
                        <tbody id="bodyRevisadas">

                        </tbody>
                    </table>
                </div>
                <div class="tab-pane fade" id="prioritarios" role="tabpanel" aria-labelledby="prioritarios-tab" style="margin-top:30px;">
                    <table id="tblPrioritarios" class="display table-striped" cellspacing="0" width="100%" style="margin-top:20px;">
                        <thead>
                            <tr>
                                <th>NOMBRE DEL SOLICITANTE</th>
                                <th>GIRO</th>
                                <th>FECHA</th>
                                <th style="text-align:center;">VER</th>
                            </tr>
                        </thead>
                        <tbody id="bodyPrioritarios">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</div>
</div>
</div>
