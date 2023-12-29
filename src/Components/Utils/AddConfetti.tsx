export const addConfetti = function (div: HTMLElement) {
  const numConfetti = 50; // Number of confetti particles to create
  const container = document.createElement("div");
  container.setAttribute("id", "confetti-container");
  container.style.position = "relative";
  container.style.width = "100%";
  container.style.height = "100%";

  for (let i = 0; i < numConfetti; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "%";
    confetti.style.animationDelay = Math.random() * 5 + "s";
    container.appendChild(confetti);
  }

  div.appendChild(container);
};
