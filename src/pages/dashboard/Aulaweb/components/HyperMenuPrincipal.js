// @flow
import classNames from 'classnames';
import { Button } from 'react-bootstrap';

type MenuProps = {
    value: string,
    onClick: (date: any) => void,
    hideAddon?: boolean,
    inputClass?: string,
    inline?: boolean,
    name: string,
    variant: string,
    selected: number,
    icons: string,
    codigo: string,
    nombremateria: string,
    itemsactividad: string,
};

const HyperMenuPrincipal = (props: MenuProps): React$Element<any> => {
    let nommateria = '';
    if (props.nombremateria) {
        nommateria = ' ' + props.nombremateria;
    } else {
        nommateria = ' ';
    }
    let nomitems = '';
    if (props.itemsactividad) {
        nomitems = '/ ' + props.itemsactividad;
    } else {
        nomitems = ' ';
    }
    const style = {
        height: 60,
        margin: 6,
        padding: 8,
        fonfSize: '14px',
    };
    return (
        <>
            <div style={style} role="alert" className={'fade alert alert-success show offset-lg-1'}>
                <Button
                    value={props.value}
                    className={classNames('btn btn-success mb-2 me-1 btn btn-primary', props.inputClass)}
                    selected={props.selected}
                    onClick={(date) => props.onClick(date)}
                    inline={props.inline}
                    name={props.name}
                    variant={props.variant}
                    codigo={props.codigo}
                    materia={props.materia}
                    items={props.items}
                    active={props.active}>
                    <i className={classNames('mdi', props.icons, 'mb-2', 'me-1')}></i>
                </Button>
                <code>{nommateria}</code>
                <code> /</code>
                {props.selected}
                <code> {nomitems}</code>
            </div>
        </>
    );
};

export default HyperMenuPrincipal;
