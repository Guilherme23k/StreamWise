package com.streamwise.domain.model;

import java.util.Arrays;

public enum SignatureImage {
    NETFLIX("Netflix", "https://img.icons8.com/?size=100&id=20519&format=png&color=000000"),
    PRIMEVIDEO("Prime Video","https://img.icons8.com/?size=100&id=Rs68BrhxH0XZ&format=png&color=000000");

    private final String displayName;
    private final String url;

    SignatureImage(String displayName, String url){
        this.url = url;
        this.displayName = displayName;
    }

    public static SignatureImage fromString(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("SignatureImage não pode ser null ou vazia");
        }

        String formattedValue = value.replace(" ", "").toUpperCase();

        return Arrays.stream(SignatureImage.values())
                .filter(e -> e.name().equals(formattedValue))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid SignatureImage: " + value));
    }


    public String getUrl(){
        return url;
    }

    public String getDisplayName() {
        return displayName;
    }

}
