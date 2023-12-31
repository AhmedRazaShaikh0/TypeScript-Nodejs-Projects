export class Person {
    _personality;
    constructor() {
        this._personality = "Mystery";
    }
    AskQuestion(answer) {
        if (answer === 1) {
            this._personality = "Extrovert";
        }
        else if (answer === 2) {
            this._personality = "Introvert";
        }
        else {
            this._personality = "Unknown";
        }
    }
    GetPersonality() {
        return this._personality;
    }
}
export class Student extends Person {
    _name;
    constructor() {
        super();
        this._name = "";
    }
    get Name() {
        return this._name;
    }
    set Name(name) {
        this._name = name;
    }
}
