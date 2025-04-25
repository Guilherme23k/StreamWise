package com.streamwise.domain.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity(name = "tb_signatures")
public class Signature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private boolean active;
    private String category;
    private BigDecimal price;
    private LocalDate billingDate;

    private LocalDate monthDuration;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    private SignatureImage imageName;

    public String getImageDisplayName(){
        return imageName != null ? imageName.getDisplayName() : null;
    }

    public String getImageCode(){
        return imageName != null ? imageName.name() : null;
    }

    public Signature(Long id, String name, String category, BigDecimal price, LocalDate billingDate, User user, SignatureImage imageName) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.billingDate = billingDate;
        this.user = user;
        this.imageName = imageName;
    }

    public Signature() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public LocalDate getBillingDate() {
        return billingDate;
    }

    public void setBillingDate(LocalDate billingDate) {
        this.billingDate = billingDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public SignatureImage getImageName() {
        return imageName;
    }

    public void setImageName(SignatureImage imageName) {
        this.imageName = imageName;
    }

    public String getImageUrl() {
        return imageName != null ? imageName.getUrl() : null;
    }
}
