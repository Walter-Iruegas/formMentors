const addMentor = (name, lastname, subject, average) => {
    fetch(`https://practica-99535-default-rtdb.firebaseio.com/.json`, {
        method: "POST",
        body: JSON.stringify({
            name,
            lastname,
            subject,
            average
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showMentor();
        })
        .catch(error => console.error(error));
};

const deletementor = id => {
    fetch(`https://practica-99535-default-rtdb.firebaseio.com/${id}.json`, {
        method: "DELETE"
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            showMentor();
        })
        .catch(error => console.error(error));
};

const editmentor = (id, data) => {
    //cargar los datos del mentor en el formulario para editar
    const name = document.getElementById("name-edit").value = data[id].name
    const lastname = document.getElementById("lastname-edit").value = data[id].lastname;
    const subject = document.getElementById("subject-edit").value = data[id].subject;
    const average = document.getElementById("average-edit").value = data[id].average;
    //mostrar formulario
    document.getElementById("edit-form").style.display = "block";
    //agregar evento al botón para guardar cambios
    document.getElementById("save-edit").addEventListener("click", () => {
        const updatedName = document.getElementById("name-edit").value;
        const updatedLastname = document.getElementById("lastname-edit").value;
        const updatedSubject = document.getElementById("subject-edit").value;
        const updatedAverage = document.getElementById("average-edit").value;
        //hacer una petición PATCH para actualizar los datos del mentor en la base de datos
        fetch(`https://practica-99535-default-rtdb.firebaseio.com/${id}.json`, {
            method: "PATCH",
            body: JSON.stringify({
                name: updatedName,
                lastname: updatedLastname,
                subject: updatedSubject,
                average: updatedAverage
            })
        })
        .then(() => {
            //ocultar formulario de edición
            document.getElementById("edit-form").style.display = "none";
            //mostrar nuevamente los mentores con los cambios actualizados
            showMentor();
        })
        .catch(error => console.error(error));
    });
    //agregar evento al botón para cancelar edición
    document.getElementById("cancel-edit").addEventListener("click", () => {
        //ocultar formulario 
        document.getElementById("edit-form").
        style.display = "none";
    });
};

const showMentor = async () => {
    try {
        const response = await fetch(`https://practica-99535-default-rtdb.firebaseio.com/.json`);
        const data = await response.json();
        const mentortList = document.getElementById("mentor-list");
        while (mentortList.firstChild) {
            mentortList.removeChild(mentortList.firstChild);
        }
        for (const mentor in data) {
            const item = document.createElement("li");
            item.innerText = `Nombre: ${data[mentor].name} Apellido: ${data[mentor].lastname} Materia: ${data[mentor].subject} Promedio: ${data[mentor].average}`;
            mentortList.appendChild(item);

            const deleteButton = document.createElement("button");
            deleteButton.innerText = "Eliminar";
            deleteButton.addEventListener("click", () => {
                deletementor(mentor);
            });
            item.appendChild(deleteButton);
            
            const editButton = document.createElement("button");
            editButton.innerText = "Editar";
            editButton.addEventListener("click", () => {
                editmentor(mentor, data);
            });
            item.appendChild(editButton);
        }
    } catch (error) {
        console.error(error);
    }
};

document.getElementById("mentor-form").addEventListener("submit", event => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const lastname = document.getElementById("lastname").value;
    const subject = document.getElementById("subject").value;
    const average = document.getElementById("average").value;
    addMentor(name, lastname, subject, average);
});

showMentor();
