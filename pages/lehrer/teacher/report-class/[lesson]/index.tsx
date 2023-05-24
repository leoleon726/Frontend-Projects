import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { Demo } from '../../../../../types/types';
import { CustomerService } from '../../../../../demo/service/CustomerService';
import { useRouter } from 'next/router';
import styles from './report-class.module.css';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { MultiSelect } from 'primereact/multiselect';
interface InputValue {
    name: string;
    code: string;
}
const ReportClassPage = () => {

    const [customers1, setCustomers1] = useState<Demo.Customer[]>([]);
    const [value5, setValue5] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [value12, setValue12] = useState('');
    const [selectButtonValue1, setSelectButtonValue1] = useState(null);
    const [multiselectValue, setMultiselectValue] = useState(null);

    const selectButtonValues1: InputValue[] = [
        { name: '1 Hora', code: 'O1' },
        { name: '1 + 1/2 Hora', code: 'O2' },
        { name: '2 Horas', code: 'O3' },
        { name: '2 + 1/2 Horas', code: 'O4' },
        { name: '3 Horas', code: 'O5' }
    ];
    const multiselectValues: InputValue[] = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];

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
    const statusOrderBodyTemplate = (rowData: Demo.Customer) => {
        return <span className={`customer-badge status-${rowData.status?.toLowerCase()}`}>{rowData.status}</span>;
    };
    const dateBodyTemplate = (rowData: Demo.Customer) => {
        return formatDate(rowData.date);
    };

    const formatDate = (value: Date) => {
        if (value instanceof Date && !isNaN(value.getTime())) {
            return value.toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        }

        return '';
    };
    const itemTemplate = (option: InputValue) => {
        return (
            <div className="flex align-items-center">
                <span className={`mr-2 flag flag-${option.code.toLowerCase()}`} style={{ width: '18px', height: '12px' }} />
                <span>{option.name}</span>
            </div>
        );
    };

    const router = useRouter();
    const { lesson } = router.query;
    const parsedId = parseInt(lesson as string, 10);
    const cancelClick = () => {
        router.back();
    };
    useEffect(() => {
        CustomerService.getStudent(parsedId)
            .then((selected) => {
                setCustomers1(selected);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [parsedId]);

    return (
        <div className="card">
            <DataTable
                value={customers1}
                className="p-datatable-gridlines"
                showGridlines
                rows={1}
                dataKey="id"
                filterDisplay="menu"
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
                <Column field="name" header="Tipo De Clase" style={{ minWidth: '12rem' }} />
                <Column field="date" header="Fecha/Hora (Programada)" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} />
                <Column field="status" header="Estado" body={statusOrderBodyTemplate}></Column>
            </DataTable>

            <h5>Reporte de Clase</h5>
            <div className={`grid p-fluid mt-5 ${styles.center_form}`}>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <InputTextarea id="textarea" rows={3} value={value12} onChange={(e) => setValue12(e.target.value)} autoResize></InputTextarea>
                        <label htmlFor="textarea">Objetivos</label>
                    </span>
                </div>
                <div className="field col-12 md:col-5">
                    <span className="p-float-label">
                        <InputTextarea id="textarea" rows={3} value={value12} onChange={(e) => setValue12(e.target.value)} autoResize></InputTextarea>
                        <label htmlFor="textarea">Comentarios Iniciales</label>
                    </span>
                </div>
            </div>
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
                        <label htmlFor="time">Hora de Inicio</label>
                    </span>
                </div>
            </div>
            <div className={`grid p-fluid mt-3 ${styles.center_form}`}>
                <h5>Tiempo de Clase</h5>
            </div>
            <div className={`grid p-fluid mt-3 ${styles.center_form}`}>
                <SelectButton value={selectButtonValue1} onChange={(e) => setSelectButtonValue1(e.value)} options={selectButtonValues1} optionLabel="name" />
            </div>
            <div className={`grid p-fluid mt-4 ${styles.center_form}`}>
                <h5>Asignaturas</h5>
            </div>
            <div className={`grid p-fluid mt-3 ${styles.center_form}`}>
                <div className="field col-12 md:col-4">
                    <MultiSelect value={multiselectValue} onChange={(e) => setMultiselectValue(e.value)} options={multiselectValues} optionLabel="name" placeholder="Selección Asignaturas" filter display="chip" itemTemplate={itemTemplate} />
                </div>
            </div>
            <div className={`grid p-fluid mt-5 ${styles.center_form}`}>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <InputTextarea id="textarea" rows={3} value={value12} onChange={(e) => setValue12(e.target.value)} autoResize></InputTextarea>
                        <label htmlFor="textarea">Actividades</label>
                    </span>
                </div>
                <div className="field col-12 md:col-5">
                    <span className="p-float-label">
                        <InputTextarea id="textarea" rows={3} value={value12} onChange={(e) => setValue12(e.target.value)} autoResize></InputTextarea>
                        <label htmlFor="textarea">Aspectos a Mejorar</label>
                    </span>
                </div>
            </div>
            <div className={`grid p-fluid mt-5 ${styles.center_form}`}>
                <div className="field col-12 md:col-4">
                    <span className="p-float-label">
                        <InputTextarea id="textarea" rows={3} value={value12} onChange={(e) => setValue12(e.target.value)} autoResize></InputTextarea>
                        <label htmlFor="textarea">Fortalezas</label>
                    </span>
                </div>
                <div className="field col-12 md:col-5">
                    <span className="p-float-label">
                        <InputTextarea id="textarea" rows={3} value={value12} onChange={(e) => setValue12(e.target.value)} autoResize></InputTextarea>
                        <label htmlFor="textarea">Observaciones</label>
                    </span>
                </div>
            </div>


            <div className={`flex flex-wrap gap-5 mt-5 ${styles.center_form}`}>
                <Button label="Enviar" icon="pi pi-check" severity="success" rounded />
                <Button label="Cancelar" icon="pi pi-times" severity="secondary" rounded onClick={cancelClick} />
            </div>
        </div>
    )
}

export default ReportClassPage
