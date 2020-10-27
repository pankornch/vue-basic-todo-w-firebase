<template>
  <div>
    <div>
      <img src="../assets/logo.png" alt="" />
      <form @submit.prevent="submitHandler">
        <input type="text" v-model="text" />
        <input type="submit" />
      </form>
    </div>
    <DisplayTodo />
  </div>
</template>

<script>
import DisplayTodo from "./DisplayTodo";
export default {
  data() {
    return {
      text: "",
    };
  },
  components: {
    DisplayTodo,
  },
  methods: {
    submitHandler() {
      this.$store.dispatch("addTodo", this.text);
      this.text = "";
    },
  },
};
</script>

<style>
</style>