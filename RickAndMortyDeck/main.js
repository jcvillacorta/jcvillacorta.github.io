const personajeContainer = document.querySelector(".row")
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
  cardContainer.innerHTML = `
  <div class="card">
    <div class="img-container">
    <img class="imagen" src="${personaje.image}">
    </div>
    <div class="card-body">
    <p class="name">${personaje.name}</p>
    <p>#${personaje.id}</p>
    <a><a href="" data-bs-toggle="modal" data-bs-target="#personaje${personaje.id}" class="btn btn-success">Details</a></a>
    </div>
  </div>

  <div class="modal fade" id="personaje${personaje.id}" tabindex="-1" aria-labelledby="exampleModalLabel" style="display: none;" aria-hidden="true">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header"><h5 class="modal-title">${personaje.name}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div><img class="imagen" src="${personaje.image}"></div>
          <div class="tipo-container">
          <p><strong>Specie:</strong> ${personaje.species}</p>
          <p><strong>Gender:</strong>  ${personaje.gender}</p>
          <p><strong>Origin:</strong>  ${personaje.origin.name}</p>
          <p><strong>Status:</strong>  <span class="status"><span class="${vivoMuerto(personaje.status)}"></span> ${personaje.status}</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
  personajeContainer.appendChild(cardContainer)
}

function vivoMuerto(status) {
  if (status == "Alive") {
     return "status_icon_alive" 
  } else if (status == "Dead") {
    return "status_icon_dead"
  } else {
    return "status_icon_unkown"
  }
}

fetchPersonajes(152)

  //Search function
  function search() {
    const searchvalue = searchInput.value;
    const li = document.querySelectorAll('.col');
    const filSearchValue = searchvalue.toLowerCase();
    for (let i = 0; i < li.length; i++) {
      const pokemonName = li[i].querySelector('.name').innerText.toLowerCase();
      if (pokemonName.indexOf(filSearchValue) > -1) {
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