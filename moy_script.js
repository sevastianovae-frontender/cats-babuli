const main = document.querySelector("main");
const catInfo = document.querySelector(".cat-info");
const rating = function(a) {
    let fill = "<img src='images/cat-fill.svg'>"
    let stroke = "<img src='images/cat-stroke.svg'>"
    let rate = "", kol = 10;
    for (let i = 0; i < kol; i++) {
        rate += i < a ? fill : stroke;
    }
    return rate;
}

cats.forEach(cat => {const item = `
      <div class="card" onclick="showInfo(cats[${cat.id-1}])">
          <div class="card-img" style="background-image: url(${cat.img_link})"></div>
         <h3>${cat.name}</h3>
         <p class="rate">${rating(cat.rate)}</p>
     </div>
  `
  main.innerHTML += item;
});

const getWord = function (a, v1, v2, v0) {
    if (a  < 11 || a  > 14) {
        if (a  == 1) {
            return v1;
        } else if (a  >= 2 && a  <= 4) {
            return v2;
        } else {
            return v0;
        }
    } else {
        return v0;
    }
}

const showInfo = function (data) {
    catInfo.classList.add("active");
    catInfo.firstElementChild.innerHTML = `
        <img class="cat-info-image" src="${data.img_link}">
        <div class="cat-information">
            <h2>${data.name}</h2>
            <h3>${data.age} ${getWord(data.age, "год", "года", "лет")}</h3>
            <p>${data.description}</p>
        </div>
        <div class="cat-info-close" onclick="closeInfo()"></div>
    `;
}

const closeInfo = function () {
    catInfo.classList.remove("active");
}



