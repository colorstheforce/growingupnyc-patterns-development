'use strict';

// * @see https://stackoverflow.com/questions/32395988/highlight-menu-item-when-scrolling-down-to-section
var SectionHighlighter = function SectionHighlighter() {
  this._settings = {// selector: Animations.selector,
    // controller: Animations.controller,
  };
  var $navigationLinks = $('.js-section-set > li > a');
  var $sections = $("section");
  var $sectionsReversed = $($("section").get().reverse());
  var sectionIdTonavigationLink = {}; //var eTop = $('#free-day-trips').offset().top;

  $sections.each(function () {
    var section = $(this); // fallback for acf_fc_layout sections

    if (!section.attr('data-id') && section.attr('id')) {
      section.attr('data-id', section.attr('id'));
      section.removeAttr('id');
    }

    section.children(':first').attr('id', section.attr('data-id'));
    sectionIdTonavigationLink[section.attr('data-id')] = $('.js-section-set > li > a[href="#' + section.attr('data-id') + '"]');
  });
  this.optimized();
  $(window).scroll(function () {
    this.optimized();
  });
};

SectionHighlighter.prototype.optimized = function optimized() {
  var scrollPosition = $(window).scrollTop();
  $sectionsReversed.each(function () {
    var currentSection = $(this);
    console.log(currentSection);
    var sectionTop = currentSection.offset().top; // if(currentSection.is('section:first-child') && sectionTop > scrollPosition){
    // console.log('scrollPosition', scrollPosition);
    // console.log('sectionTop', sectionTop);
    // }

    if (scrollPosition >= sectionTop || currentSection.is('section:first-child') && sectionTop > scrollPosition) {
      var id = currentSection.attr('data-id');
      var $navigationLink = sectionIdTonavigationLink[id];

      if (!$navigationLink.hasClass('is-active') || !$('section').hasClass('o-content-container--compact')) {
        $navigationLinks.removeClass('is-active');
        $navigationLink.addClass('is-active');
      }

      return false;
    }
  });
}; // Animations.controller = '[data-js*="rotate-controller"]';

module.exports = SectionHighlighter;
