"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type APIError = {
  error: string;
};

type APISuccess = {
  url: { url: string };
  text: string;
};

const languages = [
  { name: "Arabic", val: "ar" },
  { name: "Bulgarian", val: "bg" },
  { name: "Catalan", val: "ca" },
  { name: "Chinese", val: "zh-CN" },
  { name: "Czech", val: "cs" },
  { name: "Danish", val: "da" },
  { name: "Dutch", val: "nl" },
  { name: "English", val: "en" },
  { name: "French", val: "fr" },
  { name: "German", val: "de" },
  { name: "Greek", val: "el" },
  { name: "Hebrew", val: "iw" },
  { name: "Hindi", val: "hi" },
  { name: "Hungarian", val: "hi" },
  { name: "Icelandic", val: "is" },
  { name: "Indonesian", val: "id" },
  { name: "Italian", val: "it" },
  { name: "Japanese", val: "ja" },
  { name: "Korean", val: "ko" },
  { name: "Kannada", val: "kn" },
  { name: "Latvian", val: "lv" },
  { name: "Marathi", val: "mr" },
  { name: "Norwegian", val: "no" },
  { name: "Polish", val: "pl" },
  { name: "Portuguese", val: "pt-PT" },
  { name: "Romanian", val: "ro" },
  { name: "Russian", val: "ru" },
  { name: "Slovak", val: "sk" },
  { name: "Swedish", val: "sv" },
  { name: "Swahili", val: "sw" },
  { name: "Spanish", val: "es" },
  { name: "Slovenian", val: "sl" },
  { name: "Turkish", val: "tr" },
  { name: "Ukrainian", val: "uk" },
  { name: "Vietnamese", val: "vi" },
  { name: "Tamil", val: "ta" },
  { name: "Telugu", val: "te" },
  { name: "Thai", val: "th" },
  { name: "Urdu", val: "ur" },
  { name: "Welsh", val: "cy" },
];

const Demo = () => {
  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");
  const [url, setUrl] = useState("");
  const convertToSpeech = async ({ message }: { message: Blob | null }) => {
    try {
      setLoading(true);
      if (!message) {
        return;
      }

      const mp3File = new File([message], "audio.mp3", { type: "audio/mp3" });

      const response = await fetch(`/api/upload?filename=${mp3File.name}`, {
        method: "POST",
        body: mp3File,
      });

      let url = "";

      if (response.ok) {
        const resurl = await response.json();
        url = resurl.url;
      } else {
        console.log(response.statusText);
      }
      let lang = languages.filter(l => l.name === value)[0].val

      const res = await fetch("https://verbavo.raavinarayana212.workers.dev/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, lang}),
      });
      const json = await res.json();

      if (!res.ok) {
        const { error } = json as APIError;
      }
      console.log(json);

      const { text } = json as APISuccess;
      setText(text);
      setUrl(json.url.url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [message, setMessage] = useState<Blob | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<any>();
  const [value, setValue] = useState("English");
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
            <p className="break-all">
              https://verbavo.raavinarayana212.workers.dev
            </p>
          </div>
        </div>
        <div className="relative flex  justify-center  items-center gap-5 mt-6 h-full ">
          {(!recording && !message) && (
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
              <Button disabled={loading} variant={"secondary"}  className="flex items-center gap-x-2" onClick={()=>setMessage(null)}>
              <span>Retry</span>
               

              </Button>
              <Button
                disabled={loading}
                className="h-9 w-full sm:w-fit"
                onClick={() => {
                  convertToSpeech({ message });
                }}
              >
                Convert Speech
              </Button>
            </div>
          )}

          <Select
            disabled={loading}
            onValueChange={(value) => {setValue(value)}}
            value={value}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language, index) => (
                <SelectItem value={language.name} key={index}>
                  {language.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="h-32 mt-4 rounded-lg border-2 border-dashed border-zinc-300 text-sm flex items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-4 h-5 animate-spin" />
              <p>Converting to {value}</p>
            </div>
          ) : (
            <div className="flex gap-y-3 flex-col items-center">
              <audio controls src={url} />
              <p>{text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;
