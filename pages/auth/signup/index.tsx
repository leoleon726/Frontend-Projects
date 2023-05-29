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
import { useAuth } from '../../../context/AuthContext';
import { Form } from 'react-bootstrap';


const SignUpPage: Page = () => {
    const { user, signup } = useAuth()
    const [password, setPassword] = useState('');

    const [checked, setChecked] = useState(false);
    const { layoutConfig } = useContext(LayoutContext);
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        lastname: '',
        phone: '',
        conditions: ''
    })

    const handleSignup = async (e: any) => {
        e.preventDefault()

        try {
            await signup(data.email, data.password, data.confirmPassword, data.name, data.lastname, data.phone, data.conditions)
        } catch (err) {
            console.log(err)
        }

        console.log(data)
    }


    const router = useRouter();
    const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden', { 'p-input-filled': layoutConfig.inputStyle === 'filled' });

    return (
        <div className={containerClassName}>
            <div className="flex flex-column align-items-center justify-content-center">
                <img src={`/layout/images/logo-lehrer-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Lehrer Profesores Personalizados" className="mb-5 w-6rem flex-shrink-0" />
                <div style={{ borderRadius: '56px', padding: '0.3rem', background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)' }}>
                    <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
                        <div className="text-center mb-5">
                            <div className="text-900 text-3xl font-medium mb-3">Registrate como Profesor Lehrer!</div>
                            <span className="text-600 font-medium">Ingresa para poder continuar</span>
                        </div>

                        <Form onSubmit={handleSignup}>
                            <label htmlFor="email_signup" className="block text-900 text-xl font-medium mb-2">
                                Email
                            </label>
                            <InputText id="email_signup" type="email" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}
                                onChange={(e: any) =>
                                    setData({
                                        ...data,
                                        email: e.target.value,
                                    })

                                } value={data.email} />

                            <label htmlFor="password_signup" className="block text-900 font-medium text-xl mb-2">
                                Contrasena
                            </label>
                            <Password inputId="password_signup" placeholder="Contrasena" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"
                                onChange={(e: any) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                                value={data.password}></Password>
                            <label htmlFor="cpassword_signup" className="block text-900 font-medium text-xl mb-2">
                                Confirmar Contrasena
                            </label>
                            <Password inputId="cpassword_signup" placeholder="Confirmar Contrasena" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"
                                onChange={(e: any) =>
                                    setData({
                                        ...data,
                                        password: e.target.value,
                                    })
                                }
                                value={data.password}></Password>
                            <label htmlFor="name_signup" className="block text-900 text-xl font-medium mb-2">
                                Nombre
                            </label>
                            <InputText id="name_signup" type="text" placeholder="Nombre" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}
                                onChange={(e: any) =>
                                    setData({
                                        ...data,
                                        name: e.target.value,
                                    })

                                } value={data.name} />

                            <label htmlFor="lastname_signup" className="block text-900 text-xl font-medium mb-2">
                                Apellido
                            </label>
                            <InputText id="lastname_signup" type="text" placeholder="Apellido" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}
                                onChange={(e: any) =>
                                    setData({
                                        ...data,
                                        lastname: e.target.value,
                                    })

                                } value={data.lastname} />

                            <label htmlFor="phone_signup" className="block text-900 text-xl font-medium mb-2">
                                Telefono
                            </label>
                            <InputText id="phone_signup" type="tel" placeholder="Telefono" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }}
                                onChange={(e: any) =>
                                    setData({
                                        ...data,
                                        phone: e.target.value,
                                    })

                                } value={data.phone} />


                            <div className="flex align-items-center justify-content-between mb-5 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="conditions_signup" checked={checked}
                                        onChange={(e) => {
                                            setData({
                                                ...data,
                                                phone: e.target.value,
                                            })
                                            setChecked(e.checked ?? false)
                                        }}
                                        className="mr-2"></Checkbox>
                                    <label htmlFor="conditions_signup">Aceptas condiciones de privacidad</label>
                                </div>

                            </div>
                            <Button label="Registrate" className="w-full p-3 text-xl" type="submit"></Button>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

SignUpPage.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig simple />
        </React.Fragment>
    );
};
export default SignUpPage;
