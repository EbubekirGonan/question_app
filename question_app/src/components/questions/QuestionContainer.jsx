import { useState, useEffect } from 'react';
import './QuestionContainer.css';
import { questions } from '../../assets/questions';
import ResultContainer from '../results/ResultContainer';
import balik from '../../assets/pictures/balik.jpg'


function QuestionContainer (){


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const currentQuestion = questions[currentQuestionIndex]

    const [correctAnswers, setCorrectAnswers] = useState([]);
    const [inCorrectAnswers, setInCorrectAnswers] = useState([]);

   
    const [showAnswers, setShowAnswers] = useState(false);
    
    

    useEffect(() => {
        

        const questionTimer = setTimeout(() => {
          setCurrentQuestionIndex((prevIndex) => (prevIndex + 1))
        }, 5000)

        setShowAnswers(false);
        
        const answerTimer = setTimeout(() => {
            setShowAnswers(true)
        }, 3000)
            

        return () => {clearTimeout(questionTimer), clearTimeout(answerTimer)}
    }, [currentQuestionIndex])


    function handleClick(answerId) {

        const isCorrect = currentQuestion.options[answerId] === currentQuestion.answer

        if(isCorrect) {
            setCorrectAnswers((prevAnswers) => [
            ...prevAnswers,
            currentQuestion
            ])
            // console.log(correctAnswers);
        } else {
            setInCorrectAnswers((prevAnswers) => [
                ...prevAnswers,
                currentQuestion
            ])
            // console.log(inCorrectAnswers);
        }

        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1))

    }



    return (
        <> 
        

        {currentQuestionIndex < questions.length ? (
                
           
            <div id='question-container'>
                <div><img src={balik} alt="" /></div>
                <div><p>{currentQuestion.question}</p></div>
                
                {showAnswers &&
                <div id='options'>
                    <button onClick={() => handleClick(0)}>{currentQuestion.options[0]}</button>
                    <button onClick={() => handleClick(1)}>{currentQuestion.options[1]}</button>
                    <button onClick={() => handleClick(2)}>{currentQuestion.options[2]}</button>
                    <button onClick={() => handleClick(3)}>{currentQuestion.options[3]}</button>
                </div>}
            </div>
            ):

            currentQuestionIndex  >= questions.length &&
            <ResultContainer correctAnswers ={correctAnswers} inCorrectAnswers={inCorrectAnswers} />
            
        }
        </>
    )

}

export default QuestionContainer