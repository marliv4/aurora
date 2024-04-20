package com.livajusic.marko.aurora.tables;

import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "AuroraGIFs")
public class AuroraGIF {
    @Id
    @GeneratedValue
    private Integer gifId;

    @Column
    private String path;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private AuroraUser user;

    @Column
    private Date publishDate;

    @Column
    private String licence;

    public AuroraGIF() {}
    public AuroraGIF(String path, AuroraUser user, Date publishDate, String licence) {
        this.path = path;
        this.user = user;
        this.publishDate = publishDate;
        this.licence = licence;
    }

}
