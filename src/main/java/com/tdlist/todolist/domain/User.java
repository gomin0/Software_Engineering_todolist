package com.tdlist.todolist.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
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

//    private String naverId;
//    private String naverName;
//    private String naverEmail;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<ToDoList> toDoLists;


    @Builder
    public User(Long userID, String userName, String userEmail) {
        this.userID = userID;
        this.userName = userName;
        this.userEmail = userEmail;
//        this.naverId = naverId;
//        this.naverName = naverName;
//        this.naverEmail = naverEmail;
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

    public ToDo addToDoItem(ToDoList toDoList, String title, String description, Long priority, Date dueDate, Date remindDate, LocalDate createDate, Boolean isCompleted) {
        ToDo toDo = new ToDo(title, description, priority, dueDate, remindDate, createDate, isCompleted);
        toDoList.addToDoItem(toDo);
        toDo.setToDoList(toDoList);
        return toDo;
    }



    public void updateToDoItem(ToDoList toDoList, Long todoId, String title, String description, Long priority) {
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
