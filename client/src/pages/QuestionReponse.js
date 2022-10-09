import React, { useState } from 'react';
import questionReponse from '../datas/data';
import QandR from '../components/QandR';

const QuestionReponse = () => {

    const [questions, setQuestions] = useState(questionReponse)
    return (
        <section className='w-full my-10 mx-8 flex items-center flex-col'>
            <h1 className='text-2xl my-4 text-greenV2'>Questions & Réponses</h1>
            {questions.map((question)=>{
                return <QandR key={question.id}  {...question} />
            })}
        </section>
    );
};

export default QuestionReponse;