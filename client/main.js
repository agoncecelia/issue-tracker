const API_URL = 'http://localhost:3000/';

$('#signUp').click(() => {
    let password = $('#password').val();
    let confirmPassword = $('#confirmPassword').val();
    if (password !== confirmPassword) {
        alert('Passwords dont match');
        return;
    }
    let obj = {
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        email: $('#email').val(),
        password: password
    }

    $.ajax({
        url: API_URL + 'user/',
        method: 'POST',
        data: obj,
        success: (response) => {
            alert('Sign Up was successful please Log In!');
            // Clear form fields
            $('#firstName').val('');
            $('#lastName').val('');
            $('#email').val('');
            $('#password').val('');
            $('#confirmPassword').val('');
        },
        error: (err) => {
            console.log(err);
        }
    })
})

$('#logIn').click(() => {
    const email = $('#loginEmail').val()
    const password = $('#loginPassword').val()

    let obj = {
        email: email,
        password: password
    };

    $.ajax({
        url: API_URL + 'user/login',
        method: 'POST',
        data: obj,
        success: (result) => {
            if(result.loggedIn == true) {
                alert(result.message);
                localStorage.setItem('loggedIn', result.loggedIn);
                window.location.href = "dashboard.html"
            }
        },
        error: (err) => {
            console.log(err);
        }
    })
})