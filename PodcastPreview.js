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
    /**
     * Returns the HTML template string for the Shadow DOM, including encapsulated CSS.
     * @returns {string} The HTML template string.
     */
    getTemplate() {
        return `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

                :host {
                    display: block;
                    cursor: pointer;
                    min-width: 0;
                }

                .podcast-card {
                    background-color: var(--card-bg-color, #fff);
                    border-radius: 8px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                }

                .podcast-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
                }

                .podcast-cover {
                    width: 100%;
                    height: 240px;
                    /* Updated to 'cover' for better mobile filling, but 'contain' was in your original */
                    object-fit: contain; 
                    object-position: center;
                    display: block;
                    margin: 0;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                    background-color: #f4f4f4;
                }

                .podcast-info {
                    padding: 10px;
                    display: flex;
                    flex-direction: column;
                }

                .podcast-title {
                    font-size: 1.1rem;
                    line-height: 1.3;
                    margin: 0 0 6px 0;
                    color: var(--primary-color, #0077cc);
                }

                .podcast-details-top {
                    display: flex;
                    flex-direction: column;
                }

                .seasons-count {
                    display: flex;
                    align-items: center;
                    font-size: 0.85rem;
                    color: var(--light-text-color, #666);
                    margin-bottom: 4px;
                }

                .seasons-icon {
                    font-size: 16px;
                    margin-right: 4px;
                }

                .genre-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 5px;
                    margin-bottom: 4px;
                }

                .genre-tag {
                    font-size: 0.75rem;
                    background-color: var(--accent-color, var(--primary-color, #0077cc));
                    color: white;
                    padding: 2px 8px;
                    border-radius: 12px;
                    white-space: nowrap;
                }

                .last-updated {
                    font-size: 0.75rem;
                    color: var(--light-text-color, #666);
                    margin-top: 4px;
                }
