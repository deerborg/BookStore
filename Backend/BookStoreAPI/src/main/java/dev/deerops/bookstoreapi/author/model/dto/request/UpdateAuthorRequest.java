package dev.deerops.bookstoreapi.author.model.dto.request;

import dev.deerops.bookstoreapi.book.model.entity.Book;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateAuthorRequest {
    private String id;

    private String name;

    private LocalDate birthDate;

    private String country;
}
