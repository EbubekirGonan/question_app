import './ResultContainer.css';
import {useState} from 'react';
import { questions } from '../../assets/questions';

function ResultContainer ({correctAnswers, inCorrectAnswers}){

    const [showResultButton, setShowResultButton] = useState(true);
    const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
    const [showInCorrectAnswers, setShowInCorrectAnswers] = useState(false);
    const [showEmptyAnswers, setShowEmptyAnswers] = useState(false);

    const answeredQuestions = [...correctAnswers, ...inCorrectAnswers];
    // console.log(answeredQuestions);


    // for(let i=0; i<answeredQuestions.length; i++){
    //     console.log(Object.keys(answeredQuestions[i])[0])
    // }

    // const sortedAnsweredQuestions = answeredQuestions.sort((a, b) => {
    //     const keyA = parseInt(Object.keys(a)[0]);
    //     const keyB = parseInt(Object.keys(b)[0]);
    //     return keyA - keyB;
    // });

    const answeredQuestionsId = answeredQuestions.map((q) => (q.questionId));


    // const findAnsweredQuestionsID = () => {
    //     let answeredQuestionsId = [];
    //     for(let i=0; i<answeredQuestions.length; i++){
    //         answeredQuestionsId.push(answeredQuestions.map((q) => (q.questionId)));
    //     }
    //     return answeredQuestionsId;
    // }      
    
    // parseInt(Object.keys(answeredQuestions[i])[0])

    const findEmptyAnswers = () => {
        // const answeredIds = findAnsweredQuestionsID();
        // console.log(answeredIds)
        // questions.map((q) => console.log(q.questionId));
        return questions.filter((q) => !answeredQuestionsId.includes(q.questionId));
    }

    const emptyAnswers = findEmptyAnswers();
    // console.log(emptyAnswers);


    function handleClick () {
        setShowResultButton(false)
    }

    function listCorrectAnswers() {
        setShowCorrectAnswers(true)
        setShowInCorrectAnswers(false)
        setShowEmptyAnswers(false)
    }

    function listInCorrectAnswers() {
        setShowCorrectAnswers(false)
        setShowInCorrectAnswers(true)
        setShowEmptyAnswers(false)
    }

    function listEmptyAnswers() {
        setShowCorrectAnswers(false)
        setShowInCorrectAnswers(false)
        setShowEmptyAnswers(true)
    }


    const buttons = document.querySelectorAll('.result-button');

    buttons.forEach(button => button.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));

        button.classList.add('active');
    }))

    return(
        <> <div id='result-container'>
        {
            showResultButton ? (
        <button id='show-result' onClick={handleClick}>Sonuçlar Göster</button>
        
        ):
        
        <div className='results'>
            
            <div className='result-brief'>
                <p>{correctAnswers.length} Doğru </p>
                <p>{inCorrectAnswers.length} Yanlış </p>
                <p>{emptyAnswers.length} Boş </p>
            </div>

            <div className='result-buttons'>
                <button className='result-button' onClick={() => listCorrectAnswers()}>
                    Doğru Yanıtlar
                </button>
                <button className='result-button' onClick={() => listInCorrectAnswers()}>
                    Yanlış Yanıtlar
                </button>
                <button className='result-button' onClick={() => listEmptyAnswers()}>
                    Boş Bırakılan Sorular
                </button>
            </div>

            <div className='result-detail'>
                {showCorrectAnswers &&
                    correctAnswers.map((question) => (
                        <div key={question.questionId}>
                            <p>{question.question}</p>
                            {question.options.map((option, index)=>  (
                                 <button className={`${option ===  question.answer ? 'correct' : ''}`} key={index}>{option}</button>
                            ))}
                            
                        </div>
                    ))} 
                {showInCorrectAnswers &&
                    inCorrectAnswers.map((question) => (
                        <div key={question.questionId}>
                            <p>{question.question}</p>
                            {question.options.map((option, index)=>  (
                                 <button className={`${option ===  question.answer ? 'correct' : ''}`} key={index}>{option}</button>
                            ))}
                        </div>
                    ))} 
                {showEmptyAnswers &&
                    emptyAnswers.map((question) => (
                        <div key={question.questionId}>
                            <p>{question.question}</p>
                            {question.options.map((option, index)=>  (
                                <button className={`${option ===  question.answer ? 'correct' : ''}`} key={index}>{option}</button>
                            ))}
                        </div>

                    ))}
            </div>
        </div>
            
        
        }
        </div>
        </>


    )
}

export default ResultContainer