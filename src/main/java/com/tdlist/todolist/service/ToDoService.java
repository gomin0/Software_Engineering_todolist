package com.tdlist.todolist.service;

//import com.tdlist.todolist.domain.ToDoList;
//import com.tdlist.todolist.domain.ToDo;
//import com.tdlist.todolist.repository.ToDoListRepository;
//import com.tdlist.todolist.repository.ToDoRepository;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDate;
//import java.util.Date;
//import java.util.List;
//import java.util.Optional;
//
//@Service
//@Transactional
//public class ToDoService {
//
//    private final ToDoListRepository toDoListRepository;
//    private final ToDoRepository toDoRepository;
//
//    public ToDoService(ToDoListRepository toDoListRepository, ToDoRepository toDoRepository) {
//        this.toDoListRepository = toDoListRepository;
//        this.toDoRepository = toDoRepository;
//    }
//
//    public ToDoList createToDoList(String title) {
//        ToDoList toDoList = new ToDoList(title);
//        return toDoListRepository.save(toDoList);
//    }
//
//    public List<ToDoList> getAllToDoLists() {
//        return toDoListRepository.findAllToDoLists();
//    }
//
//    public ToDoList updateToDoList(ToDoList toDoList) {
//        return toDoListRepository.save(toDoList);
//    }
//
//    public void deleteToDoList(Long toDoListId) {
//        toDoListRepository.deleteById(toDoListId);
//    }
//
//    public ToDo createToDoItem(ToDoList toDoList, String title, String description, Long priority, Date dueDate, Date remindDate, LocalDate createDate, Boolean isCompleted) {
//        ToDo toDo = new ToDo();
//        toDo.setTitle(title);
//        toDo.setDescription(description);
//        toDo.setPriority(priority);
//        toDo.setDueDate(dueDate);
//        toDo.setRemindDate(remindDate);
//        toDo.setCreatedDate(createDate);
//        toDo.setIsCompleted(isCompleted);
//        toDo.setList(toDoList);
//        return toDoRepository.save(toDo);
//    }
//
//    public Optional<ToDo> getToDoItemById(Long toDoId) {
//        return toDoRepository.findById(toDoId);
//    }
//
//    public List<ToDo> getAllToDoItems() {
//        return toDoRepository.findAll();
//    }
//
//    public ToDo updateToDoItem(ToDo toDo) {
//        return toDoRepository.save(toDo);
//    }
//
//    public void deleteToDoItem(Long toDoId) {
//        toDoRepository.deleteById(toDoId);
//    }
//}