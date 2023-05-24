/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';
import { AppMenuItem } from '../types/types';

const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);

    const model: AppMenuItem[] = [
        {
            label: 'Home',
            items: [{ label: 'Home', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Navegación',
            items: [

                { label: 'Clases Programadas', icon: 'pi pi-calendar', to: '/uikit/formlayout' },
                { label: 'Llenar Reportes', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
                { label: 'Solicitar Clase', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
                { label: 'Clases Dictadas', icon: 'pi pi-chart-line', to: '/uikit/invalidstate' },
            ]
        },
        {
            label: 'Blog Lehrer',
            items: [
                { label: 'Blog', icon: 'pi pi-fw pi-eye', to: '/blocks', badge: 'NEW' },
                { label: 'Noticias', icon: 'pi pi-fw pi-globe', url: 'https://blocks.primereact.org', target: '_blank' }
            ]
        },
        {
            label: 'Perfil',
            items: [
                { label: 'Usuario', icon: 'pi pi-user-edit', to: '/utilities/icons' }
            ]
        },
        {
            label: 'Pages',
            icon: 'pi pi-fw pi-briefcase',
            to: '/pages',
            items: [
                {
                    label: 'Lehrer Website',
                    icon: 'pi pi-fw pi-globe',
                    to: 'https://www.profesorlehrer.com'
                }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item?.seperator ? <AppMenuitem item={item} root={true} index={i} key={item.label} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
