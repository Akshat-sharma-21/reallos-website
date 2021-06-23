const emailForm = document.querySelector("#form-signup"); // reference for emailform
const contactForm = document.querySelector("#contact-form");

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

emailForm.addEventListener("submit", (e) => {
  // To save data for the emailform
  e.preventDefault();
  db.collection("signups").add({
    Email: emailForm.email.value,
  });
  emailForm.email.value = "";
});

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("business").add({
    Name: contactForm.name.value,
    Email: contactForm.email.value,
    Subject: contactForm.subject.value,
    Message: contactForm.message.value,
  });

  contactForm.name.value = "";
  contactForm.email.value = "";
  contactForm.subject.value = "";
  contactForm.message.value = "";
});
