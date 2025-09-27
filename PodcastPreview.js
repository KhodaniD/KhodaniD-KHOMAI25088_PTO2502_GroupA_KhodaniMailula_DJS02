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
    
}