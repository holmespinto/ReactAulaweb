// @flow
import { combineReducers } from 'redux';

import Auth from './auth/reducers';
import Layout from './layout/reducers';
import Asignatura from './asignatura/reducers';
export default (combineReducers({
    Auth,
    Layout,
    Asignatura,
}): any);
