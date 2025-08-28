
import { Streaming } from "../interface/Streaming"

export const STREAMINGS: Streaming[] = [

    { name: 'Netflix', image: 'https://img.icons8.com/?size=100&id=20519&format=png&color=000000' },
    { name: 'Prime Video', image: 'https://img.icons8.com/?size=100&id=Rs68BrhxH0XZ&format=png&color=000000' },
    { name: 'Disney Plus', image: 'https://img.icons8.com/?size=100&id=PIBuqGDN2nPm&format=png&color=000000' },
    { name: 'HBO Max', image: 'https://img.icons8.com/?size=100&id=9tVdlpWe1F9k&format=png&color=000000' },
    { name: 'Paramont', image: 'https://img.icons8.com/?size=100&id=Ggt3oh6aoRWh&format=png&color=000000' },
    { name: 'Globoplay', image: 'https://img.icons8.com/?size=100&id=cdS20W1QGgDD&format=png&color=000000' }

]

export const codeToName: Record<string, string> ={

    NETFLIX: "Netflix",
    PRIMEVIDEO: "Prime Video",
    DISNEYPLUS: "Disney Plus",
    HBOMAX: "HBO Max",
    PARAMONT: "Paramont",
    GLOBOPLAY: "Globoplay"

};

export function getStreamingByCode(code: string): Streaming | undefined {
    const formattedName = codeToName[code];

    return STREAMINGS.find(s => s.name === formattedName);
}