import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Book, Award } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';
import { Badge } from './Badge';
import { Button } from './Button';
import { Quiz } from '../../types';

interface QuizCardProps {
  quiz: Quiz;
}

export const QuizCard: React.FC<QuizCardProps> = ({ quiz }) => {
  const navigate = useNavigate();
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const estimatedTime = Math.max(5, quiz.questions.length * 1.5);
  
  const handleTakeQuiz = () => {
    navigate(`/quiz/${quiz.id}`);
  };
  
  return (
    <Card hoverable className="h-full flex flex-col transition-all duration-300 hover:border-purple-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl text-gray-800">{quiz.title}</CardTitle>
          <Badge variant="primary" size="sm">{quiz.questions.length} questions</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <p className="text-gray-600 mb-4 line-clamp-3">{quiz.description}</p>
        
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>~{estimatedTime} min</span>
          
          <span className="mx-2">•</span>
          
          <Book className="h-4 w-4 mr-1" />
          <span>Created by {quiz.createdBy}</span>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          {formatDate(quiz.createdAt)}
        </div>
        
        <Button 
          onClick={handleTakeQuiz}
          size="sm"
        >
          <Award className="h-4 w-4 mr-1" />
          Take Quiz
        </Button>
      </CardFooter>
    </Card>
  );
};