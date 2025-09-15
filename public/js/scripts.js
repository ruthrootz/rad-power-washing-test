window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    const otherReasonInput = document.body.querySelector("#other-reason-input");
    otherReasonInput?.addEventListener("click", () => {
        document.getElementById("other-reason-radio").checked = true;
    });


    const carousel = document.querySelector('.carousel-thumbnails');
    const scroller = document.querySelector('.scroller');
    const thumbnails = document.querySelectorAll('.image');
    scroller?.addEventListener('click', e => {
        const target = e.target;
        if (target.matches('.image')) {
            const index = [...thumbnails].indexOf(target);
            carousel.goToSlide(index);
        }
    });
    carousel?.addEventListener('wa-slide-change', e => {
        const slideIndex = e.detail.index;
        [...thumbnails].forEach((thumb, i) => {
            thumb.classList.toggle('active', i === slideIndex);
            if (i === slideIndex) {
                thumb.scrollIntoView({
                    block: 'nearest',
                });
            }
        });
    });

});

function deRequireCheckbox(elClass) {
    el = document.getElementsByClassName(elClass);
    var atLeastOneChecked = false; //at least one cb is checked
    for (i = 0; i < el.length; i++) {
        if (el[i].checked === true) {
            atLeastOneChecked = true;
        }
    }
    if (atLeastOneChecked === true) {
        for (i = 0; i < el.length; i++) {
            el[i].required = false;
        }
    } else {
        for (i = 0; i < el.length; i++) {
            el[i].required = true;
        }
    }
}

