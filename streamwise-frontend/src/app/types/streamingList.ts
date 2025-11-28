
import { Streaming } from "../interface/Streaming"

export const STREAMINGS: Streaming[] = [
  { id: 0, name: 'Netflix', image: 'https://img.icons8.com/?size=100&id=...', active: true, category: 'STREAMING', price: 0, monthDuration: 1, billingDate: '2025-01-01', signatureImageCode: 'NETFLIX' },
  { id: 1, name: 'Prime Video', image: 'https://img.icons8.com/?size=100&id=...', active: true, category: 'STREAMING', price: 0, monthDuration: 1, billingDate: '2025-01-01', signatureImageCode: 'PRIME' },
  { id: 2, name: 'Disney Plus', image: 'https://img.icons8.com/?size=100&id=...', active: true, category: 'STREAMING', price: 0, monthDuration: 1, billingDate: '2025-01-01', signatureImageCode: 'DISNEY' },
  { id: 3, name: 'HBO Max', image: 'https://img.icons8.com/?size=100&id=...', active: true, category: 'STREAMING', price: 0, monthDuration: 1, billingDate: '2025-01-01', signatureImageCode: 'HBO' },
  { id: 4, name: 'Paramont', image: 'https://img.icons8.com/?size=100&id=...', active: true, category: 'STREAMING', price: 0, monthDuration: 1, billingDate: '2025-01-01', signatureImageCode: 'PARAMONT' },
  { id: 5, name: 'Globoplay', image: 'https://img.icons8.com/?size=100&id=...', active: true, category: 'STREAMING', price: 0, monthDuration: 1, billingDate: '2025-01-01', signatureImageCode: 'GLOBOPLAY' },
];


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