// @flow
import classNames from 'classnames';
import { Col, Card, Row, Popover } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

import FormSyllabus from './components/FormSyllabus';
import FormActSyllabus from './components/FormActSyllabus';
import ListCursos from './components/ListCursos';
import MenuEditorTemas from './components/MenuEditorTemas';
import ExportarTemas from './components/ExportarTemas';
import avatarImg from '../../../assets/images/users/avatar-2.jpg';
import { APICore } from '../../../helpers/api/apiCore';
const api = new APICore();

type datoscurso = {
    id: number,
    titulo_especidico: string,
    id_curso: number,
    codmateria: string,
};

type SyllabusProps = {
    itemsactividad: number,
    clase?: string,
    id: number,
    nombremateria: string,
    pendietes: string,
    classe: string,
    name: string,
    color: string,
    selected: number,
    nombrecurso: string,
    onClick: (date: any) => void,
    onState: (date: Array) => void,
    datoscurso: Array<datoscurso>,
    className?: string,
    children?: any,
    showStarred: () => void,
};
type PortletState = {
    collapse?: boolean,
    loading?: boolean,
    hidden?: boolean,
};

const popover = (titulo, str) => {
    return (
        <Popover>
            <Popover.Header as="h3">{str}</Popover.Header>
            <Popover.Body>{titulo}</Popover.Body>
        </Popover>
    );
};

