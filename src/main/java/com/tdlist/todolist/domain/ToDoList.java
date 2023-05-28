package com.tdlist.todolist.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class ToDoList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "list_id")
    private Long id;

    private String title; // 리스트 제목

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user; // 사용자 정보

    @OneToMany(mappedBy = "list", cascade = CascadeType.ALL)
    private List<ToDo> todos; // 할일 목록


    @Builder
    public ToDoList(String title) {
        this.title = title;
    }

    public void addToDoItem(ToDo toDo) {
        todos.add(toDo);
        toDo.setList(this);
    }

    public List<ToDo> getToDoItems() {
        return todos;
    }
}
