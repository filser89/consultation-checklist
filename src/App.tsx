import React, { useEffect, useMemo, useRef, useState } from "react";
import { Check, ClipboardList, Download, RefreshCw, Search, Timer, ChevronRight, ChevronLeft } from "lucide-react";

// ---------------------- TYPES ----------------------
interface Translation {
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

interface Answer {
  done?: boolean;
  choice?: string;
  notes?: string;
  touchedAt?: number;
}

interface Question {
  id: string;
  type?: "boolean" | "text";
  text: Record<string, string>;
  showIf?: {
    id: string;
    equals: string;
  };
}

interface RawSection {
  id: string;
  title: Record<string, string>;
  questions: Question[];
}

interface ProcessedQuestion extends Omit<Question, 'text'> {
  text: string;
  sectionId: string;
  sectionTitle: string;
}

interface ProcessedSection {
  id: string;
  title: string;
  questions: ProcessedQuestion[];
}

type Language = "en" | "ru";

// ---------------------- I18N ----------------------
const I18N: Record<Language, Translation> = {
  en: {
    appTitle: "FJ Tech — AI Growth Consultation Checklist",
    searchPlaceholder: "Search questions…",
    clientPlaceholder: "Client name / session",
    toList: "List mode",
    toFocus: "Focus mode",
    json: "JSON",
    csv: "CSV",
    reset: "Reset",
    markDone: "Mark done",
    prev: "Prev",
    next: "Next",
    notAnswered: "Not answered yet",
    updated: "Updated",
    notesPlaceholder: "Notes / key points…",
    complete: "complete",
    footer: "FJ Tech · Consultation Toolkit · Local storage only · Press ←/→ in focus mode",
    yes: "Yes",
    no: "No",
    unknown: "Unknown",
  },
  ru: {
    appTitle: "FJ Tech — Чеклист консультации по росту с ИИ",
    searchPlaceholder: "Поиск по вопросам…",
    clientPlaceholder: "Имя клиента / сессия",
    toList: "Список",
    toFocus: "Фокус‑режим",
    json: "JSON",
    csv: "CSV",
    reset: "Сброс",
    markDone: "Отметить выполненным",
    prev: "Назад",
    next: "Далее",
    notAnswered: "Пока нет ответа",
    updated: "Обновлено",
    notesPlaceholder: "Заметки / ключевые моменты…",
    complete: "завершено",
    footer: "FJ Tech · Инструмент консультаций · Только локальное хранилище · В фокус‑режиме ←/→",
    yes: "Да",
    no: "Нет",
    unknown: "Не знаю",
  },
};

// ---------------------- DATA (EN & RU) ----------------------
const RAW_SECTIONS: RawSection[] = [
  {
    id: "sales",
    title: { en: "Sales funnel", ru: "Воронка продаж" },
    questions: [
      {
        id: "q1",
        text: {
          en: "What is your lead pipeline? How do clients find out about you? How do they decide to choose your services?",
          ru: "Как выглядит ваша воронка лидов? Как клиенты узнают о вас? Как они принимают решение выбрать ваши услуги?",
        },
      },
      {
        id: "q2",
        text: {
          en: "What do you consider as a main channel for leads?",
          ru: "Какой канал вы считаете основным источником лидов?",
        },
      },
      {
        id: "q3",
        text: {
          en: "Do you consider SEO and GEO (AI search optimization) as your lead traffic sources?",
          ru: "Рассматриваете ли вы SEO и GEO (оптимизацию под ИИ‑поиск) как источники трафика/лидов?",
        },
      },
      {
        id: "q4",
        type: "boolean",
        text: { en: "Do you track leads data?", ru: "Отслеживаете ли вы данные по лидам?" },
      },
      {
        id: "q5",
        showIf: { id: "q4", equals: "yes" },
        text: { en: "What are the lead stats per channel?", ru: "Какова статистика по лидам по каждому каналу?" },
      },
      {
        id: "q6",
        showIf: { id: "q4", equals: "yes" },
        text: { en: "What are the conversions per channel?", ru: "Какие конверсии по каждому каналу?" },
      },
      {
        id: "q7",
        showIf: { id: "q4", equals: "yes" },
        text: { en: "What are the lead stats for organic traffic?", ru: "Какая статистика по лидам из органического трафика?" },
      },
      {
        id: "q8",
        showIf: { id: "q4", equals: "yes" },
        text: { en: "What are the conversions  for organic traffic?", ru: "Какие конверсии для органического трафика?" },
      },
      {
        id: "q9",
        type: "boolean",
        text: {
          en: "Do you track customer signals, like website visits, demo requests, or abandoned carts?",
          ru: "Отслеживаете ли вы сигналы поведения клиентов: визиты на сайт, запросы демо, брошенные корзины и т. п.?",
        },
      },
      {
        id: "q10",
        text: {
          en: "How do you currently nurture leads that don't convert right away? (email sequences, manual follow-ups, none?)",
          ru: "Как вы сейчас прогреваете лидов, которые не конвертируются сразу? (email‑цепочки, ручные фоллоу‑апы, ничего?)",
        },
      },
      {
        id: "q11",
        text: {
          en: "What's your average sales cycle length (from first contact to close)?",
          ru: "Какова средняя длина цикла сделки (от первого контакта до закрытия)?",
        },
      },
      {
        id: "q12",
        text: {
          en: "Do you currently score or qualify leads (decide who's worth follow-up), and if so, how?",
          ru: "Проводите ли вы скоринг/квалификацию лидов (решение, за кем следовать в первую очередь)? Если да — как?",
        },
      },
      {
        id: "q13",
        text: {
          en: "Which part of the funnel feels like a bottleneck right now: awareness, nurturing, or closing?",
          ru: "Где сейчас узкое место в воронке: привлечение, прогрев или закрытие?",
        },
      },
    ],
  },
  {
    id: "ai",
    title: { en: "Current AI use cases", ru: "Текущие сценарии использования ИИ" },
    questions: [
      {
        id: "q14",
        text: {
          en: "What AI tools are you currently using? This can be chat GPT, website chatbots, AI agents, custom AI-powered software.",
          ru: "Какие инструменты ИИ вы сейчас используете? Например, ChatGPT, чат‑боты на сайте, AI‑агенты, кастомные решения на ИИ.",
        },
      },
      {
        id: "q15",
        text: {
          en: "What do you use these tools for?  To save your time? To replace paid human services / employees?",
          ru: "Для чего вы используете эти инструменты? Экономия времени? Замена ручного/платного труда сотрудников?",
        },
      },
      { id: "q16", text: { en: "What tasks do you perform with these tools?", ru: "Какие задачи вы решаете с их помощью?" } },
      { id: "q17", text: { en: "What tools are paid?", ru: "Какие из этих инструментов — платные?" } },
      { id: "q18", text: { en: "What is your monthly budget for AI tools now?", ru: "Каков ваш текущий ежемесячный бюджет на ИИ‑инструменты?" } },
      { id: "q19", text: { en: "What AI budget do you consider maximum this year?", ru: "Какой максимальный бюджет на ИИ вы рассматриваете в этом году?" } },
      { id: "q20", text: { en: "How do you decide on what tools to use?", ru: "Как вы принимаете решения о выборе инструментов?" } },
      {
        id: "q21",
        type: "boolean",
        text: {
          en: "Have you experimented with AI-generated marketing content (blogs, landing pages, ad copy)?",
          ru: "Экспериментировали ли вы с маркетинговым контентом, создаваемым ИИ (блоги, лендинги, рекламные тексты)?",
        },
      },
    ],
  },
  {
    id: "ops",
    title: { en: "Operations", ru: "Операции" },
    questions: [
      {
        id: "q22",
        type: "boolean",
        text: { en: "Do you have processes described into SOPs?", ru: "Описаны ли ваши процессы в виде регламентов/SOP?" },
      },
      {
        id: "q23",
        text: {
          en: "What are the most time-consuming repetitive processes in your operations? How much time per day/week do they take?",
          ru: "Какие повторяющиеся процессы занимают больше всего времени? Сколько часов в день/неделю они отнимают?",
        },
      },
      {
        id: "q24",
        text: {
          en: "How do you currently manage your operations and data — is it mostly spreadsheets, or do you use tools like a CRM, ERP, project management, or billing software? How connected or integrated are those systems today?",
          ru: "Как вы сейчас управляете операциями и данными — в основном таблицы или используете CRM, ERP, управление проектами, биллинг? Насколько эти системы связаны/интегрированы между собой?",
        },
      },
      {
        id: "q25",
        text: {
          en: "Do you have customer support processes (ticketing, FAQ responses, chat)? How many hours does your team spend on this weekly?",
          ru: "Как устроена клиентская поддержка (тикет‑система, ответы на FAQ, чат)? Сколько часов в неделю команда тратит на это?",
        },
      },
    ],
  },
  {
    id: "growth",
    title: { en: "Growth & Goals (Simple Version)", ru: "Рост и цели (простой вариант)" },
    questions: [
      {
        id: "q26",
        text: { en: "What are your main business goals for the next 6–12 months?", ru: "Каковы ваши основные бизнес‑цели на ближайшие 6–12 месяцев?" },
      },
      {
        id: "q27",
        text: {
          en: "Which area would you most like to see improvement in: getting more leads, converting them faster, or keeping customers longer?",
          ru: "В каком направлении вы больше всего хотите улучшения: больше лидов, быстрее конверсия или дольше удержание клиентов?",
        },
      },
      {
        id: "q28",
        text: {
          en: "What are your growth plans? Scaling existing business? New products / services? New markets?",
          ru: "Каковы планы роста? Масштабирование текущего бизнеса? Новые продукты/услуги? Выход на новые рынки?",
        },
      },
      {
        id: "q29",
        text: {
          en: "If your team had more time freed up from day-to-day tasks, how would you want them to use it?",
          ru: "Если бы у команды освободилось время от рутины, на что вы хотели бы его направить?",
        },
      },
    ],
  },
];

// ---------------------- UTILS ----------------------
const fmt = (n: number): string => (n < 10 ? `0${n}` : `${n}`);
const humanTime = (secs: number): string => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  const s = Math.floor(secs % 60);
  return `${fmt(h)}:${fmt(m)}:${fmt(s)}`;
};

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
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

