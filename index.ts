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

    students.forEach((student) => {
        tbody.innerHTML += `
            <tr>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.sex}</td>
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
