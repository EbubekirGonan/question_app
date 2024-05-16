import { useState, useEffect } from 'react';
import './QuestionContainer.css';
import { questions } from '../../assets/questions';


function QuestionContainer (){


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const currentQuestion = questions[currentQuestionIndex]

    const [correctAnswers, setCorrectAnswers] = useState([])
    const [inCorrectAnswers, setInCorrectAnswers] = useState([])



    useEffect(() => {

        const timer = setTimeout(() => {
          setCurrentQuestionIndex((prevIndex) => (prevIndex + 1))
        }, 10000)
    
        return () => clearTimeout(timer);
    
      }, [currentQuestionIndex])


    function handleClick(answerId) {

        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1))

        const isCorrect = currentQuestion.options[answerId] === currentQuestion.answer

        if(isCorrect) {
            setCorrectAnswers((prevAnswers) => [
            ...prevAnswers,
                {[currentQuestion.questionId]: currentQuestion.options[answerId]}
            ])
        } else {
            setInCorrectAnswers((prevAnswers) => [
                ...prevAnswers,
                {[currentQuestion.questionId]: currentQuestion.options[answerId]}
            ])
        }

    }



    return (
        <> {currentQuestionIndex < questions.length ? (
        
            <div id='question-container'>
                <img src="" alt="" />
                <p><strong>{currentQuestion.question}</strong></p>
                <div id='options'>
                    <button onClick={() => handleClick(0)}>{currentQuestion.options[0]}</button>
                    <button onClick={() => handleClick(1)}>{currentQuestion.options[1]}</button>
                    <button onClick={() => handleClick(2)}>{currentQuestion.options[2]}</button>
                    <button onClick={() => handleClick(3)}>{currentQuestion.options[3]}</button>
                </div>
            </div>
            ): 
            
            <ResultContainer/>
            
            
            }
        </>
    )

}

export default QuestionContainer