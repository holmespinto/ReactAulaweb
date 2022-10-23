// @flow
import { AsignaturaActionTypes } from './constants';

import { APICore } from '../../helpers/api/apiCore';

const api = new APICore();
const INIT_STATE = {
    asignaturas: api.getLoggedInAsignatura(),
    loadasig: false,
};

type AsignaturaAction = { type: string, payload: { actionType?: string, data?: any, error?: string } };
type State = { asignaturas?: [{}] | null, loadasig?: boolean, +value?: boolean };

const Asignatura = (state: State = INIT_STATE, action: AsignaturaAction): any => {
    switch (action.type) {
        case AsignaturaActionTypes.API_RESPONSE_SUCCESS:
            return {
                ...state,
                asignaturas: action.payload.data,
                loadasig: false,
            };
        case AsignaturaActionTypes.API_RESPONSE_ERROR:
            return {
                ...state,
                error: action.payload.error,
                loadasig: false,
            };
        case AsignaturaActionTypes.RESET:
            return {
                ...state,
                loadasig: false,
                error: false,
            };
        default:
            return { ...state };
    }
};

export default Asignatura;
