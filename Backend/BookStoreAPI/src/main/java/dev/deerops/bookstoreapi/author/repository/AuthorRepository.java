package dev.deerops.bookstoreapi.author.repository;

import dev.deerops.bookstoreapi.author.model.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, String> {
}
