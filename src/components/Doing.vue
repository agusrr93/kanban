<template>
    <ol class="kanban progress" v-if="doing.length!=0">
    <h2><i class="material-icons">build</i> In progress</h2>
          <div v-for="to in doing" v-bind:key="to.id">
            <li class="dd-item">
                <h3 class="title dd-handle" >Nama : {{to.title}}<i class=" material-icons ">filter_none</i></h3>
                <div class="text">Deskripsi : {{to.description}}</div> 
                <div class="text">Untuk : {{to.belongs}}</div>
                <div class="text">Prioritas : {{to.priority}}</div>
                <a><i v-on:click='prev(to)' class="fa fa-arrow-circle-left" aria-hidden="true"></i></a>||
                <a><i v-on:click='next(to)' class="fa fa-arrow-circle-right" aria-hidden="true"></i></a>||
                <a v-on:click='deleted(to)'><i class="fa fa-trash" aria-hidden="true"></i></a>
            </li> 
          </div>
    </ol>          
</template>

<script>
    import db from '../../config/config'
    export default {
        data: function () {
        return {
        doing: ''
        }
    },
    methods: {
        getDoing: function () {
            let self = this
            var ref = db.ref(`doing/`);
            ref.on('value', function(snapshot) {
                let arr = []
                let keys
                let values
                if(snapshot.val()){
                  keys = Object.keys(snapshot.val())
                  values = Object.values(snapshot.val())
                }else{
                  keys = []
                  values = []
                }
                for(let i = 0 ; i < keys.length ; i++) {
                  arr.push({
                      id: keys[i],
                      title: values[i].title,
                      description: values[i].description,
                      belongs:values[i].belongsto,
                      priority:values[i].priority
                  })
                }
                self.doing = arr
            });
        },
        next: function (param) {
            var ref = db.ref(`doing/${param.id}`)
            ref.set({});
            var refn = db.ref(`review/`)
            refn.push({
                title: param.title,
                description : param.description,
                belongsto:param.belongs,
                priority:param.priority
            })
        },deleted:function(param){
          var ref = db.ref(`doing/${param.id}`)
          ref.set({});
        },prev: function (param) {
            var ref = db.ref(`doing/${param.id}`)
            ref.set({});
            var refn = db.ref(`todo/`)
            refn.push({
                title: param.title,
                description : param.description,
                belongsto:param.belongs,
                priority:param.priority
            })
        }
    },created () {
       this.getDoing()
    }  
 }
</script>

<style>

h1 {
  position: absolute;
  left: 16px;
  top: 16px;
}

menu {
  position: absolute;
  right: 16px;
  top: 16px;
}

menu.kanban .viewlist,
menu.list .viewkanban {
  display: inline;
}

menu.kanban .viewkanban,
menu.list .viewlist {
  display: none;
}

.dd {
  max-width: 100%;
  top: 88px;
  margin: 0 auto;
  display: block;
  vertical-align: top;
}

ol {
  transition: border-color 2s ease, all 0.1s ease;
}

ol.list {
  padding-top: 2em;
  padding-left: 15px;
  max-width: 650px;
  margin: 0 auto;
}

ol.list .text {
  float: right;
  width: 60%;
}

ol.list h3,
ol.list .actions,
ol.list label {
  float: left;
  width: 30%;
}

ol.list > li,
ol.list > h3 {
  max-width: 600px;
  margin: 0 auto;
}

ol.list > h2 {
  padding-bottom: 6px;
}

ol.list.To-do {
  border-left: 2px solid #FFB300;
}

ol.list.Gone {
  border-left: 2px solid #FF3D00;
}

ol.list.progress {
  border-left: 2px solid #29B6F6;
}

ol.list.Done {
  border-left: 2px solid #8BC34A;
}

H2,
h1,
button {
  margin-left: 5px;
  font-family: 'Arbutus Slab', serif;
}

h2 {
  color: #607D8B;
}

h2 .material-icons {
  color: #B0BEC5;
  line-height: 1.5;
}

.dd-handle .material-icons {
  color: #B0BEC5;
  font-size: 14px;
  font-weight: 800;
  line-height: 2rem;
  position: relative;
  right: 0;
  color: #607D8B;
  padding: 5px 16px;
}

button>.material-icons {
  line-height: 0.2;
  position:relative;
  top:7px;
}

