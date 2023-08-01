// bài 1
var root = document.querySelector('#root');
root.innerHTML = "<h1>xin chào REKEI</h1>";
// index.ts
var Sex;
(function (Sex) {
    Sex["MALE"] = "MALE";
    Sex["FEMALE"] = "FEMALE";
})(Sex || (Sex = {}));
var students = [
    { name: "John", age: 10, sex: Sex.FEMALE },
    { name: "Niki", age: 11, sex: Sex.MALE },
    { name: "Kanto", age: 12, sex: Sex.FEMALE },
    { name: "Danyo", age: 13, sex: Sex.MALE },
    { name: "Kakashi", age: 14, sex: Sex.FEMALE }
];
function displayStudentList() {
    var table = document.getElementById('studentTable');
    var tbody = table.querySelector('tbody');
    tbody.innerHTML = '';
    students.forEach(function (student) {
        tbody.innerHTML += "\n            <tr>\n                <td>".concat(student.name, "</td>\n                <td>").concat(student.age, "</td>\n                <td>").concat(student.sex, "</td>\n            </tr>\n        ");
    });
}
function addNewStudent(event) {
    event.preventDefault();
    var nameInput = document.getElementById('name');
    var ageInput = document.getElementById('age');
    var sexInput = document.getElementById('sex');
    var name = nameInput.value.trim();
    var age = Number(ageInput.value);
    var sex = sexInput.value;
    if (name && age && sex) {
        var newStudent = {
            name: name,
            age: age,
            sex: sex,
        };
        students.push(newStudent);
        displayStudentList();
        document.getElementById('studentForm').reset();
    }
}
function sortByName() {
    students.sort(function (a, b) { return a.name.localeCompare(b.name); });
    displayStudentList();
}
function sortByAge() {
    students.sort(function (a, b) { return a.age - b.age; });
    displayStudentList();
}
function sortBySex() {
    students.sort(function (a, b) { return a.sex.localeCompare(b.sex); });
    displayStudentList();
}
var form = document.getElementById('studentForm');
form.addEventListener('submit', addNewStudent);
displayStudentList();
