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

export class DateTime {
    private readonly _date: Date;

    /**
     * Creates a new DateTime instance.
     * @remarks
     * If no value is provided, the current date and time are used.
     * If a string is provided, it is parsed into a Date object.
     * An error is thrown if the date is invalid or in the future.
     * @param value - The date value as a Date object or an ISO 8601 string.
     * @throws {Error} If the date is invalid or in the future.
     */
    constructor(value?: Date | string) {
        const now = new Date();
        if (value) {
            const parsedDate = new Date(value);
            if (isNaN(parsedDate.getTime())) throw Error(`Invalid date: ${parsedDate}`);
            if (parsedDate > now) throw Error(`Date cannot be in the future: ${parsedDate}`);
            this._date = parsedDate;
        } else this._date = now;
    }

    /**
     * Gets the underlying Date object.
     * @return The Date object.
     */
    public get value(): Date {
        return this._date;
    }

    /**
     * Formats the date into a human-readable string.
     * @param locale - The locale to use for formatting (default is 'en-US').
     * @return The formatted date string.
     */
    public format(locale: string = 'en-US'): string {
        return this._date.toLocaleDateString(locale,
            {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });
    }

    /**
     * Returns the ISO 8601 string representation of the date.
     * @return The ISO 8601 formatted date string.
     */
    public toString(): string {
        return this._date.toISOString();
    }
}