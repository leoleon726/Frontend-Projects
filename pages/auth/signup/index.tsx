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
import validator from 'validator';
import { Divider } from 'primereact/divider';

const SignUpPage: Page = () => {
    const { user, signup } = useAuth();
    const { layoutConfig } = useContext(LayoutContext);
    const [data, setData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        lastname: '',
        phone: '',
        conditions: false
    });
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setisValidPassword] = useState(false);
    const [isValidName, setIsValidName] = useState(false);
    const [isValidLastname, setIsValidLastname] = useState(false);

    const footer = (
        <>
            <Divider />
            <p className="mt-2">Recomendaciones</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>Al menos un caracter en minuscula</li>
                <li>Al menos un caracter en mayuscula</li>
                <li>Minimo 8 caracteres</li>
            </ul>
        </>
    );
    const handleSignup = async (e: any) => {
        e.preventDefault();
        try {
            await signup(
                data.email,
                data.password,
                data.confirmPassword,
                data.name,
                data.lastname,
                data.conditions
            );
            router.push('/auth/login');
        } catch (err) {
            console.log(err);
        }
        console.log(data);
    };

    function validatePassword(password: string) {
        const missingChars = [];
        if (!/(?=.*[a-z])/.test(password)) {
            missingChars.push("una minuscula");
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            missingChars.push("una mayuscula");
        }
        if (password.length < 8) {
            missingChars.push("al menos 8 caracteres");
        }
        return missingChars;
    }

    const getFormErrorMessage = (notvalid: boolean, message: string) => {
        return notvalid ? <small className="p-error">{message}</small> : <small className="p-error">&nbsp;</small>;
    };
    const isFormValid = isValidEmail && isValidPassword && isValidName && isValidLastname && data.conditions;
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
                            <InputText
                                id="email_signup"
                                type="email"
                                placeholder="Email address"
                                className={`w-full mb-5 ${!isValidEmail && data.email != '' ? 'p-invalid' : ''}`}
                                style={{ padding: '1rem' }}
                                onChange={(e: any) => {
                                    let aux = e.target.value;
                                    setData((data) => ({ ...data, email: aux }));
                                    if (validator.isEmail(aux)) {
                                        setIsValidEmail(validator.isEmail(aux));
                                    } else {
                                        setIsValidEmail(false);
                                    }
                                }
                                }
                                value={data.email}
                            />


                            <label htmlFor="password_signup" className="block text-900 font-medium text-xl mb-2">
                                Contrasena
                            </label>
                            <Password
                                inputId="password_signup"
                                placeholder="Contrasena"
                                toggleMask
                                className={`w-full mb-5 ${!isValidPassword && data.password != '' ? 'p-invalid' : ''}`}
                                inputClassName="w-full p-3 md:w-30rem"
                                footer={footer}
                                promptLabel="Ingresa tu contrasena"
                                weakLabel="Demasiado simple"
                                mediumLabel="Te falta una recomendacion"
                                strongLabel="Perfecta!"
                                onChange={(e: any) => {
                                    let aux = e.target.value;
                                    setData((data) => ({ ...data, password: aux }));
                                    const missingChars = validatePassword(aux);
                                    if (missingChars.length === 0) {
                                        setisValidPassword(true);
                                    } else {
                                        setisValidPassword(false);
                                    }
                                }
                                }
                                value={data.password}
                            />

                            <label htmlFor="name_signup" className="block text-900 text-xl font-medium mb-2">
                                Nombre
                            </label>
                            <InputText
                                id="name_signup"
                                type="text"
                                placeholder="Nombre"
                                className={`w-full mb-5 ${!isValidName && data.name != '' ? 'p-invalid' : ''}`}
                                style={{ padding: '1rem' }}
                                onChange={(e: any) => {
                                    let aux = e.target.value;
                                    setData((data) => ({ ...data, name: aux }));
                                    const nameRegex = /^[A-Za-z\s]{2,}$/;
                                    if (nameRegex.test(aux)) {
                                        setIsValidName(nameRegex.test(aux));
                                    } else {
                                        setIsValidName(nameRegex.test(aux));
                                    }
                                }
                                }
                                value={data.name}
                            />

                            <label htmlFor="lastname_signup" className="block text-900 text-xl font-medium mb-2">
                                Apellido
                            </label>
                            <InputText
                                id="lastname_signup"
                                type="text"
                                placeholder="Apellido"
                                className={`w-full mb-5 ${!isValidLastname && data.lastname != '' ? 'p-invalid' : ''}`}
                                style={{ padding: '1rem' }}
                                onChange={(e: any) => {
                                    let aux = e.target.value;
                                    setData((data) => ({ ...data, lastname: aux }));
                                    const lastnameRegex = /^[A-Za-z\s]{2,}$/;
                                    if (lastnameRegex.test(aux)) {
                                        setIsValidLastname(lastnameRegex.test(aux));
                                    } else {
                                        setIsValidLastname(lastnameRegex.test(aux));
                                    }
                                }
                                }
                                value={data.lastname}
                            />
                            <div className="flex align-items-center justify-content-between mb-5 mt-4 gap-5">
                                <div className="flex align-items-center">
                                    <Checkbox
                                        inputId="conditions_signup"
                                        checked={data.conditions}
                                        onChange={(e: any) => {
                                            let aux = e.target.value;
                                            setData((data) => ({ ...data, conditions: aux }));
                                        }}
                                        className="mr-2"
                                    />
                                    <label htmlFor="conditions_signup">Aceptas condiciones de privacidad</label>
                                </div>
                            </div>
                            <Button label="Registrate" className="w-full p-3 text-xl" type="submit" disabled={!isFormValid}></Button>
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
function useForm(arg0: { defaultValues: any; }) {
    throw new Error('Function not implemented.');
}

