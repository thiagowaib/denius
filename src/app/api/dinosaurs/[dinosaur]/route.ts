import data from "../data.json" with {type: "json"};
import { NextRequest } from "next/server";

export function GET(req: NextRequest, context: {
    params: {dinosaur: string}
}) {
    if(!context?.params?.dinosaur) {
        return Response.json("No dinosaur name was provided");
    }

    const dino = data.find((i) => 
        i.name.toLowerCase() == context.params.dinosaur.toLowerCase()
    );

    return Response.json(dino ? dino : "No dinosaur found ._.");

}