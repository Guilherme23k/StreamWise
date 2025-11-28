export interface StreamingSelect {
  name: string;
  image: string;
}

// Lista de streaming pra escolha (mock) - só pra modal
export const STREAMINGS_SELECT: StreamingSelect[] = [
  { name: 'Netflix', image: 'https://img.icons8.com/?size=100&id=...' },
  { name: 'Prime Video', image: 'https://img.icons8.com/?size=100&id=...' },
  { name: 'Disney Plus', image: 'https://img.icons8.com/?size=100&id=...' },
  { name: 'HBO Max', image: 'https://img.icons8.com/?size=100&id=...' },
  { name: 'Paramont', image: 'https://img.icons8.com/?size=100&id=...' },
  { name: 'Globoplay', image: 'https://img.icons8.com/?size=100&id=...' },
];

export const codeToName: Record<string, string> = {
  NETFLIX: "Netflix",
  PRIMEVIDEO: "Prime Video",
  DISNEYPLUS: "Disney Plus",
  HBOMAX: "HBO Max",
  PARAMONT: "Paramont",
  GLOBOPLAY: "Globoplay"
};

// Função para pegar a StreamingSelect pela "code"
export function getStreamingByCode(code: string): StreamingSelect | undefined {
  const formattedName = codeToName[code];
  return STREAMINGS_SELECT.find(s => s.name === formattedName);
}
