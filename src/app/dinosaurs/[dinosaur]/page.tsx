'use client';

import { useEffect, useState } from "react";
import { IDino } from "../../../interfaces/IDino";
import { notFound } from "next/navigation";
import Link from "next/link";

export default function DinosaurDetail(context : {
    params: {
        dinosaur: string
    }
}) {
    const [dino, setDino] = useState<IDino>();
    useEffect(() => {
      (async () => {
          const res = await fetch(`http://localhost:3000/api/dinosaurs/${context.params.dinosaur}`);
          const details = await res.json() as IDino;
          setDino(details);
      })();
    }, [])


    if(dino?.name) {
        return (<>
        <section className="flex flex-col border-2 border-gray-50 p-4 rounded-md">
            <h1 className="italic md:text-4xl text-center font-serif font-bold">~ {dino.name} ~</h1>
            <p className="italic md:text-2xl mt-2 text-center">
                <span className="md:text-4xl text-2xl mr-1 italic">"</span>
                    {dino.description.replace(/\"/gi,"\`")}
                <span className="md:text-4xl text-2xl ml-1 italic">"</span>
            </p>
        </section>
        <Link className="mt-2 md:text-xl italic font-semibold cursor-pointer hover:text-teal-400 transition-colors" href="/">[i want to know more 🦕]</Link>
    </>)
    } else {
        return (<></>)
    }
}