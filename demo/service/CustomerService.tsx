import { Demo } from '../../types/types';

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
    }
};
