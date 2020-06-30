'use strict';

var LanguageSwitcher = function LanguageSwitcher() {
  var this$1 = this;
  this._settings = {
    selector: LanguageSwitcher.Selector,
    target: LanguageSwitcher.Target,
    currentLanguage: LanguageSwitcher.currentLanguage,
    languageSwitcherWrapper: LanguageSwitcher.LanguageSwitcherWrapper,
    logoWrapper: LanguageSwitcher.logoWrapper
  };
  var switcher = document.querySelector("." + this._settings.selector);
  var languagesDiv = document.querySelector("." + this._settings.target);
  var currentLanguage = document.querySelector("." + this._settings.currentLanguage);
  var allLanguages = document.querySelectorAll(".wpml-ls-item");
  var languageSwitcherWrapper = document.querySelector("." + this._settings.languageSwitcherWrapper);
  var logoWrapper = document.querySelector("." + this._settings.logoWrapper); // Media Query

  var isMobile = window.matchMedia("(max-width: 375px)");

  if (!languageSwitcherWrapper) {
    logoWrapper.style.marginTop = "2rem";
  } // const languagesDiv = document.querySelector(".wpml-ls-legacy-list-horizontal")
  // const switcher = document.querySelector(`.${LanguageSwitcher}`)


  if (languagesDiv) {
    languagesDiv.classList.add("desktop:w-11/12");
  } //Span elemetn with the title "Translate"


  var span = document.createElement("span");

  if (document.querySelector("[data-js='translate']")) {
    span.classList.add("wpml-ls-native");
    var hiddenSpan = document.querySelector("[data-js='translate']");
    var hiddenSpanConten = hiddenSpan.textContent; // span.textContent = hiddenSpanConten;

    var title = document.createTextNode(hiddenSpanConten);
    span.appendChild(title);
    console.log(hiddenSpanConten);
  } else {
    span.classList.add("wpml-ls-native");
    var title$1 = document.createTextNode("Translate");
    span.appendChild(title$1);
  }

  var aTag = document.createElement("a");
  aTag.classList.add("wpml-ls-link", "title-tag");
  aTag.appendChild(span);
  var li = document.createElement("li");
  li.classList.add("wpml-ls-item-button");
  li.appendChild(aTag);

  if (document.querySelector(".wpml-ls-legacy-list-horizontal")) {
    var ul = document.querySelector(".wpml-ls-legacy-list-horizontal").getElementsByTagName("ul");
    ul[0].appendChild(li);
  } // console.log(li)


  allLanguages.forEach(function (item) {
    if (!item.classList.contains('wpml-ls-current-language')) {
      item.style.display = "none";
    } // console.log(item.classList.contains('wpml-ls-current-language'))

  }); // const switcher2 = switcher.outerHTML = "<a class=\"rounded\">Translate</a>"
  // switcher.addEventListener('click', (e) => {
  // 	this._toggle(allLanguages, currentLanguage)
  // })

  aTag.addEventListener('click', function (e) {
    this$1._toggle(allLanguages, currentLanguage);

    li.style.display = "none";
    languageSwitcherWrapper.classList.toggle("mobile-languages-switcher");
  });
  LanguageSwitcher.addTitleOnMobile(languagesDiv, isMobile);
  window.addEventListener('resize', function () {
    LanguageSwitcher.addTitleOnMobile(languagesDiv, isMobile);
  }, false);
};

LanguageSwitcher.prototype._toggle = function _toggle(allLanguages, currentLanguage) {
  allLanguages.forEach(function (item) {
    item.style.display = "";
  });
};

LanguageSwitcher.addTitleOnMobile = function (languagesDiv, isMobile) {
  if (isMobile.matches) {
    console.log("yes it is mobile");
    var pTag = document.createElement("p");

    if (document.querySelector("[data-js='pick-a-language']")) {
      pTag.classList.add("wpml-ls-native");
      var hiddenSpan = document.querySelector("[data-js='translate']");
      var hiddenSpanContent = hiddenSpan.textContent;
      var title = document.createTextNode(hiddenSpanContent);
      pTag.appendChild(title);
    } else {
      pTag.classList.add("pick-a-language");
      var title$1 = document.createTextNode("Pick a language");
      pTag.appendChild(title$1);
    }

    console.log(pTag);
    languagesDiv.prepend(pTag);
  }
};

LanguageSwitcher.Selector = "rounded";
LanguageSwitcher.Target = "wpml-ls-legacy-list-horizontal";
LanguageSwitcher.currentLanguage = "wpml-ls-current-language";
LanguageSwitcher.LanguageSwitcherWrapper = "c-language-switcher-wrapper";
LanguageSwitcher.logoWrapper = "o-navigation__logo-wrapper";

module.exports = LanguageSwitcher;