function download(filename: string, text: string): void {
  const blob = new Blob([text], { type: "application/json;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

function toCSV(rows: Record<string, unknown>[]): string {
  const escape = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.map(escape).join(",")];
  for (const r of rows) lines.push(headers.map((h) => escape(r[h])).join(","));
  return lines.join("\n");
}

// Resolve language-specific section data
function useSections(lang: Language): ProcessedSection[] {
  return useMemo(() => {
    return RAW_SECTIONS.map((s) => ({
      id: s.id,
      title: s.title[lang],
      questions: s.questions.map((q) => ({
        ...q,
        text: q.text[lang],
        sectionId: s.id,
        sectionTitle: s.title[lang],
      })),
    }));
  }, [lang]);
}

// ---------------------- QUESTION CARD COMPONENT ----------------------
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

const QuestionCard = React.memo(({ q, focus, lang, answers, setAnswer, t, prevQuestion, nextQuestion }: QuestionCardProps): JSX.Element => {
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
          <div className="text-base font-medium leading-snug">{q.text}</div>
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

// ---------------------- MAIN COMPONENT ----------------------
export default function ConsultationChecklist(): JSX.Element {
  const [lang, setLang] = useLocalStorage<Language>("fj_lang", "en");
  const t = (k: keyof Translation): string => (I18N[lang] || I18N.en)[k] || k;

  const SECTIONS = useSections(lang);

  const [clientName, setClientName] = useLocalStorage<string>("fj_client_name", "");
  const [answers, setAnswers] = useLocalStorage<Record<string, Answer>>("fj_answers", {}); // { [qid]: { done, choice, notes, touchedAt } }
  const [createdAt, setCreatedAt] = useLocalStorage<number>("fj_created_at", Date.now());
  const [query, setQuery] = useState<string>("");
  const [focusMode, setFocusMode] = useLocalStorage<boolean>("fj_focus_mode", false);
  const [currentQ, setCurrentQ] = useLocalStorage<string>("fj_current_q", SECTIONS[0]?.questions[0]?.id || "");

  // timer
  const [now, setNow] = useState<number>(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const elapsed = Math.floor((now - createdAt) / 1000);

  // flatten questions
  const flat = useMemo((): ProcessedQuestion[] => {
    return SECTIONS.flatMap((s) => s.questions.map((q) => ({ ...q, sectionId: s.id, sectionTitle: s.title })));
  }, [SECTIONS]);

  const visible = useMemo((): ProcessedQuestion[] => {
    const map = Object.fromEntries(flat.map((q) => [q.id, answers[q.id] ?? {}]));
    return flat.filter((q) => {
      // search filter
      const qmatch = q.text.toLowerCase().includes(query.toLowerCase()) || q.sectionTitle.toLowerCase().includes(query.toLowerCase());
      if (!qmatch) return false;
      // conditional display
      if (q.showIf) {
        const dep = map[q.showIf.id];
        const val = (dep?.choice || "").toLowerCase();
        return val === String(q.showIf.equals).toLowerCase();
      }
      return true;
    });
  }, [flat, answers, query]);

  const currentIndex = Math.max(0, visible.findIndex((q) => q.id === currentQ));
  const current = visible[currentIndex] || visible[0];

  useEffect(() => {
    if (!current) return;
    setCurrentQ(current.id);
  }, [query, SECTIONS.length, current, setCurrentQ]);

  const bySection = useMemo(() => {
    const groups: Record<string, { title: string; items: ProcessedQuestion[] }> = {};
    for (const q of visible) {
      groups[q.sectionId] ||= { title: q.sectionTitle, items: [] };
      groups[q.sectionId].items.push(q);
    }
    return groups;
  }, [visible]);

  const progressBySection = useMemo(() => {
    const res: Record<string, { done: number; total: number }> = {};
    for (const q of flat) {
      const a = answers[q.id];
      const shown = visible.some((v) => v.id === q.id);
      if (!shown) continue; // don't count hidden conditional questions
      const sec = q.sectionId;
      res[sec] ||= { done: 0, total: 0 };
      res[sec].total += 1;
      if (a?.done) res[sec].done += 1;
    }
    return res;
  }, [flat, answers, visible]);

  const setAnswer = (id: string, patch: Partial<Answer>): void => {
    setAnswers((prev) => ({ ...prev, [id]: { ...(prev[id] || {}), ...patch, touchedAt: Date.now() } }));
  };

  const nextQuestion = (): void => {
    if (!current) return;
    const i = visible.findIndex((q) => q.id === current.id);
    const next = visible[i + 1];
    if (next) setCurrentQ(next.id);
  };
  const prevQuestion = (): void => {
    if (!current) return;
    const i = visible.findIndex((q) => q.id === current.id);
    const prev = visible[i - 1];
    if (prev) setCurrentQ(prev.id);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent): void => {
      if (e.key === "ArrowRight") nextQuestion();
      if (e.key === "ArrowLeft") prevQuestion();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const resetAll = (): void => {
    if (confirm(lang === "ru" ? "Сбросить все ответы?" : "Reset all answers?")) {
      setAnswers({});
      const ts = Date.now();
      setCreatedAt(ts);
      localStorage.setItem("fj_created_at", JSON.stringify(ts));
    }
  };

  const exportJSON = (): void => {
    const payload = {
      lang,
      clientName,
      createdAt,
      exportedAt: Date.now(),
      sections: SECTIONS.map((s) => ({
        id: s.id,
        title: s.title,
        questions: s.questions.map((q) => ({
          id: q.id,
          text: q.text,
          type: q.type || "text",
          showIf: q.showIf || null,
          answer: answers[q.id] || null,
        })),
      })),
    };
    download(`fjtech_consult_${Date.now()}.json`, JSON.stringify(payload, null, 2));
  };

  const exportCSV = (): void => {
    const rows = flat
      .filter((q) => visible.some((v) => v.id === q.id))
      .map((q) => ({
        Client: clientName,
        Language: lang,
        Section: q.sectionTitle,
        Question: q.text,
        Type: q.type || "text",
        Choice: answers[q.id]?.choice ?? "",
        Done: answers[q.id]?.done ? (lang === "ru" ? "Да" : "Yes") : "",
        Notes: answers[q.id]?.notes ?? "",
        TouchedAt: answers[q.id]?.touchedAt ? new Date(answers[q.id].touchedAt!).toISOString() : "",
      }));
    const csv = toCSV(rows);
    download(`fjtech_consult_${Date.now()}.csv`, csv);
  };

  // ---------------------- SELF-TESTS (console) ----------------------
  useEffect(() => {
    try {
      const results: { name: string; pass: boolean }[] = [];
      const record = (name: string, cond: unknown): void => {
        const pass = !!cond;
        results.push({ name, pass });
        if (!pass) console.error("[Checklist Self-Test] FAIL:", name);
      };

      // toCSV basic
      record("toCSV empty returns empty string", toCSV([]) === "");
      const csv = toCSV([
        { A: "hello", B: "he,llo" },
        { A: 'quo"te', B: "x" },
      ]);
      const lines = csv.split("\n");
      record("toCSV produces header + 2 rows", lines.length === 3);
      record("toCSV escapes comma via quotes", lines[1].includes('"he,llo"'));
      record("toCSV escapes double quotes", lines[2].includes('"quo""te"'));

      // Basic i18n sanity
      record(
        "RAW_SECTIONS has EN/RU titles",
        RAW_SECTIONS[0]?.title?.en && RAW_SECTIONS[0]?.title?.ru && RAW_SECTIONS[0].title.en !== RAW_SECTIONS[0].title.ru
      );

      // Filename formatting
      const testNameJSON = `fjtech_consult_${123}.json`;
      const testNameCSV = `fjtech_consult_${123}.csv`;
      record("JSON filename ends with .json", testNameJSON.endsWith(".json"));
      record("CSV filename ends with .csv", testNameCSV.endsWith(".csv"));

      const passed = results.filter((r) => r.pass).length;
      console.log(`[Checklist Self-Test] ${passed}/${results.length} passed`, results);
    } catch (e) {
      console.warn("[Checklist Self-Test] Error running tests", e);
    }
  }, []);


  const totalVisible = visible.length;
  const totalDone = visible.filter((q) => answers[q.id]?.done).length;
  const progressPct = totalVisible ? Math.round((100 * totalDone) / totalVisible) : 0;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 h-16 flex items-center gap-3">
          <ClipboardList className="h-5 w-5" />
          <h1 className="font-semibold text-sm md:text-base truncate flex-shrink min-w-0">{t("appTitle")}</h1>

          {/* Language toggle */}
          <div className="ml-4">
            <button
              onClick={() => setLang(lang === "en" ? "ru" : "en")}
              className="px-3 py-1 text-sm border rounded-lg hover:bg-gray-100"
            >
              {lang === "en" ? "RU" : "EN"}
            </button>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Timer className="h-4 w-4" />
            <span className="tabular-nums text-sm">{humanTime(elapsed)}</span>
            <div className="w-px h-5 bg-gray-200 mx-2" />
            <Search className="h-4 w-4" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className="rounded-lg border px-2 py-1 text-sm w-56"
            />
            <input
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder={t("clientPlaceholder")}
              className="rounded-lg border px-2 py-1 text-sm w-56"
            />
            <button onClick={() => setFocusMode(!focusMode)} className="ml-2 text-sm underline">
              {focusMode ? t("toList") : t("toFocus")}
            </button>
            <button onClick={exportJSON} className="ml-2 inline-flex items-center gap-1 text-sm px-2 py-1 border rounded-lg">
              <Download className="h-4 w-4" /> {t("json")}
            </button>
            <button onClick={exportCSV} className="ml-1 inline-flex items-center gap-1 text-sm px-2 py-1 border rounded-lg">
              <Download className="h-4 w-4" /> {t("csv")}
            </button>
            <button onClick={resetAll} className="ml-1 inline-flex items-center gap-1 text-sm px-2 py-1 border rounded-lg">
              <RefreshCw className="h-4 w-4" /> {t("reset")}
            </button>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-3">
          <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-black" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="mt-1 text-xs text-gray-500">{totalDone}/{totalVisible} {t("complete")}</div>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 lg:grid-cols-[280px,1fr] gap-6">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-[68px] self-start">
          <nav className="space-y-3">
            {SECTIONS.map((s) => {
              const p = progressBySection[s.id] || { done: 0, total: 0 };
              const pct = p.total ? Math.round((100 * p.done) / p.total) : 0;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    const firstVisible = visible.find((q) => q.sectionId === s.id);
                    if (firstVisible) setCurrentQ(firstVisible.id);
                  }}
                  className="w-full text-left p-3 rounded-xl border bg-white hover:bg-gray-50"
                >
                  <div className="font-medium">{s.title}</div>
                  <div className="mt-1 text-xs text-gray-500">{p.done}/{p.total} {t("complete")}</div>
                  <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-black" style={{ width: `${pct}%` }} />
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <main className="space-y-4">
          {focusMode ? (
            current ? (
              <QuestionCard 
                q={current} 
                focus 
                lang={lang}
                answers={answers}
                setAnswer={setAnswer}
                t={t}
                prevQuestion={prevQuestion}
                nextQuestion={nextQuestion}
              />
            ) : (
              <div className="text-sm text-gray-500">{lang === "ru" ? "Нет доступных вопросов. Сбросить фильтры?" : "No question visible. Clear filters?"}</div>
            )
          ) : (
            Object.entries(bySection).map(([sid, group]) => (
              <section key={sid} className="space-y-3">
                <h2 className="text-lg font-semibold">{group.title}</h2>
                <div className="grid gap-3">
                  {group.items.map((q) => (
                    <div key={q.id} onClick={() => setCurrentQ(q.id)}>
                      <QuestionCard 
                        q={q}
                        lang={lang}
                        answers={answers}
                        setAnswer={setAnswer}
                        t={t}
                        prevQuestion={prevQuestion}
                        nextQuestion={nextQuestion}
                      />
                    </div>
                  ))}
                </div>
              </section>
            ))
          )}
        </main>
      </div>

      <footer className="py-8 text-center text-xs text-gray-500">{t("footer")}</footer>
    </div>
  );
}