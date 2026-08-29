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
    <ol>
      <li>
        <strong>Goal:</strong> Check that the proposed features match the app
        you want to build.
      </li>

      <li>
        The <strong>FEATURE LIBRARY</strong> organizes related functionality into
        <strong>feature groups</strong>. For example,
        <em>Organization & Filtering</em> is a feature group.
        Each group contains <strong>features</strong>, which are specific
        functionalities you can add to your app, such as
        <em>Filter Expenses by Category</em>.
      </li>

      <li>
        You can edit existing features, or add new feature groups and features as your
        idea develops.
      </li>
  
      <li>
        Click <strong>a feature</strong> and make a small change
        in the <strong>Source</strong> tab.
      </li>
    </ol>    
    `
  },

  {
    title: "Expand the App",
    description: `
    <ol>
      <li>
        <strong>Goal:</strong> Add a new feature library, or enrich an existing feature group
        by adding features that were not included in the current feature library.
      </li>

      <li>
        Click <strong>+ Add feature</strong> and add a feature that <strong>lets users
        set a due date for a reminder</strong>.
      </li>
    </ol>
    `
  },

  {
    title: "Arrange Features on the Timeline",
    description: `
    <ol>
      <li>
        <strong>Goal:</strong> Decide which features you want to build,
        and in what development sequence.
      </li>

      <li>
        Drag a <strong>feature</strong> from the <strong>FEATURE LIBRARY</strong>
        onto <strong>Track 1</strong>.
      </li>

      <li>
        You can also drag an entire <strong>feature library</strong> onto the track
        to add all of its features at once.
      </li>

      <li>
        When a feature is added to the timeline, Code Cut represents it
        as a <strong>Feature Clip</strong>. Similar to clips in video editing, each Clip
        occupies a segment of the timeline and represents a unit of implementation
        work that can be selected, modified, or rearranged independently.
      </li>
    </ol>
    `
  },
  // {
  // title: "Review a Mockup",
  //   description: `
  //   <ol>
  //     <li>
  //       <strong>Goal:</strong> Preview what a feature may look like and how users
  //       may interact with it before implementing it.
  //     </li>

  //     <li>
  //       Clips with a user interface display a <strong>mockup scene</strong>
  //       showing a visual preview of the feature.
  //     </li>

  //     <li>
  //       Click the <strong>zoom-in button</strong> in the bottom-left corner of
  //       the clip to inspect the mockup in more detail.
  //     </li>

  //     <li>
  //       Use the mockup to check whether the appearance and expected behaviour
  //       match what you intended for the feature.
  //     </li>
  //   </ol>
  //   `
  // },

  {
    title: "Check the Implementation Plan",
    description: `
    <ol>
      <li>
        <strong>Goal:</strong> Review how clips are intended to be implemented
        before any code is changed.
      </li>

      <li>
        Click the <strong>Plan</strong> button to generate an implementation plan for all
        clips currently on the track.
      </li>

      <li>
        Open the <strong>PLAN</strong> tab and review the proposed implementation
        steps. If anything is missing or does not match what you expect, edit the
        plan before building.
      </li>
    </ol>
    `
  },

  {
    title: "Read the Development Line",
    description: `
    <ol>
      <li>
        <strong>Goal:</strong> Understand the amount of implementation work
        represented by each clip on the timeline.
      </li>

      <li>
        The marks on the <strong>development line</strong> correspond to the
        implementation steps generated in the plan.
      </li>

      <li>
        A clip with more implementation steps appears <strong>wider</strong> on
        the timeline, while a clip with fewer steps appears <strong>narrower</strong>.
      </li>

      <li>
        This gives you a visual sense of the relative amount of development work
        planned for each clip.
      </li>
    </ol>
    `
  },

  {
    title: "Build the Planned Clips",
    description: `
    <ol>
      <li>
        <strong>Goal:</strong> Apply the implementation plan to the actual
        codebase.
      </li>

      <li>
        Once the plan matches what you expect, click <strong>Build</strong>.
        By default, Code Cut will implement all clips currently on the track
        based on the plan you reviewed.
      </li>

      <li>
        As the build progresses, the <strong>red playhead</strong> moves from
        left to right across the timeline, showing which part of the planned
        development work is currently being implemented.
      </li>
    </ol>
    `
  },

  {
    title: "Work on a Selected Range",
    description: `
    <ol>
      <li>
        <strong>Goal:</strong> Sometimes, you may want to work on only part of the timeline rather than all clips. Use a range to focus on a specific clip or a subset of clips.
      </li>

      <li>
        Use the <strong>{ }</strong> range tool to select the second and third clips.
        First, place <strong>{</strong> at the left edge of the second clip, then place
        <strong>}</strong> at the right edge of the third clip. Click <strong>Plan</strong>
        and <strong>Build</strong> to work only on the selected range.
      </li>
    </ol>
    `
  },

  {
  title: "Clear the Selected Range",
  description: `
  <ol>
    <li>
      <strong>Goal:</strong> Return to working with the full track when you
      no longer need to focus on a selected range.
    </li>

    <li>
      Click the <strong>Range</strong> indicator in the toolbar, then click
      <strong>×</strong>.
    </li>

    <li>
      This clears the range selection without removing any clips from the timeline.
    </li>
  </ol>
  `
},

