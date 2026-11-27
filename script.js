const helloButton = document.getElementById("helloButton");
const message = document.getElementById("message");

helloButton.addEventListener("click", () => {
  message.textContent = "안녕하세요! 오늘도 즐겁게 개발 공부를 시작해 봅시다!";
});