package com.streamwise.domain.service.impl;

import com.streamwise.domain.model.Subscription;

public interface SubscriptionServiceImpl {

    Subscription findById(Long id);

    Subscription create(Subscription subscriptionToCreate);

    Subscription delete(Long id);

}
