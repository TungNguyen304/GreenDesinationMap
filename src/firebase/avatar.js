import { storage } from ".";
import { v4 } from "uuid";
import {
  ref,
  uploadString,
  deleteObject,
  listAll,
  getDownloadURL,
} from "firebase/storage";
const avatarFirebase = {
  push: async (name, file) => {
    const newname = name + v4();
    const storageRef = ref(storage, `avatar/${newname}`);
    await uploadString(storageRef, file, "data_url").then((snapshot) => {
      console.log("Uploaded a data_url string!");
    });
    return newname;
  },
  delete: (name) => {
    const desertRef = ref(storage, `avatar/${name}`);
    deleteObject(desertRef)
      .then(() => {
      })
      .catch(() => {
        throw new Error("Fail");
      });
  },
  getAll: () => {
    const listRef = ref(storage, "avatar/");
    listAll(listRef).then((res) => {
      res.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          console.log(url);
        });
      });
    });
  },
  get: async (name) => {
    const urlRef = ref(storage, `avatar/${name}`);
    const url = await getDownloadURL(urlRef);
    return url;
  },
};

export default avatarFirebase;
