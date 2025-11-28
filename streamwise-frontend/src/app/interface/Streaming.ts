export interface Streaming {
  id: number;
  name: string;
  active: boolean;
  category: string;
  price: number;
  billingDate: string;
  monthDuration: number;
  signatureImageCode: string;
  image?: string; 
}