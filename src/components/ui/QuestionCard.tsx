import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Card, CardContent } from './Card';
import { Question } from '../../types';

interface QuestionCardProps {
  question: Question;
  selectedAnswerIndex: number | null;
  showResults?: boolean;
  onSelectAnswer: (index: number) => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswerIndex,
  showResults = false,
  onSelectAnswer,
}) => {
  return (
    <div className="space-y-6">
      <div className="text-xl md:text-2xl font-medium text-gray-800">
        {question.text}
      </div>
      
      <div className="grid gap-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswerIndex === index;
          const isCorrect = showResults && question.correctOptionIndex === index;
          const isIncorrect = showResults && isSelected && !isCorrect;
          
          let statusClass = '';
          if (showResults) {
            if (isCorrect) {
              statusClass = 'border-green-500 bg-green-50';
            } else if (isIncorrect) {
              statusClass = 'border-red-500 bg-red-50';
            }
          } else if (isSelected) {
            statusClass = 'border-purple-500 bg-purple-50';
          }
          
          return (
            <motion.div
              key={index}
              whileHover={!showResults ? { scale: 1.02 } : {}}
              whileTap={!showResults ? { scale: 0.98 } : {}}
            >
              <Card
                className={`cursor-pointer border-2 ${
                  isSelected ? 'border-purple-500' : 'border-gray-200'
                } ${statusClass} transition-all duration-200`}
                onClick={() => !showResults && onSelectAnswer(index)}
              >
                <CardContent className="py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center mr-3 ${
                      isSelected ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-gray-800">{option}</span>
                  </div>
                  
                  {showResults && (
                    <div className="flex-shrink-0">
                      {isCorrect && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      {isIncorrect && (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};