import React, { useState } from 'react';
import WelcomeScreen from './components/WelcomeScreen';
import QuestionScreen from './components/QuestionScreen';
import FinalScreen from './components/FinalScreen';
import ProgressBar from './components/ProgressBar';

const questions = [
  {
    id: 1,
    text: "Qual é o principal objetivo de vocês hoje com o marketing digital?",
    type: "choice",
    options: [
      "Aumentar o movimento",
      "Fortalecer dias ou horários específicos",
      "Fortalecer a marca",
      "Outro"
    ]
  },
  {
    id: 2,
    text: "Hoje vocês sentem que existem dias ou horários com menor movimento?",
    type: "text"
  },
  {
    id: 3,
    text: "Vocês trabalham mais com reserva antecipada ou com fluxo espontâneo?",
    type: "choice",
    options: [
      "Reserva antecipada",
      "Fluxo espontâneo",
      "Um pouco dos dois"
    ]
  },
  {
    id: 4,
    text: "Vocês já anunciaram no Instagram, Facebook ou Google?",
    type: "choice",
    options: [
      "Sim, atualmente",
      "Já anunciamos, mas não hoje",
      "Nunca anunciamos"
    ]
  },
  {
    id: 5,
    text: "Em média, quanto vocês já investiram por mês em tráfego pago?",
    type: "text"
  },
  {
    id: 6,
    text: "Hoje existe alguém interno ou alguma empresa dedicada às redes sociais?",
    type: "choice",
    options: [
      "Funcionário interno",
      "Agência",
      "Freelancer",
      "Não temos alguém fixo"
    ]
  },
  {
    id: 7,
    text: "Hoje vocês utilizam algum sistema para organizar contatos, reservas ou atendimentos (CRM)?",
    type: "choice",
    options: [
      "Sim",
      "Não",
      "Não sei dizer"
    ]
  },
  {
    id: 8,
    text: "Quando alguém chama no WhatsApp, quem normalmente faz o atendimento?",
    type: "choice",
    options: [
      "Gerente",
      "Equipe de atendimento",
      "Vários atendem",
      "Não temos um padrão"
    ]
  },
  {
    id: 9,
    text: "Quais dias da semana vocês gostariam de fortalecer mais?",
    type: "text"
  },
  {
    id: 10,
    text: "Se o marketing de vocês funcionasse perfeitamente, o que mudaria no dia a dia do bar?",
    type: "text"
  }
];

function App() {
  const [screen, setScreen] = useState('welcome'); // welcome, question, final
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleStart = () => {
    setScreen('question');
  };

  const handleAnswer = (answer) => {
    const updatedAnswers = {
      ...answers,
      [questions[currentQuestionIndex].id]: answer
    };
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Final answer, send to webhook
      const finalData = { ...updatedAnswers, [questions[currentQuestionIndex].id]: answer };
      console.log('Sending to webhook:', finalData);

      fetch('https://automacao2.themidiamarketing.com.br/webhook/form-briegfing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      })
        .then(response => {
          console.log('Webhook success:', response);
          setScreen('final');
        })
        .catch(error => {
          console.error('Webhook error:', error);
          // Even if it fails, show final screen or maybe an error? 
          // For now, let's show final screen to not block the user.
          setScreen('final');
        });
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      setScreen('welcome');
    }
  };

  return (
    <>
      {screen === 'question' && (
        <ProgressBar
          currentStep={currentQuestionIndex}
          totalSteps={questions.length}
        />
      )}

      {screen === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}

      {screen === 'question' && (
        <QuestionScreen
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          onBack={handleBack}
          currentStep={currentQuestionIndex}
          totalSteps={questions.length}
        />
      )}

      {screen === 'final' && (
        <FinalScreen />
      )}
    </>
  );
}

export default App;
