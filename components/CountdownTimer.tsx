import { useEffect, useState } from 'react';

interface CountTimerProps {
    time: number;
}

const CountdownTimer = (props: CountTimerProps) => {
    const [countdown, setCountdown] = useState<number>(props.time);
    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const days = Math.floor(countdown / 86400);
    const hours = Math.floor((countdown % 86400) / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;

    return (
        <div className="flex align-items-center justify-content-center">
            {countdown > 0 ? (
                <h4>
                    Preparate! Tu clase será en
                    {days > 0 && ` ${days} día${days > 1 ? 's' : ''} : `}
                    {hours > 0 && ` ${hours} hora${hours > 1 ? 's' : ''} : `}
                    {minutes > 0 && ` ${minutes} minuto${minutes > 1 ? 's' : ''} : `}
                    {seconds} segundo{seconds !== 1 ? 's' : ''}
                </h4>
            ) : (
                <h4>¡Esperamos que tengas exito en tu clase!</h4>
            )}
        </div>
    );
};

export default CountdownTimer;
