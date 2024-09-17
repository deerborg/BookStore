package com.alisimsek.LibraryManagementProject.repository;

import com.alisimsek.LibraryManagementProject.entity.BookBorrowing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface  BookBorrowingRepository extends JpaRepository<BookBorrowing,Long> {
}