{
  title: "Review the App",
  description: `
  <ol>
    <li>
      <strong>Goal:</strong> Check that the built features work as you expected.
    </li>

    <li>
      Open the <strong>RUN</strong> tab to interact with the app you just built.
    </li>

    <li>
      Try the features and check how they work together in the current app.
    </li>
  </ol>
  `
},

{
  title: "Inspect Diffs During Development",
  description: `
    <p>
      <strong>Goal:</strong> Inspect how the interface and code change
      as your application develops.
    </p>

    <ol>
      <li>
        Move the <strong>playhead</strong> to the space between two
        <strong>built Clips</strong>.
      </li>

      <li>
        Open the <strong>RUN</strong> tab. You can inspect the
        <strong>View Diff</strong> to see how the interface changed,
        and the <strong>Code Diff</strong> to see the corresponding
        changes in the implementation.
      </li>
    </ol>
  `
},

// {
//   title: "Inspect Appearances and Behaviours Through Scenes",
//   description: `
//   <ol>
//     <li>
//       <strong>Goal:</strong> Inspect the different appearances and behaviours that may occur within the functionality represented by a clip.
//     </li>

//     <li>
//       Click <strong>Unlink</strong> beside the track name to separate the clip into its logic and scene representations, allowing you to inspect individual scenes separately.
//     </li>

//     <li>
//       Click the <strong>zoom-in button</strong> in the bottom-right corner of a scene clip to inspect it in more detail.
//     </li>

//     <li>
//       When you are finished, click <strong>🔗 Link</strong> on the scene track to link it back to the logic clip.
//     </li>
//   `
// },

{
  title: "Remove an Unneeded functionality",
  description: `
  <ol>
    <li>
      <strong>Goal:</strong> Sometimes, you may decide that a feature you built earlier is no longer needed. 
      You can remove its clip along with the associated code.
    </li>

    <li>
      Imagine that the functionality represented by the
      <strong>second clip</strong> is no longer needed. Click the
      <strong>×</strong> in the top-right corner of the clip to remove it.
    </li>

     <li>
      Code Cut manages clip implementations modularly to help reduce unnecessary
      dependencies between clips and limit how much removing one functionality
      affects the others.
    </li>

    <li>
      Then <strong>rebuild the remaining clips</strong>. Code Cut will update
      the app and remove the corresponding implementation from the codebase.
    </li>
  </ol>
  `
},

{
  title: "Adjust Clip Effects",
  description: `
  <ol>
    <li>
      <strong>Goal:</strong> Control how a feature component is implemented by adjusting
      its code comments, tests, and defensive code.
    </li>

    <li>
      Open <strong>Effects</strong> for a clip or a range of clips. You can adjust three implementation qualities:
    </li> 

    <ol>
      <li>
        <strong>Comment Density</strong> controls how much documentation
        is included in the generated code.
      </li>

      <li>
        <strong>Tests</strong> controls how broadly Code Cut tests the functionality,
        from essential behaviour to additional edge cases and failure conditions.
      </li>

      <li>
        <strong>Defensive Code</strong> uses RGB controls to tune three dimensions:
        <strong>R</strong> for error handling, <strong>G</strong> for input validation,
        and <strong>B</strong> for edge-case handling. You can adjust the RGB values
        individually or pick a color directly to set the combination.
      </li>
    </ol>

    <li>
      Try changing these Effects to see how they affect the implementation
      generated for the clip.
    </li>
  `
},

