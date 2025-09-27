// createGrid.js

import { createModal } from "./CreateModal.js";
import { podcasts } from "./data.js"; 

/**
 * @file A factory function to create and manage the podcast grid view.
 * @exports createGrid
 */
export const createGrid = () => {
    // Cache DOM element for the grid container
    const container = document.getElementById("podcast-grid");
    
    // Instantiate the modal manager utility
    const modal = createModal();

    // Event listener to handle the custom event dispatched by the Web Component
    /**
     * @param {CustomEvent} event - The custom event dispatched by the podcast-preview component.
     * @param {Object} event.detail - The detail object containing the podcast ID.
     * @returns {void}
     */
    container.addEventListener('podcast-selected', (event) => {
        const { podcastId } = event.detail;

        // Find the full podcast details using the ID from the event
        const selectedPodcast = podcasts.find(p => p.id === podcastId);

        if (selectedPodcast) {
            // Open the modal with the found data
            modal.open(selectedPodcast);
        } else {
            console.error("Podcast data not found for ID:", podcastId);
        }
    });

    /**
     * Renders a list of podcast objects by creating and inserting
     * the 'podcast-preview' custom elements into the grid container.
     * @param {Array<Object>} podcastList - The array of podcast objects to display.
     * @returns {void}
     */
    const render = (podcastList) => {
        // Clear existing content to prepare for the new render
        container.innerHTML = "";

        podcastList.forEach((podcast) => {
            // 1. Create the custom Web Component
            const card = document.createElement('podcast-preview');
            // 2. Pass data via the property setter (set data(podcast))
            card.data = podcast; 
            // 3. Add to the DOM
            container.appendChild(card);
        });
    };

    /**
     * @returns {{render: Function}} An object exposing the public methods of the grid manager.
     */
    return {
        render,
    };
};