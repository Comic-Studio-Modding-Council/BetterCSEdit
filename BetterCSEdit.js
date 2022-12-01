// ==UserScript==
// @name         BetterCSEdit
// @namespace    BCSE
// @version      2.0
// @description  A better editing for Comic Studio!
// @author       bang1338
// @match        *://*.comic.studio/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=comic.studio
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @license      MIT
// ==/UserScript==

// === Inspired from: ===
// BetterEdit   : https://github.com/HJfod/BetterEdit
// BetterDiscord: https://betterdiscord.app/
// Mega Hack Pro: https://absolllute.com/store/view_mega_hack_pro
// zBot         : https://zbot.figmentcoding.me/
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
// 2.0   - Added Custom Banner. Now you can use menu by pressing "Esc" (aka. Escape) key to open and close.
// ==Changelog==

// This is Open Source.

'use strict';

// Menu
// Special thank to Nudo for this!
// https://greasyfork.org/en/scripts/433607-menu-template-for-your-script

// In the future if i can buy a VPS with domain, I will hosting website where
// you can share your config and your setting.
let menu = {
    opacity: 1,
    position: {
        relative: `relative`,
        absolute: `absolute`,
        top: `${70}px`,
        left: `${20}px`,
        bottom: `${0}px`,
        right: `${0}px`,
    },
    size: {
        width: `${330}px`,
        height: `${400}px`,
        height_title_block: `${30}px`,
        border_body_block: `${5}px`,
        border_radius_body_block: `${7}px`,
        font_size_title_block: `${21}px`,
        font_size_inner_block: `${18}px`
    },
    colors: {
        background_title_block: `rgba(66, 66, 66, 0.61)`,
        background_body_block: `rgba(0, 0, 0, 0.25)`,
        background_inner_block: `rgba(0, 0, 0, 0.25)`,
        border_body_block: `rgba(38, 38, 38, 0.72)`,
        title_text: `#fff`,
        inner_block: `#fff`,
    },
    display: {
        block: `block`,
        flex: `flex`,
        none: `none`
    },
    align: {
        left: `left`,
        center: `center`,
        right: `right`,
        bottom: `bottom`
    }
}

menu = new Proxy(menu, {
    set(target, prop, val) {
        if (prop in target) {
            return true
            if (typeof val != 'string') {
                target[prop] = val.toString()
            } else {
                return target[prop]
            }
        } else {
            return prop
            return false
            throw new Error(`Prop: ${prop} not defined in ${target}`)
        }
    }
});



/* Create menu HTML code */

