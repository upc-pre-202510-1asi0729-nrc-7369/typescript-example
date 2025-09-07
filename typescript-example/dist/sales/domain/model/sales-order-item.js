"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalesOrderItem = void 0;
const money_1 = require("../../../shared/domain/model/money");
/**
 * SalesOrderItem Entity represents an item in a sales order aggregate within the Sales bounded context.
 * @remarks
 * The item ID is generated using the crypto module's randomUUID function to ensure uniqueness.
 * It encapsulates data such as the order ID, item ID, product ID, quantity, and unit price.
 * It also provides a method to calculate the total price for the item based on quantity and unit price.
 * @example
 * ```typescript
 * const productId = new ProductId();
 * const unitPrice = new Money(50, new Currency('USD'));
 * const salesOrderItem = new SalesOrderItem('order123', productId, 2, unitPrice);
 * console.log(salesOrderItem.itemId); // Outputs: a unique UUID
 * console.log(salesOrderItem.calculateItemTotal().toString()); // Outputs: USD 100.00
 * ```
 */
class SalesOrderItem {
    /**
     * Creates a new SalesOrderItem instance.
     * @remarks
     * The constructor generates a unique UUID item ID for the sales order item and validates that the quantity is greater than zero.
     * @throws {Error} If the quantity is less than or equal to zero.
     * @param orderId - The ID of the sales order to which this item belongs.
     * @param productId - The ID of the product being ordered.
     * @param quantity - The quantity of the product being ordered (must be greater than zero).
     * @param unitPrice - The unit price of the product.
     */
    constructor(orderId, productId, quantity, unitPrice) {
        if (quantity <= 0)
            throw Error(`Quantity must be greater than zero: ${quantity}`);
        this._orderId = orderId;
        this._itemId = crypto.randomUUID();
        this._productId = productId;
        this._quantity = quantity;
        this._unitPrice = unitPrice;
    }
    /**
     * Gets the ID of the sales order to which this item belongs.
     * @return The sales order ID as a string.
     */
    get orderId() { return this._orderId; }
    /**
     * Gets the unique ID of the sales order item.
     * @return The unique item ID as a string.
     */
    get itemId() { return this._itemId; }
    /**
     * Gets the ID of the product being ordered.
     * @return The product ID as a {@link ProductId} object.
     */
    get productId() { return this._productId; }
    /**
     * Gets the quantity of the product being ordered.
     * @return The quantity as a number.
     */
    get quantity() { return this._quantity; }
    /**
     * Gets the unit price of the product.
     * @return The unit price as a {@link Money} object.
     */
    get unitPrice() { return this._unitPrice; }
    /**
     * Calculates the total price for this sales order item based on quantity and unit price.
     */
    calculateItemTotal() {
        return new money_1.Money(this._unitPrice.amount * this._quantity, this._unitPrice.currency);
    }
}
exports.SalesOrderItem = SalesOrderItem;
