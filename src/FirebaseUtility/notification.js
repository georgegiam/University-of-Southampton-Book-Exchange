import firebase from "./firebaseSetup";


export async function sendBuyerNotification() {
  try {
    const messaging = firebase.messaging();
    await messaging.requestPermission();
    const token = await messaging
      .getToken({
        vapidKey:
          "BPg6MagYGyfs75MtJdBJncB7IIZ8Ug5nVypn5UISpMEPTp6u34NVLkMsu6uBcdcC2rflYy6Saaz3H1gVT6cfhK8",
      })
      .then((currentToken) => {
        if (currentToken) {
          console.log("Current Token: ", currentToken);
        } else {
          console.log("No current token");
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
      });
    //console.log('token do usuário:', token);
    // await messaging.deleteToken(undefined, '*');
    const newToken = await messaging.getToken();
    console.log("token do new token:", newToken);

    messaging.onMessage(function (payload) {
      console.log("payload: ", payload);
    });

    return newToken;
  } catch (error) {
    console.error(error);
  }
}

export async function addAppointment(bookId, isAvailable, bookName, bookDescription, bookPrice, buyerId, buyerEmail, sellerId, buyerName) {
  var db = firebase.firestore();

  if (!isAvailable) {
    alert("Book is no longer available");
    return;
  }

  db.collection("Users")
    .doc(sellerId)
    .collection("Appointments")
    .add({
      sellerId: sellerId,
      buyerEmail: buyerEmail,
      buyerName: buyerName,
      date: "Pending",
      time: "Pending",
      location: "Pending",
      bookName: bookName,
      status: "pending",
      bookId: bookId,
    })
    .then((docRef) => {
      alert("Confirmation sent to the Seller");
      db.collection("Users").doc(buyerId).collection("Purchases").add({
        sellerId,
        sellerId,
        tracking: docRef.id,
        bookName: bookName,
        bookPrice: bookPrice,
        bookDescription: bookDescription,
      });
      db.collection("Users")
        .doc(sellerId)
        .collection("Appointments")
        .doc(docRef.id)
        .update({ ID: docRef.id });
      db.collection("Books").doc(bookId).update({ isAvailable: false });

      db.collection("Users").doc(sellerId).update({newNotfity: firebase.firestore.FieldValue.increment(1)})
      .catch((error) => {
        db.collection("Users").doc(sellerId).set({newNotfity: 1}, {merge: true});
      })

    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}

export async function setStatus(sellerId, appointmentID, status, bookId) {
  var db = firebase.firestore();

  if(status === 'declined') {
    db.collection("Books").doc(bookId).update({ isAvailable: true });
    db.collection("Users").doc(sellerId).collection("Appointments").doc(appointmentID).delete();
  }
  db.collection("Users").doc(sellerId).update({newNotfity: firebase.firestore.FieldValue.increment(-1)});

  db.collection("Users")
    .doc(sellerId)
    .collection("Appointments")
    .doc(appointmentID)
    .update({ status: status });
}

export async function setDateandTime(sellerId, appointmentID, date, time, location) {
  var db = firebase.firestore();

  db.collection("Users").doc(sellerId).collection("Appointments").doc(appointmentID).update({ status: 'accepted' });
  db.collection("Users").doc(sellerId).collection("Appointments").doc(appointmentID).update({ date: date });
  db.collection("Users").doc(sellerId).collection("Appointments").doc(appointmentID).update({ time: time });
  db.collection("Users").doc(sellerId).collection("Appointments").doc(appointmentID).update({ location: location });
  db.collection("Users").doc(sellerId).update({newNotfity: firebase.firestore.FieldValue.increment(-1)});
}
