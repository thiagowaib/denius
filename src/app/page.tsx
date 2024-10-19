'use client';
import { lazy, useEffect, useRef, useState } from "react";
import Loading from "./_components/Loading";
import { IDino } from "../interfaces/IDino";

const DinosaurCarrosel = lazy(() => import('./_components/DinosaurCarrosel'))
export default function Home() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [dinoData, setDinoData] = useState<IDino[]>();
  const fUE = useRef(false);

  useEffect(()=>{
    if(!fUE.current) {
      fUE.current = true;
      fetch(`/api/dinosaurs`)
      .then(res => res.json())
      .then(data => {
        setDinoData(data);
        setLoading(false);
      })
    }
  }, [])

  return (<>
    <h1 className=" mx-auto w-fit text-center font-mono font-semibold text-3xl cursor-default"> Welcome to <br/>
      <span className="font-serif font-extrabold text-6xl italic ">Denius</span>
    </h1>

    <p className="mb-10 w-fit mx-auto mt-10 text-md font-mono italic md:text-2xl cursor-default">Click on a dino below to learn more 🦖</p>
    
    <nav className="mb-16 w-full inline-flex flex-nowrap">
      {!isLoading ? <DinosaurCarrosel data={dinoData}/> : <Loading/>}
      <div className="absolute left-0 bg-gradient-to-r w-24 h-14 z-20 from-gray-950 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 bg-gradient-to-l w-24 h-14 z-20 from-gray-950 to-transparent pointer-events-none"></div>
    </nav>
  </>);
}