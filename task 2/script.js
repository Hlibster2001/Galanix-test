let images = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
const deletedImages = JSON.parse(localStorage.getItem("deletedImages")) || [];
const list = document.getElementById("list");
const container = document.getElementById("container");

function render() {
  list.innerHTML = " ";
  for (let i = 0; i < images.length; i += 4) {
    const ul = document.createElement("ul");

    for (let j = i; j < i + 4 && j < images.length; j++) {
      const imageUrl = images[j];
      // Перевіряємо, чи зображення було видалено
      if (!deletedImages.includes(imageUrl)) {
        const li = document.createElement("li");
        const image = document.createElement("img");
        image.src = `./img/${imageUrl}.jpg`;
        image.id = imageUrl;
        image.className = "image";
        const removeImg = document.createElement("span");
        removeImg.className = "remove";

        li.appendChild(image);
        li.appendChild(removeImg);
        ul.appendChild(li);
      }
    }

    list.appendChild(ul);
  }
  amountPlusDate()
}
render();

function removeBtn() {
  const removeButtons = document.querySelectorAll(".remove");

  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const listItem = event.target.parentElement;
      const imageSrc = listItem.querySelector("img").id;

      // Перевіряємо, чи вже видалено це зображення
      const deletedImages =
        JSON.parse(localStorage.getItem("deletedImages")) || [];

      if (!deletedImages.includes(imageSrc)) {
        // Якщо зображення ще не було видалено, то видаляємо його і зберігаємо інформацію про видалення
        deletedImages.push(imageSrc);
        localStorage.setItem("deletedImages", JSON.stringify(deletedImages));

        listItem.remove();
        document.querySelector(".date").innerHTML = "";
        amountPlusDate();
      }
    });
  });
}
removeBtn();

function restoreBtn() {
  const restoreButton = document.createElement("button");
  restoreButton.textContent = "Відновити";
  container.appendChild(restoreButton);

  restoreButton.addEventListener("click", () => {
    localStorage.removeItem("deletedImages");
    render();
  });
}
restoreBtn();

function amountPlusDate() {
  const div = document.querySelector(".date");
  div.innerHTML = " ";
  const li = document.getElementsByTagName("li").length;
  const imgAmout = document.createElement("p");
  const text = `На сторінці ${li} зображень`;
  imgAmout.innerHTML = text;
  div.appendChild(imgAmout);

  const date = document.createElement("p");

  function updateDateTime() {
    let now = new Date();

    let day = now.getDate();
    let month = now.getMonth() + 1;
    let year = now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    let formattedDate = `${day}.${month}.${year} ${hours}:${minutes}`;

    date.innerHTML = formattedDate;
    return date;
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);
  div.appendChild(date);

  container.insertBefore(div, container.firstChild);
}
amountPlusDate();

function popup() {
  let imagePopups = document.querySelectorAll(".image");
  let modalImage = document.getElementById("modal-image");
  let closeButton = document.getElementById("close-button");
  let modal = document.getElementById("modal");

  imagePopups.forEach(function (image) {
    image.addEventListener("click", function () {
      modalImage.src = image.src;

      modal.style.display = "flex";
    });
  });

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });
}
popup();
