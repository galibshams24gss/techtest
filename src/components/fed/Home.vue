<template>
  <div>
    <v-dialog v-model="dialog" max-width="500px">
      <v-btn slot="activator" color="teal accent-4" dark class="mb-2">Add Task</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ addItem }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md4>
                <v-text-field v-model="editedItem.Task_Name" label="Task_Name"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" flat @click.native="close">Cancel</v-btn>
          <v-btn color="success" flat @click.native="saveChanges">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

     <v-text-field
            v-model="search"
            append-icon="search"
            label="Search Task"
            single-line
            hide-details
      ></v-text-field>

    <v-data-table
      :headers="headers"
      :items="tasks"
      :search="search"
      :pagination.sync="pagination"
      hide-actions
      class="elevation-1"
    >

      <template slot="items" slot-scope="props">
        <td class="text-xs-left">{{ props.item.Task_Name }}</td>
        
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="complete(props.item)">
            <v-icon color="success">close</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="edit(props.item)">
            <v-icon color="warning">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteSelected(props.item)">
            <v-icon color="error">delete</v-icon>
          </v-btn>
        </td>
      </template>

      <v-alert class="text-sm-left" slot="no-results" :value="true" color="error">
              Sorry, Search result for "{{ search }}" has no results!
      </v-alert>
    </v-data-table>

     <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
   </div>
</template>

<script>
  export default {
    data: () => ({
      search: '',
      pagination: {rowsPerPage:5},
      dialog: false,
      headers: [
        { text: 'Task_Name', value: 'Task_Name' },
        { text: 'Actions', value: 'id', sortable: false }
      ],
      editedIndex: -1,
      editedItem: {
        Task_Name: ''
      },
      initialItem: {
        Task_Name: ''
      }
    }),

    computed: {
      tasks(){
        return this.$store.getters['fed/tasks'];
      },
      addItem () {
        return this.editedIndex === -1 ? 'New Task' : 'Edit Task'
      },
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
       //this.tasks;
    },

    methods: {
      complete (item) {
        this.dialog = false
        this.editedIndex = this.tasks.indexOf(item)
        this.editedItem = this.tasks[this.tasks.indexOf(item)];
        this.editedItem.Task_Name = this.tasks[this.tasks.indexOf(item)].Task_Name;
        console.log("Complete Task: " + this.editedItem.Task_Name);
      },

      edit (item) {
        this.dialog = true
        this.editedIndex = this.tasks.indexOf(item)
        this.editedItem = this.tasks[this.tasks.indexOf(item)];
        this.editedItem.Task_Name = this.tasks[this.tasks.indexOf(item)].Task_Name;
      },

      deleteSelected (item) {
        const index = this.tasks.indexOf(item)
        confirm('Please confirm to delete') && this.tasks.splice(index, 1)
          axios.delete(this.tasks + item.id)
          .then(response=>{
            //console.log(response);
          })
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.initialItem)
          this.editedIndex = -1
        }, 300)
      },

      saveChanges () {
        if (this.editedIndex > -1) {
          axios.put(this.tasks + {Task_Name:this.editedItem.Task_Name})
          .then(response=>{
            this.initialItem = response.data;
          })
          this.initialItem = this.editedItem;
        } else {
          axios.post(this.tasks,{Task_Name:this.editedItem.Task_Name})
          .then(response=>{
            //console.log(response.data);
          })
          this.tasks.push(this.editedItem)
        }
        this.close()
      }
    }
  }
</script>