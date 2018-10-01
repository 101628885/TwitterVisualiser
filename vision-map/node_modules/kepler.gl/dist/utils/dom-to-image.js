'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var util = newUtil(); // Copyright (c) 2018 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

/**
 * This file is copied from https://github.com/tsayen/dom-to-image
 * Modified by heshan0131 to allow loading external stylesheets and inline webfonts
 */

var inliner = newInliner();
var fontFaces = newFontFaces();
var images = newImages();

// Default impl options
var defaultOptions = {
  // Default is to fail on error, no placeholder
  imagePlaceholder: undefined,
  // Default cache bust is false, it will use the cache
  cacheBust: false
};

var domtoimage = {
  toSvg: toSvg,
  toPng: toPng,
  toJpeg: toJpeg,
  toBlob: toBlob,
  toPixelData: toPixelData,
  impl: {
    fontFaces: fontFaces,
    images: images,
    util: util,
    inliner: inliner,
    options: {}
  }
};

/**
   * @param {Node} node - The DOM Node object to render
   * @param {Object} options - Rendering options
   * @param {Function} options.filter - Should return true if passed node should be included in the output
   *          (excluding node means excluding it's children as well). Not called on the root node.
   * @param {String} options.bgcolor - color for the background, any valid CSS color value.
   * @param {Number} options.width - width to be applied to node before rendering.
   * @param {Number} options.height - height to be applied to node before rendering.
   * @param {Object} options.style - an object whose properties to be copied to node's style before rendering.
   * @param {Number} options.quality - a Number between 0 and 1 indicating image quality (applicable to JPEG only),
              defaults to 1.0.
    * @param {String} options.imagePlaceholder - dataURL to use as a placeholder for failed images, default behaviour is to fail fast on images we can't fetch
    * @param {Boolean} options.cacheBust - set to true to cache bust by appending the time to the request url
    * @return {Promise} - A promise that is fulfilled with a SVG image data URL
    * */
function toSvg(node, options) {
  options = options || {};
  copyOptions(options);
  return Promise.resolve(node).then(function (nd) {
    return cloneNode(nd, options.filter, true);
  }).then(embedFonts).then(inlineImages).then(applyOptions).then(function (clone) {
    return makeSvgDataUri(clone, options.width || util.width(node), options.height || util.height(node));
  });

  function applyOptions(clone) {
    if (options.bgcolor) clone.style.backgroundColor = options.bgcolor;

    if (options.width) clone.style.width = options.width + 'px';
    if (options.height) clone.style.height = options.height + 'px';

    if (options.style) Object.keys(options.style).forEach(function (property) {
      clone.style[property] = options.style[property];
    });

    return clone;
  }
}

/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a Uint8Array containing RGBA pixel data.
 * */
function toPixelData(node, options) {
  return draw(node, options || {}).then(function (canvas) {
    return canvas.getContext('2d').getImageData(0, 0, util.width(node), util.height(node)).data;
  });
}

/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a PNG image data URL
 * */
function toPng(node, options) {
  return draw(node, options || {}).then(function (canvas) {
    return canvas.toDataURL();
  });
}

/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a JPEG image data URL
 * */
function toJpeg(node, options) {
  options = options || {};
  return draw(node, options).then(function (canvas) {
    return canvas.toDataURL('image/jpeg', options.quality || 1.0);
  });
}

/**
 * @param {Node} node - The DOM Node object to render
 * @param {Object} options - Rendering options, @see {@link toSvg}
 * @return {Promise} - A promise that is fulfilled with a PNG image blob
 * */
function toBlob(node, options) {
  return draw(node, options || {}).then(util.canvasToBlob);
}

function copyOptions(options) {
  // Copy options to impl options for use in impl
  if (typeof options.imagePlaceholder === 'undefined') {
    domtoimage.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
  } else {
    domtoimage.impl.options.imagePlaceholder = options.imagePlaceholder;
  }

  if (typeof options.cacheBust === 'undefined') {
    domtoimage.impl.options.cacheBust = defaultOptions.cacheBust;
  } else {
    domtoimage.impl.options.cacheBust = options.cacheBust;
  }
}

