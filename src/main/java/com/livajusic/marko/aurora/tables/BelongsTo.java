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

/**
 * Since "GIF" and "GifCategory" are in a m:n and thus an unoptimizable relationship, this class serializes
 * a SQL table which uses primary keys of both classes as foreign keys and saves the GIF and its corresponding
 * categories.
 * @version 1.0
 * @since 2024-05-18
 */

@Entity
@Table(name = "belongs_to")
public class BelongsTo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "gif_id", nullable = false)
    private AuroraGIF gif;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private GifCategory category;

    public BelongsTo() {
    }

    public BelongsTo(AuroraGIF gif, GifCategory category) {
        this.gif = gif;
        this.category = category;
    }

}
