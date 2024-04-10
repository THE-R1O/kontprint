const scrollers = document.querySelectorAll(".scroller");

// If a user hasn't opted in for recuded motion, then we add the animation
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
}

function addAnimation() {

    scrollers.forEach((scroller) => {
        // add data-animated="true" to every `.scroller` on the page
        scroller.setAttribute("data-animated", true);


        // Make an array from the elements within `.scroller-inner`
        const scrollerInner = scroller.querySelector(".scroller-inner");
        const scrollerContent = Array.from(scrollerInner.children);

        // For each item in the array, clone it
        // add aria-hidden to it
        // add it into the `.scroller-inner`
        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            duplicatedItem.setAttribute("aria-hidden", true);
            scrollerInner.appendChild(duplicatedItem);
        });
    });
}

//Starting and stopping animation and focus and loss of it
window.addEventListener("focus", function () {
    scrollers.forEach((scroller) => {
        (scroller.querySelector(".scroller-inner")).style.removeProperty('animation-Play-State');
    });
});

window.addEventListener("blur", function () {
    scrollers.forEach((scroller) => {
        (scroller.querySelector(".scroller-inner")).style.animationPlayState = 'paused';
    });
});


//make appbar apearing on scroll
// window.addEventListener("scroll", function () {
//     if (this.scrollY > 70) {
//         document.getElementById("appbar").style.transform = "translateY(0)";
//     } else {
//         document.getElementById("appbar").style.transform = "translateY(-200px)";

//     }
// })

//make text apear on scroll
const targets = Array.from(document.querySelectorAll(".fadeIn"))

const options = {
    root: null,
    rootMargin: "0px",
    threshold: "0.4",
}
const gap = 400;

function removeClassFadeIn(element) {
    setTimeout(() => {
        element.classList.remove("fadeIn");
        element.style.removeProperty("transform")   
    }, 500)
}
const callback = (entries) => {
    console.log('alalalala');
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (Array.from(entry.target.classList).includes("t1")) {
                entry.target.style.transform = "scale(1)"
                entry.target.style.opacity = "1"
                removeClassFadeIn(entry.target)
                observer.unobserve(entry.target)
            } else if (Array.from(entry.target.classList).includes("t2")) {
                setTimeout(() => {
                    setTimeout(() => {
                        document.querySelector(".underHeroTextGradient").style.opacity = 0.4;
                    }, 400)
                    for (i = 0; i < targets.length; i++) {
                        if (Array.from(targets[i].classList).includes("advantagesContainer")) {
                            break
                        }
                        const ii = i
                        setTimeout(() => {
                            targets[ii].style.transform = "scale(1) translate(0, 0)"
                            targets[ii].style.opacity = "1"
                            removeClassFadeIn(targets[ii])
                        }, 100 * ii)
                        observer.unobserve(targets[i])
                    }
                }, gap)
            } else if (!Array.from(entry.target.classList).includes("productTile")) {
                entry.target.style.transform = "scale(1)"
                entry.target.style.opacity = "1"
                removeClassFadeIn(entry.target)
                observer.unobserve(entry.target)
            }
        }
    })
}
const observer = new IntersectionObserver(callback, options)

targets.forEach(target => {
    observer.observe(target)
})