// @flow
import classNames from 'classnames';
import { Button, Col } from 'react-bootstrap';
import React from 'react';

type AsigProps = {
    value: string,
    onState: (date: any) => void,
    hideAddon?: boolean,
    inputClass?: string,
    inline?: boolean,
    name: string,
    selected: string,
    active: number,
    grupo_id: number,
    status: string,
    codmateria: string,
    nombremateria: string,
    itemsactividad: string,
    tipoactividad: string,
    programa: string,
    role: string,
};
const style = {
    height: 'auto',
    margin: 6,
    padding: 3,
    fonfSize: '14px',
};
const width = {
    width: '250px',
};
const Asignaturas = (props: AsigProps): React$Element<any> => {
    const colors = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark',
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark',
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark',
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'info',
        'dark',
    ];
    // console.log('asignaturas', props.asignaturas, 'length:', props.asignaturas.length);
    return (
        <React.Fragment>
            {props.asignaturas[0] &&
                props.asignaturas[0].length > 0 &&
                props.asignaturas[0].map((record: any, index) => {
                    const Datos = {
                        id: record.id,
                        id_pensum: record.id_pensum,
                        id_persona: record.id_persona,
                        id_personanatural: record.id_personanatural,
                        codmateria: record.codmateria,
                        nombremateria: record.nombremateria,
                        id_grupo: record.id_grupo,
                        grupo: record.grupo,
                        programa: record.programa,
                        role: record.role,
                        periodoacademico_id: record.periodoacademico_id,
                        selected: 1,
                    };
                    console.log('Datos', record);
                    return (
                        <>
                            <Col style={style} key={'asig_' + record.id} className="offset-lg-1">
                                <div className="button-list" key={'asig_' + record.id}>
                                    <Button
                                        style={width}
                                        value={record.id}
                                        className={classNames('btn-outline-' + colors[index])}
                                        selected={Datos.selected}
                                        onClick={() => props.onState(Datos)}
                                        name={record.codmateria}
                                        variant={'outline-' + colors[index]}>
                                        <i className={classNames('uil', 'uil-cog ', 'me-1')}></i>
                                        {record.grupo}
                                        <span>
                                            {record.codmateria}-{record.nombremateria}
                                        </span>
                                    </Button>
                                </div>
                            </Col>
                        </>
                    );
                })}
        </React.Fragment>
    );
};

export default Asignaturas;
