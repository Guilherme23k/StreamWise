package com.streamwise.service;

import com.streamwise.domain.model.Signature;
import org.springframework.stereotype.Service;

public interface SignatureService {

    Signature findById(Long id);

    Signature create(Signature signatureToCreate);

    Signature editService(Long id, Signature signatureDetails);

    void delete(Long id);

}
