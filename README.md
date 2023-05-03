<h1 align="center">
BetterCSEdit
</h1>

<p align="center"> 
  <kbd>
<img src="https://media.discordapp.net/attachments/945841557226020888/1047813173379600415/bettercsedit_2.0.png">
  </kbd>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/language-js-yellow">
  <img src="https://img.shields.io/github/languages/top/Bang1338/BetterCSEdit">
  <img src="https://img.shields.io/badge/version-2.0-yellow">
</p>

<h3 align="center">
A better editing for Comic Studio!
</h3>

## Features:
- [X] Change size
- [X] Change rotation degree
- [X] Dark mode (in the future, ~~it will be removed~~ it will be "Completely Dark Mode (CDM)". because of [this](https://comic.studio/c/girivgudov))
- [X] Custom welcome message
- [X] Custom name role effect
- [X] Custom Banner
- [X] MENU! (press Esc for menu)

## Todo/Goal:
- [X] Dark mode
- [X] Enable/Disable
- [X] Title length bypass (clentside)
- [X] Custom banner
- [ ] View full image (possible with cookies.run and/or comicstud.io) - **Need testing, avilable in Beta**
- [ ] Work on cookiecomiccreator.co
- [ ] (almost) Full mobile support.
- [ ] ~~Opacity~~ (failed, serverside.)
- [ ] ~~Custom Watermark~~ (failed)
- [ ] ~~Custom JS~~ (failed)

## Installation (manual way)
* 1 - Get [Tampermonkey](https://www.tampermonkey.net)
* 2 - Go to Dashboard, press the plus sign
* 3 - [Copy entire script](https://raw.githubusercontent.com/Bang1338/BetterCSEdit/main/BetterCSEdit.js), and paste it
* 4 - Save.

### But then I had very good idea, I used Greasy Fork. See, using Greasy Fork gave me a whole new perspective and I was able to install script without manual step above
* [Install](https://greasyfork.org/vi/scripts/451702-bettercsedit)
* But you will need [Tampermonkey](https://www.tampermonkey.net)

## Preview:
<p align="center">
Before:
    <img class="center" src="https://cdn.discordapp.com/attachments/779629784509579288/1005480655590805614/no_bcse.png" alt="Normal Cookie Run Comic Studio"/>
</p>

<p align="center">
After:
    <img class="center" src="https://cdn.discordapp.com/attachments/779629784509579288/1005480072507043881/bcse_in_ccs.png" alt="BetterCSEdit in Cookie Run Comic Studio"/>
</p>

#### Not only that, it's work on other comic studios too!
<p align="center">
    <img class="center" src= "https://cdn.discordapp.com/attachments/779629784509579288/1005727964383678464/bcse_other_comic.png" alt="BetterCSEdit in Cuphead Comic Studio"/>
</p>

## Menu? Menu.
- Press Esc key for menu!
<p align="center">
    <img class="center" src= "https://media.discordapp.net/attachments/954077931360124939/1047814345519804477/image.png" alt="BetterCSEdit menu!"/>
</p>

- I wanted to make it paid client, but no. Once it's open source, **you can't make it paid**


## Beta/Devmode:
* Use this script for Beta, this script will change whenever I do something:
```js
// ==UserScript==
// @name         BCSE Beta!
// @namespace    mynamespace
// @version      2.0b
// @description  A better editing for Comic Studio!
// @match        *://*.comic.studio/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=comic.studio
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
  'use strict';

// Load jQuery if it's not already loaded
    if (typeof jQuery === 'undefined') {
        var script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        script.onload = loadScript;
        document.head.appendChild(script);
    } else {
        loadScript();
    }

    function loadScript() {
        // Load the script from my server
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://bettercsedit-onlinescriptbeta.1338bang.repl.co/bcsebeta',
            onload: function(response) {
                // Inject the script into the page
                var script = document.createElement('script');
                script.textContent = response.responseText;
                document.head.appendChild(script);
            }
        });
    }

})();
```

## Changelog:
* 0.1   - First script, which you have to open the script to change max size.
* 0.11  - Now work on: [studios].comic.studio
* 0.2   - Added textbox, for both resize and rotation.
* 1.0   - Added slider, so you don't have to :) biggest update ever
* 1.1   - Change (max) and (min) to + and - for 100% zoom
* 1.2   - Removed ```maxlength = '3'``` because it's doesn't working anymore
* 1.2.1 - Shorten "Rotate" and "Resize" words to "Ro" and "Re" so it will fit some font
* 1.3.1 - Added title bypass for clentside and Added Enable/Disable option, powered by boolean :)
* 1.4   - Added Dark Mode and Custom Welcome.
* 1.4.1 - Fixed bug.
* 1.5   - Fixed a lot of "fatal bug", added Custom Name Role (clientside). This make my brain died a lot.
* 2.0   - Added Custom Banner. Now you can use menu by pressing "Esc" (aka. Escape) key to open and close.

## We need your help!
* I'm currently lack of JS skill, so if you want you can fork this or DM me: Bang1338#5701 to fill god damn hole in my brain(cell). I love to see your support! Skilled JS coder deserve the love! :heart:

## Special thank:
[tungdo0602](https://github.com/tungdo0602) - Optimizing code

## Small credit:
- syrupyy (for Comic Studio)
- keny (for Cuphead Comic Studio)

## Bonus:
I lost my phone ;-;


## You can use my code, but remember:
<p align="center">
    <img src="https://media.discordapp.net/attachments/954077931360124939/1018386384345649172/i_did.png">
</p>
