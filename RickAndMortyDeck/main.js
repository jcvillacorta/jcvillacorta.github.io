const personajesContainer = document.querySelector(".row")
const searchInput = document.getElementById('search');

async function fetchPersonaje(id) {
  const url = `https://rickandmortyapi.com/api/character/${id}`
  const res = await fetch(url)
  const personaje = await res.json()
  createPersonaje(personaje)
}

async function fetchPersonajes(number) {
  for (let i=1; i <= number; i++) {
  await  fetchPersonaje(i)
  }
}

function createPersonaje (personaje) {
    const cardContainer = document.createElement("div")
    cardContainer.classList.add("col")

    const card = document.createElement("div")
    card.classList.add("card")

    const spriteContainer = document.createElement("div")
    spriteContainer.classList.add("img-container")

    const sprite = document.createElement("img")
    sprite.classList.add("imagen")
    sprite.src = personaje.image

    spriteContainer.appendChild(sprite) //para crear un fondo de la imagen

    const contenedor = document.createElement("div")
    contenedor.classList.add("card-body")

    const number = document.createElement("p")
    number.textContent = `#${personaje.id}`

    const name = document.createElement("p")
    name.classList.add("name")
    name.textContent = personaje.name

    const botonmodal = document.createElement("a")
    botonmodal.innerHTML = `<a href="" data-bs-toggle="modal" data-bs-target="#personaje${personaje.id}"  class="btn btn-success">Details</a>`

    contenedor.appendChild(name)
    contenedor.appendChild(number)
    contenedor.appendChild(botonmodal)

    card.appendChild(spriteContainer)
    card.appendChild(contenedor)

  // construyendo modal
    const modal = document.createElement("div")
    modal.setAttribute("class", "modal fade")
    modal.setAttribute("id", `personaje${personaje.id}`)
    modal.setAttribute("tabindex", -1)
    modal.setAttribute("aria-labelledby", "exampleModalLabel")
    modal.setAttribute("aria-hidden", "true")

    const modalDialog = document.createElement("div")
    modalDialog.setAttribute("class", "modal-dialog modal-md modal-dialog-centered")

    const modalContent = document.createElement("div")
    modalContent.classList.add("modal-content")

    const modalHeader = document.createElement("div")
    modalHeader.classList.add("modal-header")

    const modalTitle = document.createElement("h5")
    modalTitle.classList.add("modal-title")
    modalTitle.innerHTML = `${personaje.name}`

    const modalButton = document.createElement("button")
    modalButton.setAttribute("type", "button")
    modalButton.setAttribute("class", "btn-close")
    modalButton.setAttribute("data-bs-dismiss", "modal")
    modalButton.setAttribute("aria-label", "Close")

    modalHeader.appendChild(modalTitle)
    modalHeader.appendChild(modalButton)

    const modalBody = document.createElement("div")
    modalBody.classList.add("modal-body")
    modalBody.innerHTML = `<div><img class="imagen" src="${personaje.image}"></div>
    <div class="tipo-container">
    <p><strong>Specie:</strong> ${personaje.species}</p>
    <p><strong>Gender:</strong>  ${personaje.gender}</p>
    <p><strong>Origin:</strong>  ${personaje.origin.name}</p>
    <p><strong>Status:</strong>  ${personaje.status}</p>
    </div>`    
  
    modalContent.appendChild(modalHeader)
    modalContent.appendChild(modalBody)

    modalDialog.appendChild(modalContent)

    modal.appendChild(modalDialog)
    
    cardContainer.appendChild(card)
    cardContainer.appendChild(modal)
    personajesContainer.appendChild(cardContainer)

}

fetchPersonajes(152)

  //Search function
  function search() {
    const searchvalue = searchInput.value;
    const li = document.querySelectorAll('.col');
    const filSearchValue = searchvalue.toLowerCase();
    for (let i = 0; i < li.length; i++) {
      const personajeName = li[i].querySelector('.name').innerText.toLowerCase();
      if (personajeName.indexOf(filSearchValue) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  }

  //Runs the search function when an search input is detected
  searchInput.addEventListener('keyup', () => {
    search();
  });