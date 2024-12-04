const btns = document.getElementsByClassName("btn");
const prevbtn = btns[0];
const nextbtn = btns[1];
const slider = document.getElementById("slider");
const dots = document.getElementsByClassName("dots")[0];
let image = document.getElementsByClassName("sliderImg")[0];

window.onload = slideFunc;

image.addEventListener("mouseover", stopFunc);
image.addEventListener("mouseout", slideFunc);
prevbtn.addEventListener("click", prevBtnFunc);
nextbtn.addEventListener("click", nextBtnFunc);
let imagesArr = ["slide1.jpg", "slide2.jpg", "slide3.jpg"];
let currentImg = 0;
let xInterval;

let isSliding = false;

let initialTouchX, initialTouchY, finalTouchX, finalTouchY;
let swipeThreshold = 100;

for (let i = 0; i < imagesArr.length; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dots.appendChild(dot);
}

const dot = document.getElementsByClassName("dot");
for (let i = 0; i < dot.length; i++) {
    dot[i].addEventListener("click", function () {
        getImage(i);
    });
}
dot[currentImg].classList.add("active");

function getImageRes(index, e) {
    image = document.getElementsByClassName("sliderImg")[0];

    const clone = image.cloneNode(true);
    clone.addEventListener("mouseover", stopFunc);
    clone.addEventListener("mouseout", slideFunc);
    clone.src = "./images/" + imagesArr[index];
    // clone.classList.add("hidden");
    slider.prepend(clone);
    image.classList.add("hidden");
    const y = setTimeout(function () {
        // clone.classList.remove("hidden");
        slider.removeChild(image);
    }, 2000);
    if (isSliding && e && e.type === "click") {
        slideFunc();
    }
    for (let i = 0; i < dot.length; i++) {
        dot[i].classList.remove("active");
    }
    dot[index].classList.add("active");
    return index;
}

function getImage(index) {
    currentImg = getImageRes(index);
}

function nextBtnFunc(e) {
    currentImg = getImageRes((currentImg + 1) % imagesArr.length, e);
}

function prevBtnFunc(e) {
    currentImg = getImageRes(
        currentImg > 0 ? currentImg - 1 : imagesArr.length - 1,
        e
    );
}

function slideFunc() {
    clearInterval(xInterval);
    isSliding = true;
    xInterval = setInterval(function () {
        if (currentImg == imagesArr.length - 1) {
            currentImg = -1;
        }
        nextBtnFunc();
    }, 4000);
}
function stopFunc() {
    clearInterval(xInterval);
    isSliding = false;
}

// make swipe work
function handleTouch(startX, endX, onSwipeLeft, onSwipeRight) {
    let horizontalDistance = finalTouchX - initialTouchX;
    let verticalDistance = finalTouchY - initialTouchY;

    if (
        Math.abs(horizontalDistance) > Math.abs(verticalDistance) &&
        Math.abs(horizontalDistance) > swipeThreshold
    ) {
        if (finalTouchX - initialTouchX < 0) {
            onSwipeLeft();
        } else {
            onSwipeRight();
        }
    }
}

window.onload = function () {
    window.addEventListener("touchstart", function (event) {
        initialTouchX = event.touches[0].clientX;
        initialTouchY = event.touches[0].clientY;
    });

    window.addEventListener("touchend", function (event) {
        finalTouchX = event.changedTouches[0].clientX;
        finalTouchY = event.changedTouches[0].clientY;

        handleTouch(initialTouchX, finalTouchX, nextBtnFunc, prevBtnFunc);
    });
};
