package com.streamwise.domain.model;

public enum SignatureImage {
    NETFLIX("https://img.icons8.com/?size=100&id=20519&format=png&color=000000"),
    PRIMEVIDEO("https://img.icons8.com/?size=100&id=Rs68BrhxH0XZ&format=png&color=000000");

    private final String url;

    SignatureImage(String url){
        this.url = url;
    }

    public String getUrl(){
        return url;
    }

}
