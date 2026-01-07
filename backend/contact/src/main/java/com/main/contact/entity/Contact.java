package com.main.contact.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long id;
    @Column
    private  String first_name;
    @Column
    private String last_name;
    @Column
    private String title;
    @Column
    private String email;
    @Column
    private String phone;


}
