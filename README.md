
# 1. How to run the project locally

- Clone the repo
```
git clone https://github.com/alok-kiran/fundingpips-frontend-assessment.git
cd fundingpips-frontend-assessment

```
- Make sure node version is 20 or greater
- npm intstall
- npm run dev
- go to http://localhost:3000
- or you can directly access it without running at - https://fundingpips-demo.vercel.app/

# 2. How to run unit test
- npm run test
### Code coverage
- Open the index.html file from -  **coverage/Icov-report/** in the browser
---

# 3. How to run e2e
- npx cypress open or npx cypress run
- cypress will open a browser, you can see the test run there
- For code coverage I needed to do extra steps, didn't have time

### Code coverage - Unit test
- Open the index.html file from -  **coverage/Icov-report/** in the browser


# 4. Project Structure & Architecture
### Decision
- Chose Next.js (with the new App Router) for built-in file-based routing, SSR, and React Server Components.
- Organized routes under the app/ directory (e.g., app/page.tsx, app/dashboard/page.tsx) and used app/layout.tsx for global layout.
- Implemented a Redux store to manage state across client components.
### Trade-offs
#### Pros:
- Consolidated approach: no separate backend needed for minor APIs. You can mock data in `app/api/stocks/route.ts`
- Next.js automatically handles route creation, bundling, code splitting, and SSR.
- Redux keeps state consistent across the app, especially if multiple components need the same data (stocks, user preferences, etc.).
#### Cons:
- Next.js’ newer App Router may require learning or unlearning patterns from older versions.
- Redux introduces overhead in setting up actions, reducers, and slices, compared to local state or simpler libraries.
- Must be mindful of where Redux is used (client vs. server) to avoid SSR pitfalls.

# 5. Layout & Page Structure
### Decision
- Used layout.tsx to handle global UI elements (e.g., navigation, footer, meta tags).
- Created page.tsx within each route folder for self-contained page logic and rendering.
### Trade-offs
#### Pros:
- Layout components keep global concerns (navigation, consistent styling) in one place.
- Page-based file structure is intuitive—less manual routing configuration.
#### Cons:
- Nested or parallel layouts can become complex if the app grows significantly.
- Not every page needs a distinct layout, so you might occasionally find the structure more verbose than necessary.

# 6. Styling & UI Framework
### Decision
- **Tailwind CSS** as the primary utility-first styling framework.
- **shadcn/ui** components (e.g., buttons, modals) to maintain a consistent, modern UI without reinventing the wheel.
### Trade-offs
#### Pros:
- **Tailwind CSS:** Rapid styling with utility classes; easy to create custom themes using `tailwind.config.js`.
- **shadcn/ui:** Pre-built, Tailwind-based components that align with modern design patterns (often built on Radix UI).
- Consistent UI look-and-feel for buttons, modals, and other interactive components.
#### Cons:
- Some devs may find utility classes verbose in the JSX.
- shadcn/ui is relatively new, so documentation and community resources might be more limited than older libraries.
- Must manage versions or updates from shadcn/ui if you rely on many of their components.

# 6. Routing & Navigation (App Router)
### Decision
- Leveraged Next.js App Router for file-based routing, placing each route in `app/<route>/page.tsx`.
- Used Link from next/link for client-side transitions.
### Trade-offs
#### Pros:
- Automatic route creation—less boilerplate than older Next.js or React Router setups.
- Built-in prefetching for <Link> can speed up client-side transitions.
- Can choose between server and client components for performance or interactivity.
#### Cons:
- Must carefully decide which components are client-based (e.g., those needing Redux or interactive shadcn/ui components) vs. server-based (for SSR or static rendering).
- If you rely heavily on dynamic routes or nested layouts, you need to plan folder structure carefully.

# 5. Data Flow & State Management (Redux)
### Decision
- Set up a Redux store for global state.
- Integrated Redux with Next.js by marking relevant components as client components.
- Mocked stocks data in `app/api/stocks/route.ts` and fetched it to populate the Redux store.
### Trade-offs
#### Pros:
- Centralized control over global data (stocks, user preferences, UI states, etc.).
- Easy debugging via Redux DevTools; clear flow of actions and state changes.
- Mocked data approach keeps local development self-contained—no external API dependency.
#### Cons:
- Overhead of Redux boilerplate (actions, reducers, slices) compared to simpler local states or Context.
- Must be mindful of data fetching patterns (SSR vs. client-side) to avoid hydration mismatches.

# 6. API Integration (Mocked Data)
### Decision
- Next.js Route Handler in `app/api/stocks/route.ts` to serve static JSON of stocks data.
- Frontend fetches `/api/stocks` at runtime or build time.
### Trade-offs
#### Pros:
- Eliminates need for external backend service during early development.
- Encourages clear contract between frontend and API.
- Easy to switch to real API later by replacing route handler logic.
#### Cons:
- Doesn't represent real-time data.
- May overlook edge cases that real API would present (authentication, rate limits).

# 7. Responsiveness & Accessibility
### Decision
- Applied mobile-first design with Tailwind's responsive classes.
- Used semantic HTML and ARIA attributes within shadcn/ui components.
### Trade-offs
#### Pros:
- Consistent responsive approach using Tailwind breakpoints.
- Robust accessibility through shadcn/ui's accessible primitives.
#### Cons:
- Time-consuming testing across multiple screen sizes.
- Must maintain accessibility when modifying shadcn/ui components.

# 8. Testing & Quality Assurance
### Decision
- Jest and React Testing Library for Redux slices and UI components.
- Potential E2E testing with Cypress or Playwright.
### Trade-offs
#### Pros:
- Early bug detection in Redux flow and UI components.
- Confidence in SSR and client-side state functionality.
#### Cons:
- Additional setup time for test tooling.
- Test maintenance can slow development during requirement changes.

# 9. Deployment & Delivery
### Decision
- Deployed on Vercel for easy integration and automatic builds.
- Minimal configuration for SSR routes and API endpoints.
### Trade-offs
#### Pros:
- One-click or automatic deployment from GitHub/CI pipelines.
- Built-in serverless function handling for route handlers.
#### Cons:
- Potential cold-start performance issues at scale.
- Custom server configuration needed for specialized hosting.

# 10. Future Improvements
### Pagination
- Implement pagination for stocks listing.
- Enhance user experience and performance.

### Searchable Table
- Add search/filter functionality.
- Improve usability with large datasets.

### Real-Time Data
- Transition to WebSocket or real-time mechanisms.
- Enable automatic stock data updates.

### Enhanced Components
- Further integrate shadcn/ui components.
- Compare with alternative Tailwind-based libraries.

### API Integration
- Replace mock API with live backend.
- Address authentication and rate limiting.

### State Management
- Consider RTK Query for async logic.
- Scale Redux structure with modular code.

### Performance
- Leverage React Server Components.
- Implement Next.js caching mechanisms.

### Accessibility
- Regular audits with axe/Lighthouse.
- Maintain ARIA patterns in components.

### Testing
- Expand coverage for API endpoints and Redux.
