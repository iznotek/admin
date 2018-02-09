import * as firebase from 'firebase'
import { store } from '../../store'

export const putStorageFile = (file, key, uploadsArr) => {
  return new Promise((resolve, reject) => {
    if (!(file instanceof File)) {
      resolve(file)
    }

    const storageRef = firebase.storage().ref(`cases/content/${key + file.name}`)
    const task = storageRef.put(file)

    let uploads = uploadsArr

    task.on('state_changed', function (snapshot) {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

      // Maybe change the code here. Define uploadData outside task and update.
      // Check if name changed and then push. Otherwise, update current?
      const uploadData = {
        name: file.name,
        progress
      }

      // Fix: Only push the progress and new entries
      uploads.push(uploadData)
      store.dispatch('uploadStatus', uploads)
    }, function (error) {
      // Set the store error message here
      console.log(error)
    }, function () {
      resolve({
        type: file.type,
        name: file.name,
        src: task.snapshot.downloadURL
        // alt
      })
    })
  })
}
