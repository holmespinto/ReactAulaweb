// @flow
import React, { useState, useEffect } from 'react';
import { Row, Card, Container } from 'react-bootstrap';

// components
import { APICore } from '../../../../helpers/api/apiCore';

const api = new APICore();
const ListarDocumentos = (props): React$Element<any> => {
    const [docs, setopenDoc] = useState([]);
    const [documentos, docsMapeado] = useState([]);

    useEffect(() => {
        const urla = `https://aulaweb.autoevaluacion.com.co/v1/editordocumentos?id_curso=${props.id_curso}&cod_materia=${props.cod_materia}`;
        const docs = api.setSyllabusTitulos(`${urla}`);
        docs.then(function (resp) {
            if (resp) {
                setopenDoc(resp);
            }
        });
    }, [props.id_curso, props.cod_materia]);

    useEffect(() => {
        if (docs && docs.length > 0) {
            const cur = JSON.parse(docs);
            const mapped = [];
            mapped.push(cur);
            docsMapeado(mapped[0]);
        }
    }, [docs]);
    //  console.log(documentos);
    return (
        <>
            <Container>
                <Card>
                    <Card.Body>
                        <h5 className="card-title mb-3">
                            {props.id_curso}
                            .-{props.titulo}
                        </h5>
                        {documentos.map((items: any, index) => {
                            //console.log(items);
                            return (
                                <>
                                    <Card className="mb-1 shadow-none border" key={index}>
                                        <div className="p-2">
                                            <Row className="align-items-center">
                                                <div className="col-auto">
                                                    <div className="avatar-sm">
                                                        <span className="avatar-title rounded">{items.extension}</span>
                                                    </div>
                                                </div>
                                                <div className="col ps-0">
                                                    <a href="/" className="text-muted fw-bold">
                                                        {items.extension}
                                                    </a>
                                                    <p className="mb-0">{items.titulo}</p>
                                                </div>
                                            </Row>
                                        </div>
                                    </Card>
                                </>
                            );
                        })}
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};
export default ListarDocumentos;
