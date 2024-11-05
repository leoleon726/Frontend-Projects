import { request } from 'http';
import { Demo } from '../../types/types';
import axios, { AxiosRequestConfig } from 'axios';
import { auth } from '../../config/firebase'


export const CustomerService = {
    getCustomersMedium() {
        return fetch('/demo/data/customers-medium.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Customer[]);
    },

    getCustomersLarge() {
        return fetch('/demo/data/customers-large.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.data as Demo.Customer[]);
    },
    async getStudent(id: number): Promise<Demo.Customer[]> {
        const response = await fetch('/demo/data/customers-large.json', { headers: { 'Cache-Control': 'no-cache' } });
        const data = await response.json();
        const customers: Demo.Customer[] = (data.data as any) as Demo.Customer[];
        const students = customers.filter((customer) => customer.id === id);
        return students;
    },
    async accessTestPage() {
        try {
            const response = await fetch('http://localhost:8082/test-lehrer/auth/token');
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error:', error);
        }
    },
    async accessPostPage() {
        const requestUrl = 'http://localhost:8082/test-lehrer/auth/leo';
        try {
            const response = await fetch(requestUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ /* Request body data */ })
            });

            if (response.ok) {
                // Request was successful
                const responseData = await response.json();
                console.log(responseData);
            } else {
                // Request failed
                console.error('Request failed with status:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    },
    requestAuth(url: string, options?: AxiosRequestConfig) {
        const headers = options?.headers || {};
        return auth.currentUser?.getIdToken(true)
            .then(idToken => {
                const auth = idToken && { Authorization: `Bearer ${idToken}` };

                return axios({
                    method: options?.method,
                    url,
                    headers: { ...auth, ...headers },
                    data: options?.data,
                });
            });
    }

};
