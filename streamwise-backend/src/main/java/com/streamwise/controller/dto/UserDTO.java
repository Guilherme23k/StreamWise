package com.streamwise.controller.dto;

import com.streamwise.domain.model.Signature;

import java.util.List;

public record UserDTO(Long id, String name, String username, String email, Boolean isEnable, List<SignatureDTO> signatures) {


}
