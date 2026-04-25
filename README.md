# CA Mahesh Joshi - Professional Website

A modern, professional website for CA practice built with Next.js, TypeScript, and Tailwind CSS.

## Prerequisites

This project requires **Node.js 20+**. The project is configured to automatically use the correct Node version.

### Using nvm (Node Version Manager)

**Install nvm:**
```bash
# Mac/Linux
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Windows: Download from https://github.com/coreybutler/nvm-windows
```

**Auto-switch Node version:**
```bash
# When you cd into this project, run:
nvm use

# This will automatically use Node 20 as specified in .nvmrc
```

**Install Node 20 (if not installed):**
```bash
nvm install 20
nvm use 20
```

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion** - Smooth animations
- **React Hook Form + Zod** - Form handling and validation
- **React Icons / Lucide React** - Icon libraries

## Project Structure

```
camaheshjoshi/
├── app/                 # Next.js App Router pages
├── components/          # React components (to be created)
├── lib/                 # Utilities and data (to be created)
├── public/              # Static assets
├── .nvmrc              # Node version specification
└── .node-version       # Alternative Node version file
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
