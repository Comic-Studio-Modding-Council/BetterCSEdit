// ==UserScript==
// @name         BetterCSEdit
// @namespace    BCSE
// @version      2.1
// @description  A better editing for Comic Studio!
// @author       bang1338
// @match        *://*.comic.studio/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=comic.studio
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @require      https://jeremyckahn.github.io/keydrown/dist/keydrown.min.js
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
// keydrown
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
// 2.1   - Added background, View Full Image, Custom Namerole v2, MoreTab. Optimized stuff
// ==Changelog==

// This is Open Source.

'use strict';

// Respect.
console.log("%cWARNING!", "color: red; font-size: 50px");
console.log(`%cDO NOT PASTE ANY SCRIPT FROM SOMEONE IN HERE\nTHERE IS 1000% YOUR ACCOUNT WILL BE STOLEN.`, "font-size: 16px")
console.log(`%c                                      - bang1338, instead of syrupyy`, "font-size: 12px")

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
        top: `50%`,
        left: `50%`,
        bottom: `${0}px`,
        right: `${0}px`,
        transform: `translate(-50%, -50%)`,
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
      BetterCSEdit 2.1
    </passive>
    <main class="menu--inner-gui">
      <passive class="menu--inner-gui-block">
        <h4>=== EDITOR === </h4>
        <passive id="menu--inner-gui-block-text">Custom Resize/Rotate <input type="checkbox" id="renro"> </passive>
        <passive id="menu--inner-gui-block-text">TitleLengthBypass (cside >50) <input type="checkbox" id="tltb"> </passive>
        <passive id="menu--inner-gui-block-text">Custom Banner <input type="checkbox" id="cbr"> </passive>
		<passive id="menu--inner-gui-block-text">More Tab <input type="checkbox" id="moretab"> </passive>

        <h4>===== UI ===== </h4>
        <passive id="menu--inner-gui-block-text">Full Darkmode <input type="checkbox" id="darkmode"> </passive>
        <passive id="menu--inner-gui-block-text">Custom Welcome Message <input type="checkbox" id="cwm"> </passive>
        <passive id="menu--inner-gui-block-text">Custom Namerole (cside) <input type="checkbox" id="cnr"> </passive>
		<passive id="menu--inner-gui-block-text">View Full Image <input type="checkbox" id="vfi"> </passive>
		<passive id="menu--inner-gui-block-text">Background <input type="checkbox" id="bg"> </passive>

        <h4>=== INPUTS === </h4>

		<h6>=== Custom Welcome Message ===</h6>
        <passive id="menu--inner-gui-block-text"> Welcome Message Mode: </passive>

        <passive id="menu--inner-gui-block-text"> <input type="radio" name="cwmess" value="entire" id="cwm-ent"> Entire </passive>
        <passive id="menu--inner-gui-block-text"> <input type="radio" name="cwmess" value="first,last" id="cwm-fl"> first [name] last </passive>

        <passive id="menu--inner-gui-block-text"> Welcome Message (first,last): <input type="text" id="cwm-first" name="cwm"> <input type="text" id="cwm-last" name="cwm"></passive>
        <passive id="menu--inner-gui-block-text"> Welcome Message (entire): <input type="text" id="cwm-txt" name="cwm"> </passive>

		<h6>=== Custom Banner ===</h6>
        <passive id="menu--inner-gui-block-text"> Banner: <input type="text" id="cbr-url" name="cbr"> </passive>

		<h6>=== Background ===</h6>
        <passive id="menu--inner-gui-block-text"> Background: <input type="text" id="bg-url" name="bg"> </passive>


		<h6>=== Custom Namerole ===</h6>
        <passive id="menu--inner-gui-block-text"> Name for custom role: <input type="text" id="nrname" name="nfcbr"> </passive>
        <passive id="menu--inner-gui-block-text"> 1 - Role (name): </passive>
        <passive id="menu--inner-gui-block-text"> <input type="radio" name="roletype" value="normal" id="role-normal"> Normal </passive>
        <passive id="menu--inner-gui-block-text"> <input type="radio" name="roletype" value="betatester" id="role-bt"> Server Helper </passive>
        <passive id="menu--inner-gui-block-text"> <input type="radio" name="roletype" value="mod" id="role-mod"> Mod </passive>
        <passive id="menu--inner-gui-block-text"> <input type="radio" name="roletype" value="admin" id="role-admin"> Admin </passive>
        <passive id="menu--inner-gui-block-text"> <input type="radio" name="roletype" value="owner" id="role-syrupyy"> syrupyy/Owner </passive>

		<passive id="menu--inner-gui-block-text"> 2 - Role, option : </passive>
		<passive id="menu--inner-gui-block-text"> <input type="radio" name="rtm" value="cnr-sync"   id="cnr-sync"> Sync </passive>
        <passive id="menu--inner-gui-block-text"> <input type="radio" name="rtm" value="cnr-nosync" id="cnr-nosync"> No Sync </passive>
		<passive id="menu--inner-gui-block-text">Custom Type <input type="checkbox" id="cnr-ct"> </passive>


		<passive id="menu--inner-gui-block-text">
		2 - Role (level):
		<select id="cnr-level">
			<option value="level-0">Normal</option>
			<option value="level-1">Studio Helper</option>
			<option value="level-2">Moderator</option>
			<option value="level-3">Administrator</option>
			<option value="level-4">Developer</option>
		</select>
		</passive>

		<passive id="menu--inner-gui-block-text">
		2 - Role (type):
		<select id="cnr-role">
			<option value="normal">Normal</option>
			<option value="Studio Helper">Studio Helper</option>
			<option value="Moderator">Moderator</option>
			<option value="Administrator">Administrator</option>
			<option value="Developer">Developer</option>
		</select>
		</passive>

		<passive id="menu--inner-gui-block-text">
		Custom Type (if No Sync and Custom Type on):
		<input type="text" id="cnr-cttxt" name="cnr">
		</passive>


        <passive id="menu--inner-gui-block-text"> To apply the change, </passive>
        <passive id="menu--inner-gui-block-text"> press save + reload</passive>
        <h8>Code by Bang1338#5701</h8>
        <script>

        // Help me i'm being Yandere again ;-;
        function save() {

		// Checkboxs
	    var checkbox1 = document.getElementById("renro");    // Resize + Rotate
        var checkbox2 = document.getElementById("tltb");     // TitleLengthBypass
        var checkbox3 = document.getElementById("darkmode"); // Full Darkmode
        var checkbox4 = document.getElementById("cwm");      // Custom Welcome Message
        var checkbox5 = document.getElementById("cnr");      // Custom Namerole
        var checkbox6 = document.getElementById("cbr");      // Custom Banner
		var checkbox7 = document.getElementById("vfi");      // View Full Image
		var checkbox8 = document.getElementById("cnr-ct");   // Custom Namerole - Custom Type
		var checkbox9 = document.getElementById("moretab");  // More Tab
		var checkbox10= document.getElementById("bg");       // Background

		// Textboxs
        const txt1 = document.getElementById("cwm-txt").value;       // Custom Welcome Message - Full Text
        const txt1f = document.getElementById("cwm-first").value;    // Custom Welcome Message - [First Text] Name
        const txt1l = document.getElementById("cwm-last").value;     // Custom Welcome Message - Name [Last Text]
        const txt2 = document.getElementById("cbr-url").value;       // Custom Banner - Banner URL
      //const txt3 = document.getElementById("rfsp").value;          // Refresh speed (now no more)
        const txt4 = document.getElementById("nrname").value;        // Custom Namerole - Username
		const txt5 = document.getElementById("cnr-cttxt").value;     // Custom Namerole - Custom Type
		const txt6 = document.getElementById("bg-url").value;        // Background - URL

		// Radio buttons
        var radio1 = document.getElementById("role-normal");         // Role - Normal User
        var radio2 = document.getElementById("role-bt");             // Role - Beta Tester
        var radio3 = document.getElementById("role-mod");            // Role - Moderator
        var radio4 = document.getElementById("role-admin");          // Role - Admin
        var radio5 = document.getElementById("role-syrupyy");        // Role - syrupyy
        var radio6 = document.getElementById("cwm-ent");             // Custom Welcome Message - Full Text (E/D)
        var radio7 = document.getElementById("cwm-fl");              // Custom Welcome Message - [First Text] Name [Last Text] (E/D)
		var radio8 = document.getElementById("cnr-sync");            // Custom Namerole - Sync
		var radio9 = document.getElementById("cnr-nosync");          // Custom Namerole - No Sync

		// Dropdown
		var dropdown1 = document.getElementById("cnr-level");          // Custom Namerole - 2. Level
		var dropdown2 = document.getElementById("cnr-role");           // Custom Namerole - 2. Role


		// Set item for checkboxs
        localStorage.setItem("trans", "rights");                   // Trans rights :3
        localStorage.setItem("renro", checkbox1.checked);          // Resize + Rotate
        localStorage.setItem("tltb", checkbox2.checked);           // TitleLengthBypass
        localStorage.setItem("darkmode", checkbox3.checked);       // Full Darkmode
        localStorage.setItem("cwm", checkbox4.checked);            // Custom Welcome Message
        localStorage.setItem("cnr", checkbox5.checked);            // Custom Namerole
        localStorage.setItem("cbr", checkbox6.checked);            // Custom Banner
		localStorage.setItem("vfi", checkbox7.checked);            // View Full Image
		localStorage.setItem("cnr-ct", checkbox8.checked);         // Custom Namerole - Custom Type
		localStorage.setItem("moretab", checkbox9.checked);        // More Tab
		localStorage.setItem("bg", checkbox10.checked);            // Background

		// Set item for textboxs
        localStorage.setItem("cwm-txt", txt1)                      // Custom Welcome Message - Full Text
        localStorage.setItem("cwm-first", txt1f)                   // Custom Welcome Message - [First Text] Name
        localStorage.setItem("cwm-last", txt1l)                    // Custom Welcome Message - Name [Last Text]
        localStorage.setItem("cbr-url", txt2)                      // Custom Banner - Banner URL
//      localStorage.setItem("rfsp", txt3)                         // Refresh speed (now no more)
        localStorage.setItem("nrname", txt4)                       // Custom Namerole - Username
		localStorage.setItem("cnr-cttxt", txt5)                    // Custom Namerole - Custom Type
		localStorage.setItem("bg-url", txt6)                       // Background - URL

		// Set item for radio buttons
        localStorage.setItem("role-normal", radio1.checked);       // Custom Namerole - Normal
        localStorage.setItem("role-bt", radio2.checked);           // Custom Namerole - Beta Tester/Studio Helper
        localStorage.setItem("role-mod", radio3.checked);          // Custom Namerole - Moderator
        localStorage.setItem("role-admin", radio4.checked);        // Custom Namerole - Administrator
        localStorage.setItem("role-syrupyy", radio5.checked);      // Custom Namerole - Developer (syrupyy)
        localStorage.setItem("cwm-ent", radio6.checked);           // Custom Welcome Message - Full Text (E/D)
        localStorage.setItem("cwm-fl", radio7.checked);            // Custom Welcome Message - [First Text] Name [Last Text] (E/D)
		localStorage.setItem("cnr-sync", radio8.checked);          // Custom Namerole - Sync
		localStorage.setItem("cnr-nosync", radio9.checked);        // Custom Namerole - No Sync

		// Set item for dropdown
		localStorage.setItem("cnr-level", dropdown1.value);        // Custom Namerole - 2. Level
		localStorage.setItem("cnr-role",  dropdown2.value);        // Custom Namerole - 2. Role
        }


		// Get item from checkboxs. If checked, it will check.
		//                          If not checked, it ignore.
        var checked1 = JSON.parse(localStorage.getItem("renro"));
        var checked2 = JSON.parse(localStorage.getItem("tltb"));
        var checked3 = JSON.parse(localStorage.getItem("darkmode"));
        var checked4 = JSON.parse(localStorage.getItem("cwm"));
        var checked5 = JSON.parse(localStorage.getItem("cnr"));
        var checked6 = JSON.parse(localStorage.getItem("cbr"));
		var checked7 = JSON.parse(localStorage.getItem("vfi"));
		var checked8 = JSON.parse(localStorage.getItem("cnr-ct"));
		var checked9 = JSON.parse(localStorage.getItem("moretab"));
		var checked10= JSON.parse(localStorage.getItem("bg"));

		// Set checkboxs.
        document.getElementById("renro").checked = checked1;
        document.getElementById("tltb").checked = checked2;
        document.getElementById("darkmode").checked = checked3;
        document.getElementById("cwm").checked = checked4;
        document.getElementById("cnr").checked = checked5;
        document.getElementById("cbr").checked = checked6;
		document.getElementById("vfi").checked = checked7;
		document.getElementById("cnr-ct").checked = checked8;
		document.getElementById("moretab").checked = checked9;
		document.getElementById("bg").checked = checked10;

		// Set textboxs if it not empty
        if (localStorage.getItem("cwm-txt") != null) document.getElementById("cwm-txt").value = localStorage.getItem("cwm-txt")
        if (localStorage.getItem("cwm-first") != null) document.getElementById("cwm-first").value = localStorage.getItem("cwm-first")
        if (localStorage.getItem("cwm-last") != null) document.getElementById("cwm-last").value = localStorage.getItem("cwm-last")
        if (localStorage.getItem("nrname") != null) document.getElementById("nrname").value = localStorage.getItem("nrname")
		if (localStorage.getItem("cnr-cttxt") != null) document.getElementById("cnr-cttxt").value = localStorage.getItem("cnr-cttxt")
		if (localStorage.getItem("bg-url") != null) document.getElementById("bg-url").value = localStorage.getItem("bg-url")