const Syllabus = (props: SyllabusProps, state: PortletState): React$Element<any> => {
    const [syllabus, openSyllabus] = useState([]);
    const [titulos, openMapeado] = useState([]);
    const [selinbox, setMenuInbox] = useState(0);
    const [signUpModal, setSignUpModal] = useState(false);
    useEffect(() => {
        const urla = `https://aulaweb.autoevaluacion.com.co/v1/listacursos?cod_materia=${props.state.codmateria}&grupo_id=${props.state.id_grupo}`;
        const syllab = api.setSyllabusTitulos(`${urla}`);
        syllab.then(function (resp) {
            // console.log(resp);
            if (resp) {
                openSyllabus(resp);
            }
        });
    }, [props.state.codmateria, props.state.id_grupo]);

    useEffect(() => {
        if (syllabus && syllabus.length > 0) {
            const cur = JSON.parse(syllabus);
            const mapped = [];
            mapped.push(cur);
            openMapeado(mapped[0]);
        }
    }, [syllabus]);

    const showStarred = (e) => {
        setMenuInbox(e);
    };
    //console.log(titulos);

    return (
        <React.Fragment>
            <Row className="mb-2">
                <Col sm={12}>
                    <FormSyllabus state={props.state} onState={props.onState} />
                </Col>
            </Row>
            <Row>
                {titulos &&
                    titulos.length > 0 &&
                    titulos.map((items: any, index) => {
                        const Arraytemas = {
                            id: items.titulos.items[0].id_t,
                            selected: 5,
                            id_tema: items.titulos.id_tema,
                            programa_id: items.titulos.programa_id,
                            semana: items.titulos.semana,
                            hora: items.titulos.hora,
                            unidad: items.titulos.unidad,
                            titulo: items.titulos.titulo,
                        };

                        return index % 2 !== 0 ? (
                            <Col lg={6} xxl={4} key={'proj-' + index}>
                                <MenuEditorTemas
                                    onState={props.onState}
                                    className="mb-md-0 mb-3 bg-success"
                                    value={items.titulos.items[0].statut}
                                    nombretema={''}
                                    id_t={Arraytemas.id}
                                    popover={popover}>
                                    <Card className="ribbon-box mb-0 d-block">
                                        <Card.Body className="p-3">
                                            <div className={classNames('ribbon', 'ribbon-success', 'float-start')}>
                                                <i className="uil uil-check me-1"></i>
                                                <span>{index + 1}</span>
                                            </div>
                                            {items.titulos.items[0].statut !== 'sin-registros' && (
                                                <div className="d-flex mb-3 mt-1">
                                                    <div className="w-100 overflow-hidden">
                                                        <small className="float-end text-center">
                                                            {''}
                                                            {Arraytemas.titulo}
                                                        </small>
                                                    </div>
                                                    <img
                                                        className="d-flex me-2 rounded-circle"
                                                        src={avatarImg}
                                                        alt=""
                                                        height="32"
                                                    />
                                                </div>
                                            )}
                                            <div className="ribbon-content">
                                                {items.titulos.items[0].statut !== 'sin-registros' && (
                                                    <p className="text-muted font-14">
                                                        <FormActSyllabus
                                                            onState={props.onState}
                                                            state={props.state}
                                                            itemstemas={Arraytemas}
                                                            popover={popover}
                                                            setSignUpModal={setSignUpModal}
                                                            signUpModal={signUpModal}
                                                        />
                                                    </p>
                                                )}

                                                <ListCursos
                                                    id_t={Arraytemas.id}
                                                    datos={[items.titulos.items]}
                                                    value={items.titulos.items[0].statut}
                                                    state={props.state}
                                                    showStarred={showStarred}
                                                    selinbox={selinbox}
                                                    popover={popover}
                                                    onState={props.onState}
                                                    toggle={props.toggle}
                                                    className={'btn btn-sm px-2 font-16 btn-light'}></ListCursos>
                                                <Col sm={12}>
                                                    {props.value !== 'sin-registros' && (
                                                        <ExportarTemas
                                                            data={items.titulos.grupos}
                                                            asignatura={props.state.codmateria}
                                                            onState={props.onState}
                                                            state={props.state}
                                                        />
                                                    )}
                                                </Col>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </MenuEditorTemas>
                            </Col>
                        ) : (
                            <Col lg={6} xxl={4} key={'proj-' + index}>
                                <MenuEditorTemas
                                    onState={props.onState}
                                    className="mb-md-0 mb-3 bg-success"
                                    value={items.titulos.items[0].statut}
                                    id_t={Arraytemas.id}
                                    nombretema={''}
                                    popover={popover}>
                                    <Card className="ribbon-box mb-0 d-block">
                                        <Card.Body className="p-3">
                                            <div className={classNames('ribbon', 'ribbon-primary', 'float-start')}>
                                                <i className="uil uil-check me-1"></i>
                                                <span>{index + 1}</span>
                                            </div>
                                            {items.titulos.items[0].statut !== 'sin-registros' && (
                                                <div className="d-flex mb-3 mt-1">
                                                    <div className="w-100 overflow-hidden">
                                                        <small className="float-end text-center">
                                                            {Arraytemas.titulo}
                                                        </small>
                                                    </div>
                                                    <img
                                                        className="d-flex me-2 rounded-circle"
                                                        src={avatarImg}
                                                        alt=""
                                                        height="32"
                                                    />
                                                </div>
                                            )}
                                            <div className="ribbon-content">
                                                {items.titulos.items[0].statut !== 'sin-registros' && (
                                                    <p className="text-muted font-14">
                                                        <FormActSyllabus
                                                            onState={props.onState}
                                                            itemstemas={Arraytemas}
                                                            state={props.state}
                                                            onChange={props.onChange}
                                                            popover={popover}
                                                            setSignUpModal={setSignUpModal}
                                                            signUpModal={signUpModal}
                                                        />
                                                    </p>
                                                )}
                                                <ListCursos
                                                    id_t={Arraytemas.id}
                                                    datos={[items.titulos.items]}
                                                    value={items.titulos.items[0].statut}
                                                    id_curso={Arraytemas.id}
                                                    state={props.state}
                                                    popover={popover}
                                                    showStarred={showStarred}
                                                    onState={props.onState}
                                                    selinbox={selinbox}
                                                    toggle={props.toggle}
                                                    className={'btn btn-sm px-2 font-16 btn-light'}></ListCursos>

                                                <Col sm={12}>
                                                    {props.value !== 'sin-registros' && (
                                                        <ExportarTemas
                                                            data={items.titulos.grupos}
                                                            asignatura={props.state.codmateria}
                                                            onState={props.onState}
                                                            state={props.state}
                                                        />
                                                    )}
                                                </Col>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </MenuEditorTemas>
                            </Col>
                        );
                    })}
            </Row>
        </React.Fragment>
    );
};

export default Syllabus;
