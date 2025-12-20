import {X} from "lucide-react";

function CartItem(props) {
    return (
        <div>
            <section>
                <image className="item-img"></image>
                <div className="item-info">
                    <span className="item-name"></span>
                    <span className="item-type"></span>
                </div>
                <span className="item-code"></span>
            </section>

            <section>
                <section className="amount-section">
                    <button className="amount-btn">-</button>
                    <span className="amount-value">1</span>
                    <button className="amount-btn">+</button>
                </section>
                <div className="item-price">
                    <span className="price"></span>
                    <span className="currency"></span>
                </div>
            </section>
            <section>
                <button className="action-btn">
                    <X />
                </button>
            </section>

        </div>
    );
}

export default CartItem;