package com.tdlist.todolist.service;

import com.tdlist.todolist.domain.ToDo;
import org.springframework.data.domain.Page;

public interface ToDoService {

    // 할일 추가
    public ToDo addToDo(ToDo toDo);
    // 할일 조회
    public ToDo getToDo(Long toDo_id);
    // 할일 목록
    public Page<ToDo> getToDo(int page);
    // 할일 삭제하기
    public void deleteToDo(Long toDo_Id);
    // 할일 수정하기
    public void updateToDo(ToDo toDo);
    // 할일 완료처리
    public void toDoComplete(Long toDo_Id);

}
