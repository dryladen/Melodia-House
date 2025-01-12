# Melodia House

## 🚀 Features

- Next.js for fast, server-rendered and client-rendered pages.
- Directus as a self-hosted CMS for dynamic content management.
- Environment-based configuration with a single variable: NEXT_PUBLIC_DIRECTUS_API.

## 📋 Prerequisites

Make sure you have the following installed:

- Node.js (LTS version recommended)
- npm or yarn
- Docker Desktop

## ⚙️ Environment Setup

Clone the repository:

```bash
git clone https://github.com/dryladen/Melodia-House.git

```

```bash
cd melodia-house
```

Create an .env.local file in the root directory:

```bash
touch .env.local
```

Add the following variable to the .env.local file:

```env
NEXT_PUBLIC_DIRECTUS_API=<Your Directus API URL>
```

Replace `<Your Directus API URL>` with the URL of your Directus instance (e.g., http://localhost:8055 or your production URL).

## 🛠 Installation

Install the dependencies:

```bash
npm install
```

or

```bash
yarn install
```

## 🚀 Running the Application

Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

Open your browser and navigate to:
http://localhost:3000

## 🏗 Building for Production

To create a production build of the application:

Build the application:

```bash
npm run build
```

or

```bash
yarn build
```

Start the production server:

```bash
npm start
```

or

```bash
yarn start
```

By default, the server runs on http://localhost:3000.
