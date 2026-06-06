export interface Agent {
  id: string;
  name: string;
  role: string;
  expertise: string;
  avatar: string;
  bgColor: string;
  greeting: string;
  tips: string[];
}

export interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
}
