'use strict';

class Reveal {

  constructor(elNumber) {

    const numElements = isNaN(elNumber) ? 1 : elNumber;
    const content = document.querySelector(Reveal.target);
    const trigger = document.querySelector(Reveal.trigger);
    
    window.onresize = function () {
      
      if (trigger.style.display !== 'none') {
        Reveal.updateHeight(content, trigger, numElements);
      }
    }

    if(numElements === content.children.length) {
      trigger.style.display = 'none';
    }
    
    trigger.addEventListener('click', function(e) {
      trigger.style.display = 'none';
      content.style.overflow = 'visible';
      content.style.height = 'auto';
    })

    Reveal.updateHeight(content, trigger, numElements);
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

Reveal.target = '[data-js*=reveal-content]';
Reveal.trigger = '[data-js*=reveal-trigger]';

export default Reveal;