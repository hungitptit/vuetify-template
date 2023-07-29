<template>
    <div class="table-container">
      <v-data-table
      :headers="headers"
      :items="todos"
      :sort-by="[{ key: 'title', order: 'asc' }]"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title>Todo list</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ props }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="props"
              >
                New Task
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>
  
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.text"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.completed"
                        label="Completed"
                      ></v-text-field>
                    </v-col> 
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  @click="saveTodo"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          size="small"
          class="me-2"
          @click="editItem(item.raw)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          size="small"
          @click="deleteItem(item.raw)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="fetchTodos"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    </div>

  </template>
  
  <script>
  import $http from '@/plugins/axios'
  /* eslint-disable */
  export default {
    data() {
        return {
          dialog: false,
          dialogDelete: false,
            headers: [
            { title: 'Title', key: 'text' },
            { title: 'Description', key: 'description' },
            { title: 'Completed', key: 'completed'},
            { title: 'Actions', key: 'actions', sortable: false },
          ],
          editedItem: {
            title:'',
            description: '',
            completed: false
          },
          defaultItem: {
            title:'',
            description: '',
            completed: false
          },
          editedIndex: -1,
          todos: [],
        };
    },
    methods: {
        async saveTodo() {
          if (this.editedIndex > -1) {
            Object.assign(this.todos[this.editedIndex], this.editedItem)
            try {
            await $http.put(`/api/todos/${this.editedItem._id}`, this.editedItem);
            } catch (error) {
            console.error('Error updating todo:', error);
            }
          } else {
            try {
              const response = await $http.post('/api/todos', this.editedItem);
              this.todos.push(response.data);
              this.newTodo = '';
            } catch (error) {
              console.error('Error adding todo:', error);
            }
          }
          this.close()
        },
        editItem (item) {
          this.editedIndex = this.todos.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialog = true
        },
  
        deleteItem (item) {
          this.editedIndex = this.todos.indexOf(item)
          this.editedItem = Object.assign({}, item)
          this.dialogDelete = true
        },
        
        },
        async fetchTodos() {
            try {
            const response = await $http.get('/api/todos');
            this.todos = response.data;
            } catch (error) {
            console.error('Error fetching todos:', error);
            }
        },
        async deleteItemConfirm () {
          try {
            await $http.delete(`/api/todos/${this.editedItem._id}`);
            this.todos.splice(this.editedIndex, 1)
            } catch (error) {
            console.error('Error deleting todo:', error);
            }
          this.closeDelete()
        },
  
        close () {
          this.dialog = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },
  
        closeDelete () {
          this.dialogDelete = false
          this.$nextTick(() => {
            this.editedItem = Object.assign({}, this.defaultItem)
            this.editedIndex = -1
          })
        },

    },
    created() {
        this.fetchTodos();
    },
    computed: {
        formTitle () {
          return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
      },
  };
  </script>
  
  <style>
  
  .table-container {
  max-width: 1800px; /* Đặt độ rộng tối đa cho bảng là 600px (thay đổi theo yêu cầu của bạn) */
  overflow-x: auto; /* Tạo thanh cuộn ngang khi bảng vượt quá độ rộng */
}
  </style>