import { Button } from 'primereact/button';
import React, { useState } from 'react';
import styles from './classLink.module.css';

const ClassLink: React.FC<{ link: string }> = ({ link }) => {
    const [isCopied, setIsCopied] = useState(false);

    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(link);
        setIsCopied(true);
    };

    return (
        <div className="flex align-items-center justify-content-center">
            <a href={link} className={styles.link} target="_blank" rel="noopener noreferrer">
                <h4 className={styles.underlineOnHover}>Click Aqui para ir a tu clase</h4>
            </a>

        </div>
    );
};

export default ClassLink;
