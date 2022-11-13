// ==UserScript==
// @name         BetterCSEdit
// @namespace    BCSE
// @version      1.5
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
// 1.4.1 - Fixed bug.
// 1.5   - Fixed a lot of "fatal bug", added Custom Name Role (clientside). This make my brain died a lot.
// ==Changelog==

// This is Open Source.
(function()
{
    'use strict';


    // =======[EDIT-ABLE]=======
    // 1 = Enable | 0 = Disable


    // =====[Common Setting]=====
    // renro: Resize and Rotate
    // tgtb: Title length bypass (clientside)
    // darkmode: Dark mode.
    // customwelcome: Custom Welcome
    let renro = 1;
    let tgtb = 1;
    let darkmode = 1;
    let customwelcome = 1;
    let namerole = 1;
    // =====[/Common Setting]=====


    // =====[Custom Welcome]=====
    // fw: First word | lw: Last word
    // inclnm: Include name | entstr: Entire string
    let inclnm = 0;
    let fw = "Hello ";
    let lw = ", welcome to Comic Studio!";
    let entstr = "Welcome to Comic Studio!"
    // Note: DO NOT PUT "
    // Note: If inclnm is 0, use entstr
    // =====[/Custom Welcome]=====


    // =====[Custom Name Role]=====
    // n4r  = Your name for role. (Required if nonlnr enabled)
    // 0    = Normal
    // 1    = Beta tester
    // 2    = Moderator
    // 3    = Administrator
    // 4    = syrupyy/Owner
    // >=5  = Normal
    let nonlnr = 1;
    let n4r = "Bang1338";
    let nr = 4;
    // =====[/Custom Name Role]=====


    // =====[Refresh speed ]=====
    // rfs = Refresh speed | 500 is recommend.
    let rfs = 500;
    // =====[/Refresh speed]=====



    // =======[/EDIT-ABLE]=======




    // =======[DONT EDIT]=======
    // or edit if you know what are you doing


    // To remove the fatal flaw, I have to adding URL change function and make sure that it's not studio.
    // get URL
    let url = location.href;
    // get URL function
    // https://stackoverflow.com/questions/34999976/detect-changes-on-the-url
    setInterval(function()
    {
        if (url != location.href)
        {
            // page has changed, set new page as 'current'
            url = location.href;
        }
    }, rfs);


    // check if it subdomain
    var isSubdomain = function(url)
    {
    var result;
    url = url.replace("https://","");
    url = url.replace("comic.studio/","");
    //alert(url);
    if (url.includes(".")) result = true;
    else result = false;

    return(result);
    }


    // check if studio not a subdomain
    var nosubst = function(url)
    {
        var result;
        var r = /\d+/; // regex

        if (url.includes("/s/") && url.match(r) > 0) result = true; // If url include "/s/" and number, set it true.
        else result = false;

        return(result);
    }


    // check if url is user profile.
    var usernameurl = function(url)
    {
        var result;

        if (url.includes("/u/")) result = true;
        else result = false;

        return(result);
    }

    var getusername = function(url)
    {
        var result;
        if (url.includes("/u/"))
        {
            result = url.replace('https://comic.studio/u/','');
        }
        return(result);
    }


    // Resize and Rotate input function
    if (Boolean(renro) == true && isSubdomain(url) == true || nosubst(url) == true)
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
    if (Boolean(tgtb) == true && isSubdomain(url) == true)
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


    // Dark mode function
    if ( (Boolean(darkmode) == true) && isSubdomain(url) == false)
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
            document.documentElement.style.setProperty('--bs-body-color', '#ffffff');
            if (url == 'https://comic.studio/') document.getElementsByClassName("w-100")[0].src = "https://cdn.discordapp.com/attachments/954077931360124939/1028601397337399376/icon_black.png" // Adding edited icon so you can see it.
            document.body.style.color='#ffffff';
        }, rfs);
    }


    // For CWF
    var rescw1 = "";
    var rescw2 = "";
    var blankcw = "";

    setInterval(function()
    {

    // Custom Welcome function
    if ( Boolean(customwelcome) == true && url == 'https://comic.studio/' || url == 'https://comic.studio/?show=all')
    {
        var wm = document.getElementsByClassName('display-5 fw-bold lh-1 mb-3')[0];
        var text = wm.textContent;
        var preno = text.replace('Welcome, ','');
        var nameonl = preno.replace('!','');

        if ( Boolean(inclnm) == true)
        {
            if (rescw1 == wm.textContent) rescw1 = wm.textContent; // Took me half of day to figure out
            else rescw1 = blankcw.concat(fw, nameonl, lw);
            wm.innerHTML = rescw1;
        }
        else
        {
            if (rescw2 == wm.textContent) rescw2 = wm.textContent; // Took me half of day to figure out
            else rescw2 = entstr;
            wm.innerHTML = rescw2;
        }
    }


    // Custom Name Role function
    if ( Boolean(namerole) && usernameurl(url))
    {
        var blanknr="";
        var levelnr="";
        if ( Boolean(nonlnr) && n4r == null || n4r == "")
        {
            alert("Custom Name Role failed: You did not entered username in n4r value.\nRefresh page if you entered it.\n(Why this look like DRM :v)\nidk how to exit loop, close the page.")
        }
        if ( Boolean(nonlnr) && n4r != null || n4r != "")
        {
            levelnr = blanknr.concat("display-6 fw-bold level-", nr);
            if (nr>0 && getusername(url)==n4r) document.getElementById("username").className = levelnr;
        }
        else
        {
            levelnr = blanknr.concat("display-6 fw-bold level-", nr);
            if (nr>0) document.getElementById("username").className = levelnr;
        }
    }
    },rfs);


    // =======[/DONT EDIT]=======
})();
