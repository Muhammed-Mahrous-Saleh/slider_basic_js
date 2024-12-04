const btns = document.getElementsByClassName("btn");
const prevbtn = btns[0];
const nextbtn = btns[1];
const image = document.getElementById("sliderImg");

window.onload = slideFunc;

image.addEventListener("mouseover", stopFunc);
image.addEventListener("mouseout", slideFunc);
prevbtn.addEventListener("click", prevBtnFunc);
nextbtn.addEventListener("click", nextBtnFunc);
let imagesArr = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
let currentImg = 0;
let xInterval;

let isSliding = false;

function getImageRes(index, e) {
    image.src = "./images/" + imagesArr[index];
    if (isSliding && e && e.type === "click") {
        slideFunc();
    }
    return index;
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
    }, 3000);
}
function stopFunc() {
    clearInterval(xInterval);
    isSliding = false;
}
