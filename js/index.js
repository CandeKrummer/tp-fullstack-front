const apiUrl = 'http://localhost:5000/';

document.addEventListener("DOMContentLoaded", function () {
    getUltimos5PersonajesVestidos()

    let loginButton = document.getElementById("loginButton")

    loginButton.addEventListener("click", function () {
        var username = document.getElementById("username").value;
        var pin = document.getElementById("pin").value;

        fetch(apiUrl + "auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: username, pin: pin })
        })
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else {
                    throw new Error('Error en la solicitud a la API');
                }
            })
            .then(responseData => {
                localStorage.setItem('userId', responseData.user.id);
                localStorage.setItem('token', responseData.token);
                window.location.href = "menu.html";
            })
            .catch(error => {
                alert("Credenciales incorrectas. Inténtalo de nuevo.");
            });
    });
})

async function getUltimos5PersonajesVestidos() {
    fetch(apiUrl + "ultimos5PersonajesVestidos")
        .then(response => {

            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud a la API');
            }
        })
        .then(data => {
            const characterList = document.getElementById('character-list');

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







