import { Quiz } from '../types';

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Mock quizzes data
export const mockQuizzes: Quiz[] = [
  {
    id: generateId(),
    title: "Web Development Basics",
    description: "Test your knowledge of HTML, CSS, and JavaScript fundamentals.",
    createdBy: "user1",
    createdAt: new Date(2023, 6, 15),
    questions: [
      {
        id: generateId(),
        text: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Technology Modern Language",
          "Hyper Transfer Markup Language",
          "Hyperlink Text Management Language"
        ],
        correctOptionIndex: 0
      },
      {
        id: generateId(),
        text: "Which of the following is used for styling web pages?",
        options: ["HTML", "CSS", "JavaScript", "PHP"],
        correctOptionIndex: 1
      },
      {
        id: generateId(),
        text: "Which of the following is NOT a JavaScript framework?",
        options: ["React", "Angular", "Vue", "Laravel"],
        correctOptionIndex: 3
      }
    ]
  },
  {
    id: generateId(),
    title: "Science Quiz: Astronomy",
    description: "Explore the wonders of our solar system and beyond.",
    createdBy: "user2",
    createdAt: new Date(2023, 5, 20),
    questions: [
      {
        id: generateId(),
        text: "Which is the closest planet to the Sun?",
        options: ["Venus", "Mercury", "Earth", "Mars"],
        correctOptionIndex: 1
      },
      {
        id: generateId(),
        text: "What is the name of our galaxy?",
        options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"],
        correctOptionIndex: 1
      },
      {
        id: generateId(),
        text: "What is a light-year?",
        options: [
          "The time it takes for light to travel from the Sun to Earth",
          "The distance light travels in one year",
          "The time it takes for Earth to orbit the Sun",
          "The brightness of a star"
        ],
        correctOptionIndex: 1
      }
    ]
  },
  {
    id: generateId(),
    title: "History: Ancient Civilizations",
    description: "Test your knowledge about ancient cultures and empires.",
    createdBy: "user3",
    createdAt: new Date(2023, 4, 10),
    questions: [
      {
        id: generateId(),
        text: "Which ancient civilization built the pyramids of Giza?",
        options: ["Romans", "Greeks", "Egyptians", "Mayans"],
        correctOptionIndex: 2
      },
      {
        id: generateId(),
        text: "Who was the first Emperor of Rome?",
        options: ["Julius Caesar", "Augustus", "Nero", "Constantine"],
        correctOptionIndex: 1
      },
      {
        id: generateId(),
        text: "Which of these was NOT an ancient Mesopotamian civilization?",
        options: ["Sumerians", "Akkadians", "Athenians", "Babylonians"],
        correctOptionIndex: 2
      }
    ]
  },
  {
    id: generateId(),
    title: "Mathematics Challenge",
    description: "Put your math skills to the test with these problems.",
    createdBy: "user1",
    createdAt: new Date(2023, 3, 5),
    questions: [
      {
        id: generateId(),
        text: "What is the value of π (pi) to two decimal places?",
        options: ["3.41", "3.14", "3.12", "3.18"],
        correctOptionIndex: 1
      },
      {
        id: generateId(),
        text: "What is the Pythagorean theorem?",
        options: [
          "a² + b² = c²",
          "E = mc²",
          "a² - b² = c²",
          "F = ma"
        ],
        correctOptionIndex: 0
      },
      {
        id: generateId(),
        text: "What is the next number in the sequence: 1, 1, 2, 3, 5, 8, ...?",
        options: ["11", "13", "14", "15"],
        correctOptionIndex: 0
      }
    ]
  }
];

// Get a quiz by ID
export const getQuizById = (id: string): Quiz | undefined => {
  return mockQuizzes.find(quiz => quiz.id === id);
};

// Create a new quiz
export const createQuiz = (quiz: Omit<Quiz, 'id' | 'createdAt'>): Quiz => {
  const newQuiz: Quiz = {
    ...quiz,
    id: generateId(),
    createdAt: new Date()
  };
  mockQuizzes.push(newQuiz);
  return newQuiz;
};