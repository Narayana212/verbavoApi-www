"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { convertSpeech } from "@/actions";
import Link from "next/link";
import {
  Circle,
  CircleDot,
  Loader2,
  Mic,
  Save,
  StopCircle,
} from "lucide-react";
import { useRef } from "react";
import { useEffect } from "react";


type APIError = {
  error: string
}

type APISuccess = {
  url: { url: string },
  text: string
}

const Demo = () => {

  const [loading,setLoading]=useState(false)

  const [text,setText]=useState("");
  const [url,setUrl]=useState("");
  const convertToSpeech = async ({ message }: { message: Blob | null }) => {
    try {
      setLoading(true);
      if(!message){
        return;
      }
      
      const formData = new FormData();
      const mp3File = new File([message], "audio.mp3", { type: "audio/mp3" })
      formData.append("file", mp3File, "audio.mp3");
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      let url=""
      
      if (response.ok) {
        const resurl = await response.json();
        url=resurl.url
        
       
      } else {
        console.log(response.statusText)
      }


      
      const res = await fetch('http://127.0.0.1:8787/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url, lang: "hi" }),
    })
    const json = await res.json()
    
    if (!res.ok) {
      const { error } = json as APIError
     
    }
    console.log(json)
    
  
    const {text }=json as APISuccess
    setText(text)
    setUrl(json.url.url)
    } catch (error) {

      console.log(error)
    }finally{
      setLoading(false)
    }
  };

  

  const [message, setMessage] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<any>();

  // State to track whether recording is currently in progress
  const [recording, setRecording] = useState(false);

  // Ref to store audio chunks during recording
  const chunks: any = useRef([]);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
      setRecording(true);
    }
  };

  // Function to stop the recording
  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  // Function to initialize the media recorder with the provided stream
  const initialMediaRecorder = (stream: MediaStream) => {
    const mediaRecorder = new MediaRecorder(stream);

    // Event handler when recording starts
    mediaRecorder.onstart = () => {
      chunks.current = []; // Resetting chunks array
    };

    // Event handler when data becomes available during recording
    mediaRecorder.ondataavailable = (ev) => {
      chunks.current.push(ev.data); // Storing data chunks
    };

    // Event handler when recording stops
    mediaRecorder.onstop = () => {
      // Creating a blob from accumulated audio chunks with WAV format
      const audioBlob1 = new Blob(chunks.current, { type: "audio/wav" });
      setMessage(audioBlob1);
      console.log(audioBlob1);
    };

    setMediaRecorder(mediaRecorder);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(initialMediaRecorder);
    }
  }, []);



  return (
    <div className="flex flex-col gap-5 items-center">
      <div className="relative w-full rounded-xl mt-12 bg-gray-900/5 p-4 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center rounded-md bg-[#65372A] px-3 py-1 text-xs font-medium text-white ring-1 ring-inset ring-blue-400/20">
              POST
            </span>
            <div className="h-[20px] w-px bg-zinc-300" />
            <p className="break-all"></p>
          </div>
        </div>
        <div className="relative flex  justify-center  items-center gap-5 mt-6 h-full ">
          {!recording && (
            <Button
              onClick={startRecording}
              size={"icon"}
              className="rounded-full"
            >
              <Mic className="  rounded-full" />
            </Button>
          )}

          {recording && (
            <>
              <CircleDot className="text-red-500 w-7 h-7 animate-pulse duration-700" />
              <Button
                onClick={stopRecording}
                className="flex items-center gap-x-2"
              >
                <span>Save</span>
                <Save />
              </Button>
            </>
          )}

          {message && (
            <div className="flex items-center gap-x-3">
              <Button
            disabled={loading}
                className="h-9 w-full sm:w-fit"
                onClick={() => {
                  convertToSpeech({message})
                }}
              >
                Convert Speech
              </Button>
            </div>
          )}
        </div>

        <div className="h-32 mt-4 rounded-lg border-2 border-dashed border-zinc-300 text-sm flex items-center justify-center">
          {loading?(
            <div className="flex flex-col items-center">
              <Loader2 className="w-4 h-5 animate-spin"/>
              <p>Converting to Hindi</p>

            </div>
          ):(
            <div className="flex gap-y-3 flex-col items-center" >
              <audio  controls src={url}/>
              <p>{text}</p>

              </div>
          )
          }
        
        </div>
      </div>
    </div>
  );
};

export default Demo;
