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
        })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
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
    const uploadImage = storage.ref(`/images/${image.name}`).put(image);

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
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((storageLocation) => {
            imageURL = storageLocation;
            console.log("Image URL: " + imageURL);
            resolve(imageURL);
          });
      }
    );
  });
};
