define(function (require) {
  require('main');
  require('google_webapp_interface');
  require('standard_notice');
  require('create_element');
  require('markdowntohtml');
  require('eggaction');
  
  document.addEventListener('DOMContentLoaded', app.init());
});
