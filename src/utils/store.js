import { createStore } from 'vuex'
import {firebase} from '../utils/firebaseConfig.js'


export default createStore({
  state: {
      count: 0,
      userAccount: null,
      errorMessage: null
  },
  mutations: {
    setUser(state, user) {
      state.userAccount = user
    },
    setErrorMessage(state, msg) {
      state.errorMessage = msg
    }
  },
  actions: {
    login(context, credential) {
      firebase.auth()
        .signInWithEmailAndPassword(credential.email, credential.password)
        .then(res => {
          res ? context.dispatch('setUser', res.user.uid) : context.dispatch('setUser', null)
        })
        .catch(err => {
          context.dispatch('setErrorMessage', err.message)
          context.dispatch('setUser', null)
        })
    },
    setErrorMessage(context, message) {
      context.commit('setErrorMessage', message)
        setTimeout(()=> {
          context.commit('setErrorMessage', null)
        },3000)
    },
    setUser (context, uid){
       context.commit('setUser', uid)
    },
    async logout (context){
      try {
        await firebase.auth().signOut()
        context.commit('setUser', null)
        context.dispatch('setErrorMessage', "Logout Success")
      } catch (error) {
        console.log(error);
      }
    },
    async createQuestion(context, data){
      try {
        const create = await firebase.database().ref(`question/${context.state.userAccount}`).push(data)
      } catch (error) {
        // console.log(error);
        context.dispatch('setErrorMessage', 'Failed to Create Question')
      }
    }
  },
})