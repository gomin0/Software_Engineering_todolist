//package com.tdlist.todolist.service;
//
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
//public class ToDoListService {
//
//    private final ToDoListRepository toDoListRepository;
//    private final ToDoRepository toDoRepository;
//
//    public ToDoListService(ToDoListRepository toDoListRepository, ToDoRepository toDoRepository) {
//        this.toDoListRepository = toDoListRepository;
//        this.toDoRepository = toDoRepository;
//    }
//
//    public ToDoList createToDoList(String title) {
//        ToDoList toDoList = new ToDoList(title);
//        return toDoListRepository.save(toDoList);
//    }
//
//    public Optional<ToDo> getToDoById(Long toDoId) {
//        return toDoRepository.findById(toDoId);
//    }
//
//    public List<ToDo> getAllToDoLists() {
//        return toDoListRepository.findAll();
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
//    public ToDo createToDoItem(ToDoList toDoList, String title, String description, Long priority, Date dueDate, Date remindDate) {
//        ToDo toDo = ToDo.builder()
//                .title(title)
//                .description(description)
//                .priority(priority)
//                .dueDate(dueDate)
//                .createdDate(LocalDate.now())
//                .remindDate(remindDate)
//                .isCompleted(false)
//                .build();
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