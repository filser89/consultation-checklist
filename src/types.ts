export interface Translation {
  appTitle: string;
  searchPlaceholder: string;
  clientPlaceholder: string;
  toList: string;
  toFocus: string;
  json: string;
  csv: string;
  reset: string;
  markDone: string;
  prev: string;
  next: string;
  notAnswered: string;
  updated: string;
  notesPlaceholder: string;
  complete: string;
  footer: string;
  yes: string;
  no: string;
  unknown: string;
}

export interface Answer {
  done?: boolean;
  choice?: string;
  notes?: string;
  touchedAt?: number;
}

export interface Question {
  id: string;
  type?: "boolean" | "text";
  text: Record<string, string>;
  showIf?: {
    id: string;
    equals: string;
  };
}

export interface RawSection {
  id: string;
  title: Record<string, string>;
  questions: Question[];
}

export interface ProcessedQuestion extends Omit<Question, 'text'> {
  text: string;
  sectionId: string;
  sectionTitle: string;
}

export interface ProcessedSection {
  id: string;
  title: string;
  questions: ProcessedQuestion[];
}

export type Language = "en" | "ru";