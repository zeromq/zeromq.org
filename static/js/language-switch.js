//= require ../lib/_jquery

/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
(function (global) {
  'use strict';

  var languages = [];
  var examples = {};


  global.setupLanguages = setupLanguages;
  global.activateLanguage = activateLanguage;

  function activateLanguage(language, library) {
    if (!language) return;
    if (language === "") return;

    $(".lang-selector option[data-language-name='" + language + "']").parents("select").val(language);
    // Mod to match Pygments from Hugo: div.highlight > pre code.language-ruby
    for (var i=0; i < languages.length; i++) {
      for (var j=0; j < examples[languages[i]].length; j++) {
        var libraries = examples[languages[i]];
        $(".example-" + languages[i] + "-" + libraries[j]).hide();
        $(".lib-selector").hide();
      }
    }
    $(".lib-selector[data-language-name='" + language + "']").show();
    $(".lib-selector option[data-library-name='" + library + "']").parents("select").val(library);
    $(".example-" + language + "-" + library).show();

    // scroll to the new location of the position
    if ($(window.location.hash).get(0)) {
      $(window.location.hash).get(0).scrollIntoView(true);
    }
  }

  // parseURL and stringifyURL are from https://github.com/sindresorhus/query-string
  // MIT licensed
  // https://github.com/sindresorhus/query-string/blob/7bee64c16f2da1a326579e96977b9227bf6da9e6/license
  function parseURL(str) {
    if (typeof str !== 'string') {
      return {};
    }

    str = str.trim().replace(/^(\?|#|&)/, '');

    if (!str) {
      return {};
    }

    return str.split('&').reduce(function (ret, param) {
      var parts = param.replace(/\+/g, ' ').split('=');
      var key = parts[0];
      var val = parts[1];

      key = decodeURIComponent(key);
      // missing `=` should be `null`:
      // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
      val = val === undefined ? null : decodeURIComponent(val);

      if (!ret.hasOwnProperty(key)) {
        ret[key] = val;
      } else if (Array.isArray(ret[key])) {
        ret[key].push(val);
      } else {
        ret[key] = [ret[key], val];
      }

      return ret;
    }, {});
  };

  function stringifyURL(obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
      var val = obj[key];

      if (Array.isArray(val)) {
        return val.sort().map(function (val2) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
        }).join('&');
      }

      return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
  };

  // gets the language set in the query string
  function getLanguageFromQueryString() {
    if (location.search.length >= 1) {
      var query = parseURL(location.search);
      var language = query.language
      var library = query.library;
      if (language) {
        return language;
      } else if (jQuery.inArray(location.search.substr(1), languages) != -1) {
        return location.search.substr(1);
      }
    }

    return false;
  }

  // gets the library set in the query string
  function getLibraryFromQueryString() {
    if (location.search.length >= 1) {
      var query = parseURL(location.search);
      var library = query.library;
      if (library) {
        return library;
      } else {
        return false;
      }
    }

    return false;
  }

  // returns a new query string with the new language in it
  function generateNewQueryString(key, value) {
    var url = parseURL(location.search);
    url[key] = value
    return stringifyURL(url);
  }

  // if a button is clicked, add the state to the history
  function pushURL(key, value) {
    if (!history) { return; }
    var hash = window.location.hash;
    if (hash) {
      hash = hash.replace(/^#+/, '');
    }
    history.pushState({}, '', '?' + generateNewQueryString(key, value) + '#' + hash);

    // save 'key' as next default
    localStorage.setItem(key, value);
  }

  function setupLanguages(e) {
    var defaultLanguage = localStorage.getItem("language");
    var defaultLibrary = localStorage.getItem("library");

    examples = e
    languages = Object.keys(examples);

    var presentLanguage = getLanguageFromQueryString();
    var presentLibrary = getLibraryFromQueryString();
    if (presentLanguage && presentLibrary) {
      // the language is in the URL, so use that language!
      activateLanguage(presentLanguage, presentLibrary);

      localStorage.setItem("language", presentLanguage);
      localStorage.setItem("library", presentLibrary);
    } else if ((defaultLanguage !== null) && (defaultLibrary !== null) &&
               (jQuery.inArray(defaultLanguage, languages) != -1) &&
               (jQuery.inArray(defaultLibrary, examples[defaultLanguage]) != -1)) {
      // the language was the last selected one saved in localstorage, so use that language!
      activateLanguage(defaultLanguage, defaultLibrary);
    } else {
      // no language selected, so use the default
      activateLanguage(languages[0], examples[languages[0]][0]);
    }
  }

  // if we click on a language tab, activate that language
  $(function() {
    $(".lang-selector select").on("change", function(obj) {
      var optionSelected = $("option:selected", this);
      var examples = $('.content').data('examples');
      var language = optionSelected.data("language-name");
      var library = examples[language][0]; // select the first lib in the array
      pushURL("language", language);
      pushURL("library", library);
      activateLanguage(language, library);
      return false;
    });

    $(".lib-selector select").on("change", function(obj) {
      var optionSelected = $("option:selected", this);
      var library = optionSelected.data("library-name");

      var presentLanguage = $("option:selected", $(".lang-selector select")).data("language-name");
      if (!presentLanguage) {
        var presentLanguage = getLanguageFromQueryString();
        if (!presentLanguage) {
          presentLanguage = localStorage.getItem("language");
        }
      }

      pushURL("language", presentLanguage);
      pushURL("library" , library);
      activateLanguage(presentLanguage, library);
      return false;
    });

    window.onpopstate = function() {
      // activateLanguage(getLanguageFromQueryString());
    };
  });
})(window);

$(function() {
  var examples = $('.content').data('examples');
  setupLanguages(examples);
});
