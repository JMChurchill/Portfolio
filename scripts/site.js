const primaryNav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
  let visability = primaryNav.getAttribute("data-visible");
  if (visability == "true") {
    primaryNav.setAttribute("data-visible", false);
    primaryNav.setAttribute("aria-hidden", false);
  } else {
    primaryNav.setAttribute("data-visible", true);
    primaryNav.setAttribute("aria-hidden", true);
  }
});

const contactClicked = () => {
  var contactContainer = document.getElementById("contact-container");
  contactContainer.scrollIntoView();
};
const CVClicked = () => {
  alert("Download CV");
};

// generate skills
const generateSkills = async () => {
  skills = await fetch("../assets/skills.json").then((results) =>
    results.json()
  );
  var langsContainer = document.getElementById("langs");
  var framesContainer = document.getElementById("frams");
  skills.forEach((skill) => {
    let newSkill = document.createElement("div");
    newSkill.className = "skill-container";
    let image = document.createElement("div");
    image.className = "icon";
    image.style.backgroundImage = `url('../assets/images/skill-icons/${skill.image}') `;
    // image.style.backgroundRepeat = "no-repeat";

    newSkill.appendChild(image);
    let text = document.createElement("p");
    text.innerText = skill.name;
    newSkill.appendChild(text);
    if (skill.type === "language") langsContainer.appendChild(newSkill);
    else framesContainer.appendChild(newSkill);
  });
};

const generateProjects = async () => {
  projects = await fetch("../assets/projects.json").then((results) =>
    results.json()
  );
  var projectsContainer = document.getElementById("projects");
  projects.forEach((project, j) => {
    let newProject = document.createElement("div");
    newProject.className = "project-container";
    let overlayImage = document.createElement("div");
    overlayImage.className = "image-overlay";
    newProject.appendChild(overlayImage);

    let images = document.createElement("div");
    images.className = "image-conatiner";
    project.images.forEach((i) => {
      let image = document.createElement("div");
      image.className += `image image${j}`;
      image.style.backgroundImage = `url('../assets/images/projects/${i}') `;
      image.style.backgroundSize = images.appendChild(image);
    });
    // let showMore = document.createElement("p");
    // showMore.innerHTML = "More Details";
    // images.appendChild(showMore);
    overlayImage.appendChild(images);
    let leftArrow = document.createElement("div");
    leftArrow.className = "arrow";
    leftArrow.id = "left-arrow";
    leftArrow.style.display = "none";
    let rightArrow = document.createElement("div");
    rightArrow.className = "arrow";
    rightArrow.id = "right-arrow";
    leftArrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M447.1 256C447.1 273.7 433.7 288 416 288H109.3l105.4 105.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448s-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L109.3 224H416C433.7 224 447.1 238.3 447.1 256z"/></svg>`;
    rightArrow.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M438.6 278.6l-160 160C272.4 444.9 264.2 448 256 448s-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L338.8 288H32C14.33 288 .0016 273.7 .0016 256S14.33 224 32 224h306.8l-105.4-105.4c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160C451.1 245.9 451.1 266.1 438.6 278.6z"/></svg>`;

    let currentImage = 1;
    leftArrow.onclick = function () {
      currentImage = currentImage - 1;
      if (currentImage < 2) {
        leftArrow.style.display = "none";
      }
      if (currentImage < project.images.length) {
        rightArrow.style.display = "block";
      }
      // const index = Array.from(dots.children).indexOf(target);
      const selector = `.image${j}:nth-child(${currentImage})`;
      const box = document.querySelector(selector);
      box.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    };
    rightArrow.onclick = function () {
      currentImage = currentImage + 1;
      if (currentImage == project.images.length) {
        rightArrow.style.display = "none";
      }
      if (currentImage > 1) {
        leftArrow.style.display = "block";
      }
      // const index = Array.from(dots.children).indexOf(target);
      const selector = `.image${j}:nth-child(${currentImage})`;
      const box = document.querySelector(selector);
      box.scrollIntoView({
        behavior: "smooth",
        inline: "start",
        block: "nearest",
      });
    };
    overlayImage.appendChild(leftArrow);
    overlayImage.appendChild(rightArrow);

    let tags = document.createElement("div");
    tags.className = "tag_container";

    project.tags.forEach((t) => {
      let tag = document.createElement("p");
      tag.className = "tag";
      tag.innerText = t;
      tags.appendChild(tag);
    });

    newProject.appendChild(tags);

    let title = document.createElement("h3");
    title.className = "name";
    title.innerText = project.title;
    newProject.appendChild(title);

    let description = document.createElement("p");
    description.className = "description";
    description.innerText = project.description;
    newProject.appendChild(description);

    let buttons = document.createElement("div");
    buttons.className = "btn-container";
    newProject.appendChild(buttons);

    let liveBtn = document.createElement("button");
    liveBtn.className = "icon-btn";
    liveBtn.innerHTML =
      '<?xml version="1.0" encoding="UTF-8"?> <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" > <!-- Uploaded to SVGRepo https://www.svgrepo.com --> <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" > <g id="ic_fluent_live_24_regular" fill="#212121" fill-rule="nonzero" > <path d="M5.98959236,4.92893219 C6.28248558,5.22182541 6.28248558,5.69669914 5.98959236,5.98959236 C2.67013588,9.30904884 2.67013588,14.6909512 5.98959236,18.0104076 C6.28248558,18.3033009 6.28248558,18.7781746 5.98959236,19.0710678 C5.69669914,19.363961 5.22182541,19.363961 4.92893219,19.0710678 C1.02368927,15.1658249 1.02368927,8.83417511 4.92893219,4.92893219 C5.22182541,4.63603897 5.69669914,4.63603897 5.98959236,4.92893219 Z M19.0710678,4.92893219 C22.9763107,8.83417511 22.9763107,15.1658249 19.0710678,19.0710678 C18.7781746,19.363961 18.3033009,19.363961 18.0104076,19.0710678 C17.7175144,18.7781746 17.7175144,18.3033009 18.0104076,18.0104076 C21.3298641,14.6909512 21.3298641,9.30904884 18.0104076,5.98959236 C17.7175144,5.69669914 17.7175144,5.22182541 18.0104076,4.92893219 C18.3033009,4.63603897 18.7781746,4.63603897 19.0710678,4.92893219 Z M8.81801948,7.75735931 C9.1109127,8.05025253 9.1109127,8.52512627 8.81801948,8.81801948 C7.06066017,10.5753788 7.06066017,13.4246212 8.81801948,15.1819805 C9.1109127,15.4748737 9.1109127,15.9497475 8.81801948,16.2426407 C8.52512627,16.5355339 8.05025253,16.5355339 7.75735931,16.2426407 C5.41421356,13.8994949 5.41421356,10.1005051 7.75735931,7.75735931 C8.05025253,7.46446609 8.52512627,7.46446609 8.81801948,7.75735931 Z M16.2426407,7.75735931 C18.5857864,10.1005051 18.5857864,13.8994949 16.2426407,16.2426407 C15.9497475,16.5355339 15.4748737,16.5355339 15.1819805,16.2426407 C14.8890873,15.9497475 14.8890873,15.4748737 15.1819805,15.1819805 C16.9393398,13.4246212 16.9393398,10.5753788 15.1819805,8.81801948 C14.8890873,8.52512627 14.8890873,8.05025253 15.1819805,7.75735931 C15.4748737,7.46446609 15.9497475,7.46446609 16.2426407,7.75735931 Z M12,10.5 C12.8284271,10.5 13.5,11.1715729 13.5,12 C13.5,12.8284271 12.8284271,13.5 12,13.5 C11.1715729,13.5 10.5,12.8284271 10.5,12 C10.5,11.1715729 11.1715729,10.5 12,10.5 Z" id="🎨-Color" ></path> </g> </g> </svg>';
    liveBtn.innerHTML += "Live";
    buttons.appendChild(liveBtn);
    let codeBtn = document.createElement("button");
    codeBtn.className = "icon-btn";
    codeBtn.innerHTML =
      '<svg width="64px" height="64px" viewBox="0 0 64 64" id="i-github" xmlns="http://www.w3.org/2000/svg" > <path stroke-width="0" fill="currentColor" d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z" /> </svg>';
    codeBtn.innerHTML += "Code";
    buttons.appendChild(codeBtn);
    projectsContainer.appendChild(newProject);
  });
};

