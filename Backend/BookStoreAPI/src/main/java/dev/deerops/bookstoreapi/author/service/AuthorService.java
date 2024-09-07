package dev.deerops.bookstoreapi.author.service;

import dev.deerops.bookstoreapi.author.model.dto.request.CreateAuthorRequest;
import dev.deerops.bookstoreapi.author.model.dto.response.AuthorResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AuthorService {
    ResponseEntity<AuthorResponse> createAuthor(CreateAuthorRequest author);
    ResponseEntity<Boolean> deleteByAuthorId(String id);
    ResponseEntity<List<AuthorResponse>> getAllAuthors();
}
