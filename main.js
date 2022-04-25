const schemesBody = document.querySelector(".schemes__body")
const scheme = document.querySelector(".scheme")
const newSchemeButton = document.querySelector(".new-scheme-button")
const newSchemeModal = document.querySelector(".new-scheme-modal")
const closeButton = document.querySelector(".close-button")
const saveButton = document.querySelector(".save-button")
const body = document.querySelector("body")
const form = document.querySelector("form")
let isFormValidate = false
const requiredFields = document.querySelectorAll(".required")
console.log(requiredFields)
let mainData

//Reagowanie na zdarzenia przycisków
newSchemeButton.addEventListener("click",()=>{
    newSchemeModal.classList.remove("hidden")
    body.classList.add("modal-open")
})
closeButton.addEventListener("click",e=>{
    e.preventDefault();
    newSchemeModal.classList.add("hidden")
    body.classList.remove("modal-open")
})
saveButton.addEventListener("click",e=>{
    e.preventDefault();
})

//Pobieranie danych do zmiennej mainData
function fetchData() {
    fetch("response_1548851123961.json")
      .then(res => res.json())
      .then(res=>{mainData=res
        displayData(mainData)
      })
  }

//Główna funkcja wyświetlania danych
function displayData(mainData) {
    let schemesList = mainData.map(element => 
      `<tr class="scheme">
      <td>${element.name || ""}</td>
      <td>${element.description || ""}</td>
      <td>${element.trigger || ""}</td>
      <td>${element.interimtrigger || ""}</td>
      <td>${element.lbmanEffectivedeadlineinfo || ""}</td>
      <td>
          <div class="options__icons">
              <a class="options__icon" href="#"><img src="./icons/eye.png"></a>    
              <a class="options__icon" href="#"><img src="./icons/pencil.png"></a>
              <a class="options__icon" href="#"><img src="./icons/down-arrow.png"></a>
              <a class="options__icon" href="#"><img src="./icons/delete.png"></a>
          </div>
      </td>
    </tr>`
  ).join("");
  schemesBody.innerHTML = schemesList
}

//Podświetlanie wymaganych pól które zostały opuszczone i nie uzupełnione
requiredFields.forEach(field=>{
  field.addEventListener("focusout",e=>{
    if (e.target.value===""){
      e.target.classList.add("warning")
    }
    else{
      e.target.classList.remove("warning")
    }
  })
  field.addEventListener("focusin",e=>{
    e.target.classList.remove("warning")
  })
})

//Ustawienie walidacji formularza 
form.addEventListener("keyup",e=>{
  if(Array.from(requiredFields).every(field=>field.value!=="")){
    isFormValidate=true
  }
  else{
    isFormValidate=false
  }
  isFormValidate? saveButton.disabled=false : saveButton.disabled=true
})

  fetchData()