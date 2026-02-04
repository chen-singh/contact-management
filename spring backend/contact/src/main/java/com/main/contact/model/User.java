package com.main.contact.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private String name;
    @Column
    private String email;
   @Column
    private String password;


}