/* Refresh Speed now unused lol
        if (localStorage.getItem("rfsp") != null) document.getElementById("rfsp").value = localStorage.getItem("rfsp")
        else document.getElementById("rfsp").value = "1000"
*/
		// Custom Banner, if url not empty, set your banner. If empty, set BetterCSEdit Banner.
        if (localStorage.getItem("cbr-url") != null) document.getElementById("cbr-url").value = localStorage.getItem("cbr-url")
        else document.getElementById("cbr-url").value = "https://media.discordapp.net/attachments/954077931360124939/1047811089557102614/banner_BetterCSEdit_2.0.png"

		// Get item from radio buttons. If checked, it will check.
		//                              If not checked, it ignore.
        var rard1 = JSON.parse(localStorage.getItem("role-normal"));
        var rard2 = JSON.parse(localStorage.getItem("role-bt"));
        var rard3 = JSON.parse(localStorage.getItem("role-mod"));
        var rard4 = JSON.parse(localStorage.getItem("role-admin"));
        var rard5 = JSON.parse(localStorage.getItem("role-syrupyy"));
        var rard6 = JSON.parse(localStorage.getItem("cwm-ent"));
        var rard7 = JSON.parse(localStorage.getItem("cwm-fl"));
		var rard8 = JSON.parse(localStorage.getItem("cnr-sync"));
		var rard9 = JSON.parse(localStorage.getItem("cnr-nosync"));

		// Set radio buttons
        document.getElementById("role-normal").checked = rard1;
        document.getElementById("role-bt").checked = rard2;
        document.getElementById("role-mod").checked = rard3;
        document.getElementById("role-admin").checked = rard4;
        document.getElementById("role-syrupyy").checked = rard5;
        document.getElementById("cwm-ent").checked = rard6;
        document.getElementById("cwm-fl").checked = rard7;
		document.getElementById("cnr-sync").checked = rard8;
		document.getElementById("cnr-nosync").checked = rard9;

		// Get dropdown listStyleType
		var dd1 = localStorage.getItem("cnr-level");
		var dd2 = localStorage.getItem("cnr-role");

		// Set dropdown list
		document.getElementById("cnr-level").value = dd1;
		document.getElementById("cnr-role").value =  dd2;


        </script>
        <passive id="menu--inner-gui-block-text">
			<button onclick="save()">Save</button>
			<button onclick="window.location.reload()">Reload</button>
		</passive>
        </passive>
      </passive>
    </main>
  </main>
