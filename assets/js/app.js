var page = (function () {
    var html, navbarBurger, navbarMenu;

    $(document).ready(function () {
        html = $('html');
        navbarBurger = $(".navbar-burger");
        navbarMenu = $(".navbar-menu");

        if($("#docsToc").length == 0) {
            $(".navbar-docsToc-button").hide();
        }

        resetTheView();

        window.addEventListener('resize', resetTheView);
        window.addEventListener('scroll', resetTheView);
        window.addEventListener('keydown', handleKeystrokes);

        document.onunload = function(){
            window.removeEventListener('resize', resetTheView);
            window.removeEventListener('scroll', resetTheView);
            window.removeEventListener('keydown', handleKeystrokes);
        };
    });

    function resetTheView() {
        if (html.hasClass('open-toc')) {
            toggleToc();
        }
        if (navbarBurger.hasClass("is-active")) {
            toggleNavbarMenu();
        }
    }

    function tocWasClicked(e) {
        var target = $(e.target);
        var docsToc = $("#docsToc");
        return (target[0] === docsToc[0] || target.parents("#docsToc").length > 0);
    }

    function listenForTocClick(e) {
        if (!tocWasClicked(e)) toggleToc();
    }

    function toggleToc() {
        html.toggleClass('open-toc');

        setTimeout(function () {
            if (html.hasClass('open-toc')) {
                window.addEventListener('click', listenForTocClick);
            } else {
                window.removeEventListener('click', listenForTocClick);
            }
        }, 100);
    }

    function toggleNavbarMenu() {
        navbarBurger.toggleClass("is-active");
        navbarMenu.toggleClass("is-active");
    }

    return {
        toggleToc: toggleToc,
        toggleNavbarMenu: toggleNavbarMenu
    };
})();

/*
  By default hugo generates a TOC for all levels with no options to customize it.
  The following function removes empty <li> tags which were created even though
  no header at this level exists. This happens e.g. if you skip the first level!

  This is a workaround that hopefully can be removed if there's a native
  solution in hugo.
*/
function fixTableOfContents() {
  // Copyright (c) 2017 Yihui Xie & 2018 Vincent Tam under MIT
  var toc = document.getElementById('TableOfContents');
  if (!toc) return;
  do {
    var li, ul = toc.querySelector('ul');
    if (ul.childElementCount !== 1) break;
    li = ul.firstElementChild;
    if (li.tagName !== 'LI') break;
    // remove <ul><li></li></ul> where only <ul> only contains one <li>
    ul.outerHTML = li.innerHTML;
  } while (toc.childElementCount >= 1);
}

(function() {
	fixTableOfContents();
})();
