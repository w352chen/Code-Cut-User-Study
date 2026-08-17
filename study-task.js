/*
  Timed study tasks.

  Each task has 6 steps shown one at a time.
  Time is recorded when the participant clicks Continue, in minutes.
  The Code Cut iframe is never reloaded from this file.
*/

const TIMINGS_KEY = 'task_timings';

const CONDITION_LABELS = {
  code_cut: 'code cut',
  conventional: 'conventional ai coding agent',
};

const STUDY_TASKS = {
  focus: {
    id: 'focus',
    csvName: 'focus timer',
    heading: 'Build a focus timer for students',
    blurb: 'A focus timer is an application that helps users concentrate on a task for a period of time and manage their focus sessions.',
  },
  expense: {
    id: 'expense',
    csvName: 'expense-splitting',
    heading: 'Build an expense-splitting app for a small group',
    blurb: 'An expense-splitting app helps a group keep track of shared expenses and understand how costs should be divided among group members.',
  },
};

const SESSION_TASK_IDS = {
  task1: 'focus',
  task2: 'expense',
};

const STEP_TITLES = [
  'Build about five features',
  'Simplify a feature',
  'Expand a feature',
  'Remove a feature',
  'Add comments to the code',
  'Inspect a feature interface',
];

const STEP_BODIES = [
  '<p>Design and build the app with <strong>five</strong> features that you think would make it useful.</p>',
  '<p>Choose one feature you have built that seems more complicated than necessary. Simplify it.</p>',
  '<p>Choose another feature that feels too limited. Expand its functionality.</p>',
  '<p>Remove the second feature you built from the application.</p>',
  '<p>You are preparing the project for another developer to review. Add more explanatory comments to the generated code so that it is easier to understand, without changing the application\'s behaviour.</p>',
  '<p>You want to take a closer look at how one of the features appears in the application. Choose one feature and inspect its interface in more detail.</p>',
];

function stepsFor(task) {
  return STEP_TITLES.map((title, i) => {
    const body = i === 0
      ? `<p>${task.blurb}</p>${STEP_BODIES[i]}`
      : STEP_BODIES[i];
    return { title, description: body };
  });
}

function loadTimings() {
  try {
    return JSON.parse(localStorage.getItem(TIMINGS_KEY) || '{}');
  } catch (err) {
    return {};
  }
}

function saveTimings(timings) {
  localStorage.setItem(TIMINGS_KEY, JSON.stringify(timings));
}

function recordKey(condition, taskId) {
  return `${condition}_${taskId}`;
}

function toMinutes(elapsedMs) {
  return Math.round((elapsedMs / 60000) * 100) / 100;
}

function formatMinutes(value) {
  if (value == null || Number.isNaN(Number(value))) {
    return '';
  }
  return Number(value).toFixed(2);
}