</main>
`

    var rolelevel;
if (JSON.parse(localStorage.getItem("role-normal")))
    rolelevel = "level-0";
else if (JSON.parse(localStorage.getItem("role-bt")))
    rolelevel = "level-1";
else if (JSON.parse(localStorage.getItem("role-mod")))
    rolelevel = "level-2";
else if (JSON.parse(localStorage.getItem("role-admin")))
    rolelevel = "level-3";
else if (JSON.parse(localStorage.getItem("role-syrupyy")))
    rolelevel = "level-4";

/* Create menu CSS code */

let css = `
<style>

/* Style for holder menu. */
main.menu--holder {
position: fixed;
top: ${menu.position.top};
left: ${menu.position.left};
width: ${menu.size.width};
height: ${menu.size.height};
display: ${menu.display.none};
transform: ${menu.position.transform};
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
    document.addEventListener("keydown", function (event) {
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
let viewfullimage = JSON.parse(localStorage.getItem("vfi"));
let customnameroletype = JSON.parse(localStorage.getItem("cnr-ct"));
let mtb = JSON.parse(localStorage.getItem("moretab"));
let background = JSON.parse(localStorage.getItem("bg"));

console.log('renro: ' + renro);
console.log('tgtb: ' + tgtb);
console.log('darkmode: ' + darkmode);
console.log('customwelcome: ' + customwelcome);
console.log('namerole: ' + namerole);
console.log('custombanner: ' + custombanner);
console.log('viewfullimage: ' + viewfullimage);
console.log('customnameroletype: ' + customnameroletype);
console.log('background: ' + background);

// =====[Custom Welcome Message]=====
let inclnm = JSON.parse(localStorage.getItem("cwm-fl"));
let fw = localStorage.getItem("cwm-first");
let lw = localStorage.getItem("cwm-last");
let entstr = localStorage.getItem("cwm-txt");

console.log('ilclnm: ' + inclnm);
console.log('fw: ' + fw);
console.log('lw: ' + lw);
console.log('entstr: ' + entstr);

// =====[Custom Namerole]=====
// 0    = Normal
// 1    = Beta tester
// 2    = Moderator
// 3    = Administrator
// 4    = syrupyy/Owner
let nonlnr;
let n4r = localStorage.getItem("nrname");
let nr = rolelevel;

let customtype = localStorage.getItem("cnr-ct");
let customtypetxt = localStorage.getItem("cnr-cttxt");

let sync = localStorage.getItem("cnr-sync");
let nosync = localStorage.getItem("cnr-nosync");

let nrlevel = localStorage.getItem("cnr-level");
let nrrole = localStorage.getItem("cnr-role");

console.log('nonlnr: ' + nonlnr);
console.log('n4r: ' + n4r);
console.log('customtype: ' + customtype);
console.log('customtypetxt: ' + customtypetxt);
console.log('sync: ' + sync);
console.log('nosync: ' + nosync);
console.log('nrlevel: ' + nrlevel);
console.log('nrrole: ' + nrrole);

// =====[/Custom Namerole]=====


// =====[Refresh speed ]=====
//let rfs = localStorage.getItem("rfsp") // Now no more
// =====[/Refresh speed]=====


// =====[Custom Banner]=====
// urlb: URL of banner
console.log('banner: ' + localStorage.getItem("cbr-url")); // Weird, if I remove this line, "unexpected strict mode reserved word" error will show up.
let urlb = localStorage.getItem("cbr-url");
// =====[/Custom Banner]=====


// =====[Background]=====
console.log('Background: ' + localStorage.getItem("bg-url"));
let bgurl = localStorage.getItem("bg-url");
// =====[/Background]=====


// =====[More Tab]=====
console.log('moretab: ' + localStorage.getItem("moretab"));
let mtab = localStorage.getItem("moretab");
// =====[/More Tab]=====


// =======[DONT EDIT]=======
// or edit if you know what are you doing


// To remove the fatal flaw, I have to adding URL change function and make sure that it's not studio.
// get URL
let url = location.href;
console.log('first refreshed url: ' + url);

// I execute this first
dmode(); // Darkmode alway set first because if background on, the darkmode gone.
execute();

// No more 1 second for stuff
function observeDOM() {
    // select the node that will be observed for changes
    var targetNode = document.body;

    // create a new instance of MutationObserver
    var observer = new MutationObserver(function (mutations) {
        // loop through the mutations that occurred
        mutations.forEach(function (mutation) {
            // do something in response to the mutation
            if (url != location.href) {
                // page has changed, set new page as 'current'
                url = location.href;
                dmode();
                execute();
            }
            console.log('current url: ' + url);
        });
    });

    // configure the observer to watch for changes to the DOM
    var config = {
        attributes: true,
        childList: true,
        subtree: true
    };

    // start observing the target node for DOM mutations
    observer.observe(targetNode, config);
}
observeDOM();

// subdomain check
function isSubdomain(url) {
    var regex = new RegExp(/^([a-z]+\:\/{2})?([\w-]+\.[\w-]+\.\w+)$/);
    return !!url.match(regex);
}

// URL data warper.
function urltype(url) {
    var blk = "";
    var result;
    var result0;
    var result1;
    var result2;
    var result3;
    var result4;
    var result5;
    var result6;
    var result7;
    var result8;
    var result9;
    var result10;
    var tmpurl = url;
    var trimurl = url;

    // remove for further check
    tmpurl = tmpurl.replace("https://", "");
    tmpurl = tmpurl.replace("comic.studio/", "");
    console.log('tmpurl: ' + tmpurl);

    trimurl = trimurl.replace("https://", "");
    trimurl = trimurl.replace("/", "");
    console.log('trimurl: ' + trimurl);

    // check if it menu
    if (url == "https://comic.studio/")
        result0 = "menu-1";
    else
        result0 = "menu-0";

    // check if it subdomain
    if (isSubdomain(trimurl))
        result1 = "sd-1";
    else
        result1 = "sd-0"

            // check if studio not a subdomain
            tmpurl = url;
    var r = /\d+/; // regex
    if (tmpurl.includes("/s/") && tmpurl.match(r) > 0)
        result2 = "csnsd-1";
    else
        result2 = "csnsd-0";

    // check if url is user profile.
    tmpurl = url;
    if (tmpurl.includes("/u/"))
        result3 = "user-1";
    else
        result3 = "user-0";

    // check if url is comic.
    tmpurl = url;
    if (tmpurl.includes("/c/"))
        result4 = "comic-1";
    else
        result4 = "comic-0";

    // check if url is studio
    tmpurl = url;
    if (tmpurl.includes("/manage") && tmpurl.match(r) > 0)
        result5 = "studio-1";
    else
        result5 = "studio-0";

    // get username.
    tmpurl = url;
    if (tmpurl.includes("/u/")) {
        result6 = tmpurl.replace('https://comic.studio/u/', '');
    } else
        result6 = "noname";

    // check if url is notifications.
    tmpurl = url;
    if (tmpurl.includes("/notifications"))
        result7 = "noti-1";
    else
        result7 = "noti-0";

    // check if url is feed.
    tmpurl = url;
    if (tmpurl.includes("/feed"))
        result8 = "feed-1";
    else
        result8 = "feed-0";

    // check if url is settings.
    tmpurl = url;
    if (tmpurl.includes("/settings"))
        result9 = "settings-1";
    else
        result9 = "settings-0";

    // check if url is browse.
    tmpurl = url;
    if (tmpurl.includes("/browse"))
        result10 = "browse-1";
    else
        result10 = "browse-0";

    // result.
    result = blk.concat(result0, "|", result1, "|", result2, "|", result3, "|", result4, "|", result5, "|", result5, "|", result6, "|", result7, "|", result8, "|", result9, "|", result10);
    console.log(result);
    return (result);
}

// Resize and Rotate input function
if (Boolean(renro) == true && urltype(url).includes("sd-1") || urltype(url).includes("csnsd-1")) {
    // Resize input (decrease)
    let resmin = document.createElement('input')
        resmin.type = 'text'
        resmin.placeholder = 'Re-'
        document.getElementById('controls').prepend(resmin)
        resmin.oninput = function () {
        document.getElementById('resize').min = this.value;
    }

    // Resize input (increase)
    let resmax = document.createElement('input')
        resmax.type = 'text'
        resmax.placeholder = 'Re+'
        document.getElementById('controls').prepend(resmax)
        resmax.oninput = function () {
        document.getElementById('resize').max = this.value;
    }

    // Rotate input (decrease)
    let rotmin = document.createElement('input')
        rotmin.type = 'text'
        rotmin.placeholder = 'Ro-'
        document.getElementById('controls').appendChild(rotmin)
        rotmin.oninput = function () {
        document.getElementById('rotate').min = this.value;
    }

    // Rotate input (increase)
    let rotmax = document.createElement('input')
        rotmax.type = 'text'
        rotmax.placeholder = 'Ro+'
        document.getElementById('controls').appendChild(rotmax)
        rotmax.oninput = function () {
        document.getElementById('rotate').max = this.value;
    }
}

// Custom Banner
// It's also work with other banner like Shopee thing: http://shopeeplus.com//upload/images/cach-tao-banner-xoay-vong.png
// Note 1: not supported non-subdomain studio
// I'm afraid if someone put nsfw banner, so...
// Note 2: I will include nsfw detector library soon.
if (Boolean(custombanner) == true && urltype(url).includes("sd-1") || urltype(url).includes("csnsd-1"))
    document.getElementsByClassName("banner")[0].src = urlb;

// Title bypass (clentside) function
if (Boolean(tgtb) == true && urltype(url).includes("sd-1")) {
    let tb = document.createElement('input')
        tb.type = 'text'
        tb.placeholder = 'Title length (client if >50)'
        document.getElementsByClassName("right-buttons tab-buttons")[0].appendChild(tb)
        tb.oninput = function () {
        document.getElementById('title').maxLength = this.value;
    }
}

// Dark mode function
function dmode() {
    if ((Boolean(darkmode)) && urltype(url).includes("sd-0") && urltype(url).includes("studio-0")) {
        // darkmode main.
        // Font will turn into white to read in dark.
        // Also studio editing will be disable.

        $('#container').attr('style', 'background: #000')
        $('.card').attr('style', 'background-color: #000')
        $('.comics-box').attr('style', 'background-color: #000')
        $('.notification-inner a').attr('style', 'color: #6c757d')
        $('.table').attr('style', 'color: #fff')
        $('.text-body').attr('style', 'color: rgba(var(--bs-white),var(--bs-text-opacity)) !important') // when i write this, this will turn to white. but now i forgor
        $('.text-black').attr('style', 'color: rgba(var(--bs-white),var(--bs-text-opacity)) !important')
        document.documentElement.style.setProperty('--bs-body-color', '#ffffff');
        if (url == 'https://comic.studio/')
            document.getElementsByClassName("w-100")[0].src = "https://cdn.discordapp.com/attachments/954077931360124939/1028601397337399376/icon_black.png" // Adding edited icon so you can see it.
                document.body.style.color = '#ffffff';
    }
    /*
    if ((Boolean(darkmode) == false) && urltype(url).includes("sd-0") && urltype(url).includes("studio-0")) {
    $('#container').attr('style', 'background: #fff')
    $('.card').attr('style', 'background-color: #fff')
    $('.comics-box').attr('style', 'background-color: #fff')
    $('.notification-inner a').attr('style', 'color: #000000')
    $('.table').attr('style', 'color: #000')
    $('.text-body').attr('style', 'color: rgba(var(--bs-black),var(--bs-text-opacity)) !important')
    $('.text-black').attr('style', 'color: rgba(var(--bs-black),var(--bs-text-opacity)) !important')
    document.documentElement.style.setProperty('--bs-body-color', '#000000');
    if (url == 'https://comic.studio/') document.getElementsByClassName("w-100")[0].src = "https://cdn.comic.studio/assets/img/icon_black.png" // Original
    document.body.style.color = '#000000';
    }
     */
};

// For CWF
var rescw1 = "";
var rescw2 = "";
var blankcw = "";

function getroletype(level) {
    let res = "";
    if (level == "level-1")
        res = "Studio Helper";
    if (level == "level-2")
        res = "Moderator";
    if (level == "level-3")
        res = "Administrator";
    if (level == "level-4")
        res = "Developer";
    return res;
}

function execute() {
    /*
    // Zoom out 50% for studio editor because menu broken
    if (urltype(url).includes("studio-1")) document.body.style.zoom = "50%";
    else document.body.style.zoom = "100%";
     */

    // Custom Welcome function
    if (Boolean(customwelcome) && url == 'https://comic.studio/' || url == 'https://comic.studio/?show=all') {
        var wm = document.getElementsByClassName('display-5 fw-bold lh-1 mb-3')[0];
        var text = wm.textContent;
        var preno = text.replace('Welcome, ', '');
        var nameonl = preno.replace('!', '');

        if (Boolean(inclnm)) {
            if (rescw1 == wm.textContent)
                rescw1 = wm.textContent; // Took me half of day to figure out
            else
                rescw1 = blankcw.concat(fw, nameonl, lw);
            wm.innerHTML = rescw1;
        } else {
            if (rescw2 == wm.textContent)
                rescw2 = wm.textContent; // Took me half of day to figure out
            else
                rescw2 = entstr;
            wm.innerHTML = rescw2;
        }
    }

    // Custom Namerole function
    if (Boolean(namerole) && urltype(url).includes("user-1")) {
        const usernameElement = document.querySelector('#username');
        const unelement = document.getElementById('username');
        const username = usernameElement.innerHTML;

        if (username == n4r) {
            usernameElement.classList.add(rolelevel);
            if (sync == "true") {
                if (customtype == "true" && customtypetxt != "") {
                    const newElement = '<p class="' + rolelevel + '">' + customtypetxt + '</p>';
                    unelement.insertAdjacentHTML('afterend', newElement);
                } else if (customtype == "false") {
                    if (getroletype(rolelevel) != "") {
                        const newElement = '<p class="' + rolelevel + '">' + getroletype(rolelevel) + '</p>';
                        unelement.insertAdjacentHTML('afterend', newElement);
                    }
                }
            } else if (sync == "false") {
                if (customtype == "true" && customtypetxt != "") {
                    const newElement = '<p class="' + nrlevel + '">' + customtypetxt + '</p>';
                    unelement.insertAdjacentHTML('afterend', newElement);
                }
                if (customtype == "false") {
                    const newElement = '<p class="' + nrlevel + '">' + nrrole + '</p>';
                    unelement.insertAdjacentHTML('afterend', newElement);
                }
            }
        } else if (n4r == "") {
            usernameElement.classList.add(rolelevel);
            if (sync == "true") {
                if (customtype == "true" && customtypetxt != "") {
                    const newElement = '<p class="' + rolelevel + '">' + customtypetxt + '</p>';
                    unelement.insertAdjacentHTML('afterend', newElement);
                } else if (customtype == "false") {
                    if (getroletype(rolelevel) != "") {
                        const newElement = '<p class="' + rolelevel + '">' + getroletype(rolelevel) + '</p>';
                        unelement.insertAdjacentHTML('afterend', newElement);
                    }
                }
            } else if (sync == "false") {
                if (customtype == "true" && customtypetxt != "") {
                    const newElement = '<p class="' + nrlevel + '">' + customtypetxt + '</p>';
                    unelement.insertAdjacentHTML('afterend', newElement);
                }
                if (customtype == "false") {
                    const newElement = '<p class="' + nrlevel + '">' + nrrole + '</p>';
                    unelement.insertAdjacentHTML('afterend', newElement);
                }
            }
        }

    }

    // VFI function, using keydrown
    if (Boolean(customnameroletype) && urltype(url).includes("comic-1")) {
        kd.TAB.down(function () {
            if (kd.TILDE.isDown()) {
                console.log('Tab and Tilde~ are held down.');
            }
        });
        kd.TAB.up(function () {
            if (kd.TILDE.isDown()) {
                if (urltype(url).includes("comic-1")) {
                    console.log('Tab and Tilde~ no more held down.');
                    console.log('Opening new window');
                    const tmpurl = url;
                    const id = tmpurl.replace('https://comic.studio/c/', '');
                    const fsurl = `https://comicstud.io/c/${id}`;
                    window.open(fsurl);
                }
            }
        });
        kd.run(function () {
            kd.tick();
        });
    }

    // More Tab function
    if (Boolean(mtb) && urltype(url).includes("studio-1")) {
        var newTabButton = document.getElementById("tab-new");
        newTabButton.removeAttribute("id");
        newTabButton.setAttribute("class", "btn btn-secondary");
    }

    // Background function
    if (Boolean(background) && urltype(url).includes("studio-0") && urltype(url).includes("sd-0")) {
        // Get the div element with id "container"
        const container = document.getElementById("container");

        // Set the background image URL
        const bgUrl = bgurl;

        // Set the background image style
        const bgStyle = `background-image: url(${bgUrl}); background-size: 100vw auto;`;

        // Set the new style for the div element
        container.setAttribute("style", bgStyle);

    }
};
