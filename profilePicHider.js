// ==UserScript==
// @name          Hide Social Media Profile Pictures
// @namespace     http://tampermonkey.net/
// @version       1.0.0
// @description   Hide all social media profile pictures until I can figure out a way to hide just the ones with face masks
// @author        Rob Seaver <rob.seaver@gmail.com>
// @include       https://www.facebook.com/*
// @include       https://www.instagram.com/*
// @include       https://www.twitter.com/*
// @grant         none
// ==/UserScript==

const selectors = [
  'img._s0._4ooo._5xib._5sq7._44ma._rw.img',
  'img._3me-._3mf1.img',
  'div.css-1dbjc4n.r-18kxxzh.r-1wbh5a2.r-13qz1uu',
  'img._6q-tv',
  'div.css-1dbjc4n.r-sdzlij.r-1p0dtai.r-1mlwlqe.r-1d2f490.r-1udh08x.r-u8s1d.r-zchlnj.r-ipm5af.r-417010'
];

((selectors) => {
  ['readystatechange', 'scroll'].forEach((state) => {
    document.addEventListener(state, () => {
      hideProfilePictures(selectors);
    });
  });
})(selectors.join(','));

const hideProfilePictures = (selectors) => {
  const profilePics = document.querySelectorAll(selectors);
  if (!!profilePics.length) {
    try {
      profilePics.forEach((pic) => {
        pic.remove();
      });
      console.info(`Hid ${profilePics.length} profile pictures`);
    } catch (error) {
      console.warn('Error hiding pictures', error);
      hideProfilePictures(selectors);
    }
  }
};
