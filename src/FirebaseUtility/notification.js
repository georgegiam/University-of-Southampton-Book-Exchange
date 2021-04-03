import firebase from "./firebaseSetup";

export async function sendBuyerNotification() {
    try {
        const messaging = firebase.messaging();
        await messaging.requestPermission();
        const token = await messaging.getToken({vapidKey: "BPg6MagYGyfs75MtJdBJncB7IIZ8Ug5nVypn5UISpMEPTp6u34NVLkMsu6uBcdcC2rflYy6Saaz3H1gVT6cfhK8"})
            .then((currentToken) => {
                if(currentToken) {
                    console.log('Current Token: ', currentToken);
                } else {
                    console.log('No current token');
                }
            }).catch((err) => {
                console.log('An error occurred while retrieving token. ', err);
            });
        //console.log('token do usuário:', token);
        // await messaging.deleteToken(undefined, '*');
        const newToken = await messaging.getToken();
        console.log('token do new token:', newToken);

        messaging.onMessage(function(payload) {
            console.log('payload: ', payload);
        })
        
        return newToken;
      } catch (error) {
        console.error(error);
      }
}

export async function addAppointment(bookId, bookName, bookDescription, bookPrice, buyerId, buyerEmail, sellerId) {
    var db = firebase.firestore();

    if(buyerId === sellerId) {
        alert('Cant buy your own book!')
    } else {
        db.collection("Users").doc(sellerId).collection("Appointments").add({
            sellerId: sellerId,
            buyerEmail: buyerEmail,
            date: '04/04/2021',
            time: '14:00',
            bookName: bookName,
            status: 'pending',
        })
        .then((docRef) => {
            alert('Confirmation sent to the Buyer');
            db.collection("Users").doc(buyerId).collection("Purchases").add({
                sellerId, sellerId,
                tracking: docRef.id,
                bookName: bookName,
                bookPrice: bookPrice,
                bookDescription: bookDescription,
            });
            db.collection("Users").doc(sellerId).collection("Appointments").doc(docRef.id).update({ID: docRef.id});
    
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
          });
    }
}

export async function setStatus(sellerId, appointmentID, status) {
    var db = firebase.firestore();
    db.collection("Users").doc(sellerId).collection("Appointments").doc(appointmentID).update({status: status});
}

