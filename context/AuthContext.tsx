import { createContext, useContext, useEffect, useState } from 'react'
import {
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
    sendEmailVerification,
    UserCredential,
} from 'firebase/auth'
import db, { auth } from '../config/firebase'
import { doc, setDoc, Timestamp } from "firebase/firestore";

const AuthContext = createContext<any>({})

export const useAuth = () => useContext(AuthContext)

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    console.log(user)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                })
            } else {
                setUser(null)
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const signup = async (email: string, password: string, name: string, lastname: string, conditions: boolean) => {
        try {

            const displayName = name;
            var valid: boolean = true;
            createUserWithEmailAndPassword(auth, email, password)
                .then(async () => {
                    await updateProfile(auth.currentUser as User, { displayName })
                }).catch((err) =>
                    valid = false
                );
            if (valid) {
                const userData = {
                    email,
                    name,
                    lastname,
                    conditions,
                };
                await sendEmailVerification(auth.currentUser as User).catch((err) =>
                    console.log(err)
                );

                const docRef = doc(db, 'users', user.uid);
                await setDoc(docRef, userData);
            }
        } catch (error) {
            console.error('Error during signup:', error);
        }
        console.log('Signup successful!');

    };

    const login = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = async () => {
        setUser(null)
        await signOut(auth)
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}
