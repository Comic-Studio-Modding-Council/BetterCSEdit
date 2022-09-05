// ==UserScript==
// @name         BetterCSEdit
// @namespace    BCSE
// @version      1.2.1
// @description  A better editing for Comic Studio!
// @author       bang1338
// @match        *://*.comic.studio
// @icon         https://www.google.com/s2/favicons?sz=64&domain=comic.studio
// @grant        none
// ==/UserScript==

// ==Changelog==
// 0.1   - First script, which you have to open the script to change max size.
// 0.11  - Now work on: [studios].comic.studio
// 0.2   - Added textbox, for both resize and rotation.
// 1.0   - Added slider, so you don't have to :) biggest update ever
// 1.1   - Change (max) and (min) to + and - for 100% zoom
// 1.2   - Removed maxlength = '3' because it's doesn't working anymore
// 1.2.1 - Shorten "Rotate" and "Resize" words to "Ro" and "Re" so it will fit some font
// ==Changelog==

// This is Open Source.

(function()
{
    'use strict';

    let resmin = document.createElement('input')
    resmin.type = 'text'
    resmin.placeholder='Re-'
    document.getElementById('controls').prepend(resmin)
    resmin.oninput = function()
    {
    document.getElementById('resize').min = this.value;
    }

    let resmax = document.createElement('input')
    resmax.type = 'text'
    resmax.placeholder='Re+'
    document.getElementById('controls').prepend(resmax)
    resmax.oninput = function()
    {
    document.getElementById('resize').max = this.value;
    }

    let rotmin = document.createElement('input')
    rotmin.type = 'text'
    rotmin.placeholder='Ro-'
    document.getElementById('controls').appendChild(rotmin)
    rotmin.oninput = function()
    {
    document.getElementById('rotate').min = this.value;
    }

    let rotmax = document.createElement('input')
    rotmax.type = 'text'
    rotmax.placeholder='Ro+'
    document.getElementById('controls').appendChild(rotmax)
    rotmax.oninput = function()
    {
    document.getElementById('rotate').max = this.value;
    }
})();
