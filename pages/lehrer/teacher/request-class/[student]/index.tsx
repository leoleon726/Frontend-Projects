import { useRouter } from 'next/router';
import { DataTable } from 'primereact/datatable';
import React, { useState, useEffect } from 'react';
import { Demo } from '../../../../../types/types';
import { Column } from 'primereact/column';
import { CustomerService } from '../../../../../demo/service/CustomerService';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import styles from './request-class.module.css';
import { Button } from 'primereact/button';



const RequestClassPage = () => {

    const [customers1, setCustomers1] = useState<Demo.Customer[]>([]);
    const [value5, setValue5] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [value12, setValue12] = useState('');
    const representativeBodyTemplate = (rowData: Demo.Customer) => {
        const representative = rowData.representative;
        return (
            <React.Fragment>
                <img
                    alt={representative.name}
                    src={`/demo/images/avatar/${representative.image}`}
                    onError={(e) => (e.currentTarget.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')}
                    width={32}
                    style={{ verticalAlign: 'middle' }}
                />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{representative.name}</span>
            </React.Fragment>
        );
    };

    const router = useRouter();
    const { student } = router.query;
    const parsedId = parseInt(student as string, 10);
    useEffect(() => {
        CustomerService.getStudent(parsedId)
            .then((selected) => {
                setCustomers1(selected);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [parsedId]);
    const cancelClick = () => {
        router.back();
    };

    return (
        <div className="card">
            <DataTable
                value={customers1}
                className="p-datatable-gridlines"
                showGridlines
                rows={1}
                dataKey="id"
                responsiveLayout="scroll"
                emptyMessage="No customers found."
            >
                <Column field="id" header="id" style={{ display: 'none' }} />
                <Column
                    header="Nombre Estudiante"
                    filterField="representative"
                    showFilterMatchModes={false}
                    filterMenuStyle={{ width: '14rem' }}
                    style={{ minWidth: '14rem' }}
                    body={representativeBodyTemplate}

                />
                <Column field="name" header="Acudiente" style={{ minWidth: '12rem' }} />
            </DataTable>
            <h5>Solicitar Clase</h5>
            <div className={`grid p-fluid mt-4 ${styles.center_form}`}>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <Calendar inputId="calendar" value={value5} onChange={(e) => setValue5(e.value as Date)}></Calendar>
                        <label htmlFor="calendar">Fecha</label>
                    </span>
                </div>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <Calendar inputId="time" value={time} onChange={(e) => setTime(e.value as Date)} timeOnly hourFormat="12" />
                        <label htmlFor="time">Hora de la clase</label>
                    </span>
                </div>
            </div>
            <div className={`grid p-fluid mt-4 ${styles.center_form}`}>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <InputTextarea id="textarea" rows={3} value={value12} onChange={(e) => setValue12(e.target.value)} autoResize></InputTextarea>
                        <label htmlFor="textarea">Objetivos</label>
                    </span>
                </div>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <InputTextarea id="textarea" rows={3} value={value12} onChange={(e) => setValue12(e.target.value)} autoResize></InputTextarea>
                        <label htmlFor="textarea">Comentarios</label>
                    </span>
                </div>
            </div>
            <div className={`flex flex-wrap gap-2 ${styles.center_form}`}>
                <Button label="Solicitar" icon="pi pi-check" severity="success" rounded />
                <Button label="Cancelar" icon="pi pi-times" severity="secondary" rounded onClick={cancelClick} />
            </div>
        </div>
    )
};

export default RequestClassPage;


