// @flow
import { useEffect, useState, useMemo } from 'react';

import { APICore } from '../helpers/api/apiCore';
/*
import  useFetch  from '../helpers/api/useFetch';
const url = 'https://pokeapi.co/api/v2/pokemon?limit=807';
            const { loading, respuest } = useFetch(url);
            console.log(loading);
            console.log(respuest);
*/
const useUser = (): { user: any | void, ... } => {
    const api = useMemo(() => new APICore(), []);

    const [user, setuser] = useState();

    useEffect(() => {
        if (api.isUserAuthenticated()) {
            setuser(api.getLoggedInUser());
        }
    }, [api]);

    return { user };
};

export default useUser;
