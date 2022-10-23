const useAsignaturas = (url) => {
    const fetchAsignaturas = async () => {
        try {
            const res = await fetch(url);
            const datos = await res.json();
            return JSON.stringify(datos);
        } catch (error) {
            console.log('-->', error);
        }
    };
    return fetchAsignaturas();
};
export { useAsignaturas };
