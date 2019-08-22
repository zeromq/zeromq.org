var page = (function () {
    var html, navbarBurger, navbarMenu;

    $(document).ready(function () {
        html = $('html');
        navbarBurger = $(".navbar-burger");
        navbarMenu = $(".navbar-menu");

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
