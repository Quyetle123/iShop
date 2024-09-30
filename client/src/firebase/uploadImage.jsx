import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config.jsx";

export const uploadImageToFirebase = async (file) => {
  if (!file) throw new Error("No file provided");

  const storageRef = ref(storage, `images/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  await new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      reject,
      () => resolve()
    );
  });

  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
  return downloadURL;
};
