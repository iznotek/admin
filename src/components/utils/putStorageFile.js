import * as firebase from 'firebase'
import { store } from '../../store'

export const putStorageFile = (file, key) => {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref(`cases/content/${key + file.name}`)
    const task = storageRef.put(file)

    const uploads = []

    task.on('state_changed', function (snapshot) {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      const uploadData = {
        name: file.name,
        progress
      }
      // Only push the progress and new entries
      uploads.push(uploadData)
      store.dispatch('uploadStatus', uploads)
      debugger

      console.log('Upload is ' + progress + '% done')
    }, function (error) {
      console.log(error)
    }, function () {
      const downloadURL = task.snapshot.downloadURL
      console.log('downloadURL: ', downloadURL)
      resolve({
        name: file.name,
        src: downloadURL
        // alt?
      })
    })
  })
}
