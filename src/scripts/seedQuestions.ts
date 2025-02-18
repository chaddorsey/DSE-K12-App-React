import { db } from '../config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { logger } from '../utils/logger';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator } from 'firebase/firestore';

// Connect to emulators
if (process.env.NODE_ENV === 'development') {
  const auth = getAuth();
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  logger.info('Connected to Firebase emulators');
}

const sampleQuestions = [
  {
    id: 'q1',
    type: 'MC',
    prompt: 'What grade level do you teach?',
    text: 'Select your grade level',
    label: 'Grade Level',
    category: 'DEMOGRAPHICS',
    number: 1,
    requiredForOnboarding: true,
    includeInOnboarding: true,
    options: ['K-2', '3-5', '6-8', '9-12', 'Higher Ed']
  },
  {
    id: 'q2',
    type: 'MC',
    prompt: 'How many years have you been teaching?',
    text: 'Select your experience level',
    label: 'Teaching Experience',
    category: 'DEMOGRAPHICS',
    number: 2,
    requiredForOnboarding: true,
    includeInOnboarding: true,
    options: ['0-2 years', '3-5 years', '6-10 years', '10+ years']
  },
  {
    id: 'q3',
    type: 'MC',
    prompt: 'What subject areas do you primarily teach?',
    text: 'Select your main subject area',
    label: 'Subject Area',
    category: 'DEMOGRAPHICS',
    number: 3,
    requiredForOnboarding: true,
    includeInOnboarding: true,
    options: ['Math', 'Science', 'English/Language Arts', 'Social Studies', 'Multiple Subjects']
  },
  {
    id: 'q4',
    type: 'MC',
    prompt: 'How comfortable are you with technology in the classroom?',
    text: 'Rate your technology comfort level',
    label: 'Tech Comfort',
    category: 'TECHNOLOGY',
    number: 4,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    options: ['Very Comfortable', 'Comfortable', 'Somewhat Comfortable', 'Not Comfortable']
  },
  {
    id: 'q5',
    type: 'MC',
    prompt: 'How often do you use data in your teaching practice?',
    text: 'Select frequency of data use',
    label: 'Data Usage',
    category: 'PRACTICE',
    number: 5,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    options: ['Daily', 'Weekly', 'Monthly', 'Rarely', 'Never']
  },
  {
    id: 'q6',
    type: 'MC',
    prompt: 'What is your primary goal for using educational data?',
    text: 'Select your main goal',
    label: 'Data Goals',
    category: 'GOALS',
    number: 6,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    options: ['Improve Instruction', 'Track Student Progress', 'School Requirements', 'Research', 'Other']
  },
  {
    id: 'q7',
    type: 'MC',
    prompt: 'How do you currently analyze student data?',
    text: 'Select your primary method',
    label: 'Analysis Method',
    category: 'PRACTICE',
    number: 7,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    options: ['Spreadsheets', 'School Software', 'Paper Records', 'Multiple Methods', 'Don\'t Currently Analyze']
  },
  {
    id: 'q8',
    type: 'MC',
    prompt: 'What challenges do you face with educational data?',
    text: 'Select your biggest challenge',
    label: 'Data Challenges',
    category: 'CHALLENGES',
    number: 8,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    options: ['Time Constraints', 'Technical Skills', 'Data Access', 'Understanding Data', 'Privacy Concerns']
  },
  {
    id: 'q9',
    type: 'MC',
    prompt: 'How interested are you in learning more about data analysis?',
    text: 'Rate your interest level',
    label: 'Learning Interest',
    category: 'GOALS',
    number: 9,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    options: ['Very Interested', 'Somewhat Interested', 'Neutral', 'Not Interested']
  },
  {
    id: 'q10',
    type: 'MC',
    prompt: 'What type of professional development would be most helpful?',
    text: 'Select preferred support',
    label: 'PD Preference',
    category: 'SUPPORT',
    number: 10,
    requiredForOnboarding: false,
    includeInOnboarding: true,
    options: ['Online Courses', 'In-Person Workshops', 'One-on-One Coaching', 'Written Resources', 'Video Tutorials']
  }
];

const seedQuestions = async () => {
  try {
    logger.info('Starting to seed questions...');
    const questionsRef = collection(db, 'questions');
    
    for (const question of sampleQuestions) {
      await setDoc(doc(questionsRef, question.id), question);
      logger.debug('Added question:', { id: question.id });
    }
    
    logger.info('Successfully seeded questions');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding questions:', error);
    process.exit(1);
  }
};

// Run the seed
seedQuestions(); 