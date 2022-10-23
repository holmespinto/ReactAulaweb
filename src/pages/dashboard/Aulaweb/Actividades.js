// @flow
import { Button, Col } from 'react-bootstrap';
import React from 'react';
import classNames from 'classnames';
//import classNames from 'classnames';
// components

type ActividadesProps = {
    value: string,
    onClick: (date: any) => void,
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
    height: 40,
    margin: 6,
    padding: 2,
    fonfSize: '14px',
};
const Actividades = (props): ActividadesProps<React$FragmentType> => {
    const niveldos = [
        {
            id: 1,
            codmateria: props.state.codmateria,
            nombremateria: props.state.nombremateria,
            programa: props.state.programa,
            id_curso: props.state.id_curso,
            items: 'MIS ACTIVIDADES SIN ENVIAR',
            icons: 'dripicons-clock text-primary',
            porcentaje: '5.27%',
            classe: 'text-success',
            observacion: 'Tiene Actividades por entregar',
            name: 'Danger',
            color: 'danger',
            selected: 21,
            status: 'Pending',
            role: 'Estudiante',
        },
        {
            id: 2,
            codmateria: props.state.codmateria,
            nombremateria: props.state.nombremateria,
            programa: props.state.programa,
            id_curso: props.state.id_curso,
            items: 'MIS ACTIVIDADES ENVIADAS',
            icons: 'dripicons-archive text-primary',
            porcentaje: '100%',
            classe: 'text-success',
            observacion: 'Tiene Actividades por entregar',
            name: 'Success',
            color: 'success',
            selected: 22,
            status: 'Done',
            role: 'Estudiante',
        },
        {
            id: 3,
            codmateria: props.state.codmateria,
            nombremateria: props.state.nombremateria,
            programa: props.state.programa,
            id_curso: props.state.id_curso,
            items: 'MIS CURSOS',
            icons: 'dripicons-to-do text-primary',
            porcentaje: '27%',
            classe: 'text-success',
            observacion: 'Tiene Actividades por entregar',
            name: 'Warning',
            color: 'warning',
            selected: 23,
            status: 'Cursos',
            role: 'Estudiante',
        },
        {
            id: 4,
            codmateria: props.state.codmateria,
            nombremateria: props.state.nombremateria,
            programa: props.state.programa,
            id_curso: props.state.id_curso,
            items: 'MIS VIDEOS DE CLASES',
            icons: 'dripicons-store text-primary',
            porcentaje: '0%',
            classe: 'text-warning',
            observacion: 'No tiene Actividades por entregar',
            name: 'Secondary',
            color: 'secondary',
            selected: 24,
            status: 'Videos',
            role: 'Estudiante',
        },
        {
            id: 5,
            codmateria: props.state.codmateria,
            nombremateria: props.state.nombremateria,
            programa: props.state.programa,
            id_curso: props.state.id_curso,
            items: 'Todas las actividades',
            icons: 'dripicons-archive text-primary',
            porcentaje: '0%',
            classe: 'text-warning',
            observacion: 'No tiene Actividades por entregar',
            name: 'Secondary',
            color: 'secondary',
            selected: 25,
            status: 'todos',
            role: 'Estudiante',
        },
        {
            id: 6,
            codmateria: props.state.codmateria,
            nombremateria: props.state.nombremateria,
            programa: props.state.programa,
            id_curso: props.state.id_curso,
            items: 'Crear Cursos',
            icons: 'dripicons-checklist  text-primary',
            porcentaje: '0%',
            classe: 'text-warning',
            observacion: 'No tiene Actividades por entregar',
            name: 'Secondary',
            color: 'secondary',
            selected: 26,
            status: 'todos',
            role: 'Docente',
        },
        {
            id: 7,
            codmateria: props.codmateria,
            nombremateria: props.nombremateria,
            programa: props.state.programa,
            id_curso: props.state.id_curso,
            items: 'Lista de Estudiantes',
            icons: 'dripicons-user-group text-primary',
            porcentaje: '0%',
            classe: 'text-warning',
            observacion: 'No tiene Actividades por entregar',
            name: 'Secondary',
            color: 'secondary',
            selected: 27,
            status: 'todos',
            role: 'Docente',
        },
        {
            id: 8,
            codmateria: props.state.codmateria,
            nombremateria: props.state.nombremateria,
            programa: props.state.programa,
            id_curso: props.state.id_curso,
            items: 'Calificaciones',
            icons: ' mdi mdi-check-decagram text-primary',
            porcentaje: '0%',
            classe: 'text-warning',
            observacion: 'No tiene Calificaciones',
            name: 'Secondary',
            color: 'secondary',
            selected: 28,
            status: 'todos',
            role: 'Docente',
        },
    ];

    let act = [];
    let acts = niveldos.filter((t) => {
        if (t.role === props.state.role)
            act.push({ items: t.items, selected: t.selected, pendiente: t.pendiente, color: t.color, icons: t.icons });
    });

    //console.log(acts);
    return (
        <React.Fragment>
            {act &&
                act.length > 0 &&
                act.map((record: any, index) => {
                    const Datos = {
                        ...props.state,
                        selected: record.selected,
                        itemsactividad: record.items,
                    };
                    // console.log('Datos', Datos);
                    return (
                        <>
                            <Col style={style} key={'activ_' + record.id} className="offset-lg-1">
                                <div className="button-list" key={'activ_' + record.id}>
                                    <Button
                                        value={record.value}
                                        className={classNames('form-control btn btn-outline-' + record.color)}
                                        selected={record.selected}
                                        onClick={() => props.onClick(Datos)}
                                        itemsactividad={record.items}
                                        name={record.name}
                                        variant={'outline-' + record.color}
                                        items={record.items}
                                        active={record.active}>
                                        <i className={classNames('mdi', record.icons, 'mb-1', 'me-1')}></i>{' '}
                                        <span> {record.items}</span>
                                    </Button>
                                </div>
                            </Col>
                        </>
                    );
                })}
        </React.Fragment>
    );
};
export default Actividades;
