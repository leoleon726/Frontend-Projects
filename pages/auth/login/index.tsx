/* eslint-disable @next/next/no-img-element */

import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import AppConfig from '../../../layout/AppConfig';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { LayoutContext } from '../../../layout/context/layoutcontext';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Page } from '../../../types/types';
import { Form } from 'react-bootstrap';
import { useAuth } from '../../../context/AuthContext';
import Link from 'next/link';
import styles from './login.module.css';

const LoginPage: Page = () => {
    const [checked, setChecked] = useState(false);
    const router = useRouter();
    const { layoutConfig } = useContext(LayoutContext);
    const { user, login } = useAuth();
    const [errorMessage, setErrorMessage] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const handleLogin = async (e: any) => {
        e.preventDefault();

        try {
            await login(data.email, data.password, errorMessage);
            router.push('/lehrer/teacher')
        } catch (err) {
            setErrorMessage(true);
        }
    }


    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-lehrer-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Lehrer Profesores Personalizados" className="mb-5 w-6rem flex-shrink-0" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Bienvenido Profesor Lehrer!</div>
                            <span className="text-600 font-medium">Ingresa para poder continuar</span>
                        </div>

                        <Form onSubmit={handleLogin}>
                            <label htmlFor="email_login" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText id="email_login" placeholder="Email address" className="w-full md:w-30rem mb-5" onChange={(e: any) =>
                                setData({
                                    ...data,
                                    email: e.target.value,
                                })
                            }
                                value={data.email}
                                required
                                type="email" style={{ padding: '1rem' }} />

                            <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                                Password
                            </label>
                            <Password inputId="password1" onChange={(e: any) =>
                                setData({
                                    ...data,
                                    password: e.target.value,
                                })
                            }
                                value={data.password}
                                required
                                feedback={false}
                                type="password" placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="rememberme1" checked={checked} onChange={(e) => setChecked(e.checked ?? false)} className="mr-2"></Checkbox>
                                    <label htmlFor="rememberme1">Remember me</label>
                                </div>
                                <a className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'var(--primary-color)' }}>
                                    Forgot password?
                                </a>
                            </div>
                            {errorMessage && <div className="text-center mb-5">
                                <p className={styles.errorMessage}>Verifica tu email con tu contrasena</p>
                            </div>}
                            <Button label="Ingresa" className="w-full p-3 text-xl" type='submit'></Button>
                            <Link href="/auth/signup" passHref>
                                <Button label="Registrate" className="w-full p-3 text-xl mt-3" severity="secondary" ></Button>
                            </Link>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

LoginPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default LoginPage;
