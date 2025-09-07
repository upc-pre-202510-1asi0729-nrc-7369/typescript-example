"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrder = void 0;
const date_time_1 = require("../../../shared/domain/model/date-time");
const sales_order_item_1 = require("./sales-order-item");
const money_1 = require("../../../shared/domain/model/money");
/**
 * SalesOrder Aggregate represents a sales order within the Sales bounded context.
 * @remarks
 * The sales order encapsulates data such as the customer ID, order ID, list of items, order date, and currency.
 * It ensures that the order is associated with a valid customer and contains at least one item.
 * The order date is represented using the DateTime value object to ensure valid date handling.
 * The currency is represented using the Currency value object to ensure valid currency handling.
 * @example
 * ```typescript
 * const customerId = 'customer123';
 * const items = [new SalesOrderItem('order123', new ProductId(), 2, new Money(50, new Currency('USD')))];
 * const salesOrder = new SalesOrder(customerId, items, new DateTime(), new Currency('USD'));
 * console.log(salesOrder.id); // Outputs: a unique UUID
 * console.log(salesOrder.items.length); // Outputs: 1
 * console.log(salesOrder.orderedAt.toString()); // Outputs: current date in ISO 8601 format
 * console.log(salesOrder.currency.code); // Outputs: USD
 * ```
 */
class SalesOrder {
    /**
     * Creates a new SalesOrder instance.
     * @remarks
     * The constructor generates a unique UUID ID for the sales order and validates that the customer ID is not empty.
     * The order date is initialized to the current date and time if not provided.
     * The order state is initialized to 'PENDING'.
     * @throws {Error} If the customer ID is empty or consists only of whitespace.
     * @param customerId - The ID of the customer placing the order.
     * @param currency - The currency of the order.
     * @param orderedAt - The date and time when the order was placed (optional, defaults to current date and time).
     */
    constructor(customerId, currency, orderedAt) {
        if (!customerId || customerId.trim() === '')
            throw Error(`Customer ID cannot be empty: ${customerId}`);
        this._customerId = customerId;
        this._id = crypto.randomUUID();
        this._items = [];
        this._orderedAt = new date_time_1.DateTime(orderedAt);
        this._currency = currency;
        this._state = 'PENDING';
    }
    /** Determines if items can be added to the order based on its current state.
     * @return True if items can be added, false otherwise.
     */
    canAddItems() {
        return this._state !== 'CANCELED' && this._state !== 'SHIPPED';
    }
    /** Getters and Setters */
    get customerId() { return this._customerId; }
    get id() { return this._id; }
    get items() { return this._items; }
    get orderedAt() { return this._orderedAt; }
    get currency() { return this._currency; }
    get state() { return this._state; }
    set state(newState) { this._state = newState; }
    /**
     * Adds an item to the sales order.
     * @remarks
     * Items can only be added if the order is in the 'PENDING' or 'CONFIRMED' state.
     * The method validates that the product ID is not empty, the quantity is greater than zero,
     * and the unit price amount is non-negative.
     * @throws {Error} If the order state does not allow adding items, or if any validation fails.
     * @param productId The ID of the product being added.
     * @param quantity The quantity of the product being added.
     * @param unitPriceAmount The unit price amount of the product being added.
     */
    addItem(productId, quantity, unitPriceAmount) {
        if (!this.canAddItems())
            throw new Error(`Cannot add items to an order that is ${this._state}`);
        if (!productId || productId.id.trim() === '')
            throw new Error('Product ID cannot be empty');
        if (quantity <= 0)
            throw new Error('Quantity must be greater than zero');
        if (unitPriceAmount < 0)
            throw new Error('Unit price amount cannot be negative');
        const unitPrice = new money_1.Money(unitPriceAmount, this._currency);
        const item = new sales_order_item_1.SalesOrderItem(this._id, productId, quantity, unitPrice);
        this._items.push(item);
    }
    /**
     * Calculates the total amount of the sales order by summing the total of each item.
     * @return The total amount as a {@link Money} object.
     */
    calculateTotalAmount() {
        return this._items.reduce((total, item) => total.add(item.calculateItemTotal()), new money_1.Money(0, this._currency));
    }
    /**
     * Gets the formatted order date as a string.
     * @return The formatted order date.
     */
    getFormattedOrderedAt() {
        return this._orderedAt.format();
    }
    /**
     * Confirms the sales order, changing its state to 'CONFIRMED'.
     * @throws {Error} If the order is not in the 'PENDING' state.
     */
    confirm() {
        if (this._state === "PENDING")
            this._state = "CONFIRMED";
        else
            throw new Error(`Cannot confirm an order that is ${this._state}`);
    }
    /**
     * Ships the sales order, changing its state to 'SHIPPED'.
     * @throws {Error} If the order is not in the 'CONFIRMED' state.
     */
    ship() {
        if (this._state === "CONFIRMED")
            this._state = "SHIPPED";
        else
            throw new Error(`Cannot ship an order that is ${this._state}`);
    }
    /**
     * Cancels the sales order, changing its state to 'CANCELLED'.
     * @throws {Error} If the order is in the 'PENDING' or 'CANCELLED' state.
     */
    cancel() {
        if (this._state === "PENDING" || this._state === "CANCELED")
            throw new Error(`Cannot cancel an order that is ${this._state}`);
        this._state = "CANCELED";
    }
}
exports.SalesOrder = SalesOrder;
