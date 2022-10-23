// @flow
//import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';

// @flow
type EstadosProps = {
    itemsactividad: number,
    clase?: string,
    id: number,
    nombremateria: string,
    codmateria: string,
    pendietes: string,
    classe: string,
    name: string,
    color: string,
    selected: number,
    onClick: (date: any) => void,
};
const NavSuperior = (props: EstadosProps): React$Element<any> => {
    const [buttons, setButtons] = useState([]);

    useEffect(() => {
        (() => {
            switch (props.state.selected) {
                case 0:
                    const buttons = [
                        {
                            id: 1,
                            icons: 'card-pricing-icon dripicons-store text-primary',
                            name: 'Primary',
                            color: 'outline',
                            selected: 0,
                            titulo: 'Bienvenidos',
                            items: '',
                        },
                    ];
                    setButtons(buttons);
                    break;
                case 1:
                    const btncase1 = [
                        {
                            id: 2,
                            icons: 'card-pricing-icon mdi mdi-window-close',
                            name: 'Secondary',
                            color: 'link',
                            selected: 0,
                            titulo: '' + props.state.programa + ' / ' + props.state.nombremateria + '',
                            items: 'ok',
                        },
                    ];
                    setButtons(btncase1);
                    break;
                case 26:
                    const btncase2 = [
                        {
                            id: 3,
                            icons: 'card-pricing-icon mdi mdi-window-close',
                            name: 'Secondary',
                            color: 'link',
                            selected: 1,
                            titulo: '' + props.state.programa + ' / ' + props.state.nombremateria + '',
                            items: 'ok',
                        },
                    ];
                    setButtons(btncase2);
                    break;
                case 3:
                    const btncase3 = [
                        {
                            id: 4,
                            icons: 'card-pricing-icon mdi mdi-window-close',
                            name: 'Secondary',
                            color: 'link',
                            selected: 2,
                            titulo: '' + props.state.programa + ' / ' + props.state.nombremateria + '',
                            items: 'ok',
                        },
                    ];
                    setButtons(btncase3);
                    break;
                case 4:
                    const btncase4 = [
                        {
                            id: 5,
                            icons: 'card-pricing-icon mdi mdi-window-close',
                            name: 'Secondary',
                            color: 'link',
                            selected: 2,
                            titulo:
                                '' +
                                props.state.programa +
                                ' / ' +
                                props.state.nombremateria +
                                ' /' +
                                props.state.itemsactividad,
                            items: 'ok',
                        },
                    ];
                    setButtons(btncase4);
                    break;
                default:
                    const btncase = [
                        {
                            id: 5,
                            icons: 'card-pricing-icon dripicons-store text-primary',
                            name: 'Primary',
                            color: 'link',
                            selected: 0,
                            titulo: 'Bienvenidos',
                            items: 'ok',
                        },
                    ];
                    setButtons(btncase);
                    break;
            }
        })();
    }, [props]);
    //console.log('buttons', buttons);
    return (
        <React.Fragment>
            {buttons &&
                buttons.length > 0 &&
                buttons.map((ques: any, i) => {
                    const Datos = {
                        id: ques.id,
                        selected: ques.selected,
                        codmateria: props.state.codmateria,
                        nombremateria: props.state.nombremateria,
                        itemsactividad: props.state.itemsactividad,
                        tipoactividad: props.state.tipoactividad,
                        programa: props.state.programa,
                        id_curso: props.state.id_curso,
                        nombrecurso: props.state.nombrecurso,
                        itemsinbox: props.state.itemsinbox,
                        role: props.state.role,
                        id_grupo: props.state.id_grupo,
                    };

                    return (
                        <div className="button-list" key={'button_' + i}>
                            <Button
                                icons={ques.icons}
                                codigo={ques.codigo}
                                variant={ques.color}
                                onClick={() => props.onState(Datos)}
                                className="btn-icon">
                                <i className={classNames('mdi', ques.icons, 'mb-2', 'me-1')}></i>
                                <span>{ques.titulo}</span>
                                <br />
                            </Button>
                        </div>
                    );
                })}
        </React.Fragment>
    );
};
export default NavSuperior;
