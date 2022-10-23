// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useFetchs } from '../../../helpers/api/useFetch';
// components locales
import Asignaturas from './Asignaturas';
import Actividades from './Actividades';
import FichaTareas from './FichaTareas';
import NavSuperior from './NavSuperior';
import Syllabus from './Syllabus';
import Inbox from './Inbox';
import ListaEstudiantes from './ListaEstudiantes';
import ListaCalificaciones from './ListaCalificaciones';
import FichaTareasTodas from './FichaTareasTodas';
import Statistics from './Statistics';
import Tasks from './Tasks';
import VistaPreviaCursos from './components/VistaPreviaCursos';

const EcommerceDashboard = (): React$Element<any> => {
    const { asignaturas } = useSelector((state) => ({
        asignaturas: state.Asignatura.asignaturas,
    }));
    const { id_pernatural, roles, loadings } = useSelector((state) => ({
        loadings: state.Auth.loading,
        id_pernatural: state.Auth.user.id_pensum,
        roles: state.Auth.user.role,
    }));
    const INIT_STATE = {
        selected: 0,
        codmateria: null,
        nombremateria: null,
        itemsactividad: 0,
        tipoactividad: 0,
        programa_id: 0,
        programa: null,
        id_curso: 0,
        nombrecurso: null,
        itemsinbox: null,
        modal: false,
        periodo: 0,
        role: roles,
        id_pernatural: id_pernatural,
        // asignaturas: asignaturas,
        navprincipal: {},
        grupo_id: 0,
        selectedFile: [],
    };
    const [state, setState] = useState(INIT_STATE);

    const URL_PERIODO = 'https://aulaweb.autoevaluacion.com.co/v1/periodo';

    /**
     * Show/hide the modal
     */
    const toggle = (e) => {
        setState({ ...state, modal: !state.modal, nombrecurso: e });
    };
    const onState = (e) => {
        if (e) {
            setState({
                ...state,
                selected: e.selected,
                codmateria: e.codmateria,
                nombremateria: e.nombremateria,
                itemsactividad: e.itemsactividad,
                tipoactividad: e.tipoactividad,
                programa: e.programa,
                id_curso: e.id_curso,
                nombrecurso: e.nombrecurso,
                itemsinbox: e.itemsinbox,
                id_pernatural: id_pernatural,
                role: roles,
                id_grupo: e.id_grupo,
                asignaturas: null,
                id_tema: e.id_tema,
                id: e.id,
                selectedFile: e.selectedFile,
            });
            //alert('selected:' + e.selected);
        }
    };

    const style = {
        height: 60,
        margin: 6,
        padding: 8,
        fonfSize: '14px',
    };

    ///CARGAR PERIODO
    const { response, load } = useFetchs(URL_PERIODO);
    useEffect(() => {
        if (!load && response) {
            setState({ periodo: response[0].id });
        }
    }, [load, response]);

    ///CARGAR ID,ROLE DEL USUARIO
    useEffect(() => {
        if (!loadings && id_pernatural && roles) {
            setState({ id_pernatural: id_pernatural, roles: roles });
        }
    }, [loadings, id_pernatural, roles]);

    useEffect(() => {
        if (!state.selected || state.selected === null) {
            setState({ selected: 0 });
        }
    }, [state.selected, asignaturas]);
    ///CARGAR ASIGNATURAS

    //console.log('index', asignaturas);
    //console.log(asignaturas.length);

    return (
        <React.Fragment>
            <Row>
                <Col style={style} sm={12} role="alert" className="fade alert alert-success show offset-lg-1">
                    <NavSuperior state={state} onState={onState} />
                </Col>
                <Statistics />
            </Row>

            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            {(() => {
                                switch (state.selected) {
                                    case 0:
                                        return (
                                            <Row>
                                                <Col lg={4}>
                                                    <Asignaturas
                                                        state={state}
                                                        onState={onState}
                                                        asignaturas={asignaturas}
                                                        inputClass="form-contro"
                                                    />
                                                </Col>

                                                <Col lg={8}>
                                                    <Tasks />
                                                </Col>
                                            </Row>
                                        );
                                    case 1:
                                        return (
                                            <Row>
                                                <Col sm={4}>
                                                    <Actividades
                                                        state={state}
                                                        inputClass="form-control-light"
                                                        onClick={(data) => {
                                                            onState(data);
                                                        }}
                                                    />
                                                </Col>
                                                <Col sm={4}></Col>
                                                <Col sm={4}></Col>
                                            </Row>
                                        );
                                    case 2:
                                        return (
                                            <Row>
                                                <Col sm={4}>
                                                    <Actividades
                                                        state={state}
                                                        inputClass="form-control-light"
                                                        onClick={(data) => {
                                                            onState(data);
                                                        }}
                                                    />
                                                </Col>
                                                <Col sm={8}>
                                                    <FichaTareas
                                                        state={state}
                                                        inputClass="form-control-light"
                                                        onClick={(data) => {
                                                            onState(data);
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        );
                                    case 25:
                                        return (
                                            <Row>
                                                <Col sm={12}>
                                                    <FichaTareasTodas
                                                        state={state}
                                                        inputClass="form-control-light"
                                                        onClick={(data) => {
                                                            onState(data);
                                                        }}
                                                    />
                                                </Col>
                                            </Row>
                                        );
                                    case 26:
                                        return (
                                            <Row>
                                                <Col sm={12}>
                                                    <Syllabus
                                                        state={state}
                                                        inputClass="form-control-light"
                                                        toggle={toggle}
                                                        onState={onState}
                                                    />
                                                </Col>
                                                <Col
                                                    style={style}
                                                    sm={12}
                                                    role="alert"
                                                    className="fade alert alert-success show offset-lg-1">
                                                    <NavSuperior state={state} onState={onState} />
                                                </Col>
                                            </Row>
                                        );
                                    case 261:
                                        return (
                                            <Row>
                                                <Col sm={12}>
                                                    <VistaPreviaCursos
                                                        state={state}
                                                        inputClass="form-control-light"
                                                        toggle={toggle}
                                                        onState={onState}
                                                    />
                                                </Col>
                                            </Row>
                                        );

                                    case 27:
                                        return (
                                            <Row>
                                                <Col sm={12}>
                                                    <ListaEstudiantes state={state} inputClass="form-control-light" />
                                                </Col>
                                            </Row>
                                        );
                                    case 28:
                                        return (
                                            <Row>
                                                <Col sm={12}>
                                                    <ListaCalificaciones
                                                        state={state}
                                                        inputClass="form-control-light"
                                                        onState={onState}
                                                    />
                                                </Col>
                                            </Row>
                                        );
                                    case 41:
                                        return (
                                            <Row>
                                                <Col sm={12}>
                                                    <Inbox
                                                        state={state}
                                                        onState={onState}
                                                        inputClass="form-control-light"
                                                        toggle={toggle}
                                                    />
                                                </Col>
                                            </Row>
                                        );
                                    default:
                                        return (
                                            <Row>
                                                <Col sm={12}> </Col>
                                            </Row>
                                        );
                                }
                            })()}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default EcommerceDashboard;
