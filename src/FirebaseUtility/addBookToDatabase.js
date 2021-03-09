import firebase from './firebaseSetup';


export function addToCollection(listing) {
    var db = firebase.firestore();
    alert('Adding to Firebase now...');
    db.collection("Books").add({
        bookName: listing.bookName,
        bookCondition: listing.bookCondition,
        bookPrice: listing.price,
        bookCategory: listing.bookCategory,
        bookDescription: listing.bookDescription,
        bookImage: 'Dummy',
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

}