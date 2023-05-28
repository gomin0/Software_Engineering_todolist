package com.tdlist.todolist.repository;

import com.tdlist.todolist.domain.ToDo;
import com.tdlist.todolist.domain.ToDoList;
import com.tdlist.todolist.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ToDoListRepository extends JpaRepository<ToDo, Long> {
//    List<ToDoList> findByUser(User user);
//    List<ToDoList> findAllToDoLists();
//    Optional<ToDo> findById(Long toDoListId);
      ToDoList save(ToDoList toDoList);
//    void delete(ToDoList toDoList);
}
