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
    title: "Explore the Project",
    description: `
      <p>
        The <strong>Project</strong> contains the features that make up your Reminders app.
        Related features are organized into folders, such as <strong>Reminder Management</strong>
        and <strong>Reminder View & Interactions</strong>.
      </p>

      <p>
        If you want to change a feature before building it, click the feature in the
        <strong>Project</strong> and edit it in the <strong>Source</strong> tab.
      </p>

      <p>
        Try this now: select <strong>Reminder Input Form</strong> and make a small change to it.
      </p>
    `
  },

  { title: "Add a New Feature", 
    description: ` 
    <p> The Project is not limited to the features generated in the initial plan. You can add new features at any time. </p> 
    <p> Click <strong>+ Add component</strong> and add a new feature that allows users to <strong>set a due date for a reminder</strong>. </p> ` 
  },

  { 
    title: "Add a Feature to the Timeline", 
    description: 
    ` <p> When you are satisfied with a feature and are ready to build it, drag it from the <strong>Project</strong> onto a <strong>track</strong> in the timeline. </p> 
      <p> Choose one feature you are ready to build and drag it onto <strong>Track 1</strong>. </p> ` 
  },
  { 
    title: "Add a Feature Group", 
    description: 
    ` <p> You can also add a whole group of related features at once. This is useful when you are satisfied with all of the features in a folder. </p> 
    <p> Drag <strong>one</strong> folder onto <strong>Track 1</strong> to add its features to the timeline. </p> ` 
  },

  {
  title: "Plan a Clip",
  description: `
    <p>
      <strong>Plan</strong> lets you review how Code Cut plans to implement a feature
      before actually building it.
    </p>

    <p>
      Click the <strong>first clip</strong> on Track 1, then click <strong>Plan</strong>.
    </p>

    <p>
      Open the <strong>Plan</strong> tab to review the implementation plan for that feature.
      If you are not satisfied with the plan, or feel that something is missing,
      you can edit or add to it.
    </p>
    `
  },

  {
  title: "Plan Multiple Clips",
  description: `
    <p>
      You can also plan multiple clips together to see how Code Cut plans to
      implement them as a group.
    </p>

    <p>
      Click the <strong>{ }</strong> button. Put the <strong>{</strong> to the
      left edge of the second clip, and move the <strong>}</strong> to the
      right edge of the third clip. This defines the range you want to plan.
    </p>

    <p>
      Then click <strong>Plan</strong> to review their combined implementation plan.
      If you are not satisfied with the plan, or feel that something is missing,
      you can edit or add to it.
    </p>
  `
},

  {
  title: "Clear the Current Range",
  description: `
    <p>
      To clear the current plan range, click the <strong>Range</strong> indicator
      in the toolbar, then click <strong>×</strong>.
    </p>

    <p>
      This removes the current range selection without removing any clips from the timeline.
    </p>
  `
},

{
  title: "Group All Three Clips",
  description: `
    <p>
      Now, use the <strong>{ }</strong> button again to group all three clips.
    </p>
  `
},
{
  title: "Build the Clips",
  description: `
    <p>
      Once you are satisfied with the implementation plan, you are ready to build it.
    </p>

    <p>
      Click <strong>Build</strong> to build the three clips based on the
      implementation plan you just did.
    </p>
  `
},
{
  title: "Review the App",
  description: `
    <p>
      After building, open the <strong>Program</strong> tab to review and interact with
      the app you just built.
    </p>

    <p>
      Take a moment to try the features and see how they work together in the current app.
    </p>
  `
},
{
  title: "View Individual Scenes",
  description: `
    <p>
      You can inspect the UI scene associated with individual clips.
    </p>

    <p>
      Move your cursor over a clip and <strong>right-click</strong> it.
      Select <strong>Unlink UI ↔ Logic</strong> to separate the UI scenes from their
      linked logic clips.
    </p>

    <p>
      For each scene, click the <strong>zoom-in button</strong> in the
      bottom-right corner of the scene clip to view it in more detail.
    </p>
  `
},
{
  title: "Remove a Feature",
  description: `
    <p>
      You now decide that the feature represented by the <strong>second clip</strong>
      is redundant and no longer needed in the app.
    </p>

    <p>
      Click the <strong>×</strong> button in the top-right corner of the second clip
      to remove it.
    </p>

    <p>
      After removing the feature, <strong>re-build all remaining clips</strong>
      so the app is rebuilt consistently and continues to work smoothly.
    </p>

    <p>
      This removes the feature from the app and also removes the relevant code
      from the codebase.
    </p>
  `
},
{
  title: "Adjust Comment Density",
  description: `
    <p>
      Click the <strong>Code</strong> tab to review the generated code.
    </p>

    <p>
      You find that the code is difficult to read because it contains too few comments.
      Open <strong>Settings</strong> on the right side of the screen and increase the
      <strong>Comment Density</strong>.
    </p>

    <p>
      This allows the code to include more comments to help you understand and interpret the code.
    </p>
  `
},
{
  title: "Reduce Unnecessary Code",
  description: `
    <p>
      You notice that the codebase is becoming relatively large and contains more defensive
      code than you need.
    </p>

    <p>
      Open <strong>Settings</strong> and adjust the <strong>Defensive Code</strong> setting
      to reduce unnecessary defensive code in the generated implementation.
    </p>
  `
},
{
  title: "Adjust the Scope of a Feature",
  description: `
    <p>
      You now want the feature represented by the <strong>first clip</strong> to include
      more functionality.
    </p>

    <p>
      <strong>Extend</strong> the feature by dragging the <strong>right boundary</strong>
      of the clip further to the right.
    </p>

    <p>
      Similarly, if a feature represented by a clip feels more complicated than necessary,
      you can <strong>trim</strong> it by dragging its right boundary to the left.
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
