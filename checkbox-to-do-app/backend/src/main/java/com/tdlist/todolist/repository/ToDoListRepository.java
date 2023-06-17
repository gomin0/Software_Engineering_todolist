package com.tdlist.todolist.repository;

import com.tdlist.todolist.domain.ToDo;
import com.tdlist.todolist.domain.ToDoList;
import com.tdlist.todolist.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ToDoListRepository extends JpaRepository<ToDoList, Long> {
      ToDoList save(ToDoList toDoList);
}
