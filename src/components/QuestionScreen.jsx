import React, { useState } from 'react';
import './QuestionScreen.css';

const QuestionScreen = ({ question, onAnswer, onBack, currentStep, totalSteps }) => {
    const [textAnswer, setTextAnswer] = useState('');

    const handleOptionClick = (option) => {
        onAnswer(option);
        setTextAnswer(''); // Reset for next question if needed
    };

    const handleTextSubmit = (e) => {
        e.preventDefault();
        if (textAnswer.trim()) {
            onAnswer(textAnswer);
            setTextAnswer('');
        }
    };

    return (
        <div className="question-container fade-in" key={currentStep}>
            <h2 className="question-text">{question.text}</h2>

            <div className="options-container">
                {question.type === 'choice' && (
                    <div className="choices-grid">
                        {question.options.map((option, index) => (
                            <button
                                key={index}
                                className="option-btn"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                )}

                {question.type === 'text' && (
                    <form onSubmit={handleTextSubmit} className="text-input-form">
                        <textarea
                            className="text-input"
                            placeholder="Digite sua resposta aqui..."
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            autoFocus
                            rows={4}
                        />
                        <button
                            type="submit"
                            className="btn-primary next-btn"
                            disabled={!textAnswer.trim()}
                        >
                            Próximo
                        </button>
                    </form>
                )}
            </div>

            <button className="btn-back" onClick={onBack}>
                ← Voltar
            </button>
        </div>
    );
};

export default QuestionScreen;
