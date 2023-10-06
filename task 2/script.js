function amountPlusDate() {
  const li = document.getElementsByTagName("li").length;
  const container = document.getElementById("container");
  const div = document.createElement("div");
  div.className = "date";

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
