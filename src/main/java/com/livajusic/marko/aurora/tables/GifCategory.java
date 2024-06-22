/*
 * This file is part of Aurora.
 *
 * Aurora is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Aurora is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Aurora. If not, see <https://www.gnu.org/licenses/>.
 *
 * Author: Marko Livajusic
 * Email: marko.livajusic4 <at> gmail.com
 * Copyright: (C) 2024 Marko Livajusic
 */
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
