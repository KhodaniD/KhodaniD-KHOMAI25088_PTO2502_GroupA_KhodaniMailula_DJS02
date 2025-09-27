# DJSL02: Web Component: Podcast Preview

---

## Project Title

**Podcast Discovery App with Web Component Architecture and Advanced Filtering**

---

## Project Description

This project develops a foundational podcast discovery web application designed to help users browse and sort a large library of shows. The application is built around a modern, modular architecture, centered on a reusable **Podcast Preview Web Component** (`<podcast-preview>`) that encapsulates its own logic and styling using the **Shadow DOM**.

The application dynamically fetches podcast data, presents it in a responsive grid, and introduces robust **Filtering and Sorting** functionality (by genre, popularity, recency, and title). Clicking a podcast card triggers a **custom event** handled by the main app, which then opens a detailed modal view. This project demonstrates advanced native JavaScript features, adhering strictly to **Web Component standards** for superior modularity, maintainability, and code reusability.

---

## Technologies Used

* **HTML5**: Provides the structural backbone.
* **CSS3**: Handles styling, including layout, typography, and comprehensive responsive design.
    * **CSS Variables**: Utilized for a flexible color palette.
    * **Flexbox & CSS Grid**: Employed for responsive layouts, ensuring an adaptive design for the main content and filters.
* **JavaScript (ES6+)**: Powers all dynamic behavior and core application logic.
    * **Web Components**: **The core architectural feature.** Uses `customElements.define()` and **Shadow DOM** for a reusable `<podcast-preview>` element.
    * **ES Modules (`type="module"`)**: Used for code organization, promoting separation of concerns across utility files.
    * **Utility Services**: Implemented **`DateUtils`** and **`GenreService`** to handle all data translation (dates to human-readable format, IDs to genre names).
* **Material Symbols**: Integrated as a clean, scalable icon library.

---

## Features

### Web Component & Architecture

* **Reusable Podcast Preview (`<podcast-preview>`)**: A custom HTML element that accepts podcast data via a property setter (`card.data = podcast`) and renders completely independently of the main app's DOM logic.
* **Style and Logic Encapsulation (Shadow DOM)**: The component's styling and structure are fully isolated from the global environment, ensuring zero style conflicts (a key Web Component standard).
* **Decoupled Communication (Custom Events)**: User clicks on the component trigger a **custom event** (`podcast-selected`), allowing the main app to open the modal without the component needing to know anything about the modal's existence or logic.
* **Stateless Design**: The component is stateless, relying entirely on the data provided to it, making it extremely predictable and reusable.

### Core App Features

* **Advanced Filtering & Sorting**:
    * **Genre Filtering**: Users can filter the grid instantly by any available genre.
    * **Multiple Sorting Options**: The grid can be sorted by **Recently Updated** (using `DateUtils`), **Most Popular** (by season count), **Newest Release**, and **Title (A-Z)**.
* **Dynamic Podcast Grid**: Shows are dynamically generated and displayed in a **responsive grid** that collapses to a single column on mobile.
* **Interactive Modal View**: Triggered by the Web Component's custom event, the modal displays full show details, including dynamic genre tags (using `GenreService`) and season/episode lists.

### Code Quality & Maintainability

* **Modular JavaScript (ES Modules)**: Code is strictly organized into single-responsibility modules (e.g., `main.js`, `createGrid.js`, `PodcastPreview.js`, `DateUtils.js`, `GenreService.js`).
* **JSDoc Comments**: **Every major function and module is thoroughly documented with JSDoc comments**, including descriptions, parameters, and return values, ensuring self-documented and professional-grade code.
* **Consistent Formatting**: Adherence to consistent and readable code formatting across all files.

---

## Setup Instructions

To run this project locally, simply follow these steps:

1.  **Clone the repository:**

    If you haven't already, clone the project repository to your local machine using the command below:

    ```bash
    git clone: https://github.com/KhodaniD/KhodaniD-KHOMAI25088_PTO2502_GroupA_KhodaniMailula_DJS02
    ```

2.  **Navigate to the project directory:**

    Open your terminal or command prompt and change to the project's root directory:

    ```bash
    cd KHOMAI25088_PTO2502_GroupA_KhodaniMailula_DJS02 # Replace with your actual project folder name if different
    ```


3.  **Open `index.html`:**

    Locate the `index.html` file in the root of the project directory. Double-click this file or drag it into your preferred web browser (e.g., Chrome, Firefox).

    **Note**: Because this project uses ES Modules (`type="module"`), it is highly recommended to view it using a **local web server** (e.g., VS Code's Live Server extension) for optimal performance and to avoid potential CORS issues.

---

## Working Usage Examples

### Interaction and Functionality:

* **Filtering**: Select a genre from the 'Filter by' dropdown; the grid will instantly update.
* **Sorting**: Select an option from the 'Sort by' dropdown (e.g., 'Most Popular'); the grid will reorder the current list.
* **Detail View**: Click on any podcast card. The modal will appear, displaying full show details, including the updated date in a **long format** (e.g., "September 27, 2025") generated by **`DateUtils`**.

### Responsive Layout Verification:

* **Mobile View**: Use your browser's developer tools to enable device emulation (or view on a mobile device).
    * The **filter bar** elements will stack appropriately.
    * The **podcast cards** will stretch to occupy the full width of the screen, as designed via the Shadow DOM media query.
    * The **modal** content will reorganize for optimal reading on small screens.