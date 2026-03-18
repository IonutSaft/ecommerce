# 🛒 Modern E-commerce Platform

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://ecommerce-ivory-nine-53.vercel.app/)

> **⚠️ Work in Progress:** This application is currently under active development. Some features are partially implemented or planned for future releases.

A full-stack, high-performance e-commerce application built with the latest technologies: **Next.js 16**, **Prisma 7**, **NextAuth.js v5**, and **Tailwind CSS 4**.

## 🚀 Planned & Core Features

- **🔐 Advanced Authentication:** Secure sign-in/sign-up with NextAuth.js v5, custom credentials provider, and future OAuth integration.
- **🔍 Search & Filters:** Dynamic product searching, category filtering, and advanced sorting capabilities.
- **🛒 Shopping Cart:** A seamless cart experience with persistent storage and real-time updates.
- **💳 Stripe Payments:** Secure checkout flow integrated with Stripe for global payment processing.
- **🛠️ Admin Dashboard:** Comprehensive management suite for products, categories, inventory, and orders.
- **⭐ Product Reviews:** Customer feedback system with ratings and verified purchase badges.
- **📧 Email Confirmations:** Automated transactional emails for order confirmations and status updates via Resend/React Email.
- **🧪 Quality Assurance:** Robust testing suite including unit, integration, and E2E tests.
- **💖 Wishlist:** User-personalized wishlists to save favorite products for later.
- **📱 Responsive Design:** Mobile-first, fluid layouts powered by Tailwind CSS 4.
- **📈 SEO & Metadata:** Optimized for search engines using Next.js Metadata API and server-side rendering.

## 🛠️ Tech Stack

- **Frontend:** [React 19](https://react.dev/), [Next.js 16](https://nextjs.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Database:** PostgreSQL
- **ORM:** [Prisma 7](https://www.prisma.io/)
- **Auth:** [NextAuth.js v5 (Beta)](https://authjs.dev/)
- **Validation & Hashing:** [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- **Language:** TypeScript

## 📂 Project Structure

- `app/`: Next.js App Router (API, Auth, Components, Profile).
- `lib/`: Shared utilities (Prisma client, NextAuth configuration).
- `prisma/`: Database schema, migrations, and seeding logic.
- `generated/prisma/`: Custom output location for optimized Prisma Client.

## 🚦 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database instance

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd ecommerce
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file:

   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce_db"
   AUTH_SECRET="your-super-secret-key"
   STRIPE_SECRET_KEY="your-stripe-key"
   ```

4. **Initialize the database:**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   npx tsx prisma/seed.ts
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🏗️ Available Scripts

| Command               | Action                              |
| :-------------------- | :---------------------------------- |
| `npm run dev`         | Starts the development server.      |
| `npm run build`       | Builds for production.              |
| `npm run lint`        | Checks for code quality issues.     |
| `npx prisma generate` | Generates the custom Prisma Client. |

## 📄 License

This project is licensed under the MIT License.
