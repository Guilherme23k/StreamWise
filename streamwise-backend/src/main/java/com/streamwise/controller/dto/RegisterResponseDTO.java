package com.streamwise.controller.dto;

import com.streamwise.domain.model.User;

public record RegisterResponseDTO(String name, String email) {

    public static RegisterResponseDTO fromUser(User user){
        return new RegisterResponseDTO(user.getName(), user.getEmail());
    }

}
