export interface Post {
  id: string;
  title: string;
  description?: string;
  date?: string;
  time?: string;
  platforms: string[];
  image?: string;
  author?: string;
  likes: number;
  notes?: string;
  autoPost?: boolean;
}

export interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  sender: string;
}
