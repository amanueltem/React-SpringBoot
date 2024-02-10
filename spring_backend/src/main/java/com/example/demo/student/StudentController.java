package com.example.demo.student;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin(origins = "http://localhost:3000") 
@RequestMapping(path = "api/v1/student")
public class StudentController {
private static final Logger logger = LoggerFactory.getLogger(StudentController.class);
    private final StudentService studentService;
    @Autowired
    public StudentController(StudentService studentService){
        this.studentService=studentService;
    }
    @GetMapping
	public List<Student> getStudents(){
		return studentService.getStudents();
	}
    @GetMapping(path = "{studentId}")
    public Optional<Student> getStudent(@PathVariable("studentId") Long studentId){
        logger.info("\n\n\n HELLLO *************");
        return studentService.getStudent(studentId);
    }
   @PostMapping
public void registerNewStudent(@RequestBody Student student) {
    /* Convert the date string to LocalDate using DateTimeFormatter
    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    LocalDate dob = LocalDate.parse(student.getFormattedDob(), formatter);

    // Set the parsed dob to the student using setDob method
    student.setDob(dob);*/

    studentService.addNewStudent(student);
}

    @DeleteMapping(path = "{studentId}")
    public void deleteStudent(@PathVariable("studentId") Long studentId){
        studentService.deleteStudent(studentId);
    }
@PutMapping(path = "{studentId}")
public void updateStudent(
    @PathVariable("studentId") Long studentId,
    @RequestBody Map<String, String> updateData
) {
    String name = updateData.get("name");
    String email = updateData.get("email");

    logger.info("\n\n\n******************* studentId: {} name: {} email: {}", studentId, name, email);
    studentService.updateStudent(studentId, name, email);
}


@ExceptionHandler(IllegalStateException.class)
public ResponseEntity<String> handleIllegalStateException(IllegalStateException e) {
    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
}


}
