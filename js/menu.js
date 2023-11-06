const apiUrl = 'http://localhost:5000/';

const userId = localStorage.getItem('userId'), token = localStorage.getItem('token');


let ropaPorTipo = {};
let personajes = []

document.addEventListener("DOMContentLoaded", function () {
    getPersonajesUsuario()

    document.getElementById("btnCrearPersonaje").addEventListener('click', function () {
        window.location.href = "crearPersonaje.html";
    });
})

async function getPersonajesUsuario() {
    fetch(apiUrl + "personajesVestidosByIdUsuario/" + userId)
        .then(response => {

            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud a la API');
            }
        })
        .then(data => {
            const characterList = document.getElementById('character-list-user');
            characterList.innerHTML = ""

            data.forEach(character => {
                const col = document.createElement('div');
                col.className = 'col-md-3';

                const card = document.createElement('div');
                card.className = 'card';

                const imgPersonaje = document.createElement('img');
                imgPersonaje.className = 'card-img-top img-fluid position-relative';
                imgPersonaje.src = "imgs/" + character.personaje.imagen;
                imgPersonaje.alt = character.personaje.nombre;

                const imgRemera = document.createElement('img');
                imgRemera.className = 'card-img-top img-fluid position-absolute top-0 start-0';
                imgRemera.src = "imgs/" + character.torso.imagen;
                imgRemera.alt = character.torso.nombre;

                const imgPantalones = document.createElement('img');
                imgPantalones.className = 'card-img-top img-fluid position-absolute top-0 start-0';
                imgPantalones.src = "imgs/" + character.piernas.imagen;
                imgPantalones.alt = character.piernas.nombre;

                const imgZapatillas = document.createElement('img');
                imgZapatillas.className = 'card-img-top img-fluid position-absolute top-0 start-0';
                imgZapatillas.src = "imgs/" + character.pies.imagen;
                imgZapatillas.alt = character.pies.nombre;

                const cardBody = document.createElement('div');
                cardBody.className = 'card-body';

                const p = document.createElement('p');
                p.className = 'card-text';
                p.textContent = character.nombreVestuario;

                cardBody.appendChild(p);

                card.appendChild(imgZapatillas);
                card.appendChild(imgPantalones);
                card.appendChild(imgRemera);
                card.appendChild(imgPersonaje);
                card.appendChild(cardBody);

                col.appendChild(card);

                characterList.appendChild(col);
            })
        }).catch(error => {
            console.error(error);
        });
}







