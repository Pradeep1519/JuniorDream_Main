// Browser-side logic: fetches course data and renders the interactive tab panel.

interface Course {
  id: string;
  name: string;
  description: string;
  tools: string[];
  duration: string;
  format: string;
  projects: number;
}

const tablist = document.getElementById("course-tablist") as HTMLElement | null;
const panel = document.getElementById("course-panel") as HTMLElement | null;

let activeIndex = 0;
let loadedCourses: Course[] = [];

function createTab(course: Course, index: number): HTMLButtonElement {
  const tab = document.createElement("button");
  tab.type = "button";
  tab.id = `tab-${course.id}`;
  tab.className = "tab";
  tab.setAttribute("role", "tab");
  tab.setAttribute("aria-selected", index === activeIndex ? "true" : "false");
  tab.setAttribute("aria-controls", "course-panel");
  tab.tabIndex = index === activeIndex ? 0 : -1;
  tab.textContent = course.name;
  tab.addEventListener("click", () => selectTab(index));
  return tab;
}

function selectTab(index: number): void {
  if (!tablist) return;
  activeIndex = index;

  const tabs = Array.from(tablist.querySelectorAll<HTMLButtonElement>(".tab"));
  tabs.forEach((tab, i) => {
    const selected = i === index;
    tab.setAttribute("aria-selected", selected ? "true" : "false");
    tab.tabIndex = selected ? 0 : -1;
    if (selected) tab.focus();
  });

  renderCoursePanel(loadedCourses[index]);
}

function handleTabKeydown(event: KeyboardEvent): void {
  if (!tablist) return;
  const tabs = Array.from(tablist.querySelectorAll<HTMLButtonElement>(".tab"));
  if (tabs.length === 0) return;

  if (event.key === "ArrowRight") {
    event.preventDefault();
    selectTab((activeIndex + 1) % tabs.length);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    selectTab((activeIndex - 1 + tabs.length) % tabs.length);
  }
}

function renderCoursePanel(course: Course): void {
  if (!panel) return;

  panel.innerHTML = "";

  const name = document.createElement("h2");
  name.className = "course-name";
  name.textContent = course.name;

  const description = document.createElement("p");
  description.className = "course-description";
  description.textContent = course.description;

  const metaRow = document.createElement("div");
  metaRow.className = "meta-row";
  metaRow.append(
    createMetaItem("Duration", course.duration),
    createMetaItem("Format", course.format),
    createMetaItem("Projects", String(course.projects))
  );

  const chips = document.createElement("div");
  chips.className = "tool-chips";
  course.tools.forEach((tool) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = tool;
    chips.appendChild(chip);
  });

  const enrollBtn = document.createElement("button");
  enrollBtn.type = "button";
  enrollBtn.className = "enroll-btn";
  enrollBtn.textContent = "Enroll now";

  panel.append(name, description, metaRow, chips, enrollBtn);
}

function createMetaItem(label: string, value: string): HTMLDivElement {
  const item = document.createElement("div");
  item.className = "meta-item";

  const labelEl = document.createElement("span");
  labelEl.className = "meta-label";
  labelEl.textContent = label;

  const valueEl = document.createElement("span");
  valueEl.className = "meta-value";
  valueEl.textContent = value;

  item.append(labelEl, valueEl);
  return item;
}

function renderError(): void {
  if (!panel) return;
  panel.innerHTML = "";
  const message = document.createElement("p");
  message.className = "error-message";
  message.textContent = "Courses could not be loaded. Please refresh the page.";
  panel.appendChild(message);
}

async function init(): Promise<void> {
  if (!tablist || !panel) return;

  try {
    const response = await fetch("/api/courses");
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);

    const data = (await response.json()) as Course[];
    loadedCourses = data;

    if (loadedCourses.length === 0) throw new Error("No courses returned");

    tablist.innerHTML = "";
    loadedCourses.forEach((course, index) => {
      tablist.appendChild(createTab(course, index));
    });
    tablist.addEventListener("keydown", handleTabKeydown);

    renderCoursePanel(loadedCourses[activeIndex]);
  } catch (error) {
    console.error("Failed to load courses:", error);
    renderError();
  }
}

init();
