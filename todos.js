ToDos = new Mongo.Collection("todos");

if (Meteor.isClient) {

  Session.set('ifToDoViewTrue',false);

  Template.header.events({
    'click .add-todo': function () {
      //$(".ToDoForm").css('visibility', 'visible');
      Session.set('ifToDoViewTrue',true);
      $(".add-todo").hide();
      console.log("tootab");
      console.log(Session.get('ifToDoViewTrue'));
    }
  });

  Template.content.events({
    'click .save-button': function (evt, tmpl) {
      var todoName = tmpl.find("#ToDoName").value;
      var todoDescription = tmpl.find("#ToDoDescription").value;
      var todoDeadline = tmpl.find("#ToDoDeadline").value;
      var todoPerson = tmpl.find("#ToDoPerson").value;

      console.log("TEre" + todoName + todoDeadline);

      if ($.trim(todoName) == '' || $.trim(todoDescription) == '' || !todoDeadline || $.trim(todoPerson) == '') {
        alert("Please insert all values!");
        evt.preventDefault();
        Session.set('ifToDoViewTrue',true);
      } else {
        ToDos.insert({todoname: todoName, tododescription: todoDescription, tododeadline: todoDeadline, todoperson: todoPerson});
        Session.set('ifToDoViewTrue',false);
        $(".add-todo").show();
      }  

      


    },'click .delete': function (e, tmpl) {

      ToDos.remove({ _id: this._id});

    },'click .cancel-button': function (e, tmpl) {

      Session.set('ifToDoViewTrue',false);
      $(".add-todo").show();

    }
  });

  Template.content.helpers({
    ifToDoViewTrue: function () {
      if (Session.equals('ifToDoViewTrue',true)) {
        return Session.get('ifToDoViewTrue');
      }
      
      return;
    }
  });

  Template.list.helpers({
    todos: function () {
      return ToDos.find(/*{sort: {tododeadline: 1}}*/);
    }
  });
}
