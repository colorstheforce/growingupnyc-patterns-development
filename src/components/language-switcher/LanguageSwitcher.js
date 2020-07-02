'use strict';


class LanguageSwitcher {
  /**
   * @constructor
   */
  constructor() {

    this._settings = {
      selector: LanguageSwitcher.Selector,
      target: LanguageSwitcher.Target,
      currentLanguage: LanguageSwitcher.currentLanguage,
      languageSwitcherWrapper: LanguageSwitcher.LanguageSwitcherWrapper,
      logoWrapper: LanguageSwitcher.logoWrapper
    };

    const switcher = document.querySelector(`.${this._settings.selector}`)
    const languagesDiv = document.querySelector(`.${this._settings.target}`)
    const currentLanguage = document.querySelector(`.${this._settings.currentLanguage}`)
    const languageSwitcherWrapper = document.querySelector(`.${this._settings.languageSwitcherWrapper}`);
    const logoWrapper = document.querySelector(`.${this._settings.logoWrapper}`);


    if (languagesDiv) {
      languagesDiv.classList.add("desktop:w-11/12");
    }
    if(!languageSwitcherWrapper) {
      logoWrapper.style.marginTop = "2rem";
    }

    // Add Pick a language title on moble
    const liTag = document.createElement("li");
    if (document.querySelector("[data-js='pick-a-language']")) {
      liTag.classList.add("pick-a-language", "wpml-ls-item");
      const hiddenSpan = document.querySelector("[data-js='pick-a-language']")
      const hiddenSpanContent = hiddenSpan.textContent;

      const title = document.createTextNode(hiddenSpanContent);
      liTag.appendChild(title);

    } else {
      liTag.classList.add("pick-a-language", "wpml-ls-item");
      const title = document.createTextNode("Pick a language");
      liTag.appendChild(title);
    }

    const closeIconLi = document.createElement("li");
    closeIconLi.classList.add("close-language-switcher", "wpml-ls-item");
    const CloseIconATag = document.createElement("a")
    CloseIconATag.classList.add("wpml-ls-link", "ls-close-link");



    // CloseIconATag.textContent = "Close";

    closeIconLi.appendChild(CloseIconATag)
    console.log(closeIconLi)

    // Media Query
    let isMobile = window.matchMedia("(max-width: 700px)");
    if (isMobile.matches) {
      let ul = document.querySelector(".wpml-ls-legacy-list-horizontal").getElementsByTagName("ul");
      ul[0].prepend(closeIconLi);
      ul[0].prepend(liTag);
    }


    //Span elemetn with the title "Translate"
    const span = document.createElement("span");
    if (document.querySelector("[data-js='translate']")) {
      span.classList.add("wpml-ls-native");
      const hiddenSpan = document.querySelector("[data-js='translate']")
      const hiddenSpanConten = hiddenSpan.textContent;
      const title = document.createTextNode(hiddenSpanConten);
      span.appendChild(title);
    } else {
      span.classList.add("wpml-ls-native");
      const title = document.createTextNode("Translate");
      span.appendChild(title);
    }


    const aTag = document.createElement("a")
    aTag.classList.add("wpml-ls-link", "title-tag");
    aTag.appendChild(span)

    const li = document.createElement("li");
    li.classList.add("wpml-ls-item-button")
    li.appendChild(aTag)

    if (document.querySelector(".wpml-ls-legacy-list-horizontal")) {
      let ul = document.querySelector(".wpml-ls-legacy-list-horizontal").getElementsByTagName("ul");
      ul[0].appendChild(li);
    }


    const allLanguages = document.querySelectorAll(".wpml-ls-item");
    this._hideAllLanguages(allLanguages);
    // allLanguages.forEach(item => {
      //   if (!item.classList.contains('wpml-ls-current-language')) {
        //     item.style.display = "none"
        //   }
        // });


    aTag.addEventListener('click', (e) => {
      this._toggle(allLanguages, currentLanguage);
      li.style.display = "none";
      languageSwitcherWrapper.classList.toggle("mobile-languages-switcher")
      logoWrapper.classList.toggle("ls-logo")

    })

    CloseIconATag.addEventListener('click', (e) => {
      this._hideAllLanguages(allLanguages);
      languageSwitcherWrapper.classList.remove("mobile-languages-switcher");
      li.style.display = "";
      logoWrapper.classList.remove("ls-logo")
    })
}


  _toggle(allLanguages, currentLanguage) {
    allLanguages.forEach(item => {
      item.style.display = ""
    })
  }

  _hideAllLanguages(allLanguages) {
    allLanguages.forEach(item => {
      if (!item.classList.contains('wpml-ls-current-language')) {
        item.style.display = "none"
      }
    });
  }

}


LanguageSwitcher.Selector = "rounded"
LanguageSwitcher.Target = "wpml-ls-legacy-list-horizontal"
LanguageSwitcher.currentLanguage = "wpml-ls-current-language"
LanguageSwitcher.LanguageSwitcherWrapper = "c-language-switcher-wrapper"
LanguageSwitcher.logoWrapper = "o-navigation__logo-wrapper"


export default LanguageSwitcher;