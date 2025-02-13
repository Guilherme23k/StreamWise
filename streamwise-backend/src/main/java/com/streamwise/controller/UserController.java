package com.streamwise.controller;

import com.streamwise.controller.dto.UserDTO;
import com.streamwise.domain.model.User;
import com.streamwise.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> findById(@PathVariable Long id, Authentication authentication) {
        String loggedUsername = authentication.getName();
        User user = userService.findById(id);


        if (!user.getUsername().equals(loggedUsername)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        UserDTO userDTO = userService.convertToDTO(user);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> editUser(@PathVariable Long id, @RequestBody User updatedUser, Authentication authentication) {
        String loggedUsername = authentication.getName();
        User user = userService.findById(id);

        if (!user.getUsername().equals(loggedUsername)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        User updated = userService.editUser(id, updatedUser);
        UserDTO updatedUserDTO = userService.convertToDTO(updated);
        return ResponseEntity.ok(updatedUserDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, Authentication authentication) {
        String loggedUsername = authentication.getName();
        User user = userService.findById(id);

        if (!user.getUsername().equals(loggedUsername)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        userService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
