# 📅 Roster Planner

An enterprise-grade, resource-based scheduling system. This platform provides a highly interactive calendar grid designed for complex workforce management, featuring real-time overlap detection and intuitive drag-and-drop orchestration.

---

## 🚀 Modern Tech Stack

Unlike traditional rosters, this project is built on the "bleeding edge" to ensure long-term maintainability:

* **Core:** React 19 (Concurrent Rendering) & Next.js 16.
* **UI Architecture:** Chakra UI v3 (utilizing the new `Dialog` and `Field` compound components).
* **Styling:** Tailwind CSS v4 + Emotion for high-performance CSS-in-JS.
* **Logic:** Custom hooks for date navigation and debounced LocalStorage persistence.

---

## 🛠️ Quick Start

### Prerequisites

* **Node.js:** v20.x (LTS) or higher.
* **npm:** v10.x or higher.

### Installation & Development

```bash
# 1. Clone & Enter
git clone https://github.com/Niz46/roster-system.git
cd roster-system

# 2. Clean Install (Ensures React 19 alignment)
npm ci

# 3. Spin up Dev
npm run dev

```

Visit `http://localhost:3000/planner` to view the engine in action.

---

## 🏗️ Project Architecture

```bash
src/
├── components/
│   ├── Planner/       # Logic-heavy calendar & grid components
│   ├── UsersPanel/    # Team/User management UI
│   └── Shared/        # Atomic components (Avatars, Badges)
├── context/           # Centralized State (useReducer + Context API)
├── hooks/             # useDateNavigator, useLocalStorage
├── services/          # API Integration layer (Axios/Fetch)
└── utils/             # Business logic: Overlap math & Time formatting

```

---

## 🧠 Technical Implementation

### 1. High-Precision Drag & Drop

The system uses the Native HTML5 Drag and Drop API. To ensure sub-hour accuracy, the drop calculation uses the following logic:

The result is then snapped to the nearest interval (e.g., 15m or 30m) to ensure a clean UI.

### 2. Intelligent Overlap Detection

The scheduler prevents "double-booking" by validating every change against the existing state. The collision detection algorithm follows:

> `(candidate.start < existing.end) AND (candidate.end > existing.start)`

This check is performed across both **User** and **Resource** dimensions simultaneously.

---

## ⚠️ Modernization Guide (Chakra v3 + React 19)

If you encounter linting or type errors, remember that this project follows **Chakra UI v3** standards. Do **not** downgrade to React 18. Follow these patterns:

* **Layouts:** Use `gap={4}` instead of `spacing={4}`.
* **Modals:** Use the `Dialog` compound components instead of `Modal`.
* **Inputs:** Use `Field.Root` and `Field.Label` instead of `FormControl`.
* **Icons:** `IconButton` now takes the icon as a child: `<IconButton><ChevronLeftIcon /></IconButton>`.
* **State Sync:** Avoid `useEffect` to sync props to state; use the `key` prop on components to trigger a fresh state re-initialization.

---

## 🧪 Quality Control

Every push to `main` triggers a GitHub Action that performs:

1. **Strict Linting:** `npm run lint`
2. **Full Type Check:** `npx tsc --noEmit`
3. **Production Build:** `npm run build`

---

## 📄 License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).

---
