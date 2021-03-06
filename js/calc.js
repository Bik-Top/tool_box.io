/**
 *21.11.2014                           15:15
 *   Project name: tool_box
 *           File:  calc
 **/
'use strict';

window.onload = function () {

    window.addEventListener('resize', resizer, false);

    (function () {

        var a;
        a           = document.createElement('a');
        a.className = 'button';
        a.appendChild(document.createTextNode('����� ����'));
        a.href      = '#';

        a.style.MozBorderRadius = a.style.WebkitBorderRadius = a.style.borderRadius = '8px';
        a.style.border         = '2px groove green';
        a.style.display        = 'block';
        a.style.height         = '30px';
        a.style.lineHeight     = '30px';
        a.style.width          = '100px';
        a.style.textDecoration = 'none';
        a.style.textAlign      = 'center';
        a.style.color          = 'red';
        a.style.fontWeight     = 'bold';

        var div = document.body.children[0];
        div.appendChild(a);

    }());

};

var arr      = [],
    createEl = (function (tag, selectors, styls) {
        return {
            criateTag   : function (tag) {
                document.createElement(tag)
            },
            setSelectors: function (selectors) {
                if (Object.prototype.toString.call(selectors) === "[object Object]") {
                    console.log("[object Object]")
                }
                else if (Object.prototype.toString.call(selectors) === "[object String]") {
                    console.log("[object String]")
                }
            },
            setStyle    : function () {
                if (Object.prototype.toString.call(selectors) === "[object Object]") {
                    console.log(" setStyle [object Object]")
                }
                else if (Object.prototype.toString.call(selectors) === "[object String]") {
                    console.log(" setStyle [object String]")
                }
            }
        }
    }());

var trig = 0, trig2 = 0;
//var as   = setInterval(anime, 120);
function anime() {

    console.clear();
    if (trig === 1) {
        console.log('%c /\\\*/\\ helo', "color: #FF0;background: #5A5A5A;font-size: 14pt;font-style: italic; margin-left: 20%;border: solid 1px #f00; ");
        trig = 0;
        trig2 += 1;
    }
    else {
        console.log('%c \\\*/\\\*/ hi', "color: #FF0;background: #5A5A5A;font-size: 14pt;font-style: italic; margin-left: 20%;border: solid 1px #f00; ");
        trig = 1;
        trig2 += 1;
    }

}
/**
 *
 * @param e
 * @returns {*}
 */
function resizer(e) {
    var width, height, nod, writen, start, stop;

    arr.push(e.timeStamp);
    start  = arr[0];
    arr[1] = e.timeStamp;
    arr    = arr.slice(arr.length - 2);
    stop   = arr[1];

    width  = window.innerWidth;
    height = window.innerHeight;
    nod    = document.querySelector('.result');
    writen = new Result('div', nod);
    return writen.init('width:' + width + '  height:' + height);
}

/**
 *
 * @param tag
 * @param nod
 * @returns {{el: Element, init: Function}}
 * @constructor
 */
function Result(tag, nod) {
    this.tag = tag;
    this.nod = nod;

    return {
        el  : document.createElement(tag),
        init: function (text) {
            this.el.textContent = text;
            nod.appendChild(this.el);

        }
    };
}

/**
 *
 * @param elem
 * @returns {{top: number, left: number}}
 */
function getOffsetRect(elem) {
    var left, top, clientLeft, clientTop, scrollLeft, scrollTop, docElem, body, box;

    box = elem.getBoundingClientRect();

    body    = document.body;
    docElem = document.documentElement;

    scrollTop  = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    clientTop  = docElem.clientTop || body.clientTop || 0;
    clientLeft = docElem.clientLeft || body.clientLeft || 0;

    top  = box.top + scrollTop - clientTop;
    left = box.left + scrollLeft - clientLeft;

    return {
        top : Math.round(top),
        left: Math.round(left)
    }
}

(function () {
    var match = document.cookie.match('(?:^|;)\\s*gauid=([^;]*)');
    var gauid = (match) ? decodeURIComponent(match[1]) : null;
    if (gauid) {
        dataLayer.push({'customerID': gauid});
    }
})();

(function () {
    var match = document.cookie.match('(?:^|;)\\s*_ga=([^;]*)');
    var raw   = (match) ? decodeURIComponent(match[1]) : null;
    if (raw) {
        match = raw.match(/(\d+\.\d+)$/);
    }
    var gacid = (match) ? match[1] : null;
    if (gacid) {
        dataLayer.push({'GAClientID': gacid});
    }
})();

function listener(event) {

    if (event.data.action == 'xmlhttp') {

        var url = event.data.url;

        var checkPart = String(event.origin).substr(-1 - String(document.domain).length);

        if (checkPart != '.' + document.domain && checkPart != '/' + document.domain) {
            return;
        }

        var getXmlHttp = function () {
            var xmlhttp;
            try {
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    xmlhttp = false;
                }
            }
            if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
                xmlhttp = new XMLHttpRequest();
            }
            return xmlhttp;
        };

        var xmlhttp                = getXmlHttp();

        xmlhttp.open('GET', url, true);
        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    window.top.postMessage(xmlhttp.responseText, event.origin);
                }
            }
        };
        xmlhttp.send(null);
    }
}

function iframeStorage(e) {

    if (e.data.action == 'setItem') {

        window.localStorage.setItem(e.data.item_name, e.data.item_value);

    } else if (e.data.action == 'clear') {

        window.localStorage.clear();

    } else if (e.data.action == 'getStorage') {

        var data = [];

        for (var name in window.localStorage) {

            var item = {};

            item['item_name'] = name;

            item['item_value'] = window.localStorage[name];

            data.push(item);

        }

        window.top.postMessage(JSON.stringify(data), e.origin);

    } else if (e.data.action == 'delStorage') {

        if (window.localStorage[e.data.item_name] != undefined) {

            delete window.localStorage[e.data.item_name];

        }
    }
}

if (window.addEventListener) {
    window.addEventListener("message", listener, false);
    window.addEventListener("message", iframeStorage, false);
} else {
    window.attachEvent("onmessage", listener);
    window.attachEvent("onmessage", iframeStorage);
}

