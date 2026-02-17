package in.cs.main.mapper;

import in.cs.main.dto.ContactRequestdto;
import in.cs.main.dto.ContactResponsedto;
import in.cs.main.dto.EmailDTO;
import in.cs.main.dto.PhoneDTO;
import in.cs.main.entity.Contact;
import in.cs.main.entity.ContactEmail;
import in.cs.main.entity.ContactPhone;

import java.util.stream.Collectors;

public class ContactMapper {



        public static Contact toEntity(ContactRequestdto dto) {
            Contact contact = new Contact();
            contact.setFirstName(dto.firstName);
            contact.setLastName(dto.lastName);
            contact.setTitle(dto.title);

            if (dto.emails != null) {
                contact.setEmails(dto.emails.stream().map(e -> {
                    ContactEmail email = new ContactEmail();
                    email.setEmailAddress(e.emailAddress);
                    email.setEmailType(e.emailType);
                    email.setIsPrimary(e.isPrimary);
                    email.setContact(contact);
                    return email;
                }).collect(Collectors.toList()));
            }

            if (dto.phones != null) {
                contact.setPhones(dto.phones.stream().map(p -> {
                    ContactPhone phone = new ContactPhone();
                    phone.setPhoneNumber(p.phoneNumber);
                    phone.setPhoneType(p.phoneType);
                    phone.setIsPrimary(p.isPrimary);
                    phone.setContact(contact);
                    return phone;
                }).collect(Collectors.toList()));
            }

            return contact;
        }

        public static ContactResponsedto toDTO(Contact contact) {
            ContactResponsedto dto = new ContactResponsedto();
            dto.contactId = contact.getContactId();
            dto.firstName = contact.getFirstName();
            dto.lastName = contact.getLastName();
            dto.title = contact.getTitle();


            dto.emails = contact.getEmails().stream().map(e -> {
                EmailDTO ed = new EmailDTO();
                ed.id = e.getEmailId();
                ed.emailAddress = e.getEmailAddress();
                ed.emailType = e.getEmailType();
                ed.isPrimary = e.getIsPrimary();
                return ed;
            }).collect(Collectors.toList());

            dto.phones = contact.getPhones().stream().map(p -> {
                PhoneDTO pd = new PhoneDTO();
                pd.id = p.getPhoneId();
                pd.phoneNumber = p.getPhoneNumber();
                pd.phoneType = p.getPhoneType();
                pd.isPrimary = p.getIsPrimary();
                return pd;
            }).collect(Collectors.toList());

            return dto;
        }
    }


