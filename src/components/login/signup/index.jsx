

function SignUp(){

    return (
        <div className="login-container">
            <h3>Register User</h3>
            <form type="submit">
            <div>
                <label htmlFor="username">Username: </label>
            </div>
            <input type="text" id="username" name="username"/>

            <div>
                <label htmlFor="password">Password: </label>
            </div>
            <input type="password" id="password" name="password"/>

            <div>
                <label htmlFor="firstName">First Name: </label>
            </div>
            <input type="text" id="firstName" name="firstName"/>

            <div>
                <label htmlFor="lastName">Last Name: </label>
            </div>
            <input type="text" id="lastName" name="lastName"/>

            <div>
                <label htmlFor="email">Email: </label>
            </div>
            <input type="text" id="email" name="email"/>
            <div>
                <button type="submit">Register</button>
            </div>
            </form>
        </div>
    )
}

export default SignUp