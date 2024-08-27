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
    
    Use command `npm install -g pnpm`, if you don't have pnpm installed already.

3. Set up the environment variables:

    Create a `.env` file in the root of the project and configure the following variables:

    ```bash
    DATABASE_URL="file:./dev.db"
    ```

    For a quick setup, I have used SQLite.

4. Run database migrations(If you want to run initial migrations to the database):

    ```bash
    pnpm prisma migrate dev --name init
    ```

5. Seed the database(If you want to pre-fill the database):

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

## Testing the Functionality

### 1. Testing the Code
### 2. Core Functionalities
This application includes the following core functionalities:

1. Adding Movies:
   - Users can add new movies to the database by filling out a form with details such as title, genre, release date, rating, and a movie poster.
   - Form validation ensures that all required fields are filled out correctly before submission.
2. Editing Movies:
   - Users can edit the details of an existing movie. The form is prefilled with the current details, allowing for easy updates.
3. Deleting Movies:
   - Users can delete a movie from the list. This action also removes the associated poster file from the server to avoid orphaned files.
4. Filtering and Sorting:
   - Users can filter movies by genre and sort them by release date or rating. This is handled on the client side to provide a smooth and responsive user experience.

### 3. Data Fetching and Manipulation
Data fetching and manipulation in this application are handled using Next.js's built-in features and Prisma:

1. Data Fetching:
   - Server-Side Rendering (SSR): Using getServerSideProps to fetch data on each request ensures that the user always sees the most up-to-date movie list.
   - API Routes: Custom API routes are used to handle CRUD operations for movies, interfacing with the database via Prisma.

2. Data Manipulation:
   - **Prisma ORM:** Prisma is used to interact with the PostgreSQL database. It provides a type-safe query builder and handles the database schema migrations.
   - **Formidable for File Uploads:** File uploads (such as movie posters) are handled using the formidable package, which processes incoming form data, including files, and saves them to the server.

### 4. Optimizations Implemented

