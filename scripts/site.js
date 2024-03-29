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
  var addContainer = document.getElementById("add");
  var softContainer = document.getElementById("soft");
  skills.forEach((skill) => {
    if (skill.type !== "additional" && skill.type !== "soft") {
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
      else {
        framesContainer.appendChild(newSkill);
      }
    } else {
      let newSkill = document.createElement("p");
      newSkill.className = "addi-skill";
      newSkill.textContent = skill.name;
      if (skill.type === "additional") addContainer.appendChild(newSkill);
      else softContainer.appendChild(newSkill);

      // newSkill.className = "skill-container";
      // let image = document.createElement("div");
      // image.className = "icon";
      // image.style.backgroundImage = `url('../assets/images/skill-icons/${skill.image}') `;
      // // image.style.backgroundRepeat = "no-repeat";
      // newSkill.appendChild(image);
      // let text = document.createElement("p");
      // text.innerText = skill.name;
      // newSkill.appendChild(text);
      // if (skill.type === "language") langsContainer.appendChild(newSkill);
      // else if (skill.type === "framework") {
      //   framesContainer.appendChild(newSkill);
      // } else addContainer.appendChild(newSkill);
    }
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
    if (project.images.length == 0) {
      let noImMessage = document.createElement("p");
      noImMessage.innerHTML = "No Image <span>_</span>";
      noImMessage.className = "no-image-message";
      overlayImage.appendChild(noImMessage);
    }
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
    if (project.images.length < 2) {
      rightArrow.style.display = "none";
    }
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
    project.links.forEach((link) => {
      if (link.name == "live") {
        let liveBtn = document.createElement("button");
        liveBtn.className = "icon-btn";
        liveBtn.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.1.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M352 256C352 278.2 350.8 299.6 348.7 320H163.3C161.2 299.6 159.1 278.2 159.1 256C159.1 233.8 161.2 212.4 163.3 192H348.7C350.8 212.4 352 233.8 352 256zM503.9 192C509.2 212.5 512 233.9 512 256C512 278.1 509.2 299.5 503.9 320H380.8C382.9 299.4 384 277.1 384 256C384 234 382.9 212.6 380.8 192H503.9zM493.4 160H376.7C366.7 96.14 346.9 42.62 321.4 8.442C399.8 29.09 463.4 85.94 493.4 160zM344.3 160H167.7C173.8 123.6 183.2 91.38 194.7 65.35C205.2 41.74 216.9 24.61 228.2 13.81C239.4 3.178 248.7 0 256 0C263.3 0 272.6 3.178 283.8 13.81C295.1 24.61 306.8 41.74 317.3 65.35C328.8 91.38 338.2 123.6 344.3 160H344.3zM18.61 160C48.59 85.94 112.2 29.09 190.6 8.442C165.1 42.62 145.3 96.14 135.3 160H18.61zM131.2 192C129.1 212.6 127.1 234 127.1 256C127.1 277.1 129.1 299.4 131.2 320H8.065C2.8 299.5 0 278.1 0 256C0 233.9 2.8 212.5 8.065 192H131.2zM194.7 446.6C183.2 420.6 173.8 388.4 167.7 352H344.3C338.2 388.4 328.8 420.6 317.3 446.6C306.8 470.3 295.1 487.4 283.8 498.2C272.6 508.8 263.3 512 255.1 512C248.7 512 239.4 508.8 228.2 498.2C216.9 487.4 205.2 470.3 194.7 446.6H194.7zM190.6 503.6C112.2 482.9 48.59 426.1 18.61 352H135.3C145.3 415.9 165.1 469.4 190.6 503.6V503.6zM321.4 503.6C346.9 469.4 366.7 415.9 376.7 352H493.4C463.4 426.1 399.8 482.9 321.4 503.6V503.6z"/></svg>';
        // liveBtn.innerHTML =
        //   '<?xml version="1.0" encoding="UTF-8"?> <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" > <!-- Uploaded to SVGRepo https://www.svgrepo.com --> <g id="🔍-Product-Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" > <g id="ic_fluent_live_24_regular" fill="#212121" fill-rule="nonzero" > <path d="M5.98959236,4.92893219 C6.28248558,5.22182541 6.28248558,5.69669914 5.98959236,5.98959236 C2.67013588,9.30904884 2.67013588,14.6909512 5.98959236,18.0104076 C6.28248558,18.3033009 6.28248558,18.7781746 5.98959236,19.0710678 C5.69669914,19.363961 5.22182541,19.363961 4.92893219,19.0710678 C1.02368927,15.1658249 1.02368927,8.83417511 4.92893219,4.92893219 C5.22182541,4.63603897 5.69669914,4.63603897 5.98959236,4.92893219 Z M19.0710678,4.92893219 C22.9763107,8.83417511 22.9763107,15.1658249 19.0710678,19.0710678 C18.7781746,19.363961 18.3033009,19.363961 18.0104076,19.0710678 C17.7175144,18.7781746 17.7175144,18.3033009 18.0104076,18.0104076 C21.3298641,14.6909512 21.3298641,9.30904884 18.0104076,5.98959236 C17.7175144,5.69669914 17.7175144,5.22182541 18.0104076,4.92893219 C18.3033009,4.63603897 18.7781746,4.63603897 19.0710678,4.92893219 Z M8.81801948,7.75735931 C9.1109127,8.05025253 9.1109127,8.52512627 8.81801948,8.81801948 C7.06066017,10.5753788 7.06066017,13.4246212 8.81801948,15.1819805 C9.1109127,15.4748737 9.1109127,15.9497475 8.81801948,16.2426407 C8.52512627,16.5355339 8.05025253,16.5355339 7.75735931,16.2426407 C5.41421356,13.8994949 5.41421356,10.1005051 7.75735931,7.75735931 C8.05025253,7.46446609 8.52512627,7.46446609 8.81801948,7.75735931 Z M16.2426407,7.75735931 C18.5857864,10.1005051 18.5857864,13.8994949 16.2426407,16.2426407 C15.9497475,16.5355339 15.4748737,16.5355339 15.1819805,16.2426407 C14.8890873,15.9497475 14.8890873,15.4748737 15.1819805,15.1819805 C16.9393398,13.4246212 16.9393398,10.5753788 15.1819805,8.81801948 C14.8890873,8.52512627 14.8890873,8.05025253 15.1819805,7.75735931 C15.4748737,7.46446609 15.9497475,7.46446609 16.2426407,7.75735931 Z M12,10.5 C12.8284271,10.5 13.5,11.1715729 13.5,12 C13.5,12.8284271 12.8284271,13.5 12,13.5 C11.1715729,13.5 10.5,12.8284271 10.5,12 C10.5,11.1715729 11.1715729,10.5 12,10.5 Z" id="🎨-Color" ></path> </g> </g> </svg>';
        liveBtn.innerHTML += "Live";
        liveBtn.onclick = function () {
          parent.open(link.url);
        };
        buttons.appendChild(liveBtn);
      } else if (link.name == "code") {
        let codeBtn = document.createElement("button");
        codeBtn.className = "icon-btn";
        codeBtn.innerHTML =
          '<svg width="64px" height="64px" viewBox="0 0 64 64" id="i-github" xmlns="http://www.w3.org/2000/svg" > <path stroke-width="0" fill="currentColor" d="M32 0 C14 0 0 14 0 32 0 53 19 62 22 62 24 62 24 61 24 60 L24 55 C17 57 14 53 13 50 13 50 13 49 11 47 10 46 6 44 10 44 13 44 15 48 15 48 18 52 22 51 24 50 24 48 26 46 26 46 18 45 12 42 12 31 12 27 13 24 15 22 15 22 13 18 15 13 15 13 20 13 24 17 27 15 37 15 40 17 44 13 49 13 49 13 51 20 49 22 49 22 51 24 52 27 52 31 52 42 45 45 38 46 39 47 40 49 40 52 L40 60 C40 61 40 62 42 62 45 62 64 53 64 32 64 14 50 0 32 0 Z" /> </svg>';
        codeBtn.innerHTML += "Code";
        codeBtn.onclick = function () {
          parent.open(link.url);
        };
        // codeBtn.onclick = "location.href='pageurl.html';";
        buttons.appendChild(codeBtn);
      }
    });
    projectsContainer.appendChild(newProject);
  });
};

generateSkills();
generateProjects();
