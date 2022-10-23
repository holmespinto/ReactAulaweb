// @flow

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Carousel, Container } from 'react-bootstrap';
//import classNames from 'classnames';
// components
import { Link } from 'react-router-dom';
import { APICore } from '../../../../helpers/api/apiCore';
import DOMPurify from 'dompurify';
const api = new APICore();
const SlidesWithControls = (props) => {
    return (
        <Container>
            <Card>
                <Card.Body>
                    <h4 className="header-title">Imagenes subidas</h4>
                    <p className="text-muted font-14">
                        Estas imagenes se pueden copiar para ingresarlas al contenido del curso
                    </p>
                    <Carousel indicators={false}>
                        {props.documentos &&
                            props.documentos.length > 0 &&
                            props.documentos.map((items: any, index) => {
                                return (
                                    <>
                                        <Card className="mb-1 shadow-none border" key={index}>
                                            <div className="p-2">
                                                <Row className="align-items-center">
                                                    <div className="col-auto">
                                                        <div className="avatar-sm">
                                                            <span className="avatar-title rounded">
                                                                {items.extension}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="col ps-0">
                                                        <a href="/" className="text-muted fw-bold">
                                                            {items.extension}
                                                        </a>
                                                        <p className="mb-0">{items.titulo}</p>
                                                    </div>

                                                    <Link to="/" className="topnav-logo">
                                                        <span className="topnav-logo-lg">
                                                            <img
                                                                src={
                                                                    '/aulaweb.autoevaluacion.com.co' + items.fichier
                                                                        ? items.fichier
                                                                        : items.fichier
                                                                }
                                                                alt="logo"
                                                                height="16"
                                                            />
                                                        </span>
                                                    </Link>
                                                    <p className="mb-0">
                                                        <code>.rounded</code>
                                                    </p>
                                                </Row>
                                            </div>
                                        </Card>
                                    </>
                                );
                            })}
                    </Carousel>
                </Card.Body>
            </Card>
        </Container>
    );
};

const VistaTemaCursos = (props): React$Element<React$FragmentType> => {
    const [cursos, setCursos] = useState([]);
    const [titulo, setMapear] = useState([]);
    const [img, setImg] = useState([]);

    useEffect(() => {
        const urla = `https://aulaweb.autoevaluacion.com.co/v2/?&accion=vistapreviacurso&id_autor=${props.state.id_pernatural}&grupo_id=${props.state.id_grupo}&cod_materia=${props.state.codmateria}&id_tema=${props.state.id_tema}&id_curso=${props.state.id_curso}&opcion=consultar&operacion=sindoc`;
        const curs = api.setConsultas(`${urla}`);
        curs.then(function (resp) {
            if (resp) {
                setCursos(resp);
                setImg(resp[0].documentos);
            }
        });
    }, [props]);

    useEffect(() => {
        if (cursos && cursos.length > 0) {
            const cur = cursos;
            const mapped = [];
            mapped.push(cur);
            setMapear(mapped[0]);
        }
    }, [cursos]);

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
                            {titulo &&
                                titulo.length > 0 &&
                                titulo.map((arrays: any, index) => {
                                    const contenido = arrays.titulos.items.contenido;
                                    // console.log(contenido);
                                    return (
                                        <>
                                            <h3 className="mt-0">
                                                {arrays.titulos.items.id_curso}
                                                .-{arrays.titulos.items.titulo}
                                            </h3>
                                            <div key={index} dangerouslySetInnerHTML={createMarkup(contenido)} />
                                        </>
                                    );
                                })}
                        </Card.Body>
                    </Card>
                </Col>
                <Col xxl={4} lg={4}>
                    <Card>
                        <SlidesWithControls documentos={img} />
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};
export default VistaTemaCursos;
