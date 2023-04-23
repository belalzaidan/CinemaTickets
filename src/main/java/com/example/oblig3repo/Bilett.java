package com.example.oblig3repo;

import jakarta.persistence.*;

@Entity
@Table(name = "Biletter")
public class Bilett {

    @Id
    @GeneratedValue
    private int id;

    @Column(name = "film")
    private String film;

    @Column(name = "antall")
    private int antall;

    @Column(name = "fornavn")
    private String fornavn;

    @Column(name = "etternavn")
    private String etternavn;

    @Column(name = "telefon")
    private String telefon;

    @Column(name = "epost")
    private String epost;


    public Bilett(String film, int antall, String fornavn, String etternavn, String telefon, String epost) {
        this.film = film;
        this.antall = antall;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.telefon = telefon;
        this.epost = epost;
        this.id = id;
    }

    public Bilett(){
    }

    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public int getAntall() {
        return antall;
    }

    public void setAntall(int antall) {
        this.antall = antall;
    }

    public String getFornavn() {
        return fornavn;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public String getTelefon() {
        return telefon;
    }

    public void setTelefon(String telefon) {
        this.telefon = telefon;
    }

    public String getEpost() {
        return epost;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getId() {
        return this.id;
    }

}