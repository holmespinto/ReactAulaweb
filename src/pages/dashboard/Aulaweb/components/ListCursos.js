// @flow
import classNames from 'classnames';
import { Card, Table, OverlayTrigger, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import { APICore } from '../../../../helpers/api/apiCore';
const api = new APICore();

class CursosTextInput extends React.Component {
    constructor(props) {
        super(props);
        // create a ref to store the textInput DOM element
        this.textInput = React.createRef();
        this.focusTextInput = this.focusTextInput.bind(this);
        this.state = { value: props.titulo, id: props.id };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    focusTextInput() {
        this.textInput.current.focus();
    }

    render() {
        return (
            <div>
                <span>{this.titulo}</span>
                <textarea
                    rows="10"
                    ref={this.textInput}
                    id={this.state.id}
                    value={this.state.value}
                    onChange={this.handleChange}
                    style={{ height: '100px', with: '100px' }}
                />
            </div>
        );
    }
}
type ListaProps = {
    totalUnreadEmails: number,
    onChange: (date: Array) => void,
    datos: Array,
};
const BasicTable = (props): React$Element<any> => {
    const [iconsedit, setIconsEdit] = useState('uil-edit-alt');
    const [itemsid, setItemsID] = useState(0);
    const [iconsadd, setIconsAdd] = useState('uil uil-plus');

    const editarcurso = (id, titulo, id_c) => {
        setIconsEdit('uil uil-package');
        setItemsID(id);
        setIconsAdd('uil uil-plus');
        setTimeout(function () {
            if (document.getElementById('' + id + '') !== null) {
                const str = document.getElementById('' + id + '').value;
                if (titulo.length !== str.length) {
                    swal({
                        title: 'Esta seguro que desea EDITAR un nuevo registro?',
                        text: '',
                        icon: 'warning',
                        buttons: true,
                        dangerMode: true,
                    }).then((willDelete) => {
                        if (willDelete) {
                            const urla = `https://aulaweb.autoevaluacion.com.co/v1/addcurso?&id=${id}&titulo=${str}&id_t=${id_c}&accion=2&id_autor=${props.state.id_pernatural}`;
                            const forms = api.setFormSyllabus(`${urla}`);
                            forms.then((res) => swal(JSON.parse(res).message), {
                                icon: 'success',
                            });
                            const Datos = {
                                ...props.state,
                                selected: 26,
                            };
                            props.onState(Datos);
                        } else {
                            //swal('Your imaginary file is safe!');
                        }
                    });
                }
            }
        }, 0);
    };
    const removes = (id) => {
        //alert(id);
        swal({
            title: 'Esta seguro que desea eliminar el curso?',
            text: 'Al eliminar el curso, se eliminan las Actividades, Foros, y todo elemento vinculado a este curso. Exceptuando las calificaciones',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                const urla = `https://aulaweb.autoevaluacion.com.co/v1/addcurso?&id=${id}&accion=3`;
                const forms = api.setFormSyllabus(`${urla}`);
                forms.then((res) => swal(JSON.parse(res).message), {
                    icon: 'success',
                });
                const Datos = {
                    ...props.state,
                    selected: 26,
                };
                props.onState(Datos);
            } else {
                //swal('Your imaginary file is safe!');
            }
        });
    };
    const addcurso = (id, titulo) => {
        setIconsEdit('uil-edit-alt');
        setIconsAdd('uil uil-package');

        setItemsID(id);

        setTimeout(function () {
            if (document.getElementById('' + id + '') !== null) {
                const str = document.getElementById('' + id + '').value;
                if (titulo.length !== str.length) {
                    swal({
                        title: 'Esta seguro que desea ADJUNTAR un nuevo registro?',
                        text: '',
                        icon: 'warning',
                        buttons: true,
                        dangerMode: true,
                    }).then((willDelete) => {
                        if (willDelete) {
                            const urla = `https://aulaweb.autoevaluacion.com.co/v1/addcurso?&id=${id}&titulo=${str}&id_t=${props.id_t}&accion=1&id_autor=${props.state.id_pernatural}`;
                            const forms = api.setFormSyllabus(`${urla}`);
                            forms.then((res) => swal(JSON.parse(res).message), {
                                icon: 'success',
                            });
                            const Datos = {
                                ...props.state,
                                selected: 26,
                            };
                            props.onState(Datos);
                        } else {
                            //swal('Your imaginary file is safe!');
                        }
                    });
                    //alert(str);
                }
            }
        }, 0);
    };
    const style = { textAlign: 'left' };
    return (
        <Card>
            <Card.Body>
                <Table responsive bordered striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Título</th>
                        </tr>
                    </thead>

                    <tbody>
                        {props.records[0].map((data, index) => {
                            //console.log(data.id_curso);
                            return (
                                <tr key={index}>
                                    <th className="text-nowrap" scope="row">
                                        {data.id_curso > 0 ? (
                                            <Link
                                                to="#"
                                                className={classNames(props.className)}
                                                onClick={(d) => {
                                                    removes(data.id);
                                                }}>
                                                <OverlayTrigger
                                                    trigger={['hover', 'focus']}
                                                    placement="right"
                                                    overlay={props.popover(
                                                        'Elimina el curso y todo sus componentes. Le recomiendo ser precavido con esta opción.',
                                                        'Eliminar'
                                                    )}>
                                                    <i className="uil uil-times-circle text-danger"></i>
                                                </OverlayTrigger>
                                            </Link>
                                        ) : null}
                                        <br />
                                        {data.id_curso > 0 ? (
                                            <Link
                                                to="#"
                                                className={classNames(props.className)}
                                                onClick={(d) => {
                                                    editarcurso(data.id_curso, data.titulo_especidico, data.id);
                                                }}>
                                                {data.id_curso === itemsid ? (
                                                    <i className={classNames(iconsedit)}></i>
                                                ) : (
                                                    <OverlayTrigger
                                                        trigger={['hover', 'focus']}
                                                        placement="right"
                                                        overlay={props.popover(
                                                            'Edita, en linea, el título del curso',
                                                            'Editor de Título del Curso'
                                                        )}>
                                                        <i
                                                            className="uil-edit-alt"
                                                            onClick={(date) =>
                                                                addcurso(data.id_curso, data.titulo_especidico)
                                                            }></i>
                                                    </OverlayTrigger>
                                                )}
                                            </Link>
                                        ) : null}
                                        <br />

                                        <Link
                                            to="#"
                                            className={classNames(props.className)}
                                            onClick={(d) => {
                                                addcurso(data.id_curso, data.titulo_especidico);
                                            }}>
                                            {data.id_curso === itemsid ? (
                                                <i className={classNames(iconsadd)}></i>
                                            ) : (
                                                <OverlayTrigger
                                                    trigger={['hover', 'focus']}
                                                    placement="right"
                                                    overlay={props.popover('Adjuntar curso', 'Adjuntar')}>
                                                    <i className="uil uil-plus"></i>
                                                </OverlayTrigger>
                                            )}
                                        </Link>
                                        <br />
                                        {data.id_curso > 0 ? (
                                            <OverlayTrigger
                                                trigger={['hover', 'focus']}
                                                placement="right"
                                                overlay={props.popover(
                                                    'Aqui se edita el contenidos del curso y todo sus componentes: Actividades, Foros, Mis Documentos..',
                                                    'Editor de Contenido'
                                                )}>
                                                <Link
                                                    to="#"
                                                    className={classNames(props.className)}
                                                    onClick={(date) =>
                                                        props.onState({
                                                            ...props.state,
                                                            selected: 41,
                                                            id_curso: data.id_curso,
                                                            id_tema: props.id_t,
                                                            nombrecurso: data.titulo_especidico,
                                                            itemsinbox: 0,
                                                            id: data.id,
                                                        })
                                                    }>
                                                    <i className="uil  uil-cog text-secundary"></i>
                                                </Link>
                                            </OverlayTrigger>
                                        ) : null}
                                    </th>
                                    <td>
                                        {data.id_curso === itemsid ? (
                                            <Card.Title tag="h5" className="mb-0">
                                                <CursosTextInput id={data.id_curso} titulo={data.titulo_curso} />
                                            </Card.Title>
                                        ) : (
                                            <Card.Title className="mb-0">
                                                <h5 style={style} title={data.titulo_curso}>
                                                    {data.titulo_curso}
                                                </h5>
                                                <p
                                                    style={style}
                                                    className={classNames('fw-normal', 'mt-0', 'text-muted')}
                                                    title={data.titulo_curso}></p>
                                            </Card.Title>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};
const ListCursos = (props: ListaProps): React$Element<any> => {
    return (
        <>
            <Row>
                <Col xl={12}>
                    <BasicTable
                        records={props.datos}
                        popover={props.popover}
                        data={props.data}
                        state={props.state}
                        id_t={props.id_t}
                        onState={props.onState}
                    />
                </Col>
            </Row>
        </>
    );
};

export default ListCursos;
