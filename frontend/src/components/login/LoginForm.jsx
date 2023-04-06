

export default function LoginForm(props) {
    const error = props.error;

    return (
        <div className="login-form">
            <h2>Login</h2>
            <label htmlFor="login-email">Email</label>
            <input
                onChange={(e) => {
                    props.setEmail(e.target.value);
                }}
                style={{ outline: error ? "1px solid red" : null }}
                type="email"
                required
                id="login-email"
            />
            <label htmlFor="login-password">Password</label>
            <input
                onChange={(e) => {
                    props.setPassword(e.target.value);
                }}
                style={{ outline: error ? "1px solid red" : null }}
                type="password"
                required
                id="login-password"
            />
            <button
                disabled={props.email.length < 1 || props.password < 1 ? true : false}
                style={{
                    backgroundColor:
                        props.email.length < 1 || props.password < 1 ? "#acacac" : null,
                }}
                className="login-submit"
                onClick={() => {
                    props.handleLogin();
                }}
            >
                Submit
            </button>


            {error ? <h3>{error}</h3> : null}
        </div>
    );
}
