var catsO=new Object();

const requestCat =function(){fetch("https://sb-cats.herokuapp.com/api/show")
.then(response => response.json()).then(data => {localStorage.setItem ("catsO", JSON.stringify(data.data))});}

if(localStorage.getItem("catsO")==null){requestCat();} 

catsO = JSON.parse(localStorage.getItem("catsO"));

var user=null;var userSes=null;
if(sessionStorage.getItem("user")==null){user = prompt("Введите ваше имя");}
if(user!=null){sessionStorage.setItem("user",user);}
userSes=sessionStorage.getItem("user");

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

let a=0;catsO.forEach(cat => {if(a>0){
    const item = `
      <div class="card">
      <div onclick="showInfo(${cat.id})">
      <div class="card-img" style="background-image: url(${cat.img_link})"></div>
         <h3>${cat.name}</h3>
         <p class="rate">${rating(cat.rate)}</p>
      </div>
         <button class="card-button" onclick="changeInfo(${cat.id})">Изменить</button>
         <button class="card-button" onclick="deleteInfo(${cat.id})">Удалить</button>
     </div>
     `;
  main.innerHTML += item;}a++;
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

const showInfo = function (id) {var data=catsO.find(k=>k.id==id)
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

const changeInfo = function (id) {var data=catsO.find(k=>k.id==id)
    catInfo.classList.add("active");
    catInfo.firstElementChild.innerHTML = `
        <img class="cat-info-image" src="${data.img_link}">
        <div class="cat-information">
            <h2><input type="text" value="${data.name}" name="name${id}"></h2>
            <h2><input type="text" value="${data.age}" name="age${id}" size="2"><span style="font-size:15px"> ${getWord(data.age, "год", "года", "лет")}</span></h2>
            <p><textarea style="width:300px;height:100px" name="description${id}">${data.description}</textarea></p>
            <button class="cat-info-button" onclick="save(${data.id})&closeInfo()">Сохранить</button>
        </div>
        <div class="cat-info-close" onclick="closeInfo()"></div>
    `;
}

const save = function(id){if(userSes){
catsO.forEach(cat =>{if(cat.id==id){
cat.name=document.querySelector("input[name=name"+id+"]").value;
cat.age=document.querySelector("input[name=age"+id+"]").value;
cat.description=document.querySelector("textarea[name=description"+id+"]").value;
    }});
//catsO.find(k=>k.id==id).name=document.querySelector("input[name=name"+id+"]").value;
localStorage.setItem ("catsO", JSON.stringify(catsO));
location.reload();}}

const deleteInfo = function (id){if(userSes){var a=0;var k=0; var tr=confirm("Точно?");
    if(tr){catsO.forEach(cat =>{if(cat.id==id){k=a;}a++;});catsO.splice(k,1);
    localStorage.setItem ("catsO", JSON.stringify(catsO));location.reload();}}}

const oldStorage =function(){localStorage.clear();requestCat();setTimeout(ss, 1000);}
function ss(){location.reload();}

var maxID=1;const addInfo=function(){if(userSes){catsO.forEach(cat =>{if(cat.id>maxID){maxID=cat.id;}});
var newCat=new Object;newCat.id=maxID+1;
newCat.name=document.querySelector("#newName").value;
newCat.age=document.querySelector("#newAge").value;
newCat.rate=document.querySelector("#newRate").value;
newCat.description=document.querySelector("#newDiscription").value;
catsO.push(newCat);localStorage.setItem ("catsO", JSON.stringify(catsO));location.reload();}}

 