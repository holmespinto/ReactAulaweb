// @flow
import { useEffect, useState, useMemo } from 'react';

import { APICore } from '../helpers/api/apiCore';

const useAsignatura = (): { asignatura: any | void, ... } => {
    const api = useMemo(() => new APICore(), []);

    const [asignatura, setasignatura] = useState();

    useEffect(() => {
        if (api.isUserAuthenticated()) {
            setasignatura(api.getLoggedInAsignatura());
        }
    }, [api]);

    return { asignatura };
};

export default useAsignatura;
