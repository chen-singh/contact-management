package in.cs.main.dto;

import java.util.List;

public class ContactResponsedto {
    public Integer contactId;
    public String firstName;
    public String lastName;
    public String title;
    public List<EmailDTO> emails;
    public List<PhoneDTO> phones;
}
