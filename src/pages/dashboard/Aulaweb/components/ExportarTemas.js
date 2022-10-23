// @flow
import React from 'react';
import { Card, Dropdown } from 'react-bootstrap';
import TimelineItem from '../../../../components/TimelineItem';
import Timeline from '../../../../components/Timeline';
import SimpleBar from 'simplebar-react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import { APICore } from '../../../../helpers/api/apiCore';
const api = new APICore();

const ExportarTemas = (props): React$Element<any> => {
    const adjuntarsyllabus = (nombre, nombremateria, props, grupo_id, grupo_id_actual) => {
        setTimeout(function () {
            swal({
                title:
                    'Esta seguro que desea copiar los Temas del grupo ' +
                    nombre +
                    ' de ' +
                    nombremateria +
                    ' al grupo actual ?',
                text: 'Al copiar se traera los temas y todo los cursos con sus contenidos. Exceptuando las Calificaciones',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    swal('Puedes editar estos temas y curso en esta misma sección', {
                        icon: 'success',
                    });
                    const datos = {
                        ...props.state,
                        selected: 26,
                    };
                    props.onState(datos);
                    const urla = `http://aulaweb.autoevaluacion.com.co/v1/copiartemas?&cod_materia=${props.state.codmateria}&grupo_id=${grupo_id}&grupo_id_actual=${grupo_id_actual}`;
                    const forms = api.setCopiarTemas(`${urla}`);
                    forms.then((res) => swal('' + JSON.parse(res).message + ''));
                } else {
                    //swal('okkkYour imaginary file is safe!');
                }
            });
        }, 0);
    };
    //console.log(props.data);
    return (
        <React.Fragment>
            <Card>
                <Card.Body>
                    <SimpleBar style={{ maxHeight: '330px', width: '100%' }}>
                        {props.data &&
                            props.data.length > 0 &&
                            props.data.map((record: any, index) => {
                                return (
                                    <>
                                        <h4 className="header-title mb-2">Actualizar asignatura</h4>
                                        <Timeline>
                                            <TimelineItem>
                                                <i className="mdi mdi-upload bg-info-lighten text-info timeline-icon"></i>{' '}
                                                <Dropdown className="float-end" align="end">
                                                    <Dropdown.Toggle
                                                        variant="link"
                                                        className="arrow-none card-drop p-0 shadow-none">
                                                        <i className="mdi mdi-dots-vertical"></i>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                        <Dropdown.Item
                                                            onClick={(d) => {
                                                                props.onState({
                                                                    ...props.state,
                                                                    id_grupo: record.grupo_id,
                                                                    selected: 261,
                                                                });
                                                            }}>
                                                            <i className="mdi mdi-dots-vertical"></i>Ver Contenidos
                                                        </Dropdown.Item>
                                                        <Dropdown.Item
                                                            onClick={(d) => {
                                                                adjuntarsyllabus(
                                                                    record.nombre,
                                                                    props.state.nombremateria,
                                                                    props,
                                                                    record.grupo_id,
                                                                    props.state.id_grupo
                                                                );
                                                            }}>
                                                            <i className="mdi mdi-upload"></i>Importar temas
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                                <div className="timeline-item-info">
                                                    <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                        Importar los Temas del Syllabus del Grupo: {props.grupo_id}-
                                                        {record.grupo_id}-{record.nombre}
                                                    </Link>
                                                    <small>Periodo: {record.periodoacademico_id}</small>
                                                    <p className="mb-0 pb-2">
                                                        <small className="text-muted"> Grupo: {record.nombre}</small>
                                                        <small className="text-muted">
                                                            {' '}
                                                            Ciclo: {record.fechainicial}-{record.fechafinal}
                                                        </small>
                                                    </p>
                                                </div>
                                            </TimelineItem>
                                        </Timeline>
                                    </>
                                );
                            })}
                    </SimpleBar>
                </Card.Body>
            </Card>
        </React.Fragment>
    );
};
export default ExportarTemas;
