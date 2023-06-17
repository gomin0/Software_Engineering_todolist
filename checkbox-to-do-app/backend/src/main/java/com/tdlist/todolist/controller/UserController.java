package com.tdlist.todolist.controller;

import com.tdlist.todolist.domain.ToDo;
import com.tdlist.todolist.domain.User;
import com.tdlist.todolist.domain.ToDoList;
import com.tdlist.todolist.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> registerUser(@RequestBody User user) {
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.getUserByEmail(email);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<User> updateUser(@PathVariable Long userId, @RequestBody User user) {
        Optional<User> existingUser = userService.getUserById(userId);
        if (existingUser.isPresent()) {
            user.setUserID(userId);
            User updatedUser = userService.updateUser(user);
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        Optional<User> existingUser = userService.getUserById(userId);
        if (existingUser.isPresent()) {
            userService.deleteUser(userId);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{userId}/todolist")
    public ResponseEntity<ToDoList> createToDoList(@PathVariable Long userId, @RequestBody ToDoList toDoList) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            toDoList.setUser(user.get());
            ToDoList createdToDoList = userService.createToDoList(user.get(), toDoList.getTitle());
            return ResponseEntity.status(HttpStatus.CREATED).body(createdToDoList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{userId}/todolist")
    public ResponseEntity<List<ToDoList>> getAllToDoLists(@PathVariable Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            List<ToDoList> toDoLists = userService.getAllToDoLists(user.get());
            return ResponseEntity.ok(toDoLists);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/todolist/{toDoListId}")
    public ResponseEntity<ToDoList> updateToDoList(@PathVariable Long toDoListId, @RequestBody ToDoList toDoList) {
        ToDoList updatedToDoList = userService.updateToDoList(toDoListId, toDoList);
        if (updatedToDoList != null) {
            return ResponseEntity.ok(updatedToDoList);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/todolist/{toDoListId}")
    public ResponseEntity<Void> deleteToDoList(@PathVariable Long toDoListId) {
        Optional<ToDoList> existingToDoList = userService.getToDoListById(toDoListId);
        if (existingToDoList.isPresent()) {
            userService.deleteToDoList(existingToDoList.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/todolist/{toDoListId}/todos")
    public ResponseEntity<ToDo> createToDoItem(
            @PathVariable Long toDoListId,
            @RequestBody ToDo toDo
    ) {
        Optional<ToDoList> existingToDoList = userService.getToDoListById(toDoListId);
        if (existingToDoList.isPresent()) {
            ToDoList toDoList = existingToDoList.get();
            toDo.setList(toDoList); // ToDo와 ToDoList의 관계 설정

            // ToDoList에 ToDo 추가
            userService.createToDoItem(toDoList, toDo.getTitle(), toDo.getDescription(), toDo.getPriority(), toDo.getDueDate(), toDo.getRemindDate());

            // 생성된 ToDo를 반환
            return ResponseEntity.status(HttpStatus.CREATED).body(toDo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/todolist/{toDoListId}/todos")
    public ResponseEntity<List<ToDo>> getAllToDosByToDoListId(
            @PathVariable Long toDoListId
    ) {
        Optional<ToDoList> existingToDoList = userService.getToDoListById(toDoListId);
        if (existingToDoList.isPresent()) {
            ToDoList toDoList = existingToDoList.get();
            List<ToDo> todos = toDoList.getToDoItems();
            return ResponseEntity.ok(todos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/todolist/{toDoListId}/todos/{toDoId}")
    public ResponseEntity<ToDo> updateToDo(
            @PathVariable Long toDoListId,
            @PathVariable Long toDoId,
            @RequestBody ToDo updatedToDo,
            @RequestParam(value = "completed", required = false) Boolean completed
    ) {
        Optional<ToDoList> existingToDoList = userService.getToDoListById(toDoListId);
        if (existingToDoList.isPresent()) {
            ToDoList toDoList = existingToDoList.get();
            Optional<ToDo> existingToDo = userService.getToDoById(toDoId);
            if (existingToDo.isPresent()) {
                ToDo toDo = existingToDo.get();
                toDo.setTitle(updatedToDo.getTitle());
                toDo.setDescription(updatedToDo.getDescription());
                toDo.setPriority(updatedToDo.getPriority());

                if (completed != null) {
                    toDo.setIsCompleted(completed);
                }

                // ToDo 저장
                userService.updateToDoItem(toDoList, toDoId, toDo.getTitle(), toDo.getDescription(), toDo.getPriority(), toDo.getIsCompleted());

                return ResponseEntity.ok(toDo);
            } else {
                return ResponseEntity.notFound().build();
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/todolist/{toDoListId}/todos/{toDoId}")
    public ResponseEntity<ToDo> deleteToDoItem(
            @PathVariable Long toDoListId,
            @PathVariable Long toDoId
    ) {
        Optional<ToDoList> existingToDoList = userService.getToDoListById(toDoListId);
        if (existingToDoList.isPresent()) {
            userService.deleteToDoItem(existingToDoList.get(), toDoId);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
