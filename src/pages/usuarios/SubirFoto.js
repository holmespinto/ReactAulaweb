import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import PageTitle from '../../components/PageTitle';
import { APICore } from '../../helpers/api/apiCore';
import FileUploader from '../../components/FileUploader';
//import axios from 'axios';
const api = new APICore();
// components
//import { subrifoto } from '../../../helpers/api/apiDocumentos';
/*
function geturls(item) {
    return [
        'formattedSize=' +
            item.formattedSize +
            '&preview=' +
            item.preview +
            '&path=' +
            item.path +
            '&name=' +
            item.name +
            '&type=' +
            item.type +
            '&lastModified=' +
            item.lastModified +
            '&lastModifiedDate=' +
            item.lastModifiedDate,
    ];
}
*/
const SubirFotos = (): React$Element<React$FragmentType> => {
    const [archivo, setFile] = useState([]);

    const urla = `https://aulaweb.autoevaluacion.com.co/v2/?&accion=usuarios&opcion=subirfoto&operacion=doc`;
    const respuesta = api.createactividadFile(`${urla}`);
    respuesta.then(function (resp) {
        console.log(resp);
    });
    /*
    const selectedHandler = (e) => {
        setFile(e.target.files[0]);
    };
*/

    return (
        <React.Fragment>
            <PageTitle
                breadCrumbItems={[{ label: 'Subir Fotos', path: './SubirFotos', active: true }]}
                title={'Subir Fotos'}
            />
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title mb-3">Subir la foto del perfil</h4>
                            <p className="text-muted font-13 m-b-30">
                                Arrastre o inserte en esta sección la foto de su perfil.
                                {archivo}
                            </p>
                            <FileUploader
                                onFileUpload={(e) => {
                                    const files = Array.from(e);
                                    //const file = JSON.stringify(files);
                                    setFile({ files: files });
                                }}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default SubirFotos;
