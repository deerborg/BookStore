package com.alisimsek.LibraryManagementProject.controller;


import com.alisimsek.LibraryManagementProject.dto.request.BookBorrowingRequest;
import com.alisimsek.LibraryManagementProject.dto.request.BookBorrowingUpdateRequest;
import com.alisimsek.LibraryManagementProject.entity.BookBorrowing;
import com.alisimsek.LibraryManagementProject.service.BookBorrowingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/borrows")
@RequiredArgsConstructor
public class BookBorrowingController {

    private final BookBorrowingService bookBorrowingService;

    @GetMapping()
    @ResponseStatus(HttpStatus.OK)
    public List<BookBorrowing> findAll() {
        return bookBorrowingService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BookBorrowing getById(@PathVariable("id") Long id) {
        return bookBorrowingService.getById(id);
    }

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public BookBorrowing save(@RequestBody BookBorrowingRequest bookBorrowingRequest) {
        return bookBorrowingService.create(bookBorrowingRequest);
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public BookBorrowing update(@PathVariable("id") Long id, @RequestBody BookBorrowingUpdateRequest bookBorrowingUpdateRequest) {

        return bookBorrowingService.update(id, bookBorrowingUpdateRequest);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void delete(@PathVariable("id") Long id) {
        bookBorrowingService.deleteById(id);
    }


}


