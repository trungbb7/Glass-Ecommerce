function OrderSummary(props) {
    return (
        <div>
            <section>
                <div>
                    <span>Discount/Promo code</span>
                    <input type="text" placeholder="Code"></input>
                </div>
                <div>
                    <span>Bonus card number</span>
                    <div>
                        <input type="text" placeholder="Enter Card Number"></input>
                        <button className="apply-btn"></button>
                    </div>
                </div>
            </section>

            <section>
                <div className="subtotal">
                    <span className="checkout-label">Subtotal</span>
                    <span className="checkout-value">2347</span>
                </div>
                <div>
                    <span className="checkout-label">Estimated Tax</span>
                    <span className="checkout-value">2347</span>
                </div>
                <div>
                    <span className="checkout-label">Estimated shipping & Handling</span>
                    <span className="checkout-value">2347</span>
                </div>
                <div className="total">
                    <span className="checkout-label">Total</span>
                    <span className="checkout-value">2347</span>
                </div>
            </section>
            <section>
                <button className="checkout-btn">Checkout</button>
            </section>
        </div>
    );
}

export default OrderSummary;