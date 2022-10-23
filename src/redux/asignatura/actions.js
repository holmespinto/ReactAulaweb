// @flow
import { AsignaturaActionTypes } from './constants';

type AsignaturaAction = { type: string, payload: {} | string };

// common success
export const asignaturaApiResponseSuccess = (actionType: string, data: any): AsignaturaAction => ({
    type: AsignaturaActionTypes.API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});
// common error
export const asignaturaApiResponseError = (actionType: string, error: string): AsignaturaAction => ({
    type: AsignaturaActionTypes.API_RESPONSE_ERROR,
    payload: { actionType, error },
});
export const resetAsignatura = (): AsignaturaAction => ({
    type: AsignaturaActionTypes.RESET,
    payload: {},
});
