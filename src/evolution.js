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
      }
    ],
    move: function move() {
      var verticalSeed = Math.floor(Math.random() * 2 + 1);
      var horizontalSeed = Math.floor(Math.random() * 4 + 1);
      if (verticalSeed === 1) {
        this.elem.style.top = parseInt(this.elem.style.top) + 10 + 'px';
      } else if (verticalSeed === 2) {
        this.elem.style.top = parseInt(this.elem.style.top) - 10 + 'px';
      }

      if (horizontalSeed === 1) {
        this.elem.style.left = parseInt(this.elem.style.left) + 10 + 'px';
      } else if (horizontalSeed === 2) {
        this.elem.style.left = parseInt(this.elem.style.left) - 10 + 'px';
      }
      // if (seed) {};
      // this.elem.style.top =
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
      this.elem.style.height = '10px';
      this.elem.style.width = '10px';
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
