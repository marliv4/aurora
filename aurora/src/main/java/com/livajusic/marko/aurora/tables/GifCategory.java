package com.livajusic.marko.aurora.tables;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Set;

@Entity
@Table(name = "GifCategory")
public class GifCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @Column(name = "category", unique = true)
    private String category;

    @OneToMany
    private Set<BelongsTo> gifs;

    public Set<BelongsTo> getGifs() {
        return gifs;
    }

    public void setGifs(Set<BelongsTo> gifs) {
        this.gifs = gifs;
    }

    public GifCategory() {}

    public GifCategory(String category) { this.category = category; }

    public void setCategory(String category) { this.category = category; }

    public String getCategory() { return category; }

    public Long getId() { return categoryId; }
}
