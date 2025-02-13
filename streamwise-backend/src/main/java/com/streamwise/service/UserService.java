package com.streamwise.service;

import com.streamwise.controller.dto.UserDTO;
import com.streamwise.controller.dto.UserLoginDTO;
import com.streamwise.controller.dto.UserRegisterDTO;
import com.streamwise.domain.model.User;

public interface UserService {

    User findById(Long id);
    User editUser(Long id, User userDetails);
    void delete(Long id);
    User register(UserRegisterDTO userRegisterDTO);

    UserDTO convertToDTO(User user);


}
