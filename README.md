# Movie Management App

This is a Movie Management web application built using Next.js, TypeScript, Prisma, and Material-UI. The application allows users to manage a list of movies, including adding, editing, deleting, filtering, and sorting movies.

## Features

- Display a list of movies.
- Add new movies with basic details and a movie poster.
- Edit existing movie details.
- Delete movies.
- Filter and sort movies based on genre, release date, and rating.
- Responsive design using Material-UI and Tailwind CSS.

## Tech Stack

- **Next.js** - React framework for server-side rendering and static site generation.
- **TypeScript** - Strongly typed programming language that builds on JavaScript.
- **Prisma** - ORM for managing database access and schema.
- **Material-UI** - UI component library for React.
- **Tailwind CSS** - Utility-first CSS framework for styling.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (>= 14.x)
- **npm** (>= 6.x) or **pnpm** (>= 6.x) or **yarn** (>= 1.x)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Tanmay1903/movie-management.git
    cd movie-management
    ```

2. Install dependencies:

    ```bash
    pnpm install
    ```

3. Set up the environment variables:

    Create a `.env` file in the root of the project and configure the following variables:

    ```bash
    DATABASE_URL="file:./dev.db"
    ```

    For a quick setup, I have used SQLite.

4. Run database migrations:

    ```bash
    pnpm prisma migrate dev --name init
    ```

5. Seed the database:

    ```bash
    pnpm run seed
    ```

## Running the Application

### Development

To run the application in development mode with hot-reloading:

```bash
pnpm dev
```
The app will be available at `http://localhost:3000`.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
