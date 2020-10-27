<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <div style="background-color: lightgray; padding: 10px; margin: 2rem 0">
      JSON(Database) {{ todos }}
    </div>

    <div v-for="item in todos" :key="item.id" class="content">
      <div>
        <div>
          <span style="margin-right: 1rem" v-show="editShow !== item.id">
            {{ item.title }}
          </span>
          <input type="text" v-model="editText" v-show="editShow === item.id" />
        </div>
      </div>

      <div>
        <button @click="editTodo(item)" v-show="editShow !== item.id">
          edit
        </button>
        <button @click="editTodo()" v-show="editShow === item.id">Save</button>
        <button @click="delTodo(item.id)">del</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      editShow: false,
      editText: "",
      todo: {},
    };
  },
  computed: {
    ...mapGetters({
      todos: "getterDbTodos",
    }),
  },
  methods: {
    delTodo(id) {
      this.$store.dispatch("delTodo", id);
    },
    editTodo(item = null) {
      if (item !== null) {
        this.todo = item;
        this.editText = item.title;
        this.editShow = item.id;
      } else {
        this.editShow = false;
        if (this.editTodo === this.todo.title) return;
        this.$store.dispatch("editTodo", {
          id: this.todo.id,
          title: this.editText,
        });
      }
    },
  },
};
</script>

<style scoped>
.content {
  background-color: whitesmoke;
  padding: 10px;
  margin: 1rem 0;
  width: 300px;
  display: flex;
  justify-content: space-between;
}
</style>