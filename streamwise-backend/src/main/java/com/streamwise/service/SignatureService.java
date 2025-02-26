package com.streamwise.service;

import com.streamwise.controller.dto.SignatureDTO;
import com.streamwise.domain.model.Signature;
import com.streamwise.domain.model.User;

import java.util.List;

public interface SignatureService {

    List<Signature> findAll();

    List<SignatureDTO> getSignaturesByUser(Long userId);

    Signature findById(Long id);

    Signature create(Signature signature, User user);

    Signature editService(Long id, Signature signatureDetails);

    void delete(Long id);

    SignatureDTO convertToDTO(Signature signature);

}
