import { useEffect, useMemo, useState } from "react";
import { ClipboardList, Download, RefreshCw, Search, Timer } from "lucide-react";
import type { Answer, Language, Translation } from './types';
import { I18N } from './i18n';
import { humanTime, download, toCSV } from './utils';
import { useLocalStorage, useSections, useVisibleQuestions, useProgressBySection } from './hooks';
import { QuestionCard } from './components/QuestionCard';

export default function ConsultationChecklist(): JSX.Element {
  const [lang, setLang] = useLocalStorage<Language>("fj_lang", "en");
  const t = (k: keyof Translation): string => (I18N[lang] || I18N.en)[k] || k;

  const SECTIONS = useSections(lang);

  const [clientName, setClientName] = useLocalStorage<string>("fj_client_name", "");
  const [answers, setAnswers] = useLocalStorage<Record<string, Answer>>("fj_answers", {});
  const [createdAt, setCreatedAt] = useLocalStorage<number>("fj_created_at", Date.now());
  const [query, setQuery] = useState<string>("");
  const [focusMode, setFocusMode] = useLocalStorage<boolean>("fj_focus_mode", false);
  const [currentQ, setCurrentQ] = useLocalStorage<string>("fj_current_q", SECTIONS[0]?.questions[0]?.id || "");

  const [now, setNow] = useState<number>(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const elapsed = Math.floor((now - createdAt) / 1000);

  const flat = useMemo(() => {
    return SECTIONS.flatMap((s) => s.questions.map((q) => ({ ...q, sectionId: s.id, sectionTitle: s.title })));
  }, [SECTIONS]);

  const visible = useVisibleQuestions(flat, answers, query);
  const progressBySection = useProgressBySection(flat, answers, visible);

  const currentIndex = Math.max(0, visible.findIndex((q) => q.id === currentQ));
  const current = visible[currentIndex] || visible[0];

  useEffect(() => {
    if (!current) return;
    setCurrentQ(current.id);
  }, [query, SECTIONS.length, current, setCurrentQ]);

  const bySection = useMemo(() => {
    const groups: Record<string, { title: string; items: any[] }> = {};
    for (const q of visible) {
      groups[q.sectionId] ||= { title: q.sectionTitle, items: [] };
      groups[q.sectionId].items.push(q);
    }
    return groups;
  }, [visible]);

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



  const totalVisible = visible.length;
  const totalDone = visible.filter((q) => answers[q.id]?.done).length;
  const progressPct = totalVisible ? Math.round((100 * totalDone) / totalVisible) : 0;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Top bar */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 py-3 h-16 flex items-center gap-3">
          <ClipboardList className="h-5 w-5 text-gray-900" />
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
                    if (focusMode) {
                      const firstVisible = visible.find((q) => q.sectionId === s.id);
                      if (firstVisible) setCurrentQ(firstVisible.id);
                    } else {
                      const sectionElement = document.getElementById(`section-${s.id}`);
                      if (sectionElement) {
                        const headerHeight = 100;
                        const elementTop = sectionElement.offsetTop - headerHeight;
                        window.scrollTo({ top: elementTop, behavior: "smooth" });
                      }
                    }
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
              <section key={sid} id={`section-${sid}`} className="space-y-3">
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