{
  title: "Adjust a functionality's Scope",
  description: `
    <ol>
      <li>
        <strong>Goal:</strong> Change how much functionality a clip
        includes without replacing it entirely.
      </li>
      <li>
        To add more functionality to the <strong>first clip</strong>, drag its
        <strong>right edge</strong> further to the right to extend its scope.
        Code Cut will automatically re-plan the functionality. Review the updated
        plan, and if you are satisfied with it, click <strong>Build</strong> to
        implement the changes.
      </li>

      <li>
        If the clip includes more functionality than you need, drag the
        boundary to the left to trim its scope.
      </li>
    </ol>
  `
},
{
  title: "Explore a Different Direction",
  description: `
  <ol>
    <li>
      <strong>Goal:</strong> Explore an alternative direction when you are uncertain
      about a software design decision, without losing the work you have already completed.
    </li>

    <li>
      Click <strong>Select Forward</strong>, then choose the clip where you want
      to explore a different direction. Drag downward from that clip to create a
      <strong>new track</strong>.
    </li>

    <li>
      Modify the clip on the new track to explore an
      alternative design. All feature components implemented before the selected
      clip are preserved, so you can branch from your existing work rather than
      starting over.
    </li>

    <li>
      Before working on the new direction, click the <strong>lock</strong> icon to
      <strong>unlock the new track</strong>, and lock the previous track. This makes
      sure that subsequent planning and building are applied to the track you want
      to continue working on.
    </li>
  `
},
// {
//   title: "Build a Bridge Between Clips",
//   description: `
//   <ol>
//     <li>
//       <strong>Goal:</strong> Define how two clips should relate to
//       each other when their functionalities need to interact.
//     </li>

//     <li>
//       Open the bridges tab and follow the instructions.
//     </li>

//     <li>
//       Choose the type of relationship that best describes how the two clips
//       should work together:
//     </li>

//     <ul>
//       <li><strong>Compose</strong> — Integrate both functionalities into a combined behavior.</li>
//       <li><strong>Depend</strong> — Have one clip reuse functionality provided by the other.</li>
//       <li><strong>Coordinate</strong> — Define how shared behavior between the two clips should work together.</li>
//       <li><strong>Isolate</strong> — Keep changes in one clip from affecting the other.</li>
//       <li><strong>Resolve</strong> — Reconcile conflicting requirements between the two clips.</li>
//     </ul>

//     <li>
//       Create a bridge between two clips and choose the relationship that best
//       matches how you want their functionalities to interact.
//     </li>
//   </ol>
//   `
// },

{
  title: "Undo or Redo an Action",
  description: `
  <ol>
    <li>
      <strong>Goal:</strong> Recover from a change you did not intend, or
      restore an action that you previously undid.
    </li>

    <li>
      Click <strong>Undo</strong> to reverse your most recent action.
    </li>

    <li>
      If you change your mind, click <strong>Redo</strong> to restore the
      action.
    </li>

    <li>
      Try making a small change to the timeline, then use
      <strong>Undo</strong> and <strong>Redo</strong> to move backward and
      forward through that change.
    </li>
  </ol>
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

const collapseToggle = document.getElementById("collapse-toggle");


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

    window.location.href = "index.html";

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
   Collapse / expand
------------------------------ */

collapseToggle.addEventListener("click", () => {

  const collapsed = taskCard.classList.toggle("task-card--collapsed");

  collapseToggle.setAttribute("aria-expanded", String(!collapsed));
  collapseToggle.setAttribute(
    "aria-label",
    collapsed ? "Expand task card" : "Collapse task card"
  );
  collapseToggle.title = collapsed ? "Expand" : "Collapse";
  collapseToggle.textContent = collapsed ? "+" : "–";

});


/* ------------------------------
   Initial render
------------------------------ */

renderTask();
