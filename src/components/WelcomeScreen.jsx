import React from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = ({ onStart }) => {
    return (
        <div className="welcome-container fade-in">
            <div className="logo-placeholder">
                {/* Ideally an SVG or Image here if available, for now text */}
                <h1 className="brand-title">The Mídia <span className="highlight">Marketing</span></h1>
            </div>

            <div className="welcome-content">
                <p className="welcome-text">
                    Esse formulário é rápido e serve apenas para entendermos melhor o momento do seu negócio.
                </p>
                <p className="welcome-text">
                    Assim nossa conversa presencial fica mais objetiva e produtiva.
                </p>
            </div>

            <button className="btn-primary" onClick={onStart}>
                Começar
            </button>
        </div>
    );
};

export default WelcomeScreen;