function csvCell(value) {
  const text = String(value ?? '');
  if (/[",\n]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function getCompletedRecords() {
  const timings = loadTimings();
  const sessions = JSON.parse(localStorage.getItem('study_sessions') || '[]');
  const ordered = [];
  const seen = new Set();

  sessions.forEach((session) => {
    const taskId = SESSION_TASK_IDS[session.task];
    const key = recordKey(session.tool, taskId);
    const record = timings[key];
    if (record && record.completed) {
      ordered.push(record);
      seen.add(key);
    }
  });

  Object.entries(timings).forEach(([key, record]) => {
    if (!seen.has(key) && record.completed) {
      ordered.push(record);
    }
  });

  return ordered;
}

function getCompletedTaskCount() {
  return getCompletedRecords().length;
}

function downloadStudyCsv() {
  const participantId = localStorage.getItem('participant_id') || '';
  const records = getCompletedRecords();

  if (records.length === 0) {
    alert('No completed task timings to download yet.');
    return;
  }

  const header = [
    'participant_id',
    'condition',
    'task_name',
    'step1_minutes',
    'step2_minutes',
    'step3_minutes',
    'step4_minutes',
    'step5_minutes',
    'step6_minutes',
  ];

  const lines = [header.join(',')];

  records.forEach((record) => {
    const row = [
      participantId,
      record.condition,
      record.task_name,
      formatMinutes(record.steps[0]),
      formatMinutes(record.steps[1]),
      formatMinutes(record.steps[2]),
      formatMinutes(record.steps[3]),
      formatMinutes(record.steps[4]),
      formatMinutes(record.steps[5]),
    ].map(csvCell);
    lines.push(row.join(','));
  });

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `participant-${participantId}-study-timings.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

window.getCompletedTaskCount = getCompletedTaskCount;
window.downloadStudyCsv = downloadStudyCsv;


function initStudyTask() {
  const condition = document.body.dataset.condition;
  const taskId = new URLSearchParams(window.location.search).get('task');
  const task = STUDY_TASKS[taskId];
  const steps = task ? stepsFor(task) : [];

  const taskCard = document.getElementById('task-card');
  const appName = document.getElementById('task-app-name');
  const taskProgress = document.getElementById('task-progress');
  const taskTitle = document.getElementById('task-title');
  const taskDescription = document.getElementById('task-description');
  const continueHint = document.getElementById('task-continue-hint');
  const conditionNote = document.getElementById('condition-note');
  const nextButton = document.getElementById('next-button');
  const homeButton = document.getElementById('home-button');
  const downloadButton = document.getElementById('download-button');

  homeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  downloadButton.addEventListener('click', downloadStudyCsv);

  function showError(title, message) {
    taskProgress.textContent = 'Error';
    taskTitle.textContent = title;
    taskDescription.innerHTML = `<p>${message}</p>`;
    continueHint.hidden = true;
    nextButton.hidden = true;
    homeButton.hidden = false;
  }

  if (!localStorage.getItem('participant_id')) {
    showError(
      'Start from the study page',
      'Enter your participant ID on the study page before opening a task.'
    );
    return;
  }

  if (!task || (condition !== 'code_cut' && condition !== 'conventional')) {
    showError(
      'This task link is missing information',
      'Return to the study page and open the task from the step list.'
    );
    return;
  }

  const key = recordKey(condition, task.id);
  const timings = loadTimings();
  let record = timings[key];

  if (!record) {
    record = {
      condition: CONDITION_LABELS[condition],
      task_name: task.csvName,
      steps: [null, null, null, null, null, null],
      currentStep: 0,
      completed: false,
    };
    timings[key] = record;
    saveTimings(timings);
  }

  let currentStep = record.completed ? steps.length : record.currentStep;
  let stepStartedAt = Date.now();

  if (conditionNote && condition === 'conventional') {
    conditionNote.textContent = 'Keep this page open while you work in the coding agent.';
  }

  function persist() {
    const all = loadTimings();
    all[key] = record;
    saveTimings(all);
  }

  function renderComplete() {
    appName.textContent = task.heading;
    taskProgress.textContent = 'Complete';
    taskTitle.textContent = 'Task complete';
    continueHint.hidden = true;
    nextButton.hidden = true;
    homeButton.hidden = false;

    if (conditionNote) {
      conditionNote.hidden = true;
    }

    const bothDone = getCompletedTaskCount() >= 2;
    if (bothDone) {
      taskDescription.innerHTML = '<p>You have finished both study tasks. Download the timing CSV, then return to the study page if you still have a survey to complete.</p>';
      downloadButton.hidden = false;
    } else {
      taskDescription.innerHTML = '<p>You have finished this task. Return to the study page for the next step.</p>';
    }
  }

  function renderStep() {
    if (record.completed || currentStep >= steps.length) {
      renderComplete();
      return;
    }

    const step = steps[currentStep];
    appName.textContent = task.heading;
    taskProgress.textContent = `Step ${currentStep + 1} of ${steps.length}`;
    taskTitle.textContent = step.title;
    taskDescription.innerHTML = step.description;
    continueHint.hidden = false;
    nextButton.hidden = false;
    nextButton.disabled = false;
    nextButton.textContent = currentStep === steps.length - 1 ? 'Complete' : 'Continue';
    homeButton.hidden = true;
    downloadButton.hidden = true;
    if (conditionNote && condition === 'conventional') {
      conditionNote.hidden = false;
    }
  }

  let advancing = false;

  function goToNextStep() {
    if (advancing || record.completed || currentStep >= steps.length) {
      return;
    }

    advancing = true;
    nextButton.disabled = true;

    record.steps[currentStep] = toMinutes(Date.now() - stepStartedAt);
    currentStep += 1;
    record.currentStep = Math.min(currentStep, steps.length);

    if (currentStep >= steps.length) {
      record.completed = true;
      persist();
      renderComplete();
      advancing = false;
      return;
    }

    persist();
    stepStartedAt = Date.now();
    taskCard.classList.add('changing');
    setTimeout(() => {
      renderStep();
      taskCard.classList.remove('changing');
      advancing = false;
    }, 160);
  }

  nextButton.addEventListener('click', goToNextStep);

  renderStep();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.studyTask === 'true') {
    initStudyTask();
  }
});
