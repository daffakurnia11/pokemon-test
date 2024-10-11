# Pokémon Test

This project is a simple web application built using Next.js that interacts with the [PokeAPI](https://pokeapi.co/api/v2/pokemon). It allows users to view a list of Pokémon, search for specific Pokémon, and navigate through paginated results. The application is designed to demonstrate best practices for data fetching, error handling, state management, and testing.

## Table of Contents

- [Project Structure](#project-structure)
- [Installation](#installation)
- [Features](#features)
- [Usage](#usage)
- [Live Demo](#live-demo)
- [Tech Decisions](#tech-decisions)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Performance Overview](#performance-overview)
- [Security Considerations](#security-considerations)
- [Future Improvements](#future-improvements)
- [Contact Information](#contact-information)

## Project Structure

```
|-- public/
|   |-- img/
|       |-- logo-pokeapi.png
|-- src/
|   |-- app/
|       |-- layout.tsx
|       |-- page.tsx
|   |-- components/
|       |-- __tests__/
|           |-- Card.test.tsx
|           |-- Search.test.tsx
|           |-- __snapshots__/
|               |-- Card.test.tsx.snap
|       |-- Card/
|           |-- index.tsx
|           |-- Loading.tsx
|           |-- Pokemon.tsx
|       |-- Input/
|           |-- index.tsx
|           |-- Search.tsx
|       |-- Message/
|           |-- index.tsx
|       |-- Navigation/
|           |-- index.tsx
|       |-- Pages/Pokemon/
|           |-- List.tsx
|       |-- Typography/
|           |-- Heading.tsx
|           |-- index.tsx
|           |-- Text.tsx
|   |-- hooks/
|       |-- __test__/
|           |-- usePokemon.test.ts
|       |-- swr/
|           |-- usePokemon.ts
|   |-- services/
|       |-- apis/
|           |-- api-service.ts
|           |-- pokemon.ts
|       |-- urls/
|           |-- base.ts
|           |-- pokemon.ts
|   |-- styles/
|       |-- globals.css
|   |-- types/
|       |-- pokemon.d.ts
|       |-- typography.d.ts
|   |-- utils/
|       |-- atoms.ts
|       |-- colorMapping.ts
|       |-- fonts.ts
|-- .env.example
|-- .eslint.json
|-- jest.config.ts
|-- jest.setup.ts
|-- next.config.mjs
|-- package.json
|-- package-lock.json
|-- postcss.config.mjs
|-- README.md
|-- tailwind.config.ts
|-- tsconfig.json
```

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/daffakurnia11/pokemon-test.git
   cd pokemon-test
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://pokeapi.co/api/v2
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features

- **Display Pokémon List**: Fetches and displays Pokémon data from the PokeAPI.
- **Search**: Allows users to search for specific Pokémon by the complete name (ex: Pikachu, Bulbasaur, etc.).
- **Pagination**: Displays paginated results for showing other Pokémon list.
- **Error Handling**: User-friendly error messages when API requests fail or the API is unavailable.
- **Testing**: Includes unit and integration tests using Jest and React Testing Library.
- **Responsive Design**: Tailwind CSS is used for styling, ensuring the app is mobile-friendly.

## Usage

- Use the search bar to find specific Pokémon by name.
- Use the pagination arrows to navigate through the Pokémon list.

## Live Demo

Check out the live version of the application:

- [pokemon-test-mu.vercel.app](https://pokemon-test-mu.vercel.app)

## Tech Decisions

- **Framework Choice**:

  - **Next.js**: Utilized for server-side rendering (SSR) and static site generation (SSG), offering improved performance and SEO benefits.
  - **React**: Provides a robust component-based architecture for building reusable and maintainable UI components.

- **State Management**:

  - **Jotai**: Lightweight state management for simple and intuitive state updates.
  - **SWR**: Handles data fetching, caching, and revalidation, keeping the UI in sync with the latest data.

- **Data Fetching**:

  - **Axios**: Simplifies HTTP requests and integrates well with SWR for efficient API interactions.

- **Styling**:

  - **Tailwind CSS**: Offers utility-first classes for rapid styling and a consistent, responsive design.

- **UI Enhancements**:

  - **react-hot-toast**: Provides user-friendly notifications for feedback on interactions.
  - **react-loading-skeleton**: Displays skeleton loaders during data fetches for a smoother user experience.

- **Testing**:
  - **Jest** & **React Testing Library**: Ensure components function as expected through unit and integration tests.
  - **TypeScript**: Improves code quality with type safety and helps catch errors early during development.

## Error Handling

- **API Error Management**: Uses `try-catch` blocks to handle errors during API requests, ensuring that unexpected issues don't crash the app.
- **User Feedback**: Custom hooks manage error states, allowing the UI to display informative messages when data can't be retrieved.
- **Fallback UI**: Provides a fallback message when data is unavailable, guiding users with clear instructions on retrying or checking their connection.

## Testing

- **Jest** and **React Testing Library** are used for testing.
- Test cases include:
  - Rendering components (`Card`, `Search`).
  - Mocking API requests to test interactions.
  - Handling of edge cases like empty states and API errors.
- To run the tests, use:
  ```bash
  npm run test
  ```

## Performance Overview

The Pokémon Test app has been optimized for performance, accessibility, best practices, and SEO, as measured by Google Lighthouse:

| Metric             | Score |
| ------------------ | ----- |
| **Performance**    | 93    |
| **Accessibility**  | 95    |
| **Best Practices** | 100   |
| **SEO**            | 100   |

### Key Metrics

- **First Contentful Paint**: 0.5 seconds – Ensures users see content quickly.
- **Largest Contentful Paint**: 1.7 seconds – Further optimizations can be applied to images.
- **Total Blocking Time**: 40 ms – Minimal JavaScript execution time.
- **Cumulative Layout Shift**: 0.002 – Ensures a stable visual experience without unexpected shifts.

> **Note**: To ensure accurate performance readings, run audits in incognito mode to prevent cached data from affecting scores.

For the live deployment, you can visit: [pokemon-test-mu.vercel.app](https://pokemon-test-mu.vercel.app)

## Security Considerations

- Environment variables (`NEXT_PUBLIC_API_BASE_URL`) are used to keep API base URLs secure.
- Client-side input validation is implemented for user inputs in the search bar to prevent potential XSS attacks.
- CORS is configured to allow requests only from trusted origins.
- Uses `https` for secure communication with the PokeAPI.

## Future Improvements

- **Detailed Pokémon View**: Add a page to display detailed information about each Pokémon.
- **Enhanced Pagination**: Implement infinite scrolling for a smoother user experience.
- **Improved Testing Coverage**: Add more tests for edge cases and component interactions.
- **Light/Dark Mode**: Implement theme switching using Tailwind CSS for improved user experience.

## Contact Information

For any inquiries, feel free to reach out:

- **Email**: daffakurniaf11@gmail.com
- **WhatsApp**: [+6285156317473](https://wa.me/6285156317473)
- **LinkedIn**: [Daffa Kurnia Fatah](https://www.linkedin.com/in/daffakurniafatah/)
- **Portfolio**: [dafkur.com](https://dafkur.com/)
