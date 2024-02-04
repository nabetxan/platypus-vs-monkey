const numConfetti = 70; // Number of confetti particles to create
const confettis: {
  top: string;
  left: string;
  backgroundColor: string;
  animationDelay: string;
}[] = [];
const colors = ["#90f1ef", "#ffd6e0", "#ffef9f", "#c1fba4", "#7bf1a8"];
for (let i = 0; i < numConfetti; i++) {
  confettis.push({
    top: Math.random() * 100 + "%",
    left: Math.random() * 100 + "%",
    backgroundColor: colors[i % 5],
    animationDelay: Math.random() * 5 + "s"
  });
}

const Confetti: React.FC<{
  show?: boolean;
  children: React.ReactNode;
}> = function ({ show, children }) {
  return (
    <div className="w-full h-full">
      {show ? (
        <div id="confetti-container">
          {confettis.map((c, i) => (
            <div key={i} className="confetti" style={c}></div>
          ))}
        </div>
      ) : null}

      {children}
    </div>
  );
};

export default Confetti;
