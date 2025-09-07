"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Customer = void 0;
/**
 * Represents a customer aggregate with a unique ID, name, and last order price.
 *
 * @remarks
 * This class encapsulates the properties and behaviors of a customer in the CRM bounded context.
 * It ensures that the customer's name is not empty and allows tracking of the last order price.
 * The unique ID is generated using crypto UUID to ensure global uniqueness.
 *
 * @example
 * ```typescript
 * const customer = new Customer ('John Doe');
 * console.log(customer.id); // Outputs: a unique UUID
 * console.log(customer.name); // Outputs: John Doe
 * customer.lastOrderPrice = new Money(150, new Currency('USD'));
 * console.log(customer.lastOrderPrice?.toString()); // Outputs: USD 150.00
 * ```
 */
class Customer {
    /**
     * Creates a new Customer instance.
     * @remarks
     * The constructor generates a unique UUID ID for the customer and validates that the name is not empty.
     * The last order price is initialized to null and can be set later.
     * @throws {Error} If the name is empty or consists only of whitespace.
     * @param name - The name of the customer.
     */
    constructor(name) {
        if (!name || name.trim() === '')
            throw Error(`Customer name cannot be empty: ${name}`);
        this._id = crypto.randomUUID();
        this._name = name;
        this._lastOrderPrice = null;
    }
    /**
     * Gets the unique ID of the customer.
     * @return The unique ID as a string.
     */
    get id() { return this._id; }
    /**
     * Gets the name of the customer.
     * @return The name of the customer.
     */
    get name() { return this._name; }
    /**
     * Gets the last order price of the customer.
     * @return The last order price as a {@link Money} object, or null if not set.
     */
    get lastOrderPrice() { return this._lastOrderPrice; }
    /**
     * Sets the last order price of the customer.
     * @param newLastOrderPrice - The new last order price as a {@link Money} object.
     */
    set lastOrderPrice(newLastOrderPrice) {
        this._lastOrderPrice = newLastOrderPrice;
    }
}
exports.Customer = Customer;
