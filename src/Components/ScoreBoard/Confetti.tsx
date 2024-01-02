import Player from "../Player/Player";

const Confetti: React.FC<{
  winner?: Player;
  children: React.ReactNode;
}> = function ({ winner, children }) {
  const addConfetti = function () {
    const numConfetti = 50; // Number of confetti particles to create
    const container = document.getElementById("confetti-container");

    for (let i = 0; i < numConfetti; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.animationDelay = Math.random() * 5 + "s";
      container && container.appendChild(confetti);
    }
  };

  winner && addConfetti();
  return (
    <div>
      <div id="confetti-container"></div>
      {children}
    </div>
  );
};

export default Confetti;
