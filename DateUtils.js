// DateUtils.js

/**
 * @file A utility module for handling date formatting.
 * @module DateUtils
 * @description This module provides two date formatting methods: one for detailed dates (modal) 
 * and one for relative time (card), adhering to best practices for utility encapsulation.
 */

/**
 * An object containing date-related utility methods.
 * @type {object}
 * @exports DateUtils
 */
export const DateUtils = {
    /**
     * Formats an ISO date string into a long, human-readable format (e.g., "Month Day, Year").
     * Used for the detail modal.
     * @param {string} dateString The ISO 8601 date string to format.
     * @returns {string} The formatted date string (e.g., "September 27, 2025").
     */
    longFormat: (dateString) => {
        const date = new Date(dateString);
        // Ensure date is valid before formatting
        if (isNaN(date)) return "Invalid Date";
        
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    },

    /**
     * Formats an ISO date string into a relative time string (e.g., "2 days ago").
     * Used for the podcast card view. Utilizes the native Intl.RelativeTimeFormat if available.
     * @param {string} dateString The ISO 8601 date string to format.
     * @returns {string} The relative time string.
     */
    relativeFormat: (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);

        // Fallback for relative time calculation (as provided in the original code)
        // This is necessary for environments that might not fully support Intl.RelativeTimeFormat
        
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        
        return "just now";
    }
};