import { useState, useEffect } from 'react';
const useUsuarios = (url, options = {}) => {
    const [responseU, setResponseU] = useState(null);
    const [loadingU, setLoadingU] = useState(true);
    options = JSON.stringify(options);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url, JSON.parse(options));
                const json = await res.json();
                setResponseU(json);
                setLoadingU(false);
            } catch (error) {
                console.log('-->', error);
            }
        };
        fetchData();
    }, [url, options]);
    return { responseU, loadingU };
};
export { useUsuarios };
