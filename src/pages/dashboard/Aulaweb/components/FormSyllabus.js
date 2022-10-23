// @flow
import React, { useState } from 'react';
import { Row, Col, Card, Button, Modal, InputGroup, Form, Alert, Collapse } from 'react-bootstrap';
import logodark from '../../../../assets/images/logo-dark.png';

import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { APICore } from '../../../../helpers/api/apiCore';
const api = new APICore();

const ModalFormSyllabus = (props) => {
    const [modal, setModal] = useState(false);
    const [className, setClassName] = useState(null);
    const [validated, setValidated] = useState(false);
    const [temas, setTemas] = useState([]);
    const [message, setMessage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    /**
     * Show/hide the modal
     */
    const toggle = () => {
        setModal(!modal);
        setClassName(null);
        setIsOpen(!isOpen);
        //setMessage(null);
        //setTemas([]);
    };
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
        if (validated) {
            const Datos = {
                ...props.state,
                selected: 0,
            };
            props.onState(Datos);
            let response;
            if (temas) {
                var queryString = temas
                    ? Object.keys(temas)
                          .map((key) => key + '=' + temas[key])
                          .join('&')
                    : '';
            }
            response = queryString;

            const urla = `https://aulaweb.autoevaluacion.com.co/v1/formsyllabus?&id_autor=${props.state.id_pernatural}&grupo_id=${props.state.id_grupo}&cod_materia=${props.state.codmateria}&${response}`;
            const forms = api.setFormSyllabus(`${urla}`);
            forms.then((res) => setMessage(JSON.parse(res).message));
            setIsOpen(true);
            setModal();
        }
    };

    const Mensage = () => {
        const colors = ['success'];
        const icons = ['dripicons-checkmark'];

        return (
            <Card>
                <Card.Body>
                    {colors.map((color, index) => {
                        return (
                            <Alert variant={color} key={index}>
                                <i className={classNames(icons[index], 'me-2')}></i>
                                <strong>{message}</strong>
                            </Alert>
                        );
                    })}
                </Card.Body>
            </Card>
        );
    };

    const Close = (e) => {
        e.preventDefault();
        setMessage(null);
        setTemas([]);
    };

    return (
        <>
            <Card>
                <Card.Body>
                    <h4 className="header-title">Administrador de Syllabus</h4>

                    <p className="text-muted">En estas sección se administran los syllabus y sus contenidos</p>
                    <div className="button-list">
                        <Button variant="primary" onClick={toggle}>
                            Crear Syllabus
                        </Button>
                    </div>
                    <Collapse in={isOpen}>
                        <div>
                            <div className="card card-body mb-0">{''}</div>
                        </div>
                    </Collapse>
                    <Modal show={modal} onHide={toggle} dialogClassName={className}>
                        <Modal.Header onHide={toggle} closeButton>
                            <h4 className="modal-title">Formulario para el registro de Syllabus</h4>
                        </Modal.Header>
                        <Form validated={validated}>
                            <Modal.Body>
                                {message && <Mensage />}
                                <div className="text-center mt-2 mb-4">
                                    <a href="/">
                                        <span>
                                            <img src={logodark} alt="" height="18" />
                                        </span>
                                    </a>
                                </div>
                                <Form.Group className="mb-3" controlId="Titulo">
                                    <Form.Label>Titulo del Syllabus</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Digite el Titulo del tema"
                                        value={temas.titulo}
                                        onChange={(e) => setTemas({ ...temas, titulo: e.target.value })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid tema.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Unidad">
                                    <Form.Label>Unidad.</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite el No. de la Unidad"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        value={temas.unidad}
                                        onChange={(e) => setTemas({ ...temas, unidad: e.target.value })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid Unidad.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Semana">
                                    <Form.Label>No. Semana</Form.Label>
                                    <InputGroup hasValidation>
                                        <Form.Control
                                            type="text"
                                            placeholder="Digite el No. de Semana"
                                            aria-describedby="inputGroupPrepend"
                                            required
                                            value={temas.semana}
                                            onChange={(e) => setTemas({ ...temas, semana: e.target.value })}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Please provide a valid Semana.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Horas">
                                    <Form.Label>No. Horas</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite el No. Horas"
                                        required
                                        value={temas.horas}
                                        onChange={(e) => setTemas({ ...temas, hora: e.target.value })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid subtitulo.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="Horas">
                                    <Form.Label>Título del Curso</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite el Curso"
                                        required
                                        value={temas.curso}
                                        onChange={(e) => setTemas({ ...temas, titulocurso: e.target.value })}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid curso.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer>
                                <div className="button-list">
                                    <Button type="button" disabled={message ? 'true' : ''} onClick={handleSubmit}>
                                        +
                                    </Button>
                                    {message && (
                                        <Button type="button" className="btn-icon" onClick={Close}>
                                            <i className={classNames('mdi', ['mdi-window-close'], 'ms-1', 'me-1')}></i>
                                        </Button>
                                    )}
                                </div>
                            </Modal.Footer>
                        </Form>
                    </Modal>
                </Card.Body>
            </Card>
        </>
    );
};

const FormSyllabus = (props): React$Element<React$FragmentType> => {
    return (
        <React.Fragment>
            <Row>
                <Col md={12}>
                    <ModalFormSyllabus onState={props.onState} state={props.state} />
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default FormSyllabus;
