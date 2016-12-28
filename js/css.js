/*jslint devel:true*/
/*global getComputedStyle, sDM, aDM, iB:true, disaB, gUb, vS, gCfS, gSfA, ls, ER, pg, adjust, oS*/
var negB,//negation Button
    conB,//conjunction Button
    disB,//disjunction Button
    impB,//implication Button
    iimpB,//inverted implication Button
    bimB,//biconditional Button
    oBB,//open brackets Button
    cBB,//close brackets Button
    delB,//delete Button
    letB,//letter Button
    testB,//test Button
    input,//input
    inputH,//inputHolder
    uBc,//unclosedBracketsCounter
    uBct,//unclosedBracketstag
    butWrapper,//Buttons wrapper
    vOr,//vertical Orientation (bool)
    tt,//tested? (bool)
    wrBut,//Array of wrapped buttons
    //backspaceimg,//Removed to prevent the 'save image as' prompt if long pressed//Instead used a special font
    body,//no explanation needed
    table,//table
    thead,//table
    tbody,//table
    tdiv,//tdiv (for scrolling)
    odiv,//Outer div for the table
    cellwidth,//no explanation needed
    legend,//Over the table
    legtxt,//Legend text
    restartB,
    aS = [];//cells ordered by aparition order (top left to bottom right)
