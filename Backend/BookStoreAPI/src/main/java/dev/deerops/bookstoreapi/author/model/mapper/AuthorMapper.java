package dev.deerops.bookstoreapi.author.model.mapper;

import dev.deerops.bookstoreapi.author.model.dto.request.AuthorIdRequest;
import dev.deerops.bookstoreapi.author.model.dto.request.CreateAuthorRequest;
import dev.deerops.bookstoreapi.author.model.dto.request.UpdateAuthorRequest;
import dev.deerops.bookstoreapi.author.model.dto.response.AuthorResponse;
import dev.deerops.bookstoreapi.author.model.entity.Author;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AuthorMapper {
    Author fromCreateAuthorRequest(CreateAuthorRequest createAuthorRequest);
    Author fromAuthorIdRequest(AuthorIdRequest authorIdRequest);
    Author fromUpdateAuthorRequest(UpdateAuthorRequest updateAuthorRequest);

    AuthorResponse toAuthorResponse(Author author);
}
