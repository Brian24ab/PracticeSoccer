const SESSION_SECONDS = 30 * 60;

const plans = {
  beginner: {
    label: "Beginner",
    title: "Ball Control Builder",
    summary: "Learn clean touches, simple turns, and confident passes in 30 minutes.",
    drills: [
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
        detail: "Practice pullbacks, inside cuts, and outside cuts at comfortable speed.",
        minutes: 7
      },
      {
        title: "Finish strong",
        detail: "End with shots, target passes, or juggling touches for confidence.",
        minutes: 7
      }
    ],
    week: ["First touch", "Inside-foot pass", "Pullbacks", "Weak foot", "Cone dribble", "Target pass", "Review day"]
  },
  intermediate: {
    label: "Intermediate",
    title: "Game-Speed Control",
    summary: "Train faster direction changes, cleaner passing, and sharper first touch.",
    drills: [
      {
        title: "Speed dribble ladder",
        detail: "Explode for five yards after each turn, then reset under control.",
        minutes: 7
      },
      {
        title: "Two-touch wall passing",
        detail: "Receive across your body, pass with the next touch, and switch feet.",
        minutes: 8
      },
      {
        title: "1v1 move reps",
        detail: "Practice scissors, stepovers, and shoulder drops with a burst after each move.",
        minutes: 8
      },
      {
        title: "Target finishing",
        detail: "Pick corners or gates and track how many clean strikes hit the target.",
        minutes: 7
      }
    ],
    week: ["First touch angles", "Two-touch passing", "1v1 moves", "Weak-foot passing", "Turns under pressure", "Finishing", "Challenge test"]
  },
  advanced: {
    label: "Advanced",
    title: "Match Impact Session",
    summary: "Push intensity with scanning, pressure touches, and finishing decisions.",
    drills: [
      {
        title: "Scan and receive",
        detail: "Look over each shoulder before every wall-pass return or partner pass.",
        minutes: 7
      },
      {
        title: "Pressure turns",
        detail: "Call a turn before receiving, then exit fast for five yards.",
        minutes: 8
      },
      {
        title: "Combination pattern",
        detail: "Run pass, move, receive, set, and finish patterns at match rhythm.",
        minutes: 8
      },
      {
        title: "Finishing decisions",
        detail: "Alternate driven, placed, and first-time finishes based on a cue.",
        minutes: 7
      }
    ],
    week: ["Scanning", "Pressure turns", "Combination play", "First-time finish", "Weak-foot speed", "Endurance touches", "Score test"]
  }
};

const storageKey = "practiceSoccerProgress";
const todayKey = new Date().toISOString().slice(0, 10);

let secondsLeft = SESSION_SECONDS;
let timerId = null;
let progress = loadProgress();
let activeLevel = progress.level || "beginner";

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
const levelButtons = document.querySelectorAll(".level-button");
const planLabel = document.querySelector("#planLabel");
const sessionTitle = document.querySelector("#sessionTitle");
const sessionSummary = document.querySelector("#sessionSummary");
const weeklyPlan = document.querySelector("#weeklyPlan");
const playerName = document.querySelector("#playerName");
const copyAssignment = document.querySelector("#copyAssignment");
const copyStatus = document.querySelector("#copyStatus");

function loadProgress() {
  const fallback = {
    sessions: 0,
    minutes: 0,
    streak: 0,
    bestStreak: 0,
    lastCompletedDate: null,
    completedDrillsByDate: {},
    level: "beginner"
  };

  try {
    return { ...fallback, ...JSON.parse(localStorage.getItem(storageKey)) };
  } catch {
    return fallback;
  }
}

function saveProgress() {
  progress.level = activeLevel;
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function getCompletionKey() {
  return `${todayKey}-${activeLevel}`;
}

function getActivePlan() {
  return plans[activeLevel];
}

function renderTimer() {
  timerDisplay.textContent = formatTime(secondsLeft);
  startButton.textContent = timerId ? "Training..." : `Start ${formatTime(secondsLeft)}`;
}

function renderPlanHeader() {
  const plan = getActivePlan();
  planLabel.textContent = plan.label;
  sessionTitle.textContent = plan.title;
  sessionSummary.textContent = plan.summary;

  levelButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.level === activeLevel);
  });
}

function renderDrills() {
  const plan = getActivePlan();
  const completionKey = getCompletionKey();
  const completedToday = new Set(progress.completedDrillsByDate[completionKey] || []);
  drillsContainer.innerHTML = "";

  plan.drills.forEach((drill, index) => {
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

  completedDrills.textContent = `${completedToday.size}/${plan.drills.length} done`;
}

function renderWeeklyPlan() {
  const plan = getActivePlan();
  weeklyPlan.innerHTML = "";

  plan.week.forEach((focus, index) => {
    const card = document.createElement("article");
    card.className = "week-card";
    card.innerHTML = `<span>Day ${index + 1}</span><strong>${focus}</strong>`;
    weeklyPlan.append(card);
  });
}

function toggleDrill(index, isComplete) {
  const completionKey = getCompletionKey();
  const completedToday = new Set(progress.completedDrillsByDate[completionKey] || []);

  if (isComplete) {
    completedToday.add(index);
  } else {
    completedToday.delete(index);
  }

  progress.completedDrillsByDate[completionKey] = [...completedToday];
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
  const plan = getActivePlan();

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

  progress.completedDrillsByDate[getCompletionKey()] = plan.drills.map((_, index) => index);
  saveProgress();
  renderAll();
}

function renderStats() {
  streakCount.textContent = progress.streak;
  sessionsCount.textContent = progress.sessions;
  minutesCount.textContent = progress.minutes;
  bestStreak.textContent = progress.bestStreak;
}

function setLevel(level) {
  activeLevel = level;
  saveProgress();
  renderAll();
}

async function copyCoachAssignment() {
  const plan = getActivePlan();
  const name = playerName.value.trim() || "Player";
  const drillList = plan.drills.map((drill) => `- ${drill.minutes}m ${drill.title}`).join("\n");
  const assignment = `${name}: PracticeSoccer ${plan.label} plan\nToday: ${plan.title}\n${drillList}\nGoal: complete one 30-minute session and mark every drill done.`;

  try {
    await navigator.clipboard.writeText(assignment);
    copyStatus.textContent = "Assignment copied.";
  } catch {
    copyStatus.textContent = assignment;
  }
}

function renderAll() {
  renderPlanHeader();
  renderTimer();
  renderDrills();
  renderWeeklyPlan();
  renderStats();
}

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);
completeButton.addEventListener("click", completeSession);
copyAssignment.addEventListener("click", copyCoachAssignment);

levelButtons.forEach((button) => {
  button.addEventListener("click", () => setLevel(button.dataset.level));
});

renderAll();
