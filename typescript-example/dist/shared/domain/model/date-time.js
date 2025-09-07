"use strict";
/**
 * Value Object representing a date and time.
 * Ensures the date is not in the future and provides formatting options.
 * @remarks
 * This class encapsulates a Date object and provides methods to format the date
 * in a human-readable way. It validates that the date is not in the future upon instantiation.
 *
 * Example usage:
 * ```typescript
 * const pastDate = new DateTime('2023-01-01T12:00:00Z');
 * console.log(pastDate.format()); // Outputs: 01/01/2023, 12:00:00 PM (in 'en-US' locale)
 * console.log(pastDate.toString()); // Outputs: 2023-01-01T12:00:00.000Z
 * ```
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTime = void 0;
class DateTime {
    /**
     * Creates a new DateTime instance.
     * @remarks
     * If no value is provided, the current date and time are used.
     * If a string is provided, it is parsed into a Date object.
     * An error is thrown if the date is invalid or in the future.
     * @param value - The date value as a Date object or an ISO 8601 string.
     * @throws {Error} If the date is invalid or in the future.
     */
    constructor(value) {
        const now = new Date();
        if (value) {
            const parsedDate = new Date(value);
            if (isNaN(parsedDate.getTime()))
                throw Error(`Invalid date: ${parsedDate}`);
            if (parsedDate > now)
                throw Error(`Date cannot be in the future: ${parsedDate}`);
            this._date = parsedDate;
        }
        else
            this._date = now;
    }
    /**
     * Gets the underlying Date object.
     * @return The Date object.
     */
    get value() {
        return this._date;
    }
    /**
     * Formats the date into a human-readable string.
     * @param locale - The locale to use for formatting (default is 'en-US').
     * @return The formatted date string.
     */
    format(locale = 'en-US') {
        return this._date.toLocaleDateString(locale, {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
    }
    /**
     * Returns the ISO 8601 string representation of the date.
     * @return The ISO 8601 formatted date string.
     */
    toString() {
        return this._date.toISOString();
    }
}
exports.DateTime = DateTime;
