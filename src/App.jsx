import React, { useRef, useState } from 'react';
import Typewriter from "typewriter-effect";
import './App.css'
import bgvid1 from './assets/bgvid2.mp4' 

function App() {

  const [generatedText, setGeneratedText] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const [apikey, setapikey] = useState("")

  const textGenerator = async () => {
    if (inputRef.current.value === "") {
      return;
    }
    setLoading(true);

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apikey}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a senior developer with 15 years of experience, your job is to critique codes and suggest changes,also be funny when you find basic mistakes,if you find a question that is too simple then say you should know this." },
            { role: "user", content: inputRef.current.value },
          ],
        }),
      }
    );

    
//You are a helpful assistant.
if (response.ok) {
  const data = await response.json();
  const generatedText = data.choices[0].message.content;
  setGeneratedText(generatedText);
} else {
  console.error("API error: ${response.status} - ${response.statusText}");
}

setLoading(false);
};




  return (
    <>
    <div className='w-full flex bg-black'>
      <div className='w-1/3 h-screen'>
        <video className='w-full h-full object-cover' src={bgvid1} autoPlay loop muted/>
      </div>
      <div className='w-2/3 items-center' >
      <div className='text-white text-5xl font-mono flex items-center w-full h-full max-h-24 mt-5 justify-center'> 
      <Typewriter
                onInit={(typewriter) => {
                    typewriter
                        .typeString("Hi Geeks.")
                        .pauseFor(1000)
                        .deleteAll()
                        .typeString("Welcome to your codebuddy.")
                        .deleteAll()
                        .start()
                }}
                options={{
                  strings: ['Hi Geeks.', 'Welcome to your codebuddy.'],
                  autoStart: true,
                  loop: true,
                }}
            />
      </div>
      <div className='w-2/3 h-2/3 bg-black mx-auto my-3 rounded-3xl'>
        <div className='p-5'>
          <div className='w-full flex justify-center'>
          <label className='text-white text-md font-mono mx-5' htmlFor="key">Enter your api key</label>
          </div>
          <div className='w-full flex justify-center'>
          <input type='text' value={apikey} onChange={(e)=>setapikey(e.target.value)} id='key' className='bg-black shadow-xxl w-full p-2 text-sm text-center border-white border-2 rounded-md text-white' placeholder='<APIkey>'></input>
          </div>
        </div>
      <div className='h-1/4 p-5 flex items-center'>
          <input className='shadow-xxl w-full h-12 mr-5 bg-transparent text-white border-2 rounded-lg text-center' ref={inputRef} placeholder='<enter your prompt here>'></input>
          <button className='text-white bg-blue-700 p-2 rounded-lg' onClick={textGenerator}>Submit</button>
        </div>
        <div className='h-3/4 p-5 flex items-center justify-center'>
          <textarea
          readOnly 
          className='shadow-xxl w-full h-full p-3 bg-transparent text-white border-2 text-center rounded-lg bg-gray-300 items-center' 
          placeholder='<Generated text will appear here>'
          value={loading ? ("Loading...") : (generatedText || "")}></textarea>
        </div>
        
      </div>
      </div>
    </div>
    </>
  )
}

export default App