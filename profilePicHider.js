// ==UserScript==
// @name          Hide Social Media Profile Pictures
// @namespace     http://tampermonkey.net/
// @version       1.2.2
// @description   Hide all social media profile pictures until I can figure out a way to hide just the ones with face masks
// @author        Rob Seaver <rob.seaver@gmail.com>
// @updateURL     https://raw.githubusercontent.com/rbseaver/tampermonkey-scripts/master/profilePicHider.js
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
  // Selectors for old layout
  'img._s0._4ooo._5xib._5sq7._44ma._rw.img',
  'img._3me-._3mf1.img',
  'img._62bh.img _8o._8r._2qgu.img',
  // Selectors for new layout
  'div.oi9244e8.do00u71z.j83agx80',
  'div.nqmvxvec.s45kfl79.emlxlaya.bkmhp75w.spb7xbtv.a8c37x1j.fv0vnmcu.rs0gx3tq.l9j0dhe7',
  'div.nqmvxvec.j83agx80.cbu4d94t.tvfksri0.qjjbsfad.w0hvl6rk.l9j0dhe7',
  'svg.pzggbiyp'
];

const selectors = [
  ...instagramSelectors,
  ...twitterSelectors,
  ...facebookSelectors
];

const events = [
  'DOMContentLoaded',
  'load',
  'mouseenter',
  'scroll'
];

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

((selectors) => {
  events.forEach((e) => {
    document.addEventListener(e, () => {
      hideProfilePictures(selectors);
    });
  });
})(selectors.join(','));
