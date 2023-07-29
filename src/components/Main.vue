<template>
    <v-row style="height: 60px; margin: 0;">

    </v-row>
    <v-container>
      <v-row>
          <VerticalMenuBar></VerticalMenuBar>
        <v-col>
            <Todo></Todo>
            <!-- <TestCase></TestCase> -->
        </v-col>
    
      </v-row>
    </v-container>
  </template>
   
<script>
    import VerticalMenuBar from "@/components/VerticalMenuBar.vue";
    import Todo from "@/components/Todo.vue";
    import TestCase from "@/components/TestCase.vue";

    export default {
        components: {
        VerticalMenuBar,
        Todo,
        TestCase
        },
    };
</script>
  
  <style>
  /* Remove padding on both sides of the columns */
  .v-container {
  display: flex;
  align-items: flex-start;
}
  </style>