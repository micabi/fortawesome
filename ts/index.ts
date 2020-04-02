import $ from 'jquery';
import {config, dom, library} from '@fortawesome/fontawesome-svg-core';
import {faAngry} from '@fortawesome/free-regular-svg-icons';
import {faDog, faCat} from '@fortawesome/free-solid-svg-icons';

config.showMissingIcons = true;
library.add(faAngry, faCat, faDog);
dom.watch();
// dom.i2svg();

$(document).ready(() => {
  console.log("jQuery loaded");
});

