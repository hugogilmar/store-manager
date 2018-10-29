import Vue from 'vue';
import numeral from 'numeral';

Vue.filter('number', function (value) {
  return numeral(value).format('0,0.00');
});
