import jwtDecode from 'jwt-decode';
import axios from 'axios';
import config from '../../config';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = config.API_URL;

// intercepting to capture errors
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        let message;
        if (error && error.response && error.response.status === 404) {
            // window.location.href = '/not-found';
        } else if (error && error.response && error.response.status === 403) {
            window.location.href = '/access-denied';
        } else {
            switch (error.response.status) {
                case 401:
                    message = 'Invalid credentials';
                    break;
                case 403:
                    message = 'Access Forbidden';
                    break;
                case 404:
                    message = 'Sorry! the data you are looking for could not be found';
                    break;
                case 302:
                    message = 'Sorry! la pagina no se encuetra:Moved Temporarily';
                    break;
                default: {
                    message =
                        error.response && error.response.data ? error.response.data['message'] : error.message || error;
                }
            }
            return Promise.reject(message);
        }
    }
);

const AUTH_SESSION_KEY = 'hyper_user';
const ASIGNATURA_SESSION_KEY = 'user_asignaturas';

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
    if (token) axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
    else delete axios.defaults.headers.common['Authorization'];
};

const getUserFromSession = () => {
    const user = sessionStorage.getItem(AUTH_SESSION_KEY);
    return user ? (typeof user == 'object' ? user : JSON.parse(user)) : null;
};
const getAsignaturaFromSession = () => {
    //carge en la session las asignaturas las asignaturas
    const asignatura = sessionStorage.getItem(ASIGNATURA_SESSION_KEY);
    return asignatura ? (typeof asignatura == 'object' ? asignatura : JSON.parse(asignatura)) : null;
};
const getApi = (url, options = {}) => {
    options = JSON.stringify(options);
    const fetchData = async () => {
        try {
            const res = await fetch(url, JSON.parse(options));
            const datos = await res.json();
            return JSON.stringify(datos);
        } catch (error) {
            console.log('-->', error);
        }
    };
    return fetchData();
};
const getApiUsuario = (url) => {
    const fetchUser = async () => {
        try {
            const res = await fetch(url);
            const datos = await res.json();
            return JSON.stringify(datos);
        } catch (error) {
            console.log(error);
        }
    };
    return fetchUser();
};
const getApiAsignaturas = (url) => {
    const fetchAsigna = async () => {
        try {
            const res = await fetch(url);
            const datos = await res.json();
            //console.log('api_asignatura:', datos);
            return JSON.stringify(datos);
        } catch (error) {
            console.log(error);
        }
    };
    return fetchAsigna();
};
const getApiSyllabus = (url) => {
    const fetchSyllabus = async () => {
        try {
            const res = await fetch(url);
            const datos = await res.json();
            //console.log('api:', datos);
            return JSON.stringify(datos);
        } catch (error) {
            console.log(error);
        }
    };
    return fetchSyllabus();
};
const getApiSyllabusCursos = (url) => {
    const fetchSyllabusCursos = async () => {
        try {
            const res = await fetch(url);
            const datos = await res.json();

            return JSON.stringify(datos);
        } catch (error) {
            console.log(error);
        }
    };
    return fetchSyllabusCursos();
};
const getApiListadoEstudiantes = (url) => {
    const fetchListadoEstudiantes = async () => {
        try {
            const res = await fetch(url);
            const datos = await res.json();

            return JSON.stringify(datos);
        } catch (error) {
            console.log(error);
        }
    };
    return fetchListadoEstudiantes();
};
const getActividades = (url) => {
    const getconsultar = async () => {
        try {
            const res = await fetch(url);
            const datos = await res.json();
            return datos;
        } catch (error) {
            console.log(error);
        }
    };
    return getconsultar();
};
const getApiEditorVideosContenido = (url) => {
    const fetchEditorVideosContenido = async () => {
        try {
            const res = await fetch(url);
            const datos = await res.json();

            return JSON.stringify(datos);
        } catch (error) {
            console.log(error);
        }
    };
    return fetchEditorVideosContenido();
};
const getApiFormSyllabus = (url) => {
    const fetchFormSyllabu = async () => {
        try {
            const res = await fetch(url);
            const datos = await res.json();
            return JSON.stringify(datos);
        } catch (error) {
            console.log(error);
        }
    };
    return fetchFormSyllabu();
};
const getApiCopiarTemas = (url) => {
    const fetchCopiarTemas = async () => {
        try {
            const res = await fetch(url);
            const datos = await res.json();
            return JSON.stringify(datos);
        } catch (error) {
            console.log(error);
        }
    };
    return fetchCopiarTemas();
};
const getApitEditarContenido = (url, id, contenido) => {
    let text = JSON.stringify(encodeURIComponent(contenido));
    const formData = new FormData();

    formData.append('text', text);

    const config = {
        method: 'POST',
        body: formData,
        headers: {
            ...axios.defaults.headers,
            'content-type': 'application/x-www-form-urlencoded',
        },
    };

    const queryString = 'id=' + id + '&accion=editarcontenido';

    const fetchEditarContenido = async () => {
        try {
            const response = await fetch(`${url}&${queryString}`, config);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    };
    return fetchEditarContenido();
};

class APICore {
    /**
     * Fetches data from given url
     */
    get = (url, params) => {
        let response;
        if (params) {
            var queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
            response = axios.get(`${url}?${queryString}`, params);
        } else {
            response = axios.get(`${url}`, params);
        }
        return response;
    };

    getFile = (url, params) => {
        let response;
        if (params) {
            var queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
            response = axios.get(`${url}?${queryString}`, { responseType: 'blob' });
        } else {
            response = axios.get(`${url}`, { responseType: 'blob' });
        }
        return response;
    };

    getMultiple = (urls, params) => {
        const reqs = [];
        let queryString = '';
        if (params) {
            queryString = params
                ? Object.keys(params)
                      .map((key) => key + '=' + params[key])
                      .join('&')
                : '';
        }

        for (const url of urls) {
            reqs.push(axios.get(`${url}?${queryString}`));
        }

        return axios.all(reqs);
    };
    getUrlApi = (urls, queryString) => {
        let response;
        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        if (queryString) {
            response = axios.get(`${urls}?${queryString}`, config);
        } else {
            response = axios.get(`${urls}`, config);
        }
        return response;
    };
    /**
     * post given data to url
     */
    create = (url, data) => {
        return axios.post(url, data);
    };

    createactividad = (url) => {
        const sendRequest = async () => {
            try {
                const user = this.getLoggedInUser();
                const config = {
                    method: 'POST',
                    headers: {
                        ...axios.defaults.headers,
                        Authorization: 'Basic ' + btoa(user.username + ':' + user.password),
                    },
                };
                const response = await fetch(`${url}`, config);
                return JSON.parse(await response.text());
            } catch (err) {
                console.error(err);
            }
        };
        return sendRequest();
    };
    createactividadFile = (url, data) => {
        const sendRequest = async () => {
            const formData = new FormData();
            for (let step = 0; step < data.length; step++) {
                formData.append('file', data[step]);
            }

            const user = this.getLoggedInUser();
            const config = {
                method: 'POST',
                body: formData,
                headers: {
                    ...axios.defaults.headers,
                    'content-type': 'application/x-www-form-urlencoded; boundary=' + formData + '',
                    Authorization: 'Basic ' + btoa(user.username + ':' + user.password),
                },
            };

            try {
                const response = await fetch(`${url}`, config);
                const resp = JSON.parse(await response.text());
                return resp;
            } catch (err) {
                console.error(err);
            }
        };
        return sendRequest();
    };
    /**
     * Updates patch data
     */
    updatePatch = (url, data) => {
        return axios.patch(url, data);
    };

    /**
     * Updates data
     */
    update = (url, data) => {
        return axios.put(url, data);
    };

    /**
     * Deletes data
     */
    delete = (url) => {
        return axios.delete(url);
    };
    /**
     * post given data to url with file
     */

    /**
     * post given data to url with file
     */
    createWithFile = (url, data) => {
        console.log('data', data);
        const formData = new FormData();
        for (let step = 0; step < data.length; step++) {
            formData.append('file', data[step]);
        }

        const sendPostRequest = async () => {
            const user = this.getLoggedInUser();
            const config = {
                method: 'POST',
                body: formData,
                headers: {
                    ...axios.defaults.headers,
                    'content-type': 'application/x-www-form-urlencoded; boundary=' + formData + '',
                    Authorization: 'Basic ' + btoa(user.username + ':' + user.password),
                },
            };

            try {
                const response = await fetch(`${url}`, config);
                console.log(await response.text());
            } catch (err) {
                console.error(err);
            }
        };
        sendPostRequest();
    };

    /**
     * post given data to url with file
     */
    updateWithFile = (url, data) => {
        const formData = new FormData();
        for (const k in data) {
            formData.append(k, data[k]);
        }

        const config = {
            headers: {
                ...axios.defaults.headers,
                'content-type': 'multipart/form-data',
            },
        };
        return axios.patch(url, formData, config);
    };

    isUserAuthenticated = () => {
        const user = this.getLoggedInUser();
        if (!user || (user && !user.token)) {
            return false;
        }
        const decoded = jwtDecode(user.token);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            console.warn('access token expired');
            return false;
        } else {
            return true;
        }
    };
    //localStorage.setItem("testJSON", myJSON);

    setLoggedInAsignatura = (session) => {
        if (session) sessionStorage.setItem(ASIGNATURA_SESSION_KEY, session);
        else {
            sessionStorage.removeItem(ASIGNATURA_SESSION_KEY);
        }
    };
    setLoggedInUser = (session) => {
        if (session) {
            sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
            //cargar las asignaturas en el storage
            //console.log('session<<<' + JSON.stringify(session));
        } else {
            sessionStorage.removeItem(AUTH_SESSION_KEY);
            sessionStorage.removeItem(ASIGNATURA_SESSION_KEY);
        }
    };
    /**
     * Returns the logged in user
     */
    getLoggedInUser = () => {
        return getUserFromSession();
    };

    getLoggedInAsignatura = () => {
        return getAsignaturaFromSession();
    };

    setUserInSession = (modifiedUser) => {
        let userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
        if (userInfo) {
            const { token, user } = JSON.parse(userInfo);
            this.setLoggedInUser({ token, ...user, ...modifiedUser });
        }
    };
    setAsignaturaInSession = (modifiedUser) => {
        let userInfo = sessionStorage.getItem(ASIGNATURA_SESSION_KEY);
        if (userInfo) {
            const { token, asignatura } = JSON.parse(userInfo);
            this.setLoggedInAsignatura({ token, ...asignatura, ...modifiedUser });
        }
    };
    setPeriodo = (url) => {
        return getApi(url);
    };
    setUsuarioslocal = (url) => {
        return getApiUsuario(url);
    };
    setAsignatura = (url) => {
        return getApiAsignaturas(url);
    };
    setSyllabusTitulos = (url) => {
        return getApiSyllabus(url);
    };
    setSyllabusCursos = (url) => {
        return getApiSyllabusCursos(url);
    };
    setListadoEstudiantes = (url) => {
        return getApiListadoEstudiantes(url);
    };
    setConsultas = (url) => {
        return getActividades(url);
    };
    setEditorVideosContenidos = (url) => {
        return getApiEditorVideosContenido(url);
    };
    setFormSyllabus = (url) => {
        return getApiFormSyllabus(url);
    };
    setCopiarTemas = (url) => {
        return getApiCopiarTemas(url);
    };
    setEditarContenido = (url, id, contenido) => {
        return getApitEditarContenido(url, id, contenido);
    };
}
/*
Check if token available in session
*/

let user = getUserFromSession();
if (user) {
    const { token } = user;
    if (token) {
        setAuthorization(token);
    }
}

export { APICore, setAuthorization };
