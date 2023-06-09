package com.tdlist.todolist.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userID;

    private String userName;
    private String userEmail;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("user") // Ignore serialization of the user field in ToDoList
    private List<ToDoList> toDoLists;


    @Builder
    public User(Long userID, String userName, String userEmail) {
        this.userID = userID;
        this.userName = userName;
        this.userEmail = userEmail;
    }

    public void addToDoList(ToDoList toDoList) {
        if (toDoLists == null) {
            toDoLists = new ArrayList<>();
        }
        toDoLists.add(toDoList);
        toDoList.setUser(this);
    }

    public void updateToDoList(ToDoList updatedToDoList) {
        Optional<ToDoList> existingToDoList = toDoLists.stream()
                .filter(list -> list.getId().equals(updatedToDoList.getId()))
                .findFirst();

        existingToDoList.ifPresent(toDoList -> {
            toDoList.setTitle(updatedToDoList.getTitle());
            // 다른 필드도 업데이트
        });
    }

    public ToDo addToDoItem(ToDoList toDoList, String title, String description, Long priority, Date dueDate, Date remindDate) {
        ToDo toDo = new ToDo(title, description, priority, dueDate, remindDate);
        toDoList.addToDoItem(toDo);
        toDo.setToDoList(toDoList);
        return toDo;
    }



    public void updateToDoItem(ToDoList toDoList, Long todoId, String title, String description, Long priority, Boolean isCompleted) {
        Optional<ToDo> existingToDoItem = toDoList.getToDoItems().stream()
                .filter(item -> item.getId().equals(todoId))
                .findFirst();

        existingToDoItem.ifPresent(item -> {
            item.setTitle(title);
            item.setDescription(description);
            item.setPriority(priority);
        });
    }

    public void deleteToDoItem(ToDoList toDoList, Long todoId) {
        toDoList.getToDoItems().removeIf(item -> item.getId().equals(todoId));
    }
}
