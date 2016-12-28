/*jslint devel:true*/
/*global $, getComputedStyle, nest, nson, oL, gNoL, gLfI, uregExp, chtR, adjust, aDM, negB, conB, disB, impB, iimpB, bimB, oBB, cBB, delB, letB, testB, input, inputH, butWrapper, vOr, wrBut, lIoabc, uBc, sUb, disaB, deleteN, solve, gSp, oSp, print, printcss, tt:true, gSfA, loadstart, nfU*/
var nSym = '\u00ac',//Symbols //negation
    cSym = '\u2227',//    |   //conjunction
    dSym = '\u2228',//    |   //disjunction
    iSym = '\u21d2',//    |   //implication
    iiSym = '\u21d0',//   |   //inverted implication
    bSym = '\u21d4',//    |   //bicondition
    oBSym = '(',//        |   //open brackets
    cBSym = ')',//        <   //close brackets
    iSyms = [cSym, dSym, iSym, iiSym, bSym],//Array of symbols except nSym
    iB = [],
    oInput,//oString
    fInput = {},//Object: {p: {p: p, q: q, o: "c"}, q: {p: s, o: "n"}, o: "d"}}//Nested object with operators and value arrays
    oS = [],//list of operators indexes arranged by calculation order
    vS = [],//list of values indexes arranged by calculation order
    string,//global cache
    bI = [],//brackets index
    ls,//letters in input
    nL = "p",//next letter to write
    ints = [],//cache for intervals
    fvA = [],//Final array of values
    fSt,//final State (Tautology, Contradiction, Indetermination)
    ER,//Encabezado de la tabla
    pg = false;//Proccesing... (Boolean)
