'use client';
import { useEffect, useState } from "react";
import { IDino } from "../interfaces/IDino";
import Link from "next/link";

export default function Home() {

  const [dinosaurs, setDinosaurs] = useState<IDino[]>();
  useEffect(() => {
    (async () => {
      if(dinosaurs?.length>=1) { return; }
        const res = await fetch(`http://localhost:3000/api/dinosaurs`);
        const dinos = await res.json() as IDino[];
        setDinosaurs(dinos);
    })();
  }, [])

  return (<>
    <h1 className=" mx-auto w-fit text-center font-mono font-semibold text-3xl"> Welcome to <br/>
      <span className="font-serif font-extrabold text-6xl italic">Denius</span>
    </h1>

    <p className="mb-10 w-fit mx-auto mt-10 text-2xl font-mono italic">[Click on a dino below to learn more 🦖]</p>
    
    <nav className="mb-16 w-full inline-flex flex-nowrap [mask-image:_linear-gradient(to_right, transparent_0, _black_128px, _black_calc(100%-200px, transparent_100%))">
      <div className="flex intems-center justify-center md:justify-start animate-infinite-scroll">
      {
        dinosaurs?.map((dino: IDino) => {
          return (
            <Link className="mx-4 px-4 rounded-2xl hover:bg-green-400 hover:text-gray-950 transition-colors font-semibold font-serif italic hover:cursor-pointer flex items-center border-green-400 border-2" key="dino.name" href={`/api/dinosaurs/${dino.name.toLowerCase()}`}>
              {dino.name}
            </Link>
          )
        })
      }
      </div>
    </nav>
  </>);
}