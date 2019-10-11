<template>
  <div id="app">
    <ToDoList msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import ToDoList from './components/ToDoList.vue'

export default {
  name: 'app',
  components: {
    ToDoList
  }
}
</script>
