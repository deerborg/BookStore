package dev.deerops.bookstoreapi.author.model.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.deerops.bookstoreapi.book.model.entity.Book;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AuthorResponse {

    private String id;

    private String name;

    private LocalDate birthDate;

    private String country;

    private List<Book> books;
}
