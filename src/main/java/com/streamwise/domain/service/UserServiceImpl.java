package com.streamwise.domain.service;

import com.streamwise.domain.model.User;
import com.streamwise.domain.repository.UserRespository;
import com.streamwise.domain.service.impl.UserService;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class UserServiceImpl implements UserService {

    private final UserRespository userRepository;

    public UserServiceImpl(UserRespository userRespository) {
        this.userRepository = userRespository;
    }

    @Override
    public User findById(Long id){
        return userRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public User create(User userToCreate) {
        if (userRepository.existsById(userToCreate.getId())) {
            throw new IllegalArgumentException("Esta conta já existe");
        }
        return userRepository.save(userToCreate);
    }

    @Override
    public User editUser(Long id, User userDetails){
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setName(userDetails.getName());
        existingUser.setEmail(userDetails.getEmail());

        return userRepository.save(existingUser);
    }

    @Override
    public void delete(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userRepository.delete(user);
    }

}
