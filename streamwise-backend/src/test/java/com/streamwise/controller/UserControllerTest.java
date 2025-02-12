package com.streamwise.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.streamwise.domain.model.User;
import com.streamwise.service.SignatureService;
import com.streamwise.service.UserService;
import org.instancio.Instancio;
import org.instancio.Select;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;  // IMPORT CORRETO
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WebMvcTest
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SignatureService signatureService;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private User user;

    @BeforeEach
    public void setup(){
        user = Instancio.of(User.class)
                .set(Select.field(User::getName), "Guilherme")
                .set(Select.field(User::getEmail), "gui@gmail.com")
                .set(Select.field(User::getPassword), "1234")
                .create();
    }

    @Test
    public void testCreateUser() throws Exception{

        Mockito.when(userService.create(Mockito.any(User.class)))
                .thenAnswer(invocation -> {
                    User user1 = invocation.getArgument(0);
                    user1.setId(1L);
                    return user1;
                });

        mockMvc.perform(post("/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Guilherme"))
                .andExpect(jsonPath("$.email").value("gui@gmail.com"))
                .andExpect(jsonPath("$.password").value("1234"));

    }

    @Test
    public void testeEditUser() throws Exception {

        User updatedUser = Instancio.of(User.class)
                .set(Select.field(User::getName), "Novo Nome")
                .set(Select.field(User::getEmail), "novoemail@gmail.com")
                .set(Select.field(User::getPassword), "novaSenha")
                .create();

        Mockito.when(userService.editUser(Mockito.anyLong(), Mockito.any(User.class)))
                .thenReturn(updatedUser);

        mockMvc.perform(put("/users/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Novo Nome"))
                .andExpect(jsonPath("$.email").value("novoemail@gmail.com"))
                .andExpect(jsonPath("$.password").value("novaSenha"));
    }

    @Test
    public void testDeleteUser() throws Exception{
        Mockito.doNothing().when(userService).delete(1L);

        mockMvc.perform(delete("/users/{id}",1L))
                .andExpect(status().isNoContent());
    }
}
