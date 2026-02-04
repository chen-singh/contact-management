package in.cs.main.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
    String name;
    private String email;
    private String password;

}
