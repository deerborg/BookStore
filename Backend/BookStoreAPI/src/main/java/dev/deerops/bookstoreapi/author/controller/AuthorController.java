package dev.deerops.bookstoreapi.author.controller;

import dev.deerops.bookstoreapi.author.model.dto.request.CreateAuthorRequest;
import dev.deerops.bookstoreapi.author.model.dto.response.AuthorResponse;
import dev.deerops.bookstoreapi.author.service.AuthorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import dev.deerops.bookstoreapi.author.config.*;

import java.util.List;

@RestController
@RequestMapping(AuthorRestApis.AUTHOR)
@RequiredArgsConstructor
public class AuthorController {
    private final AuthorService authorService;

    @PostMapping(AuthorRestApis.CREATE_AUTHOR)
    public  ResponseEntity<AuthorResponse> createAuthor(@Valid @RequestBody CreateAuthorRequest author) {
        return authorService.createAuthor(author);
    }

    @GetMapping(AuthorRestApis.GET_ALL_AUTHORS)
    public ResponseEntity<List<AuthorResponse>> getAuthors() {
        return authorService.getAllAuthors();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteAuthor(@PathVariable String id) {
        return authorService.deleteByAuthorId(id);
    }
}
