import * as chrono from 'chrono-node';
/**
 * Parses a natural language date string into a Date object.
 * Returns null if parsing fails.
 */
export function parseDateTime(input) {
    const results = chrono.parse(input);
    if (results.length === 0) {
        return null;
    }
    return results[0].start.date();
}
/**
 * Formats a Date object to ISO string without the milliseconds and Z.
 * Graph API expects format like: 2024-05-13T17:00:00
 */
export function formatToGraphDate(date) {
    return date.toISOString().split('.')[0];
}
//# sourceMappingURL=dateParser.js.map