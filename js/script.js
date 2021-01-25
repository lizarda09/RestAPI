import DB from './db.js';
import {addStudent, fillEditForm} from "./functions.js";

const server = new DB('https://frontend-lectures.firebaseio.com', 1);

server.getStudentList().then(response => {
    //console.log(response);
    //console.log(Object.entries(response));

    const students = Object.entries(response).map(value => {

        const [id, student] = value;

        student.id = id;

        return student;
    });
    console.log(students);
    students.forEach(addStudent);
});

$('#student-list').on('click', '[data-id]', function (e){
    e.preventDefault();

    const id = $(this).attr('data-id');
    console.log(id)

    server.getStudentById(id).then(response => fillEditForm(response, id));
});


$('#form-edit-student').on('submit', function (e){
    e.preventDefault();

    const student = {};

    for(let element of $(this).find('[name]')){
        student[$(element).attr('name')] = $(element).val();
    }

    console.log(student.id);

    server.updateStudentById(student.id, student).then(response => {
        console.log(response);

        $('#student-list')
            .find(`[data-id="${student.id}"]`)
            .text(`${response.firstname} ${response.lastname}`)
    })
});

$('#form-add-student').on('submit', function (e){
    e.preventDefault();

    const student = {};
    for(let element of $(this).find('[name]')){
        student[$(element).attr('name')] = $(element).val();
    }

    server.createStudent(JSON.stringify(student)).then(() => {
       addStudent(student);
    });

});



$('.btn-danger').on('click', function (e){
    e.preventDefault();


});