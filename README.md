# Order Tracking Screen

A modern, professional mobile-first order tracking screen built with React and Vite. This project demonstrates a polished e-commerce post-purchase experience, focusing on clear communication and handling various edge-case delivery states.

## Features

- **Dynamic Status Scenarios**: Handles three distinct tracking states gracefully:
  - **Delayed**: Clear communication of revised delivery times with appropriate warning states and next steps.
  - **Delivered (Not Received)**: Specific UI flows for when a package is marked delivered but the customer hasn't received it, including an easy reporting mechanism.
  - **No Tracking Yet**: A friendly awaiting-pickup state avoiding broken or empty screens.
- **Custom Design System**: Built with pure CSS (no heavy CSS frameworks) using a robust set of CSS variables for colors, typography, spacing, and smooth animations.
- **Mobile-Optimized**: Responsive design specifically tailored for mobile viewports (~360px - 430px) to provide a native app-like feel.
- **Rich Interactive Components**:
  - Vertical progress timeline with current, completed, pending, and delayed states.
  - Slide-up Bottom Sheets (Modals) for support options, detailed order summaries, and issue reporting.
  - Auto-dismissing toast notifications for interactive actions (e.g., copying tracking IDs).
  - Skeleton loading states for smooth and perceived performance during data fetching.
- **Zero-Dependency Icons**: All icons are custom-built inline SVGs, keeping the project lightweight and performant.

## Tech Stack

- **Framework**: React (Bootstrapped with Vite)
- **Styling**: Vanilla CSS (`index.css`)
- **Data**: Mocked client-side for demonstration (`mockOrders.js`)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. Open the local URL (usually `http://localhost:5173`) in your browser. 
   > **Note:** For the best experience, view this application in a mobile viewport (using your browser's Developer Tools Device Mode).

## Project Structure

- `src/components/`: Modular React components including the main `OrderTrackingScreen`, `Timeline`, `BottomSheet`, `LoadingSkeleton`, and custom `Icons`.
- `src/data/`: Contains `mockOrders.js` with the comprehensive state data for the different scenarios.
- `src/utils/`: Helper functions for formatting dates, times, and progress calculations.
- `src/index.css`: The core styling and design tokens.
