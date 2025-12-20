
function Profile(props) {
    return (
        <div>
            <h1>Edit Your Profile</h1>
            <section>
                <div>
                    <h2>First name</h2>
                    <input type="text"/>
                </div>
                <div>
                    <h2>Last name</h2>
                    <input type="text"/>
                </div>
                <div>
                    <h2>Email</h2>
                    <input type="text"/>
                </div>
                <div>
                    <h2>Address</h2>
                    <input type="text"/>
                </div>
            </section>
            //TODO: implement later
            <section>
                <button>Cancel</button>
                <button onClick={() => {
                }}>Save Changes
                </button>
            </section>
        </div>
    );
}

export default Profile;