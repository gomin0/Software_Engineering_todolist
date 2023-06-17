package com.tdlist.todolist.service;

import com.tdlist.todolist.domain.ToDo;
import com.tdlist.todolist.domain.User;
import com.tdlist.todolist.domain.ToDoList;
import com.tdlist.todolist.repository.ToDoListRepository;
import com.tdlist.todolist.repository.ToDoRepository;
import com.tdlist.todolist.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final ToDoListRepository toDoListRepository;
    private final ToDoRepository toDoRepository;

    public UserService(UserRepository userRepository, ToDoListRepository toDoListRepository, ToDoRepository toDoRepository) {
        this.userRepository = userRepository;
        this.toDoListRepository = toDoListRepository;
        this.toDoRepository = toDoRepository;
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByUserEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public ToDoList createToDoList(User user, String title) {
        ToDoList toDoList = new ToDoList(title);
        toDoList.setUser(user);
        user.addToDoList(toDoList);
        toDoList = toDoListRepository.save(toDoList);
        user.addToDoList(toDoList);
        userRepository.save(user);
        return toDoList;
    }

    public List<ToDoList> getAllToDoLists(User user) {
        return user.getToDoLists();
    }

    public ToDoList updateToDoList(Long toDoListId, ToDoList updatedToDoList) {
        Optional<ToDoList> existingToDoList = toDoListRepository.findById(toDoListId);
        if (existingToDoList.isPresent()) {
            ToDoList toDoList = existingToDoList.get();
            toDoList.setTitle(updatedToDoList.getTitle());
            // 기타 업데이트할 필드들에 대한 처리

            return toDoListRepository.save(toDoList);
        } else {
            return null;
        }
    }

    public void deleteToDoList(ToDoList toDoList) {
        User user = toDoList.getUser();
        user.getToDoLists().remove(toDoList);
        userRepository.save(user);
        toDoListRepository.delete(toDoList);
    }

    public ToDoList createToDoItem(ToDoList toDoList, String title, String description, Long priority, Date dueDate, Date remindDate) {
        User user = toDoList.getUser();
        ToDo newToDo = user.addToDoItem(toDoList, title, description, priority, dueDate, remindDate);
        userRepository.save(user); // user 엔티티 저장
        return toDoListRepository.save(toDoList); // toDoList 엔티티 저장
    }

    public void updateToDoItem(ToDoList toDoList, Long todoId, String title, String description, Long priority, Boolean isCompleted) {
        userRepository.save(toDoList.getUser()).updateToDoItem(toDoList, todoId, title, description, priority, isCompleted);
    }

    public void deleteToDoItem(ToDoList toDoList, Long todoId) {
        Optional<ToDo> existingToDoItem = toDoList.getToDoItems().stream()
                .filter(item -> item.getId().equals(todoId))
                .findFirst();

        existingToDoItem.ifPresent(item -> {
            item.setList(null);
            toDoList.getToDoItems().remove(item);
            toDoRepository.delete(item); // ToDo 객체를 데이터베이스에서 삭제
        });
    }

    public Optional<ToDoList> getToDoListById(Long toDoListId) {
        return userRepository.findToDoListById(toDoListId);
    }

    public Optional<ToDo> getToDoById(Long toDoId) {
        return userRepository.findToDoById(toDoId);
    }
}