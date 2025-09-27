// PodcastPreview.js

import { DateUtils } from "./DateUtils.js";
import { GenreService } from "./GenreService.js";

/**
 * @file The Podcast Preview Web Component.
 * @class PodcastPreview
 * @extends HTMLElement
 * @description A reusable custom HTML element that displays a podcast preview. It uses Shadow DOM for style isolation, relies on external data via the 'data' property, and communicates via a custom 'podcast-selected' event when clicked.
 */
class PodcastPreview extends HTMLElement {
    /**
     * Creates an instance of PodcastPreview.
     * Attaches Shadow DOM, initializes private data, sets up the template,
     * and binds the click handler.
     */
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        /** @private {Object} */
        this._podcastData = {};
        this.shadowRoot.innerHTML = this.getTemplate();
        // Bind click handler to the component root
        this.shadowRoot.addEventListener('click', this._handleClick.bind(this));
    }

   /**
     * Public setter for the podcast data. Triggers a re-render of the component.
     * Adheres to the requirement of being stateless and reliant on external data.
     * @param {Object} podcast - The podcast data object containing id, title, image, seasons, genres, and updated date.
     */
    set data(podcast) {
        this._podcastData = podcast;
        this._render();
    }

    /**
     * Handles the click event on the component.
     * Dispatches a custom event for the parent application to handle, adhering to the decoupling requirement.
     * @private
     * @returns {void}
     */
    _handleClick() {
        if (!this._podcastData || !this._podcastData.id) return;

        /**
         * Custom event fired when the podcast preview is clicked.
         * @event podcast-selected
         * @type {object}
         * @property {number} podcastId - The ID of the selected podcast.
         */
        this.dispatchEvent(new CustomEvent('podcast-selected', {
            bubbles: true,
            composed: true, // Allows the event to escape the Shadow DOM
            detail: { podcastId: this._podcastData.id }
        }));
    } 
  /**
     * Renders the component UI using the current podcast data.
     * Updates the text content and attributes of the elements inside the Shadow DOM.
     * @private
     * @returns {void}
     */
    _render() {
        if (!this._podcastData || !this._podcastData.id) return;

        const { title, image, seasons, genres, updated } = this._podcastData;

        // 1. Cover Image
        const coverEl = this.shadowRoot.querySelector('.podcast-cover');
        if (coverEl) {
            coverEl.src = image;
            coverEl.alt = `${title} cover`;
        }

        // 2. Title
        this.shadowRoot.querySelector('.podcast-title').textContent = title || 'Untitled Podcast';

        // 3. Seasons Count
        const seasonsCount = typeof seasons === 'number' ? seasons : parseInt(seasons) || 0;
        const seasonsText = `${seasonsCount} season${seasonsCount !== 1 ? 's' : ''}`;
        this.shadowRoot.querySelector('.seasons-count p').textContent = seasonsText;

        // 4. Genre Tags
        const genresContainer = this.shadowRoot.querySelector('.genre-tags');
        genresContainer.innerHTML = "";
        // Ensure GenreService is available and provides names
        if (GenreService.getNames) {
             GenreService.getNames(genres).forEach(genre => {
                const span = document.createElement("span");
                span.classList.add("genre-tag");
                span.textContent = genre;
                genresContainer.appendChild(span);
            });
        }

        // 5. Last Updated Date (Human-readable format)
        const updatedDate = DateUtils.relativeFormat(updated);
        this.shadowRoot.querySelector('.last-updated').textContent = `Updated: ${updatedDate}`;
    }  
    
}