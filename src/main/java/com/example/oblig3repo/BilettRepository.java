package com.example.oblig3repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BilettRepository extends JpaRepository<Bilett,Long> {
    List<Bilett> findByOrderByFilm();
    List<Bilett> findByOrderByAntall();
    List<Bilett> findByOrderByFornavn();
    List<Bilett> findByOrderByEtternavn();
    List<Bilett> findByOrderByTelefon();
    List<Bilett> findByOrderByEpost();


}
