// @flow
import React, { useState } from 'react';
import { Card, Button, Modal, InputGroup, Form, Alert, OverlayTrigger } from 'react-bootstrap';
import logodark from '../../../../assets/images/logo-dark.png';
import { APICore } from '../../../../helpers/api/apiCore';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
const api = new APICore();

const FormActualizaSyllabus = (props) => {
    const [signUpModal, setSignUpModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const INIT_ITEMS = {
        unidad: props.itemstemas.unidad,
        titulo: props.itemstemas.titulo,
        semana: props.itemstemas.semana,
        hora: props.itemstemas.hora,
    };
    const [items, setItemsTemas] = useState(INIT_ITEMS);
    const [temas, setTemas] = useState([]);

    const [message, setMessage] = useState(null);
    const toggleUp = () => {
        setSignUpModal(true);
        setMessage(null);
        setTemas([]);

        const Datos = {
            ...props.state,
            selected: 26,
        };
        props.onState(Datos);
    };
    /*
     * handle form submission
     */

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
                selected: 26,
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

            if (temas.titulo) {
                const Items = {
                    ...items,
                    titulo: temas.titulo,
                };
                setItemsTemas(Items);
            }
            if (temas.unidad) {
                const Items = {
                    ...items,
                    unidad: temas.unidad,
                };
                setItemsTemas(Items);
            }
            if (temas.semana) {
                const Items = {
                    ...items,
                    semana: temas.semana,
                };
                setItemsTemas(Items);
            }
            if (temas.hora) {
                const Items = {
                    ...items,
                    hora: temas.hora,
                };
                setItemsTemas(Items);
            }

            const urla = `https://aulaweb.autoevaluacion.com.co/v1/formsyllabus?&cod_materia=${props.state.codmateria}&${response}&id=${props.itemstemas.id}`;
            const forms = api.setFormSyllabus(`${urla}`);
            forms.then((res) => setMessage(JSON.parse(res).message));
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

    const toggleSignUp = () => {
        setSignUpModal(false);
    };
    const Close = (e) => {
        e.preventDefault();
        setSignUpModal(false);
        setMessage(null);
        setTemas([]);
    };
    return (
        <Card className="d-block">
            <Card.Body className="position-relative" style={{ height: 80, margin: 0, padding: 0 }}>
                <OverlayTrigger
                    trigger={['hover', 'focus']}
                    placement="right"
                    overlay={props.popover(
                        'Editor del título del Tema y todo sus componentes: Semanas, Unidad.',
                        'Editor del Título Tema'
                    )}>
                    <Link to="#" className={classNames('text-muted font-14')} onClick={toggleUp}>
                        <i className="uil-edit-alt"></i>{' '}
                    </Link>
                </OverlayTrigger>
                <p className="mb-1">
                    <span className="pe-2 text-nowrap mb-2 d-inline-block">
                        <i className="mdi mdi-format-list-bulleted-type text-muted me-1"></i>
                        <b>Unidad: {items.unidad}</b>
                    </span>
                    <span className="text-nowrap mb-2 d-inline-block">
                        <i className="mdi mdi-calendar-check-outline text-muted me-1"></i>
                        Semana: <b>{items.semana}</b>
                    </span>
                    <span className="text-nowrap mb-2 d-inline-block">
                        <i className="mdi mdi mdi-account-clock text-muted me-1"></i>
                        Horas: <b>{items.hora}</b>
                    </span>
                </p>
                {/* Sign up Modal */}
                <Modal show={signUpModal} onHide={toggleSignUp}>
                    <Modal.Body>
                        {message && <Mensage />}
                        <div className="text-center mt-2 mb-4">
                            <a href="/">
                                <span>
                                    <img src={logodark} alt="" height="18" />
                                </span>
                                <span>{props.state.nombremateria}</span>
                            </a>
                        </div>
                        <Form validated={validated}>
                            <Form.Group className="mb-3" controlId="cod_materia">
                                <Form.Control type="hidden" defaultValue={props.state.codmateria} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Titulo">
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Digite el Titulo del tema"
                                    defaultValue={items.titulo}
                                    onChange={(e) => setTemas({ ...temas, titulo: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid tema.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Unidad">
                                <Form.Label>Unidad.</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="Digite la Unidad"
                                    defaultValue={props.unidad}
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
                                        defaultValue={props.semanas}
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
                                    defaultValue={props.horas}
                                    onChange={(e) => setTemas({ ...temas, hora: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid Horas.
                                </Form.Control.Feedback>
                            </Form.Group>
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
                        </Form>
                    </Modal.Body>
                </Modal>
            </Card.Body>
        </Card>
    );
};

type ActuProps = {
    titulo: string,
    codmateria: string,
    selected?: number,
    id: number,
    horas: number,
    semanas: number,
    horas: number,
    unidad: number,
    onClick: (date: any) => void,
};

const FormActSyllabus = (props: ActuProps): React$Element<any> => {
    return (
        <React.Fragment>
            <FormActualizaSyllabus
                itemstemas={props.itemstemas}
                state={props.state}
                onState={props.onState}
                popover={props.popover}
            />
        </React.Fragment>
    );
};

export default FormActSyllabus;
