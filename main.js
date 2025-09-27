// main.js

import { podcasts, genres } from "./data.js";
import { createGrid } from "./createGrid.js";
import "./PodcastPreview.js"; 

// --- DOM Element Caching ---
const genresDropdown = document.getElementById("genres-dropdown");
const sortDropdown = document.getElementById("sort-dropdown");

// Instantiate the grid factory (assuming 'createGrid' handles DOM rendering)
const podcastGrid = createGrid();

/**
 * Populates the genres dropdown dynamically with options from the imported 'genres' data.
 * Adheres to the user story of presenting filtered views.
 * @returns {void}
 */
const populateGenresDropdown = () => {
    if (!genresDropdown) return; 

    // Start with the default "All Genres" option
    genresDropdown.innerHTML = '<option value="all">All Genres</option>'; 
    
    // Add options for each genre
    genres.forEach((genre) => {
        const option = document.createElement("option");
        option.value = genre.id;
        option.textContent = genre.title;
        genresDropdown.appendChild(option);
    });
};

/**
 * Contains the core sorting logic for the podcast data.
 * @param {Array<Object>} list - The array of podcast objects to sort.
 * @param {string} sortBy - The criteria to sort by (e.g., 'updated-desc', 'newest-desc', 'popular-desc', 'title-asc').
 * @returns {Array<Object>} The newly sorted array of podcast objects.
 */
const sortPodcasts = (list, sortBy) => {
    const sortedList = [...list]; 

    switch (sortBy) {
        case 'updated-desc': // Recently Updated (Newest date first)
            sortedList.sort(
                (a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime()
            );
            break;

        case 'newest-desc': // Newest (Based on releaseDate, fallback to updated)
            sortedList.sort((a, b) => {
                const dateA = new Date(a.releaseDate || a.updated || 0).getTime();
                const dateB = new Date(b.releaseDate || b.updated || 0).getTime();
                return dateB - dateA; // Descending (newest first)
            });
            break;

        case 'popular-desc': // Most Popular (Proxy: highest season count first)
            sortedList.sort((a, b) => {
                // Safely get season count, defaulting to 0 if missing/null
                const seasonsA = a.seasons ? a.seasons.length : 0;
                const seasonsB = b.seasons ? b.seasons.length : 0;
                
                // Primary sort: season count
                if (seasonsA !== seasonsB) {
                    return seasonsB - seasonsA; // Descending: More seasons first
                }
                
                // Tie-breaker: title length (or alphabetical if preferred)
                return a.title.localeCompare(b.title);
            });
            break;

        case 'title-asc': // Alphabetical (Ascending)
            sortedList.sort((a, b) => a.title.localeCompare(b.title));
            break;

        default:
            // Fallback for an unrecognized sort key
            return sortPodcasts(sortedList, 'updated-desc');
    }
    return sortedList;
};

/**
 * Orchestrates the filtering and sorting process based on current dropdown selections,
 * then renders the results to the grid.
 * @returns {void}
 */
const filterAndSortPodcasts = () => {
    // Safely get selected values, defaulting to state that shows all
    const selectedGenreId = genresDropdown ? genresDropdown.value : 'all';
    const sortBy = sortDropdown ? sortDropdown.value : 'updated-desc'; 

    let filteredPodcasts = [...podcasts];

    // --- 1. Filter by genre ---
    if (selectedGenreId !== "all") {
        const genreIdNum = parseInt(selectedGenreId);
        filteredPodcasts = filteredPodcasts.filter((podcast) =>
            // Check if the podcast's genres array includes the selected genre ID
            podcast.genres.includes(genreIdNum)
        );
    }

    // --- 2. Sort the filtered list ---
    const finalSortedPodcasts = sortPodcasts(filteredPodcasts, sortBy);

    // --- 3. Render the results ---
    podcastGrid.render(finalSortedPodcasts);
};

// --- Initialization & Listeners ---

// Add event listeners for dynamic filtering/sorting
if (genresDropdown) {
    genresDropdown.addEventListener("change", filterAndSortPodcasts);
}
if (sortDropdown) {
    sortDropdown.addEventListener("change", filterAndSortPodcasts);
}

// Initial application setup upon DOM load
document.addEventListener("DOMContentLoaded", () => {
    populateGenresDropdown();
    // Run the filter/sort on load to populate the initial grid state
    filterAndSortPodcasts(); 
});
