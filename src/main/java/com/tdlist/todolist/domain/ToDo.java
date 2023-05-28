package com.tdlist.todolist.domain;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@Entity
public class ToDo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todo_id")
    private Long id;

    private String title; // 할일 제목
    private String description; // 할일 설명
    private Long priority;  // 우선 순위
    private Date dueDate; // 마감일
    private LocalDate createdDate; // 생성일
    private Date remindDate; // 미리알림 설정일
    private Boolean isCompleted; // 완료 여부

    @ManyToOne
    @JoinColumn(name = "list_id", nullable = false)
    private ToDoList list;

    @Builder
    public ToDo(String title, String description, Long priority, Date dueDate, Date remindDate, LocalDate createdDate, Boolean isCompleted) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.createdDate = LocalDate.now();
        this.remindDate = remindDate;
        this.isCompleted = Boolean.FALSE;
    }

    public void setToDoList(ToDoList toDoList) {
        this.list = toDoList;
    }
}
