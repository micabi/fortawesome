import $ from 'jquery';
import {config, dom, library} from '@fortawesome/fontawesome-svg-core';
import {faAngry} from '@fortawesome/free-regular-svg-icons';
import {faDog, faCat, faHashtag} from '@fortawesome/free-solid-svg-icons';

config.searchPseudoElements = true;
config.showMissingIcons = true;
library.add(faAngry, faCat, faDog, faHashtag);
dom.watch();
// dom.i2svg();

$(document).ready(() => {
  console.log("jQuery loaded");
});