const html = `
<main class="menu--holder">
  <main class="menu--body">
    <passive id="menu--title">
      BetterCSEdit 2.0
    </passive>
    <main class="menu--inner-gui">
      <passive class="menu--inner-gui-block">
        <h5>=== EDITOR === </h5>
        <passive id="menu--inner-gui-block-text">Custom Resize/Rotate <input type="checkbox" id="renro"> </passive>
        <passive id="menu--inner-gui-block-text">TitleLengthBypass (cside >50) <input type="checkbox" id="tltb"> </passive>
        <passive id="menu--inner-gui-block-text">Custom Banner <input type="checkbox" id="cbr"> </passive>

        <h5>===== UI ===== </h5>
        <passive id="menu--inner-gui-block-text">Darkmode v2 <input type="checkbox" id="darkmode"> </passive>
        <passive id="menu--inner-gui-block-text">Custom Welcome Message <input type="checkbox" id="cwm"> </passive>
        <passive id="menu--inner-gui-block-text">Custom Namerole (cside) <input type="checkbox" id="cnr"> </passive>

        <h5>=== INPUTS === </h5>
        <passive id="menu--inner-gui-block-text"> Welcome Message Mode: </passive>

        <passive id="menu--inner-gui-block-text"> <input type="radio" name="cwmess" value="entire" id="cwm-ent"> Entire </passive>
        <passive id="menu--inner-gui-block-text"> <input type="radio" name="cwmess" value="first,last" id="cwm-fl"> first [name] last </passive>

        <passive id="menu--inner-gui-block-text"> Welcome Message (first,last): <input type="text" id="cwm-first" name="cwm"> <input type="text" id="cwm-last" name="cwm"></passive>
        <passive id="menu--inner-gui-block-text"> Welcome Message (entire): <input type="text" id="cwm-txt" name="cwm"> </passive>

        <passive id="menu--inner-gui-block-text"> Banner: <input type="text" id="cbr-url" name="cbr"> </passive>
        <passive id="menu--inner-gui-block-text"> Refresh speed: <input type="text" id="rfsp" name="rfsp"> </passive>
        <passive id="menu--inner-gui-block-text"> Name for custom role: <input type="text" id="nrname" name="rfsp"> </passive>
        <passive id="menu--inner-gui-block-text"> Role: </passive>
        <passive id="menu--inner-gui-block-text"> <input type="radio" name="roletype" value="normal" id="role-normal"> Normal </passive>
        <passive id="menu--inner-gui-block-text"> <input type="radio" name="roletype" value="betatester" id="role-bt"> Beta Tester </passive>
        <passive id="menu--inner-gui-block-text"> <input type="radio" name="roletype" value="mod" id="role-mod"> Mod </passive>
        <passive id="menu--inner-gui-block-text"> <input type="radio" name="roletype" value="admin" id="role-admin"> Admin </passive>
        <passive id="menu--inner-gui-block-text"> <input type="radio" name="roletype" value="owner" id="role-syrupyy"> syrupyy/Owner </passive>
        <passive id="menu--inner-gui-block-text"> To apply the change, </passive>
        <passive id="menu--inner-gui-block-text"> press save + reload</passive>
        <h8>Code by Bang1338#5701</h8>
        <script>

        // Help me i'm being Yandere again ;-;
        function save() {
	    var checkbox1 = document.getElementById("renro");
        var checkbox2 = document.getElementById("tltb");
        var checkbox3 = document.getElementById("darkmode");
        var checkbox4 = document.getElementById("cwm");
        var checkbox5 = document.getElementById("cnr");
        var checkbox6 = document.getElementById("cbr");
        const txt1 = document.getElementById("cwm-txt").value;
        const txt1f = document.getElementById("cwm-first").value;
        const txt1l = document.getElementById("cwm-last").value;
        const txt2 = document.getElementById("cbr-url").value;
        const txt3 = document.getElementById("rfsp").value;
        const txt4 = document.getElementById("nrname").value;
        var radio1 = document.getElementById("role-normal");
        var radio2 = document.getElementById("role-bt");
        var radio3 = document.getElementById("role-mod");
        var radio4 = document.getElementById("role-admin");
        var radio5 = document.getElementById("role-syrupyy");
        var radio6 = document.getElementById("cwm-ent");
        var radio7 = document.getElementById("cwm-fl");


        localStorage.setItem("renro", checkbox1.checked);
        localStorage.setItem("tltb", checkbox2.checked);
        localStorage.setItem("darkmode", checkbox3.checked);
        localStorage.setItem("cwm", checkbox4.checked);
        localStorage.setItem("cnr", checkbox5.checked);
        localStorage.setItem("cbr", checkbox6.checked);
        localStorage.setItem("cwm-txt", txt1)
        localStorage.setItem("cwm-first", txt1f)
        localStorage.setItem("cwm-last", txt1l)
        localStorage.setItem("cbr-url", txt2)
        localStorage.setItem("rfsp", txt3)
        localStorage.setItem("nrname", txt4)
        localStorage.setItem("role-normal", radio1.checked);
        localStorage.setItem("role-bt", radio2.checked);
        localStorage.setItem("role-mod", radio3.checked);
        localStorage.setItem("role-admin", radio4.checked);
        localStorage.setItem("role-syrupyy", radio5.checked);
        localStorage.setItem("cwm-ent", radio6.checked);
        localStorage.setItem("cwm-fl", radio7.checked);
        }


        var checked1 = JSON.parse(localStorage.getItem("renro"));
        var checked2 = JSON.parse(localStorage.getItem("tltb"));
        var checked3 = JSON.parse(localStorage.getItem("darkmode"));
        var checked4 = JSON.parse(localStorage.getItem("cwm"));
        var checked5 = JSON.parse(localStorage.getItem("cnr"));
        var checked6 = JSON.parse(localStorage.getItem("cbr"));
        document.getElementById("renro").checked = checked1;
        document.getElementById("tltb").checked = checked2;
        document.getElementById("darkmode").checked = checked3;
        document.getElementById("cwm").checked = checked4;
        document.getElementById("cnr").checked = checked5;
        document.getElementById("cbr").checked = checked6;

        if (localStorage.getItem("cwm-txt") != null) document.getElementById("cwm-txt").value = localStorage.getItem("cwm-txt")
        if (localStorage.getItem("cwm-first") != null) document.getElementById("cwm-first").value = localStorage.getItem("cwm-first")
        if (localStorage.getItem("cwm-last") != null) document.getElementById("cwm-last").value = localStorage.getItem("cwm-last")
        if (localStorage.getItem("nrname") != null) document.getElementById("nrname").value = localStorage.getItem("nrname")

        if (localStorage.getItem("rfsp") != null) document.getElementById("rfsp").value = localStorage.getItem("rfsp")
        else document.getElementById("rfsp").value = "1000"
        if (localStorage.getItem("cbr-url") != null) document.getElementById("cbr-url").value = localStorage.getItem("cbr-url")
        else document.getElementById("cbr-url").value = "https://media.discordapp.net/attachments/954077931360124939/1047811089557102614/banner_BetterCSEdit_2.0.png"

        var rard1 = JSON.parse(localStorage.getItem("role-normal"));
        var rard2 = JSON.parse(localStorage.getItem("role-bt"));
        var rard3 = JSON.parse(localStorage.getItem("role-mod"));
        var rard4 = JSON.parse(localStorage.getItem("role-admin"));
        var rard5 = JSON.parse(localStorage.getItem("role-syrupyy"));
        var rard6 = JSON.parse(localStorage.getItem("cwm-ent"));
        var rard7 = JSON.parse(localStorage.getItem("cwm-fl"));
        document.getElementById("role-normal").checked = rard1;
        document.getElementById("role-bt").checked = rard2;
        document.getElementById("role-mod").checked = rard3;
        document.getElementById("role-admin").checked = rard4;
        document.getElementById("role-syrupyy").checked = rard5;
        document.getElementById("cwm-ent").checked = rard6;
        document.getElementById("cwm-fl").checked = rard7;

        </script>
        <passive id="menu--inner-gui-block-text"> <button onclick="save()">Save</button> <button onclick="window.location.reload()">Reload</button> </passive>
        </passive>
      </passive>
    </main>
  </main>
</main>
`
var rolenum;
if (JSON.parse(localStorage.getItem("role-normal"))) rolenum = 0;
else if (JSON.parse(localStorage.getItem("role-bt"))) rolenum = 1;
else if (JSON.parse(localStorage.getItem("role-mod"))) rolenum = 2;
else if (JSON.parse(localStorage.getItem("role-admin"))) rolenum = 3;
else if (JSON.parse(localStorage.getItem("role-syrupyy"))) rolenum = 4;

