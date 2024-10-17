import data from "./data.json" with { type: "json" }

export async function GET() {
    let dataRandomized = [];
    data.forEach(() => {
        dataRandomized.push(data[Math.floor(Math.random()*data.length)]);
    })
    return Response.json(dataRandomized);
}