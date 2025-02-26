package com.streamwise.controller;

import com.streamwise.controller.dto.SignatureDTO;
import com.streamwise.domain.model.Signature;
import com.streamwise.domain.model.User;
import com.streamwise.security.JwtUtil;
import com.streamwise.service.SignatureService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/signatures")
public class SignatureController {

    private final SignatureService signatureService;

    private final JwtUtil jwtUtil;


    public SignatureController(SignatureService signatureService, JwtUtil jwtUtil) {
        this.signatureService = signatureService;
        this.jwtUtil = jwtUtil;
    }

    @GetMapping("/{id}")
    public ResponseEntity<SignatureDTO> findById(@PathVariable Long id){

            Signature signature = signatureService.findById(id);

            SignatureDTO signatureDTO = signatureService.convertToDTO(signature);
            return ResponseEntity.ok(signatureDTO);

    }

    @GetMapping()
    public ResponseEntity<List<SignatureDTO>> findAll(){
        List<Signature> signatures = signatureService.findAll();
        List<SignatureDTO> signatureDTOS = signatures.stream().
                map(SignatureDTO::fromEntity)
                .collect(Collectors.toList());

        return ResponseEntity.ok(signatureDTOS);
    }

    @GetMapping()
    public ResponseEntity<List<SignatureDTO>> getUserSignatures(HttpServletRequest request){
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String userId = jwtUtil.extractUserId(token);

        List<SignatureDTO> signatureDTOS = signatureService.getSignaturesByUser(Long.parseLong(userId));
        return ResponseEntity.ok(signatureDTOS);
    }

    @PostMapping
    public ResponseEntity<SignatureDTO> create(@RequestBody Signature signatureToCreate){


        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser = (User) authentication.getPrincipal();

        Signature signatureCreated = signatureService.create(signatureToCreate, loggedUser);
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(signatureCreated.getId())
                .toUri();

        SignatureDTO signatureDTO = signatureService.convertToDTO(signatureCreated);

        return ResponseEntity.created(location).body(signatureDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SignatureDTO> editSignature(@PathVariable Long id,@RequestBody Signature signatureDetails){

        Signature signatureUpdated = signatureService.editService(id, signatureDetails);
        SignatureDTO signatureDTO = signatureService.convertToDTO(signatureUpdated);
        return ResponseEntity.ok(signatureDTO);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteSignature(@PathVariable Long id){
        signatureService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
