const MENU_ITEMS = [
    { key: 'navigation', label: 'Navigation', isTitle: true },
    {
        key: 'dashboards',
        label: 'Aulaweb',
        isTitle: false,
        icon: 'uil-home-alt',
        badge: { variant: 'success', text: '1' },
        children: [{ key: 'ds-aula', label: 'Inicio', url: '/pages/usuarios/', parentKey: 'dashboards' }],
    },
    {
        key: 'usuarios',
        label: 'Menu Usuarios',
        isTitle: false,
        icon: 'uil-clipboard-alt',
        badge: { variant: 'success', text: '3' },
        children: [
            {
                key: 'ds-personales',
                label: 'Datos Personales',
                url: '/pages/account/Confirm',
                parentKey: 'usuarios',
            },
            {
                key: 'ds-password',
                label: 'Cambiar Pasword',
                url: '/pages/account/Register',
                parentKey: 'usuarios',
            },
            {
                key: 'ds-fotos',
                label: 'Subir Foto',
                url: '/pages/account/Confirm',
                parentKey: 'usuarios',
            },
        ],
    },
];

export default MENU_ITEMS;
