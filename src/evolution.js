/**
* @fileOverview AI is the root module of the evolution program.
* @author Anthony Norton
*/
(function AI (global, DOMinterface) {
  "use strict";
  console.log('Working.');

  var cycles = {

    roster: [],

    register: function registerActor(actor) {
      actor.init();
      this.roster.unshift(actor);
    },

    cycleLoop: function cycleLoop(context) {
      var i = (context.roster.length - 1);

      for (i; i >= 0; i--) {
        context.roster[i].executeActions.call(context.roster[i]);
      }
    },

    init: function cyclesInit() {
      setInterval(this.cycleLoop, 100, this);
      delete this.init;
    }

  };

  var creature = {
    actions: [
      function live(context) {
        this.move();
        this.grow();
      }
    ],

    move: function move() {
      var verticalSeed = Math.floor(Math.random() * 2 + 1);
      var horizontalSeed = Math.floor(Math.random() * 2 + 1);
      var newTop;
      var newLeft;

      console.log();
      if (verticalSeed === 1) {
        newTop = parseInt(this.elem.style.top) + 10;
      } else if (verticalSeed === 2) {
        newTop = parseInt(this.elem.style.top) - 10;
      }

      if (horizontalSeed === 1) {
        newLeft = parseInt(this.elem.style.left) + 10;
      } else if (horizontalSeed === 2) {
        newLeft = parseInt(this.elem.style.left) - 10;
      }

      if (newTop > 0 && newTop < DOMinterface.body.offsetHeight) {
        this.elem.style.top = newTop + 'px'
      } else {
        console.log('Out of bounds vertically.');
      }

      if (newLeft > 0 && newLeft < DOMinterface.body.offsetWidth) {
        this.elem.style.left = newLeft + 'px'
      } else {
        console.log('Out of bounds horizontallly.');
      }
    },

    grow: function grow() {
      var growing = Math.floor(Math.random() * 100 + 1);
      var sizeChange;
      var currentHeight;
      var currentWidth;
      if (growing === 1) {
        console.log(growing);
        sizeChange = 1;
        currentHeight = this.elem.offsetHeight;
        this.elem.style.height = currentHeight + sizeChange + 'px';
        this.elem.style.width = currentHeight + sizeChange + 'px';
        console.log('Grow to: ', this.elem.offsetHeight);
      }
    },

    executeActions: function executeActions() {
      var i = (this.actions.length - 1);

      for (i; i >= 0; i--) {
        this.actions[i].call(this);
      }
    },

    registerAction: function registerAction() {

    },
    init: function creatureInit() {
      this.elem = document.createElement('div');
      this.elem.style.height = '1px';
      this.elem.style.width = '1px';
      this.elem.style.backgroundColor = 'red';
      this.elem.style.position = 'absolute';
      this.elem.style.top = DOMinterface.body.offsetHeight/2 + 'px';
      this.elem.style.left = DOMinterface.body.offsetWidth/2 + 'px';
      this.elem.style.borderRadius = '1000px';
      this.elem.classList.add('creature');
      DOMinterface.body.appendChild(this.elem);
    }
  }


  global.onload = function () {
    console.log('Loaded.');
    cycles.register(creature);
    cycles.init();
    // listen('.communincation input');
  };

})(window, document);
