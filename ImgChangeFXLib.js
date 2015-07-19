//implement at the end of the document

/**
    usage: div with "ImageDrawer" class.
    
        optional attributes:
            folder:optional folder of the imgs' location
            files:the images (kinda required but yeah...)
            time:the time between the shift of 2 imgs in ms (default: 5000)
            automate: if set to false, this script won't do anything to the div (default:true)
*/

var elements = document.getElementsByClassName("ImgFX"),  element, folder = "", files, imgs = [], time = 5000, speed = 800, fileString, curImage = 0, buttons = [], isChanging = false, curTimeOut, isActive = true;
var parent;
var libName = "ImgChangeFXLib";

function moveImage(parent) {
    "use strict";
    var oldImage = document.getElementById("autoImage"), newImage = document.getElementById("newImage"), miliSeconds = 10, k = (parseInt(parent.offsetWidth, 10) / speed) * miliSeconds;
    newImage.style.top = oldImage.style.top;
    oldImage.style.left = (parseInt(oldImage.offsetLeft, 10) - k) + "px";
    newImage.style.left = (parseInt(newImage.offsetLeft, 10) - k) + "px";
    if (oldImage.offsetLeft > -oldImage.offsetWidth) {
        setTimeout(function () {moveImage(parent); }, miliSeconds);
    } else {
        parent.removeChild(oldImage);
        newImage.style.left = "0px";
        newImage.style.position = "relative";
        newImage.setAttribute("ID", "autoImage");
    }
    isChanging = false;
}

function prepareImage(image, parent) {
    "use strict";
    image.setAttribute("ID", "newImage");
    image.style.left = "100%";
    image.style.top = "0%";
    image.style.position = "absolute";
    return image;
}
    
function changeImages(parent, number) {
    "use strict";
    if (isActive) {
        if (document.getElementById("autoImage") !== null) {
            isChanging = true;
            buttons[curImage].style.opacity = "0.5";
            if (typeof number === 'undefined') {
                curImage += 1;
                if (curImage === imgs.length) {
                    curImage = 0;
                }
            } else {
                curImage = number;
            }
            buttons[curImage].style.opacity = "1.0";
            parent.appendChild(prepareImage(imgs[curImage]), parent);
            var oldImage = document.getElementById("autoImage"), newImage = document.getElementById("newImage");
            moveImage(parent);
            curTimeOut = setTimeout(function () {changeImages(parent); }, time + speed + 100);
        } else {
            buttons[0].style.opacity = 100;
            imgs[0].style.left = "0px";
            imgs[0].setAttribute("ID", "autoImage");
            element.appendChild(imgs[0]);
            curTimeOut = setTimeout(function () {changeImages(parent); }, time + 100);
        }
        
    }
}

function getFunction(parent, i) {
    "use strict";
    return function () {
        if (curImage !== i && !isChanging) {
            clearTimeout(curTimeOut);
            changeImages(parent, i);
        }
    };
}

function getBarForElement(parent, length) {
    "use strict";
    var i, ul = document.createElement("UL"), button, li;
    ul.style.position = "absolute";
    ul.style.bottom = "0px";
    ul.style.padding = "0px";
    ul.style.width = "100%";
    ul.style.margin = "0 auto";
    ul.style.zIndex = "4";
    ul.style.display = "inline-block";
    ul.listStyle = "none";
    
    for (i = 0; i < length; i += 1) {
        li = document.createElement("LI");
        li.style.display = "inline-block";
        li.style.height = "100%";
        button = document.createElement("DIV");
        button.style.backgroundColor = "#FFF";
        button.style.opacity = "0.5";
        button.style.height = "15px";
        button.style.width = button.style.height;
        li.style.marginLeft = button.style.width;
        li.style.marginRight = li.style.marginLeft;
        button.style.borderRadius = "100px";
        button.addEventListener("click", getFunction(parent, i), false);
        buttons.push(button);
        li.appendChild(button);
        ul.appendChild(li);
    }
    parent.appendChild(ul);
}

function main() {
    "use strict";
    var i, j, width;
    for (i = 0; i < elements.length; i += 1) {
        element = elements[i];
        width = element.offsetWidth;
        element.style.overflow = "hidden";
        element.style.textAlign = "center";
        if (element.hasAttribute("folder")) {
            folder = element.getAttribute("folder") + "/";
        }
        if (element.hasAttribute("imgs")) {
            fileString = element.getAttribute("imgs");
            files = fileString.split(";");
        } else {
            /*jslint browser: true, devel: true */
            alert(name + ": required imgs attribute wasn't defined!");
            return;
        }
        if (element.hasAttribute("time")) {
            time = element.getAttribute("time");
        }
        if (element.hasAttribute("automate")) {
            if (element.getAttribute("automate") === "false") {
                return;
            }
        }
        if (element.hasAttribute("speed")) {
            speed = parseInt(element.getAttribute("speed"), 10);
        }
        for (j = 0; j < files.length; j += 1) {
            imgs.push(document.createElement("IMG"));
            imgs[j].setAttribute("STYLE", "position:relative;top:0px;width:100%;height:100%;");
            imgs[j].setAttribute("SRC", folder + files[j]);
        }
        getBarForElement(element, imgs.length);
        changeImages(element);
    }
}

function onActivate() {
    "use strict";
    isActive = true;
    changeImages(element);
    console.log("onActivate");
}

function onDeactivate() {
    "use strict";
    isActive = false;
    clearTimeout(curTimeOut);
    console.log("onDeactivate");
}

main();

window.onfocus = onActivate;

window.onblur = onDeactivate;