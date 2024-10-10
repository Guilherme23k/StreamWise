package com.streamwise.domain.model;

import jakarta.persistence.*;

@Entity(name = "tb_financial")
public class Financial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private float servicePrice;
    private float accountCreditLimit;
    private String monthlyConsumption;
    private String optimization;

    @OneToOne(mappedBy = "financial")
    private User user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public float getServicePrice() {
        return servicePrice;
    }

    public void setServicePrice(float servicePrice) {
        this.servicePrice = servicePrice;
    }

    public float getAccountCreditLimit() {
        return accountCreditLimit;
    }

    public void setAccountCreditLimit(float accountCreditLimit) {
        this.accountCreditLimit = accountCreditLimit;
    }

    public String getMonthlyConsumption() {
        return monthlyConsumption;
    }

    public void setMonthlyConsumption(String monthlyConsumption) {
        this.monthlyConsumption = monthlyConsumption;
    }

    public String getOptimization() {
        return optimization;
    }

    public void setOptimization(String optimization) {
        this.optimization = optimization;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
