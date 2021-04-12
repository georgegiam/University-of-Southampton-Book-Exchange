import firebase from "./firebaseSetup";

export function addToCollection(listing) {
  var db = firebase.firestore();
  alert("Adding to Firebase now...");

  imageUrl(listing.imageFile)
    .then((imageUrl) => {
      db.collection("Books")
        .add({
          bookName: listing.bookName,
          bookCondition: listing.bookCondition,
          bookPrice: listing.price,
          bookCategory: listing.bookCategory,
          bookDescription: listing.bookDescription,
          bookImageUrl: imageUrl,
          created: firebase.firestore.FieldValue.serverTimestamp(),
          sellerID: listing.userID,
          sellerEmail: listing.userEmail,
          sellerName: listing.userName,
          isAvailable: true,
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              var uid = user.uid;
              var bookID = docRef.id; 
              db.collection("Users").doc(uid).collection("Books").doc(bookID).set(({}));
              db.collection("Books").doc(bookID).update({ID: bookID});
            } 
          });

        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    })
    .catch((error) => {
      console.log("Error: " + error);
    });
}

const imageUrl = (image) => {
  return new Promise((resolve, reject) => {
    var storage = firebase.storage();
    var imageURL = "";
    firebase.auth().onAuthStateChanged(function(user) {
      if(user) {
        const uploadImage = storage.ref(`/images/${user.uid}/${image.name}`).put(image);
        uploadImage.on(
          "state_changed",
          (snapShot) => {
            console.log("Image Uploading....");
            //console.log(snapShot);
          },
          (err) => {
            console.log("Image failed to upload....");
            //console.log(err);
            reject(err);
          },
          () => {
            storage
              .ref(`/images/${user.uid}`)
              .child(image.name)
              .getDownloadURL()
              .then((storageLocation) => {
                imageURL = storageLocation;
                console.log("Image URL: " + imageURL);
                resolve(imageURL);
              });
          }
        );

      } else{
        alert("Please Login first!");
      }
    });

  });
};
