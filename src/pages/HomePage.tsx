import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PenSquare, Search, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  const handleCreateQuiz = () => {
    if (isAuthenticated) {
      navigate('/create-quiz');
    } else {
      navigate('/login');
    }
  };
  
  const handleExploreQuizzes = () => {
    navigate('/quizzes');
  };

  const features = [
    {
      icon: <PenSquare className="h-6 w-6 text-purple-500" />,
      title: "Create Custom Quizzes",
      description: "Easily create beautiful and engaging quizzes on any topic with our intuitive quiz builder."
    },
    {
      icon: <Search className="h-6 w-6 text-purple-500" />,
      title: "Explore Quiz Library",
      description: "Discover thousands of quizzes created by our community, covering every subject imaginable."
    },
    {
      icon: <Award className="h-6 w-6 text-purple-500" />,
      title: "Track Your Progress",
      description: "Monitor your performance and see detailed analytics on your quiz results."
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: "Share with Others",
      description: "Easily share your quizzes with friends, classmates, or students and track their results."
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-purple-50 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 text-center md:text-left">
              <motion.h1 
                className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Create, Share & Take <span className="text-purple-600">Interactive Quizzes</span>
              </motion.h1>
              <motion.p 
                className="mt-4 text-xl text-gray-600"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Make learning fun and engaging with custom quizzes for education, training, or just for fun.
              </motion.p>
              <motion.div 
                className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Button 
                  size="lg" 
                  onClick={handleCreateQuiz}
                >
                  <PenSquare className="h-5 w-5 mr-2" />
                  Create a Quiz
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleExploreQuizzes}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Explore Quizzes
                </Button>
              </motion.div>
            </div>
            <motion.div 
              className="md:w-1/2 mt-12 md:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img 
                src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Quiz Maker Illustration" 
                className="w-full h-auto rounded-xl shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Our Quiz Platform?</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our intuitive platform makes it easy to create, share and take quizzes on any topic.
            </p>
          </div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
              >
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to create your first quiz?</h2>
          <p className="mt-4 text-xl text-purple-100 max-w-3xl mx-auto">
            Join thousands of educators, trainers, and quiz enthusiasts today.
          </p>
          <div className="mt-8 flex justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={handleCreateQuiz}
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;