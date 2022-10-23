// @flow
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Card, Collapse } from 'react-bootstrap';
import swal from 'sweetalert';

type EliminarTemaProps = {
    className?: string,
    children?: any,
    children?: any,
    value: number,
    onClick: (date: any) => void,
    nombretema: string,
};

type EliminarTemaState = {
    collapse?: boolean,
    loading?: boolean,
    hidden?: boolean,
};

const EliminarTema = (props: EliminarTemaProps, state: EliminarTemaState): React$Element<any> => {
    const children = props.children || null;

    const [collapse, setCollapse] = useState(true);
    const [loading, setLoading] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [itemsid, setItemsID] = useState(0);

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
     * remove the EliminarTema
     */
    const remove = (value) => {
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
                    swal(
                        'Si desea recuperar el tema eliminado vaya a la seccion de recuperar temas en este misma sección!',
                        {
                            icon: 'success',
                        }
                    );
                } else {
                    setHidden(false);
                }
            });
            //console.log(itemsid);
        }
    }, [hidden, itemsid]);

    return (
        <>
            {!hidden ? (
                <Card className={classNames(props.className)}>
                    {loading && (
                        <div className="card-disabled">
                            <div className="card-portlets-loader"></div>
                        </div>
                    )}

                    <Card.Body>
                        <div className="card-widgets">
                            <Link to="#" className={classNames(props.className)} onClick={reloadContent}>
                                <i className="mdi mdi-refresh"></i>
                            </Link>
                            <Link to="#" className={classNames(props.className)} onClick={toggleContent}>
                                <i
                                    className={classNames('mdi', {
                                        'mdi-minus': collapse,
                                        'mdi-plus': !collapse,
                                    })}></i>
                            </Link>
                            <Link
                                to="#"
                                className={classNames(props.className)}
                                onClick={(data) => {
                                    remove(props.value);
                                }}>
                                <i className="uil uil-times-circle text-danger"></i>
                            </Link>
                        </div>

                        <Card.Title tag="h5" className="mb-0">
                            {props.nombretema}
                        </Card.Title>

                        <Collapse in={collapse} className="pt-3">
                            {children}
                        </Collapse>
                    </Card.Body>
                </Card>
            ) : null}
        </>
    );
};

export default EliminarTema;
