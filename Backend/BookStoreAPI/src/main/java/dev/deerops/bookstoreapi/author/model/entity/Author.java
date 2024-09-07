package dev.deerops.bookstoreapi.author.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.deerops.bookstoreapi.book.model.entity.Book;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "authors")
public class Author {
    @Id
    @GeneratedValue
    @UuidGenerator
    private String id;

    private String name;

    @Temporal(TemporalType.DATE)
    private LocalDate birthDate;

    private String country;

    @OneToMany
    @JsonIgnore
    private List<Book> books;
}
