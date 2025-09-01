import type { RawSection } from '../types';

export const RAW_SECTIONS: RawSection[] = [
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