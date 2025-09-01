import React, { useEffect, useMemo, useState } from "react";
import type { Answer, Language, ProcessedSection, ProcessedQuestion } from './types';
import { RAW_SECTIONS } from './data/questions';
import { SECTION_ORDER } from './config/sectionOrder';

export function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const v = localStorage.getItem(key);
      return v ? JSON.parse(v) : initialValue;
    } catch (error) {
      console.warn('localStorage error:', error);
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
    console.warn('localStorage error:', error);
  }
  }, [key, value]);
  return [value, setValue];
}

export function useSections(lang: Language): ProcessedSection[] {
  return useMemo(() => {
    const processedSections = RAW_SECTIONS.map((s) => ({
      id: s.id,
      title: s.title[lang],
      questions: s.questions.map((q) => ({
        ...q,
        text: q.text[lang],
        sectionId: s.id,
        sectionTitle: s.title[lang],
      })),
    }));

    const ordered: ProcessedSection[] = [];
    const remaining: ProcessedSection[] = [];

    for (const section of processedSections) {
      if (SECTION_ORDER.includes(section.id)) {
        ordered.push(section);
      } else {
        remaining.push(section);
      }
    }

    ordered.sort((a, b) => SECTION_ORDER.indexOf(a.id) - SECTION_ORDER.indexOf(b.id));

    return [...ordered, ...remaining];
  }, [lang]);
}

export function useVisibleQuestions(
  flat: ProcessedQuestion[], 
  answers: Record<string, Answer>, 
  query: string
): ProcessedQuestion[] {
  return useMemo((): ProcessedQuestion[] => {
    const map = Object.fromEntries(flat.map((q) => [q.id, answers[q.id] ?? {}]));
    return flat.filter((q) => {
      const qmatch = q.text.toLowerCase().includes(query.toLowerCase()) || q.sectionTitle.toLowerCase().includes(query.toLowerCase());
      if (!qmatch) return false;
      if (q.showIf) {
        const dep = map[q.showIf.id];
        const val = (dep?.choice || "").toLowerCase();
        return val === String(q.showIf.equals).toLowerCase();
      }
      return true;
    });
  }, [flat, answers, query]);
}

export function useProgressBySection(
  flat: ProcessedQuestion[], 
  answers: Record<string, Answer>, 
  visible: ProcessedQuestion[]
): Record<string, { done: number; total: number }> {
  return useMemo(() => {
    const res: Record<string, { done: number; total: number }> = {};
    for (const q of flat) {
      const a = answers[q.id];
      const shown = visible.some((v) => v.id === q.id);
      if (!shown) continue;
      const sec = q.sectionId;
      res[sec] ||= { done: 0, total: 0 };
      res[sec].total += 1;
      if (a?.done) res[sec].done += 1;
    }
    return res;
  }, [flat, answers, visible]);
}