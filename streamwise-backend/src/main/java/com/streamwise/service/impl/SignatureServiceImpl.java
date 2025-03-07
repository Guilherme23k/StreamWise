package com.streamwise.service.impl;

import com.streamwise.controller.dto.SignatureDTO;
import com.streamwise.domain.model.Signature;
import com.streamwise.domain.model.User;
import com.streamwise.domain.repository.SignatureRepository;
import com.streamwise.service.SignatureService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class SignatureServiceImpl implements SignatureService {

    private final SignatureRepository signatureRepository;

    public SignatureServiceImpl(SignatureRepository signatureRepository) {
        this.signatureRepository = signatureRepository;
    }

    @Override
    public List<Signature> findAll(){
        return signatureRepository.findAll();
    }


    @Override
    public Signature findById(Long id) {
        return signatureRepository.findById(id).orElseThrow(NoSuchElementException::new);
    }

    @Override
    public Signature create(Signature signatureToCreate, User user) {

        System.out.println("Tentando criar assinatura: " + signatureToCreate.getName() + ", " + signatureToCreate.getCategory());


        if (signatureRepository.existsByUserIdAndNameAndCategory(user.getId(), signatureToCreate.getName(), signatureToCreate.getCategory())) {

            System.out.println("Assinatura já existente: " + signatureToCreate.getName() + ", " + signatureToCreate.getCategory());
            throw new IllegalArgumentException("Assinatura já existente");
        }

        System.out.println("Post feito na assinatura " + signatureToCreate.getName());


        signatureToCreate.setUser(user);
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

    @Override
    public SignatureDTO convertToDTO(Signature signature) {
        return new SignatureDTO(
                signature.getId(),
                signature.getName(),
                signature.getCategory(),
                signature.getPrice(),
                signature.getBillingDate(),
                signature.getImageName() != null ? signature.getImageName().name() : null
        );
    }

    @Override
    public List<SignatureDTO> getSignaturesByUser(Long userId) {
        List<Signature> signatures = signatureRepository.findByUserId(userId);

        return signatures.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}


