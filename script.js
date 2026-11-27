const helloButton = document.getElementById("helloButton");
const message = document.getElementById("message");

helloButton.addEventListener("click", () => {
  message.textContent = "안녕하세요! 오늘도 즐겁게 개발 공부를 시작해 봅시다!";
});

// ===== 개발 공부 기록 =====
const STORAGE_KEY = "studyRecords";

const studyForm = document.getElementById("studyForm");
const studyInput = document.getElementById("studyInput");
const studyList = document.getElementById("studyList");
const emptyMessage = document.getElementById("emptyMessage");

let records = loadRecords();

function loadRecords() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (error) {
    return [];
  }
}

function saveRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function getToday() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

function renderRecords() {
  studyList.innerHTML = "";

  records.forEach((record) => {
    const item = document.createElement("li");

    const text = document.createElement("div");
    const content = document.createElement("span");
    content.className = "record-content";
    content.textContent = record.content;

    const date = document.createElement("span");
    date.className = "record-date";
    date.textContent = record.date;

    text.append(content, date);

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.dataset.id = record.id;
    deleteButton.textContent = "삭제";

    item.append(text, deleteButton);
    studyList.appendChild(item);
  });

  emptyMessage.classList.toggle("hidden", records.length > 0);
}

function addRecord(content) {
  // 최신 기록이 목록 맨 위에 오도록 배열 앞에 추가
  records.unshift({ id: Date.now(), content, date: getToday() });
  saveRecords();
  renderRecords();
}

function deleteRecord(id) {
  records = records.filter((record) => record.id !== id);
  saveRecords();
  renderRecords();
}

studyForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const content = studyInput.value.trim();
  if (content === "") {
    studyInput.focus();
    return;
  }

  addRecord(content);
  studyInput.value = "";
  studyInput.focus();
});

studyList.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-button");
  if (!button) return;

  if (confirm("이 기록을 삭제하시겠습니까?")) {
    deleteRecord(Number(button.dataset.id));
  }
});

renderRecords();
