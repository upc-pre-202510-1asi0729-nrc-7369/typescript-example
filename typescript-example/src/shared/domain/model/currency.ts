/**
 * Module for handling currency codes and formatting.
 *
 * @remarks
 * This module defines a `Currency` Value Object that encapsulates a three-letter ISO 4217 currency code.
 * It provides methods to format amounts according to the specified currency and locale.
 * The currency code is validated at compile time using TypeScript's template literal types.
 *
 * Example usage:
 * ```typescript
 * const usd = new Currency('USD');
 * console.log(usd.formatAmount(1234.56)); // Outputs: $1,234.56 (in 'en-US' locale)
 * console.log(usd.code); // Outputs: USD
 * ```
 */

/**
 * Represents an uppercase letter from A to Z.
 */
type UpperCaseLetter =
  | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J'
  | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T'
  | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z';

/**
 * Represents a three-letter ISO 4217 currency code.
 * Examples: USD, EUR, GBP, JPY
 */
export type CurrencyCode = `${UpperCaseLetter}${UpperCaseLetter}${UpperCaseLetter}`;

/**
 * Value Object representing a currency with its code and formatting capabilities.
 */
export class Currency {
    private readonly _code: CurrencyCode;

    /**
     * Creates a new Currency instance.
     * @param code - The three-letter ISO 4217 currency code.
     */
    constructor(code: CurrencyCode) {
        this._code = code;
    }

    /**
     * Gets the currency code.
     * @return The three-letter ISO 4217 currency code.
     */
    public get code(): string { return this._code; }

    /**
     * Formats a given amount according to the currency and locale.
     * @param amount - The amount to format.
     * @param locale - The locale to use for formatting (default is 'en-US').
     * @return The formatted currency string.
     */
    public formatAmount = (amount: number, locale: string = 'en-US'): string => {
        return amount.toLocaleString(locale, {
            style: 'currency',
            currency: this._code,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    };

    /**
     * Returns the string representation of the currency code.
     * @return The three-letter ISO 4217 currency code.
     */
    public toString = (): string => this._code;
}