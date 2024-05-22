import React, {useState} from 'react';
import './App.css';

import QuestionContainer from './components/questions/QuestionContainer'

function App() {

  const [showQuestions, setShowQuestions] = useState(false);

  return (
    <>

    <div>
      {!showQuestions ?
            <div id='start'>
                <button onClick={()=> setShowQuestions(true)}> 
                Teste Başla
                </button>
                <p>Test, çoktan seçmeli 10 sorudan oluşmaktadır. Kolaylıklar.</p>
            </div>
      :
      <QuestionContainer /> 
      } 
    </div>

      
    </>
  )
}

export default App
