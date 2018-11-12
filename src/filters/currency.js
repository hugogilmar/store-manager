import Vue from 'vue';
import numeral from 'numeral';

Vue.filter('currency', function (value) {
  return numeral(value).format('$ 0,0.00')
});
