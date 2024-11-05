import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import React, { useEffect, useState } from 'react'
import { Demo } from '../../../../../types/types';
import { CustomerService } from '../../../../../demo/service/CustomerService';
import { useRouter } from 'next/router';
import styles from './scheduled-class.module.css';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { MultiSelect } from 'primereact/multiselect';
import CountdownTimer from '../../../../../components/CountdownTimer';
import { Dialog } from 'primereact/dialog';
import ClassLink from '../../../../../components/ClassLink';
interface InputValue {
    name: string;
    code: string;
}
const ScheduleClassPage = () => {

    const [customers1, setCustomers1] = useState<Demo.Customer[]>([]);
    const [value5, setValue5] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [value12, setValue12] = useState('');
    const [selectButtonValue1, setSelectButtonValue1] = useState(null);
    const [multiselectValue, setMultiselectValue] = useState(null);
    const [displayConfirmation, setDisplayConfirmation] = useState(false);
    const timer: number = 7000;

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
    const confirmationDialogFooter = (
        <>
            <Button type="button" label="No" icon="pi pi-times" onClick={() => setDisplayConfirmation(false)} text />
            <Button type="button" label="Si" icon="pi pi-check" onClick={() => setDisplayConfirmation(false)} text autoFocus />
        </>
    );

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

            <h5>Clase Programada</h5>
            <ClassLink link="https://google.com" />
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
            <CountdownTimer time={timer} />


            <div className={`flex flex-wrap gap-5 mt-5 ${styles.center_form}`}>
                <Button label="Aceptar Clase" icon="pi pi-check" severity="success" rounded />
                <Button label="Volver" icon="pi pi-angle-left" severity="secondary" rounded onClick={cancelClick} />
                <Button label="Cancelar Clase" icon="pi pi-exclamation-triangle" severity="danger" rounded onClick={() => setDisplayConfirmation(true)} />
                <Dialog header="Cancelar Clase" visible={displayConfirmation} onHide={() => setDisplayConfirmation(false)} style={{ width: '350px' }} modal footer={confirmationDialogFooter}>
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        <span>Recuerda que esta acción puede afectar <b>NEGATIVAMENTE</b> a todo tu equipo. Estas seguro que deseas cancelar la clase?</span>

                    </div>
                </Dialog>
            </div>
        </div>
    )
}

export default ScheduleClassPage
