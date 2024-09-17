package com.alisimsek.LibraryManagementProject.mapper;

import com.alisimsek.LibraryManagementProject.dto.request.AuthorRequest;
import com.alisimsek.LibraryManagementProject.dto.response.AuthorResponse;
import com.alisimsek.LibraryManagementProject.entity.Author;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper
public interface AuthorMapper {
    Author asEntity(AuthorRequest authorRequest);

    AuthorResponse asOutput(Author author);

    List<AuthorResponse> asOutput(List<Author> author);

    void update(@MappingTarget Author entity, AuthorRequest request);
}