function ecCB() {
    'use strict';
    if (!uBc.disabled) {
        setTimeout(function () {
            uBc.style.transform = "scale(8)";
        }, 100);
    }
}//hover closeButton
function decCB() {
    'use strict';
    if (!uBc.disabled) {
        setTimeout(function () {
            if (gUb() !== 0) {
                uBc.style.transform = "scale(1)";
            } else {
                uBc.style.transform = "scale(0)";
            }
        }, 100);
    }
}//unhover close Button
function edelB() {
    'use strict';
    if (!delB.disabled) {
        setTimeout(function () {
            delB.style.transform = "scale(2)";
        }, 100);
    }
}//etc
function dedelB() {
    'use strict';
    if (!delB.disabled) {
        setTimeout(function () {
            delB.style.transform = "scale(1)";
        }, 100);
    }
}//...
function etestB() {
    'use strict';
    setTimeout(function () {
        if (!pg) {
            testB.style.transform = "scale(1.3)";
        }
    }, 100);
}//...
function detestB() {
    'use strict';
    setTimeout(function () {
        if (!pg) {
            testB.style.transform = "scale(1)";
        }
    }, 100);
}//XD
function nfU(str) {
    'use strict';
    var st = str;
    if (str.search("px") !== -1) {
        return Number(str.substring(0, str.length - 2));
    } else {
        return Number(str.substring(0, str.length - 1));
    }
}//get number from measure
function ccoll() {
    'use strict';
    var i = [];
    i[1] = [];
    for (i[0] = 0; i[0] < oS.length; i[0] += 1) {
        i[1].push(window["i" + (i[0] + 1)]);
    }
    i[1].sort(function (a, b) {return nfU(a.style.left) - nfU(b.style.left); });
    for (i[0] = 0; i[0] < i[1].length - 1; i[0] += 1) {
        if (nfU(i[1][i[0]].style.left) + nfU(getComputedStyle(i[1][i[0]]).width) > nfU(i[1][i[0] + 1].style.left)) {
            if (nfU(i[1][i[0]].style.top) <= 1) {
                i[1][i[0] + 1].style.top = (10 + ((i[0] + 1) % 2)) + "px";
                legtxt.style.top = "24px";
            } else {
                i[1][i[0] + 1].style.top = ((i[0] + 1) % 2);
            }
        }
    }
    if (legtxt.style.top === "24px") {
        for (i[0] = 0; i[0] < i[1].length; i[0] += 1) {
            if (nfU(i[1][i[0]].style.top) <= 1) {
                i[1][i[0]].style.top = (nfU(i[1][i[0]].style.top) + 10) + "px";
            } else {
                i[1][i[0]].style.top = (nfU(i[1][i[0]].style.top) - 10) + "px";
            }
        }
    }
}//Check collapse in indexes
function printcss() {
    'use strict';
    var i = [];
    legend = document.getElementById("legend");
    legtxt = document.getElementById("legtxt");
    odiv = document.getElementById("odiv");
    table = document.getElementById("table");
    thead = document.getElementById("thead");
    tdiv = document.getElementById("tdiv");
    tbody = document.getElementById("tbody");
    restartB = document.getElementById("restartB");
    ccoll();
    legend.style.height = (nfU(legtxt.style.top) + nfU(getComputedStyle(legtxt).height) + 10) + "px";
    legend.style.width = (nfU(getComputedStyle(legtxt).width) + 8) + "px";
    cellwidth = getComputedStyle(document.getElementsByTagName("td")[0]).height;
    for (i[0] = 0; i[0] < document.getElementsByClassName("celll").length; i[0] += 1) {
        i[1] = document.getElementsByClassName("celll")[i[0]];
        i[1].style.fontSize = Math.max((window.innerWidth / 20), (window.innerHeight / 20)) + "px";
        i[3] = window["cPar" + ls[i[1].id.substring(1, i[1].id.search("f"))]][i[1].id.substring(i[1].id.search("f") + 1)];
        i[2] = (i[3]) ? "tcell" : "fcell";
        i[1].classList.add(i[2]);
    }
    for (i[0] = 0; i[0] < document.getElementsByClassName("cellc").length; i[0] += 1) {
        i[1] = document.getElementsByClassName("cellc")[i[0]];
        i[1].style.fontSize = Math.max((window.innerWidth / 20), (window.innerHeight / 20)) + "px";
        i[3] = vS[i[1].id.substring(1, i[1].id.search("f"))][i[1].id.substring(i[1].id.search("f") + 1)];
        i[2] = (i[3]) ? "tcell" : "fcell";
        i[1].classList.add(i[2]);
    }
    for (i[0] = 0; i[0] < vS.length; i[0] += 1) {
        i[2] = gCfS(gSfA(vS[i[0]]));
        document.getElementById("N" + i[0]).style.backgroundColor = i[2];
        for (i[1] = 0; i[1] < Math.pow(2, ls.length); i[1] += 1) {
            document.getElementById("c" + i[0] + "f" + i[1]).style.backgroundColor = i[2];
        }
    }
    //WIDTHS
    cellwidth = getComputedStyle(document.getElementById("l0f0")).height;
    i[0] = (((nfU(cellwidth) + 4) * (ls.length + vS.length)) + 2) + "px";
    odiv.style.width = i[0];
    //table.style.width = i[0];
    tdiv.style.width = i[0];
    thead.style.width = i[0];
    ER.style.width = i[0];
    //tbody.style.width = (((nfU(cellwidth) + 3) * (ls.length + vS.length)) + 3 + 2) + "px";
    for (i[0] = 0; i[0] < document.getElementsByTagName("th").length; i[0] += 1) {
        i[1] = document.getElementsByTagName("th")[i[0]];
        i[1].style.width = cellwidth;
    }
    for (i[0] = 0; i[0] < document.getElementsByTagName("td").length; i[0] += 1) {
        i[1] = document.getElementsByTagName("td")[i[0]];
        i[1].style.width = cellwidth;
        i[1].style.height = cellwidth;
    }
    for (i[0] = 0; i[0] < document.getElementsByTagName("td").length; i[0] += 1) {
        i[1] = document.getElementsByTagName("td")[i[0]];
        i[1].classList.add("pcell");
    }
    /*for (i[0] = 0; i[0] < document.getElementsByClassName("ptd").length; i[0] += 1) {
        i[1] = document.getElementsByClassName("ptd")[i[0]];
        i[1].style.transform = "scale(1)";//0
    }*/
    //orderbya();
    console.info("Ordered;");
    setTimeout(function () {
        document.getElementById("loadblank").style.opacity = "0";
        //anitable(0);
        adjust();
    }, 200);
    setTimeout(function () {
        document.getElementById("loadblank").style.display = "none";
        document.getElementById("loadblank").style.opacity = "1";
    }, 600);
}
function adjust() {//adjust the measures when the page is resized
    'use strict';
    var bS,
        bSm,
        bSr,
        i = [];
    vOr = window.innerWidth < window.innerHeight;
    if (tt) {
        //Legend
        legend.style.left = ((window.innerWidth - nfU(legend.style.width)) / 2) + "px";
        restartB.style.height = legend.style.height;
        restartB.style.width = legend.style.height;
        //Table
        i[2] = nfU(getComputedStyle(odiv).height);
        i[0] = tdiv.style.height;
        tdiv.style.height = "initial";
        odiv.style.height = "initial";
        if (nfU(getComputedStyle(odiv).height) < window.innerHeight) {
            i[3] = getComputedStyle(tdiv).height;
            odiv.style.top = ((window.innerHeight - nfU(getComputedStyle(odiv).height)) / 2) + "px";
            tdiv.style.height = i[0];
            tdiv.style.height = i[3];
        } else {
            odiv.style.top = "8px";
            tdiv.style.height = i[0];
            tdiv.style.height = ((window.innerHeight - 16) - nfU(getComputedStyle(ER).height)) + "px";
        }
        i[1] = odiv.style.width;
        odiv.style.width = (((nfU(cellwidth) + 4) * (ls.length + vS.length)) + 2) + "px";
        if (((nfU(cellwidth) + 4) * (ls.length + vS.length)) + 2 < window.innerWidth) {
            odiv.style.overflowX = "hidden";
            odiv.style.marginLeft = ((window.innerWidth - nfU(getComputedStyle(odiv).width)) / 2) + "px";
        } else {
            odiv.style.overflowX = "scroll";
            odiv.style.width = i[1];
            odiv.style.width = (window.innerWidth - 16) + "px";
            odiv.style.left = "initial";
            odiv.style.left = ((window.innerWidth - i[1]) / 2) + "px";
            odiv.style.left = "8px";
            odiv.style.right = "8px";
        }
    } else {
        if (vOr) {
            butWrapper.style.height = window.innerWidth + "px";
            butWrapper.style.width = window.innerWidth + "px";
            bSm = window.innerWidth / 20;
            bS = (nfU(butWrapper.style.width) - 4 * bSm) / 3;
            bSr = bS + bSm;
            negB.style.top = bSm + "px";
            negB.style.left = bSm + "px";
            conB.style.top = bSm + "px";
            conB.style.left = ((bSr) + bSm) + "px";
            disB.style.top = bSm + "px";
            disB.style.left = ((2 * bSr) + bSm) + "px";
            iimpB.style.top = (bSr + bSm) + "px";
            iimpB.style.left = bSm + "px";
            bimB.style.top = (bSr + bSm) + "px";
            bimB.style.left = (bSr + bSm) + "px";
            impB.style.top = (bSr + bSm) + "px";
            impB.style.left = ((2 * bSr) + bSm) + "px";
            oBB.style.top = ((2 * bSr) + bSm) + "px";
            oBB.style.left = bSm + "px";
            letB.style.top = ((2 * bSr) + bSm) + "px";
            letB.style.left = (bSr + bSm) + "px";
            cBB.style.top = ((2 * bSr) + bSm) + "px";
            cBB.style.left = ((2 * bSr) + bSm) + "px";
            for (i[0] = 0; i[0] < wrBut.length; i[0] += 1) {
                wrBut[i[0]].style.height = bS + "px";
                wrBut[i[0]].style.width = bS + "px";
                wrBut[i[0]].style.marginTop = "0px";
                wrBut[i[0]].style.marginBottom = "0px";
                wrBut[i[0]].style.marginLeft = "0px";
                wrBut[i[0]].style.marginRight = "0px";
            }
            inputH.style.height = Math.max(nfU(getComputedStyle(input).height), nfU(getComputedStyle(document.getElementById("input2")).height)) + "px";
            inputH.style.marginTop = (((window.innerHeight - bSm - 3 * bSr) / 2) - (nfU(inputH.style.height) / 2)) + "px";
            delB.style.height = (1.5 * bSm) + "px";
            delB.style.width = (1.5 * bSm) + "px";
            delB.style.top = (window.innerHeight - (((3 * bSr) - (1.5 * bSm)) + nfU(delB.style.height))) + "px";
            delB.style.left = undefined;
            delB.style.right = (1.2 * bSm) + "px";
            if ((window.innerHeight - 3 * bSr) < nfU(inputH.style.height)) {
                inputH.style.marginTop = (((window.innerHeight - bSm - 3 * bSr)) - (nfU(inputH.style.height))) + "px";
            }
            uBc.style.height = (1.5 * bSm) + "px";
            uBc.style.width = (1.5 * bSm) + "px";
            uBc.style.bottom = (1.2 * bSm) + "px";
            uBc.style.right = (1.2 * bSm) + "px";
            uBct.style.marginTop = ((1.5 * bSm - nfU(getComputedStyle(uBct).height)) / 2) + "px";
            //backspaceimg.style.width = "90%";
            //backspaceimg.style.height = "90%";
        } else {
            butWrapper.style.width = window.innerWidth + "px";
            bS = ((nfU(butWrapper.style.width) - (10 * 20)) / 10) + "px";
            bSm = window.innerWidth / (20 * 5 / 3);
            bS = (nfU(butWrapper.style.width) - 6 * bSm) / 5;
            bSr = bS + bSm;
            butWrapper.style.height = ((2 * bSr) + bSm) + "px";
            negB.style.top = bSm + "px";
            negB.style.left = bSm + "px";
            conB.style.top = bSm + "px";
            conB.style.left = (bSr + bSm) + "px";
            disB.style.top = bSm + "px";
            disB.style.left = ((2 * bSr) + bSm) + "px";
            letB.style.top = bSm + "px";
            letB.style.left = ((3 * bSr) + bSm) + "px";
            bimB.style.top = bSm + "px";
            bimB.style.left = ((4 * bSr) + bSm) + "px";
            oBB.style.top = (bSr + bSm) + "px";
            oBB.style.left = bSm + "px";
            iimpB.style.top = (bSr + bSm) + "px";
            iimpB.style.left = (bSr + bSm) + "px";
            bimB.style.top = (bSr + bSm) + "px";
            bimB.style.left = ((2 * bSr) + bSm) + "px";
            impB.style.top = (bSr + bSm) + "px";
            impB.style.left = ((3 * bSr) + bSm) + "px";
            cBB.style.top = (bSr + bSm) + "px";
            cBB.style.left = ((4 * bSr) + bSm) + "px";
            delB.style.top = (window.innerHeight - (2 * bSr)) + "px";
            delB.style.right = bSm + "px";
            for (i[0] = 0; i[0] < wrBut.length; i[0] += 1) {
                wrBut[i[0]].style.height = bS + "px";
                wrBut[i[0]].style.width = bS + "px";
            }
            uBc.style.height = (1.5 * bSm) + "px";
            uBc.style.width = (1.5 * bSm) + "px";
            uBc.style.bottom = (1.2 * bSm) + "px";
            uBc.style.right = (1.2 * bSm) + "px";
            uBct.style.marginTop = ((1.5 * bSm - nfU(getComputedStyle(uBct).height)) / 2) + "px";
            inputH.style.height = Math.max(nfU(getComputedStyle(input).height), nfU(getComputedStyle(document.getElementById("input2")).height)) + "px";
            inputH.style.marginTop = (((window.innerHeight - bSm - 2 * bSr) / 2) - (nfU(inputH.style.height) / 2)) + "px";
            if ((window.innerHeight - 2 * bSr) < nfU(inputH.style.height)) {
                inputH.style.marginTop = (((window.innerHeight - bSm - 2 * bSr)) - (nfU(inputH.style.height))) + "px";
            }
            //backspaceimg.style.width = "50%";
            //backspaceimg.style.height = "50%";
        }
    }
    testB.style.bottom = bSm + "px";
    testB.style.right = bSm + "px";
    testB.style.width = nfU(cBB.style.width);
    testB.style.height = nfU(cBB.style.height);
}
function load() {
    'use strict';
    negB = document.getElementById("negB");
    conB = document.getElementById("conB");
    disB = document.getElementById("disB");
    impB = document.getElementById("impB");
    iimpB = document.getElementById("iimpB");
    bimB = document.getElementById("bimB");
    oBB = document.getElementById("oBB");
    cBB = document.getElementById("cBB");
    delB = document.getElementById("delB");
    letB = document.getElementById("letB");
    testB = document.getElementById("testB");
    input = document.getElementById("input");
    inputH = document.getElementById("holder");
    butWrapper = document.getElementById("butWrapper");
    uBc = document.getElementById("uBcounterdiv");
    uBct = document.getElementById("uBcounter");
    //backspaceimg = document.getElementById("backspaceimage");
    body = document.body;
    wrBut = [negB, conB, disB, impB, iimpB, bimB, oBB, cBB, delB, letB];
    iB = [conB, disB, impB, iimpB, bimB];
    disaB();
    adjust();
    delB.addEventListener("touchstart", sDM, false);
    delB.addEventListener("mousedown", sDM, false);
    delB.addEventListener("touchend", aDM, false);
    delB.addEventListener("mouseup", aDM, false);
    uBc.addEventListener("touchstart", ecCB, false);
    uBc.addEventListener("mousedown", ecCB, false);
    uBc.addEventListener("touchend", decCB, false);
    uBc.addEventListener("mouseup", decCB, false);
    testB.addEventListener("touchstart", etestB, false);
    testB.addEventListener("mousedown", etestB, false);
    testB.addEventListener("touchend", detestB, false);
    testB.addEventListener("mouseup", detestB, false);
} //Asign variables after the page has loaded