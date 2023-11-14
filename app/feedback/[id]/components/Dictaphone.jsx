import React, { useEffect, useState } from 'react';
import "babel-polyfill";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Dictaphone = ({setDesc}) => {
  const {
    transcript,
    listening,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: lang,
    });
  };
  
  useEffect(() => {
    if (finalTranscript !== '') {
      console.log('Got final result:', finalTranscript);
    }
  }, [interimTranscript, finalTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  useEffect(() => {
    setDesc(transcript)
  }, [transcript])
  
  const [use, setuse] = useState(false)
  const [lang, setlang] = useState(false)
  return !use?(
    !lang?(<button onClick={()=>{
        setlang("hi-IN")
    }} className=' py-1 px-3 bg-slate-100 border-2 border-slate-100 text-orange-600 hover:text-slate-100 hover:bg-orange-600 rounded-2xl transition-all'>Use speech recognition</button>)
    :( <div className=' flex flex-row gap-2 w-full justify-center items-center'>
        <button onClick={()=>{
            setlang("hi-IN")
            setuse(true)
        }} className=' py-1 px-3 bg-slate-100 border-2 border-slate-100 text-orange-600 hover:text-slate-100 hover:bg-orange-600 rounded-2xl transition-all'>Hindi</button>
        <button onClick={()=>{
            setlang("gu-IN")
            setuse(true)
        }} className=' py-1 px-3 bg-slate-100 border-2 border-slate-100 text-orange-600 hover:text-slate-100 hover:bg-orange-600 rounded-2xl transition-all'>Gujarati</button>
        <button onClick={()=>{
            setlang("en-IN")
            setuse(true)
        }} className=' py-1 px-3 bg-slate-100 border-2 border-slate-100 text-orange-600 hover:text-slate-100 hover:bg-orange-600 rounded-2xl transition-all'>English</button>
    </div>)
  ):(
    <div className=' flex flex-col gap-2 w-full justify-center items-center'>
      <p className=' text-xl font-medium'>Microphone: {listening ? 'on' : 'off'}</p>
      <div className=' flex flex-row gap-4 '>
      <button className=' py-1 px-3 bg-slate-100 border-2 border-slate-100 text-orange-600 hover:text-slate-100 hover:bg-orange-600 rounded-2xl transition-all' onClick={listenContinuously}>Start</button>
      <button className=' py-1 px-3 bg-slate-100 border-2 border-slate-100 text-orange-600 hover:text-slate-100 hover:bg-orange-600 rounded-2xl transition-all' onClick={SpeechRecognition.stopListening}>Stop</button>
      <button className=' py-1 px-3 bg-slate-100 border-2 border-slate-100 text-orange-600 hover:text-slate-100 hover:bg-orange-600 rounded-2xl transition-all' onClick={resetTranscript}>Reset</button>
      </div>
      {/* <p>{transcript}</p> */}
    </div>
  );
};
export default Dictaphone;