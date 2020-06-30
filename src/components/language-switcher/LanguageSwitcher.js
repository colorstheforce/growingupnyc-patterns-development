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
  const allLanguages = document.querySelectorAll(".wpml-ls-item");
  const languageSwitcherWrapper = document.querySelector(`.${this._settings.languageSwitcherWrapper}`);
  const logoWrapper = document.querySelector(`.${this._settings.logoWrapper}`);

  // Media Query
  let isMobile = window.matchMedia("(max-width: 375px)");

  if(!languageSwitcherWrapper) {
    logoWrapper.style.marginTop = "2rem";
  }

  // const languagesDiv = document.querySelector(".wpml-ls-legacy-list-horizontal")
    // const switcher = document.querySelector(`.${LanguageSwitcher}`)

  if (languagesDiv) {
    languagesDiv.classList.add("desktop:w-11/12");
  }


    //Span elemetn with the title "Translate"
    const span = document.createElement("span");
    if (document.querySelector("[data-js='translate']")) {
      span.classList.add("wpml-ls-native");
      const hiddenSpan = document.querySelector("[data-js='translate']")
      const hiddenSpanConten = hiddenSpan.textContent;
      // span.textContent = hiddenSpanConten;
      const title = document.createTextNode(hiddenSpanConten);
      span.appendChild(title);
      console.log(hiddenSpanConten)
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

    // console.log(li)

    allLanguages.forEach(item => {
      if (!item.classList.contains('wpml-ls-current-language')) {
        item.style.display = "none"
      }
      // console.log(item.classList.contains('wpml-ls-current-language'))
    });

  // const switcher2 = switcher.outerHTML = "<a class=\"rounded\">Translate</a>"
  // switcher.addEventListener('click', (e) => {
  // 	this._toggle(allLanguages, currentLanguage)
  // })

  aTag.addEventListener('click', (e) => {
    this._toggle(allLanguages, currentLanguage);
    li.style.display = "none";
    languageSwitcherWrapper.classList.toggle("mobile-languages-switcher")
  })



    LanguageSwitcher.addTitleOnMobile(languagesDiv, isMobile);
    window.addEventListener('resize', function() {
      LanguageSwitcher.addTitleOnMobile(languagesDiv, isMobile);
    }, false);

  }




  _toggle(allLanguages, currentLanguage) {
    allLanguages.forEach(item => {
      item.style.display = ""
    })
  }

}

LanguageSwitcher.addTitleOnMobile = function(languagesDiv, isMobile) {
    if (isMobile.matches) {
        console.log("yes it is mobile")

        const pTag = document.createElement("p");
      if (document.querySelector("[data-js='pick-a-language']")) {
        pTag.classList.add("wpml-ls-native");
        const hiddenSpan = document.querySelector("[data-js='translate']")
        const hiddenSpanContent = hiddenSpan.textContent;

        const title = document.createTextNode(hiddenSpanContent);
        spTagpan.appendChild(title);

      } else {
        pTag.classList.add("pick-a-language");
        const title = document.createTextNode("Pick a language");
        pTag.appendChild(title);
      }

       console.log(pTag)
      languagesDiv.prepend(pTag)


    }

}

LanguageSwitcher.Selector = "rounded"
LanguageSwitcher.Target = "wpml-ls-legacy-list-horizontal"
LanguageSwitcher.currentLanguage = "wpml-ls-current-language"
LanguageSwitcher.LanguageSwitcherWrapper = "c-language-switcher-wrapper"
LanguageSwitcher.logoWrapper = "o-navigation__logo-wrapper"


export default LanguageSwitcher;