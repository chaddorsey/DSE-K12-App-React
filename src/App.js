// src/App.js
import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { QRCodeCanvas } from 'qrcode.react';
import {
  registerUser,
  loginUser,
  getUsers,
  resetPassword,
  startMatchSession,
  joinMatchSession,
  getMatchStatus,
  updateMatchResult,
  getUserProfile,
  getQuestionDistractors,
  updateUserProfile
} from './api';
import { EXTENDED_QUESTIONS } from './constants/questions';

const REQUIRED_ONBOARDING_COUNT = 7;

/* -------------------------------
   Fallback Component
------------------------------- */
function FallbackComponent() {
  return null;
}

/* -------------------------------
   Login Component
------------------------------- */
function Login({ user, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user && location.pathname === '/login') {
      console.log("[Login] User during redirect:", user);
      if (!user.onboardingAnswers || user.onboardingAnswers.length < REQUIRED_ONBOARDING_COUNT) {
        navigate('/onboarding');
      } else {
        navigate('/people');
      }
    }
  }, [user, location, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ username, password });
      console.log("[Login] Response:", response);
      const { user, token } = response;
      localStorage.setItem('token', token);
      onLogin(user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>DSET App Login</h2>
        <button type="button" className="reset-link" onClick={() => navigate('/reset')}>
          Reset Password
        </button>
      </div>
      {error && <p className="error">{error}</p>}
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
      <button type="button" onClick={() => navigate('/register')}>Register New User</button>
    </div>
  );
}

/* -------------------------------
   Register Component
------------------------------- */
function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await registerUser({ username, password, email });
      setMessage("Registration successful! Please log in.");
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Register New User</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Username: </label>
          <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password: </label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Register</button>
      </form>
      <button type="button" onClick={() => navigate('/login')}>Return to Login</button>
    </div>
  );
}

/* -------------------------------
   ResetPassword Component
------------------------------- */
function ResetPassword({ onReturnToLogin }) {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }
    try {
      const result = await resetPassword({ username, newPassword });
      setMessage(result.message || "Password updated successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="reset-container">
      <h2>Reset Password</h2>
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}
      <form onSubmit={handleReset}>
        <div>
          <label>Username: </label>
          <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>New Password: </label>
          <input type="password" required value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <div>
          <label>Confirm New Password: </label>
          <input type="password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit">Reset Password</button>
      </form>
      <button type="button" className="return-button" onClick={onReturnToLogin}>
        Return to Login Screen
      </button>
    </div>
  );
}

/* -------------------------------
   Onboarding Components
------------------------------- */
function OnboardingOpenResponse({ question, onAnswer }) {
  const [response, setResponse] = useState("");
  const handleSubmit = () => onAnswer(response);
  return (
    <div className="quiz-question">
      <h3>{question}</h3>
      <input type="text" maxLength={100} value={response} onChange={(e) => setResponse(e.target.value)} />
      <button type="button" onClick={handleSubmit}>Submit</button>
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
      <button type="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

const OnboardingQuestionComponents = {
  OP: OnboardingOpenResponse,
  MC: OnboardingMultipleChoice,
  NM: OnboardingNumerical,
};

function Onboarding({ initialAnswers = [], onComplete }) {
  const remainingCount = REQUIRED_ONBOARDING_COUNT - initialAnswers.length;
  const navigate = useNavigate();
  const completedRef = useRef(false);

  useEffect(() => {
    console.log("[Onboarding] initialAnswers:", initialAnswers, "Remaining count:", remainingCount);
    if (remainingCount <= 0 && !completedRef.current) {
      completedRef.current = true;
      console.log("[Onboarding] Completing onboarding with answers:", initialAnswers);
      onComplete(initialAnswers);
    }
  }, [remainingCount, initialAnswers, onComplete]);

  const unansweredQuestions = EXTENDED_QUESTIONS.filter(q => !initialAnswers.some(a => a.questionId === q.number));
  const questions = unansweredQuestions.sort(() => 0.5 - Math.random()).slice(0, remainingCount);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newAnswers, setNewAnswers] = useState([]);
  if (remainingCount <= 0 || questions.length === 0) return null;
  const currentQuestion = questions[currentIndex];
  const handleAnswer = (answer) => {
    const answerObj = {
      questionId: currentQuestion.number,
      question: currentQuestion.question,
      answer,
    };
    console.log("[Onboarding] Answer for question", currentQuestion.number, ":", answerObj);
    setNewAnswers(prev => [...prev, answerObj]);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const mergedAnswers = [...initialAnswers, ...newAnswers, answerObj];
      console.log("[Onboarding] Merged Answers:", mergedAnswers);
      onComplete(mergedAnswers);
    }
  };

  return (
    <div className="onboarding-container">
      <h2>Onboarding</h2>
      <div className="question-prompt">{currentQuestion.question}</div>
      {(() => {
        const ContentComponent = OnboardingQuestionComponents[currentQuestion.type] || FallbackComponent;
        return (
          <ContentComponent
            question={currentQuestion.question}
            options={currentQuestion.options}
            min={0}
            max={100}
            onAnswer={handleAnswer}
          />
        );
      })()}
    </div>
  );
}

/* -------------------------------
   MoreOnboarding Component
------------------------------- */
function MoreOnboarding({ answeredIds, onComplete, onReturn }) {
  const remaining = EXTENDED_QUESTIONS.filter(q => !answeredIds.has(q.number));
  const batchSize = REQUIRED_ONBOARDING_COUNT;
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
                      onComplete([{ questionId: batch[currentIndex].number, question: batch[currentIndex].question, answer }]);
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
   People Component
------------------------------- */
function People({ user, selfie, onMoreQuestions, onSelectSubject, onStartHeadToHead, onJoinMatch }) {
  const [people, setPeople] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUsers() {
      try {
        const data = await getUsers();
        console.log("[People] Fetched users:", data);
        setPeople(data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    }
    fetchUsers();
  }, []);
  console.log("[People] User object:", user);
  if (!user || !user.username) {
    return <div>Loading...</div>;
  }
  return (
    <div className="people-container">
      <h2>People</h2>
      <div className="user-info">
        {selfie ? (
          <img src={selfie} alt="Your Selfie" className="user-selfie" />
        ) : (
          <div className="user-placeholder">{user.username}</div>
        )}
        <span>{user.username} (ID: {user.id})</span>
        <button className="more-link-button" onClick={onMoreQuestions}>
          Answer more questions
        </button>
        <button className="join-match-button" onClick={onJoinMatch}>
          Join Match
        </button>
        <button className="register-button" onClick={() => navigate('/register')}>
          Register New User
        </button>
      </div>
      <div className="people-list">
        {people.map((person) => (
          <div key={person.id} className="person-wrapper" onClick={() => {
            onSelectSubject(person);
            navigate(`/subject/${person.id}`);
          }}>
            <div className="person-placeholder" style={{ backgroundColor: '#ccc' }}>
              {person.username.charAt(0).toUpperCase()}
            </div>
            <div className="person-name">
              {person.username} (ID: {person.id})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------
   SubjectDetail Component
------------------------------- */
function SubjectDetail({ subject, onStartQuiz, onStartHeadToHead, onReturn }) {
  if (!subject) return <div>Loading...</div>;
  return (
    <div className="subject-detail">
      <h2>{subject.username} (ID: {subject.id})</h2>
      <button onClick={onStartQuiz}>Start Quiz</button>
      <button onClick={() => onStartHeadToHead(subject)}>Start HeadToHead match</button>
      <button onClick={onReturn}>Return to People</button>
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
    if (file) {
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
   HeadToHead Invitation Component
------------------------------- */
function HeadToHeadInvitation({ matchSession, onMatchStarted, onCancel }) {
  const [sessionData, setSessionData] = useState(matchSession);
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const updatedSession = await getMatchStatus(matchSession.sessionId);
        updatedSession.matchUrl = updatedSession.matchUrl || matchSession.matchUrl;
        setSessionData(updatedSession);
        if (updatedSession.status === 'started' || updatedSession.status === 'complete') {
          clearInterval(interval);
          onMatchStarted(updatedSession);
        }
      } catch (err) {
        console.error("Error polling match status:", err);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [matchSession, onMatchStarted]);
  return (
    <div className="head-to-head-invitation">
      <h2>HeadToHead Match Invitation</h2>
      <p>Your match session ID: {sessionData.sessionId}</p>
      <p>Share this URL with your opponent to join:</p>
      <p className="head-to-head-url">{sessionData.matchUrl}</p>
      <div className="qr-code">
        <QRCodeCanvas value={sessionData.matchUrl} />
      </div>
      <p>Waiting for opponent to join...</p>
      <button onClick={onCancel}>Cancel Match</button>
    </div>
  );
}

/* -------------------------------
   HeadToHead Round Initiation Component
------------------------------- */
function HeadToHeadRoundInitiation({ matchSession, currentUser, onRoundStarted, onTimeout, onReturnToPeople }) {
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  useEffect(() => {
    const pollInterval = setInterval(async () => {
      try {
        const updatedSession = await getMatchStatus(matchSession.sessionId);
        updatedSession.matchUrl = updatedSession.matchUrl || matchSession.matchUrl;
        if (updatedSession.status === 'started' || updatedSession.status === 'complete') {
          clearInterval(pollInterval);
          onRoundStarted(updatedSession);
        }
      } catch (err) {
        console.error("Error polling match status:", err);
      }
    }, 2000);
    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          clearInterval(pollInterval);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(pollInterval);
      clearInterval(timerInterval);
    };
  }, [matchSession, onRoundStarted, onTimeout]);
  const handleJoin = async () => {
    setError(null);
    if (!joinCode.trim()) {
      setError("Session code cannot be empty.");
      return;
    }
    try {
      const response = await joinMatchSession(joinCode.trim(), { userId: currentUser.id });
      const session = response.session ? response.session : response;
      onRoundStarted(session);
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="head-to-head-round-initiation">
      <h2>New Round Initiation</h2>
      <div className="initiator-section">
        <p>Your session code: {matchSession.sessionId}</p>
        <p>Share this URL with your opponent:</p>
        <p className="head-to-head-url">{matchSession.matchUrl}</p>
        <div className="qr-code">
          <QRCodeCanvas value={matchSession.matchUrl} />
        </div>
        <p>Waiting for opponent to join... ({timeLeft} seconds remaining)</p>
      </div>
      <div className="join-section">
        <h3>Or join a round:</h3>
        {error && <p className="error">{error}</p>}
        <input
          type="text"
          placeholder="Enter Session Code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <button onClick={handleJoin}>Join Round</button>
      </div>
      <button onClick={onReturnToPeople}>Return to People</button>
    </div>
  );
}

/* -------------------------------
   HeadToHead Quiz Question Component
------------------------------- */
function HeadToHeadQuizQuestion({ questionData, onAnswer }) {
  const [distractors, setDistractors] = useState([]);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    async function fetchDistractors() {
      if (questionData.type === 'MC') {
        const qDef = EXTENDED_QUESTIONS.find(q => q.number === questionData.questionId);
        if (qDef && qDef.options.length > 0) {
          const options = qDef.options.filter(opt => opt !== questionData.correctAnswer);
          let chosen = [];
          if (options.length <= 2) {
            chosen = options;
          } else {
            const shuffled = options.sort(() => 0.5 - Math.random());
            chosen = shuffled.slice(0, 2);
          }
          setDistractors(chosen);
        }
      } else if (questionData.type === 'NM' || questionData.type === 'OP') {
        try {
          const data = await getQuestionDistractors(questionData.label, questionData.correctAnswer);
          setDistractors(data.distractors);
        } catch (err) {
          console.error("Error fetching distractors", err);
          setDistractors([]);
        }
      }
    }
    fetchDistractors();
  }, [questionData]);
  const computedOptions = React.useMemo(() => {
    const allOptions = [questionData.correctAnswer, ...distractors];
    return allOptions.sort(() => 0.5 - Math.random());
  }, [questionData.correctAnswer, distractors]);
  const handleClick = (opt) => {
    if (!submitted) {
      setSubmitted(true);
      setSelected(opt);
      const answerCorrect = opt === questionData.correctAnswer;
      onAnswer(answerCorrect, opt, questionData.correctAnswer);
    }
  };
  return (
    <div className="quiz-question">
      <h3>{questionData.question}</h3>
      <div className="quiz-options">
        {computedOptions.map((opt, idx) => (
          <div
            key={idx}
            className={`quiz-option ${submitted ? (opt === questionData.correctAnswer ? "highlight" : (opt === selected ? "selected" : "")) : ""}`}
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
   QuizQuestionFromOnboarding Component
------------------------------- */
function QuizQuestionFromOnboarding({ questionData, allResponses, onAnswer }) {
  const correctAnswer = questionData.answer;
  const isNumeric = !isNaN(Number(correctAnswer));
  const computedOptions = (() => {
    const others = allResponses.filter(resp => resp.questionId === questionData.questionId && resp.answer !== correctAnswer).map(resp => resp.answer);
    const unique = Array.from(new Set(others));
    if (isNumeric) {
      let allNums = [Number(correctAnswer), ...unique.map(val => Number(val))];
      allNums = Array.from(new Set(allNums)).sort((a, b) => a - b);
      return allNums.map(String);
    } else {
      let allText = [correctAnswer, ...unique];
      return allText.sort((a, b) => a.localeCompare(b));
    }
  })();
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
          <div key={idx} className={`quiz-option ${submitted ? (isNumeric ? (Number(opt) === Number(correctAnswer) ? "highlight" : (opt === selected ? "selected" : "")) : (opt === correctAnswer ? "highlight" : (opt === selected ? "selected" : ""))) : ""}`} onClick={() => handleClick(opt)}>
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}

/* -------------------------------
   HeadToHead Quiz Component
------------------------------- */
function HeadToHeadQuiz({ sessionData, currentUser, opponent, onComplete, onTryAnotherRound, onCompleteHeadToHead, onRecordAnswer, onCompleteQuiz }) {
  const [opponentData, setOpponentData] = useState(opponent);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [results, setResults] = useState([]);
  const [localScore, setLocalScore] = useState(0);
  const [resultsSubmitted, setResultsSubmitted] = useState(false);
  const [opponentResult, setOpponentResult] = useState(null);
  const [pollingTimedOut, setPollingTimedOut] = useState(false);
  const batchSize = 5;
  const pollingStartRef = useRef(Date.now());

  // Reset quiz state when sessionData changes (new round)
  useEffect(() => {
    console.log("[HeadToHeadQuiz] New sessionData detected, resetting quiz state.");
    setCurrentIndex(0);
    setResults([]);
    setLocalScore(0);
    setResultsSubmitted(false);
    setOpponentResult(null);
    setPollingTimedOut(false);
    pollingStartRef.current = Date.now();
  }, [sessionData]);

  const normalizeOnboardingAnswers = (answers) => {
    if (!answers) return [];
    if (Array.isArray(answers)) return answers;
    return Object.entries(answers).map(([label, answer]) => {
      const qDef = EXTENDED_QUESTIONS.find(q => q.label === label) || { number: label, question: label, type: 'OP', label };
      return {
        questionId: qDef.number,
        question: qDef.question,
        answer,
      };
    });
  };

  useEffect(() => {
    async function fetchOpponent() {
      if (!opponentData.onboardingAnswers || (Array.isArray(opponentData.onboardingAnswers) && opponentData.onboardingAnswers.length === 0)) {
        try {
          const profile = await getUserProfile(opponentData.id, localStorage.getItem('token'));
          console.log("[HeadToHeadQuiz] Fetched opponent profile:", profile);
          setOpponentData(profile);
        } catch (err) {
          console.error("Error fetching opponent profile", err);
        }
      }
    }
    fetchOpponent();
  }, [opponentData]);

  useEffect(() => {
    const normalized = normalizeOnboardingAnswers(opponentData.onboardingAnswers);
    console.log("[HeadToHeadQuiz] Normalized opponent onboarding answers:", normalized);
    if (normalized && normalized.length > 0) {
      const shuffled = normalized.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, batchSize).map(q => {
        let qDef = EXTENDED_QUESTIONS.find(item => item.number === q.questionId);
        if (!qDef) qDef = { type: 'OP', label: q.questionId.toString() };
        return {
          questionId: q.questionId,
          question: q.question,
          correctAnswer: q.answer,
          type: qDef.type,
          label: qDef.label
        };
      });
      setQuestions(selected);
    }
  }, [opponentData]);

  const handleAnswer = (isCorrect, selectedAnswer, correctAnswer) => {
    const currentQuestion = questions[currentIndex];
    setResults(prev => [...prev, {
      questionId: currentQuestion.questionId,
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer,
      isCorrect
    }]);
    if (isCorrect) setLocalScore(prev => prev + 1);
    setCurrentFeedback({ isCorrect, selected: selectedAnswer, correct: correctAnswer });
  };

  const nextQuestion = () => {
    setCurrentFeedback(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const resultPayload = {
        userId: currentUser.id,
        results,
        score: localScore
      };
      updateMatchResult(sessionData.sessionId, resultPayload)
        .then(() => {
          setResultsSubmitted(true);
        })
        .catch(err => console.error("Error updating match result", err));
    }
  };

  useEffect(() => {
    if (resultsSubmitted) {
      const timeout = 30000; // 30 seconds
      const interval = setInterval(async () => {
        try {
          const updatedSession = await getMatchStatus(sessionData.sessionId);
          console.log("[HeadToHeadQuiz] Polling updated session:", updatedSession);
          if (updatedSession.results && updatedSession.results[opponentData.id]) {
            setOpponentResult(updatedSession.results[opponentData.id]);
            if (updatedSession.status === 'complete') {
              clearInterval(interval);
            }
          }
          if (Date.now() - pollingStartRef.current > timeout) {
            console.log("[HeadToHeadQuiz] Polling timeout reached; performing final fetch.");
            const finalSession = await getMatchStatus(sessionData.sessionId);
            if (finalSession.results && finalSession.results[opponentData.id]) {
              setOpponentResult(finalSession.results[opponentData.id]);
            }
            setPollingTimedOut(true);
            clearInterval(interval);
          }
        } catch (err) {
          console.error("Error polling opponent result", err);
        }
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [resultsSubmitted, sessionData, opponentData.id]);

  const handleTryAnotherRound = async () => {
    try {
      const newSession = await startMatchSession({ initiatorId: currentUser.id, opponentId: opponent.id });
      onTryAnotherRound(newSession);
    } catch (err) {
      console.error("Error starting new round:", err);
    }
  };

  return (
    <div className="head-to-head-quiz">
      <div className="return-link" onClick={() => onComplete()}>
        Return to People Menu
      </div>
      {questions.length === 0 ? (
        <div>
          <h3>Your opponent has not completed onboarding. Cannot start quiz.</h3>
          <button onClick={() => onComplete()}>Return to People</button>
        </div>
      ) : (
        <>
          {!resultsSubmitted ? (
            <>
              <HeadToHeadQuizQuestion
                key={questions[currentIndex].questionId}
                questionData={questions[currentIndex]}
                onAnswer={handleAnswer}
              />
              {currentFeedback && (
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
              )}
              <div className="quiz-navigation">
                {currentIndex < questions.length - 1 ? (
                  <button onClick={nextQuestion}>Next Question</button>
                ) : (
                  <button onClick={nextQuestion}>Submit Quiz</button>
                )}
              </div>
              <div className="quiz-summary">
                Your current score: {localScore} out of {questions.length}
              </div>
            </>
          ) : (
            <div className="quiz-summary">
              <h3>Quiz Complete</h3>
              <div>
                <p>Your Responses:</p>
                <ul>
                  {results.map((r, idx) => (
                    <li key={idx}>
                      Q{r.questionId}: {r.isCorrect ? "Correct" : "Incorrect"} (Your answer: {r.selectedAnswer}, Correct: {r.correctAnswer})
                    </li>
                  ))}
                </ul>
              </div>
              {opponentResult ? (
                <div>
                  <p>Opponent's Responses:</p>
                  <ul>
                    {opponentResult.results && opponentResult.results.map((r, idx) => (
                      <li key={idx}>
                        Q{r.questionId}: {r.isCorrect ? "Correct" : "Incorrect"} (Their answer: {r.selectedAnswer}, Correct: {r.correctAnswer})
                      </li>
                    ))}
                    <p>Opponent's score: {opponentResult.score}</p>
                  </ul>
                </div>
              ) : (
                <div>
                  {pollingTimedOut 
                    ? "Polling timed out. Displaying final scores." 
                    : "Waiting for opponent to finish their quiz..."}
                </div>
              )}
              <div className="round-actions">
                <button onClick={() => onComplete()}>Return to People</button>
                <button onClick={handleTryAnotherRound}>Try another round</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* -------------------------------
   QuizSession Component (for non-head-to-head quiz)
------------------------------- */
function QuizSession({ subject, headToHeadMode, onRecordAnswer, onCompleteQuiz, onCompleteHeadToHead, onReturn }) {
  const totalPool = subject && subject.onboardingAnswers;
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
  return (
    <div className="quiz-session">
      <div className="return-link" onClick={() => {
        if (headToHeadMode && onCompleteHeadToHead) onCompleteHeadToHead(overallCorrect);
        onCompleteQuiz(overallTotal, overallCorrect);
        onReturn();
      }}>
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
            if (headToHeadMode && onCompleteHeadToHead) onCompleteHeadToHead(overallCorrect);
            onCompleteQuiz(overallTotal, overallCorrect);
            onReturn();
          }}>Return to People</button>
        </div>
      ) : (
        <>
          <QuizQuestionFromOnboarding
            key={currentQuestion.questionId}
            questionData={currentQuestion}
            allResponses={subject.onboardingAnswers}
            onAnswer={handleAnswer}
          />
          {currentFeedback && (
            <>
              <div className="quiz-feedback">
                {currentFeedback.isCorrect ? (
                  <span className="correct">Correct! (Your answer: {currentFeedback.selected})</span>
                ) : (
                  <span className="incorrect">Incorrect. Your answer: {currentFeedback.selected}. Correct: {currentFeedback.correct}.</span>
                )}
              </div>
              <div className="quiz-navigation">
                {currentIndex < batch.length - 1 ? (
                  <button onClick={nextQuestion}>Next Question</button>
                ) : (
                  <>
                    <div className="quiz-summary">You got {overallCorrect} out of {overallTotal} correct.</div>
                    {totalPool.filter(q => !correctMap[q.questionId]).length >= batchSize && (
                      <button onClick={nextQuestion}>Answer more</button>
                    )}
                    <button onClick={() => {
                      if (headToHeadMode && onCompleteHeadToHead) onCompleteHeadToHead(overallCorrect);
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
   JoinMatch Component
------------------------------- */
function JoinMatch({ onJoinSuccess, onReturn, currentUser }) {
  const [sessionId, setSessionId] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    setError(null);
    if (!sessionId.trim()) {
      setError("Session ID cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const response = await joinMatchSession(sessionId.trim(), { userId: currentUser.id });
      const session = response.session ? response.session : response;
      onJoinSuccess({ session });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="join-match-container">
      <h2>Join Match Session</h2>
      {error && <p className="error">{error}</p>}
      <input type="text" placeholder="Enter Match Session ID" value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
      <button onClick={handleJoin} disabled={loading}>
        {loading ? "Joining..." : "Join Match"}
      </button>
      <button onClick={onReturn}>Return to People</button>
    </div>
  );
}

/* -------------------------------
   Header Component
------------------------------- */
function Header({ selfie, setSelfie, user, headToHeadStats, quizStats, onLogout }) {
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
          <div className="user-placeholder">{user?.username?.charAt(0).toUpperCase()}</div>
        )}
      </div>
      {showProfile && user && (
        <div className="profile-menu">
          <div className="profile-stats">
            <p>HeadToHead matches: {headToHeadStats.matches}</p>
            <p>Correct HeadToHead responses: {headToHeadStats.correctResponses}</p>
            <p>Total Quiz Questions Answered: {quizStats.total}</p>
            <p>Overall Accuracy: {percentCorrect}%</p>
          </div>
          <button onClick={onLogout}>Logout</button>
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
   Main App Component
------------------------------- */
function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [selfie, setSelfie] = useState(null);
  const [onboardingAnswers, setOnboardingAnswers] = useState([]);
  const [headToHeadOpponent, setHeadToHeadOpponent] = useState(null);
  const [matchSession, setMatchSession] = useState(null);
  const [headToHeadMode, setHeadToHeadMode] = useState(false);
  const [headToHeadStats, setHeadToHeadStats] = useState({ matches: 0, correctResponses: 0 });
  const [quizStats, setQuizStats] = useState({ total: 0, correct: 0 });
  const [selectedSubject, setSelectedSubject] = useState(null);
  const answeredIds = useMemo(() => new Set(onboardingAnswers.map(a => a.questionId)), [onboardingAnswers]);

  useEffect(() => {
    console.log("[App] Current user state:", user);
  }, [user]);

  const publicRoutes = ['/login', '/register', '/reset', '/onboarding', '/more-onboarding'];
  useEffect(() => {
    if (!user && !publicRoutes.includes(location.pathname)) {
      navigate('/login');
    }
  }, [user, location, navigate]);

  const handleLogout = () => {
    console.log("[App] Logging out user:", user);
    localStorage.removeItem('token');
    setUser(null);
    setOnboardingAnswers([]);
  };

  const handleLogin = (data) => {
    console.log("[App] Data received on login:", data);
    setUser(data);
    let normalizedAnswers = [];
    if (data.onboardingAnswers) {
      if (Array.isArray(data.onboardingAnswers)) {
        normalizedAnswers = data.onboardingAnswers;
      } else {
        normalizedAnswers = Object.entries(data.onboardingAnswers).map(([label, answer]) => {
          const qDef = EXTENDED_QUESTIONS.find(q => q.label === label);
          return {
            questionId: qDef ? qDef.number : label,
            question: qDef ? qDef.question : label,
            answer,
          };
        });
      }
    }
    console.log("[App] Normalized onboarding answers:", normalizedAnswers);
    if (normalizedAnswers.length < REQUIRED_ONBOARDING_COUNT) {
      setOnboardingAnswers(normalizedAnswers);
      setUser(prev => ({ ...prev, onboardingAnswers: normalizedAnswers }));
      navigate('/onboarding');
    } else {
      setOnboardingAnswers(normalizedAnswers);
      setUser(prev => ({ ...prev, onboardingAnswers: normalizedAnswers }));
      navigate('/people');
    }
  };

  const completeOnboarding = async (ans) => {
    console.log("[App] Onboarding complete. Answers:", ans);
    setOnboardingAnswers(ans);
    try {
      const updatedUser = await updateUserProfile(user.id, { onboardingAnswers: ans });
      console.log("[App] Updated user from backend:", updatedUser);
      setUser(updatedUser);
    } catch (err) {
      console.error("Error updating user profile:", err);
      setUser(prev => prev ? { ...prev, onboardingAnswers: ans } : prev);
    }
    navigate('/people');
  };

  const initiateHeadToHead = useCallback(async (opponent) => {
    try {
      const session = await startMatchSession({ initiatorId: user.id, opponentId: opponent.id });
      setMatchSession(session);
      setHeadToHeadOpponent(opponent);
      setHeadToHeadMode(true);
      navigate(`/head-to-head/invitation/${session.sessionId}`);
    } catch (err) {
      console.error("Error starting match session:", err);
    }
  }, [user, navigate]);

  const handleJoinMatch = (response) => {
    const session = response.session ? response.session : response;
    if (!session) {
      console.error("Join match response did not include a session.");
      return;
    }
    setMatchSession(session);
    setHeadToHeadMode(true);
    getUserProfile(session.initiator, localStorage.getItem('token'))
      .then(profile => {
        setHeadToHeadOpponent(profile);
        navigate('/head-to-head/quiz');
      })
      .catch(err => {
        console.error("Error fetching initiator profile:", err);
      });
  };

  return (
    <div className="App">
      {user && <Header selfie={selfie} setSelfie={setSelfie} user={user} headToHeadStats={headToHeadStats} quizStats={quizStats} onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<Login user={user} onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ResetPassword onReturnToLogin={() => navigate('/login')} />} />
        <Route path="/onboarding" element={<Onboarding initialAnswers={onboardingAnswers} onComplete={completeOnboarding} />} />
        <Route path="/more-onboarding" element={
          <MoreOnboarding
            answeredIds={answeredIds}
            onComplete={(ans) => {
              const newAns = ans.filter(a => !answeredIds.has(a.questionId));
              setOnboardingAnswers(prev => [...(prev?.onboardingAnswers || prev || []), ...newAns]);
              setUser(prev => prev ? { ...prev, onboardingAnswers: [...(prev.onboardingAnswers || []), ...newAns] } : prev);
              navigate('/more-onboarding');
            }}
            onReturn={() => navigate('/people')}
          />
        } />
        <Route path="/people" element={<People
          user={user}
          selfie={selfie}
          onMoreQuestions={() => navigate('/more-onboarding')}
          onSelectSubject={(person) => { 
            setSelectedSubject(person);
            navigate(`/subject/${person.id}`);
          }}
          onStartHeadToHead={initiateHeadToHead}
          onJoinMatch={() => navigate('/join-match')}
        />} />
        <Route path="/subject/:subjectId" element={<SubjectDetail
          subject={selectedSubject}
          onStartQuiz={() => navigate('/quiz')}
          onStartHeadToHead={() => initiateHeadToHead(selectedSubject)}
          onReturn={() => navigate('/people')}
        />} />
        <Route path="/quiz" element={<QuizSession
          subject={headToHeadMode ? headToHeadOpponent : null}
          headToHeadMode={headToHeadMode}
          onRecordAnswer={() => {}}
          onCompleteQuiz={(total, correct) => setQuizStats({ total, correct })}
          onCompleteHeadToHead={(correct) => setHeadToHeadStats(prev => ({
            matches: prev.matches + 1,
            correctResponses: prev.correctResponses + correct,
          }))}
          onReturn={() => {
            setHeadToHeadMode(false);
            setMatchSession(null);
            navigate('/people');
          }}
        />} />
        <Route path="/join-match" element={<JoinMatch onJoinSuccess={handleJoinMatch} onReturn={() => navigate('/people')} currentUser={user} />} />
        <Route path="/head-to-head/invitation/:sessionId" element={<HeadToHeadInvitation
          matchSession={matchSession}
          onMatchStarted={(updatedSession) => navigate('/head-to-head/quiz')}
          onCancel={() => {
            setHeadToHeadMode(false);
            setMatchSession(null);
            navigate('/people');
          }}
        />} />
        <Route path="/head-to-head/quiz" element={<HeadToHeadQuiz
          sessionData={matchSession}
          currentUser={user}
          opponent={headToHeadOpponent}
          onComplete={() => {
            setHeadToHeadMode(false);
            setMatchSession(null);
            navigate('/people');
          }}
          onTryAnotherRound={(newSession) => {
            setMatchSession(newSession);
            navigate(`/head-to-head/round/${newSession.sessionId}`);
          }}
          onCompleteHeadToHead={(correct) => setHeadToHeadStats(prev => ({
            matches: prev.matches + 1,
            correctResponses: prev.correctResponses + correct,
          }))}
          onRecordAnswer={() => {}}
          onCompleteQuiz={(total, correct) => setQuizStats({ total, correct })}
        />} />
        <Route path="/head-to-head/round/:sessionId" element={<HeadToHeadRoundInitiation
          matchSession={matchSession}
          currentUser={user}
          onRoundStarted={(updatedSession) => navigate('/head-to-head/quiz')}
          onTimeout={() => navigate('/head-to-head/quiz')}
          onReturnToPeople={() => {
            setHeadToHeadMode(false);
            setMatchSession(null);
            navigate('/people');
          }}
        />} />
        <Route path="*" element={<Login user={user} onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
