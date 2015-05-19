"use strict";
/**
* @fileOverview AI is the root module of the evolution program.
* @author Anthony Norton
*/
'use strict';

(function AI(global, DOMinterface) {
  'use strict';
  console.log('Working.');
  var objToString = Object.prototype.toString;
  function getType(param) {
    return objToString.call(param).replace('[object ', '').replace(']', '').toLowerCase();
  }

  var cycles = {

    roster: [],

    register: function registerActor(actor) {
      var max;
      var i;
      console.log(actor);
      console.log(getType(actor));
      if (getType(actor) === 'array') {
        max = actor.length;
        i = 0;
        for (i; i < max; i++) {
          actor[i].init();
          this.roster.unshift(actor);
        }
      } else {
        actor.init();
        this.roster.unshift(actor);
      }
    },

    cycleLoop: function cycleLoop(context) {
      var i = context.roster.length - 1;

      for (i; i >= 0; i--) {
        context.roster[i].executeActions.call(context.roster[i]);
      }
    },

    init: function cyclesInit() {
      setInterval(this.cycleLoop, 100, this);
      delete this.init;
    }

  };

  function Creature() {
    if (!(this instanceof Creature)) {
      return new Creature();
    }

    this.init = function creatureInit() {
      this.elem = document.createElement('div');
      this.elem.style.height = '1px';
      this.elem.style.width = '1px';
      this.elem.style.backgroundColor = 'red';
      this.elem.style.position = 'absolute';
      this.elem.style.top = DOMinterface.body.offsetHeight / 2 + 'px';
      this.elem.style.left = DOMinterface.body.offsetWidth / 2 + 'px';
      this.elem.style.borderRadius = '1000px';
      this.elem.classList.add('creature');
      DOMinterface.body.appendChild(this.elem);
    };
  }

  Creature.prototype = {
    actions: [function live(context) {
      this.move();
      this.grow();
    }],

    move: function move() {
      var verticalSeed = Math.floor(Math.random() * 2 + 1);
      var horizontalSeed = Math.floor(Math.random() * 2 + 1);
      var newTop;
      var newLeft;

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
        this.elem.style.top = newTop + 'px';
      } else {}

      if (newLeft > 0 && newLeft < DOMinterface.body.offsetWidth) {
        this.elem.style.left = newLeft + 'px';
      } else {}
    },

    grow: function grow() {
      var growing = Math.floor(Math.random() * 100 + 1);
      var sizeChange;
      var currentHeight;
      var currentWidth;
      if (growing === 1) {
        sizeChange = 1;
        currentHeight = this.elem.offsetHeight;
        this.elem.style.height = currentHeight + sizeChange + 'px';
        this.elem.style.width = currentHeight + sizeChange + 'px';
      }
    },

    executeActions: function executeActions() {
      var i = this.actions.length - 1;

      for (i; i >= 0; i--) {
        this.actions[i].call(this);
      }
    },

    registerAction: function registerAction() {}
  };

  global.onload = function () {
    var creature1 = Creature();
    var creature2 = Creature();
    var creature3 = Creature();
    var creature4 = Creature();
    var creature5 = Creature();
    var creature6 = Creature();
    var creature7 = Creature();
    var creature8 = Creature();

    console.log('Loaded.');
    cycles.register(creature1);
    cycles.register(creature2);
    cycles.register(creature3);
    cycles.register(creature4);
    cycles.register(creature5);
    cycles.register(creature6);
    cycles.register(creature7);
    cycles.register(creature8);
    cycles.init();
    // listen('.communincation input');
  };
})(window, document);