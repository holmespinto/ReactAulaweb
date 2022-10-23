// @flow
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import {
    login as loginApi,
    logout as logoutApi,
    signup as signupApi,
    forgotPassword as forgotPasswordApi,
    forgotPasswordConfirm,
    //asignaturas as asignaturasApi,
} from '../../helpers/';

import { APICore, setAuthorization } from '../../helpers/api/apiCore';
import { authApiResponseSuccess, authApiResponseError } from './actions';
import { asignaturaApiResponseSuccess } from '../asignatura/actions';
import { AuthActionTypes } from './constants';
import { AsignaturaActionTypes } from '../asignatura/constants';
//import GlobalAsinaturas from '../../helpers/api/asignatura/GlobalAsinaturas';

const api = new APICore();
/*
 * Login the user
 * @param {*} payload - username and password
 */
function* login({ payload: { username, password } }) {
    try {
        const response = yield call(loginApi, { username, password });
        const user = response.data;

        //carge las asignaturas del usuario
        // const respasig = yield call(asignaturasApi, { user });
        //const asig = respasig.data;
        //console.log('Login the user' + JSON.stringify(user));
        // NOTE - AQUI SE CARGA LAS ASIGNATURAS
        // let asig = JSON.stringify(GlobalAsinaturas);
        //const res = yield call(loadUsersApi);
        //console.log(res);
        /*
        const url = 'https://suit.infotep.edu.co/api/aulaweb/periods';

        api.setPeriodo(url).then((response) => {
            console.log(response.Data);
        });
        */
        const cursos = [];
        const urla = `https://autoevaluacion.com.co/v1/academico?periodoacademico_id=${user.periodoacademico_id}&id_pensum=${user.id_pensum}&accion=academico&opcion=consultar&rol=${user.role}`;
        const materias = api.setAsignatura(`${urla}`);
        materias.then(function (resp) {
            if (resp) {
                api.setLoggedInAsignatura(resp);
                const cur = JSON.parse(resp);
                cursos.push(cur);
            } else {
                let newMat = [
                    {
                        id: 1,
                        id_pensum: null,
                        id_persona: null,
                        id_personanatural: null,
                        codmateria: 'null',
                        nombremateria: 'USTED NO TIENE ASIGNATURAS CARGADAS',
                        id_grupo: null,
                        grupo: 'null',
                        programa: 'null',
                        role: 'null',
                        periodoacademico_id: null,
                    },
                ];
                api.setLoggedInAsignatura(newMat);
            }
        });

        api.setLoggedInUser(user);
        //api.get('https://pokeapi.co/api/v2/pokemon?limit=807').then((val) => console.log(val));

        setAuthorization(user['token']);

        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
        // NOTE - AQUI SE PASAN LOS VALORES AL REDUCERS.JS
        yield put(asignaturaApiResponseSuccess(AsignaturaActionTypes.API_RESPONSE_SUCCESS, cursos));
    } catch (error) {
        console.log(error);
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
        api.setLoggedInUser(null);
        api.setLoggedInAsignatura(null);
        setAuthorization(null);
        // console.log('auth_error');
    }
}

/**
 * Logout the user
 */
function* logout() {
    try {
        yield call(logoutApi);
        api.setLoggedInUser(null);
        //api.setLoggedInAsignatura(null);
        setAuthorization(null);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
        yield put(asignaturaApiResponseSuccess(AsignaturaActionTypes.CHANGE_ASIGNATURA, {}));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
    }
}

function* signup({ payload: { fullname, email, password } }) {
    try {
        const response = yield call(signupApi, { fullname, email, password });
        const user = response.data;
        // api.setLoggedInUser(user);
        // setAuthorization(user['token']);
        // let asig = JSON.stringify(GlobalAsinaturas);
        // api.setLoggedInAsignatura(asig);
        yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
        //yield put(asignaturaApiResponseSuccess(AsignaturaActionTypes.CHANGE_ASIGNATURA, asig));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
        api.setLoggedInUser(null);
        api.setLoggedInAsignatura(null);
        setAuthorization(null);
    }
}

function* forgotPassword({ payload: { username } }) {
    try {
        const response = yield call(forgotPasswordApi, { username });
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
    }
}

function* forgotPasswordChange({ payload: { data } }) {
    try {
        const response = yield call(forgotPasswordConfirm, data);
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD_CHANGE, response.data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD_CHANGE, error));
    }
}

export function* watchLoginUser(): any {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchLogout(): any {
    yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): any {
    yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword(): any {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

export function* watchForgotPasswordChange(): any {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD_CHANGE, forgotPasswordChange);
}

function* authSaga(): any {
    yield all([
        fork(watchLoginUser),
        fork(watchLogout),
        fork(watchSignup),
        fork(watchForgotPassword),
        fork(watchForgotPasswordChange),
    ]);
}

export default authSaga;
