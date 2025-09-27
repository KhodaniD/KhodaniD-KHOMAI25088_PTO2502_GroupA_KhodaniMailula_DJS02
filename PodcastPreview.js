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

    
}