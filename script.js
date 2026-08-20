/*
  ---------------------------------------------------
  Code Cut User Study
  ---------------------------------------------------

  IMPORTANT DESIGN PRINCIPLE:

  Only the floating task card changes between tasks.

  The iframe is NEVER reloaded or reassigned a new src.

  This means:
  - timeline state remains
  - clips remain
  - preview remains
  - participant's work remains
  - only instructions change
*/


const tasks = [
  {
    title: "Create a New Project",
    description: `
      <p>Let's start by building a simple reminders app.</p>

      <ol>
        <li>
          Enter <strong>My Reminders</strong> as the project name.
        </li>

        <li>
          Choose where you would like to <strong>store the app</strong> on your computer.
        </li>

        <li>
          In the description box, enter:
          <br><br>
          <em>
            "A simple reminders app where users can add reminders,
            mark them as complete, and delete them."
          </em>
        </li>
      </ol>

      <p>
        When you are ready, click <strong>Create</strong>.
        Code Cut will turn this description into an initial development plan.
      </p>
    `
  },
  {
    title: "Review the Project",
    description: `
      <p>
        <strong>Goal:</strong> Check that the proposed features match the app
        you want to build.
      </p>

      <p>
        The <strong>Project</strong> organizes your app into features and
        feature components. A <strong>feature</strong> is a high-level capability
        of your app, such as <em>Time Management</em>. A
        <strong>feature component</strong> is a specific functionality within
        that feature, such as <em>Set a Deadline</em>.
      </p>

      <p>
        You can edit existing components, or add new features and components as your
        idea develops.
      </p>

      <p>
        Select <strong>a feature component</strong> and make a small change
        in the <strong>Source</strong> tab.
      </p>
    `
  },

  {
    title: "Expand the App",
    description: `
      <p>
        <strong>Goal:</strong> Add a new feature, or enrich an existing feature
        by adding components that were not included in the initial project plan.
      </p>

      <p>
        Click <strong>+ Add component</strong> and add a component that lets users
        set a <strong>due date</strong> for a reminder.
      </p>
    `
  },

  {
    title: "Arrange Features on the Timeline",
    description: `
      <p>
        <strong>Goal:</strong> Decide which features or feature components you want to build,
        and in what development sequence.
      </p>

      <p>
        Drag a <strong>feature component</strong> from the <strong>Project</strong>
        onto <strong>Track 1</strong>.
      </p>

      <p>
        You can also drag an entire <strong>feature</strong> onto the track
        to add all of its components at once.
      </p>
    `
  },

  {
    title: "Check the Implementation Plan",
    description: `
      <p>
        <strong>Goal:</strong> Review how features are intended to be implemented
        before any code is changed.
      </p>

      <p>
        Click the <strong>Plan</strong> button to generate an implementation plan for all
        feature components currently on the track.
      </p>

      <p>
        Open the <strong>PLAN</strong> tab and review the proposed implementation
        steps. If anything is missing or does not match what you expect, edit the
        plan before building.
      </p>
    `
  },

  {
    title: "Build the Planned Clips",
    description: `
      <p>
        <strong>Goal:</strong> Apply the implementation plan to the actual
        codebase.
      </p>

      <p>
        Once the plan matches what you expect, click <strong>Build</strong>.
        By default, Code Cut will implement all clips currently on the track
        based on the plan you reviewed.
      </p>
    `
  },

  {
    title: "Work on a Selected Range",
    description: `
      <p>
        <strong>Goal:</strong> Focus on a subset of clips when you only want
        to plan or build part of the track.
      </p>

      <p>
        Use the <strong>{ }</strong> range tool to select the second and
        third clips. Then click <strong>Plan</strong> and <strong>Build</strong>
        to work only on the selected range.
      </p>
    `
  },

  {
  title: "Clear the Selected Range",
  description: `
    <p>
      <strong>Goal:</strong> Return to working with the full track when you
      no longer need to focus on a selected range.
    </p>

    <p>
      Click the <strong>Range</strong> indicator in the toolbar, then click
      <strong>×</strong>.
    </p>

    <p>
      This clears the range selection without removing any clips from the timeline.
    </p>
  `
},

{
  title: "Review the App",
  description: `
    <p>
      <strong>Goal:</strong> Check that the built features work as you expected.
    </p>

    <p>
      Open the <strong>Program</strong> tab to interact with the app you just built.
    </p>

    <p>
      Try the features and check how they work together in the current app.
    </p>
  `
},

{
  title: "Inspect Possible UI Cases Through Scenes",
  description: `
    <p>
      <strong>Goal:</strong> Explore the different UI cases that may occur
      within the functionality represented by a clip.
    </p>

    <p>
      Right-click a clip and select <strong>Unlink UI ↔ Logic</strong>.
      This reveals its UI scenes separately from the logic clip so you can
      inspect each case individually.
    </p>

    <p>
      Click the <strong>zoom-in button</strong> in the bottom-right corner of a
      scene clip to view it in more detail.
    </p>
  `
},

{
  title: "Remove an Unneeded Component",
  description: `
    <p>
      <strong>Goal:</strong> Remove functionality that you no longer want in the app.
    </p>

    <p>
      Imagine that the feature component represented by the
      <strong>second clip</strong> is no longer needed. Click the
      <strong>×</strong> in the top-right corner of the clip to remove it.
    </p>

    <p>
      Then <strong>rebuild the remaining clips</strong>. Code Cut will update
      the app and remove the corresponding implementation from the codebase.
    </p>
  `
},

{
  title: "Adjust Comment Density",
  description: `
    <p>
      <strong>Goal:</strong> Make generated code easier to understand by
      controlling how many explanatory comments it includes.
    </p>

    <p>
      Open the <strong>Code</strong> tab to review the generated code.
      Then open <strong>Settings</strong> and increase
      <strong>Comment Density</strong>.
    </p>

    <p>
      This tells Code Cut to include more comments in future generated code.
    </p>
  `
},

{
  title: "Reduce Defensive Code",
  description: `
    <p>
      <strong>Goal:</strong> Control how much defensive code Code Cut adds
      to the implementation.
    </p>

    <p>
      If the code contains more validation, checks, or safeguards than you need,
      open <strong>Settings</strong> and reduce the
      <strong>Defensive Code</strong> setting.
    </p>

    <p>
      This helps keep the implementation smaller and simpler when additional
      safeguards are unnecessary.
    </p>
  `
},

{
  title: "Adjust a Component's Scope",
  description: `
    <p>
      <strong>Goal:</strong> Change how much functionality a feature component
      includes without replacing it entirely.
    </p>

    <p>
      To add more functionality to the <strong>first clip</strong>, drag its
      <strong>right boundary</strong> further to the right to extend its scope.
    </p>

    <p>
      If the component includes more functionality than you need, drag the
      boundary to the left to trim its scope.
    </p>
  `
},

];


