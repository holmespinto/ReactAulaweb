import { Card, ListGroup, Alert, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';

type datoscurso = {
    id: number,
    titulo_especidico: string,
    id_curso: number,
    codmateria: string,
};
type CursoModaProps = {
    modal?: string,
    toggle: string,
    nombrecurso: string,
    codmateria: string,
    datoscurso: Array<datoscurso>,
    onClick: (date: any) => void,
};

const MenuCursosModal = (props: CursoModaProps): React$Element<any> => {
    const [id_curso, setIDCurso] = useState(0);
    useEffect(() => {
        if (props.nombrecurso) {
            const pos = props.nombrecurso.indexOf('-');
            const id = props.nombrecurso.substr(0, pos);
            setIDCurso(id);
        }
    }, [props.nombrecurso]);
    const Menu = [
        {
            id: 1,
            label: 'Crear o editar el Contenido del curso',
            icon: 'uil-notes',
            type: 'docente',
            variant: 'dark',
            selected: 41,
            codmateria: props.codmateria,
            nombrecurso: props.nombrecurso,
            id_curso: id_curso,
        },
        {
            id: 2,
            label: 'Crear o Editar una Actividad',
            icon: 'uil-notes',
            type: 'docente',
            variant: 'primary',
            selected: 42,
            codmateria: props.codmateria,
            nombrecurso: props.nombrecurso,
            id_curso: id_curso,
        },
        {
            id: 3,
            label: 'Crear o Editar una Foro',
            icon: 'uil-notes',
            type: 'docente',
            variant: 'success',
            selected: 43,
            codmateria: props.codmateria,
            nombrecurso: props.nombrecurso,
            id_curso: id_curso,
        },
        {
            id: 4,
            label: 'Subirle un video al contenido',
            icon: 'uil-notes',
            type: 'docente',
            variant: 'danger',
            selected: 44,
            codmateria: props.codmateria,
            nombrecurso: props.nombrecurso,
            id_curso: id_curso,
        },
        {
            id: 5,
            label: 'Subirle un documento al contenido',
            icon: 'uil-notes',
            type: 'docente',
            variant: 'warning',
            selected: 45,
            codmateria: props.codmateria,
            nombrecurso: props.nombrecurso,
            id_curso: id_curso,
        },
        {
            id: 6,
            label: 'Ver la vista previa del curso',
            icon: 'uil-notes',
            type: 'docente',
            variant: 'success',
            selected: 46,
            codmateria: props.codmateria,
            nombrecurso: props.nombrecurso,
            id_curso: id_curso,
        },
        {
            id: 7,
            label: 'Toda las acciones',
            icon: 'uil-notes',
            type: 'docente',
            variant: 'primary',
            selected: 47,
            codmateria: props.codmateria,
            nombrecurso: props.nombrecurso,
            id_curso: id_curso,
        },
    ];
    var tasks = Menu.map(function (obj, i, array) {
        const data = array[i];
        const Datos = {
            selected: data.selected,
            nombrecurso: data.nombrecurso,
            codmateria: data.codmateria,
            id_curso: data.id_curso,
        };

        return (
            <>
                <ListGroup.Item
                    key={i}
                    as="button"
                    variant={data.variant}
                    onClick={(date) => props.onChange(Datos)}
                    action>
                    <i className="uil-facebook-messenger me-1"></i>
                    <span>
                        {i + 1}. {data.label}
                    </span>
                </ListGroup.Item>
            </>
        );
    });
    return (
        <>
            {' '}
            <Modal show={props.modal} onHide={props.toggle}>
                <Modal.Header
                    onHide={props.toggle}
                    closeButton
                    className={classNames('modal-colored-header', 'bg-primary')}>
                    <h4 className="modal-title">Cuales de las siguientes acciones deseas aplicarle al curso?</h4>
                </Modal.Header>
                <Modal.Body>
                    <form className="ps-3 pe-3" action="#">
                        <div className="mb-3">
                            <Alert variant="success">
                                <label htmlFor="username" className="form-label">
                                    {props.nombrecurso}
                                </label>
                            </Alert>

                            <Card>
                                <Card.Body>
                                    <ListGroup>{tasks}</ListGroup>
                                </Card.Body>
                            </Card>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
            {/* FIN Sign up Modal */}
        </>
    );
};
export default MenuCursosModal;
