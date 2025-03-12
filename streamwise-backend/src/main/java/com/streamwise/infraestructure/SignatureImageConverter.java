package com.streamwise.infraestructure;

import com.streamwise.domain.model.SignatureImage;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class SignatureImageConverter implements AttributeConverter<SignatureImage, String> {

    @Override
    public String convertToDatabaseColumn(SignatureImage attribute) {
        return (attribute == null) ? null : attribute.name();
    }

    @Override
    public SignatureImage convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isBlank()) {
            return null;
        }
        String formattedValue = dbData.replace(" ", "").toUpperCase(); // Remove espaços e deixa uppercase

        return SignatureImage.fromString(formattedValue);
    }

}
