package dev.deerops.bookstoreapi.author.service.impl;

import dev.deerops.bookstoreapi.author.model.dto.request.CreateAuthorRequest;
import dev.deerops.bookstoreapi.author.model.dto.response.AuthorResponse;
import dev.deerops.bookstoreapi.author.model.entity.Author;
import dev.deerops.bookstoreapi.author.model.mapper.AuthorMapper;
import dev.deerops.bookstoreapi.author.repository.AuthorRepository;
import dev.deerops.bookstoreapi.author.service.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;
    private final AuthorMapper authorMapper;

    @Override
    public ResponseEntity<AuthorResponse> createAuthor(CreateAuthorRequest author) {
        return ResponseEntity.ok(authorMapper.toAuthorResponse(
                authorRepository.save(
                authorMapper.fromCreateAuthorRequest(author)
        )));
    }

    @Override
    public ResponseEntity<List<AuthorResponse>> getAllAuthors() {
        List<AuthorResponse> responseList = authorRepository.findAll().stream().map(authorMapper::toAuthorResponse).toList();
        return ResponseEntity.ok(responseList);
    }

    @Override
    public ResponseEntity<Boolean> deleteByAuthorId(String id) {
        Author author = authorRepository.findById(id).orElseThrow();
        authorRepository.delete(author);
        return ResponseEntity.ok(true);
    }
}
