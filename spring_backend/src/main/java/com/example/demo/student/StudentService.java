package com.example.demo.student;

//import java.time.LocalDate;
//import java.time.Month;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
public class StudentService {
private static final Logger logger = LoggerFactory.getLogger(StudentService.class);

	private final StudentRepository studentRepository;
	@Autowired
	public StudentService(StudentRepository studentRepository){
		this.studentRepository=studentRepository;
	}
    public List<Student> getStudents(){
		return studentRepository.findAll();
	}
	public void addNewStudent(Student student) {
    try {
        // Check if a student with the given email already exists
        Optional<Student> studentOptional = studentRepository.findStudentByEmail(student.getEmail());

        if (studentOptional.isPresent()) {
            // If a student with the email exists, throw an exception with a custom message
            throw new IllegalStateException("Email already taken");
        }

        // If the email is not taken, save the new student
        studentRepository.save(student);

        // Log or print information about the newly added student
        System.out.println(student);
    } catch (IllegalStateException e) {
        // Catch the exception and rethrow it with a custom message
        throw new IllegalStateException("Email already taken", e);
    }
}

    public void deleteStudent(Long studentId) {
        boolean exists=studentRepository.existsById(studentId);
		if(!exists){
			throw new IllegalStateException(
				"student with id "+studentId+" does not exists");
		}
		 studentRepository.deleteById(studentId);
    }
	@Transactional
	public void updateStudent(Long studentId, String name, String email) {
	       logger.info("\n\n\n\nname:"+name);
	       logger.info("email:"+email);
		Student student=studentRepository.findById(studentId)
		.orElseThrow(()->new IllegalStateException(
			"student with id "+studentId+" does not exist."
		));
		if(name!=null&&
		name.length()>0&&
		!Objects.equals(student.getName(), name)){
			student.setName(name);
		}

		if(email!=null&&
		email.length()>0&&
		!Objects.equals(student.getEmail(), email)){
			Optional<Student> studentOptional=studentRepository.findStudentByEmail(email);
			if(studentOptional.isPresent()){
				throw new IllegalStateException("Email Taken");
			}
			student.setEmail(email);;
		}
	}
    public Optional<Student> getStudent(Long studentId) {
       try{
		return studentRepository.findById(studentId);
	   }
	   catch(IllegalStateException e){
		throw new IllegalStateException("No student exists with this id.");
	   }
    }
}

