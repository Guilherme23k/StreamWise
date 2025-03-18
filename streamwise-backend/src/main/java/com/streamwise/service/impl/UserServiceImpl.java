package com.streamwise.service.impl;

import com.streamwise.controller.dto.SignatureDTO;
import com.streamwise.controller.dto.UserDTO;
import com.streamwise.controller.dto.UserRegisterDTO;
import com.streamwise.domain.model.Signature;
import com.streamwise.domain.model.User;
import com.streamwise.domain.repository.UserRepository;
import com.streamwise.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.userRepository = userRepository;
    }


    public SignatureDTO convertSignatureToDTO(Signature signature) {
        return new SignatureDTO(
                signature.getId(),
                signature.getName(),
                signature.getCategory(),
                signature.getPrice(),
                signature.getBillingDate(),
                signature.getImageCode(),
                signature.getImageDisplayName(),
                signature.getImageUrl()
        );
    }

    @Override
    public UserDTO convertToDTO(User user) {

        List<SignatureDTO> signatureDTOs = user.getSignatures().stream()
                .map(this::convertSignatureToDTO)
                .collect(Collectors.toList());

        return new UserDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getUsername(),
                user.isEnabled(),
                signatureDTOs
        );
    }

    @Override
    public User findById(Long id){
        return userRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado com o email: " + username));
        return user;
    }


    @Override
    public User register(UserRegisterDTO userRegisterDTO) {

        if(userRepository.findByEmail(userRegisterDTO.email()).isPresent()) {
            throw new IllegalArgumentException("Email já está em uso");
        }
            User newUser = new User();
            newUser.setName(userRegisterDTO.name());
            newUser.setEmail(userRegisterDTO.email());
            newUser.setPassword(passwordEncoder.encode(userRegisterDTO.password()));

            return userRepository.save(newUser);

    }

    @Override
    public User editUser(Long id, User userDetails) {
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