/* Create menu CSS code */

let css = `
<style>

/* Style for holder menu. */
main.menu--holder {
position: ${menu.position.absolute};
top: ${menu.position.top};
left: ${menu.position.left};
width: ${menu.size.width};
height: ${menu.size.height};
display: ${menu.display.none};
}

/* Style for body menu. */
main.menu--body {
width: 100% !important;
height: 100% !important;
background: ${menu.colors.background_body_block};
border-radius: ${menu.size.border_radius_body_block};
border: ${menu.size.border_body_block} solid ${menu.colors.border_body_block};
opacity: ${menu.opacity};
}

/* Style for title menu */
passive#menu--title {
cursor: move;
position: ${menu.position.relative};
display: ${menu.display.flex};
width: 92.6% !important;
background: ${menu.colors.background_title_block};
color: ${menu.colors.title_text};
align-content: ${menu.align.center};
justify-content: ${menu.align.center};
font-size: ${menu.size.font_size_title_block};
text-align: ${menu.align.center};
height: ${menu.size.height_title_block};
box-shadow: 0px 0px 4px #1a1a1a;
flex-wrap: wrap;
margin-left: 12px;
margin-top: 5px;
}

/* Style for inner menu gui */
main.menu--inner-gui {
margin: 0px 2px;
display: ${menu.display.flex};
}

/* Style for inner menu gui block */
passive.menu--inner-gui-block {
width: 290px;
vertical-align: top;
height: 330px;
margin: 0px 10px 10px 10px;
background: rgba(66, 66, 66, 0.61);
box-shadow: 0px 0px 4px #1a1a1a;
border-radius: 3px;
overflow-x: hidden;
overflow-y: auto;
color: #fff;
padding: 10px;
margin-top: 10px;
}

/* Style for text in inner menu */
passive#menu--inner-gui-block-text {
color: ${menu.colors.inner_block};
font-size: ${menu.size.font_size_inner_block};
display: ${menu.display.block};
}

input[type="checkbox"] {
vertical-align: middle;
user-select: none;
box-sizing: border-box;
cursor: pointer;
}
</style>
`


