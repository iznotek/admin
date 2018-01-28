import * as firebase from 'firebase'

export default {
  signUserIn ({commit}, payload) {
    commit('setLoading', true)

    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then((user) => {
        commit('setLoading', false)
        commit('clearError')

        const newUser = {
          id: user.uid
        }
        commit('setUser', newUser)
      })
      .catch((error) => {
        commit('setLoading', false)
        commit('setError', error)
        console.log(error)
      })
  },
  autoSignIn ({commit}, payload) {
    commit('setUser', { id: payload.uid })
  },
  logOut ({commit}) {
    firebase.auth().signOut()
    commit('setUser', null)
  }
}
