import Link from "next/link";
import { IDino } from "../../interfaces/IDino";

export default function DinosaurCarrosel(context:{data:IDino[]}) {
    return (
      <div className="flex items-center justify-center z-10 animate-infinite-scroll">
      {context.data?.map((dino: IDino) => {
          return (
            <Link className="mx-4 text-nowrap py-2 text-center px-4 rounded-2xl hover:bg-green-400 hover:text-gray-950 transition-colors font-semibold font-serif italic hover:cursor-pointer flex items-center border-green-400 border-2" key={`${dino.name}-${Math.random()}`} href={`/dinosaurs/${dino.name.toLowerCase()}`}>
              {dino.name}
            </Link>
          )
        })
      }
      </div>
    );
}