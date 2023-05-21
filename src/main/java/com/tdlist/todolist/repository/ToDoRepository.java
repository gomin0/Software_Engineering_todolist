package com.tdlist.todolist.repository;

import com.tdlist.todolist.domain.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoRepository extends JpaRepository<ToDo, Long> {

}
