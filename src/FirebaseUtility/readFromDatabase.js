import firebase from "./firebaseSetup";

// Resource used: https://firebase.google.com/docs/firestore/quickstart and https://firebase.google.com/docs/storage/web/delete-files

export async function readAllCollection(collectionName, books) {
    var db = firebase.firestore();

    const snapshop = await db.collection(collectionName).get()
    return snapshop.docs.map(doc => doc.data());
}

export async function searchBookByTitle(bookName) {
    var db = firebase.firestore();

    const snapshop = await db.collection("Books").where("bookName", "==", bookName).get()
    return snapshop.docs.map(doc => doc.data());
}

export async function readUsersBadges(userID) {
    var db = firebase.firestore();
    var data = 0; 
    const badges = await db.collection("Users").doc(userID);
    await badges.get().then((doc) => {
        if(doc.exists) {
            console.log('BADGES:', doc.data());
            data = doc.data().newNotfity;
        } else {
                data = 0;
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
        data = 0;
    });

    return data;
}


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

export async function readUsersAppointmentsByStatus(userID, status) {
    var db = firebase.firestore();

    const snapshop = await db.collection("Users").doc(userID).collection("Appointments").where("status", "==", status).get();
    return snapshop.docs.map(doc => doc.data());
}

export async function readUsersPurchasesByStatus(userID, status) {
    var db = firebase.firestore();
    var exchanges = [];
    var purchase = [];
    const purchases = await db.collection("Users").doc(userID).collection("Purchases").get();
    for(var i = 0; i < purchases.docs.length; i++) {
        var item = purchases.docs[i].data();
        var exchange = await getStatusByStatus(item.sellerId, item.tracking, status);
        console.log('STATUS: ', exchange);
        if(exchange != null) {
            exchanges.push(exchange);
        }
    }
    return [purchases.docs.map(doc => doc.data()), exchanges];
}

export async function getStatusByStatus(sellerId, trackingNumber, status) {
    var db = firebase.firestore();
    const exchange = await db.collection("Users").doc(sellerId).collection("Appointments").doc(trackingNumber).get();
    const data = exchange.data();
    if(data && data.status === status) {
        return exchange.data();
    }
    return null;
}

export async function readUsersPurchases(userID) {
    var db = firebase.firestore();
    var exchanges = [];
    const purchases = await db.collection("Users").doc(userID).collection("Purchases").get();
    for(var i = 0; i < purchases.docs.length; i++) {
        var item = purchases.docs[i].data();
        var exchange = await getStatus(item.sellerId, item.tracking);
        console.log('STATUS: ', exchange);
        exchanges.push(exchange);
    }
    return [purchases.docs.map(doc => doc.data()), exchanges];
}

export async function getStatus(sellerId, trackingNumber) {
    var db = firebase.firestore();
    const exchange = await db.collection("Users").doc(sellerId).collection("Appointments").doc(trackingNumber).get();
    const data = exchange.data();
    if(data) {
        return exchange.data();
    }
    return {status: 'declined', time: 'declined', date: 'declined', location: 'delined'};
}

export function deleteBookByID(bookID, userID, imageURL) {
    var db = firebase.firestore();
    var storage = firebase.storage();

    db.collection("Books").doc(bookID).delete();
    db.collection("Users").doc(userID).collection("Books").doc(bookID).delete();
    storage.refFromURL(imageURL).delete();
}

export function updateBookByID(bookId, bookName, bookPrice, bookDescription) {
    var db = firebase.firestore();

    db.collection("Books").doc(bookId).update({ bookName: bookName });
    db.collection("Books").doc(bookId).update({ bookPrice: bookPrice });
    db.collection("Books").doc(bookId).update({ bookDescription: bookDescription });
}

