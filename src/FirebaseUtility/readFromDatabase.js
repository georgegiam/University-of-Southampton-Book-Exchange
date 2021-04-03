import firebase from "./firebaseSetup";


export async function readAllCollection(collectionName, books) {
    var db = firebase.firestore();

    const snapshop = await db.collection(collectionName).get()
    return snapshop.docs.map(doc => doc.data());
    // db.collection(collectionName).get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         books.set(doc.id, doc.data());
    //         //console.log(doc.id, " => ", doc.data().bookName);
    //         console.log(books);
    //     });
    // });

    // return books;

}

// export async function readBookByID(bookID) {
//     var db = firebase.firestore();

//     const book = await db.collection("Books").doc(bookID).get();
//     return book.docs.map(doc => doc.data());
// }


export async function readUsersBooks(userID) {
    var db = firebase.firestore();
    var mapBooks = new Map();
    const usersBooks = await db.collection("Users").doc(userID).collection("Books").get();
    for(var i = 0; i < usersBooks.docs.length; i++){
        const book = await db.collection("Books").doc(usersBooks.docs[i].id).get();
        ///// BOOKS here /////
        mapBooks.set(usersBooks.docs[i].id, book.data());
    }
    return mapBooks;
}

export async function readUsersAppointments(userID) {
    var db = firebase.firestore();
    const appointments = await db.collection("Users").doc(userID).collection("Appointments").get();
    return appointments.docs.map(doc => doc.data());
}

export async function readUsersPurchases(userID) {
    var db = firebase.firestore();
    var statues = [];
    const purchases = await db.collection("Users").doc(userID).collection("Purchases").get();
    for(var i = 0; i < purchases.docs.length; i++) {
        var item = purchases.docs[i].data();
        var status = await getStatus(item.sellerId, item.tracking);
        console.log('STATUS: ', status);
        statues.push(status);
    }
    return [purchases.docs.map(doc => doc.data()), statues];
}

export async function getStatus(sellerId, trackingNumber) {
    var db = firebase.firestore();
    const status = await db.collection("Users").doc(sellerId).collection("Appointments").doc(trackingNumber).get();
    return status.data().status;
}


export function deleteBookByID(bookID, userID, imageURL) {
    var db = firebase.firestore();
    var storage = firebase.storage();

    db.collection("Books").doc(bookID).delete();
    db.collection("Users").doc(userID).collection("Books").doc(bookID).delete();
    storage.refFromURL(imageURL).delete();
}

