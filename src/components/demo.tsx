"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useMutation } from "@tanstack/react-query";
import { convertSpeech } from "@/actions";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const Demo = () => {
  const [message, setMessage] = useState<string>(
    "https://wzzekdmg0oztnuis.public.blob.vercel-storage.com/Power_English_Update-%5BAudioTrimmer.com%5D-qEAmBsWf34ZSWpL46OKGIrws9fsJ3T.mp3"
  );

  const { data, mutate, isPending, error } = useMutation({
    mutationKey: ["speech-to-speech"],
    mutationFn: convertSpeech,
    onSettled: (data) => {
      if (data && "error" in data) {
        throw new Error(data.error);
      }
    },
  });

  const successData = data && !("error" in data) ? data : undefined;

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
        <div className="relative flex flex-col sm:flex-row items-center gap-2 mt-6 h-full sm:h-9">
          <Input
            className="bg-white h-9"
            value={message}
            onChange={({ target }) => {
              setMessage(target.value);
            }}
          />
          <Button
            disabled={isPending}
            className="h-9 w-full sm:w-fit"
            onClick={() => mutate({ message })}
          >
            Convert Speech
          </Button>
        </div>

        <div className="h-32 mt-4 rounded-lg border-2 border-dashed border-zinc-300 text-sm flex items-center justify-center">
          {successData ? (
            <div className="flex flex-col items-center text-center">
              <audio controls src={successData.url.url} />

              <p className="text-sm mt-5 text-zinc-700">{successData.text}</p>
            </div>
          ) : isPending ? (
            <div className="">
              <Loader2 className="w-4 h-4 animate-spin" />
            </div>
          ) : (
            <p className="text-zinc-700">Results will be shown here</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Demo;
