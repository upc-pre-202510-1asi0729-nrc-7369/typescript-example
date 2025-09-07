"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Demonstrates usage of the sales order behavior with real-time and manual scenarios.
 * @public
 */
const customer_1 = require("./crm/domain/model/customer");
const currency_1 = require("./shared/domain/model/currency");
const sales_order_1 = require("./sales/domain/model/sales-order");
const product_id_1 = require("./sales/domain/model/product-id");
console.log('Thank you for using WebStorm 💙');
try {
    const customer = new customer_1.Customer("John Doe");
    // Scenario 1: Real-time registration with USD and current date
    const usdCurrencyCode = "USD";
    const usdCurrency = new currency_1.Currency(usdCurrencyCode);
    const realTimeSalesOrder = new sales_order_1.SalesOrder(customer.id, usdCurrency);
    realTimeSalesOrder.addItem(new product_id_1.ProductId(), 2, 100);
    realTimeSalesOrder.addItem(new product_id_1.ProductId(), 20, 50);
    realTimeSalesOrder.confirm();
    customer.lastOrderPrice = realTimeSalesOrder.calculateTotalAmount();
    console.log(`Real-time Order - Customer: ${customer.name}, ID: ${customer.id}, Ordered At: ${realTimeSalesOrder.getFormattedOrderedAt()}, State: ${realTimeSalesOrder.state}, Total: ${(_a = customer.lastOrderPrice) === null || _a === void 0 ? void 0 : _a.format()}`);
    // Scenario 2: Manual registration with PEN and past date
    const penCurrencyCode = "PEN";
    const penCurrency = new currency_1.Currency(penCurrencyCode);
    const pastOrderDate = "2023-05-15T10:30:00Z";
    const manualSalesOrder = new sales_order_1.SalesOrder(customer.id, penCurrency, pastOrderDate);
    manualSalesOrder.addItem(new product_id_1.ProductId(), 1, 150);
    manualSalesOrder.confirm(); // Must confirm before shipping
    manualSalesOrder.ship();
    customer.lastOrderPrice = manualSalesOrder.calculateTotalAmount();
    console.log(`Manual Order - Customer: ${customer.name}, ID: ${customer.id}, Ordered At: ${manualSalesOrder.getFormattedOrderedAt()}, State: ${manualSalesOrder.state}, Total: ${(_b = customer.lastOrderPrice) === null || _b === void 0 ? void 0 : _b.format("es-PE")}`);
    // Test state constraints
    manualSalesOrder.confirm(); // Should throw error
}
catch (error) {
    if (error instanceof Error)
        console.error(`Error: ${error.message}`);
    else
        console.error("An error occurred:", error);
}