function draw(domNode, options) {
  return toSvg(domNode, options).then(util.makeImage).then(util.delay(100)).then(function (image) {
    var canvas = newCanvas(domNode);
    canvas.getContext('2d').drawImage(image, 0, 0);
    return canvas;
  });

  function newCanvas(dNode) {
    var canvas = _window.document.createElement('canvas');
    canvas.width = options.width || util.width(dNode);
    canvas.height = options.height || util.height(dNode);

    if (options.bgcolor) {
      var ctx = canvas.getContext('2d');
      ctx.fillStyle = options.bgcolor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    return canvas;
  }
}

function cloneNode(node, filter, root) {
  if (!root && filter && !filter(node)) {
    return Promise.resolve();
  }

  return Promise.resolve(node).then(makeNodeCopy).then(function (clone) {
    return cloneChildren(node, clone, filter);
  }).then(function (clone) {
    return processClone(node, clone);
  });

  function makeNodeCopy(nd) {
    if (nd instanceof _window.HTMLCanvasElement) {
      return util.makeImage(nd.toDataURL());
    }
    return nd.cloneNode(false);
  }

  function cloneChildren(original, clone, flt) {
    var children = original.childNodes;
    if (children.length === 0) {
      return Promise.resolve(clone);
    }

    return cloneChildrenInOrder(clone, util.asArray(children)).then(function () {
      return clone;
    });

    function cloneChildrenInOrder(parent, arrChildren) {
      var done = Promise.resolve();
      arrChildren.forEach(function (child) {
        done = done.then(function () {
          return cloneNode(child, flt);
        }).then(function (childClone) {
          if (childClone) parent.appendChild(childClone);
        });
      });
      return done;
    }
  }

  function processClone(original, clone) {
    if (!(clone instanceof _window.Element)) {
      return clone;
    };

    return Promise.resolve().then(cloneStyle).then(clonePseudoElements).then(copyUserInput).then(fixSvg).then(function () {
      return clone;
    });

    function cloneStyle() {
      var originalStyle = _window2.default.getComputedStyle(original);
      copyStyle(originalStyle, clone.style);
      function copyStyle(source, target) {
        if (source.cssText) {
          target.cssText = source.cssText;
          // add additional copy of composite styles
          if (source.font) {
            target.font = source.font;
          }
        } else {
          copyProperties(source, target);
        }
        function copyProperties(sourceStyle, targetStyle) {
          var propertyKeys = util.asArray(sourceStyle);
          propertyKeys.forEach(function (name) {
            targetStyle.setProperty(name, sourceStyle.getPropertyValue(name), sourceStyle.getPropertyPriority(name));
          });
        }
      }
    }

    function clonePseudoElements() {
      [':before', ':after'].forEach(function (element) {
        return clonePseudoElement(element);
      });

      function clonePseudoElement(element) {
        var style = _window2.default.getComputedStyle(original, element);
        var content = style.getPropertyValue('content');

        if (content === '' || content === 'none') {
          return;
        }

        var className = util.uid();
        clone.className = clone.className + ' ' + className;
        var styleElement = _window.document.createElement('style');
        styleElement.appendChild(formatPseudoElementStyle(className, element, style));
        clone.appendChild(styleElement);

        function formatPseudoElementStyle(cln, elm, stl) {
          var selector = '.' + cln + ':' + elm;
          var cssText = stl.cssText ? formatCssText(stl) : formatCssProperties(stl);
          return _window.document.createTextNode(selector + '{' + cssText + '}');

          function formatCssText(stl1) {
            var cnt = stl1.getPropertyValue('content');
            return stl.cssText + ' content: ' + cnt + ';';
          }

          function formatCssProperties(stl2) {
            return util.asArray(stl2).map(formatProperty).join('; ') + ';';

            function formatProperty(name) {
              return name + ':' + stl.getPropertyValue(name) + (stl.getPropertyPriority(name) ? ' !important' : '');
            }
          }
        }
      }
    }

    function copyUserInput() {
      if (original instanceof _window.HTMLTextAreaElement) clone.innerHTML = original.value;
      if (original instanceof _window.HTMLInputElement) clone.setAttribute('value', original.value);
    }

    function fixSvg() {
      if (!(clone instanceof _window.SVGElement)) return;
      clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

      if (!(clone instanceof _window.SVGRectElement)) return;
      ['width', 'height'].forEach(function (attribute) {
        var value = clone.getAttribute(attribute);
        if (!value) return;

        clone.style.setProperty(attribute, value);
      });
    }
  }
}

function embedFonts(node) {
  return fontFaces.resolveAll().then(function (cssText) {
    var styleNode = _window.document.createElement('style');
    node.appendChild(styleNode);
    styleNode.appendChild(_window.document.createTextNode(cssText));
    return node;
  });
}

function inlineImages(node) {
  return images.inlineAll(node).then(function () {
    return node;
  });
}

function makeSvgDataUri(node, width, height) {
  return Promise.resolve(node).then(function (nd) {
    nd.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml');
    return new _window.XMLSerializer().serializeToString(nd);
  }).then(util.escapeXhtml).then(function (xhtml) {
    return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + '</foreignObject>';
  }).then(function (foreignObject) {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' + foreignObject + '</svg>';
  }).then(function (svg) {
    return 'data:image/svg+xml;charset=utf-8,' + svg;
  });
}

function newUtil() {
  return {
    escape: escape,
    parseExtension: parseExtension,
    mimeType: mimeType,
    dataAsUrl: dataAsUrl,
    isDataUrl: isDataUrl,
    isSrcAsDataUrl: isSrcAsDataUrl,
    canvasToBlob: canvasToBlob,
    resolveUrl: resolveUrl,
    getAndEncode: getAndEncode,
    uid: uid(),
    delay: delay,
    asArray: asArray,
    escapeXhtml: escapeXhtml,
    makeImage: makeImage,
    width: width,
    height: height
  };

  function mimes() {
    /*
            * Only WOFF and EOT mime types for fonts are 'real'
            * see http://www.iana.org/assignments/media-types/media-types.xhtml
            */
    var WOFF = 'application/font-woff';
    var JPEG = 'image/jpeg';

    return {
      woff: WOFF,
      woff2: WOFF,
      ttf: 'application/font-truetype',
      eot: 'application/vnd.ms-fontobject',
      png: 'image/png',
      jpg: JPEG,
      jpeg: JPEG,
      gif: 'image/gif',
      tiff: 'image/tiff',
      svg: 'image/svg+xml'
    };
  }

  function parseExtension(url) {
    var match = /\.([^\.\/]*?)$/g.exec(url);
    if (match) {
      return match[1];
    }
    return '';
  }

  function mimeType(url) {
    var extension = parseExtension(url).toLowerCase();
    return mimes()[extension] || '';
  }

  function isDataUrl(url) {
    return url.search(/^(data:)/) !== -1;
  }

  function isSrcAsDataUrl(text) {
    var DATA_URL_REGEX = /url\(['"]?(data:)([^'"]+?)['"]?\)/;

    return text.search(DATA_URL_REGEX) !== -1;
  }
  function cvToBlob(canvas) {
    return new Promise(function (resolve) {
      var binaryString = _window2.default.atob(canvas.toDataURL().split(',')[1]);
      var length = binaryString.length;
      var binaryArray = new Uint8Array(length);

      for (var i = 0; i < length; i++) {
        binaryArray[i] = binaryString.charCodeAt(i);
      }resolve(new _window.Blob([binaryArray], { type: 'image/png' }));
    });
  }

  function canvasToBlob(canvas) {
    if (canvas.toBlob) return new Promise(function (resolve) {
      canvas.toBlob(resolve);
    });

    return cvToBlob(canvas);
  }

  function resolveUrl(url, baseUrl) {
    var doc = _window.document.implementation.createHTMLDocument();
    var base = doc.createElement('base');
    doc.head.appendChild(base);
    var a = doc.createElement('a');
    doc.body.appendChild(a);
    base.href = baseUrl;
    a.href = url;
    return a.href;
  }

  function fourRandomChars() {
    /* see http://stackoverflow.com/a/6248722/2519373 */
    return ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
  }

  function uid() {
    var index = 0;

    return function () {
      return 'u' + fourRandomChars() + index++;
    };
  }

  function makeImage(uri) {
    return new Promise(function (resolve, reject) {
      var image = new _window.Image();
      image.onload = function () {
        resolve(image);
      };
      image.onerror = reject;
      image.src = uri;
    });
  }

  function getAndEncode(url) {
    var TIMEOUT = 30000;
    if (domtoimage.impl.options.cacheBust) {
      // Cache bypass so we dont have CORS issues with cached images
      // Source: https://developer.mozilla.org/en/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest#Bypassing_the_cache
      url += (/\?/.test(url) ? '&' : '?') + new Date().getTime();
    }

    return new Promise(function (resolve) {
      var request = new _window.XMLHttpRequest();

      request.onreadystatechange = done;
      request.ontimeout = timeout;
      request.responseType = 'blob';
      request.timeout = TIMEOUT;
      request.open('GET', url, true);
      request.send();

      var placeholder = void 0;
      if (domtoimage.impl.options.imagePlaceholder) {
        var split = domtoimage.impl.options.imagePlaceholder.split(/,/);
        if (split && split[1]) {
          placeholder = split[1];
        }
      }

      function done() {
        if (request.readyState !== 4) return;

        if (request.status !== 200) {
          if (placeholder) {
            resolve(placeholder);
          } else {
            fail('cannot fetch resource: ' + url + ', status: ' + request.status);
          }

          return;
        }

        var encoder = new _window.FileReader();
        encoder.onloadend = function () {
          var content = encoder.result.split(/,/)[1];
          resolve(content);
        };
        encoder.readAsDataURL(request.response);
      }

      function timeout() {
        if (placeholder) {
          resolve(placeholder);
        } else {
          fail('timeout of ' + TIMEOUT + 'ms occured while fetching resource: ' + url);
        }
      }

      function fail(message) {
        _window.console.error(message);
        resolve('');
      }
    });
  }

  function dataAsUrl(content, type) {
    return 'data:' + type + ';base64,' + content;
  }

  function escape(string) {
    return string.replace(/([.*+?^${}()|\[\]\/\\])/g, '\\$1');
  }

  function delay(ms) {
    return function (arg) {
      return new Promise(function (resolve) {
        (0, _window.setTimeout)(function () {
          resolve(arg);
        }, ms);
      });
    };
  }

  function asArray(arrayLike) {
    var array = [];
    var length = arrayLike.length;
    for (var i = 0; i < length; i++) {
      array.push(arrayLike[i]);
    }return array;
  }

  function escapeXhtml(string) {
    return string.replace(/#/g, '%23').replace(/\n/g, '%0A');
  }

  function width(node) {
    var leftBorder = px(node, 'border-left-width');
    var rightBorder = px(node, 'border-right-width');
    return node.scrollWidth + leftBorder + rightBorder;
  }

  function height(node) {
    var topBorder = px(node, 'border-top-width');
    var bottomBorder = px(node, 'border-bottom-width');
    return node.scrollHeight + topBorder + bottomBorder;
  }

  function px(node, styleProperty) {
    var value = _window2.default.getComputedStyle(node).getPropertyValue(styleProperty);
    return parseFloat(value.replace('px', ''));
  }
}

function newInliner() {
  var URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;

  return {
    inlineAll: inlineAll,
    shouldProcess: shouldProcess,
    impl: {
      readUrls: readUrls,
      inline: inline
    }
  };

  function shouldProcess(string) {
    return string.search(URL_REGEX) !== -1;
  }

  function readUrls(string) {
    var result = [];
    var match = void 0;
    while ((match = URL_REGEX.exec(string)) !== null) {
      result.push(match[1]);
    }
    return result.filter(function (url) {
      return !util.isDataUrl(url);
    });
  }

  function inline(string, url, baseUrl, get) {
    return Promise.resolve(url).then(function (ul) {
      return baseUrl ? util.resolveUrl(ul, baseUrl) : ul;
    }).then(get || util.getAndEncode).then(function (data) {
      return util.dataAsUrl(data, util.mimeType(url));
    }).then(function (dataUrl) {
      return string.replace(urlAsRegex(url), '$1' + dataUrl + '$3');
    });

    function urlAsRegex(url0) {
      return new RegExp('(url\\([\'"]?)(' + util.escape(url0) + ')([\'"]?\\))', 'g');
    }
  }

  function inlineAll(string, baseUrl, get) {
    if (nothingToInline() || util.isSrcAsDataUrl(string)) {
      return Promise.resolve(string);
    }
    return Promise.resolve(string).then(readUrls).then(function (urls) {
      var done = Promise.resolve(string);
      urls.forEach(function (url) {
        done = done.then(function (str) {
          return inline(str, url, baseUrl, get);
        });
      });
      return done;
    });

    function nothingToInline() {
      return !shouldProcess(string);
    }
  }
}

function newFontFaces() {
  return {
    resolveAll: resolveAll,
    impl: { readAll: readAll }
  };

  function resolveAll() {
    return readAll(_window.document).then(function (webFonts) {
      return Promise.all(webFonts.map(function (webFont) {
        return webFont.resolve();
      }));
    }).then(function (cssStrings) {
      return cssStrings.join('\n');
    });
  }

  function readAll() {
    return Promise.resolve(util.asArray(_window.document.styleSheets)).then(loadExternalStyleSheets).then(getCssRules).then(selectWebFontRules).then(function (rules) {
      return rules.map(newWebFont);
    });

    function selectWebFontRules(cssRules) {
      return cssRules.filter(function (rule) {
        return rule.type === _window.CSSRule.FONT_FACE_RULE;
      }).filter(function (rule) {
        return inliner.shouldProcess(rule.style.getPropertyValue('src'));
      });
    }

    function loadExternalStyleSheets(styleSheets) {
      return Promise.all(styleSheets.map(function (sheet) {
        if (sheet.href) {
          return (0, _window.fetch)(sheet.href, { credentials: 'omit' }).then(toText).then(setBaseHref(sheet.href)).then(toStyleSheet).catch(function (err) {
            // Handle any error that occurred in any of the previous
            // promises in the chain.
            _window.console.log(err);
            return sheet;
          });
        }
        return Promise.resolve(sheet);
      }));

      function toText(response) {
        return response.text();
      }

      function setBaseHref(base) {
        base = base.split('/');
        base.pop();
        base = base.join('/');

        return function (text) {
          return util.isSrcAsDataUrl(text) ? text : text.replace(/url\(['"]?([^'"]+?)['"]?\)/g, addBaseHrefToUrl);
        };

        function addBaseHrefToUrl(match, p1) {
          var url = /^http/i.test(p1) ? p1 : concatAndResolveUrl(base, p1);
          return 'url(\'' + url + '\')';
        }

        // Source: http://stackoverflow.com/a/2676231/3786856
        function concatAndResolveUrl(url, concat) {
          var url1 = url.split('/');
          var url2 = concat.split('/');
          var url3 = [];
          for (var i = 0, l = url1.length; i < l; i++) {
            if (url1[i] === '..') {
              url3.pop();
            } else if (url1[i] !== '.') {
              url3.push(url1[i]);
            }
          }
          for (var _i = 0, _l = url2.length; _i < _l; _i++) {
            if (url2[_i] === '..') {
              url3.pop();
            } else if (url2[_i] !== '.') {
              url3.push(url2[_i]);
            }
          }
          return url3.join('/');
        }
      }

      function toStyleSheet(text) {
        var doc = _window.document.implementation.createHTMLDocument('');
        var styleElement = _window.document.createElement('style');

        styleElement.textContent = text;
        doc.body.appendChild(styleElement);

        return styleElement.sheet;
      }
    }

    function getCssRules(styleSheets) {
      var cssRules = [];
      styleSheets.forEach(function (sheet) {
        if (sheet.cssRules && (0, _typeof3.default)(sheet.cssRules) === 'object') {
          try {
            util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
          } catch (e) {
            _window.console.log('Error while reading CSS rules from ' + sheet.href, e.toString());
          }
        } else {
          _window.console.log('getCssRules can not fint cssRules');
        }
      });
      return cssRules;
    }

    function newWebFont(webFontRule) {
      return {
        resolve: function resolve() {
          var baseUrl = (webFontRule.parentStyleSheet || {}).href;
          return inliner.inlineAll(webFontRule.cssText, baseUrl);
        },
        src: function src() {
          return webFontRule.style.getPropertyValue('src');
        }
      };
    }
  }
}

function newImages() {
  return {
    inlineAll: inlineAll,
    impl: {
      newImage: newImage
    }
  };

  function newImage(element) {
    return {
      inline: inline
    };

    function inline(get) {
      if (util.isDataUrl(element.src)) {
        return Promise.resolve();
      }
      return Promise.resolve(element.src).then(get || util.getAndEncode).then(function (data) {
        return util.dataAsUrl(data, util.mimeType(element.src));
      }).then(function (dataUrl) {
        return new Promise(function (resolve, reject) {
          element.onload = resolve;
          element.onerror = reject;
          element.src = dataUrl;
        });
      });
    }
  }

  function inlineAll(node) {
    if (!(node instanceof _window.Element)) {
      return Promise.resolve(node);
    }

    return inlineBackground(node).then(function () {
      if (node instanceof _window.HTMLImageElement) {
        return newImage(node).inline();
      }
      return Promise.all(util.asArray(node.childNodes).map(function (child) {
        return inlineAll(child);
      }));
    });

    function inlineBackground(nd) {
      var background = nd.style.getPropertyValue('background');

      if (!background) {
        return Promise.resolve(nd);
      }

      return inliner.inlineAll(background).then(function (inlined) {
        nd.style.setProperty('background', inlined, nd.style.getPropertyPriority('background'));
      }).then(function () {
        return nd;
      });
    }
  }
}

exports.default = domtoimage;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9kb20tdG8taW1hZ2UuanMiXSwibmFtZXMiOlsidXRpbCIsIm5ld1V0aWwiLCJpbmxpbmVyIiwibmV3SW5saW5lciIsImZvbnRGYWNlcyIsIm5ld0ZvbnRGYWNlcyIsImltYWdlcyIsIm5ld0ltYWdlcyIsImRlZmF1bHRPcHRpb25zIiwiaW1hZ2VQbGFjZWhvbGRlciIsInVuZGVmaW5lZCIsImNhY2hlQnVzdCIsImRvbXRvaW1hZ2UiLCJ0b1N2ZyIsInRvUG5nIiwidG9KcGVnIiwidG9CbG9iIiwidG9QaXhlbERhdGEiLCJpbXBsIiwib3B0aW9ucyIsIm5vZGUiLCJjb3B5T3B0aW9ucyIsIlByb21pc2UiLCJyZXNvbHZlIiwidGhlbiIsImNsb25lTm9kZSIsIm5kIiwiZmlsdGVyIiwiZW1iZWRGb250cyIsImlubGluZUltYWdlcyIsImFwcGx5T3B0aW9ucyIsIm1ha2VTdmdEYXRhVXJpIiwiY2xvbmUiLCJ3aWR0aCIsImhlaWdodCIsImJnY29sb3IiLCJzdHlsZSIsImJhY2tncm91bmRDb2xvciIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwicHJvcGVydHkiLCJkcmF3IiwiY2FudmFzIiwiZ2V0Q29udGV4dCIsImdldEltYWdlRGF0YSIsImRhdGEiLCJ0b0RhdGFVUkwiLCJxdWFsaXR5IiwiY2FudmFzVG9CbG9iIiwiZG9tTm9kZSIsIm1ha2VJbWFnZSIsImRlbGF5IiwibmV3Q2FudmFzIiwiZHJhd0ltYWdlIiwiaW1hZ2UiLCJkTm9kZSIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImN0eCIsImZpbGxTdHlsZSIsImZpbGxSZWN0Iiwicm9vdCIsIm1ha2VOb2RlQ29weSIsImNsb25lQ2hpbGRyZW4iLCJwcm9jZXNzQ2xvbmUiLCJIVE1MQ2FudmFzRWxlbWVudCIsIm9yaWdpbmFsIiwiZmx0IiwiY2hpbGRyZW4iLCJjaGlsZE5vZGVzIiwibGVuZ3RoIiwiY2xvbmVDaGlsZHJlbkluT3JkZXIiLCJhc0FycmF5IiwicGFyZW50IiwiYXJyQ2hpbGRyZW4iLCJkb25lIiwiY2hpbGQiLCJjaGlsZENsb25lIiwiYXBwZW5kQ2hpbGQiLCJFbGVtZW50IiwiY2xvbmVTdHlsZSIsImNsb25lUHNldWRvRWxlbWVudHMiLCJjb3B5VXNlcklucHV0IiwiZml4U3ZnIiwib3JpZ2luYWxTdHlsZSIsIndpbmRvdyIsImdldENvbXB1dGVkU3R5bGUiLCJjb3B5U3R5bGUiLCJzb3VyY2UiLCJ0YXJnZXQiLCJjc3NUZXh0IiwiZm9udCIsImNvcHlQcm9wZXJ0aWVzIiwic291cmNlU3R5bGUiLCJ0YXJnZXRTdHlsZSIsInByb3BlcnR5S2V5cyIsInNldFByb3BlcnR5IiwibmFtZSIsImdldFByb3BlcnR5VmFsdWUiLCJnZXRQcm9wZXJ0eVByaW9yaXR5IiwiY2xvbmVQc2V1ZG9FbGVtZW50IiwiZWxlbWVudCIsImNvbnRlbnQiLCJjbGFzc05hbWUiLCJ1aWQiLCJzdHlsZUVsZW1lbnQiLCJmb3JtYXRQc2V1ZG9FbGVtZW50U3R5bGUiLCJjbG4iLCJlbG0iLCJzdGwiLCJzZWxlY3RvciIsImZvcm1hdENzc1RleHQiLCJmb3JtYXRDc3NQcm9wZXJ0aWVzIiwiY3JlYXRlVGV4dE5vZGUiLCJzdGwxIiwiY250Iiwic3RsMiIsIm1hcCIsImZvcm1hdFByb3BlcnR5Iiwiam9pbiIsIkhUTUxUZXh0QXJlYUVsZW1lbnQiLCJpbm5lckhUTUwiLCJ2YWx1ZSIsIkhUTUxJbnB1dEVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJTVkdFbGVtZW50IiwiU1ZHUmVjdEVsZW1lbnQiLCJnZXRBdHRyaWJ1dGUiLCJhdHRyaWJ1dGUiLCJyZXNvbHZlQWxsIiwic3R5bGVOb2RlIiwiaW5saW5lQWxsIiwiWE1MU2VyaWFsaXplciIsInNlcmlhbGl6ZVRvU3RyaW5nIiwiZXNjYXBlWGh0bWwiLCJ4aHRtbCIsImZvcmVpZ25PYmplY3QiLCJzdmciLCJlc2NhcGUiLCJwYXJzZUV4dGVuc2lvbiIsIm1pbWVUeXBlIiwiZGF0YUFzVXJsIiwiaXNEYXRhVXJsIiwiaXNTcmNBc0RhdGFVcmwiLCJyZXNvbHZlVXJsIiwiZ2V0QW5kRW5jb2RlIiwibWltZXMiLCJXT0ZGIiwiSlBFRyIsIndvZmYiLCJ3b2ZmMiIsInR0ZiIsImVvdCIsInBuZyIsImpwZyIsImpwZWciLCJnaWYiLCJ0aWZmIiwidXJsIiwibWF0Y2giLCJleGVjIiwiZXh0ZW5zaW9uIiwidG9Mb3dlckNhc2UiLCJzZWFyY2giLCJ0ZXh0IiwiREFUQV9VUkxfUkVHRVgiLCJjdlRvQmxvYiIsImJpbmFyeVN0cmluZyIsImF0b2IiLCJzcGxpdCIsImJpbmFyeUFycmF5IiwiVWludDhBcnJheSIsImkiLCJjaGFyQ29kZUF0IiwiQmxvYiIsInR5cGUiLCJiYXNlVXJsIiwiZG9jIiwiaW1wbGVtZW50YXRpb24iLCJjcmVhdGVIVE1MRG9jdW1lbnQiLCJiYXNlIiwiaGVhZCIsImEiLCJib2R5IiwiaHJlZiIsImZvdXJSYW5kb21DaGFycyIsIk1hdGgiLCJyYW5kb20iLCJwb3ciLCJ0b1N0cmluZyIsInNsaWNlIiwiaW5kZXgiLCJ1cmkiLCJyZWplY3QiLCJJbWFnZSIsIm9ubG9hZCIsIm9uZXJyb3IiLCJzcmMiLCJUSU1FT1VUIiwidGVzdCIsIkRhdGUiLCJnZXRUaW1lIiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib25yZWFkeXN0YXRlY2hhbmdlIiwib250aW1lb3V0IiwidGltZW91dCIsInJlc3BvbnNlVHlwZSIsIm9wZW4iLCJzZW5kIiwicGxhY2Vob2xkZXIiLCJyZWFkeVN0YXRlIiwic3RhdHVzIiwiZmFpbCIsImVuY29kZXIiLCJGaWxlUmVhZGVyIiwib25sb2FkZW5kIiwicmVzdWx0IiwicmVhZEFzRGF0YVVSTCIsInJlc3BvbnNlIiwibWVzc2FnZSIsImNvbnNvbGUiLCJlcnJvciIsInN0cmluZyIsInJlcGxhY2UiLCJtcyIsImFyZyIsImFycmF5TGlrZSIsImFycmF5IiwicHVzaCIsImxlZnRCb3JkZXIiLCJweCIsInJpZ2h0Qm9yZGVyIiwic2Nyb2xsV2lkdGgiLCJ0b3BCb3JkZXIiLCJib3R0b21Cb3JkZXIiLCJzY3JvbGxIZWlnaHQiLCJzdHlsZVByb3BlcnR5IiwicGFyc2VGbG9hdCIsIlVSTF9SRUdFWCIsInNob3VsZFByb2Nlc3MiLCJyZWFkVXJscyIsImlubGluZSIsImdldCIsInVsIiwidXJsQXNSZWdleCIsImRhdGFVcmwiLCJ1cmwwIiwiUmVnRXhwIiwibm90aGluZ1RvSW5saW5lIiwidXJscyIsInN0ciIsInJlYWRBbGwiLCJhbGwiLCJ3ZWJGb250cyIsIndlYkZvbnQiLCJjc3NTdHJpbmdzIiwic3R5bGVTaGVldHMiLCJsb2FkRXh0ZXJuYWxTdHlsZVNoZWV0cyIsImdldENzc1J1bGVzIiwic2VsZWN0V2ViRm9udFJ1bGVzIiwicnVsZXMiLCJuZXdXZWJGb250IiwiY3NzUnVsZXMiLCJydWxlIiwiQ1NTUnVsZSIsIkZPTlRfRkFDRV9SVUxFIiwic2hlZXQiLCJjcmVkZW50aWFscyIsInRvVGV4dCIsInNldEJhc2VIcmVmIiwidG9TdHlsZVNoZWV0IiwiY2F0Y2giLCJsb2ciLCJlcnIiLCJwb3AiLCJhZGRCYXNlSHJlZlRvVXJsIiwicDEiLCJjb25jYXRBbmRSZXNvbHZlVXJsIiwiY29uY2F0IiwidXJsMSIsInVybDIiLCJ1cmwzIiwibCIsInRleHRDb250ZW50IiwiYmluZCIsImUiLCJ3ZWJGb250UnVsZSIsInBhcmVudFN0eWxlU2hlZXQiLCJuZXdJbWFnZSIsImlubGluZUJhY2tncm91bmQiLCJIVE1MSW1hZ2VFbGVtZW50IiwiYmFja2dyb3VuZCIsImlubGluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUF5QkE7Ozs7OztBQW9CQSxJQUFNQSxPQUFPQyxTQUFiLEMsQ0E3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7O0FBMEJBLElBQU1DLFVBQVVDLFlBQWhCO0FBQ0EsSUFBTUMsWUFBWUMsY0FBbEI7QUFDQSxJQUFNQyxTQUFTQyxXQUFmOztBQUVB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LEtBQUgsQ0FBU2dFLG1CQUFULENBQTZCLFlBQTdCLENBSEY7QUFLRCxPQVJJLEVBU0o1RSxJQVRJLENBU0M7QUFBQSxlQUFNRSxFQUFOO0FBQUEsT0FURCxDQUFQO0FBVUQ7QUFDRjtBQUNGOztrQkFFY2QsVSIsImZpbGUiOiJkb20tdG8taW1hZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTggVWJlciBUZWNobm9sb2dpZXMsIEluYy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4vLyBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4vLyBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4vLyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4vLyBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbi8vIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG4vKipcbiAqIFRoaXMgZmlsZSBpcyBjb3BpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vdHNheWVuL2RvbS10by1pbWFnZVxuICogTW9kaWZpZWQgYnkgaGVzaGFuMDEzMSB0byBhbGxvdyBsb2FkaW5nIGV4dGVybmFsIHN0eWxlc2hlZXRzIGFuZCBpbmxpbmUgd2ViZm9udHNcbiAqL1xuXG5pbXBvcnQgd2luZG93LCB7XG4gIEJsb2IsXG4gIEltYWdlLFxuICBYTUxIdHRwUmVxdWVzdCxcbiAgRmlsZVJlYWRlcixcbiAgc2V0VGltZW91dCxcbiAgSFRNTElucHV0RWxlbWVudCxcbiAgSFRNTFRleHRBcmVhRWxlbWVudCxcbiAgSFRNTENhbnZhc0VsZW1lbnQsXG4gIFNWR0VsZW1lbnQsXG4gIEVsZW1lbnQsXG4gIEhUTUxJbWFnZUVsZW1lbnQsXG4gIFNWR1JlY3RFbGVtZW50LFxuICBkb2N1bWVudCxcbiAgWE1MU2VyaWFsaXplcixcbiAgY29uc29sZSxcbiAgQ1NTUnVsZSxcbiAgZmV0Y2hcbn0gZnJvbSAnZ2xvYmFsL3dpbmRvdyc7XG5cbmNvbnN0IHV0aWwgPSBuZXdVdGlsKCk7XG5jb25zdCBpbmxpbmVyID0gbmV3SW5saW5lcigpO1xuY29uc3QgZm9udEZhY2VzID0gbmV3Rm9udEZhY2VzKCk7XG5jb25zdCBpbWFnZXMgPSBuZXdJbWFnZXMoKTtcblxuLy8gRGVmYXVsdCBpbXBsIG9wdGlvbnNcbmNvbnN0IGRlZmF1bHRPcHRpb25zID0ge1xuICAvLyBEZWZhdWx0IGlzIHRvIGZhaWwgb24gZXJyb3IsIG5vIHBsYWNlaG9sZGVyXG4gIGltYWdlUGxhY2Vob2xkZXI6IHVuZGVmaW5lZCxcbiAgLy8gRGVmYXVsdCBjYWNoZSBidXN0IGlzIGZhbHNlLCBpdCB3aWxsIHVzZSB0aGUgY2FjaGVcbiAgY2FjaGVCdXN0OiBmYWxzZVxufTtcblxuY29uc3QgZG9tdG9pbWFnZSA9IHtcbiAgdG9TdmcsXG4gIHRvUG5nLFxuICB0b0pwZWcsXG4gIHRvQmxvYixcbiAgdG9QaXhlbERhdGEsXG4gIGltcGw6IHtcbiAgICBmb250RmFjZXMsXG4gICAgaW1hZ2VzLFxuICAgIHV0aWwsXG4gICAgaW5saW5lcixcbiAgICBvcHRpb25zOiB7fVxuICB9XG59O1xuXG4vKipcbiAgICogQHBhcmFtIHtOb2RlfSBub2RlIC0gVGhlIERPTSBOb2RlIG9iamVjdCB0byByZW5kZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBSZW5kZXJpbmcgb3B0aW9uc1xuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLmZpbHRlciAtIFNob3VsZCByZXR1cm4gdHJ1ZSBpZiBwYXNzZWQgbm9kZSBzaG91bGQgYmUgaW5jbHVkZWQgaW4gdGhlIG91dHB1dFxuICAgKiAgICAgICAgICAoZXhjbHVkaW5nIG5vZGUgbWVhbnMgZXhjbHVkaW5nIGl0J3MgY2hpbGRyZW4gYXMgd2VsbCkuIE5vdCBjYWxsZWQgb24gdGhlIHJvb3Qgbm9kZS5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuYmdjb2xvciAtIGNvbG9yIGZvciB0aGUgYmFja2dyb3VuZCwgYW55IHZhbGlkIENTUyBjb2xvciB2YWx1ZS5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMud2lkdGggLSB3aWR0aCB0byBiZSBhcHBsaWVkIHRvIG5vZGUgYmVmb3JlIHJlbmRlcmluZy5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMuaGVpZ2h0IC0gaGVpZ2h0IHRvIGJlIGFwcGxpZWQgdG8gbm9kZSBiZWZvcmUgcmVuZGVyaW5nLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5zdHlsZSAtIGFuIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIHRvIGJlIGNvcGllZCB0byBub2RlJ3Mgc3R5bGUgYmVmb3JlIHJlbmRlcmluZy5cbiAgICogQHBhcmFtIHtOdW1iZXJ9IG9wdGlvbnMucXVhbGl0eSAtIGEgTnVtYmVyIGJldHdlZW4gMCBhbmQgMSBpbmRpY2F0aW5nIGltYWdlIHF1YWxpdHkgKGFwcGxpY2FibGUgdG8gSlBFRyBvbmx5KSxcbiAgICAgICAgICAgICAgZGVmYXVsdHMgdG8gMS4wLlxuICAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuaW1hZ2VQbGFjZWhvbGRlciAtIGRhdGFVUkwgdG8gdXNlIGFzIGEgcGxhY2Vob2xkZXIgZm9yIGZhaWxlZCBpbWFnZXMsIGRlZmF1bHQgYmVoYXZpb3VyIGlzIHRvIGZhaWwgZmFzdCBvbiBpbWFnZXMgd2UgY2FuJ3QgZmV0Y2hcbiAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5jYWNoZUJ1c3QgLSBzZXQgdG8gdHJ1ZSB0byBjYWNoZSBidXN0IGJ5IGFwcGVuZGluZyB0aGUgdGltZSB0byB0aGUgcmVxdWVzdCB1cmxcbiAgICAqIEByZXR1cm4ge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggYSBTVkcgaW1hZ2UgZGF0YSBVUkxcbiAgICAqICovXG5mdW5jdGlvbiB0b1N2Zyhub2RlLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBjb3B5T3B0aW9ucyhvcHRpb25zKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShub2RlKVxuICAgIC50aGVuKG5kID0+IGNsb25lTm9kZShuZCwgb3B0aW9ucy5maWx0ZXIsIHRydWUpKVxuICAgIC50aGVuKGVtYmVkRm9udHMpXG4gICAgLnRoZW4oaW5saW5lSW1hZ2VzKVxuICAgIC50aGVuKGFwcGx5T3B0aW9ucylcbiAgICAudGhlbihjbG9uZSA9PlxuICAgICAgbWFrZVN2Z0RhdGFVcmkoXG4gICAgICAgIGNsb25lLFxuICAgICAgICBvcHRpb25zLndpZHRoIHx8IHV0aWwud2lkdGgobm9kZSksXG4gICAgICAgIG9wdGlvbnMuaGVpZ2h0IHx8IHV0aWwuaGVpZ2h0KG5vZGUpXG4gICAgICApXG4gICAgKTtcblxuICBmdW5jdGlvbiBhcHBseU9wdGlvbnMoY2xvbmUpIHtcbiAgICBpZiAob3B0aW9ucy5iZ2NvbG9yKSBjbG9uZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBvcHRpb25zLmJnY29sb3I7XG5cbiAgICBpZiAob3B0aW9ucy53aWR0aCkgY2xvbmUuc3R5bGUud2lkdGggPSBgJHtvcHRpb25zLndpZHRofXB4YDtcbiAgICBpZiAob3B0aW9ucy5oZWlnaHQpIGNsb25lLnN0eWxlLmhlaWdodCA9IGAke29wdGlvbnMuaGVpZ2h0fXB4YDtcblxuICAgIGlmIChvcHRpb25zLnN0eWxlKVxuICAgICAgT2JqZWN0LmtleXMob3B0aW9ucy5zdHlsZSkuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcbiAgICAgICAgY2xvbmUuc3R5bGVbcHJvcGVydHldID0gb3B0aW9ucy5zdHlsZVtwcm9wZXJ0eV07XG4gICAgICB9KTtcblxuICAgIHJldHVybiBjbG9uZTtcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIFRoZSBET00gTm9kZSBvYmplY3QgdG8gcmVuZGVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFJlbmRlcmluZyBvcHRpb25zLCBAc2VlIHtAbGluayB0b1N2Z31cbiAqIEByZXR1cm4ge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggYSBVaW50OEFycmF5IGNvbnRhaW5pbmcgUkdCQSBwaXhlbCBkYXRhLlxuICogKi9cbmZ1bmN0aW9uIHRvUGl4ZWxEYXRhKG5vZGUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGRyYXcobm9kZSwgb3B0aW9ucyB8fCB7fSkudGhlbihjYW52YXMgPT5cbiAgICBjYW52YXNcbiAgICAgIC5nZXRDb250ZXh0KCcyZCcpXG4gICAgICAuZ2V0SW1hZ2VEYXRhKDAsIDAsIHV0aWwud2lkdGgobm9kZSksIHV0aWwuaGVpZ2h0KG5vZGUpKS5kYXRhXG4gICk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtOb2RlfSBub2RlIC0gVGhlIERPTSBOb2RlIG9iamVjdCB0byByZW5kZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gUmVuZGVyaW5nIG9wdGlvbnMsIEBzZWUge0BsaW5rIHRvU3ZnfVxuICogQHJldHVybiB7UHJvbWlzZX0gLSBBIHByb21pc2UgdGhhdCBpcyBmdWxmaWxsZWQgd2l0aCBhIFBORyBpbWFnZSBkYXRhIFVSTFxuICogKi9cbmZ1bmN0aW9uIHRvUG5nKG5vZGUsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIGRyYXcobm9kZSwgb3B0aW9ucyB8fCB7fSkudGhlbihjYW52YXMgPT4gY2FudmFzLnRvRGF0YVVSTCgpKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgLSBUaGUgRE9NIE5vZGUgb2JqZWN0IHRvIHJlbmRlclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBSZW5kZXJpbmcgb3B0aW9ucywgQHNlZSB7QGxpbmsgdG9Tdmd9XG4gKiBAcmV0dXJuIHtQcm9taXNlfSAtIEEgcHJvbWlzZSB0aGF0IGlzIGZ1bGZpbGxlZCB3aXRoIGEgSlBFRyBpbWFnZSBkYXRhIFVSTFxuICogKi9cbmZ1bmN0aW9uIHRvSnBlZyhub2RlLCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICByZXR1cm4gZHJhdyhub2RlLCBvcHRpb25zKS50aGVuKGNhbnZhcyA9PiBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9qcGVnJywgb3B0aW9ucy5xdWFsaXR5IHx8IDEuMCkpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAtIFRoZSBET00gTm9kZSBvYmplY3QgdG8gcmVuZGVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFJlbmRlcmluZyBvcHRpb25zLCBAc2VlIHtAbGluayB0b1N2Z31cbiAqIEByZXR1cm4ge1Byb21pc2V9IC0gQSBwcm9taXNlIHRoYXQgaXMgZnVsZmlsbGVkIHdpdGggYSBQTkcgaW1hZ2UgYmxvYlxuICogKi9cbmZ1bmN0aW9uIHRvQmxvYihub2RlLCBvcHRpb25zKSB7XG4gIHJldHVybiBkcmF3KG5vZGUsIG9wdGlvbnMgfHwge30pLnRoZW4odXRpbC5jYW52YXNUb0Jsb2IpO1xufVxuXG5mdW5jdGlvbiBjb3B5T3B0aW9ucyhvcHRpb25zKSB7XG4gIC8vIENvcHkgb3B0aW9ucyB0byBpbXBsIG9wdGlvbnMgZm9yIHVzZSBpbiBpbXBsXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5pbWFnZVBsYWNlaG9sZGVyID09PSAndW5kZWZpbmVkJykge1xuICAgIGRvbXRvaW1hZ2UuaW1wbC5vcHRpb25zLmltYWdlUGxhY2Vob2xkZXIgPVxuICAgICAgZGVmYXVsdE9wdGlvbnMuaW1hZ2VQbGFjZWhvbGRlcjtcbiAgfSBlbHNlIHtcbiAgICBkb210b2ltYWdlLmltcGwub3B0aW9ucy5pbWFnZVBsYWNlaG9sZGVyID0gb3B0aW9ucy5pbWFnZVBsYWNlaG9sZGVyO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmNhY2hlQnVzdCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBkb210b2ltYWdlLmltcGwub3B0aW9ucy5jYWNoZUJ1c3QgPSBkZWZhdWx0T3B0aW9ucy5jYWNoZUJ1c3Q7XG4gIH0gZWxzZSB7XG4gICAgZG9tdG9pbWFnZS5pbXBsLm9wdGlvbnMuY2FjaGVCdXN0ID0gb3B0aW9ucy5jYWNoZUJ1c3Q7XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhdyhkb21Ob2RlLCBvcHRpb25zKSB7XG4gIHJldHVybiB0b1N2Zyhkb21Ob2RlLCBvcHRpb25zKVxuICAgIC50aGVuKHV0aWwubWFrZUltYWdlKVxuICAgIC50aGVuKHV0aWwuZGVsYXkoMTAwKSlcbiAgICAudGhlbihpbWFnZSA9PiB7XG4gICAgICBjb25zdCBjYW52YXMgPSBuZXdDYW52YXMoZG9tTm9kZSk7XG4gICAgICBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKS5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xuICAgICAgcmV0dXJuIGNhbnZhcztcbiAgICB9KTtcblxuICBmdW5jdGlvbiBuZXdDYW52YXMoZE5vZGUpIHtcbiAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSBvcHRpb25zLndpZHRoIHx8IHV0aWwud2lkdGgoZE5vZGUpO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCB1dGlsLmhlaWdodChkTm9kZSk7XG5cbiAgICBpZiAob3B0aW9ucy5iZ2NvbG9yKSB7XG4gICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSBvcHRpb25zLmJnY29sb3I7XG4gICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FudmFzO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsb25lTm9kZShub2RlLCBmaWx0ZXIsIHJvb3QpIHtcbiAgaWYgKCFyb290ICYmIGZpbHRlciAmJiAhZmlsdGVyKG5vZGUpKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShub2RlKVxuICAgIC50aGVuKG1ha2VOb2RlQ29weSlcbiAgICAudGhlbihjbG9uZSA9PiBjbG9uZUNoaWxkcmVuKG5vZGUsIGNsb25lLCBmaWx0ZXIpKVxuICAgIC50aGVuKGNsb25lID0+IHByb2Nlc3NDbG9uZShub2RlLCBjbG9uZSkpO1xuXG4gIGZ1bmN0aW9uIG1ha2VOb2RlQ29weShuZCkge1xuICAgIGlmIChuZCBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgICByZXR1cm4gdXRpbC5tYWtlSW1hZ2UobmQudG9EYXRhVVJMKCkpO1xuICAgIH1cbiAgICByZXR1cm4gbmQuY2xvbmVOb2RlKGZhbHNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb25lQ2hpbGRyZW4ob3JpZ2luYWwsIGNsb25lLCBmbHQpIHtcbiAgICBjb25zdCBjaGlsZHJlbiA9IG9yaWdpbmFsLmNoaWxkTm9kZXM7XG4gICAgaWYgKGNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjbG9uZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsb25lQ2hpbGRyZW5Jbk9yZGVyKGNsb25lLCB1dGlsLmFzQXJyYXkoY2hpbGRyZW4pKVxuICAgIC50aGVuKCgpID0+IGNsb25lKTtcblxuICAgIGZ1bmN0aW9uIGNsb25lQ2hpbGRyZW5Jbk9yZGVyKHBhcmVudCwgYXJyQ2hpbGRyZW4pIHtcbiAgICAgIGxldCBkb25lID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICBhcnJDaGlsZHJlbi5mb3JFYWNoKGNoaWxkID0+IHtcbiAgICAgICAgZG9uZSA9IGRvbmVcbiAgICAgICAgICAudGhlbigoKSA9PiBjbG9uZU5vZGUoY2hpbGQsIGZsdCkpXG4gICAgICAgICAgLnRoZW4oY2hpbGRDbG9uZSA9PiB7XG4gICAgICAgICAgICBpZiAoY2hpbGRDbG9uZSkgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkQ2xvbmUpO1xuICAgICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gZG9uZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzQ2xvbmUob3JpZ2luYWwsIGNsb25lKSB7XG4gICAgaWYgKCEoY2xvbmUgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgcmV0dXJuIGNsb25lXG4gICAgfTtcblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgLnRoZW4oY2xvbmVTdHlsZSlcbiAgICAgIC50aGVuKGNsb25lUHNldWRvRWxlbWVudHMpXG4gICAgICAudGhlbihjb3B5VXNlcklucHV0KVxuICAgICAgLnRoZW4oZml4U3ZnKVxuICAgICAgLnRoZW4oKCkgPT4gY2xvbmUpO1xuXG4gICAgZnVuY3Rpb24gY2xvbmVTdHlsZSgpIHtcbiAgICAgIGNvbnN0IG9yaWdpbmFsU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShvcmlnaW5hbCk7XG4gICAgICBjb3B5U3R5bGUob3JpZ2luYWxTdHlsZSwgY2xvbmUuc3R5bGUpO1xuICAgICAgZnVuY3Rpb24gY29weVN0eWxlKHNvdXJjZSwgdGFyZ2V0KSB7XG4gICAgICAgIGlmIChzb3VyY2UuY3NzVGV4dCkge1xuICAgICAgICAgIHRhcmdldC5jc3NUZXh0ID0gc291cmNlLmNzc1RleHQ7XG4gICAgICAgICAgLy8gYWRkIGFkZGl0aW9uYWwgY29weSBvZiBjb21wb3NpdGUgc3R5bGVzXG4gICAgICAgICAgaWYgKHNvdXJjZS5mb250KSB7XG4gICAgICAgICAgICB0YXJnZXQuZm9udCA9IHNvdXJjZS5mb250O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb3B5UHJvcGVydGllcyhzb3VyY2UsIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY29weVByb3BlcnRpZXMoc291cmNlU3R5bGUsIHRhcmdldFN0eWxlKSB7XG4gICAgICAgICAgY29uc3QgcHJvcGVydHlLZXlzID0gdXRpbC5hc0FycmF5KHNvdXJjZVN0eWxlKTtcbiAgICAgICAgICBwcm9wZXJ0eUtleXMuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgICAgIHRhcmdldFN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICBzb3VyY2VTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpLFxuICAgICAgICAgICAgICBzb3VyY2VTdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KG5hbWUpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvbmVQc2V1ZG9FbGVtZW50cygpIHtcbiAgICAgIFsnOmJlZm9yZScsICc6YWZ0ZXInXS5mb3JFYWNoKGVsZW1lbnQgPT4gY2xvbmVQc2V1ZG9FbGVtZW50KGVsZW1lbnQpKTtcblxuICAgICAgZnVuY3Rpb24gY2xvbmVQc2V1ZG9FbGVtZW50KGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShvcmlnaW5hbCwgZWxlbWVudCk7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdjb250ZW50Jyk7XG5cbiAgICAgICAgaWYgKGNvbnRlbnQgPT09ICcnIHx8IGNvbnRlbnQgPT09ICdub25lJykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IHV0aWwudWlkKCk7XG4gICAgICAgIGNsb25lLmNsYXNzTmFtZSA9IGAke2Nsb25lLmNsYXNzTmFtZX0gJHtjbGFzc05hbWV9YDtcbiAgICAgICAgY29uc3Qgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcbiAgICAgICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKFxuICAgICAgICAgIGZvcm1hdFBzZXVkb0VsZW1lbnRTdHlsZShjbGFzc05hbWUsIGVsZW1lbnQsIHN0eWxlKVxuICAgICAgICApO1xuICAgICAgICBjbG9uZS5hcHBlbmRDaGlsZChzdHlsZUVsZW1lbnQpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGZvcm1hdFBzZXVkb0VsZW1lbnRTdHlsZShjbG4sIGVsbSwgc3RsKSB7XG4gICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBgLiR7Y2xufToke2VsbX1gO1xuICAgICAgICAgIGNvbnN0IGNzc1RleHQgPSBzdGwuY3NzVGV4dFxuICAgICAgICAgICAgPyBmb3JtYXRDc3NUZXh0KHN0bClcbiAgICAgICAgICAgIDogZm9ybWF0Q3NzUHJvcGVydGllcyhzdGwpO1xuICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShgJHtzZWxlY3Rvcn17JHtjc3NUZXh0fX1gKTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGZvcm1hdENzc1RleHQoc3RsMSkge1xuICAgICAgICAgICAgY29uc3QgY250ID0gc3RsMS5nZXRQcm9wZXJ0eVZhbHVlKCdjb250ZW50Jyk7XG4gICAgICAgICAgICByZXR1cm4gYCR7c3RsLmNzc1RleHR9IGNvbnRlbnQ6ICR7Y250fTtgO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIGZvcm1hdENzc1Byb3BlcnRpZXMoc3RsMikge1xuICAgICAgICAgICAgcmV0dXJuIGAke3V0aWwuYXNBcnJheShzdGwyKS5tYXAoZm9ybWF0UHJvcGVydHkpLmpvaW4oJzsgJyl9O2A7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGZvcm1hdFByb3BlcnR5KG5hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICBgJHtuYW1lfToke3N0bC5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpfSR7c3RsLmdldFByb3BlcnR5UHJpb3JpdHkobmFtZSkgPyAnICFpbXBvcnRhbnQnIDogJyd9YFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvcHlVc2VySW5wdXQoKSB7XG4gICAgICBpZiAob3JpZ2luYWwgaW5zdGFuY2VvZiBIVE1MVGV4dEFyZWFFbGVtZW50KVxuICAgICAgICBjbG9uZS5pbm5lckhUTUwgPSBvcmlnaW5hbC52YWx1ZTtcbiAgICAgIGlmIChvcmlnaW5hbCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQpXG4gICAgICAgIGNsb25lLnNldEF0dHJpYnV0ZSgndmFsdWUnLCBvcmlnaW5hbC52YWx1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZml4U3ZnKCkge1xuICAgICAgaWYgKCEoY2xvbmUgaW5zdGFuY2VvZiBTVkdFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgY2xvbmUuc2V0QXR0cmlidXRlKCd4bWxucycsICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycpO1xuXG4gICAgICBpZiAoIShjbG9uZSBpbnN0YW5jZW9mIFNWR1JlY3RFbGVtZW50KSkgcmV0dXJuO1xuICAgICAgWyd3aWR0aCcsICdoZWlnaHQnXS5mb3JFYWNoKGF0dHJpYnV0ZSA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlID0gY2xvbmUuZ2V0QXR0cmlidXRlKGF0dHJpYnV0ZSk7XG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcblxuICAgICAgICBjbG9uZS5zdHlsZS5zZXRQcm9wZXJ0eShhdHRyaWJ1dGUsIHZhbHVlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBlbWJlZEZvbnRzKG5vZGUpIHtcbiAgcmV0dXJuIGZvbnRGYWNlcy5yZXNvbHZlQWxsKCkudGhlbigoY3NzVGV4dCkgPT4ge1xuICAgIGNvbnN0IHN0eWxlTm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gICAgbm9kZS5hcHBlbmRDaGlsZChzdHlsZU5vZGUpO1xuICAgIHN0eWxlTm9kZS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3NUZXh0KSk7XG4gICAgcmV0dXJuIG5vZGU7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbmxpbmVJbWFnZXMobm9kZSkge1xuICByZXR1cm4gaW1hZ2VzLmlubGluZUFsbChub2RlKS50aGVuKCgpID0+IG5vZGUpO1xufVxuXG5mdW5jdGlvbiBtYWtlU3ZnRGF0YVVyaShub2RlLCB3aWR0aCwgaGVpZ2h0KSB7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUobm9kZSlcbiAgICAudGhlbihuZCA9PiB7XG4gICAgICBuZC5zZXRBdHRyaWJ1dGUoJ3htbG5zJywgJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnKTtcbiAgICAgIHJldHVybiBuZXcgWE1MU2VyaWFsaXplcigpLnNlcmlhbGl6ZVRvU3RyaW5nKG5kKTtcbiAgICB9KVxuICAgIC50aGVuKHV0aWwuZXNjYXBlWGh0bWwpXG4gICAgLnRoZW4oeGh0bWwgPT5cbiAgICAgIGA8Zm9yZWlnbk9iamVjdCB4PVwiMFwiIHk9XCIwXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiPiR7eGh0bWx9PC9mb3JlaWduT2JqZWN0PmBcbiAgICApXG4gICAgLnRoZW4oZm9yZWlnbk9iamVjdCA9PlxuICAgICAgYDxzdmcgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiJHt3aWR0aH1cIiBoZWlnaHQ9XCIke2hlaWdodH1cIj4ke2ZvcmVpZ25PYmplY3R9PC9zdmc+YFxuICAgIClcbiAgICAudGhlbihzdmcgPT4gYGRhdGE6aW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0Zi04LCR7c3ZnfWApO1xufVxuXG5mdW5jdGlvbiBuZXdVdGlsKCkge1xuICByZXR1cm4ge1xuICAgIGVzY2FwZSxcbiAgICBwYXJzZUV4dGVuc2lvbixcbiAgICBtaW1lVHlwZSxcbiAgICBkYXRhQXNVcmwsXG4gICAgaXNEYXRhVXJsLFxuICAgIGlzU3JjQXNEYXRhVXJsLFxuICAgIGNhbnZhc1RvQmxvYixcbiAgICByZXNvbHZlVXJsLFxuICAgIGdldEFuZEVuY29kZSxcbiAgICB1aWQ6IHVpZCgpLFxuICAgIGRlbGF5LFxuICAgIGFzQXJyYXksXG4gICAgZXNjYXBlWGh0bWwsXG4gICAgbWFrZUltYWdlLFxuICAgIHdpZHRoLFxuICAgIGhlaWdodFxuICB9O1xuXG4gIGZ1bmN0aW9uIG1pbWVzKCkge1xuICAgIC8qXG4gICAgICAgICAgICAqIE9ubHkgV09GRiBhbmQgRU9UIG1pbWUgdHlwZXMgZm9yIGZvbnRzIGFyZSAncmVhbCdcbiAgICAgICAgICAgICogc2VlIGh0dHA6Ly93d3cuaWFuYS5vcmcvYXNzaWdubWVudHMvbWVkaWEtdHlwZXMvbWVkaWEtdHlwZXMueGh0bWxcbiAgICAgICAgICAgICovXG4gICAgY29uc3QgV09GRiA9ICdhcHBsaWNhdGlvbi9mb250LXdvZmYnO1xuICAgIGNvbnN0IEpQRUcgPSAnaW1hZ2UvanBlZyc7XG5cbiAgICByZXR1cm4ge1xuICAgICAgd29mZjogV09GRixcbiAgICAgIHdvZmYyOiBXT0ZGLFxuICAgICAgdHRmOiAnYXBwbGljYXRpb24vZm9udC10cnVldHlwZScsXG4gICAgICBlb3Q6ICdhcHBsaWNhdGlvbi92bmQubXMtZm9udG9iamVjdCcsXG4gICAgICBwbmc6ICdpbWFnZS9wbmcnLFxuICAgICAganBnOiBKUEVHLFxuICAgICAganBlZzogSlBFRyxcbiAgICAgIGdpZjogJ2ltYWdlL2dpZicsXG4gICAgICB0aWZmOiAnaW1hZ2UvdGlmZicsXG4gICAgICBzdmc6ICdpbWFnZS9zdmcreG1sJ1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUV4dGVuc2lvbih1cmwpIHtcbiAgICBjb25zdCBtYXRjaCA9IC9cXC4oW15cXC5cXC9dKj8pJC9nLmV4ZWModXJsKTtcbiAgICBpZiAobWF0Y2gpIHtcbiAgICAgIHJldHVybiBtYXRjaFsxXTtcbiAgICB9XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgZnVuY3Rpb24gbWltZVR5cGUodXJsKSB7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gcGFyc2VFeHRlbnNpb24odXJsKS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBtaW1lcygpW2V4dGVuc2lvbl0gfHwgJyc7XG4gIH1cblxuICBmdW5jdGlvbiBpc0RhdGFVcmwodXJsKSB7XG4gICAgcmV0dXJuIHVybC5zZWFyY2goL14oZGF0YTopLykgIT09IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTcmNBc0RhdGFVcmwodGV4dCkge1xuICAgIGNvbnN0IERBVEFfVVJMX1JFR0VYID0gL3VybFxcKFsnXCJdPyhkYXRhOikoW14nXCJdKz8pWydcIl0/XFwpLztcblxuICAgIHJldHVybiB0ZXh0LnNlYXJjaChEQVRBX1VSTF9SRUdFWCkgIT09IC0xO1xuICB9XG4gIGZ1bmN0aW9uIGN2VG9CbG9iKGNhbnZhcykge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IGJpbmFyeVN0cmluZyA9IHdpbmRvdy5hdG9iKGNhbnZhcy50b0RhdGFVUkwoKS5zcGxpdCgnLCcpWzFdKTtcbiAgICAgIGNvbnN0IGxlbmd0aCA9IGJpbmFyeVN0cmluZy5sZW5ndGg7XG4gICAgICBjb25zdCBiaW5hcnlBcnJheSA9IG5ldyBVaW50OEFycmF5KGxlbmd0aCk7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspXG4gICAgICAgIGJpbmFyeUFycmF5W2ldID0gYmluYXJ5U3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgIHJlc29sdmUoXG4gICAgICAgIG5ldyBCbG9iKFtiaW5hcnlBcnJheV0sIHt0eXBlOiAnaW1hZ2UvcG5nJ30pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FudmFzVG9CbG9iKGNhbnZhcykge1xuICAgIGlmIChjYW52YXMudG9CbG9iKVxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBjYW52YXMudG9CbG9iKHJlc29sdmUpO1xuICAgICAgfSk7XG5cbiAgICByZXR1cm4gY3ZUb0Jsb2IoY2FudmFzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc29sdmVVcmwodXJsLCBiYXNlVXJsKSB7XG4gICAgY29uc3QgZG9jID0gZG9jdW1lbnQuaW1wbGVtZW50YXRpb24uY3JlYXRlSFRNTERvY3VtZW50KCk7XG4gICAgY29uc3QgYmFzZSA9IGRvYy5jcmVhdGVFbGVtZW50KCdiYXNlJyk7XG4gICAgZG9jLmhlYWQuYXBwZW5kQ2hpbGQoYmFzZSk7XG4gICAgY29uc3QgYSA9IGRvYy5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoYSk7XG4gICAgYmFzZS5ocmVmID0gYmFzZVVybDtcbiAgICBhLmhyZWYgPSB1cmw7XG4gICAgcmV0dXJuIGEuaHJlZjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvdXJSYW5kb21DaGFycygpIHtcbiAgICAvKiBzZWUgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNjI0ODcyMi8yNTE5MzczICovXG4gICAgcmV0dXJuIGAwMDAwJHsoKE1hdGgucmFuZG9tKCkgKiBNYXRoLnBvdygzNiwgNCkpIDw8IDApLnRvU3RyaW5nKDM2KX1gLnNsaWNlKC00KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVpZCgpIHtcbiAgICBsZXQgaW5kZXggPSAwO1xuXG4gICAgcmV0dXJuICgpID0+IGB1JHtmb3VyUmFuZG9tQ2hhcnMoKX0ke2luZGV4Kyt9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1ha2VJbWFnZSh1cmkpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltYWdlLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZShpbWFnZSk7XG4gICAgICB9O1xuICAgICAgaW1hZ2Uub25lcnJvciA9IHJlamVjdDtcbiAgICAgIGltYWdlLnNyYyA9IHVyaTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEFuZEVuY29kZSh1cmwpIHtcbiAgICBjb25zdCBUSU1FT1VUID0gMzAwMDA7XG4gICAgaWYgKGRvbXRvaW1hZ2UuaW1wbC5vcHRpb25zLmNhY2hlQnVzdCkge1xuICAgICAgLy8gQ2FjaGUgYnlwYXNzIHNvIHdlIGRvbnQgaGF2ZSBDT1JTIGlzc3VlcyB3aXRoIGNhY2hlZCBpbWFnZXNcbiAgICAgIC8vIFNvdXJjZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0L1VzaW5nX1hNTEh0dHBSZXF1ZXN0I0J5cGFzc2luZ190aGVfY2FjaGVcbiAgICAgIHVybCArPSAoL1xcPy8udGVzdCh1cmwpID8gJyYnIDogJz8nKSArIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblxuICAgICAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBkb25lO1xuICAgICAgcmVxdWVzdC5vbnRpbWVvdXQgPSB0aW1lb3V0O1xuICAgICAgcmVxdWVzdC5yZXNwb25zZVR5cGUgPSAnYmxvYic7XG4gICAgICByZXF1ZXN0LnRpbWVvdXQgPSBUSU1FT1VUO1xuICAgICAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwsIHRydWUpO1xuICAgICAgcmVxdWVzdC5zZW5kKCk7XG5cbiAgICAgIGxldCBwbGFjZWhvbGRlcjtcbiAgICAgIGlmIChkb210b2ltYWdlLmltcGwub3B0aW9ucy5pbWFnZVBsYWNlaG9sZGVyKSB7XG4gICAgICAgIGNvbnN0IHNwbGl0ID0gZG9tdG9pbWFnZS5pbXBsLm9wdGlvbnMuaW1hZ2VQbGFjZWhvbGRlci5zcGxpdCgvLC8pO1xuICAgICAgICBpZiAoc3BsaXQgJiYgc3BsaXRbMV0pIHtcbiAgICAgICAgICBwbGFjZWhvbGRlciA9IHNwbGl0WzFdO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQpIHJldHVybjtcblxuICAgICAgICBpZiAocmVxdWVzdC5zdGF0dXMgIT09IDIwMCkge1xuICAgICAgICAgIGlmIChwbGFjZWhvbGRlcikge1xuICAgICAgICAgICAgcmVzb2x2ZShwbGFjZWhvbGRlcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZhaWwoYGNhbm5vdCBmZXRjaCByZXNvdXJjZTogJHt1cmx9LCBzdGF0dXM6ICR7cmVxdWVzdC5zdGF0dXN9YCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZW5jb2RlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIGVuY29kZXIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnRlbnQgPSBlbmNvZGVyLnJlc3VsdC5zcGxpdCgvLC8pWzFdO1xuICAgICAgICAgIHJlc29sdmUoY29udGVudCk7XG4gICAgICAgIH07XG4gICAgICAgIGVuY29kZXIucmVhZEFzRGF0YVVSTChyZXF1ZXN0LnJlc3BvbnNlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdGltZW91dCgpIHtcbiAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSB7XG4gICAgICAgICAgcmVzb2x2ZShwbGFjZWhvbGRlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFpbChcbiAgICAgICAgICAgIGB0aW1lb3V0IG9mICR7VElNRU9VVH1tcyBvY2N1cmVkIHdoaWxlIGZldGNoaW5nIHJlc291cmNlOiAke3VybH1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBmYWlsKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkYXRhQXNVcmwoY29udGVudCwgdHlwZSkge1xuICAgIHJldHVybiBgZGF0YToke3R5cGV9O2Jhc2U2NCwke2NvbnRlbnR9YDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGVzY2FwZShzdHJpbmcpIHtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbLiorP14ke30oKXxcXFtcXF1cXC9cXFxcXSkvZywgJ1xcXFwkMScpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVsYXkobXMpIHtcbiAgICByZXR1cm4gYXJnID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKGFyZyk7XG4gICAgICAgIH0sIG1zKTtcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBhc0FycmF5KGFycmF5TGlrZSkge1xuICAgIGNvbnN0IGFycmF5ID0gW107XG4gICAgY29uc3QgbGVuZ3RoID0gYXJyYXlMaWtlLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSBhcnJheS5wdXNoKGFycmF5TGlrZVtpXSk7XG4gICAgcmV0dXJuIGFycmF5O1xuICB9XG5cbiAgZnVuY3Rpb24gZXNjYXBlWGh0bWwoc3RyaW5nKSB7XG4gICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKC8jL2csICclMjMnKS5yZXBsYWNlKC9cXG4vZywgJyUwQScpO1xuICB9XG5cbiAgZnVuY3Rpb24gd2lkdGgobm9kZSkge1xuICAgIGNvbnN0IGxlZnRCb3JkZXIgPSBweChub2RlLCAnYm9yZGVyLWxlZnQtd2lkdGgnKTtcbiAgICBjb25zdCByaWdodEJvcmRlciA9IHB4KG5vZGUsICdib3JkZXItcmlnaHQtd2lkdGgnKTtcbiAgICByZXR1cm4gbm9kZS5zY3JvbGxXaWR0aCArIGxlZnRCb3JkZXIgKyByaWdodEJvcmRlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhlaWdodChub2RlKSB7XG4gICAgY29uc3QgdG9wQm9yZGVyID0gcHgobm9kZSwgJ2JvcmRlci10b3Atd2lkdGgnKTtcbiAgICBjb25zdCBib3R0b21Cb3JkZXIgPSBweChub2RlLCAnYm9yZGVyLWJvdHRvbS13aWR0aCcpO1xuICAgIHJldHVybiBub2RlLnNjcm9sbEhlaWdodCArIHRvcEJvcmRlciArIGJvdHRvbUJvcmRlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHB4KG5vZGUsIHN0eWxlUHJvcGVydHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG5vZGUpLmdldFByb3BlcnR5VmFsdWUoc3R5bGVQcm9wZXJ0eSk7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQodmFsdWUucmVwbGFjZSgncHgnLCAnJykpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG5ld0lubGluZXIoKSB7XG4gIGNvbnN0IFVSTF9SRUdFWCA9IC91cmxcXChbJ1wiXT8oW14nXCJdKz8pWydcIl0/XFwpL2c7XG5cbiAgcmV0dXJuIHtcbiAgICBpbmxpbmVBbGwsXG4gICAgc2hvdWxkUHJvY2VzcyxcbiAgICBpbXBsOiB7XG4gICAgICByZWFkVXJscyxcbiAgICAgIGlubGluZVxuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBzaG91bGRQcm9jZXNzKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcuc2VhcmNoKFVSTF9SRUdFWCkgIT09IC0xO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVhZFVybHMoc3RyaW5nKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgbGV0IG1hdGNoO1xuICAgIHdoaWxlICgobWF0Y2ggPSBVUkxfUkVHRVguZXhlYyhzdHJpbmcpKSAhPT0gbnVsbCkge1xuICAgICAgcmVzdWx0LnB1c2gobWF0Y2hbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0LmZpbHRlcigodXJsKSA9PiB7XG4gICAgICByZXR1cm4gIXV0aWwuaXNEYXRhVXJsKHVybCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbmxpbmUoc3RyaW5nLCB1cmwsIGJhc2VVcmwsIGdldCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodXJsKVxuICAgICAgLnRoZW4odWwgPT4gYmFzZVVybCA/IHV0aWwucmVzb2x2ZVVybCh1bCwgYmFzZVVybCkgOiB1bClcbiAgICAgIC50aGVuKGdldCB8fCB1dGlsLmdldEFuZEVuY29kZSlcbiAgICAgIC50aGVuKGRhdGEgPT4gdXRpbC5kYXRhQXNVcmwoZGF0YSwgdXRpbC5taW1lVHlwZSh1cmwpKSlcbiAgICAgIC50aGVuKGRhdGFVcmwgPT4gc3RyaW5nLnJlcGxhY2UodXJsQXNSZWdleCh1cmwpLCBgJDEke2RhdGFVcmx9JDNgKSk7XG5cbiAgICBmdW5jdGlvbiB1cmxBc1JlZ2V4KHVybDApIHtcbiAgICAgIHJldHVybiBuZXcgUmVnRXhwKFxuICAgICAgICBgKHVybFxcXFwoW1xcJ1wiXT8pKCR7dXRpbC5lc2NhcGUodXJsMCl9KShbXFwnXCJdP1xcXFwpKWAsXG4gICAgICAgICdnJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbmxpbmVBbGwoc3RyaW5nLCBiYXNlVXJsLCBnZXQpIHtcbiAgICBpZiAobm90aGluZ1RvSW5saW5lKCkgfHwgdXRpbC5pc1NyY0FzRGF0YVVybChzdHJpbmcpKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHN0cmluZyk7XG4gICAgfVxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoc3RyaW5nKVxuICAgICAgLnRoZW4ocmVhZFVybHMpXG4gICAgICAudGhlbih1cmxzID0+IHtcbiAgICAgICAgbGV0IGRvbmUgPSBQcm9taXNlLnJlc29sdmUoc3RyaW5nKTtcbiAgICAgICAgdXJscy5mb3JFYWNoKHVybCA9PiB7XG4gICAgICAgICAgZG9uZSA9IGRvbmUudGhlbihzdHIgPT4gaW5saW5lKHN0ciwgdXJsLCBiYXNlVXJsLCBnZXQpKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkb25lO1xuICAgICAgfSk7XG5cbiAgICBmdW5jdGlvbiBub3RoaW5nVG9JbmxpbmUoKSB7XG4gICAgICByZXR1cm4gIXNob3VsZFByb2Nlc3Moc3RyaW5nKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbmV3Rm9udEZhY2VzKCkge1xuICByZXR1cm4ge1xuICAgIHJlc29sdmVBbGwsXG4gICAgaW1wbDoge3JlYWRBbGx9XG4gIH07XG5cbiAgZnVuY3Rpb24gcmVzb2x2ZUFsbCgpIHtcbiAgICByZXR1cm4gcmVhZEFsbChkb2N1bWVudClcbiAgICAgIC50aGVuKHdlYkZvbnRzID0+IHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgICAgICAgIHdlYkZvbnRzLm1hcCh3ZWJGb250ID0+IHdlYkZvbnQucmVzb2x2ZSgpKVxuICAgICAgICApO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGNzc1N0cmluZ3MgPT4gY3NzU3RyaW5ncy5qb2luKCdcXG4nKSk7XG4gIH1cblxuICBmdW5jdGlvbiByZWFkQWxsKCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodXRpbC5hc0FycmF5KGRvY3VtZW50LnN0eWxlU2hlZXRzKSlcbiAgICAgIC50aGVuKGxvYWRFeHRlcm5hbFN0eWxlU2hlZXRzKVxuICAgICAgLnRoZW4oZ2V0Q3NzUnVsZXMpXG4gICAgICAudGhlbihzZWxlY3RXZWJGb250UnVsZXMpXG4gICAgICAudGhlbihydWxlcyA9PiBydWxlcy5tYXAobmV3V2ViRm9udCkpO1xuXG4gICAgZnVuY3Rpb24gc2VsZWN0V2ViRm9udFJ1bGVzKGNzc1J1bGVzKSB7XG4gICAgICByZXR1cm4gY3NzUnVsZXNcbiAgICAgICAgLmZpbHRlcihydWxlID0+IHJ1bGUudHlwZSA9PT0gQ1NTUnVsZS5GT05UX0ZBQ0VfUlVMRSlcbiAgICAgICAgLmZpbHRlcihydWxlID0+IGlubGluZXIuc2hvdWxkUHJvY2VzcyhydWxlLnN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3NyYycpKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9hZEV4dGVybmFsU3R5bGVTaGVldHMoc3R5bGVTaGVldHMpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgc3R5bGVTaGVldHMubWFwKHNoZWV0ID0+IHtcbiAgICAgICAgICBpZiAoc2hlZXQuaHJlZikge1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoKHNoZWV0LmhyZWYsIHtjcmVkZW50aWFsczogJ29taXQnfSlcbiAgICAgICAgICAgICAgLnRoZW4odG9UZXh0KVxuICAgICAgICAgICAgICAudGhlbihzZXRCYXNlSHJlZihzaGVldC5ocmVmKSlcbiAgICAgICAgICAgICAgLnRoZW4odG9TdHlsZVNoZWV0KVxuICAgICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgICAgICAvLyBIYW5kbGUgYW55IGVycm9yIHRoYXQgb2NjdXJyZWQgaW4gYW55IG9mIHRoZSBwcmV2aW91c1xuICAgICAgICAgICAgICAgIC8vIHByb21pc2VzIGluIHRoZSBjaGFpbi5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNoZWV0O1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShzaGVldCk7XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICBmdW5jdGlvbiB0b1RleHQocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnRleHQoKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0QmFzZUhyZWYoYmFzZSkge1xuICAgICAgICBiYXNlID0gYmFzZS5zcGxpdCgnLycpO1xuICAgICAgICBiYXNlLnBvcCgpO1xuICAgICAgICBiYXNlID0gYmFzZS5qb2luKCcvJyk7XG5cbiAgICAgICAgcmV0dXJuIHRleHQgPT4ge1xuICAgICAgICAgIHJldHVybiB1dGlsLmlzU3JjQXNEYXRhVXJsKHRleHQpXG4gICAgICAgICAgICA/IHRleHRcbiAgICAgICAgICAgIDogdGV4dC5yZXBsYWNlKC91cmxcXChbJ1wiXT8oW14nXCJdKz8pWydcIl0/XFwpL2csIGFkZEJhc2VIcmVmVG9VcmwpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGFkZEJhc2VIcmVmVG9VcmwobWF0Y2gsIHAxKSB7XG4gICAgICAgICAgY29uc3QgdXJsID0gL15odHRwL2kudGVzdChwMSkgPyBwMSA6IGNvbmNhdEFuZFJlc29sdmVVcmwoYmFzZSwgcDEpO1xuICAgICAgICAgIHJldHVybiBgdXJsKCcke3VybH0nKWA7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBTb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NzYyMzEvMzc4Njg1NlxuICAgICAgICBmdW5jdGlvbiBjb25jYXRBbmRSZXNvbHZlVXJsKHVybCwgY29uY2F0KSB7XG4gICAgICAgICAgY29uc3QgdXJsMSA9IHVybC5zcGxpdCgnLycpO1xuICAgICAgICAgIGNvbnN0IHVybDIgPSBjb25jYXQuc3BsaXQoJy8nKTtcbiAgICAgICAgICBjb25zdCB1cmwzID0gW107XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB1cmwxLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKHVybDFbaV0gPT09ICcuLicpIHtcbiAgICAgICAgICAgICAgdXJsMy5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXJsMVtpXSAhPT0gJy4nKSB7XG4gICAgICAgICAgICAgIHVybDMucHVzaCh1cmwxW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSB1cmwyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgaWYgKHVybDJbaV0gPT09ICcuLicpIHtcbiAgICAgICAgICAgICAgdXJsMy5wb3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodXJsMltpXSAhPT0gJy4nKSB7XG4gICAgICAgICAgICAgIHVybDMucHVzaCh1cmwyW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHVybDMuam9pbignLycpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHRvU3R5bGVTaGVldCh0ZXh0KSB7XG4gICAgICAgIGNvbnN0IGRvYyA9IGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmNyZWF0ZUhUTUxEb2N1bWVudCgnJyk7XG4gICAgICAgIGNvbnN0IHN0eWxlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgICAgICAgc3R5bGVFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcblxuICAgICAgICByZXR1cm4gc3R5bGVFbGVtZW50LnNoZWV0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENzc1J1bGVzKHN0eWxlU2hlZXRzKSB7XG4gICAgICBjb25zdCBjc3NSdWxlcyA9IFtdO1xuICAgICAgc3R5bGVTaGVldHMuZm9yRWFjaCgoc2hlZXQpID0+IHtcbiAgICAgICAgaWYgKHNoZWV0LmNzc1J1bGVzICYmIHR5cGVvZiBzaGVldC5jc3NSdWxlcyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXRpbFxuICAgICAgICAgICAgICAuYXNBcnJheShzaGVldC5jc3NSdWxlcyB8fCBbXSlcbiAgICAgICAgICAgICAgLmZvckVhY2goY3NzUnVsZXMucHVzaC5iaW5kKGNzc1J1bGVzKSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgIGBFcnJvciB3aGlsZSByZWFkaW5nIENTUyBydWxlcyBmcm9tICR7c2hlZXQuaHJlZn1gLFxuICAgICAgICAgICAgICBlLnRvU3RyaW5nKClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRDc3NSdWxlcyBjYW4gbm90IGZpbnQgY3NzUnVsZXMnKVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBjc3NSdWxlcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdXZWJGb250KHdlYkZvbnRSdWxlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICByZXNvbHZlOiAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgYmFzZVVybCA9ICh3ZWJGb250UnVsZS5wYXJlbnRTdHlsZVNoZWV0IHx8IHt9KS5ocmVmO1xuICAgICAgICAgIHJldHVybiBpbmxpbmVyLmlubGluZUFsbCh3ZWJGb250UnVsZS5jc3NUZXh0LCBiYXNlVXJsKTtcbiAgICAgICAgfSxcbiAgICAgICAgc3JjOiAoKSA9PiB3ZWJGb250UnVsZS5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdzcmMnKVxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gbmV3SW1hZ2VzKCkge1xuICByZXR1cm4ge1xuICAgIGlubGluZUFsbCxcbiAgICBpbXBsOiB7XG4gICAgICBuZXdJbWFnZVxuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiBuZXdJbWFnZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlubGluZVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbmxpbmUoZ2V0KSB7XG4gICAgICBpZiAodXRpbC5pc0RhdGFVcmwoZWxlbWVudC5zcmMpKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZWxlbWVudC5zcmMpXG4gICAgICAgIC50aGVuKGdldCB8fCB1dGlsLmdldEFuZEVuY29kZSlcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB1dGlsLmRhdGFBc1VybChkYXRhLCB1dGlsLm1pbWVUeXBlKGVsZW1lbnQuc3JjKSkpXG4gICAgICAgIC50aGVuKGRhdGFVcmwgPT5cbiAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50Lm9ubG9hZCA9IHJlc29sdmU7XG4gICAgICAgICAgICBlbGVtZW50Lm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgICAgICBlbGVtZW50LnNyYyA9IGRhdGFVcmw7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbmxpbmVBbGwobm9kZSkge1xuICAgIGlmICghKG5vZGUgaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShub2RlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaW5saW5lQmFja2dyb3VuZChub2RlKS50aGVuKCgpID0+IHtcbiAgICAgIGlmIChub2RlIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gbmV3SW1hZ2Uobm9kZSkuaW5saW5lKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvbWlzZS5hbGwoXG4gICAgICAgIHV0aWwuYXNBcnJheShub2RlLmNoaWxkTm9kZXMpLm1hcChjaGlsZCA9PiBpbmxpbmVBbGwoY2hpbGQpKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGlubGluZUJhY2tncm91bmQobmQpIHtcbiAgICAgIGNvbnN0IGJhY2tncm91bmQgPSBuZC5zdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdiYWNrZ3JvdW5kJyk7XG5cbiAgICAgIGlmICghYmFja2dyb3VuZCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5kKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGlubGluZXJcbiAgICAgICAgLmlubGluZUFsbChiYWNrZ3JvdW5kKVxuICAgICAgICAudGhlbihpbmxpbmVkID0+IHtcbiAgICAgICAgICBuZC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICdiYWNrZ3JvdW5kJyxcbiAgICAgICAgICAgIGlubGluZWQsXG4gICAgICAgICAgICBuZC5zdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KCdiYWNrZ3JvdW5kJylcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbigoKSA9PiBuZCk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRvbXRvaW1hZ2U7XG4iXX0=