// --- Form Switching Logic ---
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const showRegisterLink = document.getElementById("showRegister");
const showLoginLink = document.getElementById("showLogin");

showRegisterLink.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior
  loginForm.classList.remove("active");
  registerForm.classList.add("active");
});

showLoginLink.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior
  registerForm.classList.remove("active");
  loginForm.classList.add("active");
});

// --- Firebase Authentication Logic ---

// Login Function
document.getElementById("loginForm").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(() => {
    console.log("Login successful!");
    window.location.href = "welcome.html"; // Redirect on success
  })
  .catch(error => {
    console.error("Login error:", error.message);
    alert("Login Failed: " + error.message); // Show error to user
  });
});

// Register Function
document.getElementById("registerForm").addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent default form submission

  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  // Optional: Add client-side password confirmation here if you uncommented the confirmPassword field in HTML
  /*
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return; // Stop execution if passwords don't match
  }
  */

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(userCredential => {
    // Update user profile with full name
    return userCredential.user.updateProfile({ displayName: name });
  })
  .then(() => {
    console.log("Registration successful!");
    alert("Registration successful! Please log in."); // Inform user
    // Optionally redirect to login form after successful registration
    registerForm.classList.remove("active");
    loginForm.classList.add("active");
  })
  .catch(error => {
    console.error("Registration error:", error.message);
    alert("Registration Failed: " + error.message); // Show error to user
  });
});

// The onclick handlers for the animated buttons in HTML
// already trigger the form submit events, so no extra JS needed for them here.
