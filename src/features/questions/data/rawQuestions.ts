import { QuestionType } from '../types/questions';

export const rawQuestions = [
  // Multiple Choice Questions
  {
    id: 'mc_1',
    type: QuestionType.MC,
    prompt: 'Are you more of a cat person or a dog person?',
    category: 'GENERAL',
    required: true,
    options: ['Cat person', 'Dog person']
  },
  {
    id: 'mc_2',
    type: QuestionType.MC,
    prompt: 'Star Wars or Star Trek?',
    category: 'GENERAL',
    required: true,
    options: ['Star Wars', 'Star Trek']
  },
  {
    id: 'mc_3',
    type: QuestionType.MC,
    prompt: 'What color are your eyes?',
    category: 'GENERAL',
    options: ['Blue', 'Brown', 'Gray', 'Green', 'Hazel']
  },
  {
    id: 'mc_4',
    type: QuestionType.MC,
    prompt: 'How many novels have you read in the last year?',
    category: 'LIFESTYLE',
    options: ['0-2', '3-5', '6-10', 'More than 10']
  },
  {
    id: 'mc_5',
    type: QuestionType.MC,
    prompt: 'Which of the following would you say is your primary occupation?',
    category: 'PROFESSIONAL',
    required: true,
    options: [
      'Researcher',
      'Educator',
      'Software Developer',
      'Professional Development Leader',
      'Education Administrator',
      'Entrepreneur/Consultant',
      'Student'
    ]
  },
  {
    id: 'mc_6',
    type: QuestionType.MC,
    prompt: 'How would you primarily characterize your personality tendency?',
    category: 'PERSONALITY',
    options: ['Introvert', 'Extrovert', 'Ambivert']
  },
  {
    id: 'mc_7',
    type: QuestionType.MC,
    prompt: 'What would people be most likely to find you teaching?',
    category: 'TEACHING',
    options: ['Mathematics', 'Pre-service teaching', 'Statistics', 'Science', 'Other/None']
  },
  {
    id: 'mc_8',
    type: QuestionType.MC,
    prompt: 'What did you use to complete your first major class paper?',
    category: 'EDUCATION_HISTORY',
    options: [
      'Pencil and paper',
      'Manual typewriter',
      'Electric typewriter',
      'Dot matrix printer',
      'Laser printer',
      'Digital submission'
    ]
  },
  {
    id: 'mc_9',
    type: QuestionType.MC,
    prompt: 'Which pizza topping do you prefer?',
    category: 'PREFERENCES',
    options: ['Cheese', 'Pepperoni', 'Sausage', 'Veggie']
  },
  {
    id: 'mc_10',
    type: QuestionType.MC,
    prompt: 'What was the magnitude of the largest earthquake you\'ve experienced?',
    category: 'EXPERIENCES',
    options: ['0-2', '2-4', '4-5', '5-6', '6-7']
  },
  {
    id: 'mc_11',
    type: QuestionType.MC,
    prompt: 'In a waiting room, what magazine are you most likely to pick up and read?',
    category: 'PREFERENCES',
    options: ['Better Homes and Gardens', 'Game Informer', 'People', 'National Geographic', 'The Economist']
  },
  {
    id: 'mc_12',
    type: QuestionType.MC,
    prompt: 'When is your birthday?',
    category: 'PERSONAL',
    options: ['January/February', 'March/April', 'May/June', 'July/August', 'September/October', 'November/December']
  },
  {
    id: 'mc_13',
    type: QuestionType.MC,
    prompt: 'What was the first email client you ever used?',
    category: 'TECH_HISTORY',
    options: ['Elm/Pine', 'Eudora', 'Outlook', 'Hotmail', 'Yahoo', 'Gmail']
  },
  {
    id: 'mc_14',
    type: QuestionType.MC,
    prompt: 'How many movies did you see in the theater last year?',
    category: 'ENTERTAINMENT',
    options: ['0-2', '3-4', '5-10', '10-20', '20+']
  },
  {
    id: 'mc_15',
    type: QuestionType.MC,
    prompt: 'Where did you grow up?',
    category: 'BACKGROUND',
    required: true,
    options: ['Northeast', 'Midwest', 'South', 'West', 'Outside the US']
  },
  {
    id: 'mc_16',
    type: QuestionType.MC,
    prompt: 'Where do you live currently?',
    category: 'BACKGROUND',
    required: true,
    options: ['Northeast', 'Midwest', 'South', 'West', 'Outside the US']
  },
  {
    id: 'mc_17',
    type: QuestionType.MC,
    prompt: 'Which beverage would you prefer to drink in the morning?',
    category: 'PREFERENCES',
    options: ['Good coffee', 'Any old coffee', 'Tea', 'Juice', 'Soda', 'Milk', 'Water']
  },
  {
    id: 'mc_18',
    type: QuestionType.MC,
    prompt: 'How many siblings do you have?',
    category: 'BACKGROUND',
    options: ['0', '1', '2', '3', '4 or more']
  },
  {
    id: 'mc_19',
    type: QuestionType.MC,
    prompt: 'Which best describes your current living scenario?',
    category: 'LIFESTYLE',
    options: [
      'Apartment with self/family',
      'House with self/family',
      'Shared living – apartment',
      'Shared living – house'
    ]
  },
  {
    id: 'mc_20',
    type: QuestionType.MC,
    prompt: 'How would you classify the community you live in?',
    category: 'LIFESTYLE',
    options: ['Central city', 'Inner suburbs', 'Outer suburbs', 'Between suburbs and rural', 'Rural']
  },
  {
    id: 'mc_21',
    type: QuestionType.MC,
    prompt: 'Which kind of fiction books do you like best?',
    category: 'PREFERENCES',
    options: ['Fantasy', 'Science Fiction', 'Romance', 'Mystery', 'Historical drama']
  },
  {
    id: 'mc_22',
    type: QuestionType.MC,
    prompt: 'What is your favorite meal?',
    category: 'PREFERENCES',
    options: ['Breakfast', 'Lunch', 'Dinner', 'Snack']
  },
  {
    id: 'mc_23',
    type: QuestionType.MC,
    prompt: 'Would you rather...',
    category: 'PREFERENCES',
    options: ['Speak 10 languages', 'Play 10 instruments', 'Master 10 sports']
  },

  // Numeric Questions
  {
    id: 'nm_1',
    type: QuestionType.NM,
    prompt: 'How many televisions are in your house?',
    category: 'GENERAL',
    min: 0,
    max: 10,
    step: 1
  },
  {
    id: 'nm_2',
    type: QuestionType.NM,
    prompt: 'How many pets do you have?',
    category: 'LIFESTYLE',
    min: 0,
    max: 20,
    step: 1
  },
  {
    id: 'nm_3',
    type: QuestionType.NM,
    prompt: 'How many miles is your daily commute?',
    category: 'LIFESTYLE',
    min: 0,
    max: 200,
    step: 1
  },
  {
    id: 'nm_4',
    type: QuestionType.NM,
    prompt: 'How many hours is your daily commute?',
    category: 'LIFESTYLE',
    min: 0,
    max: 10,
    step: 0.5
  },
  {
    id: 'nm_5',
    type: QuestionType.NM,
    prompt: 'During what hour do you go to bed during the week? (24-hour format)',
    category: 'LIFESTYLE',
    min: 0,
    max: 24,
    step: 1
  },
  {
    id: 'nm_6',
    type: QuestionType.NM,
    prompt: 'How many grandchildren do you have?',
    category: 'PERSONAL',
    min: 0,
    max: 50,
    step: 1
  },
  {
    id: 'nm_7',
    type: QuestionType.NM,
    prompt: 'How many operas have you seen?',
    category: 'ENTERTAINMENT',
    min: 0,
    max: 100,
    step: 1
  },
  {
    id: 'nm_8',
    type: QuestionType.NM,
    prompt: 'How many miles per gallon does your car get?',
    category: 'LIFESTYLE',
    min: 0,
    max: 150,
    step: 1
  },
  {
    id: 'nm_9',
    type: QuestionType.NM,
    prompt: 'How many email messages did you get yesterday?',
    category: 'TECH',
    min: 0,
    max: 1000,
    step: 1
  },

  // Open Response Questions
  {
    id: 'op_1',
    type: QuestionType.OP,
    prompt: 'What\'s your favorite flavor of ice cream?',
    category: 'GENERAL',
    maxLength: 100
  },
  {
    id: 'op_2',
    type: QuestionType.OP,
    prompt: 'What\'s your favorite hobby?',
    category: 'LIFESTYLE',
    maxLength: 100
  },
  {
    id: 'op_3',
    type: QuestionType.OP,
    prompt: 'What\'s your mother\'s first name?',
    category: 'PERSONAL',
    maxLength: 50
  },
  {
    id: 'op_4',
    type: QuestionType.OP,
    prompt: 'What\'s your favorite kind of vacation?',
    category: 'PREFERENCES',
    maxLength: 200
  },
  {
    id: 'op_5',
    type: QuestionType.OP,
    prompt: 'What\'s your favorite city in the world?',
    category: 'PREFERENCES',
    maxLength: 100
  },
  {
    id: 'op_6',
    type: QuestionType.OP,
    prompt: 'Aside from data science, what subject do you wish was taught in every school?',
    category: 'EDUCATION',
    required: true,
    maxLength: 200
  },
  {
    id: 'op_7',
    type: QuestionType.OP,
    prompt: 'What company would you like to be sponsored by?',
    category: 'PREFERENCES',
    maxLength: 100
  },
  {
    id: 'op_8',
    type: QuestionType.OP,
    prompt: 'Complete this sentence: "Nobody here knows that I…"',
    category: 'PERSONAL',
    maxLength: 300
  },

  // Slider Questions
  {
    id: 'sl_1',
    type: QuestionType.SLIDER,
    prompt: 'How comfortable are you with technology?',
    category: 'GENERAL',
    leftLabel: 'Not at all comfortable',
    rightLabel: 'Very comfortable'
  },
  {
    id: 'sl_2',
    type: QuestionType.SLIDER,
    prompt: 'How much do you enjoy teaching?',
    category: 'GENERAL',
    leftLabel: 'Not at all',
    rightLabel: 'Love it'
  },

  // XY Questions
  {
    id: 'xy_1',
    type: QuestionType.XY,
    prompt: 'How would you characterize your teaching style?',
    category: 'GENERAL',
    xAxis: {
      label: 'Structure',
      min: 'Flexible',
      max: 'Structured'
    },
    yAxis: {
      label: 'Interaction',
      min: 'Teacher-led',
      max: 'Student-led'
    }
  }
];

// Create the question pool
import { createQuestionPool } from '../utils/questionPoolGenerator';
export const questionPool = createQuestionPool(rawQuestions); 