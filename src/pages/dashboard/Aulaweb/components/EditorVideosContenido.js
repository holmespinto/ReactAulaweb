// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import logodark from '../../../../assets/images/logo-dark.png';
// components
import Select from 'react-select';
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
                    'bg-danger': row.cells[6].value,
                    'bg-success': !row.cells[6].value,
                })}>
                {row.cells[6].value ? 'Active' : 'Deactivated'}
            </span>
        </React.Fragment>
    );
};
/* action column render */
const ActionColumn = ({ row }) => {
    const INIT_TEMAS = {
        id_video: row.cells[1].value ? row.cells[1].value : row.cells[1].value,
        titulo: row.cells[2].value ? row.cells[2].value : row.cells[2].value,
        source: row.cells[3].value ? row.cells[3].value : row.cells[3].value,
        orden: row.cells[4].value ? row.cells[4].value : row.cells[4].value,
        tipo: row.cells[5].value ? row.cells[5].value : row.cells[5].value,
        status: row.cells[6].value ? row.cells[6].value : row.cells[6].value,
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
            title: 'Esta seguro que desea Desactivar el foro?',
            text: '',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((d) => {
            if (d) {
                const urla = `https://aulaweb.autoevaluacion.com.co/v2/?&accion=editorvideos&${response}&opcion=delete&operacion=sindoc`;
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

            const urla = `https://aulaweb.autoevaluacion.com.co/v2/?&accion=editorvideos&${response}&opcion=editar&operacion=sindoc`;
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
                        <Form.Group className="mb-3" controlId="source">
                            <Form.Label>Contenido</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="source"
                                placeholder="Digite el link del video"
                                value={temas.source}
                                onChange={(e) => setTemas({ ...temas, source: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite el orden.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="orden">
                            <Form.Label>Orden de lista</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                name="orden"
                                placeholder="Digite el link del video"
                                value={temas.orden}
                                onChange={(e) => setTemas({ ...temas, orden: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid">Por favor, digite el orden.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="tipo">
                            <Form.Label>Tipo de video</Form.Label>
                            <Select
                                type="select"
                                name="tipo"
                                required
                                className="react-select"
                                classNamePrefix="react-select"
                                onChange={(e) => setTemas({ ...temas, tipo: e.value })}
                                options={[
                                    { value: 1, label: 'Video tutorial para el contenido del curso' },
                                    { value: 2, label: 'Video de Clase' },
                                ]}
                                placeholder="Selecione el periodo..."
                                selected={temas.tipo}
                            />
                            <Form.Control.Feedback type="invalid">
                                Por favor, digite el tipo de video.
                            </Form.Control.Feedback>
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
        Header: 'Link',
        accessor: 'source',
        sort: true,
    },
    {
        Header: 'Tipo',
        accessor: 'tipo',
        sort: true,
    },
    {
        Header: 'Orden',
        accessor: 'orden',
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
type videos = {
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

const FormVideos = (props) => {
    const [signUpModal, setSignUpModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [temas, setTemas] = useState([]);

    const toggleSignUp = () => {
        setSignUpModal(!signUpModal);

        //setTemas([]);
        const Datos = {
            ...props.state,
            selected: 41,
            itemsinbox: 4,
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
                itemsinbox: 4,
            };
            props.onState(Datos);
            const datos = {
                titulo: temas.titulo,
                source: temas.source,
            };
            let queryString;
            if (datos) {
                queryString = datos
                    ? Object.keys(datos)
                          .map((key) => key + '=' + datos[key])
                          .join('&')
                    : '';
            }

            const urla = `https://aulaweb.autoevaluacion.com.co/v2/?&accion=editorvideos&id_autor=${props.state.id_pernatural}&grupo_id=${props.state.id_grupo}&cod_materia=${props.state.codmateria}&id_curso=${props.state.id_curso}&objeto=Video&${queryString}&opcion=registrar&operacion=sindoc&autor=Docente`;
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
        props.setFiles([]);
    };

    return (
        <Card>
            <Card.Body>
                <Button variant="danger" className="btn-rounded mb-3" onClick={toggleSignUp}>
                    <i className="mdi mdi-plus"></i> Subir video
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
                            <Form.Group className="mb-3" controlId="source">
                                <Form.Label>Ruta del video.</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="source"
                                    placeholder="Digite el Link"
                                    defaultValue={temas.source}
                                    onChange={(e) => setTemas({ ...temas, source: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">Por favor, digite el link.</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="tipo">
                                <Form.Label>Tipo de video</Form.Label>
                                <Select
                                    type="select"
                                    name="tipo"
                                    required
                                    className="react-select"
                                    classNamePrefix="react-select"
                                    onChange={(e) => setTemas({ ...temas, tipo: e.value })}
                                    options={[
                                        { value: 1, label: 'Video tutorial para el contenido del curso' },
                                        { value: 2, label: 'Video de Clase' },
                                    ]}
                                    placeholder="Selecione el periodo..."
                                    selected={temas.tipo}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite el tipo de video.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="orden">
                                <Form.Label>Orden de lista</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="orden"
                                    placeholder="Digite el orden"
                                    defaultValue={temas.orden}
                                    onChange={(e) => setTemas({ ...temas, orden: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite el orden.
                                </Form.Control.Feedback>
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

const EditorVideosContenidos = (props: videos): React$Element<any> => {
    const [records, openVideos] = useState([]);
    const [data, cargarVideos] = useState([]);
    useEffect(() => {
        const urla = `https://aulaweb.autoevaluacion.com.co/v2/?&accion=editorvideos&id_autor=${props.state.id_pernatural}&grupo_id=${props.state.id_grupo}&cod_materia=${props.state.codmateria}&id_tema=${props.state.id_tema}&id_curso=${props.state.id_curso}&opcion=consultar&operacion=sindoc`;
        const syllab = api.setConsultas(`${urla}`);
        syllab.then(function (resp) {
            const records = resp;
            if (records) {
                openVideos(records);
            }
        });
    }, [props]);

    useEffect(() => {
        if (records && records.length > 0) {
            const cur = records;
            const mapped = [];
            mapped.push(cur);
            cargarVideos(mapped[0]);
        }
    }, [records]);

    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">
                                Videos: {props.state.id_curso}/{props.state.codmateria}-{props.state.nombrecurso}-
                                {props.state.nombrecurso}
                            </h4>

                            <Row>
                                <Col sm={4}>
                                    <FormVideos state={props.state} onState={props.onState} />
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

export default EditorVideosContenidos;
