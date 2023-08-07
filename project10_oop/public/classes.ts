export class Person {
  private _personality!: string;
  constructor() {
    this._personality = "Mystery";
  }
  AskQuestion(answer: number) {
    if (answer === 1) {
      this._personality = "Extrovert";
    } else if (answer === 2) {
      this._personality = "Introvert";
    } else {
      this._personality = "Unknown";
    }
  }
  GetPersonality() {
    return this._personality;
  }
}

export class Student extends Person {
  private _name: string;
  constructor() {
    super();
    this._name = "";
  }
  get Name() {
    return this._name;
  }
  set Name(name: string) {
    this._name = name;
  }
}
