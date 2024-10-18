'use client';
import { useEffect, useState } from "react";
import { IDino } from "../interfaces/IDino";
import Link from "next/link";
import Loading from "./_components/Loading";

export default function Home() {

  const [isLoading, setLoading] = useState<boolean>(true);
  const [dinosaurs, setDinosaurs] = useState<IDino[]>();

  useEffect(() => {
    fetch(`http://localhost:3000/api/dinosaurs`)
    .then(res => res.json())
    .then(data => {
        setDinosaurs(data);
        setLoading(false);
    })
  }, [])

  return (<>
    <h1 className=" mx-auto w-fit text-center font-mono font-semibold text-3xl cursor-default"> Welcome to <br/>
      <span className="font-serif font-extrabold text-6xl italic ">Denius</span>
    </h1>

    <p className="mb-10 w-fit mx-auto mt-10 text-md font-mono italic md:text-2xl cursor-default">Click on a dino below to learn more 🦖</p>
    
    <nav className="mb-16 w-full inline-flex flex-nowrap">
      {isLoading && <Loading/>}
      <div className="flex intems-center justify-center md:justify-start z-10 animate-infinite-scroll">
      {!isLoading && dinosaurs?.map((dino: IDino) => {
          return (
            <Link className="mx-4 text-nowrap py-2 text-center px-4 rounded-2xl hover:bg-green-400 hover:text-gray-950 transition-colors font-semibold font-serif italic hover:cursor-pointer flex items-center border-green-400 border-2" key="dino.name" href={`/dinosaurs/${dino.name.toLowerCase()}`}>
              {dino.name}
            </Link>
          )
        })
      }
      </div>
      <div className="absolute left-0 bg-gradient-to-r w-24 h-14 z-20 from-gray-950 to-transparent pointer-events-none"></div>
      <div className="absolute right-0 bg-gradient-to-l w-24 h-14 z-20 from-gray-950 to-transparent pointer-events-none"></div>
    </nav>
  </>);
}