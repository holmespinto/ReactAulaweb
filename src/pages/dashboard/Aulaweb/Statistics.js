// @flow
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const Statistics = (): React$Element<React$FragmentType> => {
    return (
        <>
            <Row>
                <Col>
                    <Card className="widget-inline">
                        <Card.Body className="p-0">
                            <Row className="g-0">
                                <Col sm={6} xl={3}>
                                    <Card className="shadow-none m-0">
                                        <Card.Body className="text-center">
                                            <i className="dripicons-briefcase text-muted font-24"></i>
                                            <h3>
                                                <span>29</span>
                                            </h3>
                                            <p className="text-muted font-15 mb-0">Total Temas</p>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col sm={6} xl={3}>
                                    <Card className="card shadow-none m-0 border-start">
                                        <Card.Body className="text-center">
                                            <i className="dripicons-checklist text-muted font-24"></i>
                                            <h3>
                                                <span>715</span>
                                            </h3>
                                            <p className="text-muted font-15 mb-0">Total Cursos</p>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col sm={6} xl={3}>
                                    <Card className="card shadow-none m-0 border-start">
                                        <Card.Body className="text-center">
                                            <i className="dripicons-user-group text-muted font-24"></i>
                                            <h3>
                                                <span>31</span>
                                            </h3>
                                            <p className="text-muted font-15 mb-0">Estudisntes</p>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                <Col sm={6} xl={3}>
                                    <Card className="card shadow-none m-0 border-start">
                                        <Card.Body className="text-center">
                                            <i className="dripicons-graph-line text-muted font-24"></i>
                                            <h3>
                                                <span>93%</span> <i className="mdi mdi-arrow-up text-success"></i>
                                            </h3>
                                            <p className="text-muted font-15 mb-0">Productividad</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Statistics;
