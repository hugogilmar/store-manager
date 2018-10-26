"use strict";

import Vue from 'vue';
import numeral from 'numeral';

Vue.filter('percentage', function (value) {
  return numeral(value).format('0.00 %')
});
