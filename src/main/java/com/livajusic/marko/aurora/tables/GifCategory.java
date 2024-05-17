package com.livajusic.marko.aurora.tables;

import jakarta.persistence.*;

import java.util.ArrayList;

@Entity
@Table(name = "GifCategory")
public class GifCategory {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToMany
    private ArrayList<AuroraGIF> user;

    @Column(unique = false)
    private String category;

    public GifCategory() {}

    public GifCategory(String category) {
        this.category = category;
    }

}
