function validate(values) {
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

    if (values.email === "") {
        error.email = "Should not be empty";
    } else if (!email_pattern.test(values.email)) {
        error.email = "Email does not exist";
    } 
    

    if (values.password === "") {
        error.password = "Should not be empty";
    }else if (!password_pattern.test(values.password)) {
        error.password = "Password does not meet standards";
    } 

    return error;
}


export default validate;
