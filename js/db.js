export default class DB {
    constructor(serverUrl, version) {
        this.url = serverUrl;
        this.ver = version;
    }

    getStudentList(){
        return fetch(`${this.url}/api/v${this.ver}/students.json`)
            .then(result => result.json());
    }

    getStudentById(id){
        return fetch(`${this.url}/api/v${this.ver}/students/${id}.json`)
            .then(result => result.json());
    }

    updateStudentById(id, body){
        return fetch(`${this.url}/api/v${this.ver}/students/${id}.json`, {
            method: 'PUT',
            body: JSON.stringify(body)
        }).then(result => result.json());
    }

    deleteStudentById(id){
        return fetch(`${this.url}/api/v${this.ver}/students/${id}.json`, {
            method: 'DELETE'
        }).then(result => result.json());
    }

    createStudent(body){
        return fetch(`${this.url}/api/v${this.ver}/students.json`, {
                method: 'POST',
                body: body
            }) .then(result => result.json());
    }
}