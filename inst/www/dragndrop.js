// need to bind on inserted to work with insertUI
$(document).bind('DOMNodeInserted', function(){
  $(".dropelement").off("dragover");
  $(".dropelement").on("dragover",function(e){
    e.preventDefault();
  });
  $(".dragelement").off("dragstart");
  $(".dragelement").on("dragstart",function(e){
    var nodeCheck = e.target;
    var dragName = nodeCheck.id;
    
    // make sure you grab the entire draggable element
    while(dragName === "" || nodeCheck.className !== "dragelement") {
      nodeCheck = nodeCheck.parentNode;
      dragName = nodeCheck.id;
    }
    e.originalEvent.dataTransfer.setData("Text",dragName);
  });
  $(".dropelement").off("drop");
  $(".dropelement").on("drop",function(e){
    e.preventDefault();
    var data=e.originalEvent.dataTransfer.getData("Text");
    // prevent images from stacking on tope of each other
    if (e.target.nodeName !== "IMG") {
      e.target.appendChild(document.getElementById(data));
      var el = $(e.target);
      el.trigger("change");
    }
  });
});

var dragDropBinding = new Shiny.InputBinding();
$.extend(dragDropBinding, {
  find: function(scope) {
    return $(scope).find(".dropelement");
  },
  getValue: function(el) {
    //return $(el).text();
    var x = $(el).children();
    var matrix = [[]];

    for (var i = 0; i < x.length; i++ ) {
      matrix[0][i] = x[i].textContent;
    }

    return matrix;
  },
  setValue: function(el) {
    $(el).text();
  },
  subscribe: function(el, callback) {
    $(el).on("change", function(e) {
      callback();
    });
  },
  unsubscribe: function(el) {
    $(el).off(".dragDropBinding");
  },
  getType: function() {
    return "dragdropshiny.dropper";
}

});

Shiny.inputBindings.register(dragDropBinding);
