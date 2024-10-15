package com.streamwise.domain.service;

import com.streamwise.domain.model.User;

public interface UserService {

    User findById(Long id);

    User create(User userToCreate);

    User editUser(Long id, User userDetails);

    void delete(Long id);
}
