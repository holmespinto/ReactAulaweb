import { APICore } from './apiCore';

const api = new APICore();
// account
function subrifoto(params: any, opcion: string) {
    const baseUrl = `http://localhost/clase/apiPhpFrameworks/v1/perfil_subirfoto/?opcion=${opcion}`;
    return api.createWithFile(`${baseUrl}`, params);
}
export { subrifoto };
