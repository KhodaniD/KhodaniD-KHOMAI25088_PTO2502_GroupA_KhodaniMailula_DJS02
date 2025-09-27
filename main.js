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
