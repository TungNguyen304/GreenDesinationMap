import { storage } from ".";
import { v4 } from "uuid";
import { ref, uploadString, deleteObject, listAll, getDownloadURL } from "firebase/storage";
const placeFirebase = {
    push: (name, file) => {
        const storageRef = ref(storage, `place/${name + v4()}`)
            uploadString(storageRef, file, 'data_url').then((snapshot) => {
                console.log('Uploaded a data_url string!');
            });
    },
    delete: (name) => {
        const desertRef = ref(storage, `place/${name}`);
        deleteObject(desertRef).then(() => {
        }).catch(() => {
            throw new Error("Fail")
        })
    },
    getAll: () => {
        const listRef = ref(storage, 'place/')
        listAll(listRef)
            .then((res) => {
                res.items.forEach((item) => {
                    getDownloadURL(item).then((url => {
                        console.log(url);
                    }))
                })
            })
    }
}

export default placeFirebase