/* Create menu JS code */

let js = `
<script>

// If you click outside of the menu location
$(document).mouseup(function (e) {
    let container = $(".menu--holder")
    if (container.has(e.target).length === 0 && container.css('display') == 'block'){
        container.css('opacity', '0.35')
    } else {
        container.css('opacity', '1')
    }
})

// Drag element
dragElement(document.querySelector((".menu--holder")))
function dragElement(elmnt) {
    let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0
    if (document.getElementById("menu--title")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById("menu--title").onmousedown = dragMouseDown
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown
    }

    function dragMouseDown(e) {
        e = e || window.event
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
    }

    function elementDrag(e) {
        e = e || window.event
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px"
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null
        document.onmousemove = null
    }
}
</script>
`

/* Add menu in body */
$('body').append(html, css, js)

/* Add toggler for menu */
let openMenu = true
document.addEventListener("keydown", function(event) {
    if (event.code == "Escape") {
        if (openMenu) {
            openMenu = false
            $('.menu--holder').css('display', menu.display.block)
        } else {
            openMenu = true
            $('.menu--holder').css('display', menu.display.none)
        }
    }
})

    let renro = JSON.parse(localStorage.getItem("renro"));
    let tgtb = JSON.parse(localStorage.getItem("tltb"));
    let darkmode = JSON.parse(localStorage.getItem("darkmode"));
    let customwelcome = JSON.parse(localStorage.getItem("cwm"));
    let namerole = JSON.parse(localStorage.getItem("cnr"));
    let custombanner = JSON.parse(localStorage.getItem("cbr"));

    // =====[Custom Welcome Message]=====
    let inclnm = JSON.parse(localStorage.getItem("cwm-fl"));
    let fw = localStorage.getItem("cwm-first");
    let lw = localStorage.getItem("cwm-last");
    let entstr = localStorage.getItem("cwm-txt");


    // =====[Custom Name Role]=====
    // 0    = Normal
    // 1    = Beta tester
    // 2    = Moderator
    // 3    = Administrator
    // 4    = syrupyy/Owner
    let nonlnr = 1;
    let n4r = localStorage.getItem("nrname");
    let nr = rolenum;
    // =====[/Custom Name Role]=====


    // =====[Refresh speed ]=====
    let rfs = localStorage.getItem("rfsp")
    // =====[/Refresh speed]=====


    // =====[Custom Banner]=====
    // urlb: URL of banner
    let urlb = localStorage.getItem("cbr-url");

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


    // URL data warper.
    var urltype = function(url)
    {
        var blk="";
        var result;
        var result1;
        var result2;
        var result3;
        var result4;
        var result5;
        var tmpurl = url;

        // check if it subdomain
        tmpurl = tmpurl.replace("https://","");
        tmpurl = tmpurl.replace("comic.studio/","");
        if (tmpurl.includes(".")) result1 = "sd-1";
        else result1 = "sd-0"

        // check if studio not a subdomain
        tmpurl = url;
        var r = /\d+/; // regex
        if (tmpurl.includes("/s/") && tmpurl.match(r) > 0) result2 = "csnsd-1";
        else result2 = "csnsd-0";

        // check if url is user profile.
        tmpurl = url;
        if (tmpurl.includes("/u/")) result3 = "user-1";
        else result3 = "user-0";

        // check if url is studio
        tmpurl = url;
        if (tmpurl.includes("/manage") && tmpurl.match(r) > 0) result4 = "studio-1";
        else result4 = "studio-0";

        // get username.
        tmpurl = url;
        if (tmpurl.includes("/u/"))
        {
            result5 = tmpurl.replace('https://comic.studio/u/','');
        }
        else result5 = "noname";

        // result.
        result = blk.concat(result1,"|",result2,"|",result3,"|",result4,"|",result5)
        return (result);
    }

    // Resize and Rotate input function
    if (Boolean(renro) == true && urltype(url).includes("sd-1")|| urltype(url).includes("csnsd-1"))
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

    // Custom Banner
    // It's also work with other banner like Shopee thing: http://shopeeplus.com//upload/images/cach-tao-banner-xoay-vong.png
    // Note 1: not supported non-subdomain studio
    // I'm afraid if someone put nsfw banner, so...
    // Note 2: I will include nsfw detector library soon.
    if ( Boolean(custombanner) == true && urltype(url).includes("sd-1")|| urltype(url).includes("csnsd-1")) document.getElementsByClassName("banner")[0].src = urlb;


    // Title bypass (clentside) function
    if (Boolean(tgtb) == true && urltype(url).includes("sd-1"))
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
    setInterval(function()
    {
    if ( (Boolean(darkmode)) && urltype(url).includes("sd-0") && urltype(url).includes("studio-0"))
    {
            // darkmode main.
            // Font will turn into white to read in dark.
            // Also studio editing will be disable.

            $('#container').attr('style','background: #000')
            $('.card').attr('style','background-color: #000')
            $('.comics-box').attr('style','background-color: #000')
            $('.notification-inner a').attr('style','color: #6c757d')
            $('.table').attr('style','color: #fff')
            $('.text-body').attr('style','color: rgba(var(--bs-white),var(--bs-text-opacity)) !important') // when i write this, this will turn to white. but now i forgor
            $('.text-black').attr('style','color: rgba(var(--bs-white),var(--bs-text-opacity)) !important')
            document.documentElement.style.setProperty('--bs-body-color', '#ffffff');
            if (url == 'https://comic.studio/') document.getElementsByClassName("w-100")[0].src = "https://cdn.discordapp.com/attachments/954077931360124939/1028601397337399376/icon_black.png" // Adding edited icon so you can see it.
            document.body.style.color='#ffffff';
    }
    if ( (Boolean(darkmode) == false) && urltype(url).includes("sd-0") && urltype(url).includes("studio-0"))
    {
        $('#container').attr('style','background: #fff')
        $('.card').attr('style','background-color: #fff')
        $('.comics-box').attr('style','background-color: #fff')
        $('.notification-inner a').attr('style','color: #000000')
        $('.table').attr('style','color: #000')
        $('.text-body').attr('style','color: rgba(var(--bs-black),var(--bs-text-opacity)) !important')
        $('.text-black').attr('style','color: rgba(var(--bs-black),var(--bs-text-opacity)) !important')
        document.documentElement.style.setProperty('--bs-body-color', '#000000');
        if (url == 'https://comic.studio/') document.getElementsByClassName("w-100")[0].src = "https://cdn.comic.studio/assets/img/icon_black.png" // Original
        document.body.style.color='#000000';
    }
    }, rfs);


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
    if ( Boolean(namerole) && urltype(url).includes("user-1"))
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
            if (nr>0 && urltype(url).includes(n4r)) document.getElementById("username").className = levelnr;
        }
        else
        {
            levelnr = blanknr.concat("display-6 fw-bold level-", nr);
            if (nr>0) document.getElementById("username").className = levelnr;
        }
    }
    },rfs);
