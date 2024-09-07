package dev.deerops.bookstoreapi.book.model.entity;

import dev.deerops.bookstoreapi.author.model.entity.Author;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;

@Entity
@Table(name = "books")
@Getter
@Setter
public class Book {
    @Id
    @GeneratedValue
    @UuidGenerator
    private String id;

    private String name;

    @Temporal(TemporalType.DATE)
    private LocalDate publicationDate;

    private Long stock;

    @ManyToOne
    private Author author;
}
