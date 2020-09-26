import React, { useState } from 'react';
import { QuestionCard } from './components/QuestionCard';
import { fetchQuestions, Difficulty, Choice, Question } from './Api';
import {GlobalStyle, Wrapper} from './App.styles';
import firebase from './firebase';

export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}

const TOTAL_QUESTIONS = 10;

function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setuserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions)
  const startQuiz = async() => {
    setLoading(true);
    setGameOver(false);
    
    const newQuestions = await fetchQuestions(
      TOTAL_QUESTIONS,
      Difficulty.Easy,
      Choice.MC
    );

    setQuestions(newQuestions)
    setScore(0);
    setuserAnswers([])
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);

      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      setuserAnswers((prev) => [...prev, AnswerObject])
    }

  }

  const nextQuestion = () => {
    const nextQuestion = number + 1

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true)
    }
    else {
      setNumber(nextQuestion)
    }
  }
  const messaging = firebase.messaging();
  messaging.requestPermission().then(() => {
    return messaging.getToken()
  }).then((token) => {
    console.log('token:', token)
  })

  return (
    <>
    <GlobalStyle />
    <Wrapper>
      <h1>Start Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? 
      <button className="start" onClick={startQuiz}>Start Quiz</button> :null}
      {!gameOver ? <p className="score">Score:{score}</p> : null}
      {loading && <p>Loading Questions ...</p>}
      {!loading && !gameOver && (
      <QuestionCard
      questionNr = {number + 1}
      totalQuestions = {TOTAL_QUESTIONS}
      question = {questions[number].question}
      answers = {questions[number].answers}
      userAnswer = {userAnswers ? userAnswers[number] : undefined}
      callback = {checkAnswer}
      />
      )}
      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS -1 ? (
      <button className='next' onClick={nextQuestion}>Next Question</button>)
      : null}
    </Wrapper>
    </>
  );
}

export default App;
