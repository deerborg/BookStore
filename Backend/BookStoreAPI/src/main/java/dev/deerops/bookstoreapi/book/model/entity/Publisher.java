package dev.deerops.bookstoreapi.book.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;

@Entity
@Table(name = "publishers")
@Getter
@Setter
public class Publisher {
    @Id
    @GeneratedValue
    @UuidGenerator
    private String id;

    private String name;

    private Integer establishmentYear;

    private String address;
}
