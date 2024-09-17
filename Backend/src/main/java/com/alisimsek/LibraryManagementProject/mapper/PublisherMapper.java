package com.alisimsek.LibraryManagementProject.mapper;

import com.alisimsek.LibraryManagementProject.dto.response.PublisherResponse;
import com.alisimsek.LibraryManagementProject.entity.Publisher;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface PublisherMapper {
    PublisherResponse asOutput(Publisher publisher);

    List<PublisherResponse> asOutput(List<Publisher> publishers);
}
