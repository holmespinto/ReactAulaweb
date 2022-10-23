// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import logodark from '../../../../assets/images/logo-dark.png';
import Select from 'react-select';
import FileUploader from '../../../../components/FileUploader';
// components

import Table from '../../../../components/Table';
import swal from 'sweetalert';
import { APICore } from '../../../../helpers/api/apiCore';
const api = new APICore();
/* status column render */
const StatusColumn = ({ row }) => {
    return (
        <React.Fragment>
            <span
                className={classNames('badge', {
                    'bg-danger': row.cells[9].value,
                    'bg-success': !row.cells[9].value,
                })}>
                {row.cells[9].value ? 'Active' : 'Deactivated'}
            </span>
        </React.Fragment>
    );
};
/* action column render */
const ActionColumn = ({ row }) => {
    const INIT_TEMAS = {
        id_actividad: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
        titulo: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
        contenido: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
        fechainicio: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
        horainicio: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
        fechafinal: row.cells[6].value ? row.cells[6].value : row.cells[6].value,
        horafinal: row.cells[7].value ? row.cells[7].value : row.cells[7].value,
        cohorte: row.cells[8].value ? row.cells[8].value : row.cells[8].value,
        status: row.cells[9].value ? row.cells[9].value : row.cells[9].value,
    };

    const [signUpModal, setSignUpModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [temas, setTemas] = useState(INIT_TEMAS);

    const toggleSignUp = () => {
        setSignUpModal(!signUpModal);
    };

    const eliminar = () => {
        let response;
        if (temas) {
            var queryString = temas
                ? Object.keys(temas)
                      .map((key) => key + '=' + temas[key])
                      .join('&')
                : '';
        }
        response = queryString;
        swal({
            title: 'Esta seguro que desea Desactivar la actividad?',
            text: '',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((d) => {
            if (d) {
                const urla = `https://aulaweb.autoevaluacion.com.co/v2/?&accion=editoractividades&${response}&opcion=delete&operacion=sindoc`;
                const respuesta = api.createactividad(`${urla}`);
                respuesta.then(function (resp) {
                    const records = resp;
                    if (records) {
                        swal('' + records[0].menssage + '');
                    }
                });
            } else {
                //swal('Your imaginary file is safe!');
            }
        });
    };

    const actualizar = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (validated) {
            let response;
            if (temas) {
                var queryString = temas
                    ? Object.keys(temas)
                          .map((key) => key + '=' + temas[key])
                          .join('&')
                    : '';
            }
            response = queryString;

            const urla = `https://aulaweb.autoevaluacion.com.co/v2/?&accion=editoractividades&${response}&opcion=editar&operacion=sindoc`;
            const respuesta = api.createactividad(`${urla}`);
            respuesta.then(function (resp) {
                const records = resp;
                if (records) {
                    swal('' + records[0].menssage + '');
                }
            });
        }
    };

    const Close = (e) => {
        e.preventDefault();
        setSignUpModal(false);
        setTemas([]);
    };
    return (
        <React.Fragment>
            <Modal show={signUpModal} onHide={toggleSignUp}>
                <Modal.Body>
                    <Form validated={validated}>
                        <Form.Group className="mb-3" controlId="titulo">
                            <Form.Label>Titulo</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="titulo"
                                placeholder="Digite el Titulo del tema"
                                value={temas.titulo}
                                onChange={(e) => setTemas({ ...temas, titulo: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite el Título.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="contenido">
                            <Form.Label>Contenido</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="contenido"
                                placeholder="Digite el contenido del tema"
                                value={temas.contenido}
                                onChange={(e) => setTemas({ ...temas, contenido: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite el contenido.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="fechainicio">
                            <Form.Label>Fecha de Inicio: {temas.fechainicio}</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control
                                    type="date"
                                    name="fechainicio"
                                    required
                                    dateFormat="dd-MM-yyyy"
                                    defaultValue={temas.fechainicio}
                                    onChange={(e) => setTemas({ ...temas, fechainicio: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite la Fecha de Inicio.
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="horainicio">
                            <Form.Label>Hora Inicio</Form.Label>
                            <Form.Control
                                type="time"
                                name="horainicio"
                                showTimeSelect
                                showTimeSelectOnly
                                tI={60}
                                dateFormat="h:mm aa"
                                timeCaption="Time"
                                defaultValue={temas.horainicio}
                                onChange={(e) => setTemas({ ...temas, horainicio: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite la Hora Final.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="fechafinal">
                            <Form.Label>Fecha Final : {temas.fechafinal}</Form.Label>
                            <Form.Control
                                type="date"
                                name="fechafinal"
                                required
                                dateFormat="dd-MM-yyyy"
                                defaultValue={temas.fechafinal}
                                onChange={(e) => setTemas({ ...temas, fechafinal: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite la Fecha Final.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="horafinal">
                            <Form.Label>Hora Final</Form.Label>
                            <Form.Control
                                type="time"
                                name="horafinal"
                                showTimeSelect
                                showTimeSelectOnly
                                tI={60}
                                dateFormat="h:mm aa"
                                timeCaption="Time"
                                defaultValue={temas.horafinal}
                                onChange={(e) => setTemas({ ...temas, horafinal: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite la Hora Final.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="cohorte">
                            <Form.Label>Periodo</Form.Label>
                            <Select
                                type="select"
                                name="cohorte"
                                required
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(e) => setTemas({ ...temas, cohorte: e.value })}
                                options={[
                                    { value: temas.cohorte, label: 'Registrado: ' + temas.cohorte + '' },
                                    { value: 1, label: 'I Periodo' },
                                    { value: 2, label: 'II Periodo' },
                                    { value: 3, label: 'III Periodo' },
                                ]}
                                placeholder="Selecione el periodo..."
                                selected={temas.cohorte}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite el periodo.</Form.Control.Feedback>
                        </Form.Group>
                        <div className="button-list">
                            <Button type="button" onClick={actualizar}>
                                +
                            </Button>

                            <Button type="button" className="btn-icon" onClick={Close}>
                                <i className={classNames('mdi', ['mdi-window-close'], 'ms-1', 'me-1')}></i>
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
            <Link to="#" className="action-icon" onClick={() => toggleSignUp()}>
                {' '}
                <i className="mdi mdi-square-edit-outline"></i>
            </Link>
            <Link to="#" className="action-icon" onClick={() => eliminar()}>
                {' '}
                <i className="mdi mdi-delete"></i>
            </Link>
        </React.Fragment>
    );
};
const columns = [
    {
        Header: 'Action',
        accessor: 'action',
        sort: false,
        classes: 'table-action',
        Cell: ActionColumn,
    },
    {
        Header: 'ID',
        accessor: 'id',
        sort: true,
    },
    {
        Header: 'Titulo',
        accessor: 'titulo',
        sort: true,
    },
    {
        Header: 'Contenido',
        accessor: 'contenido',
        sort: true,
    },
    {
        Header: 'Fecha Inicio',
        accessor: 'fechainicio',
        sort: true,
    },
    {
        Header: 'Hora Inicio',
        accessor: 'horainicio',
        sort: true,
    },
    {
        Header: 'Fecha Final',
        accessor: 'fechafinal',
        sort: true,
    },
    {
        Header: 'Hora Final',
        accessor: 'horafinal',
        sort: true,
    },
    {
        Header: 'Cohorte',
        accessor: 'cohorte',
        sort: true,
    },
    {
        Header: 'Status',
        accessor: 'status',
        sort: true,
        Cell: StatusColumn,
    },
];
const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    },
];
type actividades = {
    selected: number,
    id_curso: number,
    programa: string,
    nombrecurso: string,
    nombremateria: string,
    codmateria: string,
    selectedFile: {},
    onClick: (date: any) => void,
    onState: (date: Array) => void,
};

const FormActividades = (props) => {
    const [signUpModal, setSignUpModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [temas, setTemas] = useState([]);

    const toggleSignUp = () => {
        setSignUpModal(!signUpModal);

        //setTemas([]);
        const Datos = {
            ...props.state,
            selected: 41,
            itemsinbox: 2,
        };
        props.onState(Datos);
    };

    const guardar = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (validated) {
            const Datos = {
                ...props.state,
                selected: 41,
                itemsinbox: 2,
            };
            props.onState(Datos);
            const datos = {
                titulo: temas.titulo,
                descripcion: temas.descripcion,
                fechainicio: temas.fechainicio,
                horainicio: temas.horainicio,
                fechafinal: temas.fechafinal,
                horafinal: temas.horafinal,
                cohorte: temas.cohorte,
            };
            let queryString;
            if (datos) {
                queryString = datos
                    ? Object.keys(datos)
                          .map((key) => key + '=' + datos[key])
                          .join('&')
                    : '';
            }

            if (temas.selectedFile) {
                const datosfiles = {
                    filename: temas.selectedFile[0].name,
                    size: temas.selectedFile[0].size,
                    formattedSize: temas.selectedFile[0].formattedSize,
                    lastModified: temas.selectedFile[0].lastModified,
                    type: temas.selectedFile[0].type,
                };
                props.setFiles(datosfiles);
                const queryDatos = datosfiles
                    ? Object.keys(datosfiles)
                          .map((key) => key + '=' + datosfiles[key])
                          .join('&')
                    : '';
                const urla = `https://aulaweb.autoevaluacion.com.co/v2/?&accion=editoractividades&id_autor=${props.state.id_pernatural}&grupo_id=${props.state.id_grupo}&cod_materia=${props.state.codmateria}&id_curso=${props.state.id_curso}&objeto=Actividad&${queryString}&${queryDatos}&opcion=registrar&operacion=doc&autor=Docente`;
                const respuesta = api.createactividadFile(`${urla}`, temas.selectedFile);
                respuesta.then(function (resp) {
                    const records = resp;
                    if (records) {
                        swal('' + records[0].menssage + '');
                        props.setFiles([]);
                    }
                });
            } else {
                const urla = `https://aulaweb.autoevaluacion.com.co/v2/?&accion=editoractividades&id_autor=${props.state.id_pernatural}&grupo_id=${props.state.id_grupo}&cod_materia=${props.state.codmateria}&id_curso=${props.state.id_curso}&objeto=Actividad&${queryString}&opcion=registrar&operacion=sindoc&autor=Docente`;
                const respuesta = api.createactividad(`${urla}`);
                respuesta.then(function (resp) {
                    const records = resp;
                    if (records) {
                        swal('' + records[0].menssage + '');
                    }
                });
            }
        }
    };

    const Close = (e) => {
        e.preventDefault();
        setSignUpModal(false);
        setTemas([]);
        props.setFiles([]);
    };

    return (
        <Card>
            <Card.Body>
                <Button variant="danger" className="btn-rounded mb-3" onClick={toggleSignUp}>
                    <i className="mdi mdi-plus"></i> Crear Actividad
                </Button>

                {/* Sign up Modal */}
                <Modal show={signUpModal} onHide={toggleSignUp}>
                    <Modal.Body>
                        <div className="text-center mt-2 mb-4">
                            <a href="/">
                                <span>
                                    <img src={logodark} alt="" height="18" />
                                </span>
                                <span>{props.state.nombremateria}</span>
                            </a>
                        </div>
                        <Form validated={validated}>
                            <Form.Group className="mb-3" controlId="Titulo">
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="Titulo"
                                    placeholder="Digite el Titulo del tema"
                                    value={temas.titulo}
                                    onChange={(e) => setTemas({ ...temas, titulo: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite el Título.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Descripcion">
                                <Form.Label>Descripción.</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="descripcion"
                                    placeholder="Digite la Descripción"
                                    defaultValue={temas.descripcion}
                                    onChange={(e) => setTemas({ ...temas, descripcion: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite la Descripción.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="FechaInicio">
                                <Form.Label>Fecha de Inicio:{temas.fechainicio}</Form.Label>

                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="date"
                                        name="fechainicio"
                                        required
                                        dateFormat="yyyy-MM-dd"
                                        defaultValue={temas.fechainicio}
                                        onChange={(e) => setTemas({ ...temas, fechainicio: e.target.value })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, digite la Fecha de Inicio.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>{' '}
                            <Form.Group className="mb-3" controlId="HoraInicial">
                                <Form.Label>Hora Inicio:{temas.horainicio}</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="horainicio"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    tI={60}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                    defaultValue={temas.horainicio}
                                    onChange={(e) => setTemas({ ...temas, horainicio: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite la Hora Final.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="FechaFinal">
                                <Form.Label>Fecha Final:{temas.fechafinal}</Form.Label>

                                <Form.Control
                                    type="date"
                                    name="fechafinal"
                                    required
                                    dateFormat="yyyy-MM-dd"
                                    defaultValue={temas.fechafinal}
                                    onChange={(e) => setTemas({ ...temas, fechafinal: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite la Fecha Final.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="HoraFinal">
                                <Form.Label>Hora Final:{temas.horafinal}</Form.Label>
                                <Form.Control
                                    type="time"
                                    name="horafinal"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    tI={60}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                    defaultValue={temas.horafinal}
                                    onChange={(e) => setTemas({ ...temas, horafinal: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite la Hora Final.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Cohorte">
                                <Form.Label>Periodo</Form.Label>
                                <Select
                                    type="select"
                                    name="Periodo"
                                    required
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    onChange={(e) => setTemas({ ...temas, cohorte: e.value })}
                                    options={[
                                        { value: 1, label: 'I Periodo' },
                                        { value: 2, label: 'II Periodo' },
                                        { value: 3, label: 'III Periodo' },
                                    ]}
                                    placeholder="Selecione el periodo..."
                                    selected={temas.cohorte}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite el periodo.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cargar Documento</Form.Label>
                                <FileUploader
                                    setFiles={props.setFiles}
                                    onFileUpload={(e) => {
                                        const files = Array.from(e);
                                        //const file = JSON.stringify(files);
                                        setTemas({ ...temas, selectedFile: files });
                                    }}
                                />
                            </Form.Group>
                            <div className="button-list">
                                <Button type="button" disabled={temas.message ? 'true' : ''} onClick={guardar}>
                                    +
                                </Button>
                                {temas.message && (
                                    <Button type="button" className="btn-icon" onClick={Close}>
                                        <i className={classNames('mdi', ['mdi-window-close'], 'ms-1', 'me-1')}></i>
                                    </Button>
                                )}
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

const EditorActividades = (props: actividades): React$Element<any> => {
    const [records, openActividades] = useState([]);
    const [data, cargarActividades] = useState([]);
    const [datafiles, setFiles] = useState([]);
    useEffect(() => {
        const urla = `http://aulaweb.autoevaluacion.com.co/v2/?&accion=editoractividades&id_autor=${props.state.id_pernatural}&grupo_id=${props.state.id_grupo}&cod_materia=${props.state.codmateria}&id_tema=${props.state.id_tema}&id_curso=${props.state.id_curso}&opcion=consultar&operacion=sindoc`;
        const syllab = api.setConsultas(`${urla}`);
        syllab.then(function (resp) {
            const records = resp;
            if (records) {
                openActividades(records);
            }
        });
    }, [props]);

    useEffect(() => {
        if (records && records.length > 0) {
            const cur = records;
            const mapped = [];
            mapped.push(cur);
            cargarActividades(mapped[0]);
        }
    }, [records]);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">
                                Actividad: {props.state.id_curso}/{props.state.codmateria}-{props.state.nombrecurso}-
                                {props.state.nombrecurso}
                            </h4>

                            <Row>
                                <Col sm={4}>
                                    <FormActividades
                                        state={props.state}
                                        onState={props.onState}
                                        setFiles={setFiles}
                                        datafiles={datafiles}
                                    />
                                </Col>
                                <Col sm={8}>
                                    <div className="text-sm-end">
                                        <Button className="btn btn-success mb-2 me-1">
                                            <i className="mdi mdi-cog-outline"></i>
                                        </Button>
                                        <Button
                                            className="btn btn-light mb-2 me-1"
                                            onClick={(date) =>
                                                props.onState({
                                                    ...props.state,
                                                    selected: 26,
                                                })
                                            }>
                                            Regresar
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                                theadClass="table-light"
                                searchBoxClass="mt-2 mb-3"
                                isSearchable={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default EditorActividades;
