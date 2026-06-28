const SESSION_SECONDS = 30 * 60;

const drills = [
  {
    title: "Close-touch dribbling",
    detail: "Use both feet through cones or shoes, staying light on your toes.",
    minutes: 8
  },
  {
    title: "Wall passing",
    detail: "Pass with the inside of each foot and control the return touch.",
    minutes: 8
  },
  {
    title: "Turns and exits",
    detail: "Practice pullbacks, inside cuts, and outside cuts at game speed.",
    minutes: 7
  },
  {
    title: "Finish strong",
    detail: "End with shots, target passes, or juggling touches for confidence.",
    minutes: 7
  }
];

const storageKey = "practiceSoccerProgress";
const todayKey = new Date().toISOString().slice(0, 10);

let secondsLeft = SESSION_SECONDS;
let timerId = null;
let progress = loadProgress();

const timerDisplay = document.querySelector("#timerDisplay");
const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton");
const resetButton = document.querySelector("#resetButton");
const completeButton = document.querySelector("#completeButton");
const drillsContainer = document.querySelector("#drills");
const completedDrills = document.querySelector("#completedDrills");
const streakCount = document.querySelector("#streakCount");
const sessionsCount = document.querySelector("#sessionsCount");
const minutesCount = document.querySelector("#minutesCount");
const bestStreak = document.querySelector("#bestStreak");

function loadProgress() {
  const fallback = {
    sessions: 0,
    minutes: 0,
    streak: 0,
    bestStreak: 0,
    lastCompletedDate: null,
    completedDrillsByDate: {}
  };

  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(storageKey)) };
  } catch {
    return fallback;
  }
}

function saveProgress() {
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(secondsLeft);
  startButton.textContent = timerId ? "Training..." : `Start ${formatTime(secondsLeft)}`;
}

function renderDrills() {
  const completedToday = new Set(progress.completedDrillsByDate[todayKey] || []);
  drillsContainer.innerHTML = "";

  drills.forEach((drill, index) => {
    const item = document.createElement("label");
    item.className = "drill-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completedToday.has(index);
    checkbox.addEventListener("change", () => toggleDrill(index, checkbox.checked));

    const text = document.createElement("div");
    text.innerHTML = `<h3>${drill.title}</h3><p>${drill.detail}</p>`;

    const time = document.createElement("span");
    time.className = "drill-time";
    time.textContent = `${drill.minutes}m`;

    item.append(checkbox, text, time);
    drillsContainer.append(item);
  });

  completedDrills.textContent = `${completedToday.size}/${drills.length} done`;
}

function toggleDrill(index, isComplete) {
  const completedToday = new Set(progress.completedDrillsByDate[todayKey] || []);

  if (isComplete) {
    completedToday.add(index);
  } else {
    completedToday.delete(index);
  }

  progress.completedDrillsByDate[todayKey] = [...completedToday];
  saveProgress();
  renderDrills();
}

function startTimer() {
  if (timerId) return;

  timerId = window.setInterval(() => {
    secondsLeft -= 1;
    renderTimer();

    if (secondsLeft <= 0) {
      completeSession();
    }
  }, 1000);

  renderTimer();
}

function pauseTimer() {
  window.clearInterval(timerId);
  timerId = null;
  renderTimer();
}

function resetTimer() {
  pauseTimer();
  secondsLeft = SESSION_SECONDS;
  renderTimer();
}

function getDateOffset(dateKey, days) {
  const date = new Date(`${dateKey}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function completeSession() {
  const alreadyCompletedToday = progress.lastCompletedDate === todayKey;

  pauseTimer();
  secondsLeft = SESSION_SECONDS;

  if (!alreadyCompletedToday) {
    const yesterdayKey = getDateOffset(todayKey, -1);
    progress.streak = progress.lastCompletedDate === yesterdayKey ? progress.streak + 1 : 1;
    progress.bestStreak = Math.max(progress.bestStreak, progress.streak);
    progress.sessions += 1;
    progress.minutes += 30;
    progress.lastCompletedDate = todayKey;
  }

  progress.completedDrillsByDate[todayKey] = drills.map((_, index) => index);
  saveProgress();
  renderAll();
}

function renderStats() {
  streakCount.textContent = progress.streak;
  sessionsCount.textContent = progress.sessions;
  minutesCount.textContent = progress.minutes;
  bestStreak.textContent = progress.bestStreak;
}

function renderAll() {
  renderTimer();
  renderDrills();
  renderStats();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
completeButton.addEventListener("click", completeSession);

renderAll();
