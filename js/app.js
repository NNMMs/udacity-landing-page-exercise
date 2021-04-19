/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const navBarList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");

/**
 * End Global Variables 
*/


/**
 * Begin Main Functions
 * 
*/

// build the nav
/**
 *  @description Create navigation menu links dynamically
 */
function buildNavigationMenu() {
    const fragment = document.createDocumentFragment();
    sections.forEach(section => {
        const sectionListItem = document.createElement("li");
        sectionListItem.innerHTML = `<a class="menu__link" href="#${section.getAttribute("id")}" data-related-section="${section.getAttribute("id")}">${section.getAttribute("data-nav")}</a>`;
        fragment.appendChild(sectionListItem);
    });
    buildResponsiveList(fragment);
    navBarList.appendChild(fragment);
}

function buildResponsiveList(fragment) {
    const responsiveList = document.createElement("li");
    responsiveList.innerHTML = `<a id="responsive" class="icon" href="javascript:void(0);"><i class="fa fa-bars"></i></a>`
    fragment.appendChild(responsiveList);
}

/**
 *  @description Add class 'active' to section when near top of viewport
 */
function activateSection(section) {
    const siblings = [...sections].filter(sibling => sibling !== section);
    siblings.forEach(sibling => sibling.classList.remove("active"));
    section.classList.add("active");
    // == add class 'link__active' when section is activated
    activateLink(section)
}

/**
 * @description Add class 'link__active' to link when section is activated
 */
function activateLink(section) {
    const links = document.querySelectorAll(".menu__link");
    links.forEach(link => {
        const sectionTitle = section.getAttribute("data-nav");
        link.innerText === sectionTitle ? link.classList.add("link__active") : link.classList.remove("link__active");
    });
}

/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNavigationMenu());

// Scroll to section on link click
navBarList.addEventListener("click", event => {
    if (event.target.nodeName.toLowerCase() === "a") {
        event.preventDefault();
        const relatedSection = document.querySelector(`${event.target.getAttribute("href")}`);
        relatedSection.scrollIntoView({ behavior: "smooth" });
    }
});

document.addEventListener("scroll", () => sections.forEach(section => { observer.observe(section) }));

// Set sections as active
let observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            activateSection(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 1 });


/* Toggle between adding and removing the "responsive" class to `ul` when the user clicks on the hamburger icon */
responsiveAnchor = document.getElementById("responsive");
responsiveAnchor.addEventListener("click", function () {

    if (navBarList.className === "navbar__list") {
        navBarList.className += " responsive";
    } else {
        navBarList.className = "navbar__list";
    }

});


