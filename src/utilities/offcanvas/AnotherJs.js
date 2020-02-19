'use strict';

// import forEach from 'lodash/forEach';
// import Toggle from '@nycopportunity/patterns-framework/src/utilities/toggle/toggle;
/**
 * The Accordion module
 * @class
 */
class AnotherJs {

	constructor() {
		const panelTriggers = document.getElementsByClassName('js-cd-panel-trigger');
		console.log(panelTriggers)
		this.toggle(panelTriggers)
	}

	toggle(panelTriggers) {
		if( panelTriggers.length > 0 ) {
			for(var i = 0; i < panelTriggers.length; i++) {
				(function(i){
					var panelClass = 'js-cd-panel-'+panelTriggers[i].getAttribute('data-panel'),
						panel = document.getElementsByClassName(panelClass)[0];
					// open panel when clicking on trigger btn
					panelTriggers[i].addEventListener('click', function(event){
						event.preventDefault();
						AnotherJs.addClass(panel, 'cd-panel--is-visible');
					});
					//close panel when clicking on 'x' or outside the panel
					panel.addEventListener('click', function(event){
						if( AnotherJs.hasClass(event.target, 'js-cd-close') || AnotherJs.hasClass(event.target, panelClass)) {
							event.preventDefault();
							AnotherJs.removeClass(panel, 'cd-panel--is-visible');
						}
					});
				})(i);
			}
		}
	}

}

/**
 * The dom selector for the module
 * @type {String}
 */
AnotherJs.selector = 'js-cd-panel-trigger';

AnotherJs.hasClass = (el, className) => {
	if (el.classList) return el.classList.contains(className);
	else return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}
AnotherJs.addClass = (el, className) => {
 if (el.classList) el.classList.add(className);
 else if (!hasClass(el, className)) el.className += " " + className;
}
AnotherJs.removeClass = (el, className) => {
	if (el.classList) el.classList.remove(className);
	else if (hasClass(el, className)) {
		var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
		el.className=el.className.replace(reg, ' ');
	}
}

export default AnotherJs;


