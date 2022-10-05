package com.samagricole.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link com.samagricole.domain.Article} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ArticleDTO implements Serializable {

    private Long id;

    private String code;

    private String libelle;

    private String pUHT;

    private Instant tVA;

    private Long pUTTC;

    private CategorieDTO categorie;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLibelle() {
        return libelle;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getpUHT() {
        return pUHT;
    }

    public void setpUHT(String pUHT) {
        this.pUHT = pUHT;
    }

    public Instant gettVA() {
        return tVA;
    }

    public void settVA(Instant tVA) {
        this.tVA = tVA;
    }

    public Long getpUTTC() {
        return pUTTC;
    }

    public void setpUTTC(Long pUTTC) {
        this.pUTTC = pUTTC;
    }

    public CategorieDTO getCategorie() {
        return categorie;
    }

    public void setCategorie(CategorieDTO categorie) {
        this.categorie = categorie;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ArticleDTO)) {
            return false;
        }

        ArticleDTO articleDTO = (ArticleDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, articleDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ArticleDTO{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", libelle='" + getLibelle() + "'" +
            ", pUHT='" + getpUHT() + "'" +
            ", tVA='" + gettVA() + "'" +
            ", pUTTC=" + getpUTTC() +
            ", categorie=" + getCategorie() +
            "}";
    }
}
