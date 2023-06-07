package com.tdlist.todolist.repository;

import com.tdlist.todolist.domain.ToDo;
import com.tdlist.todolist.domain.ToDoList;
import com.tdlist.todolist.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserEmail(String email);

    @Query("SELECT tdl FROM User u JOIN u.toDoLists tdl WHERE tdl.id = :toDoListId")
    Optional<ToDoList> findToDoListById(Long toDoListId);

    @Query("SELECT td FROM User u JOIN u.toDoLists tdl JOIN tdl.todos td WHERE td.id = :toDoId")
    Optional<ToDo> findToDoById(Long toDoId);
}