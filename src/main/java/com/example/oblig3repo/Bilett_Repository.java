package com.example.oblig3repo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public class Bilett_Repository {

    @Autowired
    private JdbcTemplate db;

    public void lagreBilett(Bilett bilett){
        String sql = "INSERT INTO Biletter (film, antall, fornavn, etternavn, telefon, epost) VALUES(?,?,?,?,?,?)";
        db.update(sql, bilett.getFilm(), bilett.getAntall(), bilett.getFornavn(), bilett.getEtternavn(),
                bilett.getTelefon(), bilett.getEpost());
    }

    public List<Bilett> hentAlleBiletter() {
        String sql = "SELECT * FROM Biletter ";
        List<Bilett> alleBiletter = db.query(sql, new BeanPropertyRowMapper(Bilett.class));
        return alleBiletter;
    }
    public void slettÉnBilett(Bilett bilett) {
        String sql = "DELETE FROM Biletter WHERE id = " + bilett.getId();
        db.update(sql);
    }
    public void slettAlleBiletter() {
        String sql = "DELETE FROM Biletter";
        db.update(sql);
    }
}
