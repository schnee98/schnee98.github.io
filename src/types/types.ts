import { contacts } from "@/constants/contacts";

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  content: string;
}

export interface ContactContent {
  emoji: string;
  text: string;
  href?: string;
}

export type ContactName = keyof typeof contacts;
