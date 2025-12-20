function LeftSidebar(props) {
    return (
        <div>
            <section>
                <h1>Account</h1>
                <div className="option-sections">
                    <span>General</span>
                    <span>Address Book</span>
                    <span>Payment options</span>
                </div>
            </section>
            <section>
                <h1>Orders</h1>
                <div className="option-sections">
                    <span>On-going</span>
                    <span>Returns</span>
                </div>
            </section>
            <section>
                <h1>Wish List</h1>
                <div className="option-sections">
                </div>
            </section>
        </div>
    );
}

export default LeftSidebar;