.dd-item:hover,
button:hover {
  color: #00838F;
  will-change: box-shadow;
  transition: box-shadow .2s cubic-bezier(.4, 0, 1, 1), background-color .2s cubic-bezier(.4, 0, .2, 1), color .2s cubic-bezier(.4, 0, .2, 1);
  box-shadow: 0 5px 6px 0 rgba(0, 0, 0, .14), 0 3px 1px -6px rgba(0, 0, 0, .2), 2px 5px 3px 0 rgba(0, 0, 0, .12);
}

button.addbutt {
  background-color: #EEEEEE;
  color: #607D8B;
  width: 100%;
}

.list > button.addbutt {
  max-width: 330px;
}

button:active, button:down, button:focus {box-shadow: 0 0 0 0, 0 0 0 0 rgba(0, 0, 0, .2), 0 0 0 0 rgba(0, 0, 0, .12);color:#00838F;}
button {
  align-items: center;
  background-color: #EEEEEE;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
  border: 1px solid #ccc;
  border-radius: 2px;
  color: #607D8B;
  position: relative;
  margin: 0;
  min-width: 44px;
  padding: 10px 16px;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  text-decoration: none;
    }

ol.kanban.To-do {
  border-top: 5px solid #FFB300;
}

ol.kanban.Gone {
  border-top: 5px solid #FF3D00;
}

ol.kanban.progress {
  border-top: 5px solid #29B6F6;
}

ol.kanban.Done {
  border-top: 5px solid #8BC34A;
}

ol.kanban {
  border-top: 5px solid #78909C;
  width: 20%;
  height: auto;
  margin: 1%;
  max-width: 250px;
  min-width: 120px;
  display: inline-block;
  vertical-align: top;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
  flex-direction: column;
  min-height: 200px;
  z-index: 1;
  position: relative;
  background: #fff;
  padding: 1em;
  border-radius: 2px;
}

.dd-item {
  display: block;
  position: relative;
  list-style: none;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  min-height: 48px;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  font-size: 16px;
  min-height: 120px;
  overflow: hidden;
  z-index: 1;
  position: relative;
  background: #fff;
  border-radius: 2px;
  box-sizing: border-box;
}

.title {
  align-self: flex-end;
  color: inherit;
  display: block;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  font-size: 24px;
  line-height: normal;
  overflow: hidden;
  -webkit-transform-origin: 149px 48px;
  transform-origin: 149px 48px;
  margin: 0;
}


.actions {
  border-top: 1px solid rgba(0, 0, 0, .1);
  font-size: 8px;
  line-height: normal;
  width: 100%;
  color: #B0BEC5;
  padding: 8px;
  box-sizing: border-box;
}


/**
 * Nestable
 */

.dd {
  position: relative;
  display: block;
  list-style: none;
}

.dd-list {
  display: block;
  position: relative;
  margin: 0;
  padding: 0;
  list-style: none;
}

.dd-list .dd-list {
  padding-left: 30px;
}

.dd-collapsed .dd-list {
  display: none;
}

.dd-item {
  display: block;
  margin: 5px 0;
  padding: 5px 10px;
  color: #333;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #ccc;
  background: #fafafa;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.dd-item:hover {
  background: #fff;
}

.dd-item > button {
  display: block;
  position: relative;
  cursor: move;
  float: left;
  width: 25px;
  height: 20px;
  margin: 5px 0;
  padding: 0;
  text-indent: 100%;
  white-space: nowrap;
  overflow: hidden;
  border: 0;
  background: transparent;
  font-size: 12px;
  line-height: 1;
  text-align: center;
  font-weight: bold;
}

.dd-item > button:before {
  content: '+';
  display: block;
  position: absolute;
  width: 100%;
  text-align: center;
  text-indent: 0;
}

.dd-item > button[data-action="collapse"]:before {
  content: '<i class="material-icons">filter_none</i>';
}

.dd-placeholder,
.dd-empty {
  margin: 5px 0;
  padding: 0;
  min-height: 30px;
  background: #E0E0E0;
  border: 1px dashed #b6bcbf;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.dd-empty {
  border: 1px dashed #bbb;
  min-height: 100px;
  background-color: #E0E0E0;
  background-size: 60px 60px;
  background-position: 0 0, 30px 30px;
}

.dd-dragel {
  position: absolute;
  pointer-events: none;
  z-index: 9999;
}

.dd-dragel > .dd-item .dd-handle {
  margin-top: 0;
  cursor: move;
}

.dd-dragel .dd-item {
  -webkit-box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, .5);
  box-shadow: 2px 4px 6px 0 rgba(0, 0, 0, .5);
  cursor: move;
}

</style>