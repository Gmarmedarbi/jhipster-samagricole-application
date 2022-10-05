package com.samagricole.service.mapper;

import com.samagricole.domain.Categorie;
import com.samagricole.service.dto.CategorieDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Categorie} and its DTO {@link CategorieDTO}.
 */
@Mapper(componentModel = "spring")
public interface CategorieMapper extends EntityMapper<CategorieDTO, Categorie> {}
