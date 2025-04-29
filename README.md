# 📽️Movie Verse
![Homepage](./src/assets/Screenshot%202025-04-29%20005412.png)

MovieVerse is a web application that allows users to browse popular movies, view information about each movie, create their own watchlist, write reviews and get recommendations on movies to watch based on their interest. Built with mordern web technologies, it offers a clean, responsive and interactive UI.

![Movie Details Page](./src/assets/image1.png)
## Features
- Browse popular movies
- Search for movies by title
- View detailed movie info like synopsis, rating, cast and release date
- curate your own watchlist and get recommendation based on your interests
- Write reviews 

## Tech Stack
- Frontend: React, Javascript, CSS
- Backend: firebase firestore, firebase authentication
- Routing: React Router
- API: TMDb API
- Testing: Playwright
- Deployment: Render, GitHub

## Installation
- git clone https://github.com/woomie/movieVerse.git
- npm install
- create a .env file and add your TMDb API key:
    REACT_APP_TMDB_API_KEY=Your-API-Key-here
- Run the app: npm start
- Run tests: npx playwright test

## Technical Highlights
- Reusable Components
    Developed modular components like Navbar, MovieCard, MovieList, MovieDetails, and Recommendation to ensure code reusability and maintainability.
    Followed best practices for component organization using props, conditional rendering, and separation of concerns.

- Playwright Testing
    Navigating to movie detail pages
    Search functionality
    Sign-in and protected routes
    Ensured UI components render correctly and dynamic routes work as expected.

- Authentication & Protected Routes
    Integrated user authentication using Firebase.
    Built protected features like Watchlist and User Profile that conditionally render based on login state.

- Dynamic Routing & API Integration
    Implemented dynamic routing (/movie/:id) to display detailed movie pages using data fetched from an external movie API.
    Utilized useEffect and useParams to fetch and display content dynamically.

- State Management & Props Handling
    Managed state using useState and useEffect hooks, passing props down to children as needed. Used conditional rendering to show or hide elements based on state and user interaction.

## Future Plans
- Implement Server-Side Rendering (SSR) with Next.js:
To improve performance, SEO, and load times, I plan to migrate MovieVerse to Next.js and use getServerSideProps to fetch movie data dynamically on the server. This will ensure users get fast, SEO-optimized content and a smoother experience.

- Movie Trailer Previews
Integrate YouTube or TMDB trailer previews directly into movie details 

- Improve User recommendation using AI
Use machine learning or collaborative filtering to generate smarter movie recommendations based on user behavior and preferences.




