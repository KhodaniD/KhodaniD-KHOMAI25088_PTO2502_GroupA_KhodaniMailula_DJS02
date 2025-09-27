// createModal.js

import { DateUtils } from "./DateUtils.js";
import { GenreService } from "./GenreService.js";
import { seasons } from "./data.js"; // Note: Only 'seasons' is needed here, 'podcasts' is not.

/**
 * @file A factory function to create and manage the podcast detail modal.
 * @exports createModal
 */
export const createModal = () => {
    // Cache DOM elements
    const modal = document.getElementById("podcast-modal");
    const closeBtn = document.getElementById("modal-close-btn");
    
    // Cache modal content elements
    const modalTitle = document.getElementById("modal-title");
    const modalImage = document.getElementById("modal-image");
    const modalDescription = document.getElementById("modal-description");
    const modalGenres = document.getElementById("modal-genres");
    const modalUpdated = document.getElementById("modal-updated");
    const modalSeasonsList = document.getElementById("modal-seasons-list");

    /**
     * Opens the modal and populates it with the details of the selected podcast.
     * @param {Object} podcast - The podcast object containing title, image, description, genres, and update date.
     * @returns {void}
     */
    const open = (podcast) => {
        // Find the associated season data using the podcast ID
        const podcastSeasons = seasons.find((s) => s.id === podcast.id);

        // Populate main podcast details
        modalTitle.textContent = podcast.title;
        modalImage.src = podcast.image;
        modalImage.alt = `Cover art for ${podcast.title}`;
        modalDescription.textContent = podcast.description;

        // Populate updated date using long format
        modalUpdated.textContent = `Last updated: ${DateUtils.longFormat(podcast.updated)}`; 

        // Populate genre tags
        modalGenres.innerHTML = "";
        const genres = GenreService.getNames(podcast.genres);
        genres.forEach((genre) => {
            const span = document.createElement("span");
            span.classList.add("modal-genre-tag");
            span.textContent = genre;
            modalGenres.appendChild(span);
        });

        // Populate the seasons list
        modalSeasonsList.innerHTML = "";
        if (podcastSeasons && podcastSeasons.seasonDetails) {
            podcastSeasons.seasonDetails.forEach((season) => {
                const li = document.createElement("li");
                li.classList.add("season-item");
                li.innerHTML = `
                    <h4>Season ${season.season}: ${season.title}</h4>
                    <p class="episode-count">${season.episodes} episodes</p>
                `;
                modalSeasonsList.appendChild(li);
            });
        }
        
        // Show the modal
        modal.classList.remove("hidden");
    };

    /**
     * Hides the modal.
     * @returns {void}
     */
    const close = () => {
        modal.classList.add("hidden");
    };

    // --- Event Listeners ---
    
    // 1. Close button click
    closeBtn.addEventListener("click", close);
    
    // 2. Click outside the modal content (best practice for UX)
    modal.addEventListener('click', (event) => {
        // If the click target is the modal backdrop itself (not a child of modal-content)
        if (event.target === modal) {
            close();
        }
    });

    /**
     * @returns {{open: Function, close: Function}} An object exposing the public methods of the modal manager.
     */
    return {
        open,
        close,
    };
};