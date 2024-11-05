import type { AppProps } from 'next/app';
import type { Page } from '../types/types';
import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import { AuthContextProvider } from '../context/AuthContext';
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute';
const noAuthRequired = ['/auth/login', '/auth/signup', '/']

type Props = AppProps & {
    Component: Page;
};

export default function MyApp({ Component, pageProps }: Props) {
    const router = useRouter();
    if (Component.getLayout) {
        return (<AuthContextProvider><LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider></AuthContextProvider>);
    } else {
        return (
            <AuthContextProvider>
                <LayoutProvider>
                    <Layout>
                        {noAuthRequired.includes(router.pathname) ? (
                            <Component {...pageProps} />
                        ) : (
                            <ProtectedRoute>
                                <Component {...pageProps} />
                            </ProtectedRoute>
                        )}

                    </Layout>
                </LayoutProvider>
            </AuthContextProvider>
        );
    }
}
