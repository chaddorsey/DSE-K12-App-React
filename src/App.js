import React, { useState, useMemo, useEffect } from 'react';
import './App.css';

/* -------------------------------
   Fallback Component
------------------------------- */
function FallbackComponent() {
  return null;
}

/* -------------------------------
   Head-to-Head Setup Component
------------------------------- */
function HeadToHeadSetup({ triggeringUser, opponent, onStart }) {
  const headToHeadURL = window.location.origin + "/headtohead?opponent=" + triggeringUser.id;
  return (
    <div className="head-to-head-setup">
      <h2>Head-to-Head Match Setup</h2>
      <p>Your ID: {triggeringUser.id}</p>
      <p>Send this URL to your opponent ({opponent.name}, ID: {opponent.id}):</p>
      <p className="head-to-head-url">{headToHeadURL}</p>
      <button onClick={onStart}>Start!</button>
    </div>
  );
}

/* -------------------------------
   Onboarding Question Components
------------------------------- */
function OnboardingOpenResponse({ question, onAnswer }) {
  const [response, setResponse] = useState("");
  const handleSubmit = () => onAnswer(response);
  return (
    <div className="quiz-question">
      <h3>{question}</h3>
      <input
        type="text"
        maxLength={100}
        value={response}
        onChange={(e) => setResponse(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

function OnboardingMultipleChoice({ question, options, onAnswer }) {
  const [selected, setSelected] = useState(null);
  const sortedOptions = options.slice().sort((a, b) => a.localeCompare(b));
  const handleClick = (opt) => {
    setSelected(opt);
    onAnswer(opt);
  };
  return (
    <div className="quiz-question">
      <h3>{question}</h3>
      <div className="quiz-options">
        {sortedOptions.map((opt, idx) => (
          <div key={idx} className="quiz-option" onClick={() => handleClick(opt)}>
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}

function OnboardingNumerical({ question, min, max, onAnswer }) {
  const [value, setValue] = useState((min + max) / 2);
  const handleChange = (e) => setValue(e.target.value);
  const handleSubmit = () => onAnswer(Number(value));
  return (
    <div className="quiz-question">
      <h3>{question}</h3>
      <input type="number" value={value} min={min} max={max} onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

/* Mapping from question type to onboarding component */
const OnboardingQuestionComponents = {
  OP: OnboardingOpenResponse,
  MC: OnboardingMultipleChoice,
  NM: OnboardingNumerical,
};

/* -------------------------------
   Dummy Data for Questions and Responses
------------------------------- */
const EXTENDED_QUESTIONS = [
  { number: 1, question: "Are you more of a cat person or a dog person?", type: "MC", label: "cat_dog", options: ["Cat person", "Dog person"] },
  { number: 2, question: "Star Wars or Star Trek?", type: "MC", label: "StarWars_StarTrek", options: ["Star Wars", "Star Trek"] },
  { number: 3, question: "What color are your eyes?", type: "MC", label: "eye_color", options: ["Blue", "Brown", "Gray", "Green", "Hazel"] },
  { number: 4, question: "How many novels have you read in the last year?", type: "MC", label: "novels_read", options: ["0-2", "3-5", "6-10", "More than 10"] },
  { number: 5, question: "Which mathematics conference would you most likely be found at?", type: "MC", label: "math_conference", options: ["NCTM", "ICOTS", "SRTL", "ASA"] },
];

const SAMPLE_EXTENDED_RESPONSES = {
  1: {
    cat_dog: "Cat person",
    StarWars_StarTrek: "Star Wars",
    eye_color: "Blue",
    novels_read: "3-5",
  },
  2: {
    cat_dog: "Dog person",
    StarWars_StarTrek: "Star Trek",
    eye_color: "Brown",
    novels_read: "0-2",
  },
  3: {
    cat_dog: "Cat person",
    StarWars_StarTrek: "Star Wars",
    eye_color: "Green",
    novels_read: "6-10",
  },
  4: {
    cat_dog: "Dog person",
    StarWars_StarTrek: "Star Trek",
    eye_color: "Hazel",
    novels_read: "More than 10",
  },
  5: {
    cat_dog: "Cat person",
    StarWars_StarTrek: "Star Wars",
    eye_color: "Gray",
    novels_read: "3-5",
  },
};

const SAMPLE_PEOPLE_DATA = SAMPLE_PEOPLE_DATA_FIX();
function SAMPLE_PEOPLE_DATA_FIX() {
  const base = [
    { 
      id: 1, 
      name: "Alice", 
      image: null, 
      preference: "Cats", 
      continuumValue: 15, 
      multipleChoiceResponse: "Cat person",
      numericalResponse: { value: 7, min: 0, max: 10 },
      openResponse: "I love jazz",
    },
    { 
      id: 2, 
      name: "Bob", 
      image: "https://via.placeholder.com/100?text=Bob", 
      preference: "Dogs", 
      continuumValue: 85, 
      multipleChoiceResponse: "Dog person",
      numericalResponse: { value: 3, min: 0, max: 10 },
      openResponse: "I run marathons",
    },
    { 
      id: 3, 
      name: "Charlie", 
      image: null, 
      preference: "Cats", 
      continuumValue: 40, 
      multipleChoiceResponse: "Cat person",
      numericalResponse: { value: 5, min: 0, max: 10 },
      openResponse: "I collect stamps",
    },
    { 
      id: 4, 
      name: "Dana", 
      image: "https://via.placeholder.com/100?text=Dana", 
      preference: "Dogs", 
      continuumValue: 75, 
      multipleChoiceResponse: "Dog person",
      numericalResponse: { value: 9, min: 0, max: 10 },
      openResponse: "I am a foodie",
    },
    { 
      id: 5, 
      name: "Eve", 
      image: null, 
      preference: "Cats", 
      continuumValue: 55, 
      multipleChoiceResponse: "Cat person",
      numericalResponse: { value: 6, min: 0, max: 10 },
      openResponse: "I write poetry",
    },
  ];
  return base.map(person => ({
    ...person,
    onboardingAnswers: Object.entries(SAMPLE_EXTENDED_RESPONSES[person.id] || {})
      .map(([label, answer]) => {
        const q = EXTENDED_QUESTIONS.find(q => q.label === label);
        return q ? { questionId: q.number, question: q.question, answer } : null;
      })
      .filter(a => a !== null),
  }));
}

/* -------------------------------
   OnboardingRandom Component
   Presents 7 random onboarding questions.
------------------------------- */
function OnboardingRandom({ onComplete }) {
  const [questions] = useState(() => {
    let copy = [...EXTENDED_QUESTIONS];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, 7);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const currentQuestion = questions[currentIndex];
  const ContentComponent = OnboardingQuestionComponents[currentQuestion.type] || FallbackComponent;
  const handleAnswer = (answer) => {
    const newAnswers = answers.concat({
      questionId: currentQuestion.number,
      question: currentQuestion.question,
      answer,
    });
    setAnswers(newAnswers);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete(newAnswers);
    }
  };
  return (
    <div className="onboarding-container">
      <h2>Onboarding</h2>
      <div className="question-prompt">{currentQuestion.question}</div>
      <ContentComponent
        question={currentQuestion.question}
        options={currentQuestion.options}
        min={0}
        max={100}
        onAnswer={handleAnswer}
      />
    </div>
  );
}

/* -------------------------------
   MoreOnboarding Component
   Presents additional onboarding questions in batches of 5.
------------------------------- */
function MoreOnboarding({ answeredIds, onComplete, onReturn }) {
  const remaining = EXTENDED_QUESTIONS.filter(q => !answeredIds.has(q.number));
  const batchSize = 5;
  const [batch, setBatch] = useState(() => {
    const shuffled = [...remaining].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, batchSize);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [counter, setCounter] = useState(1);
  const [batchComplete, setBatchComplete] = useState(false);
  const noRemaining = remaining.length === 0;
  
  return (
    <div className="onboarding-container">
      <h2>Answer More Questions</h2>
      {noRemaining ? (
        <>
          <div>No more questions remaining.</div>
          <button onClick={onReturn}>Return to People</button>
        </>
      ) : (
        <>
          {!batchComplete ? (
            <>
              <div className="question-prompt">{batch[currentIndex].question}</div>
              <div className="question-count">New question {counter} of {batchSize}</div>
              {(() => {
                const ContentComponent = OnboardingQuestionComponents[batch[currentIndex].type] || FallbackComponent;
                return (
                  <ContentComponent
                    question={batch[currentIndex].question}
                    options={batch[currentIndex].options}
                    min={0}
                    max={100}
                    onAnswer={(answer) => {
                      onComplete([
                        {
                          questionId: batch[currentIndex].number,
                          question: batch[currentIndex].question,
                          answer,
                        },
                      ]);
                      if (currentIndex < batch.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                        setCounter(counter + 1);
                      } else {
                        setBatchComplete(true);
                      }
                    }}
                  />
                );
              })()}
            </>
          ) : (
            <div className="batch-summary">
              <div>You have answered {batchSize} questions in this batch.</div>
              {remaining.filter(q => !answeredIds.has(q.number)).length >= batchSize ? (
                <button onClick={() => {
                  const newRemaining = EXTENDED_QUESTIONS.filter(q => !answeredIds.has(q.number));
                  const shuffled = [...newRemaining].sort(() => Math.random() - 0.5);
                  setBatch(shuffled.slice(0, batchSize));
                  setCurrentIndex(0);
                  setCounter(1);
                  setBatchComplete(false);
                }}>Answer more</button>
              ) : (
                <div>No more questions remaining.</div>
              )}
              <button onClick={onReturn}>Return to People</button>
            </div>
          )}
          <div className="more-nav">
            {!batchComplete && <button onClick={onReturn}>Return to People</button>}
          </div>
        </>
      )}
    </div>
  );
}

/* -------------------------------
   QuizQuestionFromOnboarding Component
   Presents a quiz question with fixed response options.
------------------------------- */
function QuizQuestionFromOnboarding({ questionData, allResponses, onAnswer }) {
  const correctAnswer = questionData.answer;
  const isNumeric = !isNaN(Number(correctAnswer));
  const computedOptions = useMemo(() => {
    const others = allResponses
      .filter(resp => resp.questionId === questionData.questionId && resp.answer !== correctAnswer)
      .map(resp => resp.answer);
    const unique = Array.from(new Set(others));
    if (isNumeric) {
      let allNums = [Number(correctAnswer), ...unique.map(val => Number(val))];
      allNums = Array.from(new Set(allNums)).sort((a, b) => a - b);
      return allNums.map(String);
    } else {
      let allText = [correctAnswer, ...unique];
      return allText.sort((a, b) => a.localeCompare(b));
    }
  }, [allResponses, questionData, correctAnswer, isNumeric]);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const handleClick = (opt) => {
    if (!submitted) {
      setSubmitted(true);
      setSelected(opt);
      const answerCorrect = isNumeric ? (Number(opt) === Number(correctAnswer)) : (opt === correctAnswer);
      onAnswer(answerCorrect, opt, correctAnswer);
    }
  };
  return (
    <div className="quiz-question" key={questionData.questionId}>
      <h3>What did this person answer to: "{questionData.question}"?</h3>
      <div className="quiz-options">
        {computedOptions.map((opt, idx) => (
          <div
            key={idx}
            className={`quiz-option ${submitted ? (isNumeric ? (Number(opt) === Number(correctAnswer) ? "highlight" : (opt === selected ? "selected" : "")) : (opt === correctAnswer ? "highlight" : (opt === selected ? "selected" : ""))) : ""}`}
            onClick={() => handleClick(opt)}
          >
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------
   QuizSession Component
   Presents batches of 5 quiz questions, tracks overall progress,
   and excludes questions answered correctly previously.
   Now logs overall quiz stats only when the session ends.
------------------------------- */
function QuizSession({ subject, headToHeadMode, onRecordAnswer, onReturn, onCompleteQuiz, onCompleteHeadToHead }) {
  const totalPool = subject.onboardingAnswers;
  const noQuestions = !totalPool || totalPool.length === 0;
  const [correctMap, setCorrectMap] = useState({});
  const [overallCorrect, setOverallCorrect] = useState(0);
  const [overallTotal, setOverallTotal] = useState(0);
  const batchSize = 5;
  const availablePool = totalPool ? totalPool.filter(q => !correctMap[q.questionId]) : [];
  const [batch, setBatch] = useState(() => {
    const shuffled = [...availablePool].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, batchSize);
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = batch[currentIndex];
  const allOnboardingResponses = Object.values(SAMPLE_EXTENDED_RESPONSES).flatMap(resp =>
    Object.entries(resp).map(([label, answer]) => {
      const q = EXTENDED_QUESTIONS.find(q => q.label === label);
      return q ? { questionId: q.number, question: q.question, answer } : null;
    }).filter(x => x)
  );
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const handleAnswer = (isCorrect, selected, correct) => {
    onRecordAnswer(subject.id, currentQuestion.questionId);
    setOverallTotal(prev => prev + 1);
    if (isCorrect) {
      setOverallCorrect(prev => prev + 1);
      setCorrectMap(prev => ({ ...prev, [currentQuestion.questionId]: true }));
    }
    setCurrentFeedback({ isCorrect, selected, correct });
  };
  const nextQuestion = () => {
    setCurrentFeedback(null);
    if (currentIndex < batch.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const newAvailable = totalPool.filter(q => !correctMap[q.questionId]);
      if (newAvailable.length >= batchSize) {
        const newBatch = newAvailable.sort(() => Math.random() - 0.5).slice(0, batchSize);
        setBatch(newBatch);
        setCurrentIndex(0);
      }
    }
  };

  // Remove useEffect that was continuously updating overall stats.
  // Instead, overall stats are reported only when the session ends (via onReturn).

  return (
    <div className="quiz-session">
      <div
        className="return-link"
        onClick={() => {
          if (headToHeadMode && onCompleteHeadToHead) {
            onCompleteHeadToHead(overallCorrect);
          }
          onCompleteQuiz(overallTotal, overallCorrect);
          onReturn();
        }}
      >
        Return to People Menu
      </div>
      {noQuestions ? (
        <div>
          <h3>This person hasn't answered any onboarding questions. Please ask them to complete onboarding.</h3>
          <button onClick={onReturn}>Return to People</button>
        </div>
      ) : availablePool.length === 0 ? (
        <div>
          <h3>All quiz questions have been answered correctly for this person.</h3>
          <button onClick={() => {
            if (headToHeadMode && onCompleteHeadToHead) {
              onCompleteHeadToHead(overallCorrect);
            }
            onCompleteQuiz(overallTotal, overallCorrect);
            onReturn();
          }}>Return to People</button>
        </div>
      ) : (
        <>
          <QuizQuestionFromOnboarding
            key={currentQuestion.questionId}
            questionData={currentQuestion}
            allResponses={allOnboardingResponses}
            onAnswer={handleAnswer}
          />
          {currentFeedback && (
            <>
              <div className="quiz-feedback">
                {currentFeedback.isCorrect ? (
                  <span className="correct">
                    Correct! (Your answer: {currentFeedback.selected})
                  </span>
                ) : (
                  <span className="incorrect">
                    Incorrect. Your answer: {currentFeedback.selected}. Correct answer: {currentFeedback.correct}.
                  </span>
                )}
              </div>
              <div className="quiz-navigation">
                {currentIndex < batch.length - 1 ? (
                  <button onClick={nextQuestion}>Next Question</button>
                ) : (
                  <>
                    <div className="quiz-summary">
                      You got {overallCorrect} out of {overallTotal} correct.
                    </div>
                    {totalPool.filter(q => !correctMap[q.questionId]).length >= batchSize ? (
                      <button onClick={nextQuestion}>Answer more</button>
                    ) : null}
                    <button onClick={() => {
                      if (headToHeadMode && onCompleteHeadToHead) {
                        onCompleteHeadToHead(overallCorrect);
                      }
                      onCompleteQuiz(overallTotal, overallCorrect);
                      onReturn();
                    }}>Return to People</button>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

/* -------------------------------
   SubjectDetail Component
   Displays the selected subject with buttons for Start Quiz and Start Head-to-Head match.
------------------------------- */
function SubjectDetail({ subject, onStartQuiz, onStartHeadToHead, onReturn }) {
  return (
    <div className="subject-detail">
      <h2>{subject.name} (ID: {subject.id})</h2>
      <button onClick={onStartQuiz}>Start Quiz</button>
      <button onClick={onStartHeadToHead}>Start Head-to-Head match</button>
      <button onClick={onReturn}>Return to People</button>
    </div>
  );
}

/* -------------------------------
   People Component
   Displays user avatars (with IDs) and a text entry for starting a head-to-head match by ID.
------------------------------- */
function People({ user, selfie, onMoreQuestions, onSelectSubject, onStartHeadToHead, onStartHeadToHeadById }) {
  const peopleData = SAMPLE_PEOPLE_DATA;
  const [quizLog, setQuizLog] = useState({});
  const recordAnswer = (subjectId, questionId) => {
    setQuizLog((prev) => {
      const prevLog = prev[subjectId] || [];
      if (!prevLog.includes(questionId)) {
        return { ...prev, [subjectId]: [...prevLog, questionId] };
      }
      return prev;
    });
  };
  const placeholderColors = useMemo(() => {
    const colors = {};
    peopleData.forEach(person => {
      colors[person.id] = '#' + Math.floor(Math.random() * 16777215).toString(16);
    });
    return colors;
  }, []);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [inDetail, setInDetail] = useState(false);
  const [headToHeadInput, setHeadToHeadInput] = useState("");
  
  const handlePersonSelect = (person) => {
    setSelectedPerson(person);
    setInDetail(true);
  };
  return (
    <div className="people-container">
      <h2>People</h2>
      <div className="user-info">
        {selfie ? (
          <img src={selfie} alt="Your Selfie" className="user-selfie" />
        ) : (
          <div className="user-placeholder">{user.username.charAt(0).toUpperCase()}</div>
        )}
        <span>{user.username} (ID: {user.id})</span>
        <button className="more-link-button" onClick={onMoreQuestions}>Answer more questions</button>
      </div>
      <div className="people-list">
        {peopleData.map((person) => (
          <div key={person.id} className="person-wrapper" onClick={() => handlePersonSelect(person)}>
            <div className="person-placeholder" style={{ backgroundColor: placeholderColors[person.id] }}>
              {person.name.charAt(0).toUpperCase()}
            </div>
            <div className="person-name">
              {person.name} (ID: {person.id})
            </div>
            {quizLog[person.id] &&
              (quizLog[person.id].length === (person.onboardingAnswers ? person.onboardingAnswers.length : 0) && <div className="all-answered">All answered</div>)
            }
          </div>
        ))}
      </div>
      {inDetail && selectedPerson && (
        <SubjectDetail 
          subject={selectedPerson} 
          onStartQuiz={() => { onSelectSubject(selectedPerson); setInDetail(false); }}
          onStartHeadToHead={() => { onStartHeadToHead(selectedPerson); setInDetail(false); }}
          onReturn={() => setInDetail(false)}
        />
      )}
      <div className="head-to-head-entry">
        <h3>Start Head-to-Head Match by ID</h3>
        <input 
          type="text" 
          placeholder="Enter opponent ID" 
          value={headToHeadInput} 
          onChange={(e) => setHeadToHeadInput(e.target.value)} 
        />
        <button onClick={() => onStartHeadToHeadById(headToHeadInput)}>Start Head-to-Head Match</button>
      </div>
    </div>
  );
}

/* -------------------------------
   Header Component
   Now displays head-to-head and overall quiz statistics.
------------------------------- */
function Header({ selfie, setSelfie, user, headToHeadStats, quizStats }) {
  const [showProfile, setShowProfile] = useState(false);
  const toggleProfile = () => setShowProfile(!showProfile);
  const handleDeleteSelfie = () => setSelfie(null);
  const handleUploadSelfie = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelfie(reader.result);
      reader.readAsDataURL(file);
    }
  };
  const percentCorrect = quizStats.total > 0 ? ((quizStats.correct / quizStats.total) * 100).toFixed(1) : 0;
  return (
    <div className="header">
      <div className="header-avatar" onClick={toggleProfile}>
        {selfie ? (
          <img src={selfie} alt="Profile" className="user-selfie" />
        ) : (
          <div className="user-placeholder">{user.username.charAt(0).toUpperCase()}</div>
        )}
      </div>
      {showProfile && (
        <div className="profile-menu">
          <div className="profile-stats">
            <p>Head-to-Head matches: {headToHeadStats.matches}</p>
            <p>Correct Head-to-Head responses: {headToHeadStats.correctResponses}</p>
            <p>Total Quiz Questions Answered: {quizStats.total}</p>
            <p>Overall Accuracy: {percentCorrect}%</p>
          </div>
          {selfie ? (
            <button onClick={handleDeleteSelfie}>Delete Selfie</button>
          ) : (
            <label className="upload-label">
              Upload Selfie
              <input type="file" accept="image/*" onChange={handleUploadSelfie} />
            </label>
          )}
        </div>
      )}
    </div>
  );
}

/* -------------------------------
   Login Component
------------------------------- */
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const userId = username ? username.charCodeAt(0) + (Date.now() % 1000) : 1;
    onLogin({ username, id: userId });
  };
  return (
    <div className="login-container">
      <h2>DSET App Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username: </label>
          <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

/* -------------------------------
   Selfie Component
------------------------------- */
function Selfie({ onCapture }) {
  const [imageSrc, setImageSrc] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        onCapture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="selfie-container">
      <h2>Take a Selfie</h2>
      {imageSrc ? (
        <img src={imageSrc} alt="Selfie" className="user-selfie" />
      ) : (
        <div>
          <input type="file" accept="image/*" capture="user" onChange={handleImageChange} />
        </div>
      )}
    </div>
  );
}

/* -------------------------------
   Main App Component
------------------------------- */
function App() {
  const [step, setStep] = useState('login');
  const [user, setUser] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [onboardingAnswers, setOnboardingAnswers] = useState([]);
  const [headToHeadMode, setHeadToHeadMode] = useState(false);
  const [headToHeadOpponent, setHeadToHeadOpponent] = useState(null);
  const [headToHeadTrigger, setHeadToHeadTrigger] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [headToHeadStats, setHeadToHeadStats] = useState({ matches: 0, correctResponses: 0 });
  const [quizStats, setQuizStats] = useState({ total: 0, correct: 0 });
  const answeredIds = useMemo(() => new Set(onboardingAnswers.map(a => a.questionId)), [onboardingAnswers]);

  const handleCompleteQuiz = (total, correct) => {
    setQuizStats(prev => ({
      total: prev.total + total,
      correct: prev.correct + correct
    }));
  };

  const handleCompleteHeadToHead = (correct) => {
    setHeadToHeadStats(prev => ({
      matches: prev.matches + 1,
      correctResponses: prev.correctResponses + correct
    }));
  };

  return (
    <div className="App">
      {step !== 'login' && (
        <Header
          selfie={selfie}
          setSelfie={setSelfie}
          user={user}
          headToHeadStats={headToHeadStats}
          quizStats={quizStats}
        />
      )}
      {step === 'login' && (
        <Login
          onLogin={(data) => {
            setUser({ ...data, onboardingAnswers });
            setStep('onboarding');
          }}
        />
      )}
      {step === 'onboarding' && (
        <OnboardingRandom
          onComplete={(ans) => {
            setOnboardingAnswers(ans);
            setUser(prev => ({ ...prev, onboardingAnswers: ans }));
            setStep('people');
          }}
        />
      )}
      {step === 'moreOnboarding' && (
        <MoreOnboarding
          answeredIds={answeredIds}
          onComplete={(ans) => {
            const newAns = ans.filter(a => !answeredIds.has(a.questionId));
            setOnboardingAnswers(prev => [...prev, ...newAns]);
            setUser(prev => ({
              ...prev,
              onboardingAnswers: [...(prev.onboardingAnswers || []), ...newAns],
            }));
            setStep('moreOnboarding');
          }}
          onReturn={() => setStep('people')}
        />
      )}
      {step === 'headToHeadSetup' && (
        <HeadToHeadSetup
          triggeringUser={headToHeadTrigger}
          opponent={headToHeadOpponent}
          onStart={() => {
            setHeadToHeadMode(true);
            setStep('quiz');
          }}
        />
      )}
      {step === 'quiz' && (
        <QuizSession
          subject={headToHeadMode ? headToHeadOpponent : selectedSubject}
          headToHeadMode={headToHeadMode}
          onRecordAnswer={(subjId, qid) => {}}
          onCompleteQuiz={handleCompleteQuiz}
          onCompleteHeadToHead={handleCompleteHeadToHead}
          onReturn={() => {
            setStep('people');
            setHeadToHeadMode(false);
          }}
        />
      )}
      {step === 'people' && (
        <People
          user={user}
          selfie={selfie}
          onMoreQuestions={() => setStep('moreOnboarding')}
          onSelectSubject={(person) => {
            setSelectedSubject(person);
            setStep('subjectDetail');
          }}
          onStartHeadToHead={(person) => {
            setHeadToHeadOpponent(person);
            setHeadToHeadTrigger(user);
            setStep('headToHeadSetup');
          }}
          onStartHeadToHeadById={(idStr) => {
            const id = Number(idStr);
            const opp = SAMPLE_PEOPLE_DATA.find(p => p.id === id);
            if (opp) {
              setHeadToHeadOpponent(opp);
              setHeadToHeadTrigger(user);
              setStep('headToHeadSetup');
            } else {
              alert("No user found with that ID.");
            }
          }}
        />
      )}
      {step === 'subjectDetail' && (
        <SubjectDetail
          subject={selectedSubject}
          onStartQuiz={() => setStep('quiz')}
          onStartHeadToHead={() => {
            setHeadToHeadOpponent(selectedSubject);
            setHeadToHeadTrigger(user);
            setStep('headToHeadSetup');
          }}
          onReturn={() => setStep('people')}
        />
      )}
    </div>
  );
}

export default App;

