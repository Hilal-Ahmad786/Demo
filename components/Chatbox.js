import { useState } from 'react';
import DialogflowForm from './DialogflowForm';
import styles from './Chatbox.module.css';

const Chatbox = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatbox = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={styles.chatboxContainer}>
            <div className={styles.chatboxHeader} onClick={toggleChatbox}>
                {isOpen ? 'Close Chat' : 'Chat with Bursa Assistant'}
            </div>
            {isOpen && (
                <div className={styles.chatboxContent}>
                    <DialogflowForm />
                </div>
            )}
        </div>
    );
};

export default Chatbox;
