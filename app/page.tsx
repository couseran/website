'use client'

import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  
  const totSecInADay = 24*3600
  const totSec10InADay = 10*100*100

  function getTime10() {
    const date = new Date()
    const currSec = date.getHours()*3600 + date.getMinutes()*60 + date.getSeconds()
    const currSec10 = currSec * totSec10InADay/totSecInADay
    const hour10 = Math.floor(currSec10/(100*100))
    const min10 = Math.floor((currSec10 - hour10*100*100)/100)
    const sec10 = Math.floor((currSec10 - hour10*100*100 - min10*100))
    return `${hour10.toString().padStart(2,'0')}:${min10.toString().padStart(2,'0')}:${sec10.toString().padStart(2,'0')}`
  }

  const [printedTime, setPrintedTime] = useState(getTime10())

  useEffect(() => {
    const interval = setInterval(() => {
    setPrintedTime(getTime10())
    }, 1000);

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-16 px-16 bg-white dark:bg-black">
        <span className="flex flex-col md:flex-row text-8xl gap-24">
          {printedTime.split(':').map((char, idx) => {
            return <div key={idx} className="w-36 text-center md:text-start">{char}</div>
          })}
        </span>
      </main>
    </div>
  );
}
