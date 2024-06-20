import '@vaadin/polymer-legacy-adapter/style-modules.js';
import '@vaadin/combo-box/theme/lumo/vaadin-combo-box.js';
import 'Frontend/generated/jar-resources/flow-component-renderer.js';
import 'Frontend/generated/jar-resources/comboBoxConnector.js';
import '@vaadin/tooltip/theme/lumo/vaadin-tooltip.js';
import '@vaadin/button/theme/lumo/vaadin-button.js';
import 'Frontend/generated/jar-resources/buttonFunctions.js';
import 'Frontend/generated/jar-resources/menubarConnector.js';
import '@vaadin/menu-bar/theme/lumo/vaadin-menu-bar.js';
import '@vaadin/dialog/theme/lumo/vaadin-dialog.js';
import '@vaadin/vertical-layout/theme/lumo/vaadin-vertical-layout.js';
import '@vaadin/horizontal-layout/theme/lumo/vaadin-horizontal-layout.js';
import '@vaadin/login/theme/lumo/vaadin-login-form.js';
import '@vaadin/icon/theme/lumo/vaadin-icon.js';
import '@vaadin/context-menu/theme/lumo/vaadin-context-menu.js';
import 'Frontend/generated/jar-resources/contextMenuConnector.js';
import 'Frontend/generated/jar-resources/contextMenuTargetConnector.js';
import '@vaadin/multi-select-combo-box/theme/lumo/vaadin-multi-select-combo-box.js';
import '@vaadin/text-field/theme/lumo/vaadin-text-field.js';
import '@vaadin/icons/vaadin-iconset.js';
import '@vaadin/notification/theme/lumo/vaadin-notification.js';
import '@vaadin/common-frontend/ConnectionIndicator.js';
import '@vaadin/vaadin-lumo-styles/color-global.js';
import '@vaadin/vaadin-lumo-styles/typography-global.js';
import '@vaadin/vaadin-lumo-styles/sizing.js';
import '@vaadin/vaadin-lumo-styles/spacing.js';
import '@vaadin/vaadin-lumo-styles/style.js';
import '@vaadin/vaadin-lumo-styles/vaadin-iconset.js';

const loadOnDemand = (key) => {
  const pending = [];
  if (key === 'a2ba6608bf03f0923a3b4c823a67a8aefe0027925c133144a7da1353b1de0fd9') {
    pending.push(import('./chunks/chunk-02e902702b208ff6c4401262ec086c1391a58008930d3199be722c7f5589e61a.js'));
  }
  if (key === '1a5c00fc55d32838615ed9a181ea9fd845859cc335f86dbe8070fff5d597e033') {
    pending.push(import('./chunks/chunk-032b0ad062867e375c4b34be136ea066ef86856515e7897279b2789d3fb0920d.js'));
  }
  if (key === '837760c4d461a4e1ee52016b7935cd13a2c508a606c5fdbb301c39732762f630') {
    pending.push(import('./chunks/chunk-032b0ad062867e375c4b34be136ea066ef86856515e7897279b2789d3fb0920d.js'));
  }
  if (key === 'a81db8973de0fe64e0a9d4fff33ad2c99fef169d626f795dec0b190e3fe4e985') {
    pending.push(import('./chunks/chunk-03c74e790794d2a3ca3082d4bef687a5ff5c2da221f6c4de089d03515f99b74c.js'));
  }
  if (key === '8392d0bb1ed77553aa96fc1bd3cebbb84f72b70ac9afb09217d334ea38fcbf79') {
    pending.push(import('./chunks/chunk-e7fdca38f9b1aadc22acd61a88c4a57c09b20d284ba516e82857717231c54b11.js'));
  }
  if (key === '38ec8616273ca9f7bd30b5bf12f67e840abea0e0dec9cfe65ab8b0510dd73f57') {
    pending.push(import('./chunks/chunk-c4ae94a5c284dcfda5bb0423cbff6cbb40da587fc0e79c3be6c99d80410c2c54.js'));
  }
  if (key === 'f056f90dfe92c955b7a60b2e09990e3143330d3432076f6d65517cd5e97baeca') {
    pending.push(import('./chunks/chunk-9f51fd162afe5fdd224e257634a39514d76998675b70eb97c49bf5da49dcb514.js'));
  }
  return Promise.all(pending);
}

window.Vaadin = window.Vaadin || {};
window.Vaadin.Flow = window.Vaadin.Flow || {};
window.Vaadin.Flow.loadOnDemand = loadOnDemand;
window.Vaadin.Flow.resetFocus = () => {
 let ae=document.activeElement;
 while(ae&&ae.shadowRoot) ae = ae.shadowRoot.activeElement;
 return !ae || ae.blur() || ae.focus() || true;
}