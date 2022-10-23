// @flow
import classNames from 'classnames';
import { Button, Col, Row } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
type HyperAsignaturaProps = {
    value: string,
    onClick: (date: any) => void,
    asignatura: array,
    hideAddon?: boolean,
    inputClass?: string,
    inline?: boolean,
    name: string,
    variant: string,
    selected: string,
    active: number,
    codigo: number,
    pendiente: number,
};

const HyperAsignaturas = (props: HyperAsignaturaProps): React$Element<any> => {
    // handle custom input
    //const button = (props.hideAddon || false) === true ? <AsignaturasInput /> : <AsignaturaInputWithAddon />;
    let asig = JSON.parse(JSON.stringify(props.asignatura));
    console.log(asig);
    return (
        <React.Fragment>
            <Row className="pt-5">
                {asig.map((ques, index) => {
                    return ques.id % 2 !== 0 ? (
                        <Col key={index} lg={5} className="offset-lg-1">
                            <div>
                                <div className="faq-question-q-box">Q.</div>
                                <h4 className={classNames('faq-question', ques.clase)}>{ques.materia}</h4>
                                <p className={classNames('faq-answer mb-4', ques.clase)}>{ques.materia}</p>
                            </div>
                        </Col>
                    ) : (
                        <Col key={index} lg={5}>
                            <div>
                                <div className="faq-question-q-box">Q.</div>
                                <h4 className={classNames('faq-question', ques.clase)}>{ques.materia}</h4>
                                <p className={classNames('faq-answer mb-4', ques.clase)}>{ques.materia}</p>
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </React.Fragment>
    );
};

export default HyperAsignaturas;
