package com.streamwise.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.streamwise.controller.dto.RegisterResponseDTO;
import com.streamwise.controller.dto.UserLoginDTO;
import com.streamwise.controller.dto.UserRegisterDTO;
import com.streamwise.domain.model.User;
import com.streamwise.security.JwtUtil;
import com.streamwise.service.UserService;
import com.streamwise.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody UserRegisterDTO userRegisterDTO){
        User user = userService.register(userRegisterDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(RegisterResponseDTO.fromUser(user));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody UserLoginDTO userLoginDTO) {
        try {

            String email = userLoginDTO.email();
            String password = userLoginDTO.password();


            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );


            String token = jwtUtil.generateToken(authentication.getName());


            return ResponseEntity.ok(Map.of("token", token));
        } catch (AuthenticationException e) {
            throw new RuntimeException("Credenciais inválidas", e);
        }
    }

}
