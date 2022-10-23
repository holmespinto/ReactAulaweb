// @flow

import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import classNames from 'classnames';
import ListarDocumentos from '../components/ListarDocumentos';

// components
import { APICore } from '../../../../helpers/api/apiCore';
import DOMPurify from 'dompurify';
const api = new APICore();

const VistaPreviaCursos = (props): React$Element<React$FragmentType> => {
    const [syllabus, openSyllabus] = useState([]);
    const [titulos, openMapeado] = useState([]);
    useEffect(() => {
        const urla = `https://aulaweb.autoevaluacion.com.co/v1/listartemas?cod_materia=${props.state.codmateria}&grupo_id=${props.state.id_grupo}`;
        const syllab = api.setSyllabusTitulos(`${urla}`);
        syllab.then(function (resp) {
            if (resp) {
                openSyllabus(resp);
            } else {
                const syllabus = [
                    {
                        id: 1,
                        id_tema: 1,
                        programa_id: 1,
                        semanas: '0',
                        unidad: '0',
                        horas: '0',
                        titulo: 'No tiene syllabus creado',
                    },
                ];
                openSyllabus(syllabus);
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

    const project = {
        title: 'Minton v3.0 - Redesign',
        shortDesc:
            'This card has supporting text below as a natural lead-in to additional content is a little bit longer',
        state: 'Ongoing',
        totalTasks: 81,
        totalComments: 103,
        totalMembers: 6,
        startDate: '17 March 2018',
        startTime: '1:00 PM',
        endDate: '22 December 2018',
        endTime: '1:00 PM',
        totalBudget: '$15,800',
    };

    function createMarkup(html) {
        const data = `${html}`;
        return { __html: DOMPurify.sanitize(data, { USE_PROFILES: { html: true } }) };
    }
    return (
        <React.Fragment>
            <Row>
                <Col xxl={8} lg={8}>
                    <Card className="d-block">
                        <Card.Body>
                            {titulos &&
                                titulos.length > 0 &&
                                titulos.map((arrays: any, index) => {
                                    return (
                                        <>
                                            <h3 className="mt-0">
                                                {arrays.titulos.items[0].id_curso}
                                                .-{arrays.titulos.items[0].titulo_especidico}
                                            </h3>
                                            <div
                                                className={classNames(
                                                    'badge',
                                                    {
                                                        'bg-success': project.state === 'Finished',
                                                        'bg-secondary': project.state === 'Ongoing',
                                                        'bg-warning': project.state === 'Planned',
                                                    },
                                                    'text-light',
                                                    'mb-3'
                                                )}>
                                                {project.state}
                                            </div>

                                            <div
                                                key={index}
                                                dangerouslySetInnerHTML={createMarkup(
                                                    arrays.titulos.items[0].contenido
                                                )}
                                            />
                                        </>
                                    );
                                })}
                        </Card.Body>
                    </Card>
                </Col>
                <Col xxl={4} lg={4}>
                    <Card>
                        <Card.Body>
                            <h5 className="card-title mb-3">Documentos Adjuntos por Cursos:</h5>
                            {titulos &&
                                titulos.length > 0 &&
                                titulos.map((arrs: any, index) => {
                                    return (
                                        <>
                                            <ListarDocumentos
                                                titulo={arrs.titulos.items[0].titulo_especidico}
                                                id_curso={arrs.titulos.items[0].id_curso}
                                                cod_materia={props.state.codmateria}
                                            />
                                        </>
                                    );
                                })}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};
export default VistaPreviaCursos;
