// @flow
import React, { useState } from 'react';
import { Card, Button, Form, InputGroup, Alert, Modal } from 'react-bootstrap';
import classNames from 'classnames';
import logodark from '../../../../assets/images/logo-dark.png';
// components
import { APICore } from '../../../../helpers/api/apiCore';
const api = new APICore();
/* status column render */
type actividades = {
    selected: number,
    id_curso: number,
    programa: string,
    nombrecurso: string,
    nombremateria: string,
    codmateria: string,
    onClick: (date: any) => void,
    onChange: (date: Array) => void,
};
const FormActividades = (props: actividades): React$Element<any> => {
    const [signUpModal, setSignUpModal] = useState(false);
    const [validated, setValidated] = useState(false);
    const [temas, setTemas] = useState([]);
    const [message, setMessage] = useState(null);
    const [fechainicio, setFechaInicio] = useState(new Date());
    const [horainicio, setHoraInicial] = useState(new Date());
    const [fechafinal, setFechaFinal] = useState(new Date());
    const [horafinal, setHoraFinal] = useState(new Date());
    const toggleSignUp = () => {
        setSignUpModal(!signUpModal);
        setMessage(null);
        setTemas([]);
        const Datos = {
            ...props.state,
            selected: 41,
            itemsinbox: 2,
        };
        props.onChange(Datos);
    };
    /*
     * handle form submission
     */
    const onChangeFechaInicio = (date) => {
        if (date) {
            setFechaInicio(date);
        }
    };
    const onChangeHoraInicial = (date) => {
        if (date) {
            setHoraInicial(date);
        }
    };
    const onChangeFechaFinal = (date) => {
        if (date) {
            setFechaFinal(date);
        }
    };
    const onChangeHoraFinal = (date) => {
        if (date) {
            setHoraFinal(date);
        }
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
                selected: 41,
                itemsinbox: 2,
            };
            props.onChange(Datos);
            let response;
            if (temas) {
                var queryString = temas
                    ? Object.keys(temas)
                          .map((key) => key + '=' + temas[key])
                          .join('&')
                    : '';
            }
            response = queryString;
            const urla = `https://aulaweb.autoevaluacion.com.co/v1/formsyllabus?&programa_id=12&cod_materia=${props.codmateria}&${response}`;
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
    const Close = (e) => {
        e.preventDefault();
        setSignUpModal(false);
        setMessage(null);
        setTemas([]);
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
                        {message && <Mensage />}
                        <div className="text-center mt-2 mb-4">
                            <a href="/">
                                <span>
                                    <img src={logodark} alt="" height="18" />
                                </span>
                                <span>{props.nombremateria}</span>
                            </a>
                        </div>
                        <Form validated={validated}>
                            <Form.Group className="mb-3" controlId="cod_materia">
                                <Form.Control type="text" placeholder="cod_materia" defaultValue={props.codmateria} />
                                <Form.Control type="text" placeholder="id_curso" defaultValue={props.id_curso} />
                                <Form.Control
                                    type="text"
                                    placeholder="periodoacademico_id"
                                    defaultValue={props.periodoacademico_id}
                                />
                                <Form.Control type="text" placeholder="grupo_id" defaultValue={props.grupo_id} />
                                <Form.Control type="text" placeholder="id_programa" defaultValue={props.id_programa} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="Titulo">
                                <Form.Label>Titulo</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
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
                                    placeholder="Digite la Descripción"
                                    value={temas.descripcion}
                                    onChange={(e) => setTemas({ ...temas, descripcion: e.target.value })}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite la Descripción.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="FechaInicio">
                                <Form.Label>Fecha de Inicio</Form.Label>
                                <InputGroup hasValidation>
                                    <Form.Control
                                        type="date"
                                        required
                                        dateFormat="yyyy-MM-dd"
                                        defaultValue={fechainicio}
                                        onChange={(date) => {
                                            onChangeFechaInicio(date);
                                            setTemas({ ...temas, fechainicial: fechainicio });
                                        }}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Por favor, digite la Fecha de Inicio.
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="HoraInicial">
                                <Form.Label>Hora Inicio</Form.Label>
                                <Form.Control
                                    type="time"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    tI={60}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                    defaultValue={horainicio}
                                    onChange={(time) => {
                                        onChangeHoraInicial(time);
                                        setTemas({ ...temas, horainicial: horainicio });
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite la Hora Final.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="FechaFinal">
                                <Form.Label>Fecha Final</Form.Label>
                                <Form.Control
                                    type="date"
                                    required
                                    dateFormat="yyyy-MM-dd"
                                    defaultValue={fechafinal}
                                    onChange={(date) => {
                                        onChangeFechaFinal(date);
                                        setTemas({ ...temas, fechafinal: fechafinal });
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite la Fecha Final.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="HoraFinal">
                                <Form.Label>Hora Final</Form.Label>
                                <Form.Control
                                    type="time"
                                    showTimeSelect
                                    showTimeSelectOnly
                                    tI={60}
                                    dateFormat="h:mm aa"
                                    timeCaption="Time"
                                    defaultValue={horafinal}
                                    onChange={(time) => {
                                        onChangeHoraFinal(time);
                                        setTemas({ ...temas, horafinal: horafinal });
                                    }}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Por favor, digite la Hora Final.
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
export default FormActividades;
