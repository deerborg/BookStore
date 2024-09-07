package dev.deerops.bookstoreapi.book.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;

@Table(name = "borrowing")
@Entity
@Getter
@Setter
public class BookBorrowing {
    @Id
    @GeneratedValue
    @UuidGenerator
    private String id;

    private String borrowerName;
    private String borrowerEmail;
    @Temporal(TemporalType.DATE)
    private LocalDate borrowerDate;
    @Temporal(TemporalType.DATE)
    private LocalDate returnDate;
}
