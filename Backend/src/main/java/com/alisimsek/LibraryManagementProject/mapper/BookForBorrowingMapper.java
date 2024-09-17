package com.alisimsek.LibraryManagementProject.mapper;

import com.alisimsek.LibraryManagementProject.dto.request.BookForBorrowingRequest;
import com.alisimsek.LibraryManagementProject.entity.Book;
import org.mapstruct.Mapper;

@Mapper
public interface BookForBorrowingMapper {

    Book asEntity(BookForBorrowingRequest bookForBorrowingRequest);
}
