// bài 1
var root = document.querySelector('#root');
root.innerHTML = "<h1>xin chào REKEI</h1>";
// bài 2
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
    students.forEach(function (student, index) {
        tbody.innerHTML += "\n            <tr>\n                <td>".concat(student.name, "</td>\n                <td>").concat(student.age, "</td>\n                <td>").concat(student.sex, "</td>\n                <td><button onclick=\"editStudent(").concat(index, ")\">Edit</button></td>\n            </tr>\n        ");
    });
}
// bài 3
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
// edit
var editingIndex = -1;
function editStudent(index) {
    var editModal = document.getElementById('editModal');
    var editForm = document.getElementById('editStudentForm');
    var student = students[index];
    editingIndex = index;
    var editNameInput = document.getElementById('editName');
    var editAgeInput = document.getElementById('editAge');
    var editSexInput = document.getElementById('editSex');
    editNameInput.value = student.name;
    editAgeInput.value = String(student.age);
    editSexInput.value = student.sex;
    editModal.style.display = 'block';
    editForm.onsubmit = function (event) {
        event.preventDefault();
        var editedName = editNameInput.value.trim();
        var editedAge = Number(editAgeInput.value);
        var editedSex = editSexInput.value;
        if (editedName && editedAge && editedSex) {
            var editedStudent = {
                name: editedName,
                age: editedAge,
                sex: editedSex,
            };
            students[editingIndex] = editedStudent;
            displayStudentList();
            closeEditModal();
        }
    };
    var closeModalButton = document.getElementById('closeModal');
    closeModalButton.onclick = closeEditModal;
}
function closeEditModal() {
    var editModal = document.getElementById('editModal');
    var editForm = document.getElementById('editStudentForm');
    editingIndex = -1;
    editForm.reset();
    editModal.style.display = 'none';
}
// sắp xếp
var table = document.getElementById('studentTable');
var thead = table.querySelector('thead');
thead.addEventListener('click', function (event) {
    var target = event.target;
    if (target.tagName === 'TH' && target.dataset.sort) {
        var sortBy = target.dataset.sort;
        if (sortBy === 'name') {
            sortByName();
        }
        else if (sortBy === 'age') {
            sortByAge();
        }
        else if (sortBy === 'sex') {
            sortBySex();
        }
    }
});
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
// const sortIcons = {
//     none: '▲',
//     asc: '▲',
//     desc: '▼'
// };
function toggleSortIcon(target, sortBy) {
    var currentSortIcon = target.textContent.trim();
    var nextSort = currentSortIcon === sortIcons.asc ? sortIcons.desc : sortIcons.asc;
    target.textContent = "".concat(sortBy, " ").concat(nextSort);
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
function sortTable(event) {
    var target = event.target;
    if (target.tagName === 'TH' && target.dataset.sort) {
        var sortBy = target.dataset.sort;
        var currentSortIcon = target.textContent.trim();
        toggleSortIcon(target, sortBy);
        if (currentSortIcon === sortIcons.none || currentSortIcon === sortIcons.desc) {
            if (sortBy === 'name') {
                sortByName();
            }
            else if (sortBy === 'age') {
                sortByAge();
            }
            else if (sortBy === 'sex') {
                sortBySex();
            }
        }
        else if (currentSortIcon === sortIcons.asc) {
            if (sortBy === 'name') {
                students.reverse();
            }
            else if (sortBy === 'age') {
                students.sort(function (a, b) { return b.age - a.age; });
            }
            else if (sortBy === 'sex') {
                students.sort(function (a, b) { return b.sex.localeCompare(a.sex); });
            }
            displayStudentList();
        }
    }
}
var thead = table.querySelector('thead');
thead.addEventListener('click', sortTable);
