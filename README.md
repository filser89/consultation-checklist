# FJ Tech — AI Growth Consultation Checklist

A React TypeScript application for conducting structured consultations on AI growth strategies. This interactive checklist helps consultants systematically gather information about clients' sales funnels, current AI usage, operations, and growth goals.

## Features

- **Bilingual Support**: Full English and Russian translations
- **Two Viewing Modes**: 
  - List mode: See all questions organized by sections
  - Focus mode: Navigate through questions one at a time with keyboard shortcuts
- **Progress Tracking**: Visual progress bars for each section and overall completion
- **Local Storage**: All data is stored locally in the browser
- **Export Options**: Export consultation data as JSON or CSV
- **Conditional Questions**: Smart question visibility based on previous answers
- **Real-time Search**: Filter questions by content or section
- **Session Timer**: Track consultation duration
- **Client Management**: Store client name/session information

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd consultation_checklist
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## Usage

1. **Start a Session**: Enter a client name/session identifier
2. **Choose Language**: Toggle between English (EN) and Russian (RU)
3. **Navigate Questions**: 
   - Use list mode to see all questions at once
   - Use focus mode for guided navigation (supports ←/→ arrow keys)
4. **Answer Questions**: 
   - Check boxes to mark questions as done
   - Use Yes/No/Unknown buttons for boolean questions
   - Add detailed notes for each question
5. **Track Progress**: Monitor completion via section and overall progress bars
6. **Export Results**: Download consultation data as JSON or CSV files
7. **Reset if Needed**: Clear all answers to start fresh

## Question Categories

- **Sales Funnel**: Lead pipeline, channels, tracking, and bottlenecks
- **Current AI Use Cases**: Existing AI tools, budget, and applications
- **Operations**: Processes, systems integration, and support workflows
- **Growth & Goals**: Business objectives and improvement priorities

## Technical Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Local Storage** for data persistence

## Browser Storage

All consultation data is stored locally in your browser using localStorage. No data is sent to external servers, ensuring complete privacy and security of client information.

## Keyboard Shortcuts

- **←/→ Arrow Keys**: Navigate between questions in focus mode
- **Language Toggle**: Switch between English and Russian interfaces

## Development

The application uses:
- TypeScript for type safety
- ESLint for code quality
- Tailwind CSS for responsive design
- Custom hooks for localStorage management
- Memoized components for performance optimization