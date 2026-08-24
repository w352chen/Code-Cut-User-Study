/*
  Timed study tasks.

  Each task has 6 steps shown one at a time.
  Time is recorded when the participant clicks Confirm, in minutes.
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
    heading: 'Build an expense-splitting app for a group of 3 - 8 people',
    blurb: 'An expense-splitting app helps a group keep track of shared expenses and understand how costs should be divided among group members.',
  },
};

const SESSION_TASK_IDS = {
  task1: 'focus',
  task2: 'expense',
};

const STEP_TITLES = [
  'Build Five Features',
  'Simplify a Feature',
  'Remove the Second Feature',
  'Remove Error Handling',
  'Add Explanatory Comments',
  'Explore an Alternative Direction',
  'Inspect a Feature',
];

const STEP_BODIES = [
  '<p>Design and build the app with <strong>five</strong> features that you think would make it useful. A <strong>feature</strong> is a distinct user-facing capability that supports a meaningful user goal. A feature may include multiple interface components or actions; individual buttons, fields, or minor interactions do not count as separate features.</p>',
  '<p>Choose one feature you have built that seems more complicated than necessary. Simplify it.</p>',
  '<p>Remove the second feature you built from the application.</p>',
  '<p>You notice that the generated implementation includes more error-handling code than you need for this prototype. Remove the error-handling code.</p>',
  '<p>You are preparing the project for another developer to review. Add more explanatory comments to the generated code so that it is easier to understand, without changing the application\'s behaviour.</p>',
  '<p>You are not sure that the direction you chose for the last feature is the best one. Explore an alternative direction for that feature while keeping the rest of the application unchanged.</p>',
  '<p>You want to better understand how one of the features is implemented and how it appears in the application. Choose one feature and inspect it in more detail.</p>',
];

function techNoteText(condition) {
  if (condition === 'conventional') {
    return 'Please implement this app using HTML, CSS, and JavaScript. Feel free to organize the implementation across multiple files as needed.';
  }
  return 'Please build this app using HTML, CSS, and JavaScript. Code Cut uses this stack.';
}

function stepsFor(task) {
  return STEP_TITLES.map((title, i) => ({
    title,
    description: STEP_BODIES[i],
  }));
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
    'step7_minutes',
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
      formatMinutes(record.steps[6]),
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

  const taskBriefCard = document.getElementById('task-brief-card');
  const stepCard = document.getElementById('step-card');
  const studyTaskStack = document.getElementById('study-task-stack')
    || document.querySelector('.study-task-stack');
  const taskHeading = document.getElementById('task-heading');
  const taskIntro = document.getElementById('task-intro');
  const taskIntroToggle = document.getElementById('task-intro-toggle');
  const taskBlurb = document.getElementById('task-blurb');
  const taskTechNote = document.getElementById('task-tech-note');
  const stepMeta = document.querySelector('.step-meta');
  const taskProgress = document.getElementById('task-progress');
  const taskTitle = document.getElementById('task-title');
  const taskDescription = document.getElementById('task-description');
  const continueHint = document.getElementById('task-continue-hint');
  const stepConfirmBlock = document.getElementById('step-confirm-block');
  const stepFinishedCheckbox = document.getElementById('step-finished-checkbox');
  const conditionNote = document.getElementById('condition-note');
  const conditionNoteText = document.querySelector('.condition-note-text');
  const confirmButton = document.getElementById('confirm-button');
  const homeButton = document.getElementById('home-button');
  const downloadButton = document.getElementById('download-button');
  const hideTaskPanelBtn = document.getElementById('hide-task-panel-btn');
  const showTaskPanelBtn = document.getElementById('show-task-panel-btn');

  let introExpanded = false;

  homeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });

  downloadButton.addEventListener('click', downloadStudyCsv);

  function setStepControlsVisible(visible) {
    if (stepMeta) {
      stepMeta.hidden = !visible;
    }
    if (taskTitle) {
      taskTitle.hidden = !visible;
    }
    continueHint.hidden = !visible;
    if (stepConfirmBlock) {
      stepConfirmBlock.hidden = !visible;
    }
    confirmButton.hidden = !visible;
    if (hideTaskPanelBtn) {
      hideTaskPanelBtn.hidden = !visible;
    }
  }

  function setIntroExpanded(expanded) {
    introExpanded = expanded;
    if (!taskIntro || !taskIntroToggle) {
      return;
    }
    taskIntro.hidden = !expanded;
    taskIntroToggle.setAttribute('aria-expanded', String(expanded));
    taskIntroToggle.textContent = expanded ? 'Hide task details' : 'Show task details';
  }

  function defaultIntroExpandedForStep(stepIndex) {
    return stepIndex === 0;
  }

  function hideTaskPanel() {
    if (!studyTaskStack || !showTaskPanelBtn) {
      return;
    }
    studyTaskStack.classList.add('study-task-stack--hidden');
    showTaskPanelBtn.hidden = false;
  }

  function showTaskPanel() {
    if (!studyTaskStack || !showTaskPanelBtn) {
      return;
    }
    studyTaskStack.classList.remove('study-task-stack--hidden');
    showTaskPanelBtn.hidden = true;
  }

  function showError(title, message) {
    if (taskBriefCard) {
      taskBriefCard.hidden = true;
    }
    setStepControlsVisible(false);
    taskTitle.hidden = false;
    taskTitle.textContent = title;
    taskDescription.innerHTML = `<p>${message}</p>`;
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
      steps: [null, null, null, null, null, null, null],
      currentStep: 0,
      completed: false,
    };
    timings[key] = record;
    saveTimings(timings);
  }

  let currentStep = record.completed ? steps.length : record.currentStep;
  let stepStartedAt = Date.now();

  function renderTaskIntro(stepIndex) {
    if (taskHeading) {
      taskHeading.textContent = task.heading;
      taskHeading.hidden = false;
    }
    if (taskBlurb) {
      taskBlurb.textContent = task.blurb;
    }
    if (taskTechNote) {
      taskTechNote.textContent = techNoteText(condition);
    }
    if (conditionNote) {
      if (condition === 'conventional') {
        if (conditionNoteText) {
          conditionNoteText.textContent = 'Keep this page open while you work in the coding agent.';
        }
        conditionNote.hidden = false;
      } else {
        conditionNote.hidden = true;
      }
    }
    if (taskBriefCard) {
      taskBriefCard.hidden = false;
    }
    setIntroExpanded(defaultIntroExpandedForStep(stepIndex));
  }

  function updateProgress(currentIndex, totalSteps) {
    taskProgress.textContent = `STEP ${currentIndex + 1} OF ${totalSteps}`;
  }

  function persist() {
    const all = loadTimings();
    all[key] = record;
    saveTimings(all);
  }

  function resetStepConfirmation() {
    if (stepFinishedCheckbox) {
      stepFinishedCheckbox.checked = false;
    }
    confirmButton.disabled = true;
  }

  function updateConfirmButtonState() {
    confirmButton.disabled = !stepFinishedCheckbox || !stepFinishedCheckbox.checked;
  }

  function renderComplete() {
    if (condition === 'code_cut') {
      showTaskPanel();
    }
    if (taskHeading) {
      taskHeading.textContent = task.heading;
      taskHeading.hidden = false;
    }
    if (taskBriefCard) {
      taskBriefCard.hidden = false;
    }
    setIntroExpanded(false);
    setStepControlsVisible(false);
    taskTitle.hidden = false;
    taskTitle.textContent = 'Task complete';
    homeButton.hidden = false;

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

    renderTaskIntro(currentStep);
    setStepControlsVisible(true);

    const step = steps[currentStep];
    updateProgress(currentStep, steps.length);
    taskTitle.textContent = step.title;
    taskDescription.innerHTML = step.description;
    confirmButton.textContent = currentStep === steps.length - 1 ? 'Confirm and complete' : 'Confirm';
    resetStepConfirmation();
    homeButton.hidden = true;
    downloadButton.hidden = true;
  }

  let advancing = false;

  function goToNextStep() {
    if (
      advancing
      || record.completed
      || currentStep >= steps.length
      || !stepFinishedCheckbox
      || !stepFinishedCheckbox.checked
    ) {
      return;
    }

    advancing = true;
    confirmButton.disabled = true;

    record.steps[currentStep] = toMinutes(Date.now() - stepStartedAt);
    currentStep += 1;
    record.currentStep = Math.min(currentStep, steps.length);
    setIntroExpanded(defaultIntroExpandedForStep(currentStep));

    if (currentStep >= steps.length) {
      record.completed = true;
      persist();
      renderComplete();
      advancing = false;
      return;
    }

    persist();
    stepStartedAt = Date.now();
    stepCard.classList.add('changing');
    setTimeout(() => {
      renderStep();
      stepCard.classList.remove('changing');
      advancing = false;
    }, 160);
  }

  if (stepFinishedCheckbox) {
    stepFinishedCheckbox.addEventListener('change', updateConfirmButtonState);
  }

  if (taskIntroToggle) {
    taskIntroToggle.addEventListener('click', () => {
      setIntroExpanded(!introExpanded);
    });
  }

  if (hideTaskPanelBtn) {
    hideTaskPanelBtn.addEventListener('click', hideTaskPanel);
  }

  if (showTaskPanelBtn) {
    showTaskPanelBtn.addEventListener('click', showTaskPanel);
  }

  confirmButton.addEventListener('click', goToNextStep);

  renderStep();
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.studyTask === 'true') {
    initStudyTask();
  }
});
