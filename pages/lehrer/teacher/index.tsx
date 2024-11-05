import React, { useState, useEffect } from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable, DataTableFilterMeta, DataTableRowClickEvent } from 'primereact/datatable';
import { Column, ColumnFilterApplyTemplateOptions, ColumnFilterElementTemplateOptions, ColumnFilterClearTemplateOptions } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Demo } from '../../../types/types';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { MultiSelect } from 'primereact/multiselect';
import { Calendar } from 'primereact/calendar';
import { CustomerService } from '../../../demo/service/CustomerService';
import Greeting from '../../../components/Greeting';
import { useRouter } from 'next/router';
import styles from './teacher.module.css';


const index = () => {
    const router = useRouter();
    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const [customers1, setCustomers1] = useState<Demo.Customer[]>([]);
    const [filters1, setFilters1] = useState<DataTableFilterMeta>({});
    const [loading1, setLoading1] = useState(true);
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');

    const clearFilter1 = () => {
        initFilters1();
    };
    interface Represenative {
        name: string;
        image: string;
    }

    const representatives: Represenative[] = [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'XuXue Feng', image: 'xuxuefeng.png' }
    ];


    const initFilters1 = () => {
        setFilters1({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            representative: { value: null, matchMode: FilterMatchMode.IN },
            date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue1('');
    };
    const onGlobalFilterChange1: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        (_filters1['global'] as any).value = value;

        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };
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

    const representativeFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return (
            <>
                <div className="mb-3 text-bold">Agent Picker</div>
                <MultiSelect value={options.value} options={representatives} itemTemplate={representativesItemTemplate} onChange={(e) => options.filterCallback(e.value)} optionLabel="name" placeholder="Any" className="p-column-filter" />
            </>
        );
    };
    const representativesItemTemplate = (option: Represenative) => {
        return (
            <div className="p-multiselect-representative-option">
                <img alt={option.name} src={`/demo/images/avatar/${option.image}`} width={32} style={{ verticalAlign: 'middle' }} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{option.name}</span>
            </div>
        );
    };
    const dateBodyTemplate = (rowData: Demo.Customer) => {
        return formatDate(rowData.date);
    };

    const formatDate = (value: Date) => {
        return value.toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const dateFilterTemplate = (options: ColumnFilterElementTemplateOptions) => {
        return <Calendar value={options.value} onChange={(e) => options.filterCallback(e.value, options.index)} dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" mask="99/99/9999" />;
    };

    const getCustomers = (data: Demo.Customer[]) => {
        return [...(data || [])].map((d) => {
            d.date = new Date(d.date);
            return d;
        });
    };
    const statusOrderBodyTemplate = (rowData: Demo.Customer) => {
        return <span className={`customer-badge status-${rowData.status?.toLowerCase()}`}>{rowData.status}</span>;
    };
    const [value5, setValue5] = useState(new Date());

    const onLoadingClick1 = () => {
        setLoading1(true);

        setTimeout(() => {
            setLoading1(false);
        }, 2000);
    };

    const countryBodyTemplate = (rowData: Demo.Customer) => {
        return (
            <React.Fragment>
                <img alt="flag" src={`/demo/images/flag/flag_placeholder.png`} className={`flag flag-${rowData.country?.code}`} width={30} />
                <span style={{ marginLeft: '.5em', verticalAlign: 'middle' }}>{rowData.country?.name}</span>
            </React.Fragment>
        );
    };
    const filterClearTemplate = (options: ColumnFilterClearTemplateOptions) => {
        return <Button type="button" icon="pi pi-times" onClick={options.filterClearCallback} severity="secondary"></Button>;
    };
    const filterApplyTemplate = (options: ColumnFilterApplyTemplateOptions) => {
        return <Button type="button" icon="pi pi-check" onClick={options.filterApplyCallback} severity="success"></Button>;
    };
    const onRowRequestClass = (event: DataTableRowClickEvent) => {

        const rowData = event.data;
        router.push(`/lehrer/teacher/request-class/${rowData.id}`);
        console.log(`/request-class/${rowData.id}`);
    };
    const onRowReportClass = (event: DataTableRowClickEvent) => {
        const rowData = event.data;
        router.push(`/lehrer/teacher/report-class/${rowData.id}`);
    };
    const onRowScheduledClass = (event: DataTableRowClickEvent) => {
        const rowData = event.data;
        router.push(`/lehrer/teacher/scheduled-class/${rowData.id}`);
        console.log(`/lehrer/teacher/scheduled-class/${rowData.id}`);
    };

    useEffect(() => {

        CustomerService.getCustomersLarge().then((data) => {
            setCustomers1(getCustomers(data));
            setLoading1(false);
        });
        //CustomerService.accessPostPage();
        //CustomerService.accessTestPage();
        const requestUrl = 'http://localhost:8082/test-lehrer/auth/token';
        const data = {
            leo: 'leoleon'
        }
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: data,
        };
        const result = CustomerService.requestAuth(requestUrl, options);
        console.log(result);
        initFilters1();
    }, []);

    const header1 = renderHeader1();

    return (
        <div className="card">
            <Greeting user="Leonardo Leon" />
            <Accordion>
                <AccordionTab header="Clases Programadas">
                    <div className="col-12">
                        <p>Tienes asignadas las siguientes clases, asiste puntualmente al lugar de la clase,
                            en caso de algún inconveniente preguntale a tu coordinador asignado</p>
                        <DataTable
                            value={customers1}
                            paginator
                            className="p-datatable-gridlines"
                            showGridlines
                            rows={5}
                            dataKey="id"
                            filters={filters1}
                            filterDisplay="menu"
                            loading={loading1}
                            responsiveLayout="scroll"
                            emptyMessage="No customers found."
                            header={header1}
                            onRowClick={onRowScheduledClass}

                        >
                            <Column field="id" header="id" style={{ display: 'none' }} />
                            <Column
                                header="Nombre Estudiante"
                                filterField="representative"
                                showFilterMatchModes={false}
                                filterMenuStyle={{ width: '14rem' }}
                                style={{ minWidth: '14rem' }}
                                body={representativeBodyTemplate}
                                filter
                                filterElement={representativeFilterTemplate}
                            />
                            <Column field="name" header="Tipo De Clase" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                            <Column header="Fecha/Hora" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                            <Column field="status" header="Estado" body={statusOrderBodyTemplate} sortable></Column>
                        </DataTable>
                    </div>
                </AccordionTab>
                <AccordionTab header="Llenar Reportes">

                    <div className="col-12">

                        <p>Con el fin de que los padres o acudientes esten actualizados de los avances de sus hijos,
                            llena los siguientes reportes lo mas antes posible para que reciban tus observaciones y recomendaciones</p>
                        <DataTable
                            value={customers1}
                            paginator
                            className="p-datatable-gridlines"
                            showGridlines
                            rows={5}
                            dataKey="id"
                            filters={filters1}
                            filterDisplay="menu"
                            loading={loading1}
                            responsiveLayout="scroll"
                            emptyMessage="No customers found."
                            header={header1}
                            onRowClick={onRowReportClass}>
                            <Column field="id" header="id" style={{ display: 'none' }} />
                            <Column
                                header="Nombre Estudiante"
                                filterField="representative"
                                showFilterMatchModes={false}
                                filterMenuStyle={{ width: '14rem' }}
                                style={{ minWidth: '14rem' }}
                                body={representativeBodyTemplate}
                                filter
                                filterElement={representativeFilterTemplate}
                            />
                            <Column field="name" header="Acudiente" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                            <Column header="Fecha/Hora" filterField="date" dataType="date" style={{ minWidth: '10rem' }} body={dateBodyTemplate} filter filterElement={dateFilterTemplate} />
                            <Column field="status" header="Estado" body={statusOrderBodyTemplate} sortable></Column>
                        </DataTable>
                    </div>


                </AccordionTab>
                <AccordionTab header="Solicitar Clase">
                    <p>
                        Tienes 6 horas despues de cada clase para indicar al coordinador o acudiente que autorice una nueva clase,
                        en caso de haber pasado ese tiempo, solicitale al coordinador que te agende una clase ya conversada con el acudiente
                    </p>
                    <DataTable
                        value={customers1}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={3}
                        dataKey="id"
                        filters={filters1}
                        filterDisplay="menu"
                        loading={loading1}
                        responsiveLayout="scroll"
                        emptyMessage="No customers found."
                        header={header1}
                        onRowClick={onRowRequestClass}
                    >
                        <Column field="id" header="id" style={{ display: 'none' }} />
                        <Column
                            header="Nombre Estudiante"
                            filterField="representative"
                            showFilterMatchModes={false}
                            filterMenuStyle={{ width: '14rem' }}
                            style={{ minWidth: '14rem' }}
                            body={representativeBodyTemplate}
                            filter
                            filterElement={representativeFilterTemplate}
                        />
                        <Column field="name" header="Acudiente" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                        <Column header="Country" filterField="country.name" style={{ minWidth: '12rem' }} body={countryBodyTemplate} filter filterPlaceholder="Search by country" filterClear={filterClearTemplate} filterApply={filterApplyTemplate} />

                    </DataTable>

                </AccordionTab>
                <AccordionTab header="Clases Dictadas">

                    <p>
                        Selecciona el rango de fechas de las clases ya dictadas que deseas ver:
                    </p>

                    <div className="grid p-fluid mt-4 align-items-center justify-content-center">
                        <div className="field col-12 md:col-5">
                            <span className="p-float-label">
                                <Calendar inputId="calendar" value={value5} onChange={(e) => setValue5(e.value as Date)}></Calendar>
                                <label htmlFor="calendar">Calendar</label>
                            </span>
                        </div>
                        <div className="field col-12 md:col-5">
                            <span className="p-float-label">
                                <Calendar inputId="calendar" value={value5} onChange={(e) => setValue5(e.value as Date)}></Calendar>
                                <label htmlFor="calendar">Calendar</label>
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2 align-items-center justify-content-center">
                        <Button label="Search" icon="pi pi-search" loading={loading1} onClick={onLoadingClick1} />

                    </div>

                </AccordionTab>
            </Accordion>
        </div>
    )
}

export default index
