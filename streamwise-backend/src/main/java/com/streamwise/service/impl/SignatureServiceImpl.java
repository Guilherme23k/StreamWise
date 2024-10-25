package com.streamwise.service.impl;

import com.streamwise.domain.model.Signature;
import com.streamwise.domain.repository.SignatureRepository;
import com.streamwise.service.SignatureService;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class SignatureServiceImpl implements SignatureService {

    private final SignatureRepository signatureRepository;

    public SignatureServiceImpl(SignatureRepository signatureRepository) {
        this.signatureRepository = signatureRepository;
    }


    @Override
    public Signature findById(Long id) {
        return signatureRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public Signature create(Signature signatureToCreate) {
        if(signatureToCreate.getId() != null && signatureRepository.existsById(signatureToCreate.getId())){
            throw new IllegalArgumentException("Assinatura já existente");
        }
        return signatureRepository.save(signatureToCreate);
    }

    @Override
    public Signature editService(Long id, Signature signatureDetails) {
        Signature existingSignature = signatureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Signature not found"));

        existingSignature.setName(signatureDetails.getName());
        existingSignature.setCategory(signatureDetails.getCategory());
        existingSignature.setPrice(signatureDetails.getPrice());
        existingSignature.setBillingDate(signatureDetails.getBillingDate());

        return signatureRepository.save(existingSignature);
    }

    @Override
    public void delete(Long id) {
        Signature signature = signatureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Signature not found"));
        signatureRepository.delete(signature);
    }
}