let currentTaskIndex = 0;


/* ------------------------------
   Get UI elements
------------------------------ */

const taskCard = document.getElementById("task-card");

const taskProgress = document.getElementById("task-progress");
const taskTitle = document.getElementById("task-title");
const taskDescription = document.getElementById("task-description");

const backButton = document.getElementById("back-button");
const nextButton = document.getElementById("next-button");


/* ------------------------------
   Render task card

   NOTE:
   Nothing here touches the iframe.
------------------------------ */

function renderTask() {

  const task = tasks[currentTaskIndex];


  taskProgress.textContent =
    `Task ${currentTaskIndex + 1} of ${tasks.length}`;

  taskTitle.textContent =
    task.title;

  taskDescription.innerHTML = task.description;


  /* Back button */

  backButton.disabled =
    currentTaskIndex === 0;


  /* Last task */

  if (currentTaskIndex === tasks.length - 1) {

    nextButton.textContent = "Complete";

  } else {

    nextButton.textContent = "Next";

  }
}


/* ------------------------------
   Small task-card transition

   Only the task card animates.
------------------------------ */

function changeTask(newIndex) {

  if (
    newIndex < 0 ||
    newIndex >= tasks.length
  ) {
    return;
  }


  taskCard.classList.add("changing");


  setTimeout(() => {

    currentTaskIndex = newIndex;

    renderTask();

    taskCard.classList.remove("changing");

  }, 160);
}


/* ------------------------------
   Next
------------------------------ */

nextButton.addEventListener("click", () => {

  /*
    Final task
  */

  if (
    currentTaskIndex === tasks.length - 1
  ) {

    taskTitle.textContent =
      "Study Task Complete";

    taskDescription.textContent =
      "You have completed the development task.";

    taskProgress.textContent =
      "Complete";

    nextButton.disabled = true;
    backButton.disabled = true;

    return;
  }


  changeTask(currentTaskIndex + 1);

});


/* ------------------------------
   Back
------------------------------ */

backButton.addEventListener("click", () => {

  if (currentTaskIndex > 0) {

    changeTask(currentTaskIndex - 1);

  }

});


/* ------------------------------
   Initial render
------------------------------ */

renderTask();
