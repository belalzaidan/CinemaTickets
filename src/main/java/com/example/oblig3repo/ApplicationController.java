package com.example.oblig3repo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ApplicationController {

    @Autowired
    BilettRepository rep;

    @PostMapping("/Lagre")
    public void lagreBillet (Bilett innBillett) {
        rep.save(innBillett);
    }

    @GetMapping("/hentAlle/{sortId}")
    @ResponseBody
    public List<Bilett> hentAlle(@PathVariable int sortId) {
        List<Bilett> result = new ArrayList<>();
        switch (sortId) {
            case 0:
                result = rep.findAll();
                break;
            case 1:
                result = rep.findByOrderByFilm();
                break;
            case 2:
                result = rep.findByOrderByAntall();
                break;
            case 3:
                result = rep.findByOrderByFornavn();
                break;
            case 4:
                result = rep.findByOrderByEtternavn();
                break;
        }
        return result;
    }

    @GetMapping("/slettBilett/{ticketId}")
    private void slettBillett(@PathVariable int ticketId) {
        for(Bilett i : rep.findAll()){
            if(i.getId() == ticketId){
                rep.delete(i);
                break;
            }
        }
    }

    @GetMapping("/slettAlle")
    private void slettAlle() {
        rep.deleteAll();
    }
}


