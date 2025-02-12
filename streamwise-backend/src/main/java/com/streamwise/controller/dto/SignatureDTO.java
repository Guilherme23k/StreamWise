package com.streamwise.controller.dto;

import com.streamwise.domain.model.Signature;

import java.math.BigDecimal;
import java.time.LocalDate;

public record SignatureDTO(Long id, String name, String category, BigDecimal price, LocalDate billingDate) {

    public static SignatureDTO fromEntity(Signature signature) {
        return new SignatureDTO(
                signature.getId(),
                signature.getName(),
                signature.getCategory(),
                signature.getPrice(),
                signature.getBillingDate()
        );
    }

}
