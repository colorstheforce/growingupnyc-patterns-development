'use strict';

var LanguageSwitcher = function LanguageSwitcher() {
  var this$1 = this;
  this._settings = {
    selector: LanguageSwitcher.Selector,
    target: LanguageSwitcher.Target,
    currentLanguage: LanguageSwitcher.currentLanguage
  };
  var switcher = document.querySelector("." + this._settings.selector);
  var languages = document.querySelector("." + this._settings.target);
  var currentLanguage = document.querySelector("." + this._settings.currentLanguage);
  var allLanguages = document.querySelectorAll(".wpml-ls-item"); // const switcher = document.querySelector(`.${LanguageSwitcher}`)

  console.log(switcher);
  allLanguages.forEach(function (item) {
    if (!item.classList.contains('wpml-ls-current-language')) {
      item.style.display = "none";
    } // console.log(item.classList.contains('wpml-ls-current-language'))

  }); // const switcher2 = switcher.outerHTML = "<a class=\"rounded\">Translate</a>"

  switcher.addEventListener('click', function (e) {
    this$1._toggle(allLanguages, currentLanguage);
  });
};

LanguageSwitcher.prototype._toggle = function _toggle(allLanguages, currentLanguage) {
  allLanguages.forEach(function (item) {
    item.style.display = "";
    console.log("yep");
  });
};

LanguageSwitcher.Selector = "rounded";
LanguageSwitcher.Target = "c-language-switcher__horizontal";
LanguageSwitcher.currentLanguage = "wpml-ls-current-language";

module.exports = LanguageSwitcher;
