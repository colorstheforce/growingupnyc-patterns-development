'use strict';

import Cookies from 'js-cookie/src/js.cookie.js';

class AlertBanner {
  constructor(expirationDaysParam) {
    const expirationDays = expirationDaysParam || AlertBanner.expiration;
    const el = document.querySelector(AlertBanner.selector);
    const control = document.querySelector(AlertBanner.controller);
    
    this._settings = {
      selector: AlertBanner.selector,
      controller: AlertBanner.controller,
      inactiveClass: AlertBanner.inactiveClass,
      activeClass: AlertBanner.activeClass,
      expiration: expirationDays,
      remover: AlertBanner.remover,
      cookieName: AlertBanner.cookieName
    };
    console.log(control);
    
    
    control.addEventListener('click', (event) => {
      this.assignCookie(el);

    });
    
    this.checkAlertCookie(el);
    console.log()
  }
  
  checkAlertCookie(element){
    // Cookies.remove(element.dataset.alert)
    if (Cookies.get(element.dataset.alert)) {
      if (element.classList.contains(this._settings.activeClass)){
        element.classList.toggle(this._settings.activeClass)
      }
    } else {
      element.classList.toggle(this._settings.inactiveClass)
      element.classList.toggle(this._settings.activeClass)
    }
  }
  assignCookie(element){
    if(element.classList.contains(this._settings.activeClass)){
      element.classList.toggle(this._settings.inactiveClass)
      element.classList.toggle(this._settings.activeClass)
      Cookies.set(element.dataset.alert, 'dismissed', { expires: this._settings.expiration });
    }
  }
  removeCookie(cookieName){
    const cookieRemoverButton = document.getElementById(AlertBanner.remover)
    cookieRemoverButton.addEventListener('click', (event) => {
      Cookies.remove('notification');
      location.reload();
    });
  }
  
}

AlertBanner.selector = '[data-js*="alert-banner"]';

AlertBanner.controller = '[data-js*="alert-controller"]';

AlertBanner.inactiveClass = 'hidden';

AlertBanner.activeClass = 'active';

AlertBanner.expiration = 360;

AlertBanner.remover = 'cookie-remover-button';

export default AlertBanner;