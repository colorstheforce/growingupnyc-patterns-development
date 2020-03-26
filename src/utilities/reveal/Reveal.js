/**
 * contentShow
 */
'use strict';

import $ from 'jquery';

class Reveal {

  constructor() {
    const content = $('[js-target*=content-show-all]');
    const trigger = $('[js-trigger*=content-show-all]');

    $(window).on('resize', function () {
      if ($(trigger).is(':visible') == true) {
        Reveal.updateHeight(content);
      }
    })

    $(trigger).on('click', function (e) {
      $(this).hide();
      content.css({
        'overflow': 'visible',
        'height': 'auto'
      });
    });

    Reveal.updateHeight(content);

  }
}

Reveal.updateHeight = function(content) {
  if (content.children().length > 3) {
    var newHeight = content.children().eq(0).height() + content.children().eq(1).height()
      + content.children().eq(2).height() + (3 * 18);

    content.css({
      'height': newHeight + 'px',
      'overflow': 'hidden',
    });
  }
}

Reveal.target = '[js-target*=content-show-all]';

Reveal.trigger = '[js-trigger*=content-show-all]';

export default Reveal;