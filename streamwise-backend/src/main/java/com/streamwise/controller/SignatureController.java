package com.streamwise.controller;

import com.streamwise.controller.dto.SignatureDTO;
import com.streamwise.domain.model.Signature;
import com.streamwise.domain.model.SignatureImage;
import com.streamwise.domain.model.User;
import com.streamwise.domain.repository.UserRepository;
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

    private final UserRepository userRepository;


    public SignatureController(SignatureService signatureService, JwtUtil jwtUtil, UserRepository userRepository) {
        this.signatureService = signatureService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;

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

    @GetMapping("/user/me/signatures")
    public ResponseEntity<List<SignatureDTO>> getUserSignatures(HttpServletRequest request){
        String token = request.getHeader("Authorization").replace("Bearer ", "");
        String username = jwtUtil.extractUsername(token);

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new RuntimeException("Usuario não encontrado"));

        List<SignatureDTO> signatureDTOS = signatureService.getSignaturesByUser(user.getId());
        return ResponseEntity.ok(signatureDTOS);
    }

    @PostMapping
    public ResponseEntity<SignatureDTO> create(@RequestBody SignatureDTO signatureDTO){

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User loggedUser = (User) authentication.getPrincipal();


        SignatureImage signatureImage = null;
        if (signatureDTO.signatureImageCode() != null) {

            String formattedValue = signatureDTO.signatureImageCode().replace(" ", "").toUpperCase();
            signatureImage = SignatureImage.fromString(formattedValue);
        }


        Signature signatureToCreate = new Signature(
                null,
                signatureDTO.name(),
                signatureDTO.category(),
                signatureDTO.price(),
                signatureDTO.billingDate(),
                loggedUser,
                signatureImage
        );


        Signature signatureCreated = signatureService.create(signatureToCreate, loggedUser);


        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(signatureCreated.getId())
                .toUri();


        SignatureDTO signatureDTOResponse = signatureService.convertToDTO(signatureCreated);


        return ResponseEntity.created(location).body(signatureDTOResponse);
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
