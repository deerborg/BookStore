package com.alisimsek.LibraryManagementProject.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookForBorrowingRequest {

    private Long id;
    private String name;
    private int publicationYear;
    private int stock;

}
