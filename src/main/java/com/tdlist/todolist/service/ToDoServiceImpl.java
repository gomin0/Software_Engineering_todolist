package com.tdlist.todolist.service;

import com.tdlist.todolist.domain.ToDo;
import com.tdlist.todolist.repository.ToDoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ToDoServiceImpl implements ToDoService {

    private final ToDoRepository toDoRepository;

    @Override
    @Transactional
    public ToDo addToDo(ToDo toDo) {
        return toDoRepository.save(toDo);
    }

    @Override
    @Transactional
    public ToDo getToDo(Long toDo_id) {
        return toDoRepository.findById(toDo_id).orElse(null);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ToDo> getToDo(int page) {
        int pageSize = Integer.MAX_VALUE; // 한 페이지에 모든 할일을 표시하기 위해 페이지 크기를 최대값으로 설정
        return toDoRepository.findAll(PageRequest.of(page, pageSize));
    }

    @Override
    @Transactional
    public void deleteToDo(Long toDo_Id) {
        toDoRepository.deleteById(toDo_Id);
    }

    @Override
    @Transactional
    public void updateToDo(ToDo toDo) {
        toDoRepository.save(toDo);

    }

    @Override
    @Transactional
    public void toDoComplete(Long toDo_Id) {
        ToDo toDo = toDoRepository.findById(toDo_Id).orElse(null);
        if (toDo != null) {
            toDo.setIsCompleted(true);
            toDoRepository.save(toDo);
        }
    }
}
