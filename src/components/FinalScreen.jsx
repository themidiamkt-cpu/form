import React from 'react';
import './FinalScreen.css';

const FinalScreen = ({ onRestart }) => {
    return (
        <div className="final-container fade-in">
            <div className="success-icon">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 6L9 17L4 12" stroke="#FF6A00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <h2 className="final-title">Obrigado!</h2>

            <p className="final-text">
                Com essas informações, nossa conversa vai ser muito mais produtiva.
            </p>

            <p className="final-text highlight-text">
                Nos vemos em breve 😊
            </p>

            <button className="btn-primary" onClick={() => window.location.reload()}>
                Enviar respostas
            </button>
        </div>
    );
};

export default FinalScreen;
