package com.tdlist.todolist.controller;

import com.tdlist.todolist.domain.ToDo;
import com.tdlist.todolist.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/todo")
public class ToDoController {

    private final ToDoService toDoService;

    @Autowired
    public ToDoController(ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @PostMapping
    public ResponseEntity<ToDo> createToDo(@RequestBody ToDo toDo) {
        ToDo createdToDO = toDoService.addToDo(toDo);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdToDO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ToDo> getToDoById(@PathVariable("id") Long id) {
        ToDo toDo = toDoService.getToDo(id);
        if (toDo != null) {
            return ResponseEntity.ok(toDo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public ResponseEntity<Page<ToDo>> getAllToDos(@RequestParam(value = "page", defaultValue = "0") int page) {
        Page<ToDo> toDos = toDoService.getToDo(page);
        return ResponseEntity.ok(toDos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateToDo(@PathVariable("id") Long id, @RequestBody ToDo toDo) {
        ToDo existingToDo = toDoService.getToDo(id);
        if (existingToDo != null) {
            toDo.setId(existingToDo.getId());
            toDoService.updateToDo(toDo);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteToDo(@PathVariable("id") Long id) {
        ToDo existingToDo = toDoService.getToDo(id);
        if (existingToDo != null) {
            toDoService.deleteToDo(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/complete")
    public ResponseEntity<Void> completeToDo(@PathVariable("id") Long id) {
        ToDo existingToDo = toDoService.getToDo(id);
        if (existingToDo != null) {
            toDoService.toDoComplete(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
