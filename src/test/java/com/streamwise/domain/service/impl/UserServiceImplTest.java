package com.streamwise.domain.service.impl;

import com.streamwise.domain.model.User;
import com.streamwise.domain.repository.UserRepository;
import org.instancio.Instancio;
import org.instancio.Select;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.NoSuchElementException;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserServiceImpl userService;

    @Test
    public void testGetUserById(){
        User user = Instancio.of(User.class).create();

        Mockito.when(userRepository.findById(1L)).thenReturn(Optional.of(user));

        User retrievedUser = userService.findById(1L);

        Assertions.assertNotNull(retrievedUser);

    }

    @Test
    public void testGetUserById_NotFound() {

        Mockito.when(userRepository.findById(2L)).thenReturn(Optional.empty());

        Assertions.assertThrows(NoSuchElementException.class, () -> {
            userService.findById(2L);
        });
    }

    @Test
    public void testRegisterUser(){
        User userToRegister = Instancio.of(User.class)
                .set(Select.field(User::getName), "Guilherme")
                .set(Select.field(User::getEmail), "gui@gmail.com")
                .set(Select.field(User::getPassword), "1234")
                .create();

        Mockito.when(userRepository.save(Mockito.any()))
                .thenAnswer(invocation -> {
                    User user = invocation.getArgument(0);
                    user.setId(1L);
                    return user;
                });

        User registeredUser = userService.create(userToRegister);

        Assertions.assertNotNull(registeredUser.getId(), "ID do usuário não pode ser nulo");
        Assertions.assertEquals("Guilherme", registeredUser.getName(), "Nome de usuário registrado incorretamente");
        Assertions.assertEquals("gui@gmail.com", registeredUser.getEmail(), "Email registrado incorretamente");
        Assertions.assertEquals("1234", registeredUser.getPassword(), "Senha registrada incorretamente");
    }



}