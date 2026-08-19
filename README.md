# StudentOS - Manage School In One Place.

StudentOS is a vintage inspired academic productivity web app built to help students to manage their assignments, track project milestones and maintain focus during study sessions. 

---

## Features

* **Assignment logging System**: Create, categorize and prioritize academic tasks.
* **Focus Chronometer**: Pomodoro timer with customizable focus and break intervals to support pomodoro study techniques.
* **Milestone Tracking**: Visual countdown system for upcoming exams and paper deadlines.
* **Persistent Local Storage**: Built in state persistence utilizing the browser's `localStorage` API to ensure user data remains saved across browser sessions.
* **Responsive UI/UX**: Retro inspired aesthetic styling using Tailwind CSS, suitable for modern desktop and horizontal layout in tablet's browsers.

---

## Tech Stack

* **Frontend Framework**: [React 18](https://react.dev/)
* **Build Tooling**: [Vite](https://vitejs.dev/)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Deployment**: [GitHub Pages](https://pages.github.com/) (`gh-pages`)

---

## Live Demo & Testing Instructions

You can access the deployed application here: **[StudentOS Live Application](https://aalyaan2009.github.io/studentos/)**

### How to Test:
1. **Manage Assignments**: Navigate to the task module, add a new assignment, assign it a priority level and toggle its completion status.
2. **Test Persistence**: Refresh or close your browser tab after adding tasks to verify that your session data is restored automatically from browser storage
3. **Focus Chronometer**: Start the Pomodoro timer to monitor the countdown.

---

## Local Development Setup

To run this project locally on your machine:

1. **Clone the repository**:
   ```bash
   git clone [https://github.com/aalyaan2009/studentos.git](https://github.com/aalyaan2009/studentos.git)
   cd studentos
2. **Install dependencies:**
   ```bash
   npm install
3. **Start the development server:**
   ```bash
   npm run dev
4. **Build for production:**
   ```bash
   npm run build

## AI & Resource Credits

### Artificial Intelligence Disclosure

* **AI Assistance**: Gemini & ChatGPT were utilized during development as collaborative debugging assistants.
* **AI Scope**: AI was used for troubleshooting Vite build configurations, resolving relative path deployment routing on GitHub Pages.
---
### Credits & Acknowledgments
* **Icons**: Provided by open source SVG libraries.
* **Hosting**: Hosted via **GitHub Pages**.

