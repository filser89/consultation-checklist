import type { RawSection } from '../types';

export const RAW_SECTIONS: RawSection[] = [
  {
    id: 'general',
    title: { en: 'General', ru: 'Общие' },
    questions: [
      {
        id: 'general-1',
        text: {
          en: 'Please describe me your business model.',
          ru: 'Опишите, пожалуйста, вашу бизнес-модель.',
        },
      },
      {
        id: 'general-2',
        text: {
          en: 'Do you have any process in mind that you consider as the most important to automate?',
          ru: 'Есть ли у вас какой-то процесс, который вы считаете самым важным для автоматизации?',
        },
      },
      {
        id: 'general-3',
        text: {
          en: 'What are your sources of revenue?',
          ru: 'Каковы ваши источники дохода?',
        },
      },
      {
        id: 'general-4',
        text: {
          en: 'What is the main source of your revenue?',
          ru: 'Какой основной источник дохода?',
        },
      },
    ],
  },
  {
    id: 'sales',
    title: { en: 'Sales funnel', ru: 'Воронка продаж' },
    questions: [
      {
        id: 'sales-1',
        text: {
          en: 'What is your lead pipeline? How do clients find out about you? How do they decide to choose your services?',
          ru: 'Как выглядит ваша воронка лидов? Как клиенты узнают о вас? Как они принимают решение выбрать ваши услуги?',
        },
      },
      {
        id: 'sales-2',
        text: {
          en: 'What do you consider as a main channel for leads?',
          ru: 'Какой канал вы считаете основным источником лидов?',
        },
      },
      {
        id: 'sales-3',
        text: {
          en: 'Do you consider SEO and GEO (AI search optimization) as your lead traffic sources?',
          ru: 'Рассматриваете ли вы SEO и GEO (оптимизацию под ИИ-поиск) как источники трафика/лидов?',
        },
      },
      {
        id: 'sales-4',
        type: 'boolean',
        text: { en: 'Do you track leads data?', ru: 'Отслеживаете ли вы данные по лидам?' },
      },
      {
        id: 'sales-5',
        showIf: { id: 'sales-4', equals: 'yes' },
        text: { en: 'What are the lead stats per channel?', ru: 'Какова статистика по лидам по каждому каналу?' },
      },
      {
        id: 'sales-6',
        showIf: { id: 'sales-4', equals: 'yes' },
        text: { en: 'What are the conversions per channel?', ru: 'Какие конверсии по каждому каналу?' },
      },
      {
        id: 'sales-7',
        showIf: { id: 'sales-4', equals: 'yes' },
        text: {
          en: 'What are the lead stats for organic traffic?',
          ru: 'Какая статистика по лидам из органического трафика?',
        },
      },
      {
        id: 'sales-8',
        showIf: { id: 'sales-4', equals: 'yes' },
        text: {
          en: 'What are the conversions  for organic traffic?',
          ru: 'Какие конверсии для органического трафика?',
        },
      },
      {
        id: 'sales-9',
        type: 'boolean',
        text: {
          en: 'Do you track customer signals, like website visits, demo requests, or abandoned carts?',
          ru: 'Отслеживаете ли вы сигналы поведения клиентов: визиты на сайт, запросы демо, брошенные корзины и т. п.?',
        },
      },
      {
        id: 'sales-10',
        text: {
          en: "How do you currently nurture leads that don't convert right away? (email sequences, manual follow-ups, none?)",
          ru: 'Как вы сейчас прогреваете лидов, которые не конвертируются сразу? (email-цепочки, ручные фоллоу-апы, ничего?)',
        },
      },
      {
        id: 'sales-11',
        text: {
          en: "What's your average sales cycle length (from first contact to close)?",
          ru: 'Какова средняя длина цикла сделки (от первого контакта до закрытия)?',
        },
      },
      {
        id: 'sales-12',
        text: {
          en: "Do you currently score or qualify leads (decide who's worth follow-up), and if so, how?",
          ru: 'Проводите ли вы скоринг/квалификацию лидов (решение, за кем следовать в первую очередь)? Если да — как?',
        },
      },
      {
        id: 'sales-13',
        text: {
          en: 'Which part of the funnel feels like a bottleneck right now: awareness, nurturing, or closing?',
          ru: 'Где сейчас узкое место в воронке: привлечение, прогрев или закрытие?',
        },
      },
    ],
  },
  {
    id: 'ops',
    title: { en: 'Operations', ru: 'Операции' },
    questions: [
      {
        id: 'ops-1',
        type: 'boolean',
        text: {
          en: 'Do you have processes described into SOPs?',
          ru: 'Описаны ли ваши процессы в виде регламентов/SOP?',
        },
      },
      {
        id: 'ops-2',
        text: {
          en: 'What are the most time-consuming repetitive processes in your operations? How much time per day/week do they take?',
          ru: 'Какие повторяющиеся процессы занимают больше всего времени? Сколько часов в день/неделю они отнимают?',
        },
      },
      {
        id: 'ops-3',
        text: {
          en: 'How do you currently manage your operations and data — is it mostly spreadsheets, or do you use tools like a CRM, ERP, project management, or billing software? How connected or integrated are those systems today?',
          ru: 'Как вы сейчас управляете операциями и данными — в основном таблицы или используете CRM, ERP, управление проектами, биллинг? Насколько эти системы связаны/интегрированы между собой?',
        },
      },
      {
        id: 'ops-4',
        text: {
          en: 'Do you have customer support processes (ticketing, FAQ responses, chat)? How many hours does your team spend on this weekly?',
          ru: 'Как устроена клиентская поддержка (тикет-система, ответы на FAQ, чат)? Сколько часов в неделю команда тратит на это?',
        },
      },
    ],
  },
  {
    id: 'staff',
    title: { en: 'Staff turnover', ru: 'Текучка персонала' },
    questions: [
      {
        id: 'staff-1',
        text: {
          en: 'As I understand you work with part-time coaches. Is the turnover high? Do you have to hire new coaches often?',
          ru: 'Насколько я понимаю, вы работаете с частичными тренерами. Высокая ли у вас текучка? Часто ли приходится нанимать новых тренеров?',
        },
      },
      {
        id: 'staff-2',
        text: {
          en: 'What are the biggest challenges here?',
          ru: 'Какие здесь самые большие трудности?',
        },
      },
      {
        id: 'staff-3',
        text: {
          en: 'Finding coaches — what is the process? Do you do it or outsource?',
          ru: 'Поиск тренеров — как устроен процесс? Делаете это сами или аутсорсите?',
        },
      },
      {
        id: 'staff-4',
        text: {
          en: 'Filtering coaches (qualification, reviews) — what is the process? Do you do it or outsource?',
          ru: 'Фильтрация тренеров (квалификация, отзывы) — как устроен процесс? Делаете сами или аутсорсите?',
        },
      },
      {
        id: 'staff-5',
        text: {
          en: 'Coach onboarding (collecting personal details + providing necessary materials) — what is the process?',
          ru: 'Онбординг тренеров (сбор данных + предоставление материалов) — как устроен процесс?',
        },
      },
      {
        id: 'staff-6',
        text: {
          en: 'How do you handle compliance checks (safeguarding, DBS, training certifications) for new coaches?',
          ru: 'Как вы проводите проверки на соответствие (safeguarding, DBS, сертификация) для новых тренеров?',
        },
      },
    ],
  },
  {
    id: 'parents',
    title: { en: 'Parents', ru: 'Родители' },
    questions: [
      {
        id: 'parents-1',
        text: {
          en: 'Do you currently provide post-session reports to parents?',
          ru: 'Предоставляете ли вы родителям отчёты после занятий?',
        },
      },
      {
        id: 'parents-2',
        text: {
          en: 'How often do you provide them?',
          ru: 'Как часто вы их предоставляете?',
        },
      },
      {
        id: 'parents-3',
        text: {
          en: 'Please describe this process briefly.',
          ru: 'Опишите, пожалуйста, этот процесс вкратце.',
        },
      },
      {
        id: 'parents-4',
        text: {
          en: 'How do you currently collect feedback from parents?',
          ru: 'Как вы сейчас собираете обратную связь от родителей?',
        },
      },
      {
        id: 'parents-5',
        text: {
          en: 'What is the percentage of parents that provides feedback?',
          ru: 'Какой процент родителей даёт обратную связь?',
        },
      },
      {
        id: 'parents-6',
        text: {
          en: 'When parents do give feedback, how do you usually act on it?',
          ru: 'Когда родители дают обратную связь, что вы обычно делаете с ней?',
        },
      },
    ],
  },
  {
    id: 'schools',
    title: { en: 'Schools', ru: 'Школы' },
    questions: [
      {
        id: 'schools-1',
        text: {
          en: 'How is your current communication with schools set up technically?',
          ru: 'Как технически устроена ваша текущая коммуникация со школами?',
        },
      },
      {
        id: 'schools-2',
        text: {
          en: 'Do you communicate via emails or other systems?',
          ru: 'Коммуницируете по email или через другие системы?',
        },
      },
      {
        id: 'schools-3',
        text: {
          en: 'Is there a system behind the emails (for example: 1 day before session → send participant list to school)?',
          ru: 'Есть ли система за email-ами (например: за день до занятия → отправка списка участников в школу)?',
        },
      },
      {
        id: 'schools-4',
        text: {
          en: 'Do schools ever ask for regular reports or updates from your side?',
          ru: 'Запрашивают ли школы у вас регулярные отчёты или обновления?',
        },
      },
      {
        id: 'schools-5',
        text: {
          en: 'Do you provide reports to schools? How often? Monthly? Weekly? After session?',
          ru: 'Предоставляете ли вы школам отчёты? Как часто? Ежемесячно? Еженедельно? После занятия?',
        },
      },
      {
        id: 'schools-6',
        text: {
          en: 'Is there a system behind it?',
          ru: 'Есть ли система за этим процессом?',
        },
      },
    ],
  },
  {
    id: 'ai',
    title: { en: 'Current AI use cases', ru: 'Текущие сценарии использования ИИ' },
    questions: [
      {
        id: 'ai-1',
        text: {
          en: 'What AI tools are you currently using? This can be chat GPT, website chatbots, AI agents, custom AI-powered software.',
          ru: 'Какие инструменты ИИ вы сейчас используете? Например, ChatGPT, чат-боты на сайте, AI-агенты, кастомные решения на ИИ.',
        },
      },
      {
        id: 'ai-2',
        text: {
          en: 'What do you use these tools for?  To save your time? To replace paid human services / employees?',
          ru: 'Для чего вы используете эти инструменты? Экономия времени? Замена ручного/платного труда сотрудников?',
        },
      },
      {
        id: 'ai-3',
        text: { en: 'What tasks do you perform with these tools?', ru: 'Какие задачи вы решаете с их помощью?' },
      },
      { id: 'ai-4', text: { en: 'What tools are paid?', ru: 'Какие из этих инструментов — платные?' } },
      {
        id: 'ai-5',
        text: {
          en: 'What is your monthly budget for AI tools now?',
          ru: 'Каков ваш текущий ежемесячный бюджет на ИИ-инструменты?',
        },
      },
      {
        id: 'ai-6',
        text: {
          en: 'What AI budget do you consider maximum this year?',
          ru: 'Какой максимальный бюджет на ИИ вы рассматриваете в этом году?',
        },
      },
      {
        id: 'ai-7',
        text: { en: 'How do you decide on what tools to use?', ru: 'Как вы принимаете решения о выборе инструментов?' },
      },
      {
        id: 'ai-8',
        type: 'boolean',
        text: {
          en: 'Have you experimented with AI-generated marketing content (blogs, landing pages, ad copy)?',
          ru: 'Экспериментировали ли вы с маркетинговым контентом, создаваемым ИИ (блоги, лендинги, рекламные тексты)?',
        },
      },
    ],
  },
  {
    id: 'growth',
    title: { en: 'Growth & Goals (Simple Version)', ru: 'Рост и цели (простой вариант)' },
    questions: [
      {
        id: 'growth-1',
        text: {
          en: 'What are your main business goals for the next 6–12 months?',
          ru: 'Каковы ваши основные бизнес-цели на ближайшие 6–12 месяцев?',
        },
      },
      {
        id: 'growth-2',
        text: {
          en: 'Which area would you most like to see improvement in: getting more leads, converting them faster, or keeping customers longer?',
          ru: 'В каком направлении вы больше всего хотите улучшения: больше лидов, быстрее конверсия или дольше удержание клиентов?',
        },
      },
      {
        id: 'growth-3',
        text: {
          en: 'What are your growth plans? Scaling existing business? New products / services? New markets?',
          ru: 'Каковы планы роста? Масштабирование текущего бизнеса? Новые продукты/услуги? Выход на новые рынки?',
        },
      },
      {
        id: 'growth-4',
        text: {
          en: 'If your team had more time freed up from day-to-day tasks, how would you want them to use it?',
          ru: 'Если бы у команды освободилось время от рутины, на что вы хотели бы его направить?',
        },
      },
    ],
  },
];
