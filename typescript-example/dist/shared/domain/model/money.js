"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Money = void 0;
/**
 * Value Object representing a monetary amount in a specific currency.
 *
 * @remarks
 * This class encapsulates a monetary amount and its associated currency.
 * It validates that the amount is non-negative upon instantiation and provides methods
 * to format the amount in a human-readable way according to the currency and locale.
 * @example
 * ```typescript
 * const usd = new Currency('USD');
 * const money = new Money(100, usd);
 * console.log(money.format()); // Outputs: $100.00 (in 'en-US' locale)
 * console.log(money.toString()); // Outputs: USD 100.00
 * ```
 */
class Money {
    /**
     * Creates a new Money instance.
     * @param amount - The monetary amount (must be non-negative).
     * @param currency - The currency of the amount.
     * @throws {Error} If the amount is negative.
     */
    constructor(amount, currency) {
        /**
         * Formats the monetary amount according to its currency and locale.
         * @param locale - The locale to use for formatting (default is 'en-US').
         * @return The formatted monetary string.
         */
        this.format = (locale = 'en-US') => this._currency.formatAmount(this._amount, locale);
        /**
         * Adds another Money instance to this one, ensuring both have the same currency.
         * @throws {Error} If the currencies do not match.
         * @return A new Money instance representing the sum of both amounts.
         * @param other - The other Money instance to add.
         */
        this.add = (other) => {
            if (this._currency.code !== other.currency.code) {
                throw new Error(`Cannot add amounts with different currencies: ${this._currency.code} and ${other.currency.code}`);
            }
            return new Money(this._amount + other.amount, this._currency);
        };
        /**
         * Multiplies the monetary amount by a non-negative factor.
         * @throws {Error} If the factor is negative.
         * @return A new Money instance representing the multiplied amount.
         * @param factor - The factor to multiply the amount by.
         */
        this.multiply = (factor) => {
            if (factor < 0)
                throw Error(`Factor cannot be negative: ${factor}`);
            return new Money(this._amount * factor, this._currency);
        };
        if (amount < 0)
            throw Error(`Amount cannot be negative: ${amount}`);
        this._amount = amount;
        this._currency = currency;
    }
    /**
     * Gets the monetary amount.
     * @return The monetary amount.
     */
    get amount() { return this._amount; }
    /**
     * Gets the currency of the monetary amount.
     * @return The currency.
     */
    get currency() { return this._currency; }
    /**
     * Returns the string representation of the monetary amount with its currency code.
     * @return The string representation in the format "CURRENCY_CODE AMOUNT".
     */
    toString() {
        return `${this._currency.code} ${this._amount.toFixed(2)}`;
    }
}
exports.Money = Money;
