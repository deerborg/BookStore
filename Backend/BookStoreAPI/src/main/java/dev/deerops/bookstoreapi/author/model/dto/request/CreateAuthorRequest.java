package dev.deerops.bookstoreapi.author.model.dto.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import dev.deerops.bookstoreapi.book.model.entity.Book;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CreateAuthorRequest {

    @NotBlank(message = "Author name cannot be empty")
    private String name;
    @NotNull(message = "Author birth date cannot be empty")
    private LocalDate birthDate;
    @NotBlank(message = "Author country cannot be empty")
    private String country;

}
