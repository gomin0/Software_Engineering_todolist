package com.tdlist.todolist.user;

public class UserServiceImpl implements UserService{

    private final UserRepository userRepository = new MemoryUserRepository();
    @Override
    public void join(User user) {
        userRepository.login(user);
    }
}
