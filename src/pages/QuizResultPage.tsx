import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Award, ArrowRight, Home, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { QuestionCard } from '../components/ui/QuestionCard';
import { ProgressBar } from '../components/ui/ProgressBar';
import { useQuiz } from '../context/QuizContext';

const QuizResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentQuiz, currentAttempt, setCurrentQuiz } = useQuiz();
  
  useEffect(() => {
    if (id && (!currentQuiz || currentQuiz.id !== id)) {
      setCurrentQuiz(id);
    }
    
    if (!currentAttempt) {
      navigate(`/quiz/${id}`);
    }
  }, [id, currentQuiz, currentAttempt, setCurrentQuiz, navigate]);
  
  if (!currentQuiz || !currentAttempt) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  const score = currentAttempt.score;
  const totalQuestions = currentQuiz.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  
  const getFeedbackMessage = () => {
    if (percentage >= 90) return "Excellent! You've mastered this quiz!";
    if (percentage >= 75) return "Great job! You're doing very well!";
    if (percentage >= 60) return "Good work! You've passed with a solid score.";
    if (percentage >= 40) return "Not bad, but there's room for improvement.";
    return "You might want to study more and try again.";
  };
  
  const getScoreColor = () => {
    if (percentage >= 75) return "success";
    if (percentage >= 60) return "primary";
    if (percentage >= 40) return "warning";
    return "danger";
  };
  
  const handleTryAgain = () => {
    navigate(`/quiz/${id}`);
  };
  
  const handleExploreMore = () => {
    navigate('/quizzes');
  };
  
  const handleGoHome = () => {
    navigate('/');
  };
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-8 text-white text-center">
            <div className="flex justify-center mb-4">
              <Award className="h-16 w-16 text-yellow-300" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Quiz Results</h1>
            <p className="text-purple-100">{currentQuiz.title}</p>
          </div>
          
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-gray-800 mb-2">
                {score} / {totalQuestions}
              </div>
              <p className="text-lg text-gray-600 mb-4">
                {getFeedbackMessage()}
              </p>
              
              <div className="max-w-md mx-auto">
                <ProgressBar
                  value={score}
                  max={totalQuestions}
                  showLabel
                  size="lg"
                  color={getScoreColor() as any}
                />
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                onClick={handleTryAgain}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                variant="primary"
                onClick={handleExploreMore}
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Explore More Quizzes
              </Button>
              
              <Button
                variant="ghost"
                onClick={handleGoHome}
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Review Your Answers</h2>
        
        <div className="space-y-8">
          {currentQuiz.questions.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">Question {index + 1}</h3>
                {question.correctOptionIndex === currentAttempt.answers[index] ? (
                  <span className="text-green-600 font-medium flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    Correct
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">Incorrect</span>
                )}
              </div>
              
              <Card>
                <CardContent className="p-6">
                  <QuestionCard
                    question={question}
                    selectedAnswerIndex={currentAttempt.answers[index]}
                    showResults
                    onSelectAnswer={() => {}}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizResultPage;