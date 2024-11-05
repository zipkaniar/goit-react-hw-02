import { useEffect, useState } from 'react'
import './App.css'
import Feedback from "./component/Feedback.jsx"
import Options from "./component/Options.jsx"

  function App() {
    const [feedback, setFeedback] = useState(() => ({
      good: Number(localStorage.getItem('good')) || 0,
      neutral: Number(localStorage.getItem('neutral')) || 0,
      bad: Number(localStorage.getItem('bad')) || 0,
    }));
  
    const totalFeedback = feedback.good + feedback.bad;
    const percentageFeedback = feedback.good + feedback.bad;
    const positivePercentage = totalFeedback > 0 ? Math.round((feedback.good / percentageFeedback) * 100) : 0;
  
    const updateFeedback = (feedbackType) => {
      setFeedback(prevFeedback => ({
        ...prevFeedback,
        [feedbackType]: prevFeedback[feedbackType] + 1,
      }));
    };
  
    useEffect(() => { //her bir geri bildirim durumu değiştiğinde yerel depolamayı güncellemek için
      localStorage.setItem('good', feedback.good);
      localStorage.setItem('neutral', feedback.neutral);
      localStorage.setItem('bad',feedback.bad);
    }, [feedback]);
  
    const handleReset = () => {
      setFeedback({ good: 0, neutral: 0, bad: 0 });
    };
  return (
    <>
    <div className='description'>
        <h1 className='title'>Sip Happens Café</h1>
        <p>
            Please leave your feedback about our service by selecting one of the options below.
        </p>
    </div>
    <Options feedback={feedback} updateFeedback={updateFeedback} handleReset={handleReset} />
      <Feedback feedback={feedback}
        totalFeedback={totalFeedback}
        positivePercentage={positivePercentage}
        handleReset={handleReset} />

    </>
  )
}

export default App  