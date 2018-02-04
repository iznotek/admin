import * as firebase from 'firebase'

export const putStorageFile = (imageFile, urls, key) => {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref(`cases/content/${key + imageFile.name}`)
    const task = storageRef.put(imageFile)

    task.on('state_changed', function (snapshot) {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

      // Do something like, commit('setSaveFiles', imageFile/snapshot, progress)
      // and show progress in component

      console.log('Upload is ' + progress + '% done')
    }, function (error) {
      console.log(error)
    }, function () {
      const downloadURL = task.snapshot.downloadURL
      console.log('downloadURL: ', downloadURL)
      resolve({
        name: imageFile.name,
        src: downloadURL
        // alt?
      })
    })
  })
}
