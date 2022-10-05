package com.samagricole.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Article.
 */
@Entity
@Table(name = "article")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Article implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "libelle")
    private String libelle;

    @Column(name = "p_uht")
    private String pUHT;

    @Column(name = "t_va")
    private Instant tVA;

    @Column(name = "p_uttc")
    private Long pUTTC;

    @ManyToOne
    @JsonIgnoreProperties(value = { "articles" }, allowSetters = true)
    private Categorie categorie;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Article id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return this.code;
    }

    public Article code(String code) {
        this.setCode(code);
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLibelle() {
        return this.libelle;
    }

    public Article libelle(String libelle) {
        this.setLibelle(libelle);
        return this;
    }

    public void setLibelle(String libelle) {
        this.libelle = libelle;
    }

    public String getpUHT() {
        return this.pUHT;
    }

    public Article pUHT(String pUHT) {
        this.setpUHT(pUHT);
        return this;
    }

    public void setpUHT(String pUHT) {
        this.pUHT = pUHT;
    }

    public Instant gettVA() {
        return this.tVA;
    }

    public Article tVA(Instant tVA) {
        this.settVA(tVA);
        return this;
    }

    public void settVA(Instant tVA) {
        this.tVA = tVA;
    }

    public Long getpUTTC() {
        return this.pUTTC;
    }

    public Article pUTTC(Long pUTTC) {
        this.setpUTTC(pUTTC);
        return this;
    }

    public void setpUTTC(Long pUTTC) {
        this.pUTTC = pUTTC;
    }

    public Categorie getCategorie() {
        return this.categorie;
    }

    public void setCategorie(Categorie categorie) {
        this.categorie = categorie;
    }

    public Article categorie(Categorie categorie) {
        this.setCategorie(categorie);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Article)) {
            return false;
        }
        return id != null && id.equals(((Article) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Article{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", libelle='" + getLibelle() + "'" +
            ", pUHT='" + getpUHT() + "'" +
            ", tVA='" + gettVA() + "'" +
            ", pUTTC=" + getpUTTC() +
            "}";
    }
}
