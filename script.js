function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate input fields
    if (!username || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Send data to the server for authentication
    // Frontend (JavaScript in HTML file)

// Update the login fetch request
fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
})
.then(response => {
    if (response.ok) {
        alert("Logged in successfully");
        window.location.href = "dashboard.html"; // Redirect to the dashboard
    } else {
        alert("Invalid username or password.");
    }
})
.catch(error => {
    console.error('Error:', error);
});

// Update the signup fetch request


}

function signup(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const loginType = document.getElementById('loginType').value;

    if (!username || !password || !loginType) {
        alert("Please fill in all fields.");
        return;
    }

    fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, loginType })
    })
    .then(response => response.json())  // Convert response to JSON
    .then(data => {
        if (data.success) {
            alert(data.message);
            window.location.href = "login.html"; // Navigate to dashboard
        } else {
            alert(data.message || "Error during signup.");
        }
    })
    .catch(error => {
        console.error('Signup error:', error);
        alert("Something went wrong. Please try again.");
    });
}

function submitOrder() {
    const bloodType = document.getElementById('bloodType').value;
    const numOfBags = document.getElementById('numOfBags').value;
    const transfusionType = document.getElementById('transfusionType').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const landmark = document.getElementById('landmark').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const dateOfCollection = document.getElementById('dateOfCollection').value;
  
    // Send data to the server
    fetch('http://localhost:3000/place-order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            bloodType,
            numOfBags,
            transfusionType,
            bloodGroup,
            landmark,
            mobileNumber,
            dateOfCollection
        }),
    })
    .then(response => {
        if (response.ok) {
            alert('Your order has been placed successfully.');
            window.location.href = 'dashboard.html';
        } else {
            alert('Error placing the order. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }
  

