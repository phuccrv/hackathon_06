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


// sắp xếp

const table = document.getElementById('studentTable');
const thead = table.querySelector('thead');

thead.addEventListener('click', (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.tagName === 'TH' && target.dataset.sort) {
        const sortBy = target.dataset.sort;
        if (sortBy === 'name') {
            sortByName();
        } else if (sortBy === 'age') {
            sortByAge();
        } else if (sortBy === 'sex') {
            sortBySex();
        }
    }
});

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


// const sortIcons = {
//     none: '▲',
//     asc: '▲',
//     desc: '▼'
// };

function toggleSortIcon(target: HTMLElement, sortBy: string) {
    const currentSortIcon = target.textContent.trim();
    const nextSort = currentSortIcon === sortIcons.asc ? sortIcons.desc : sortIcons.asc;
    target.textContent = `${sortBy} ${nextSort}`;
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

function sortTable(event: Event) {
    const target = event.target as HTMLElement;
    if (target.tagName === 'TH' && target.dataset.sort) {
        const sortBy = target.dataset.sort;
        const currentSortIcon = target.textContent.trim();
        toggleSortIcon(target, sortBy);

        if (currentSortIcon === sortIcons.none || currentSortIcon === sortIcons.desc) {
            if (sortBy === 'name') {
                sortByName();
            } else if (sortBy === 'age') {
                sortByAge();
            } else if (sortBy === 'sex') {
                sortBySex();
            }
        } else if (currentSortIcon === sortIcons.asc) {
            if (sortBy === 'name') {
                students.reverse();
            } else if (sortBy === 'age') {
                students.sort((a, b) => b.age - a.age);
            } else if (sortBy === 'sex') {
                students.sort((a, b) => b.sex.localeCompare(a.sex));
            }
            displayStudentList();
        }
    }
}

const thead = table.querySelector('thead');
thead.addEventListener('click', sortTable);