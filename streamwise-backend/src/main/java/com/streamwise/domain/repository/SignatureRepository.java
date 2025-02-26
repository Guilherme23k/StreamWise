package com.streamwise.domain.repository;

import com.streamwise.domain.model.Signature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SignatureRepository extends JpaRepository<Signature, Long> {

    @Query("SELECT s FROM tb_signatures s WHERE s.user.id = :userId")
    List<Signature> findByUserId(@Param("userId") Long userId);

    boolean existsByUserIdAndNameAndCategory(Long userId, String name, String category);
}
