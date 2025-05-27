import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Quiz, Question, QuizAttempt } from '../types';
import { mockQuizzes, getQuizById } from '../lib/mockData';

interface QuizContextType {
  quizzes: Quiz[];
  currentQuiz: Quiz | null;
  currentAttempt: QuizAttempt | null;
  setCurrentQuiz: (quizId: string) => void;
  createNewQuiz: (quiz: Omit<Quiz, 'id' | 'createdAt'>) => void;
  startQuizAttempt: (quizId: string) => void;
  submitAnswer: (questionIndex: number, answerIndex: number) => void;
  finishQuizAttempt: () => QuizAttempt;
  searchQuizzes: (query: string) => Quiz[];
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};

interface QuizProviderProps {
  children: ReactNode;
}

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);

  // Set the current quiz by ID
  const loadQuiz = (quizId: string) => {
    const quiz = getQuizById(quizId);
    setCurrentQuiz(quiz || null);
  };

  // Create a new quiz
  const createNewQuiz = (quiz: Omit<Quiz, 'id' | 'createdAt'>) => {
    const newQuiz: Quiz = {
      ...quiz,
      id: Math.random().toString(36).substring(2, 15),
      createdAt: new Date(),
    };
    setQuizzes([...quizzes, newQuiz]);
    return newQuiz;
  };

  // Start a new quiz attempt
  const startQuizAttempt = (quizId: string) => {
    loadQuiz(quizId);
    setCurrentAttempt({
      quizId,
      answers: [],
      score: 0,
      completedAt: new Date(),
    });
  };

  // Submit an answer for the current attempt
  const submitAnswer = (questionIndex: number, answerIndex: number) => {
    if (!currentAttempt) return;
    
    const newAnswers = [...currentAttempt.answers];
    newAnswers[questionIndex] = answerIndex;
    
    setCurrentAttempt({
      ...currentAttempt,
      answers: newAnswers,
    });
  };

  // Calculate score and finish the quiz attempt
  const finishQuizAttempt = () => {
    if (!currentQuiz || !currentAttempt) {
      throw new Error('No active quiz attempt');
    }
    
    let score = 0;
    currentAttempt.answers.forEach((answer, index) => {
      if (currentQuiz.questions[index].correctOptionIndex === answer) {
        score++;
      }
    });
    
    const finalAttempt = {
      ...currentAttempt,
      score,
      completedAt: new Date(),
    };
    
    setCurrentAttempt(finalAttempt);
    return finalAttempt;
  };

  // Search quizzes by title or description
  const searchQuizzes = (query: string) => {
    if (!query) return quizzes;
    
    const lowerCaseQuery = query.toLowerCase();
    return quizzes.filter(
      quiz => 
        quiz.title.toLowerCase().includes(lowerCaseQuery) || 
        quiz.description.toLowerCase().includes(lowerCaseQuery)
    );
  };

  const value = {
    quizzes,
    currentQuiz,
    currentAttempt,
    setCurrentQuiz: loadQuiz,
    createNewQuiz,
    startQuizAttempt,
    submitAnswer,
    finishQuizAttempt,
    searchQuizzes,
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};