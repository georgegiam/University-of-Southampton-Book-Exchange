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


