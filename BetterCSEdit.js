// ==UserScript==
// @name         BetterCSEdit
// @namespace    BCSE
// @version      1.4
// @description  A better editing for Comic Studio!
// @author       bang1338
// @match        *://*.comic.studio/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=comic.studio
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @license      MIT
// ==/UserScript==

// === Inspired from: ===
// BetterEdit: https://github.com/HJfod/BetterEdit
// BetterDiscord: https://betterdiscord.app/
// Mega Hack Pro: https://absolllute.com/store/view_mega_hack_pro
// === End of inspr ===

// === Powered by: ===
// jQuery.
// === End powered ===

// ==Changelog==
// 0.1   - First script, which you have to open the script to change max size.
// 0.11  - Now work on: [studios].comic.studio
// 0.2   - Added textbox, for both resize and rotation.
// 1.0   - Added slider, so you don't have to :) biggest update ever
// 1.1   - Change (max) and (min) to + and - for 100% zoom
// 1.2   - Removed maxlength = '3' because it's doesn't working anymore
// 1.2.1 - Shorten "Rotate" and "Resize" words to "Ro" and "Re" so it will fit some font
// 1.3.1 - Added title bypass for clentside and Added Enable/Disable option, powered by boolean :)
// 1.4   - Added Dark Mode and Custom Welcome.
// ==Changelog==

// This is Open Source.
(function()
{

    'use strict';

    // ======= [EDIT-ABLE] =======

    // 1 = Enable | 0 = Disable
    // =====[Common Setting] =====
    // renro: Resize and Rotate
    // tgtb: Title length bypass (clientside)
    // darkmode: Dark mode.
    // customwelcome: Custom Welcome
    let renro = 1;
    let tgtb = 1;
    let darkmode = 1;
    let customwelcome = 1;
    // =====[/Common Setting] =====


    // =====[Custom Welcome] =====
    // fw: First word | lw: Last word
    // inclnm: Include name | entstr: Entire string
    let inclnm = 1;
    let fw = "Welcome back, ";
    let lw = ", enjoy your stay!";
    let entstr = "Hello there!"
    // Note: DO NOT PUT "
    // Note: If inclnm is 0, use entstr
    // =====[/Custom Welcome] =====


    // =====[Dark-mode] =====
    // rfs = Refresh speed | 500 is recommend.
    let rfs = 500;
    // =====[/Dark-mode] =====


    // ======= [/EDIT-ABLE] =======



    // ======= [DONT EDIT] =======
    // or edit if you know what are you doing


    // Custom Welcome function
    if ( Boolean(customwelcome) == true )
    {
        var rescw = "";
        var blank = "";
        var text = document.getElementsByClassName('display-5 fw-bold lh-1 mb-3')[0].textContent;
        var nameonl = text.replace('Welcome, ','');

        if ( Boolean(inclnm) == true ) rescw = blank.concat(fw, nameonl, lw);
        else rescw = entstr;

        document.getElementsByClassName('display-5 fw-bold lh-1 mb-3')[0].innerHTML = rescw;
    }


    // Dark mode function
    if ( Boolean(darkmode) == true )
    {
        // Dark mode, run.
        setInterval(function()
        {
            // darkmode main.
            // Font will turn into white to read in dark.
            $('#container').attr('style','background: #000')
            $('.card').attr('style','background-color: #000')
            $('.comics-box').attr('style','background-color: #000')
            $('.notification-inner a').attr('style','color: #6c757d')
            $('.table').attr('style','color: #fff')
            $('.text-body').attr('style','color: rgba(var(--bs-white),var(--bs-text-opacity)) !important')
            $('.text-black').attr('style','color: rgba(var(--bs-white),var(--bs-text-opacity)) !important')
            document.getElementsByClassName("w-100")[0].src = "https://cdn.discordapp.com/attachments/954077931360124939/1028601397337399376/icon_black.png" // Adding edited icon so you can see it.
            document.body.style.color='#ffffff';
        }, rfs);
    }

    // Resize and Rotate input function
    if (Boolean(renro) == true)
    {
        // Resize input (decrease)
        let resmin = document.createElement('input')
        resmin.type = 'text'
        resmin.placeholder = 'Re-'
        document.getElementById('controls').prepend(resmin)
        resmin.oninput = function()
        {
            document.getElementById('resize').min = this.value;
        }

        // Resize input (increase)
        let resmax = document.createElement('input')
        resmax.type = 'text'
        resmax.placeholder = 'Re+'
        document.getElementById('controls').prepend(resmax)
        resmax.oninput = function()
        {
            document.getElementById('resize').max = this.value;
        }

        // Rotate input (decrease)
        let rotmin = document.createElement('input')
        rotmin.type = 'text'
        rotmin.placeholder = 'Ro-'
        document.getElementById('controls').appendChild(rotmin)
        rotmin.oninput = function()
        {
            document.getElementById('rotate').min = this.value;
        }

        // Rotate input (increase)
        let rotmax = document.createElement('input')
        rotmax.type = 'text'
        rotmax.placeholder = 'Ro+'
        document.getElementById('controls').appendChild(rotmax)
        rotmax.oninput = function()
        {
            document.getElementById('rotate').max = this.value;
        }
    }


    // Title bypass (clentside) function
    if (Boolean(tgtb) == true)
    {
        let tb = document.createElement('input')
        tb.type = 'text'
        tb.placeholder = 'Title length (client if >50)'
        document.getElementsByClassName("right-buttons tab-buttons")[0].appendChild(tb)
        tb.oninput = function()
        {
            document.getElementById('title').maxLength = this.value;
        }
    }


    // ======= [/DONT EDIT] =======
})();
