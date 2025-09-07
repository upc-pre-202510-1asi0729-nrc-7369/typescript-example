"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
/**
 * Value Object representing a currency with its code and formatting capabilities.
 */
class Currency {
    /**
     * Creates a new Currency instance.
     * @param code - The three-letter ISO 4217 currency code.
     */
    constructor(code) {
        /**
         * Formats a given amount according to the currency and locale.
         * @param amount - The amount to format.
         * @param locale - The locale to use for formatting (default is 'en-US').
         * @return The formatted currency string.
         */
        this.formatAmount = (amount, locale = 'en-US') => {
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
        this.toString = () => this._code;
        this._code = code;
    }
    /**
     * Gets the currency code.
     * @return The three-letter ISO 4217 currency code.
     */
    get code() { return this._code; }
}
exports.Currency = Currency;
