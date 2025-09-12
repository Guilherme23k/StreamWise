package com.streamwise.controller.dto;

import com.streamwise.domain.model.Signature;
import com.streamwise.domain.model.SignatureImage;

import java.math.BigDecimal;
import java.time.LocalDate;

public record SignatureDTO(Long id,
                           String name,

                           Boolean active,
                           String category,
                           BigDecimal price,
                           LocalDate billingDate,

                           int monthDuration,
                           String signatureImageCode) {

    public static SignatureDTO fromEntity(Signature signature) {
        String imageUrl = signature.getImageName() != null ? signature.getImageName().getUrl() : null;
        return new SignatureDTO(
                signature.getId(),
                signature.getName(),
                signature.isActive(),
                signature.getCategory(),
                signature.getPrice(),
                signature.getBillingDate(),
                signature.getMonthDuration(),
                signature.getImageCode()
                );
    }
}
