const contactClicked = () => {
  var contactContainer = document.getElementById("contact-container");
  contactContainer.scrollIntoView();
};

// generate skills
const generateSkills = async () => {
  skills = await fetch("../assets/skills.json").then((results) =>
    results.json()
  );
  var langsContainer = document.getElementById("langs");
  var framesContainer = document.getElementById("frams");
  skills.forEach((skill) => {
    console.log(skill.name);
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

generateSkills();
