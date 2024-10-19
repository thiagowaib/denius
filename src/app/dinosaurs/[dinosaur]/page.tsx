'use client';

import { useEffect, useState } from "react";
import { IDino } from "../../../interfaces/IDino";
import Link from "next/link";
import Loading from "../../_components/Loading";

export default function DinosaurDetail(context: { params: { dinosaur: string } }) {
  const [dino, setDino] = useState<IDino | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
  const [error, setError] = useState<boolean>(false); // Estado de erro

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/dinosaurs/${context.params.dinosaur}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const details = await res.json() as IDino;
        setDino(details);
      } catch (err) {
        console.error(err)
        setError(true);
      } finally {
        setLoading(false); // Finaliza o carregamento
      }
    })();
  }, [context.params.dinosaur]);

  return (
    <>
      <section className="flex mx-2 md:w-1/2 w-2/3 h-40 justify-center flex-col border-2 border-gray-50 p-4 rounded-md">
        {
        loading ? <Loading/> : 
        (error || !dino) ?  <p className="text-lg font-semibold italic text-red-500">Dinosaur not found.</p> :
        <>
            <h1 className="italic md:text-4xl text-center font-serif font-bold">~ {dino.name} ~</h1>
            <p className="italic md:text-2xl mt-2 text-center">
            <span className="md:text-4xl text-2xl mr-1 italic">&quot;</span>
            {dino.description.replace(/\"/gi, "`")}
            <span className="md:text-4xl text-2xl ml-1 italic">&quot;</span>
            </p>
        </>
        }
      </section>
      <Link className="mt-2 md:text-xl italic font-semibold cursor-pointer hover:text-teal-400 transition-colors" href="/">[ another dino ! 🦕 ]</Link>
    </>
  );
}
