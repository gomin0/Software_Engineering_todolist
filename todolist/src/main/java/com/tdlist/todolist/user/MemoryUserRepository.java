package com.tdlist.todolist.user;

import java.util.HashMap;
import java.util.Map;

public class MemoryUserRepository implements UserRepository{

    private static Map<String, User> store = new HashMap<>();
    @Override
    public void login(User user) {
        store.put(user.getUserID(), user);
    }
}
