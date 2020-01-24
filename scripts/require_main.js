define(function (require) {
  require('main');
  require('google_webapp_interface');
  require('standard_notice');
  require('create_element');
  require('markdowntohtml');
  
  document.addEventListener('DOMContentLoaded', app.init());
});
