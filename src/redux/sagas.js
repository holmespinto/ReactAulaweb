// @flow
import { all } from 'redux-saga/effects';

import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
///import asignaturaSaga from './asignatura/saga';
//asignaturaSaga();
export default function* rootSaga(): any {
    yield all([authSaga(), layoutSaga()]);
}
