"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'

export default function Page() {
  const [questions, setQuestions] = useState([{type: 'Short Answer', question: '', options:[]}])
  const types = ['Short Answer', 'Long Answer', 'MCQ']

  useEffect(() => {
    console.log(questions)
  }, [questions[0]])
  
  const inputRef = useRef(null);
  const updateQuestion = useCallback(
    (index, field, value) => {
      setQuestions((prevQuestions) => {
        const temp = [...prevQuestions];
        temp[index][field] = value;
        return temp;
      });
    },
    [setQuestions]
  );

  const Question=({el, index}) =>
  { 
    console.log(el)
    return(
    <div className=' flex flex-col w-full px-8 gap-5 text-slate-950'>
        <h1 className=' text-2xl'>Type</h1>
        <select defaultValue={el.type} onChange={(e)=>{
          setQuestions((prevQuestions) => {
            const temp = [...prevQuestions]; // Create a copy of the state array
            temp[index].type = e.target.value;
            return temp;
          });      
        }} className=' w-full p-5'>
          {types.map(e=><option key={e} value={e}>{e}</option>)}
        </select>
        <h1 className=' text-2xl'>Question</h1>
        <input id={`${index}q`} type='text' placeholder='Question' className=' w-full p-5 rounded-xl'></input>
        {questions[index].type==='MCQ' &&
          <><h1 className=' text-2xl'>Options</h1>
        <input id={`${index}o1`} type='text' placeholder='option1' className=' w-full p-5 rounded-xl'></input>
        <input id={`${index}o2`} type='text' placeholder='option2' className=' w-full p-5 rounded-xl'></input>
        <input id={`${index}o3`} type='text' placeholder='option3' className=' w-full p-5 rounded-xl'></input>
        <input id={`${index}o4`} type='text' placeholder='option4' className=' w-full p-5 rounded-xl'></input>
      </>}
      </div>
  )
      }

  return (
    <div className=' flex flex-col gap-4 w-full  px-24 overflow-y-scroll h-full'>
      
      {questions.map((el, index)=><Question key={index} el={el} index={index}/>)  }
      <button className=' text-6xl  py-4 px-6 w-full rounded-lg transition-all' onClick={()=>{setQuestions((prevQuestions)=>([...prevQuestions,{type: 'Short Answer', question: '', options:[]}]))}}>+</button>

    </div>
  )
}
