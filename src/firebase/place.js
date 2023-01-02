import { storage } from ".";
import { v4 } from "uuid";
import {
  ref,
  uploadString,
  deleteObject,
  listAll,
  getDownloadURL,
} from "firebase/storage";
const placeFirebase = {
  push: async (name, file) => {
    const newname = name + v4();
    const storageRef = ref(storage, `place/${newname}`);
    await uploadString(storageRef, file, "data_url").then((snapshot) => {
      console.log("Uploaded a data_url string!");
    });
    return newname;
  },
  delete: (name) => {
    const desertRef = ref(storage, `place/${name}`);
    deleteObject(desertRef)
      .then(() => {
      })
      .catch(() => {
        throw new Error("Fail");
      });
  },
  getAll: () => {
    const listRef = ref(storage, "place/");
    listAll(listRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log(url);
        });
      });
    });
  },
  get: async (name) => {
    const urlRef = ref(storage, `place/${name}`);
    const url = await getDownloadURL(urlRef);
    return url;
  },
};

export default placeFirebase;
