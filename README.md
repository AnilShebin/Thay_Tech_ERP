# ERP System for Auditing Client

This is a Next.js + Node.js-based ERP system designed to manage staff, assign tasks, monitor attendance, and handle check-ins/check-outs. The system has distinct logins for admins and staff, with server-side rendering (SSR) used throughout.

## Table of Contents

- [Technologies](../../Downloads/README.md#technologies)
- [Project Structure](../../Downloads/README.md#project-structure)
- [Installation](../../Downloads/README.md#installation)
- [Database Connection](../../Downloads/README.md#database-connection)
- [API Routes](../../Downloads/README.md#api-routes)
- [Folder Breakdown](../../Downloads/README.md#folder-breakdown)

## Technologies

- **Frontend**: [Next.js](https://nextjs.org/) (TSX)
- **Backend**: [Node.js](https://nodejs.org/) (TSX) + [Express](https://expressjs.com/)
- **Database**: [MySQL](https://www.mysql.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Project Structure

This project follows a clean, enterprise-level structure with a focus on reusability, separation of concerns, and clarity.

```
📦 ERP Project
├─ .eslintrc.json
├─ .gitignore
├─ README.md
├─ app
│  ├─ auth                 # Auth-related pages & layout (sign-in/sign-up)
│  ├─ admin                # Admin-specific pages
│  ├─ staff                # Staff-specific pages
│  ├─ globals.css          # Global styles
│  ├─ layout.tsx           # Root layout (used across app)
│  └─ page.tsx             # Home page
├─ components              # Reusable components (UI & business logic)
│  ├─ admin                # Admin-specific components
│  ├─ staff                # Staff-specific components
│  ├─ shared               # Shared components (admin/staff)
│  ├─ ui                   # Generic UI components
│  └─ charts               # Chart components
├─ constants               # Application constants (roles, URLs, etc.)
├─ hooks                   # Custom React hooks
├─ lib                     # Utility functions (validation, DB connection, etc.)
├─ middleware              # API middleware (authentication, logging, etc.)
├─ node-api                # Node.js backend (controllers, models, routes)
├─ public                  # Static assets (images, fonts, icons)
├─ types                   # TypeScript global types
└─ next.config.mjs         # Next.js config
```

## Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js**: version `>= 14.x`
- **MySQL**: A running MySQL database instance
- **npm**: Comes with Node.js

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AnilShebin/ERP-Jothilingam.git
   cd ERP-Jothilingam
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open the application in your browser:**

   Navigate to [http://localhost:3000](http://localhost:3000) to view the app.

---

## Database Connection

The MySQL database connection is configured in the `node-api/lib/db.ts` file, **only used in the backend**:

```typescript
import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
```

Make sure to update the `.env.local` file with your database credentials to ensure a successful connection.

> **Important**: The frontend should never directly interact with the database. All database interactions should happen in the backend, where API routes can securely handle data fetching or updates.

---

## API Routes

The **Node.js API** is structured under the `thay-backend/` folder:

- **Controllers**: Handle the business logic.
- **Models**: Represent the database tables.
- **Routes**: Define the API endpoints.

```typescript
import { Router } from 'express';
import { getStaff, addStaff } from '../controllers/staffController';

const router = Router();

router.get('/staff', getStaff);
router.post('/staff', addStaff);

export default router;
```

---

## Folder Breakdown

- **`app/`**: Contains all Next.js pages and layouts.
  - `auth/`: Handles login and sign-up pages.
  - `admin/`: Admin-specific pages.
  - `staff/`: Staff-specific pages.
  - `globals.css`: Global styles.
  - `layout.tsx`: Root layout used across the app.
  - `page.tsx`: Home page of the app.

- **`components/`**: Reusable components.
  - `admin/`: Components specific to the admin interface.
  - `staff/`: Components specific to the staff interface.
  - `shared/`: Components shared between admin and staff.
  - `ui/`: Generic UI components like buttons and inputs.
  - `charts/`: Components for displaying charts and graphs.

- **`lib/`**: Utility functions and helpers.
  - `api.ts`: API interaction utilities.
  - `utils.ts`: Miscellaneous helper functions.

- **`middleware/`**: API middleware.
  - `authMiddleware.ts`: Handles authentication.
  - `logger.ts`: Logs incoming requests.

- **`thay-backend/`**: Backend logic.
  - `controllers/`: Business logic for different entities.
  - `models/`: Database models.
  - `routes/`: API routes.
  - `server.ts`: Entry point for the Node.js server.

---
