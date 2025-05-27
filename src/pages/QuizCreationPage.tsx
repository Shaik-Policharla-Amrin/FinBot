import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Trash2, Save, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useQuiz } from '../context/QuizContext';
import { Quiz, Question } from '../types';
import { useAuth } from '../context/AuthContext';

const QuizCreationPage: React.FC = () => {
  const navigate = useNavigate();
  const { createNewQuiz } = useQuiz();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState<Omit<Question, 'id'>[]>([
    {
      text: '',
      options: ['', '', '', ''],
      correctOptionIndex: 0
    }
  ]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        text: '',
        options: ['', '', '', ''],
        correctOptionIndex: 0
      }
    ]);
  };

  const handleRemoveQuestion = (index: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((_, i) => i !== index));
    }
  };

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { 
      ...updatedQuestions[index], 
      [field]: value 
    };
    setQuestions(updatedQuestions);
    
    // Clear error when user types
    if (errors[`question_${index}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`question_${index}`];
        return newErrors;
      });
    }
  };

  const handleOptionChange = (questionIndex: number, optionIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
    
    // Clear error when user types
    if (errors[`question_${questionIndex}_option_${optionIndex}`]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[`question_${questionIndex}_option_${optionIndex}`];
        return newErrors;
      });
    }
  };

  const handleCorrectAnswerChange = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOptionIndex = optionIndex;
    setQuestions(updatedQuestions);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Quiz title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Quiz description is required';
    }
    
    questions.forEach((question, qIndex) => {
      if (!question.text.trim()) {
        newErrors[`question_${qIndex}`] = 'Question text is required';
      }
      
      question.options.forEach((option, oIndex) => {
        if (!option.trim()) {
          newErrors[`question_${qIndex}_option_${oIndex}`] = `Option ${oIndex + 1} is required`;
        }
      });
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateQuiz = () => {
    if (!validateForm()) {
      return;
    }
    
    const questionsWithIds: Question[] = questions.map(q => ({
      ...q,
      id: Math.random().toString(36).substring(2, 15)
    }));
    
    const newQuiz: Omit<Quiz, 'id' | 'createdAt'> = {
      title,
      description,
      createdBy: user?.name || user?.email || 'Anonymous',
      questions: questionsWithIds
    };
    
    const createdQuiz = createNewQuiz(newQuiz);
    navigate(`/quiz/${createdQuiz.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create a New Quiz</h1>
        <p className="mt-2 text-gray-600">
          Fill in the details and add questions to create your quiz
        </p>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Input
              label="Quiz Title"
              placeholder="Enter a title for your quiz"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.title;
                    return newErrors;
                  });
                }
              }}
              error={errors.title}
              required
            />
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Description
              </label>
              <textarea
                rows={3}
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
                placeholder="Describe what your quiz is about"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) {
                    setErrors(prev => {
                      const newErrors = { ...prev };
                      delete newErrors.description;
                      return newErrors;
                    });
                  }
                }}
                required
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
        <Badge variant="primary" size="md">{questions.length} {questions.length === 1 ? 'Question' : 'Questions'}</Badge>
      </div>
      
      <AnimatePresence>
        {questions.map((question, questionIndex) => (
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <Card>
              <CardHeader className="flex flex-row items-start justify-between">
                <CardTitle className="text-lg">Question {questionIndex + 1}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveQuestion(questionIndex)}
                  disabled={questions.length <= 1}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Question Text
                  </label>
                  <textarea
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-500"
                    placeholder="Enter your question"
                    value={question.text}
                    onChange={(e) => handleQuestionChange(questionIndex, 'text', e.target.value)}
                    rows={2}
                  />
                  {errors[`question_${questionIndex}`] && (
                    <p className="mt-1 text-sm text-red-600">{errors[`question_${questionIndex}`]}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Answer Options
                  </label>
                  <div className="space-y-3">
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center">
                        <div className="flex-shrink-0 mr-3">
                          <input
                            type="radio"
                            checked={question.correctOptionIndex === optionIndex}
                            onChange={() => handleCorrectAnswerChange(questionIndex, optionIndex)}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                          />
                        </div>
                        <div className="flex-grow">
                          <Input
                            placeholder={`Option ${optionIndex + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                            error={errors[`question_${questionIndex}_option_${optionIndex}`]}
                            className="mb-0"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Select the radio button next to the correct answer.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
      
      <div className="mb-8">
        <Button
          variant="outline"
          onClick={handleAddQuestion}
          className="w-full"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Another Question
        </Button>
      </div>
      
      {Object.keys(errors).length > 0 && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg border border-red-100 flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium text-red-800">Please fix the following errors:</p>
            <ul className="mt-1 text-sm text-red-700 list-disc list-inside">
              {errors.title && <li>Quiz title is required</li>}
              {errors.description && <li>Quiz description is required</li>}
              {Object.keys(errors).some(key => key.startsWith('question_') && !key.includes('option')) && 
                <li>All questions must have text</li>
              }
              {Object.keys(errors).some(key => key.includes('option')) && 
                <li>All options must have text</li>
              }
            </ul>
          </div>
        </div>
      )}
      
      <div className="flex justify-end">
        <Button
          onClick={handleCreateQuiz}
          size="lg"
        >
          <Save className="h-5 w-5 mr-2" />
          Create Quiz
        </Button>
      </div>
    </div>
  );
};

export default QuizCreationPage;