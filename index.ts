// bài 1
const root:any = document.querySelector('#root');
root.innerHTML = "<h1>xin chào REKEI</h1>"


// bài 2
enum Sex {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

interface Student {
    name: string;
    age: number;
    sex: Sex;
}

let students: Student[] = [
    { name: "John", age: 10, sex: Sex.FEMALE },
    { name: "Niki", age: 11, sex: Sex.MALE },
    { name: "Kanto", age: 12, sex: Sex.FEMALE },
    { name: "Danyo", age: 13, sex: Sex.MALE },
    { name: "Kakashi", age: 14, sex: Sex.FEMALE }
];

function displayStudentList() {
    const table = document.getElementById('studentTable');
    const tbody:any = table.querySelector('tbody');
    tbody.innerHTML = '';

    students.forEach((student,index) => {
        tbody.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.sex}</td>
                <td><button onclick="editStudent(${index})">Edit</button></td>
            </tr>
        `;
    });
}
// bài 3
function addNewStudent(event: Event) {
    event.preventDefault();

    const nameInput = document.getElementById('name') as HTMLInputElement;
    const ageInput = document.getElementById('age') as HTMLInputElement;
    const sexInput = document.getElementById('sex') as HTMLSelectElement;

    const name = nameInput.value.trim();
    const age = Number(ageInput.value);
    const sex = sexInput.value as Sex;

    if (name && age && sex) {
        const newStudent: Student = {
            name: name,
            age: age,
            sex: sex,
        };
        students.push(newStudent);
        displayStudentList();
        (document.getElementById('studentForm') as HTMLFormElement).reset();
    }
}

function sortByName() {
    students.sort((a, b) => a.name.localeCompare(b.name));
    displayStudentList();
}

function sortByAge() {
    students.sort((a, b) => a.age - b.age);
    displayStudentList();
}

function sortBySex() {
    students.sort((a, b) => a.sex.localeCompare(b.sex));
    displayStudentList();
}

const form = document.getElementById('studentForm');
form.addEventListener('submit', addNewStudent);

displayStudentList();

// edit
let editingIndex: number = -1;

function editStudent(index: number) {
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editStudentForm') as HTMLFormElement;

    const student = students[index];
    editingIndex = index;

    const editNameInput = document.getElementById('editName') as HTMLInputElement;
    const editAgeInput = document.getElementById('editAge') as HTMLInputElement;
    const editSexInput = document.getElementById('editSex') as HTMLSelectElement;

    editNameInput.value = student.name;
    editAgeInput.value = String(student.age);
    editSexInput.value = student.sex;

    editModal.style.display = 'block';

    editForm.onsubmit = function(event: Event) {
        event.preventDefault();

        const editedName = editNameInput.value.trim();
        const editedAge = Number(editAgeInput.value);
        const editedSex = editSexInput.value as Sex;

        if (editedName && editedAge && editedSex) {
            const editedStudent: Student = {
                name: editedName,
                age: editedAge,
                sex: editedSex,
            };
            students[editingIndex] = editedStudent;
            displayStudentList();
            closeEditModal();
        }
    };

    const closeModalButton = document.getElementById('closeModal');
    closeModalButton.onclick = closeEditModal;
}

function closeEditModal() {
    const editModal = document.getElementById('editModal');
    const editForm = document.getElementById('editStudentForm') as HTMLFormElement;
    editingIndex = -1;

    editForm.reset();
    editModal.style.display = 'none';
}
