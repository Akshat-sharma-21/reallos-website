const registerForm = document.querySelector("#register-form");
const formMessages = $(".form-message");
const mainText = document.querySelector("#reallos-main-text");
const secondaryText = document.querySelector("#reallos-secondary-text");

var firebaseConfig = {
  apiKey: "AIzaSyCzygl9zAt5QdeBVRQwdco4KYGVCogmHkk",
  authDomain: "reallos-website-70dda.firebaseapp.com",
  projectId: "reallos-website-70dda",
  storageBucket: "reallos-website-70dda.appspot.com",
  messagingSenderId: "812858841287",
  appId: "1:812858841287:web:93294924310d04df3446e2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/; // regex for phone

  if (registerForm.phone.value.match(phoneRegex)) {
    // if the phone is of the correct value
    db.collection("buyer-leads")
      .add({
        Name: registerForm.name.value,
        Email: registerForm.email.value,
        Phone: registerForm.phone.value,
      })
      .then(() => {
        $(formMessages).removeClass("error");
        $(formMessages).addClass("success");
        $(formMessages).text("You're Successfully registered!");

        let userData = {
          // setting the json for the user data
          name: registerForm.name.value,
          email: registerForm.email.value,
          phone: "+1" + registerForm.phone.value, // adding the country code
        };

        mainText.innerHTML = "Registered!"; // setting the main heading to Registered!
        secondaryText.innerHTML =
          "Thank you for Signing up! We will get in touch with you shortly"; // setting the secondary text

        $("#register-form input,#contact-form textarea").val(""); // clearing the form

        const http = new XMLHttpRequest();
        const url =
          "https://us-central1-reallos-app-78a3a.cloudfunctions.net/api/lead-confirmation"; // set the url of the api
        http.open("POST", url, true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify(userData)); // making an api request to send the email and text
      })
      .catch(() => {
        // if an error occurs
        $(formMessages).removeClass("success");
        $(formMessages).addClass("error");
        $(formMessages).text(
          "Opps! An error occured on our end. Please try again later"
        );
        $("#register-form input,#contact-form textarea").val("");
      });
  } else {
    // showing that the phone is invalid
    $(formMessages).removeClass("success");
    $(formMessages).addClass("error");

    $(formMessages).text("Please enter a valid phone number");

    registerForm.phone.value = ""; // setting the value to ""
  }
});
