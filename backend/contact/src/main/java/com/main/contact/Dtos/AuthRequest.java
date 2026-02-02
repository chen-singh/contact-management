package com.main.contact.Dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
    String name;
    private String email;
    private String password;


}