// const rightArrow = document.getElementById("right-arrow");
// const leftArrow = document.getElementById("left-arrow");
// const images = document.getElementsByClassName("image");
// leftArrow.style.display = "none";
// // leftArrow.innerHTML =
// //   '<svg width="64px" height="64px" viewBox="0 0 64 64" id="i-github" xmlns="http://www.w3.org/2000/svg" > <path stroke-width="0" fill="currentColor" d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z" /> </svg>';

// // leftArrow.innerHTML += "<button>a</button>";
// let currentImage = 1;

// rightArrow.addEventListener("click", (e) => {
//   currentImage = currentImage + 1;
//   if (currentImage == images.length) {
//     rightArrow.style.display = "none";
//   }
//   if (currentImage > 1) {
//     leftArrow.style.display = "flex";
//   }
//   // const index = Array.from(dots.children).indexOf(target);
//   const selector = `.image:nth-child(${currentImage})`;
//   const box = document.querySelector(selector);
//   box.scrollIntoView({
//     behavior: "smooth",
//     inline: "start",
//     block: "nearest",
//   });
// });

// leftArrow.addEventListener("click", (e) => {
//   currentImage = currentImage - 1;
//   if (currentImage < 2) {
//     leftArrow.style.display = "none";
//   }
//   if (currentImage < images.length) {
//     rightArrow.style.display = "flex";
//   }
//   // const index = Array.from(dots.children).indexOf(target);
//   const selector = `.image:nth-child(${currentImage})`;
//   const box = document.querySelector(selector);
//   box.scrollIntoView({
//     behavior: "smooth",
//     inline: "start",
//     block: "nearest",
//   });
// });

generateSkills();
generateProjects();
