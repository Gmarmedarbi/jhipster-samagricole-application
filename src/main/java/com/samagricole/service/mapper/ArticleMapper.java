package com.samagricole.service.mapper;

import com.samagricole.domain.Article;
import com.samagricole.domain.Categorie;
import com.samagricole.service.dto.ArticleDTO;
import com.samagricole.service.dto.CategorieDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Article} and its DTO {@link ArticleDTO}.
 */
@Mapper(componentModel = "spring")
public interface ArticleMapper extends EntityMapper<ArticleDTO, Article> {
    @Mapping(target = "categorie", source = "categorie", qualifiedByName = "categorieId")
    ArticleDTO toDto(Article s);

    @Named("categorieId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CategorieDTO toDtoCategorieId(Categorie categorie);
}
