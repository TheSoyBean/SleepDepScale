let startTime, endTime;

document.getElementById("startButton").addEventListener("click", startTest);

function startTest() {
  document.getElementById("reactionDisplay").textContent = "Wait for green...";
  document.getElementById("startButton").disabled = true;

  setTimeout(() => {
    document.getElementById("reactionDisplay").textContent = "Click Now!";
    document.body.style.backgroundColor = "green";
    startTime = new Date().getTime();

    document.addEventListener("click", recordReactionTime);
  }, Math.random() * 3000 + 1000); // Random delay
}

function recordReactionTime() {
  endTime = new Date().getTime();
  const reactionTime = endTime - startTime;
  document.getElementById("result").textContent = `Your reaction time: ${reactionTime} ms`;

  sendReactionTime(reactionTime);

  document.body.style.backgroundColor = "#f0f0f0";
  document.getElementById("startButton").disabled = false;
  document.removeEventListener("click", recordReactionTime);
}

function sendReactionTime(reactionTime) {
  fetch("https://your-server-url.com/store-reaction-time", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reactionTime: reactionTime })
  }).then(response => response.json())
    .then(data => console.log("Data saved:", data))
    .catch(error => console.error("Error:", error));
}
