/* eslint-disable @next/next/no-img-element */

import Link from 'next/link';
import { classNames } from 'primereact/utils';
import React, { forwardRef, useContext, useImperativeHandle, useRef } from 'react';
import { AppTopbarRef } from '../types/types';
import { LayoutContext } from './context/layoutcontext';
import { Menu } from 'primereact/menu';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const AppTopbar = forwardRef<AppTopbarRef>((props, ref) => {
    const { layoutConfig, layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menubuttonRef = useRef(null);
    const topbarmenuRef = useRef(null);
    const topbarmenubuttonRef = useRef(null);
    const menu = useRef<Menu>(null);
    const { user, logout } = useAuth()
    const router = useRouter()
    const toggleMenu: React.MouseEventHandler<HTMLButtonElement> | undefined = (event) => {
        menu.current?.toggle(event);
    };

    useImperativeHandle(ref, () => ({
        menubutton: menubuttonRef.current,
        topbarmenu: topbarmenuRef.current,
        topbarmenubutton: topbarmenubuttonRef.current
    }));
    const loginItems = [
        {
            label: 'Cerrar sesion',
            icon: 'pi pi-sign-out',
            command: () => {
                logout()
                router.push('/auth/login')
            }
        }
    ];
    const notLoginItems = [
        {
            label: 'Iniciar Sesion',
            icon: 'pi pi-sign-in',
            command: () => {
                router.push('/auth/login')
            }
        }
    ];

    return (
        <div className="layout-topbar">
            <Link href="/" className="layout-topbar-logo">
                <img src={`/layout/images/logo-lehrer-${layoutConfig.colorScheme !== 'light' ? 'white' : 'dark'}.svg`} width="47.22px" height={'35px'} alt="logo" />
                <span>Lehrer</span>
            </Link>

            <button ref={menubuttonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                <i className="pi pi-bars" />
            </button>

            <button ref={topbarmenubuttonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                <i className="pi pi-ellipsis-v" />
            </button>

            <div ref={topbarmenuRef} className={classNames('layout-topbar-menu', { 'layout-topbar-menu-mobile-active': layoutState.profileSidebarVisible })}>

                {user ? (
                    <>
                        <Menu ref={menu} model={loginItems} popup /><button type="button" className="p-link layout-topbar-button" onClick={toggleMenu}>
                            <i className="pi pi-user"></i>
                            <span>Profile</span>
                        </button>
                    </>) : (
                    <>
                        <Menu ref={menu} model={notLoginItems} popup /><button type="button" className="p-link layout-topbar-button" onClick={toggleMenu}>
                            <i className="pi pi-user"></i>
                            <span>Profile</span>
                        </button>
                    </>
                )}

            </div>
        </div>
    );
});

AppTopbar.displayName = 'AppTopbar';

export default AppTopbar;
