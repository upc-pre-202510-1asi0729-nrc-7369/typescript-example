import {Currency} from "./currency";

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
export class Money {
    private readonly _amount: number;
    private readonly _currency: Currency;

    /**
     * Creates a new Money instance.
     * @param amount - The monetary amount (must be non-negative).
     * @param currency - The currency of the amount.
     * @throws {Error} If the amount is negative.
     */
    constructor(amount: number, currency: Currency) {
        if (amount < 0) throw Error(`Amount cannot be negative: ${amount}`);
        this._amount = amount;
        this._currency = currency;
    }

    /**
     * Gets the monetary amount.
     * @return The monetary amount.
     */
    public get amount(): number { return this._amount; }

    /**
     * Gets the currency of the monetary amount.
     * @return The currency.
     */
    public get currency(): Currency { return this._currency; }

    /**
     * Formats the monetary amount according to its currency and locale.
     * @param locale - The locale to use for formatting (default is 'en-US').
     * @return The formatted monetary string.
     */
    public format = (locale: string = 'en-US'): string => this._currency.formatAmount(this._amount, locale);

    /**
     * Returns the string representation of the monetary amount with its currency code.
     * @return The string representation in the format "CURRENCY_CODE AMOUNT".
     */
    public toString(): string {
        return `${this._currency.code} ${this._amount.toFixed(2)}`;
    }

    /**
     * Adds another Money instance to this one, ensuring both have the same currency.
     * @throws {Error} If the currencies do not match.
     * @return A new Money instance representing the sum of both amounts.
     * @param other - The other Money instance to add.
     */
    public add = (other: Money): Money => {
        if (this._currency.code !== other.currency.code) {
            throw new Error(`Cannot add amounts with different currencies: ${this._currency.code} and ${other.currency.code}`);
        }
        return new Money(this._amount + other.amount, this._currency);
    }

    /**
     * Multiplies the monetary amount by a non-negative factor.
     * @throws {Error} If the factor is negative.
     * @return A new Money instance representing the multiplied amount.
     * @param factor - The factor to multiply the amount by.
     */
    public multiply = (factor: number): Money => {
        if (factor < 0) throw Error(`Factor cannot be negative: ${factor}`);
        return new Money(this._amount * factor, this._currency);
    }
}