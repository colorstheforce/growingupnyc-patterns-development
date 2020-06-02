'use strict';

var LanguageSwitcher = function LanguageSwitcher() {
  var this$1 = this;
  this._settings = {
    selector: LanguageSwitcher.Selector,
    target: LanguageSwitcher.Target,
    currentLanguage: LanguageSwitcher.currentLanguage
  };
  var switcher = document.querySelector("." + this._settings.selector);
  var languagesDiv = document.querySelector("." + this._settings.target);
  var currentLanguage = document.querySelector("." + this._settings.currentLanguage);
  var allLanguages = document.querySelectorAll(".wpml-ls-item"); // const switcher = document.querySelector(`.${LanguageSwitcher}`)
  // Add wrapper classes on mobile and tablet view

  languagesDiv.classList.add("desktop:w-11/12", "tablet:w-6/12"); //Span elemtn with the title "Translate"

  var span = document.createElement("span");
  span.classList.add("wpml-ls-native");
  var title = document.createTextNode("Translate");
  span.appendChild(title); // var svg = document.createElement('svg'); //Get svg element
  // var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); //Create a path in SVG's namespace
  // newElement.setAttribute("d","M 0 0 L 10 10"); //Set path's data
  // newElement.style.stroke = "#000"; //Set stroke colour
  // newElement.style.strokeWidth = "5px"; //Set stroke width
  // svg.appendChild(newElement);

  var aTag = document.createElement("a");
  aTag.classList.add("wpml-ls-link", "title-tag");
  aTag.appendChild(span);
  var li = document.createElement("li");
  li.classList.add("wpml-ls-item-button");
  li.appendChild(aTag);
  var ul = document.querySelector("." + languagesDiv).getElementsByTagName("ul");
  ul[0].appendChild(li); // console.log(li)

  allLanguages.forEach(function (item) {
    if (!item.classList.contains('wpml-ls-current-language')) {
      item.style.display = "none";
    } // console.log(item.classList.contains('wpml-ls-current-language'))

  }); // const switcher2 = switcher.outerHTML = "<a class=\"rounded\">Translate</a>"
  // switcher.addEventListener('click', (e) => {
  // this._toggle(allLanguages, currentLanguage)
  // })

  aTag.addEventListener('click', function (e) {
    this$1._toggle(allLanguages, currentLanguage);

    li.style.display = "none";
    console.log("Gocha");
  });
};

LanguageSwitcher.prototype._toggle = function _toggle(allLanguages, currentLanguage) {
  allLanguages.forEach(function (item) {
    item.style.display = "";
    console.log("yep");
  });
};

LanguageSwitcher.Selector = "rounded";
LanguageSwitcher.Target = "wpml-ls-legacy-list-horizontal";
LanguageSwitcher.currentLanguage = "wpml-ls-current-language";

module.exports = LanguageSwitcher;
