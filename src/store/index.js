import { createStore } from 'vuex'
import { db } from '../db'


export default createStore({
  state: {
    todos: [],
    db: [],
  },
  mutations: {
    ADD_TODO(state, data) {
      const genId = (Math.random()).toString(15).replace('.', '')
      state.todos.push({ id: genId, title: data })

      // set data to database 

      // ex
      // <collection>
      // Test :
      // <doc>   <value>
      // 0fesd : "Value"

      // db.collection("Todos").doc((Math.random()).toString(15).replace('.', '')).set({ todos: state.todos })


      // set data with 1 doc
      db.collection("Todos").doc('Todos').set({ todos: state.todos })
    },
    DEL_TODO(state, id) {
      state.todos.splice(id, 1);
      db.collection("Todos").doc("Todos").set({ todos: state.todos })
    },
    INIT_DATABASE(state, data) {
      state.db = data;
      state.todos = data[0].todos;
    },
    EDIT_TODO(state, data) {
      const clone = state.todos.map(e => ({ ...e }));
      const index = clone.findIndex(el => el.id === data.id)
      clone[index] = data;
      state.todos = clone;

      db.collection("Todos").doc("Todos").set({ todos: state.todos })
    }
  },
  actions: {
    addTodo(context, data) {
      context.commit("ADD_TODO", data);
    },
    delTodo(contex, id) {
      contex.commit("DEL_TODO", id)
    },
    initDatabase(context) {
      // Query data form Firestore
      // db.collection("Todos").get().then(snap => {
      //   const data = snap.docs.map(doc => doc.data());
      //   context.commit("INIT_DATABASE", data)
      // })

      // Realtime database use onSnaphot
      db.collection("Todos").onSnapshot(snap => {
        const data = snap.docs.map(doc => doc.data())
        context.commit("INIT_DATABASE", data)

      })
    },
    editTodo(context, todo) {
      context.commit('EDIT_TODO', todo)
    }
  },
  getters: {
    getterTodos(state) {
      return state.todos;
    },
    getterDb(state) {
      return state.db;
    },
    getterDbTodos(state) {
      try {
        return state.db[0].todos;
      } catch (error) {
        return []
      }
    }
  },
  modules: {
  }
})
