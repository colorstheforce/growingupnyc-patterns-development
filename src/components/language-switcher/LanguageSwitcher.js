'use strict';


class LanguageSwitcher {
  /**
   * @constructor
   */
  constructor() {

    this._settings = {
			selector: LanguageSwitcher.Selector,
			target: LanguageSwitcher.Target,
			currentLanguage: LanguageSwitcher.currentLanguage
    };

	const switcher = document.querySelector(`.${this._settings.selector}`)
	const languages = document.querySelector(`.${this._settings.target}`)
	const currentLanguage = document.querySelector(`.${this._settings.currentLanguage}`)
	const allLanguages = document.querySelectorAll(".wpml-ls-item")
		// const switcher = document.querySelector(`.${LanguageSwitcher}`)

		allLanguages.forEach(item => {
			if (!item.classList.contains('wpml-ls-current-language')) {
				item.style.display = "none"
			}

			// console.log(item.classList.contains('wpml-ls-current-language'))
		});

	switcher.addEventListener('click', (e) => {
		this._toggle(allLanguages, currentLanguage)
	})

	}


	_toggle(allLanguages, currentLanguage) {
		allLanguages.forEach(item => {
			item.style.display = ""
			console.log("yep")
		})
	}

}

LanguageSwitcher.Selector = "rounded"
LanguageSwitcher.Target = "c-language-switcher__horizontal"
LanguageSwitcher.currentLanguage = "wpml-ls-current-language"

export default LanguageSwitcher;