// @flow
import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

// components

import Table from '../../../components/Table';

//dummy data
//import { records as data } from './data';
import { APICore } from '../../../helpers/api/apiCore';
const api = new APICore();

const columns = [
    {
        Header: 'ID',
        accessor: 'id_pensum',
        sort: true,
    },
    {
        Header: 'Primer Nombre',
        accessor: 'primer_nombre',
        sort: true,
    },
    {
        Header: 'Segundo Nombre',
        accessor: 'segundo_nombre',
        sort: true,
    },
    {
        Header: 'Primer Apellido',
        accessor: 'primer_apellido',
        sort: true,
    },
    {
        Header: 'Segundo Apellido',
        accessor: 'segundo_apellido',
        sort: true,
    },
    {
        Header: 'Identificacion',
        accessor: 'numero_documento',
        sort: true,
    },
    {
        Header: 'Celular',
        accessor: 'celular',
        sort: true,
    },
];
const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    },
];
type studends = {
    selected: number,
    programa: string,
    nombremateria: string,
    codmateria: string,
    onClick: (date: any) => void,
};
const ListaEstudiantes = (props: studends): React$Element<any> => {
    const [records, openEstudiantes] = useState([]);
    const [data, cargarEstudiantes] = useState([]);

    useEffect(() => {
        const urla = `https://aulaweb.autoevaluacion.com.co/v1/estudiantes?codmateria=${props.state.codmateria}&id_grupo=${props.state.id_grupo}`;
        const syllab = api.setListadoEstudiantes(`${urla}`);
        syllab.then(function (resp) {
            if (resp) {
                openEstudiantes(resp);
            } else {
                const records = [
                    {
                        id: 1,
                        id_pensum: null,
                        periodoacademico_id: 'null',
                        numero_documento: 'null',
                        primer_nombre: 'Aun no tiene estudiantes  asignados',
                        segundo_apellido: 'null',
                        email_institucional: 'null',
                        email_personas: 'null',
                        celular: 'null',
                    },
                ];
                openEstudiantes(records);
            }
        });
    }, [props]);

    useEffect(() => {
        if (records && records.length > 0) {
            const cur = JSON.parse(records);
            const mapped = [];
            mapped.push(cur);
            cargarEstudiantes(mapped[0]);
        }
    }, [records]);
    return (
        <>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <h4 className="header-title">Listado de Estudiantes</h4>
                            <p className="text-muted font-14 mb-4">
                                {props.state.programa} / {props.state.codmateria}-{props.state.nombremateria}
                            </p>

                            <Table
                                columns={columns}
                                data={data}
                                pageSize={5}
                                sizePerPageList={sizePerPageList}
                                isSortable={true}
                                pagination={true}
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default ListaEstudiantes;
