// @flow
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Card, Collapse, OverlayTrigger } from 'react-bootstrap';
import swal from 'sweetalert';
import { APICore } from '../../../../helpers/api/apiCore';
const api = new APICore();

type PortletProps = {
    className?: string,
    children?: any,
    children?: any,
    value: number,
    onClick: (date: any) => void,
    nombretema: string,
};

type PortletState = {
    collapse?: boolean,
    loading?: boolean,
    hidden?: boolean,
};

/**
 * MenuEditorTemas
 */
const MenuEditorTemas = (props: PortletProps, state: PortletState): React$Element<any> => {
    const children = props.children || null;

    const [collapse, setCollapse] = useState(true);
    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [itemsid, setItemsID] = useState(0);
    /**
     * Toggle the body
     */
    const toggleContent = () => {
        setCollapse(!collapse);
    };

    /**
     * Reload the content
     */
    const reloadContent = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500 + 300 * (Math.random() * 5));
    };

    /**
     * remove the portlet
     */
    const remove = (value, id) => {
        setItemsID(value);
        //console.log(value);
        setHidden(true);
    };
    useEffect(() => {
        if (hidden) {
            swal({
                title: 'Esta seguro que dese eliminar el tema?',
                text: '::Alvertencia:: si elimina el tema tambien se borraran los cursos vinculados a este tema',
                icon: 'warning',
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    const urla = `https://aulaweb.autoevaluacion.com.co/v1/addcurso?&id_t=${props.id_t}&accion=4`;
                    const forms = api.setFormSyllabus(`${urla}`);
                    forms.then((res) => swal(JSON.parse(res).message), {
                        icon: 'success',
                    });
                } else {
                    setHidden(false);
                }
            });
            //console.log(itemsid);
        }
    }, [props, hidden]);

    return (
        <>
            {!hidden ? (
                <Card className={classNames(props.className)}>
                    {loading && (
                        <div className="card-disabled">
                            <div className="card-portlets-loader"></div>
                        </div>
                    )}

                    <p className="mb-1">
                        <span className="pe-2 text-nowrap mb-2 d-inline-block">
                            <Link to="#" className={classNames(props.className)} onClick={reloadContent}>
                                <i className="mdi mdi-refresh "></i>
                            </Link>

                            <Link to="#" className={classNames(props.className)} onClick={toggleContent}>
                                <i
                                    className={classNames('mdi', {
                                        'mdi-minus': collapse,
                                        'mdi-plus': !collapse,
                                    })}></i>
                            </Link>

                            {props.value !== 'sin-registros' && (
                                <Link
                                    to="#"
                                    className={classNames(props.className)}
                                    onClick={(data) => {
                                        remove(props.value, props.id);
                                    }}>
                                    <OverlayTrigger
                                        trigger={['hover', 'focus']}
                                        placement="right"
                                        overlay={props.popover(
                                            'Elimina el Tema y todo sus componentes. Le recomiendo ser precavido con esta opción.',
                                            'Eliminar'
                                        )}>
                                        <i className="uil uil-times-circle text-danger"></i>
                                    </OverlayTrigger>
                                </Link>
                            )}
                        </span>
                    </p>

                    <Collapse in={collapse} className="pt-3">
                        {children}
                    </Collapse>
                </Card>
            ) : null}
        </>
    );
};

export default MenuEditorTemas;
