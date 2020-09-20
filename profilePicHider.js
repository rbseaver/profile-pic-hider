// ==UserScript==
// @name          Hide Social Media Profile Pictures
// @namespace     http://tampermonkey.net/
// @version       1.0.1
// @description   Hide all social media profile pictures until I can figure out a way to hide just the ones with face masks
// @author        Rob Seaver <rob.seaver@gmail.com>
// @include       https://www.facebook.com/*
// @include       https://www.instagram.com/*
// @include       https://twitter.com/*
// @grant         none
// ==/UserScript==

const instagramSelectors = ['img._6q-tv'];
const twitterSelectors = [
  '.css-1dbjc4n.r-18kxxzh.r-1wbh5a2.r-13qz1uu',
  '.css-1dbjc4n.r-sdzlij.r-1p0dtai.r-1mlwlqe.r-1d2f490.r-1udh08x.r-u8s1d.r-zchlnj.r-ipm5af.r-417010'
];
const facebookSelectors = [
  'img._s0._4ooo._5xib._5sq7._44ma._rw.img',
  'img._3me-._3mf1.img',
  'img._62bh.img _8o._8r._2qgu.img',
  'div._ohe.lfloat'
];

const selectors = [
  [...instagramSelectors],
  [...twitterSelectors],
  [...facebookSelectors]
];

// I don't like this as a catch-all. A better Javascript
// developer should be able to think about this differently
const events = [
  'load',
  'loading',
  'readystatechange',
  'scroll',
  'mouseenter',
  'DOMContentLoaded'
];

((selectors) => {
  events.forEach((e) => {
    document.addEventListener(e, () => {
      hideProfilePictures(selectors);
    });
  });
})(selectors.join(','));

const hideProfilePictures = (selectors) => {
  const elements = document.querySelectorAll(selectors);
  if (elements.length === 0) {
    return;
  }
  try {
    elements.forEach((e) => {
      e.remove();
    });
  } catch (error) {
    hideProfilePictures(selectors);
  }
};
