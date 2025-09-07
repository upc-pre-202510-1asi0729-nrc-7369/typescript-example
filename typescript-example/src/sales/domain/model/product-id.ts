/**
 * ProductId Value Object represents a unique identifier for a product in the CRM bounded context.
 * It encapsulates the ID value and provides methods to access it.
 * @remarks
 * The ID is generated using the crypto module's randomUUID function to ensure uniqueness.
 * @example
 * ```typescript
 * const productId = new ProductId();
 * console.log(productId.id); // Outputs: a unique UUID
 * ```
 */
export class ProductId {
    private readonly _id: string;

    /**
     * Creates a new ProductId instance.
     * @remarks
     * The constructor generates a unique UUID ID for the product.
     * @param id - The unique identifier for the product. If not provided, a new UUID will be generated.
     */
    constructor(id?: string) {
        this._id = id ?? crypto.randomUUID();
    }

    /**
     * Gets the unique ID of the product.
     * @return The unique ID as a string.
     */
    public get id(): string { return this._id; }
}