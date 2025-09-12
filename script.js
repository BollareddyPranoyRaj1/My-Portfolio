// Tabs
var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");
function opentab(tabname){
  for(let tablink of tablinks){
    tablink.classList.remove("active-link");
  }
  for(let tabcontent of tabcontents){
    tabcontent.classList.remove("active-tab");
  }
  event.currentTarget.classList.add("active-link");
  document.getElementById(tabname).classList.add("active-tab");
}

// Typing Effect
const text = "FULL STACK DEVELOPER";
let i = 0;
function typing() {
  if (i < text.length) {
    document.querySelector(".header-text p").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 100);
  }
}
document.querySelector(".header-text p").innerHTML = "";
typing();

// Scroll Animation
const reveals = document.querySelectorAll(".row, .projects-list div, .contact-left, .contact-right");
window.addEventListener("scroll", () => {
  reveals.forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 50) {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
      el.style.transition = "all 1s ease";
    }
  });
});

// Mobile Menu Toggle
const menuBtn = document.querySelector("nav .fa-bars");
const closeBtn = document.querySelector("nav .fa-times");
const navMenu = document.querySelector("nav ul");
menuBtn.addEventListener("click", () => {
  navMenu.classList.add("active");
});
closeBtn.addEventListener("click", () => {
  navMenu.classList.remove("active");
});

// Interstellar Scroll Animation
document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.stlr');
  if (elems.length === 0) return;
  if (!('IntersectionObserver' in window)) {
    elems.forEach(e => e.classList.add('stlr-in'));
    const children = document.querySelectorAll('[data-stlr-child]');
    children.forEach(c => c.classList.add('stlr-in'));
    return;
  }
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const baseDelay = parseFloat(el.dataset.stlrDelay) || 0;
      const childNodes = el.querySelectorAll('[data-stlr-child]');
      if (childNodes.length) {
        childNodes.forEach((child, i) => {
          const childDelay = parseFloat(child.dataset.stlrDelay) || (baseDelay + i * 0.12);
          child.style.transitionDelay = childDelay + 's';
          requestAnimationFrame(() => child.classList.add('stlr-in'));
        });
      } else {
        el.style.transitionDelay = baseDelay + 's';
        requestAnimationFrame(() => el.classList.add('stlr-in'));
      }
      obs.unobserve(el);
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -12% 0px'
  });
  elems.forEach(e => io.observe(e));
});

// Dark/Light Mode Switcher
function setMode(mode) {
  document.body.classList.remove('dark-mode', 'light-mode');
  if (mode === 'light-mode') {
    document.body.classList.add('light-mode');
  }
  // Highlight active button
  document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.toLowerCase() === mode.replace('-mode','')) {
      btn.classList.add('active');
    }
  });
}
// Default mode: dark
setMode('dark-mode');

// Google Sheet Form Submission
const scriptURL = 'https://script.google.com/macros/s/AKfycbzx5etObqtTrdJxvzz6lWzt8lAaLTlhG9ItEeDKf6JyRJDLJbhfSmVlVZBPc08mvt9Y/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
      msg.innerHTML = "Message sent successfully";
      msg.style.display = "block";
      msg.style.color = "green";
      setTimeout(function(){  
        msg.innerHTML = " ";
      }, 5000);
      form.reset();
    })
    .catch(error => {
      console.error('Error!', error.message);
      msg.innerHTML = "Error sending message!";
      msg.style.display = "block";
      msg.style.color = "red";
    });
});
