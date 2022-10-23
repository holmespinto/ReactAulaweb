// @flow
// @flow
import classNames from 'classnames';
import { Col, Row, Card, Popover } from 'react-bootstrap';
import React from 'react';
import { Link } from 'react-router-dom';
import VistaTemaCursos from './components/VistaTemaCursos';
import EditorActividades from './components/EditorActividades';
import EditarContenido from './components/EditarContenido';
import EditorForos from './components/EditorForos';
import EditorVideosContenido from './components/EditorVideosContenido';
import EditorDocumentos from './components/EditorDocumentos';

type Propsmenuleft = {
    itemsactividad: number,
    clase?: string,
    id: number,
    nombremateria: string,
    codmateria: string,
    classe: string,
    name: string,
    color: string,
    selected: number,
    onClick: (date: any) => void,
};

const MenuLeft = (props: Propsmenuleft): React$Element<any> => {
    const opcions = [
        {
            id: 1,
            label: 'Editor de Contenidos',
            icon: 'dripicons-inbox me-2',
            variant: 'dark',
            itemsinbox: 1,
        },
        {
            id: 2,
            label: 'Actividades',
            icon: 'dripicons-clock me-2',
            variant: 'primary',
            itemsinbox: 2,
        },
        {
            id: 3,
            label: 'Foros',
            icon: 'dripicons-document me-2',
            variant: 'success',
            itemsinbox: 3,
        },
        {
            id: 4,
            label: 'Videos',
            icon: 'dripicons-document me-2',
            variant: 'danger',
            itemsinbox: 4,
        },
        {
            id: 5,
            label: 'Mis Documentos',
            icon: 'dripicons-document me-2',
            variant: 'warning',
            itemsinbox: 5,
        },
        {
            id: 6,
            label: 'Vista previa',
            icon: 'uil uil-notes me-2',
            variant: 'success',
            itemsinbox: 0,
        },
        {
            id: 0,
            label: 'Regresar',
            icon: 'dripicons-exit me-2',
            variant: 'dark',
            selected: 26,
        },
    ];
    return (
        <React.Fragment>
            {opcions &&
                opcions.length > 0 &&
                opcions.map((record: any, i) => {
                    return (
                        <>
                            <div className="page-aside-left" key={'inbox_' + record.id}>
                                <Link
                                    key={'inbox_' + record.id}
                                    to="#"
                                    className={classNames('text-' + record.variant)}
                                    onClick={(date) =>
                                        props.onState({
                                            ...props.state,
                                            selected: 41,
                                            itemsinbox: record.itemsinbox,
                                        })
                                    }>
                                    <i className={classNames(record.icon)}></i>
                                    {record.label}
                                    <span className="badge badge-danger-lighten float-end ms-2">1</span>
                                </Link>
                            </div>
                        </>
                    );
                })}
        </React.Fragment>
    );
};
const popover = (titulo, str) => {
    return (
        <Popover>
            <Popover.Header as="h3">{str}</Popover.Header>
            <Popover.Body>{titulo}</Popover.Body>
        </Popover>
    );
};
const Inbox = (props): React$Element<React$FragmentType> => {
    //console.log(props.state);
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Col sm={7} className="mt-1">
                                <div className="page-aside-left">
                                    <MenuLeft state={props.state} onState={props.onState} />
                                </div>
                            </Col>

                            {(() => {
                                switch (props.state.itemsinbox) {
                                    case 0:
                                        return (
                                            <Col sm={12} className="mt-1">
                                                <VistaTemaCursos
                                                    state={props.state}
                                                    popover={popover}
                                                    inputClass="form-control-light"
                                                    onState={props.onState}
                                                />
                                            </Col>
                                        );
                                    case 1:
                                        return (
                                            <Col sm={12} className="mt-1">
                                                <EditarContenido state={props.state} />{' '}
                                            </Col>
                                        );
                                    case 2:
                                        return (
                                            <Col sm={12} className="mt-1">
                                                {' '}
                                                <EditorActividades
                                                    state={props.state}
                                                    popover={popover}
                                                    inputClass="form-control-light"
                                                    onState={props.onState}
                                                />
                                            </Col>
                                        );
                                    case 3:
                                        return (
                                            <Col sm={12} className="mt-1">
                                                <EditorForos
                                                    state={props.state}
                                                    popover={popover}
                                                    inputClass="form-control-light"
                                                    onState={props.onState}
                                                />
                                            </Col>
                                        );
                                    case 4:
                                        return (
                                            <Col sm={12} className="mt-1">
                                                <EditorVideosContenido
                                                    state={props.state}
                                                    onState={props.onState}
                                                    popover={popover}
                                                    inputClass="form-control-light"
                                                />{' '}
                                            </Col>
                                        );
                                    case 5:
                                        return (
                                            <Col sm={12} className="mt-1">
                                                <EditorDocumentos
                                                    state={props.state}
                                                    onState={props.onState}
                                                    popover={popover}
                                                    inputClass="form-control-light"
                                                />
                                            </Col>
                                        );
                                    case 6:
                                        return <Col sm={12} className="mt-1"></Col>;
                                    case 7:
                                        return <Col sm={12} className="mt-1"></Col>;
                                    default:
                                        return (
                                            <Col sm={7}>
                                                <VistaTemaCursos
                                                    state={props.state}
                                                    popover={popover}
                                                    inputClass="form-control-light"
                                                    onState={props.onState}
                                                />
                                            </Col>
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

export default Inbox;
