package dev.deerops.bookstoreapi.category.model.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

@Getter
@Setter
@Table(schema = "categories")
@Entity
public class Category {
    @Id
    @GeneratedValue
    @UuidGenerator
    private String id;
    private String name;
    private String description;
}
