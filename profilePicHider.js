// ==UserScript==
// @name          Hide Social Media Profile Pictures
// @namespace     http://tampermonkey.net/
// @version       1.0.3
// @description   Hide all social media profile pictures until I can figure out a way to hide just the ones with face masks
// @author        Rob Seaver <rob.seaver@gmail.com>
// @include       https://www.facebook.com/*
// @include       https://www.instagram.com/*
// @include       https://twitter.com/*
// @grant         none
// ==/UserScript==

// These can be improved, I'm certain.
const instagramSelectors = ['img._6q-tv'];
const twitterSelectors = [
  'div.css-1dbjc4n.r-18kxxzh.r-1wbh5a2.r-13qz1uu',
  'div.css-1dbjc4n.r-sdzlij.r-1p0dtai.r-1mlwlqe.r-1d2f490.r-1udh08x.r-u8s1d.r-zchlnj.r-ipm5af.r-417010',
  'div.css-1dbjc4n.r-1mlwlqe.r-z80fyv.r-1udh08x.r-19wmn03.r-417010',
  'div.css-1dbjc4n.r-19z6qd4.r-sdzlij.r-rs99b7.r-1p0dtai.r-1mi75qu.r-1d2f490.r-1ny4l3l.r-u8s1d.r-zchlnj.r-ipm5af'
];
const facebookSelectors = [
  'img._rw.img',
  'img._3me-',
  'img._6tb5.img',
  'img._5bow.img',
  'img._62bh.img'
];

const selectors = [...instagramSelectors, ...twitterSelectors, ...facebookSelectors];

// I don't like this as a catch-all. A better Javascript
// developer should be able to think about this differently
const events = [
  'load',
  'loading',
  'readystatechange',
  'scroll',
  'mouseover',
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
