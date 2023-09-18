class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getName() {
        return this.name;
    }
}
class Student extends Person {
    rollNumber;
    courses = [];
    constructor(name, age, rollNumber) {
        super(name, age);
        this.rollNumber = rollNumber;
    }
    courseRegistration(course) {
        this.courses.push(course);
    }
}
class Instructor extends Person {
    salary;
    courses = [];
    constructor(name, age, salary) {
        super(name, age);
        this.salary = salary;
    }
    assignCourse(course) {
        this.courses.push(course);
    }
}
class Course {
    id;
    name;
    students = [];
    instructor;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    addStudent(student) {
        this.students.push(student);
        student.courseRegistration(this);
    }
    setInstructor(instructor) {
        this.instructor = instructor;
        instructor.assignCourse(this);
    }
}
class Department {
    name;
    courses = [];
    constructor(name) {
        this.name = name;
    }
    addCourse(course) {
        this.courses.push(course);
    }
}
const course1 = new Course("course1", "Web and App");
const course2 = new Course("course2", "Metaverse");
const department1 = new Department("Information Technology");
department1.addCourse(course1);
department1.addCourse(course2);
const student1 = new Student("Ahmed", 23, "12312");
const student2 = new Student("Raza", 20, "23124");
const instructor1 = new Instructor("Imran Khoso", 35, 100000);
const instructor2 = new Instructor("Sheraz Khan", 45, 100000);
course1.addStudent(student1);
course1.addStudent(student2);
course1.setInstructor(instructor1);
course1.setInstructor(instructor2);
console.log(student1);
console.log(student1.courses);
export {};
