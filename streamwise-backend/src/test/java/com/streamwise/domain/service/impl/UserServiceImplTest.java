package com.streamwise.domain.service.impl;

import com.streamwise.domain.model.User;
import com.streamwise.domain.repository.UserRepository;
import com.streamwise.service.impl.UserServiceImpl;
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
}