import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { ProgressBar } from '../components/ui/ProgressBar';
import { QuestionCard } from '../components/ui/QuestionCard';
import { useQuiz } from '../context/QuizContext';

const QuizTakingPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { setCurrentQuiz, currentQuiz, startQuizAttempt, submitAnswer, currentAttempt, finishQuizAttempt } = useQuiz();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (id) {
      setCurrentQuiz(id);
      startQuizAttempt(id);
    }
  }, [id, setCurrentQuiz, startQuizAttempt]);

  useEffect(() => {
    if (currentQuiz) {
      setIsLastQuestion(currentQuestionIndex === currentQuiz.questions.length - 1);
    }
  }, [currentQuestionIndex, currentQuiz]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleSelectAnswer = (answerIndex: number) => {
    submitAnswer(currentQuestionIndex, answerIndex);
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      handleFinishQuiz();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishQuiz = () => {
    finishQuizAttempt();
    navigate(`/quiz/${id}/results`);
  };

  if (!currentQuiz || !currentAttempt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const selectedAnswerIndex = currentAttempt.answers[currentQuestionIndex] !== undefined
    ? currentAttempt.answers[currentQuestionIndex]
    : null;
  const progress = currentQuiz.questions.length > 0
    ? ((currentAttempt.answers.filter(a => a !== undefined).length) / currentQuiz.questions.length) * 100
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!quizStarted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="overflow-hidden">
            <div className="bg-purple-600 p-6 text-white">
              <h1 className="text-2xl font-bold">{currentQuiz.title}</h1>
              <p className="mt-2 text-purple-100">{currentQuiz.description}</p>
            </div>
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">About this quiz</h2>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <span className="inline-block w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                      {currentQuiz.questions.length}
                    </span>
                    <span>Questions</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="inline-block w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                      ~{Math.max(5, currentQuiz.questions.length * 1.5)}
                    </span>
                    <span>Minutes estimated time</span>
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="inline-block w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                      1
                    </span>
                    <span>Attempt allowed</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center">
                <Button size="lg" onClick={handleStartQuiz}>
                  Start Quiz
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <div className="text-sm font-medium text-gray-700">
                Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
              </div>
              <div className="text-sm font-medium text-purple-600">
                {Math.round(progress)}% Complete
              </div>
            </div>
            <ProgressBar
              value={currentAttempt.answers.filter(a => a !== undefined).length}
              max={currentQuiz.questions.length}
              color="primary"
            />
          </div>

          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="mb-8">
              <CardContent className="p-6">
                <QuestionCard
                  question={currentQuestion}
                  selectedAnswerIndex={selectedAnswerIndex}
                  onSelectAnswer={handleSelectAnswer}
                />
              </CardContent>
            </Card>
          </motion.div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNextQuestion}
              disabled={selectedAnswerIndex === null}
            >
              {isLastQuestion ? (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Finish Quiz
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizTakingPage;