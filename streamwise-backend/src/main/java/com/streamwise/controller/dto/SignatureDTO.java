package com.streamwise.controller.dto;

import com.streamwise.domain.model.Signature;
import com.streamwise.domain.model.SignatureImage;

import java.math.BigDecimal;
import java.time.LocalDate;

public record SignatureDTO(Long id,
                           String name,
                           String category,
                           BigDecimal price,
                           LocalDate billingDate,
                           String signatureImage) {

    public static SignatureDTO fromEntity(Signature signature) {
        return new SignatureDTO(
                signature.getId(),
                signature.getName(),
                signature.getCategory(),
                signature.getPrice(),
                signature.getBillingDate(),
                signature.getImageName() != null ? signature.getImageName().name() : null
        );
    }


    public Signature toEntity() {
        Signature signature = new Signature();
        signature.setId(id);
        signature.setName(name);
        signature.setCategory(category);
        signature.setPrice(price);
        signature.setBillingDate(billingDate);

        if (signatureImage != null) {
            signature.setImageName(SignatureImage.valueOf(signatureImage));
        }

        return signature;
    }
}
