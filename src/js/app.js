if (module.hot) {
  module.hot.accept();
}

import "onepage-scroll/jquery.onepage-scroll";
import { TweenMax } from "gsap/all";
import axios from "axios";

const $axios = axios;
const WOW = require("wowjs");

function isElementExist(elem) {
  return $(elem) && $(elem).length > 0;
}

window.wow = new WOW.WOW();
window.wow.init();


  //      ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //            open-page
  //      ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  const sections = document.querySelectorAll(".section");

  if (window.innerWidth >= 1280) {
    $(".main").onepage_scroll({
      sectionContainer: "section",
      easing: "ease",
      animationTime: 1200,
      pagination: true,
      updateURL: false,
      loop: false,
      keyboard: true,
      responsiveFallback: false,
      direction: "vertical",
    });
  } else {
    body.style.overflow = "auto";
  }





const winstar = document.querySelector(".winstar-is");

const body = document.body;
const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");

hamburger.addEventListener("click", () => {
  menu.classList.toggle("active");
  hamburger.classList.toggle("active");
  body.classList.toggle("overflow");
});

$(document).ready(function () {


  //      ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //            animate-stripes
  //      ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  const pageStripes = document.querySelectorAll(".page-stripes");

  let animationTimer = null;
  let isAnimated = false;

  const setAnimatedClass = () => {
    pageStripes.forEach((section) => {
      section.classList.add("animated");
    });
    isAnimated = true;
  };

  const removeAnimatedClass = () => {
    pageStripes.forEach((section) => {
      if (section.classList.contains("animated")) {
        section.classList.remove("animated");
      }
    });
    isAnimated = false;
    clearTimeout(animationTimer);
    setTimeout(() => {
      animationHandler();
    }, 500);
  };

  const animationHandler = () => {
    setAnimatedClass();
    animationTimer = setTimeout(() => {
      removeAnimatedClass();
    }, 24000);
  };

  animationHandler();

  //      ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //            dots
  //      ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  const dot = document.querySelectorAll(".map__dot");

  dot.forEach((item) => {
    item.addEventListener("click", () => {
      item.parentElement.classList.toggle("active");
    });
  });

  //      ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
  //            button play
  //      ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

  const btnPlay = document.querySelectorAll(".btn-play");

  if (window.innerWidth <= 1280) {
    btnPlay.forEach((item) => item.classList.add("animated"));
  } else {
    btnPlay.forEach((item) => item.classList.remove("animated"));
  }

  btnPlay.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("animated");
    });
  });

  btnPlay.forEach((item) => {
    item.addEventListener("mouseleave", () => {
      item.classList.remove("animated");
    });
  });
});

//      ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//            video
//      ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

setTimeout(() => {
  let tag = document.createElement("script");
  tag.src = "https://www.youtube.com/player_api";
  let firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
    let player = new YT.Player("player", {
      height: "360",
      width: "540",
      videoId: "RoW6yQCI8p0",
      playerVars: { rel: 0, showinfo: 0, ecver: 2 },
      origin: "http://localhost:9000",
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });

    let buttonPlay = document.querySelectorAll(".btn-play"),
      // videoBackground = document.querySelector('.video'),
      modalVideo = document.querySelector(".modal-video"),
      modalBg = document.querySelector(".modal-video__bg"),
      modalCloseButton = document.querySelector(".modal-video__close"),
      modalBackground = document.querySelector(".video-wrapper");

    function closeModalVideo() {
      modalVideo.classList.remove("active");
      body.classList.remove("overflow");
    }

    function onPlayerReady(event) {
      // playVideo();
      buttonPlay.forEach((item) => {
        item.addEventListener("click", () => {
          modalVideo.classList.add("active");
          body.classList.add("overflow");
          player.playVideo();
        });
      });
    }

    var done = false;

    function onPlayerStateChange(event) {
      if (isElementExist(".modal-video__close")) {
        modalCloseButton.addEventListener("click", closeModalVideo);
      }
      if (isElementExist(".modal-video__bg")) {
        modalBg.addEventListener("click", closeModalVideo);
      }
    }

    if (isElementExist(".modal-video__close")) {
      modalCloseButton.addEventListener("click", stopVideo);
    }
    if (isElementExist(".modal-video__bg")) {
      modalBg.addEventListener("click", stopVideo);
    }

    function stopVideo() {
      player.stopVideo();
    }
  };
}, 0);

//      ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
//            form
//      ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||

const forms = document.querySelectorAll(".form");

function validateEmail(value) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return reg.test(String(value).toLowerCase());
}

forms.forEach((form) => {
  form.addEventListener("submit", submitForm);
});

function submitForm(e) {
  e.preventDefault();
  const form = e.target;
  if (validateForm(form)) {
    const url = "./contact.php";
    const formData = new FormData(form);
    // const formData = { email: form.querySelector('input[name=email]').value }
    $axios
      .post(url, formData)
      .then((response) => {
        if (response.status == 200) {
          console.log("SUCCESS: ", response);
          closeModal();
          showModalThanks();
        }
      })
      .catch((error) => {
        console.log("ERROR: ", error);
        alert("something went wrong");
      });
  }
}

function validateForm(formEl) {
  const errorsUI = (selector, isValid) => {
    let field = selector;
    let display = isValid ? "none" : "block";
    let toggleMethod = isValid ? "remove" : "add";
    let errorBlock = field.parentElement.querySelector(".form__mistake");
    field.parentElement.classList[toggleMethod]("mistake");
    errorBlock ? (errorBlock.style.display = display) : false;
  };

  const name = formEl.querySelector('[name="name"]');
  const email = formEl.querySelector('[name="email"]');
  const emailIsValid =
    email.value.length > 3 ? validateEmail(email.value) : false;

  errorsUI(name, name.value);
  errorsUI(email, emailIsValid);

  return name.value && emailIsValid;
}

// const name = formEl.querySelector('[name="name"]');
// const email = formEl.querySelector('[name="email"]');

// forms.forEach(form => {
//   form.addEventListener('submit', submitForm)
// });
