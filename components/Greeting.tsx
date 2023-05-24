interface GreetingProps {
    user: string;
}
const time: number = new Date().getHours();

function Greeting(props: GreetingProps): JSX.Element {
    if (time > 4 && time < 12) {
        let aux: string = 'Buenos Dias Profesor ' + props.user;
        return (<h5><i className="pi pi-sun"></i> {aux}</h5>);
    } else if (time >= 12 && time < 18) {
        let aux: string = 'Buenos Tardes Profesor ' + props.user;
        return (<h5><i className="pi pi-sun"></i> {aux}</h5>);
    } else {
        let aux: string = 'Buenas Noches Profesor ' + props.user;
        return (<h5><i className="pi pi-moon"></i> {aux}</h5>);
    }
}

export default Greeting;