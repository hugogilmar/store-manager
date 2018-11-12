import Vue from 'vue';
import numeral from 'numeral';

Vue.filter('percentage', function (value) {
  var percentage = value / 100;

  return numeral(percentage).format('0.00 %')
});
