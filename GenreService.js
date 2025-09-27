// GenreService.js

import { genres } from "./data.js";

/**
 * @file A utility service for handling genre data lookups.
 * @module GenreService
 * @description Provides a method to convert an array of genre IDs into an array of genre titles,
 * isolating the lookup logic from the components and main application.
 * @exports GenreService
 */

/**
 * An object containing genre-related utility methods.
 * @type {object}
 */
export const GenreService = {
    /**
     * Converts an array of genre IDs into an array of genre titles by referencing the global genres data.
     * @param {number[]} genreIds An array of numbers representing genre IDs.
     * @returns {string[]} An array of strings representing the genre titles. Returns an empty array if input is invalid or no matches are found.
     */
    getNames: (genreIds) => {
        // Guard clause for invalid input
        if (!genreIds || !Array.isArray(genreIds)) {
            return [];
        }

        // Filter the global genres list to find matches for the provided IDs
        const matchedGenres = genres.filter(genre => 
            genreIds.includes(genre.id)
        );

        // Map the matched genre objects to just their titles
        return matchedGenres.map(genre => genre.title);
    }
};