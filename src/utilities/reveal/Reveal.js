'use strict';

class Reveal {

  constructor(elNumber) {
    const content = Reveal.target;
    const trigger = Reveal.trigger;

    window.onresize = function () {
      console.log(trigger.style.display);

      if (trigger.style.display !== 'none') {
        Reveal.updateHeight(content, trigger, elNumber);
      }
    }

    trigger.addEventListener('click', function(e) {
      trigger.style.display = 'none';
      content.style.overflow = 'visible';
      content.style.height = 'auto';
    })

    Reveal.updateHeight(content, trigger, elNumber);
  }
}

Reveal.updateHeight = function(content, trigger, elNumber) {

  if (content.childElementCount < 2) {
    trigger.style.display = 'none';
  } else {
    var newHeight = 0;
    for (let i = 0; i < elNumber; i++) {
      newHeight += content.children[i].offsetHeight;
    }

    content.style.height = newHeight + 'px';
    content.style.overflow = 'hidden';
  }
}

Reveal.target = document.querySelector("#all-content-container");
Reveal.trigger = document.querySelector("#show-all-content");

export default Reveal;