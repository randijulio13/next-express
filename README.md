# Next Express Monorepo

Project monorepo yang menggabungkan **Next.js** untuk frontend dan **Express.js** sebagai API backend, dengan pengelolaan package bersama menggunakan npm workspaces.

---

## 🚀 Tech Stack

### Frontend (Apps/Web)

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **State & Form**: React Hook Form with Zod (Validation)
- **Data Fetching**: Axios
- **UI Components**: Radix UI & Lucide React
- **Table**: TanStack Table

### Backend (Apps/Api)

- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: TypeORM
- **Database**: PostgreSQL / MySQL support
- **Auth**: JSON Web Token (JWT) & BcryptJS
- **Dev Tool**: ts-node-dev

### Shared (Packages/Shared)

- **Shared Types**: Interface dan Type definitions yang digunakan baik di API maupun Web.

---

## 📁 Struktur Project

```text
.
├── apps/
│   ├── api/          # Express API Backend
│   └── web/          # Next.js Frontend App
├── packages/
│   └── shared/       # Shared logic, constants, and TypeScript types
├── .agent/           # Agent rules and configuration
├── .gitignore        # Root git ignore patterns
├── package.json      # Monorepo workspace configuration
└── README.md         # Dokumentasi project
```

---

## 🛠️ Development Flow

Project ini menggunakan npm workspaces untuk memudahkan manajemen dependensi antar aplikasi.

### Prerequisites

- Node.js (Versi terbaru direkomendasikan)
- npm

### 1. Setup Awal

Install semua dependensi dari root directory:

```bash
npm install
```

### 2. Environment Variables

Salin file `.env.example` menjadi `.env` di masing-masing direktori aplikasi:

- `apps/api/.env`
- `apps/web/.env`

### 3. Menjalankan Aplikasi

Untuk menjalankan semua aplikasi secara bersamaan (Web, API, dan Shared types):

```bash
npm run dev
```

Command ini akan menjalankan:

- `api` di `http://localhost:5000` (default)
- `web` di `http://localhost:3000` (default)

### 4. Build

Untuk membuat production build dari seluruh workspace:

```bash
npm run build
```

---

## 📏 Aturan Coding (Standard)

- **DRY (Don't Repeat Yourself)**: Gunakan `packages/shared` untuk logika atau tipe yang digunakan berulang.
- **SRP (Single Responsibility Principle)**: Satu file/modul hanya memiliki satu tanggung jawab.
- **Naming Convention**:
  - Folder: `kebab-case`
  - Components: `PascalCase`
  - Hooks: `useCamelCase`
  - Files/Utils: `kebab-case`
- **Commits**: Ikuti [Conventional Commits](https://www.conventionalcommits.org/).
