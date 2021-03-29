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


export function deleteBookByID(bookID, userID, imageURL) {
    var db = firebase.firestore();
    var storage = firebase.storage();

    db.collection("Books").doc(bookID).delete();
    db.collection("Users").doc(userID).collection("Books").doc(bookID).delete();
    storage.refFromURL(imageURL).delete();
}

