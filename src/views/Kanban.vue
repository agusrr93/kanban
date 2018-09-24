<template>
  <div class="kanban" style="margin-left:100px">
  <div class="container-box rotated">
      <button type="button" class="btn btn-info btn-lg turned-button" data-toggle="modal" data-target="#modalkanban">Add Agenda</button>
  </div>
 
  <!-- the div that represents the modal dialog -->
 <div class="modal fade" id="modalkanban" role="dialog">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Enter Your Agenda</h4>
            </div>
                <div class="modal-body">
                    <form id="contact_form" method="POST">
                        Title: <input type="text" name="title" v-model='title'><br/>
                        Belongs To: <input type="text" name="belongs_to" v-model='belongsto'><br/>
                        Priority: <input type="text" name="priority" v-model='priority'><br/>
                        Description: <input type="text" name="description" v-model='description'><br/>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="button" id="submitForm" class="btn btn-default" v-on:click="addTask">Send</button>
                </div>
            </div>
        </div>
    </div>
  
    <div class=row>
      <todo></todo>
      <doing></doing>
      <review></review>
      <done></done>     
    </div>
</div>
</template>

<script>
import db from '../../config/config'
import todo from '@/components/Todo.vue'
import doing from '@/components/Doing.vue'
import review from '@/components/Review.vue'
import done from '@/components/Done.vue'


export default {
  name: 'kanban',components: {
    todo,doing,review,done
  },
  data: function () {
    return {
      test_db:'',
      title:'',
      description:'',
      belongsto:'',
      priority:''
    }
  },
  methods: {
    setupDb: function () {
        var ref = db.ref(`todo/`);

        ref.on("value", function(snapshot) {
        }, function (errorObject) {
        });    
    },addTask () {
      if (!this.title || !this.description) {
        alert('Task Atau Description tidak boleh kosong')
      }
      else{ 
        var ref = db.ref(`todo/`);
        ref.push({
          title: this.title,
          description : this.description,
          belongsto:this.belongsto,
          priority:this.priority
        });
        this.title=''
        this.description=''
        this.belongsto=''
        this.priority=''
      }
    }
  },
  created () {

  }
}
</script>
