import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Check, Star } from "lucide-react";
import Demo from "@/components/demo";

import YoutubePlayer from "@/components/youtube-player";
import CodeSection from "@/components/code-section";
import { Icons } from "@/components/icons";


export default function Home() {
  return (
    <div className="bg-[#FCF3E4]  ">
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:grid lg:grid-cols-2 sm:pb-32 lg:gap-x-8 lg:px-8 lg:pt-32 lg:pb-52">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-lg text-center sm:text-left flex flex-col items-center lg:items-start">
              <h1
                className={cn(
                  "relative tracking-tight sm:text-left mt-10 font-bold !leading-[4rem] text-[#65372A] text-5xl md:text-7xl"
                )}
              >
                <span className="whitespace-nowrap">Verbavo</span>
                API
              </h1>
              <p className="mt-8 text-lg lg:pr-10 text-center lg:text-left text-balance md:text-wrap">
                Convert audio to speech with Verbavo API. Easily process audio
                files and customize the output speech according to your needs.
              </p>
              <ul className="mt-8 space-y-2 font-medium flex flex-col items-center sm:items-start">
                <div className="space-y-2">
                  <li className="flex gap-1.5 items-center text-left">
                    <Check className="h-5 w-5 shrink-0 text-[#65372A]" />{" "}
                    Process audio files to chosen speech format
                  </li>
                  <li className="flex gap-1.5 items-center">
                    <Check className="h-5 w-5 shrink-0 text-[#65372A]" />{" "}
                    Customizable speech output options
                  </li>
                  <li className="flex gap-1.5 items-center">
                    <Check className="h-5 w-5 shrink-0 text-[#65372A]" /> Easy
                    integration into your applications
                  </li>
                </div>
              </ul>
            </div>
          </div>
          <div className="relative px-8 sm:px-16 md:px-0 mt-28 md:mx-auto md:max-w-xl w-full lg:mx-0 lg:mt-20">
            <Demo />
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>
      <section className="bg-[#65372A] px-4">
        <div className="mx-auto max-w-6xl gap-6 pb-24 pt-20 sm:pb-32 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="w-full flex flex-col">
            <div className="flex justify-center text-center">
              <h2 className="font-heading text-5xl  text-gray-50 lg:text-6xl font-bold leading-tight text-balance sm:leading-none tracking-tight">
              &quot;Enhance audio{" "}
                <span className="bg-[#FCF3E4] text-[#65372A] font-scary px-3">
                  conversion
                </span>{" "}
                with Verbavo API&quot;
              </h2>
            </div>
            <p className="text-center mx-auto mt-12 text-lg max-w-xl text-balance text-[#FCF3E4]">
              <span className="font-semibold">Convert audio efficiently.</span>{" "}
              Simplify audio conversion tasks with Verbavo API, making your
              application more versatile.
            </p>
            <Icons.arrow className="h-60 -mt-4 text-[#FCF3E4] fill-zinc-400 pointer-events-none select-none" />

            <p className="mt-6 text-[#FCF3E4]  sm:mt-12 z-10 text-center mx-auto text-3xl font-semibold">
              Optimize audio processing with Verbavo API...
            </p>
            <div className="grid gap-40 sm:grid-cols-2 sm:gap-16 max-w-3xl mx-auto mt-40 text-center">
              <div className="relative z-10">
                <div className="absolute -z-10 left-1/2 -translate-x-1/2 -top-[90px]">
                  <img
                    alt="shocked-emoji"
                    src="/shocked-emoji.png"
                    className="h-24 relative -z-10 select-none"
                  />
                </div>
                <p className="font-semibold mt-2 text-[#FCF3E4] text-lg">
                  ...streamlines audio tasks
                </p>
                <p className="mt-2 text-white text-balance">
                  Optimize audio conversion processes, improving workflow
                  efficiency.
                </p>
              </div>
              <div className="relative z-10">
                <div className="absolute -z-10 left-1/2 -translate-x-1/2 -top-[90px]">
                  <img
                    alt="swear-emoji"
                    src="/happ.webp"
                    className="relative -z-10 h-24 select-none"
                  />
                </div>
                <p className="font-semibold mt-2 text-[#FCF3E4] text-lg">
                  ...enhances user experience
                </p>
                <p className="mt-2 text-white text-balance">
                  Deliver a seamless audio conversion experience to users.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id='video-demo' className='bg-[#FCF3E4] '>
        <div className='mx-auto max-w-6xl gap-6 pb-24 pt-10 sm:pb-32 lg:gap-x-8 lg:px-8 lg:py-40'>
          <h2 className='mx-auto text-balance text-5xl sm:text-6xl text-center font-bold leading-[4.25rem] tracking-tight max-w-2xl text-slate-900'>
            See Verbavo API in <span className='px-2 bg-[#65372A] text-[#FCF3E4]'>action</span>
          </h2>

          <p className='text-center mx-auto mt-12 text-lg max-w-xl text-balance'>
            <span className='font-semibold'>
              Simplify audio conversion with Verbavo API!
            </span>{' '}
            Watch how Verbavo API processes audio files efficiently.
          </p>

          <div className='relative mx-4 rounded-xl aspect-video md:mx-auto max-w-4xl mt-12 bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl lg:p-4'>
            <YoutubePlayer />
            <div
              aria-hidden='true'
              className='absolute -left-52 top-1/4 z-10 select-none'>
              <img alt='3-min-demo' src='/3mindemo.png'  />
            </div>
          </div>

          <div
            id='api'
            className='w-full flex flex-col items-center mt-12 px-4'>
            <p className='font-bold text-xl my-4'>Get started with Verbavo API</p>
            <div className='relative max-w-2xl w-full text-left p-5 bg-[#1e1e1e] rounded-xl shadow'>
              <CodeSection />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
