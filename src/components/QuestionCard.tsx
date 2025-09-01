import React, { useEffect, useRef } from "react";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import type { ProcessedQuestion, Answer, Language, Translation } from '../types';
import { I18N } from '../i18n';

interface QuestionCardProps {
  q: ProcessedQuestion;
  focus?: boolean;
  lang: Language;
  answers: Record<string, Answer>;
  setAnswer: (id: string, patch: Partial<Answer>) => void;
  t: (k: keyof Translation) => string;
  prevQuestion: () => void;
  nextQuestion: () => void;
}

export const QuestionCard = React.memo(({ q, focus, lang, answers, setAnswer, t, prevQuestion, nextQuestion }: QuestionCardProps): JSX.Element => {
  const a = answers[q.id] || {};
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (focus && ref.current) ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [focus]);

  const yesNo = (
    <div className="flex gap-2 mt-2">
      {[
        { label: I18N[lang].yes, val: "yes" },
        { label: I18N[lang].no, val: "no" },
        { label: I18N[lang].unknown, val: "unknown" },
      ].map((opt) => (
        <button
          key={opt.val}
          onClick={() => setAnswer(q.id, { choice: opt.val })}
          className={`px-3 py-1 rounded-full text-sm border ${
            a.choice === opt.val ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );

  return (
    <div ref={ref} className={`rounded-2xl border p-4 bg-white shadow-sm ${focus ? "ring-2 ring-black" : ""}`}>
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          checked={!!a.done}
          onChange={(e) => setAnswer(q.id, { done: e.target.checked })}
          className="mt-1 h-5 w-5 rounded border-gray-300"
          aria-label="mark done"
        />
        <div className="flex-1">
          <div 
            className="text-base font-medium leading-snug cursor-pointer hover:text-gray-700"
            onClick={() => setAnswer(q.id, { done: !a.done })}
          >
            {q.text}
          </div>
          {q.type === "boolean" && yesNo}
          <textarea
            value={a.notes || ""}
            onChange={(e) => setAnswer(q.id, { notes: e.target.value })}
            placeholder={t("notesPlaceholder")}
            className="mt-3 w-full min-h-[72px] rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />
          <div className="mt-2 text-xs text-gray-500">
            {a.touchedAt ? `${t("updated")} ${new Date(a.touchedAt).toLocaleString()}` : t("notAnswered")}
          </div>
        </div>
      </div>
      {focus && (
        <div className="mt-4 flex justify-between">
          <button
            onClick={prevQuestion}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" /> {t("prev")}
          </button>
          <button
            onClick={() => {
              setAnswer(q.id, { done: true });
              nextQuestion();
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white"
          >
            {t("markDone")} <Check className="h-4 w-4" />
          </button>
          <button
            onClick={nextQuestion}
            className="flex items-center gap-1 px-3 py-2 rounded-lg border hover:bg-gray-50"
          >
            {t("next")} <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
});

QuestionCard.displayName = 'QuestionCard';