function gLcT(oSym) {//getLastcharacterType
    'use strict';
    var i = [],
        str = document.getElementById("input").innerHTML,
        lc = str.charAt(str.length - 1);
    if (oSym !== undefined) {
        lc = oSym;
    }
    if (str.length === 0) {
        return "e";
    } else if (lc === "(") {
        return "o";
    } else if (lc === ")") {
        return "c";
    } else if (lc === nSym) {
        return "n";
    }
    for (i[0] = 0; i[0] < iSyms.length; i[0] += 1) {
        if (lc === iSyms[i[0]]) {
            i[1] = true;
        }
    }
    if (i[1]) {
        return "s";
    } else {
        return "l";
    }
}//getLastcharacterType
function gUb() {
    'use strict';
    var i = [],
        op = 0,
        cl = 0,
        cache;
    i[0] = false;
    cache = document.getElementById("input").innerHTML;
    while (!i[0]) {
        if (cache.indexOf("(") !== -1) {
            op += 1;
            cache = cache.substring(cache.indexOf("(") + 1);
        } else {
            i[0] = true;
        }
    }
    i[1] = false;
    cache = document.getElementById("input").innerHTML;
    while (!i[1]) {
        if (cache.indexOf(")") !== -1) {
            cl += 1;
            cache = cache.substring(cache.indexOf(")") + 1);
        } else {
            i[1] = true;
        }
    }
    return op - cl;
}//getUnclosedBrackets
function cUb() {//CloseUnclosedBrackets
    'use strict';
    var i = [],
        tar = gUb();
    for (i[0] = 0; i[0] < tar; i[0] += 1) {
        document.getElementById("input").innerHTML += ")";
    }
    adjust();
    disaB();
}//closeUnclosedBrackets
function disabuBc(bool) {
    'use strict';
    uBc.style.transform = "scale(" + (1 - 0.1 * Number(bool)) + ")";
    cBB.style.transform = "scale(" + (1 - 0.06 * Number(bool)) + ")";
    //console.info("Disabling uBc ...");
    uBc.disabled = bool;
}//disable uBc (unclosedB counter)
function tdis() {
    'use strict';
    if ((gLcT() === "l" || gLcT() === "c") && gUb() === 0) {
        testB.disabled = false;
        testB.style.zIndex = 1;
        testB.style.boxShadow = "3px 3px 2px #4b4b4b";
        cBB.style.transform = "scale(0)";
        uBc.style.transform = "scale(0)";
        //console.info("Scaling uBc to 0 ...");
        //console.info("uBc scale = ");
        //console.warn(uBc.style.transform);
    } else {
        testB.disabled = true;
        testB.style.zIndex = -1;
        testB.style.boxShadow = "0px 0px 0px #000000";
        cBB.style.transform = "scale(1)";
    }
}//test disabling
function disaB() {
    'use strict';
    var lc = gLcT(),
        i = [];
    if (lc === "o" || lc === "e") {
        if (lc === "e") {
            delB.disabled = true;
            delB.style.transform = "scale(" + (1 - Number(delB.disabled) * 0.05) + ")";
        } else {
            delB.disabled = false;
            if (!ints[2]) {
                delB.style.transform = "scale(" + (1 - Number(delB.disabled) * 0.05) + ")";
            }
        }
        for (i[0] = 0; i[0] < iB.length; i[0] += 1) {
            iB[i[0]].disabled = true;
        }
        cBB.disabled = true;
        disabuBc(true);
        oBB.disabled = false;
        negB.disabled = false;
        letB.disabled = false;
    } else {
        switch (lc) {
        case "c":
            for (i[0] = 0; i[0] < iB.length; i[0] += 1) {
                iB[i[0]].disabled = false;
            }
            cBB.disabled = gUb() <= 0;
            disabuBc(gUb() <= 0);
            oBB.disabled = true;
            negB.disabled = false;
            letB.disabled = true;
            delB.disabled = false;
            if (!ints[2]) {
                delB.style.transform = "scale(" + (1 - Number(delB.disabled) * 0.05) + ")";
            }
            break;
        case "n":
            for (i[0] = 0; i[0] < iB.length; i[0] += 1) {
                iB[i[0]].disabled = true;
            }
            cBB.disabled = true;
            disabuBc(true);
            oBB.disabled = false;
            negB.disabled = false;
            letB.disabled = false;
            delB.disabled = false;
            if (!ints[2]) {
                delB.style.transform = "scale(" + (1 - Number(delB.disabled) * 0.05) + ")";
            }
            break;
        case "s":
            for (i[0] = 0; i[0] < iB.length; i[0] += 1) {
                iB[i[0]].disabled = false;
            }
            cBB.disabled = true;
            disabuBc(true);
            oBB.disabled = false;
            negB.disabled = false;
            letB.disabled = false;
            delB.disabled = false;
            if (!ints[2]) {
                delB.style.transform = "scale(" + (1 - Number(delB.disabled) * 0.05) + ")";
            }
            break;
        case "l":
            for (i[0] = 0; i[0] < iB.length; i[0] += 1) {
                iB[i[0]].disabled = false;
            }
            cBB.disabled = gUb() <= 0;
            disabuBc(gUb() <= 0);
            oBB.disabled = true;
            negB.disabled = false;
            letB.disabled = false;
            delB.disabled = false;
            if (!ints[2]) {
                delB.style.transform = "scale(" + (1 - Number(delB.disabled) * 0.05) + ")";
            }
            break;
        }
    }
    tdis();
    sUb();
}//disable buttons
function sUb() {
    'use strict';
    if (gUb() === 0) {
        document.getElementById("uBcounterdiv").style.transform = "scale(0)";
    } else {
        document.getElementById("uBcounterdiv").style.transform = "scale(1)";
        document.getElementById("uBcounter").innerHTML = gUb();
    }
}//setUnclosedBracketscounter
function gNI() {//getNegatedIndex//returns an object
    'use strict';
    var i = [],
        ret = {},
        text = document.getElementById("input").innerHTML;
    if (gLcT() === "l") {
        ret.i = lIoabc(text) - 1;
    } else if (gLcT() === "c") {
        i[1] = 0;
        i[2] = 0;
        for (i[0] = 1; i[0] <= text.length; i[0] += 1) {
            if (text.charAt(text.length - i[0]) === "(") {
                i[1] += 1;
                if (i[1] === i[2]) {
                    ret.i = text.length - i[0] - 1;
                    break;
                }
            } else if (text.charAt(text.length - i[0]) === ")") {
                i[2] += 1;
            }
        }
    }
    ret.b = text.charAt(ret.i) === nSym;
    if (!ret.b) {
        ret.i += 1;
    }
    return ret;
}//getNegationIndex//returns object
function gBId(a) {
    'use strict';
    switch (a) {
    case nSym:
        return "negB";
    case cSym:
        return "conB";
    case dSym:
        return "disB";
    case iSym:
        return "impB";
    case iiSym:
        return "iimpB";
    case bSym:
        return "bimB";
    }
}
function addtI(Sym) {
    'use strict';
    var text = document.getElementById("input");
    if (gLcT(Sym) === "n" && gLcT() !== "s") {
        if (gLcT() === "n") {
            deleteN(1);
        } else if (gLcT() === "o") {
            text.innerHTML += nSym;
        } else {
            if (gNI().b) {
                text.innerHTML = text.innerHTML.substring(0, gNI().i) + text.innerHTML.substring(gNI().i + 1);
            } else {
                text.innerHTML = text.innerHTML.substring(0, gNI().i) + nSym + text.innerHTML.substring(gNI().i);
            }
        }
    } else {
        if (gLcT(Sym) === "s" && gLcT() === "s") {//ChangeOpe
            text.innerHTML = text.innerHTML.substring(0, text.innerHTML.length - 1);
        }
        text.innerHTML += Sym;
        document.getElementById("input2").innerHTML = "";
        nL = "p";
        document.getElementById("letB").innerHTML = nL;
    }
    disaB();
    if (gLcT(Sym) === "s") {
        document.getElementById(gBId(Sym)).disabled = true;
    }
    adjust();
}
function deleteN(numb) {//Delete the specified number of characters
    'use strict';
    document.getElementById("input").innerHTML = document.getElementById("input").innerHTML.slice(0, document.getElementById("input").innerHTML.length - numb);
    if (document.getElementById("input").innerHTML === "") {
        document.getElementById("input2").innerHTML = "Insertar frase";
        aDM();
    }
    nL = "p";
    document.getElementById("letB").innerHTML = nL;
    disaB();
    adjust();
}
function gPnL() {//getPossibleNewLetters
    'use strict';
    var nLs = oL(gNoL(document.getElementById("input").innerHTML, true)).length,
        ret = oL(gNoL(document.getElementById("input").innerHTML, true)),
        abc = /[abcdefghijklmnopqrstuvwxyz]/,
        text = document.getElementById("input").innerHTML;
    //console.info("text.substring(0, text.length - chtR() = " + text.substring(0, text.length - chtR()));
    if (text.substring(0, text.length - chtR()).search(text.substring(text.length - chtR())) !== -1) {
        if (Math.floor(nLs / 26) !== 0) {
            ret.push(gLfI(nLs) + Math.floor(nLs / 26));
        } else {
            ret.push(gLfI(nLs));
        }
    }
    return ret;
}
function lIoabc(str) {
    'use strict';
    var i = [],
        abc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    i[1] = [-1];
    for (i[0] = 0; i[0] < abc.length; i[0] += 1) {
        if (str.search(abc[i[0]]) !== -1) {
            i[1].push(str.lastIndexOf(abc[i[0]]));
        }
    }
    //console.warn(i[1]);
    while (i[1].length > 1) {
        i[1].splice(i[1].indexOf(Math.min(i[1][0], i[1][1])), 1);
    }
    //console.error(i[1]);
    return i[1][0];
}
function chtR() {//chars to remove
    'use strict';
    var i = [],
        ret = document.getElementById("input").innerHTML.charAt(document.getElementById("input").innerHTML.length - 1),
        abc = /[abcdefghijklmnopqrstuvwxyz]/;
    if ((uregExp(ret) !== -1) || (ret.indexOf("(") !== -1) || (ret.indexOf(")") !== -1) || (ret.indexOf(nSym) !== -1)) {
        return 0;
    } else {
        ret = document.getElementById("input").innerHTML;
        return ret.substring(lIoabc(ret)).length;
    }
}
function lttr(l) {//Write letter
    'use strict';
    var text = document.getElementById("input"),
        Pl;
    deleteN(chtR());
    //console.info(text.innerHTML);
    text.innerHTML += l;
    document.getElementById("input2").innerHTML = "";
    Pl = gPnL();
    //console.info(Pl);
    if (Pl.indexOf(l) === Pl.length - 1) {
        nL = Pl[0];
    } else {
        nL = Pl[Pl.indexOf(l) + 1];
    }
    document.getElementById("letB").innerHTML = nL;
    disaB();
    adjust();
}
function sDM() {
    'use strict';
    clearTimeout(ints[0]);
    ints[0] = setTimeout(function () {
        clearInterval(ints[1]);
        ints[1] = setInterval(deleteN, 75, 1);
        ints[2] = true;
    }, 400);
    if (!delB.disabled) {
        if (vOr) {
            delB.style.transform = "scale(2)";
        } else {
            delB.style.transform = "scale(1.1)";
        }
    }
}
function aDM() {
    'use strict';
    clearTimeout(ints[0]);
    clearInterval(ints[1]);
    if (!delB.disabled) {
        delB.style.transform = "scale(1)";
    }
    ints[2] = false;
}
//main
function gcE(i3, i4) {
    'use strict';
    var i = [];
    for (i[0] = 0; i[0] < bI.length; i[0] += 1) {
        if (i3[i[0]] > bI[i4].s) {
            return i[0];
        }
    }
}
function ren(i3, i4, i7) {
    'use strict';
    var i = [];
    i[3] = i3;
    i[4] = i4;
    i[7] = i7;
    i[9] = 0;
    i[0] = gcE(i3, i4);
    for (i[8] = i[4] + 1; i[8] < bI.length; i[8] += 1) {
        if (bI[i[8]].s < i[3][i[0] + i[7]] && bI[i[8]].s > bI[i[4]].s) {
            i[9] += 1;
        }
    }
    if (i[7] < i[9]) {
        return ren(i3, i4, i[7] + 1);
    } else if (i[7] === i[9]) {
        return i[7];
    }
}
function gNnb(cbI) {
    'use strict';
    var i = [],
        ret = 0;
    for (i[0] = cbI + 1; i[0] < bI.length; i[0] += 1) {
        if (bI[i[0]].e < bI[cbI].e) {
            ret += 1;
        } else {
            break;
        }
    }
    return ret;
}
function cN0nb(sI) {
    'use strict';
    var i = [],
        check = 1,
        bIsI,
        stringc = string,
        str;
    //console.info(bI);
    bIsI = bI[sI];
    str = "(" + stringc.substring(bIsI.s + 1, bIsI.e) + ")";
    //console.error("Starting cN0nb debug...");
    //console.info("Params are: sI = " + sI + ", stringc = " + stringc);
    //console.info("global expression is:");
    //console.info("uregExp('(' + str.substring(uregExp(str) + 1) + ')')");
    //console.info("str = " + str);
    //console.info("uregExp(str) = " + uregExp(str));
    //console.info("str.substring(uregExp(str) + 1) = " + str.substring(uregExp(str) + 1));
    //console.info("uregExp('(' + str.substring(uregExp(str) + 1) + ')') = " + uregExp('(' + str.substring(uregExp(str) + 1) + ')'));
    if (uregExp("(" + str.substring(uregExp(str) + 1) + ")") !== -1) {
        //console.info("As found 2 uregExp matches:");
        //console.info("stringc = " + stringc);
        i[0] = stringc.substring(0, bIsI.s + 1);
        i[1] = "(";
        //console.info("str.substring(1, uregExp('(' + str.substring(uregExp('(' + str + ')') + 1) + ')') + uregExp('(' + str + ')')) = " + (str.substring(1, uregExp("(" + str.substring(uregExp(str) + 1) + ")") + uregExp(str))));
        //console.info("('(' + str.substring(uregExp('(' + str + ')') + 1) + ')') = " + ("(" + str.substring(uregExp(str) + 1) + ")"));
        //console.info("uregExp('(' + str.substring(uregExp('(' + str + ')') + 1) + ')') = " + (uregExp("(" + str.substring(uregExp(str) + 1) + ")")));
        //console.warn("(str.substring(1, uregExp('(' + str.substring(uregExp('(' + str + ') + 1) + ')') + uregExp('(' + str + ')')) = " + (str.substring(1, uregExp("(" + str.substring(uregExp(str) + 1) + ")") + uregExp(str))));
        i[2] = str.substring(1, uregExp("(" + str.substring(uregExp(str) + 1) + ")") + uregExp(str));
        i[3] = ")";
        i[4] = str.substring(uregExp("(" + str.substring(uregExp(str) + 1) + ")") + uregExp(str), str.length - 1);
        i[5] = stringc.substring(bIsI.e);
        //console.info("stringc = " + stringc);
        //console.info(bIsI.e);
        //console.info("0 = " + i[0]);
        //console.info("1 = " + i[1]);
        //console.info("2 = " + i[2]);
        //console.info("3 = " + i[3]);
        //console.info("4 = " + i[4]);
        //console.info("5 = " + i[5]);
        //console.info("Total = " + i[0] + i[1] + i[2] + i[3] + i[4] + i[5]);
        string = i[0] + i[1] + i[2] + i[3] + i[4] + i[5];
        //console.error(string + "; returning true");
        return true;
    }
    string = stringc;
    oInput = stringc;
    //console.error(string + "; returning false");
    return false;
}
function uregExp(str, fnson) {//Search for the operators in the string
    'use strict';
    var i = [],
        oP = [cSym, dSym, iSym, iiSym, bSym],
        ret = [],
        retf;
    for (i[0] = 0; i[0] < oP.length; i[0] += 1) {
        if (nest(str, true)[1] !== undefined) {
            if (nest(str, true)[1].s <= 2) {
                if (str.substring(nest(str, true)[1].e + 1, nest(str, true)[1].e + 2).search(oP[i[0]]) !== -1) {
                    if (fnson !== undefined) {
                        return i[0];
                    }
                    ret[i[0]] = str.substring(nest(str, true)[1].e + 1, nest(str, true)[1].e + 2).search(oP[i[0]]) + nest(str, true)[1].e + 1;
                }
            } else {
                if (str.substring(nest(str, true)[1].s - 1, nest(str, true)[1].s).search(oP[i[0]]) !== -1) {
                    if (fnson !== undefined) {
                        return i[0];
                    }
                    ret[i[0]] = str.substring(nest(str, true)[1].s - 1, nest(str, true)[1].s).search(oP[i[0]]) + nest(str, true)[1].s - 1;
                }
            }
        } else {
            if (str.search(oP[i[0]]) !== -1) {
                if (fnson !== undefined) {
                    return i[0];
                }
                ret[i[0]] = str.search(oP[i[0]]);
            }
        }
    }
    for (i[0] = 0; i[0] < ret.length; i[0] += 1) {
        if (ret[i[0]] !== undefined) {
            if (retf !== undefined) {
                retf = Math.min(retf, ret[i[0]]);
            } else {
                retf = ret[i[0]];
            }
        }
    }
    if (retf === undefined) {
        retf = -1;
    }
    return retf;
}//unicode regExp search
function gNoL(str, rl) {//getNumberofLetters from str (string)
    'use strict';
    var i = [],
        ret = str,
        abc = /[abcdefghijklmnopqrstuvwxyz]/,
        larr = [];
    i[0] = false;
    //console.error("STarting gNoL debug...");
    while (i[0] === false) {
        if (uregExp(ret) !== -1) {
            ret = ret.replace(ret.charAt(uregExp(ret)), "");
        } else if (ret.indexOf("(") !== -1) {
            ret = ret.replace("(", "");
        } else if (ret.indexOf(")") !== -1) {
            ret = ret.replace(")", "");
        } else if (ret.indexOf(nSym) !== -1) {
            ret = ret.replace(ret.charAt(ret.indexOf(nSym)), "");
        } else {
            ret = ret.replace(/ /g, "");
            i[0] = true;
        }
    }
    //console.info("  Characters were deleted;");
    //console.info("  New array is: '" + ret + "'");
    if (ret.search(abc) !== -1) {
        i[1] = [ret.search(abc)];
        i[3] = ret;
        for (i[2] = 1; true; i[2] += 1) {
            if (ret.substring(i[1][i[2] - 1] + 1).search(abc) !== -1) {
                i[1][i[2]] = ret.substring(i[1][i[2] - 1] + 1).search(abc) + i[1][i[2] - 1] + 1;
            } else {
                break;
            }
        }
        //console.info("  i[1] was settle; now i[1] = ");
        //console.info(i[1]);
        for (i[4] = i[1].length - 1; i[4] >= 0; i[4] -= 1) {
            ret = ret.substring(0, i[1][i[4]]) + "$$" + ret.substring(i[1][i[4]]);
        }
        //console.info("  ret was prepared to slice; now ret = " + ret);
        ret = ret.substring(2);
        //console.info("  ret was cropped; now ret = " + ret);
        larr = ret.split("$$");
        //console.info("  ret was spliced into larr; now larr = ");
        //console.info("  " + larr);
        if (rl === true) {
            //console.info("  returning larr...");
            return larr;
        }
        //console.info("  returning larr.length; (" + larr.length + ")");
        return larr.length;
    } else {
        console.error("No letters were found");//Call error    }
    }
}
function Nester(i, n, o, p, q) {
    'use strict';
    this.n = n;
    this.o = o;
    this.p = p;
    if (o !== "n") {
        this.q = q;
    }
    this.i = i;
}
function gPs(str, ix) {
    'use strict';
    var i = [],
        ret = [],
        s = (str.charAt(0) === "(") ? 1 : 0;
    //console.warn("Starting gPs debug...");
    //console.info("Params are: str = " + str + ", ix = " + ix);
    ret = [str.substring(s, uregExp(str)), str.substring(uregExp(str) + 1, str.length - s)];
    //console.info("ret = " + ret);
    for (i[0] = 0; i[0] < ret.length; i[0] += 1) {
        //console.info("Setting part " + i[0] + ":");
        if (ret[i[0]].search(nSym) === 0) {
            //console.info("As found the nSym:");
            ret[i[0]] = new Nester(ix + (uregExp(str) * i[0]) + ((i[0] + 1) % 2), ret[i[0]], "n", nson(ret[i[0]].substring(1)));
            //console.info("ret[" + i[0] + "] = " + ret[i[0]]);
        } else {
            //console.info("As no nSym were found:");
            ret[i[0]] = nson(ret[i[0]], ix + (uregExp(str) * i[0]) + ((i[0] + 1) % 2));
            //console.info("ret[" + i[0] + "] = " + ret[i[0]]);
        }
    }
    //console.info("Returning ret");
    return ret;
}
function fOpItoLetter(OpI) {
    'use strict';
    switch (OpI) {
    case 0:
        return "c";
    case 1:
        return "d";
    case 2:
        return "i";
    case 3:
        return "ii";
    case 4:
        return "b";
    case -1:
        return -1;
    }
}
function gLfI(I) {
    'use strict';
    switch (I) {
    case 0:
        return "p";
    case 1:
        return "q";
    case 2:
        return "r";
    case 3:
        return "s";
    case 4:
        return "t";
    case 5:
        return "u";
    case 6:
        return "v";
    case 7:
        return "w";
    case 8:
        return "x";
    case 9:
        return "y";
    case 10:
        return "z";
    case 11:
        return "a";
    case 12:
        return "b";
    case 13:
        return "c";
    case 14:
        return "d";
    case 15:
        return "e";
    case 16:
        return "f";
    case 17:
        return "g";
    case 18:
        return "h";
    case 19:
        return "i";
    case 20:
        return "j";
    case 21:
        return "k";
    case 22:
        return "l";
    case 23:
        return "m";
    case 24:
        return "n";
    case 25:
        return "o";
    }
}
function gIfsL(l) {
    'use strict';
    switch (l) {
    case "p":
        return 0;
    case "q":
        return 1;
    case "r":
        return 2;
    case "s":
        return 3;
    case "t":
        return 4;
    case "u":
        return 5;
    case "v":
        return 6;
    case "w":
        return 7;
    case "x":
        return 8;
    case "y":
        return 9;
    case "z":
        return 10;
    case "a":
        return 11;
    case "b":
        return 12;
    case "c":
        return 13;
    case "d":
        return 14;
    case "e":
        return 15;
    case "f":
        return 16;
    case "g":
        return 17;
    case "h":
        return 18;
    case "i":
        return 19;
    case "j":
        return 20;
    case "k":
        return 21;
    case "l":
        return 22;
    case "m":
        return 23;
    case "n":
        return 24;
    case "o":
        return 25;
    }
}
function gIfcL(ln) {//getIndexfromLeter
    'use strict';
    if (ln.length === 1) {
        return gIfsL(ln);
    } else {
        return gIfsL(ln) + 26 * Number(ln.substring(1));
    }
}
function oL(arr, w) {//Order letters from array
    'use strict';
    var i = [],
        ret = [];
    for (i[0] = 0; i[0] < arr.length - 1; i[0] += 1) {
        for (i[1] = i[0] + 1; i[1] < arr.length; i[1] += 1) {
            if (arr[i[0]] === arr[i[1]]) {
                arr.splice(i[1], 1);
                i[1] -= 1;
            }
        }
    }
    for (i[2] = 0; i[2] < arr.length; i[2] += 1) {
        if (i[2] < 26) {
            ret[i[2]] = gLfI(i[2]);
        } else {
            ret[i[2]] = gLfI(i[2]) + Math.floor(i[2] / 26);
        }
    }
    return ret;
}
function gAltP(I) {
    'use strict';
    return Math.pow(2, ls.length - I - 1);
}
function Param(name) {
    'use strict';
    var i = [],
        nm = (name.charAt(0) !== "(") ? name : name.substring(1, name.length - 1);
    this.n = nm;
    this.i = gIfcL(nm);
    this.v = [];
    if (ls.length === 1) {
        this.v = [false, true];
    } else {
        for (i[0] = 0; i[0] < Math.pow(2, ls.length); i[0] += 1) {
            this.v[i[0]] = (i[0] % (gAltP(gIfcL(nm)) * 2)) >= (gAltP(gIfcL(nm)));
        }
    }
}
function nson(str, ix) {
    'use strict';
    var ret = {}, p, q, o, n, i;
    //console.warn("Starting nson debug...");
    //console.info("Params are: str = " + str + ", ix = " + ix);
    if (fOpItoLetter(uregExp(str, true)) === -1) {
        //console.info("As param creating param: ");
        ret = new Param(str);
        //console.info(ret);
        return ret;
    } else {
        //console.info("As nester creating nester");
        n = str.substring(1, str.length - 1);
        o = fOpItoLetter(uregExp(str, true));
        i = ix;
        //console.info("n = " + n);
        //console.info("o = " + o);
        //console.info("uregExp(str) = " + uregExp(str));
        //console.info("i = " + i);
        ret = gPs(str, i);
        p = ret[0];
        q = ret[1];
        //console.info("p = ");
        //console.info(p);
        //console.info("q = ");
        //console.info(q);
    }
    ret = new Nester(i, n, o, p, q);
    //console.info("ret = ");
    //console.info(ret);
    return ret;
}
function nest(str, al) {
    'use strict';
    var i = [];
    string = str;
    bI = [];
    i[3] = [];
    if (string.indexOf("(") !== -1) {
        bI[0] = {s: string.indexOf("("), e: undefined};
        i[1] = 1;
        //Setting bI
        for (i[0] = 1; true; i[0] += 1) {
            if (string.substring(bI[i[0] - 1].s + 1).indexOf("(") !== -1) {
                bI[i[0]] = {s: string.substring(bI[i[0] - 1].s + 1).indexOf("(") + bI[i[0] - 1].s + 1, e: undefined};
                i[1] += 1;
            } else {
                break;
            }
        }
        //Settled bI's starts
        i[3][0] = string.indexOf(")");
        for (i[2] = 1; i[2] < bI.length; i[2] += 1) {
            i[3][i[2]] = string.substring(i[3][i[2] - 1] + 1).indexOf(")") + i[3][i[2] - 1] + 1;
        }
        if (bI.length === i[3].length) {
            for (i[4] = 0; i[4] < bI.length; i[4] += 1) {
                bI[i[4]].e = i[3][ren(i[3], i[4], 0) + gcE(i[3], i[4])];
            }
        } else {
            console.error("Unclosed bracket in input");//Call error
        }
        //Settled bI's endings
        //Settled bI
        if (al !== undefined) {
            return bI;
        } else {
            for (i[5] = 0; i[5] < bI.length; i[5] += 1) {
                for (i[6] = i[5] + 1; i[6] < bI.length; i[6] += 1) {
                    if (bI[i[5]].s === bI[i[6]].s - 1 && bI[i[5]].e === bI[i[6]].e + 1) {
                        oInput = oInput.substr(0, bI[i[6]].e) + oInput.substring(bI[i[6]].e + 1);
                        oInput = oInput.substr(0, bI[i[6]].s) + oInput.substring(bI[i[6]].s + 1);
                        bI = nest(oInput, true);
                    }
                }
            }
            i[13] = bI.length;
            for (i[11] = 0; i[11] < i[13]; i[11] += 1) {
                //console.info("LOOP; i[11] = " + i[11]);
                i[12] = cN0nb(i[11]);
                //console.info("As " + i[12]);
                if (i[12]) {
                    //console.info("  Preparing bI");
                    //console.info(bI);
                    bI = nest(string, true);
                    //console.info(bI);
                    //console.info("  String now is: " + string);
                    i[11] -= 1;
                    i[13] += 1;
                } else {
                    //console.info("  Nothing happens");
                    //console.info("  String now is: " + string);
                    bI = nest(string, true);
                    //console.info(bI);
                }
            }
            //console.info("Final string = " + string);
            fInput = nson(string, 0);
            gSp(fInput);
            //console.info("fInput = ");
            //console.info(fInput);
            //console.info("fInput.o = " + fInput.o);
            fvA = solve(fInput);
            fSt = gSfA(fvA);
            i[0] = oSp(fInput);
            oS = i[0][0];
            vS = i[0][1];
            //console.info("oS = ");
            //console.info(oS);
            //console.info("vS = ");
            //console.info(vS);
            //console.info("final state: " + fvA);
            print();
        }
    } else {
        return bI;
    }
}
function process() {
    'use strict';
    pg = true;
    loadstart();
    oInput = "(" + document.getElementById("input").innerHTML + ")";
    oInput = oInput.replace(/ /g, "");
    //console.info("Spaces were deleted; New string is '" + oInput + "'");
    setTimeout(function () {
        ls = oL(gNoL(oInput, true));
        nest(oInput);
    }, 900);
}
function ope(o, p, q) {
    'use strict';
    switch (o) {
    case "c":
        return p && q;
    case "d":
        return p || q;
    case "i":
        return p <= q;
    case "ii":
        return p >= q;
    case "b":
        return p === q;
    case "n":
        return !p;
    }
}//Operate
function solve(obj) {//Do the logics
    'use strict';
    var i = [],
        p,
        ret = [];
    //console.info("solve; obj = " + obj);
    if (obj === undefined) {
        return [];
    }
    if (obj.constructor === Param) {
        return obj.v;
    } else if (obj.constructor === Nester) {
        obj.v = [];
        i[1] = solve(obj.p);
        i[2] = solve(obj.q);
        for (i[0] = 0; i[0] < Math.pow(2, ls.length); i[0] += 1) {
            obj.v[i[0]] = ope(obj.o, i[1][i[0]], i[2][i[0]]);
        }
    }
    return obj.v;
}//Do the logics
function gSp(obj, oSi) {
    'use strict';
    var i = [],
        ret = {},
        oSil = (oSi !== undefined) ? oSi : 0;
    //console.info("gSp");
    if (obj.constructor === Nester) {
        gSp(obj.p);
        if (obj.q !== undefined) {
            gSp(obj.q);
        }
        if (obj.o !== "n") {
            obj.i = uregExp("(" + obj.n + ")") + obj.i - 1;
        }
    }
}//getSolvingParts
function oSp(obj) {
    'use strict';
    var i = [],
        reti = [],
        retv = [];
    //console.error("Starting oSp debug; obj =");
    //console.info(obj);
    if (obj.constructor === Nester) {
        if (obj.p.constructor === Nester) {
            i[0] = oSp(obj.p);
            for (i[1] = 0; i[1] < i[0][0].length; i[1] += 1) {
                reti.push(i[0][0][i[1]]);
                retv.push(i[0][1][i[1]]);
            }
        }
        if (obj.q !== undefined) {
            if (obj.q.constructor === Nester) {
                i[2] = oSp(obj.q);
                for (i[3] = 0; i[3] < i[2][0].length; i[3] += 1) {
                    reti.push(i[2][0][i[3]]);
                    retv.push(i[2][1][i[3]]);
                }
            }
        }
        reti.push(obj.i);
        retv.push(obj.v);
        //console.info(obj);
        //console.info(reti);
        //console.info(retv);
    }
    //console.info([reti, retv]);
    return [reti, retv];
}//order solving parts
function gSfA(Arr) {//getStatefromArray
    'use strict';
    var i = [];
    i[1] = Arr[0];
    i[2] = Arr[0];
    for (i[0] = 1; i[0] < Arr.length; i[0] += 1) {
        i[1] = i[1] && Arr[i[0]];
        i[2] = i[2] || Arr[i[0]];
    }
    if (i[1]) {
        return true;
    } else if (!i[2]) {
        return false;
    } else {
        return undefined;
    }
}//getStatefromArray
function gCfS(Stat) {
    'use strict';
    switch (Stat) {
    case true:
        return "#d5ffc5";
    case undefined:
        return "#fdfbe0";
    case false:
        return "#fddcdc";
    }
}
function loadstart() {
    'use strict';
    var i = [];
    //console.error("loadstart");
    testB.innerHTML = "";
    testB.style.transition = "all 0.5s ease-out";
    i[0] = Math.max(window.innerHeight, window.innerWidth) / nfU(getComputedStyle(testB).height) * 2.5;
    testB.style.transform = "scale(" + i[0] + ")";
    setTimeout(function () {
        testB.style.transition = "all 0.2s ease-out";
        document.getElementById("loadblank").style.display = "block";
        testB.style.transform = "scale(1)";
    }, 500);
}
function widthatI(I, n) {
    'use strict';
    var i = [],
        calc = document.createElement("div"),
        calce = document.createElement("div"),
        calcc = document.createElement("div"),
        calcn = document.createElement("div");
    //console.info("")
    calc.className = "calc";
    calce.className = "calc";
    calcc.className = "calc";
    calcn.className = "calc";
    calc.innerHTML = oInput.substring(1, I);
    calce.innerHTML = "";
    calcc.innerHTML = oInput.substring(I, I + 1);
    calcn.innerHTML = n;
    calc.appendChild(calce);
    calc.appendChild(calcc);
    calc.appendChild(calcn);
    document.body.appendChild(calc);
    i[0] = nfU(getComputedStyle(calce).width);
    i[1] = nfU(getComputedStyle(calc).width) - i[0];
    i[4] = nfU(getComputedStyle(calcn).width);
    i[2] = (nfU(getComputedStyle(calcc).width) - i[4]) / 2;
    i[3] = i[1] + i[2];
    document.body.removeChild(calc);
    return i[3];
}//width at Index (Calculating left margin of indexes)
function print() {
    'use strict';
    var i = [],
        odiv = document.createElement("div"),
        table = document.createElement("table"),
        thead = document.createElement("div"),
        tdiv = document.createElement("div"),
        legend = document.createElement("div"),
        legtxt = document.createElement("p"),
        restartB = document.createElement("button");
    odiv.id = "odiv";
    table.id = "table";
    thead.id = "thead";
    tdiv.id = "tdiv";
    restartB.id = "restartB";
    restartB.className = "button";
    document.body.appendChild(restartB);
    legend.id = "legend";
    legtxt.id = "legtxt";
    legtxt.innerHTML = oInput.substring(1, oInput.length - 1);
    tdiv.style.height = "0px";
    document.getElementById("outputholder").appendChild(legend);
    for (i[0] = 0; i[0] < oS.length; i[0] += 1) {
        window["i" + (i[0] + 1)] = document.createElement("div");
        window["i" + (i[0] + 1)].id = "i" + (i[0] + 1);
        window["i" + (i[0] + 1)].className = "legn";
        window["i" + (i[0] + 1)].innerHTML = (i[0] + 1);
        legend.appendChild(window["i" + (i[0] + 1)]);
        window["i" + (i[0] + 1)].style.left = (widthatI(oS[i[0]] + 1, (i[0] + 1)) + 4) + "px";
        window["i" + (i[0] + 1)].style.top = (i[0] % 2) + "px";
    }
    legend.appendChild(legtxt);
    ER = document.createElement("tr");
    ER.id = "ER";
    table.appendChild(thead);
    table.appendChild(tdiv);
    thead.appendChild(ER);
    for (i[0] = 0; i[0] < ls.length; i[0] += 1) {
        window["E" + i[0]] = document.createElement("th");
        window["E" + i[0]].id = "E" + i[0];
        window["E" + i[0]].className = "TabName";
        window["E" + i[0]].innerHTML = ls[i[0]];
        window["E" + i[0]].className = "lE";
        ER.appendChild(window["E" + i[0]]);
        window["cPar" + ls[i[0]]] = new Param(ls[i[0]]);
        window["cPar" + ls[i[0]]] = window["cPar" + ls[i[0]]].v;
    }
    for (i[0] = 0; i[0] < oS.length; i[0] += 1) {
        window["N" + i[0]] = document.createElement("th");
        window["N" + i[0]].id = "N" + i[0];
        window["N" + i[0]].className = "TabName";
        window["N" + i[0]].innerHTML = i[0] + 1;
        ER.appendChild(window["N" + i[0]]);
    }
    for (i[0] = 0; i[0] < Math.pow(2, ls.length); i[0] += 1) {
        window["R" + i[0]] = document.createElement("tr");
        for (i[1] = 0; i[1] < ls.length; i[1] += 1) {
            window["l" + i[1] + "f" + i[0]] = document.createElement("td");
            window["l" + i[1] + "f" + i[0]].id = "l" + i[1] + "f" + i[0];
            window["l" + i[1] + "f" + i[0]].className = "celll";
            window["l" + i[1] + "f" + i[0] + "p"] = document.createElement("p");
            window["l" + i[1] + "f" + i[0] + "p"].id = "l" + i[1] + "f" + i[0] + "p";
            window["l" + i[1] + "f" + i[0] + "p"].className = "ptd celllp";
            window["l" + i[1] + "f" + i[0] + "p"].innerHTML = (window["cPar" + ls[i[1]]][i[0]]) ? "V" : "F";
            window["l" + i[1] + "f" + i[0]].appendChild(window["l" + i[1] + "f" + i[0] + "p"]);
            window["R" + i[0]].appendChild(window["l" + i[1] + "f" + i[0]]);
        }
        for (i[1] = 0; i[1] < vS.length; i[1] += 1) {
            window["c" + i[1] + "f" + i[0]] = document.createElement("td");
            window["c" + i[1] + "f" + i[0]].id = "c" + i[1] + "f" + i[0];
            window["c" + i[1] + "f" + i[0]].className = "cellc";
            window["c" + i[1] + "f" + i[0] + "p"] = document.createElement("p");
            window["c" + i[1] + "f" + i[0] + "p"].id = "c" + i[1] + "f" + i[0] + "p";
            window["c" + i[1] + "f" + i[0] + "p"].className = "ptd";
            window["c" + i[1] + "f" + i[0] + "p"].innerHTML = (vS[i[1]][i[0]]) ? "V" : "F";
            window["c" + i[1] + "f" + i[0]].appendChild(window["c" + i[1] + "f" + i[0] + "p"]);
            window["R" + i[0]].appendChild(window["c" + i[1] + "f" + i[0]]);
        }
        tdiv.appendChild(window["R" + i[0]]);
    }
    odiv.appendChild(table);
    document.getElementById("outputholder").appendChild(odiv);
    document.getElementById("inputholder").style.display = "none";
    document.getElementById("outputholder").style.display = "block";
    tt = true;
    pg = false;
    printcss();
} //print the table