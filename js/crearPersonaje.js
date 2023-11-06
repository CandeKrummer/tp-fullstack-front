const apiUrl = 'http://localhost:5000/';

const userId = localStorage.getItem('userId'), token = localStorage.getItem('token');


let ropaPorTipo = {};
let personajes = []
let personajeSeleccionado, remeraSeleccionada, pantalonesSeleccionados, zapatillasSeleccionadas

document.addEventListener("DOMContentLoaded", function () {

    const selectores = [document.getElementById("selectPersonajes"), document.getElementById("selectTorso"), document.getElementById("selectPiernas"), document.getElementById("selectPies")];
    let imgPersonaje = document.getElementById("imgPersonaje"),
        imgTorso = document.getElementById("imgTorso"),
        imgPiernas = document.getElementById("imgPiernas"),
        imgPies = document.getElementById("imgPies")

    selectores.forEach((selector) => {
        selector.addEventListener('change', function () {
            selector.removeAttribute('disabled');
        });
    });

    fetch(apiUrl + "personajes")
        .then(response => {

            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud a la API');
            }
        })
        .then(data => {
            personajes = data
            data.forEach((personaje) => {
                let option = document.createElement('option');
                option.value = personaje.id;
                option.textContent = personaje.nombre;
                selectores[0].appendChild(option);
            });
        }).catch(error => {
            console.error(error);
        });

    fetch(apiUrl + "ropa")
        .then(response => {

            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Error en la solicitud a la API');
            }
        })
        .then(data => {
            data.forEach((objeto) => {
                let tipo = objeto.tipo;

                if (!ropaPorTipo[tipo]) {
                    ropaPorTipo[tipo] = [];
                }

                ropaPorTipo[tipo].push(objeto);
            });

            ropaPorTipo.torso.forEach((ropa) => {
                let option = document.createElement('option');
                option.value = ropa.id + "";
                option.textContent = ropa.nombre;
                selectores[1].appendChild(option);
            });

            ropaPorTipo.piernas.forEach((ropa) => {
                let option = document.createElement('option');
                option.value = ropa.id;
                option.textContent = ropa.nombre;
                selectores[2].appendChild(option);
            });

            ropaPorTipo.pies.forEach((ropa) => {
                let option = document.createElement('option');
                option.value = ropa.id;
                option.textContent = ropa.nombre;
                selectores[3].appendChild(option);
            });

        }).catch(error => {
            console.error(error);
        });

    selectores[0].addEventListener('change', function () {
        personajeSeleccionado = personajes.find((per) => per.id == selectores[0].value);
        imgPersonaje.src = "imgs/" + personajeSeleccionado.imagen
    });
    selectores[1].addEventListener('change', function () {
        remeraSeleccionada = ropaPorTipo.torso.find((ropa) => ropa.id == selectores[1].value);
        imgTorso.src = "imgs/" + remeraSeleccionada.imagen
    });
    selectores[2].addEventListener('change', function () {
        pantalonesSeleccionados = ropaPorTipo.piernas.find((ropa) => ropa.id == selectores[2].value);
        imgPiernas.src = "imgs/" + pantalonesSeleccionados.imagen
    });
    selectores[3].addEventListener('change', function () {
        zapatillasSeleccionadas = ropaPorTipo.pies.find((ropa) => ropa.id == selectores[3].value);
        imgPies.src = "imgs/" + zapatillasSeleccionadas.imagen
    });

    function validarSelects() {
        for (let i = 0; i < selectores.length; i++) {
            if (selectores[i].value === '') {
                alert("Debe seleccionar todas las partes del outfit");
                return false;
            }
        }
        return true;
    }

    document.getElementById('guardarOutfit').addEventListener('click', function () {
        if (validarSelects()) {

            const nombreOutfit = document.getElementById('nombreOutfit').value;

            fetch(apiUrl + "personajeVestido", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    Accept: "application/json, text/plain, */*",
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombreVestuario: nombreOutfit, personaje: personajeSeleccionado, torso: remeraSeleccionada, piernas: pantalonesSeleccionados, pies: zapatillasSeleccionadas, idUsuario: userId })
            })
                .then(response => {
                    if (response.status === 201) {
                        window.location.href = "menu.html";
                    } else {
                        throw new Error('Error en la solicitud a la API');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    });
})
