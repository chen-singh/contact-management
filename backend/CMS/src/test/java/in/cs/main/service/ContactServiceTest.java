package in.cs.main.service;


import in.cs.main.dto.ContactRequestdto;
import in.cs.main.dto.ContactResponsedto;
import in.cs.main.entity.Contact;
import in.cs.main.entity.ContactEmail;
import in.cs.main.entity.ContactPhone;
import in.cs.main.mapper.ContactMapper;
import in.cs.main.repository.ContactRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.data.domain.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContactServiceTest {

    @Mock
    private ContactRepository repository;

    @InjectMocks
    private ContactService service;

    private Contact contact;
    private ContactRequestdto requestDto;
    private ContactResponsedto responseDto;

    @BeforeEach
    void setup() {
        contact = new Contact();
        contact.setContactId(1);
        contact.setFirstName("John");
        contact.setLastName("Doe");
        contact.setEmails(new ArrayList<>());
        contact.setPhones(new ArrayList<>());

        requestDto = new ContactRequestdto();
        responseDto = new ContactResponsedto();
    }

    // create 

    @Test
    void testCreate() {
        try (MockedStatic<ContactMapper> mapper = mockStatic(ContactMapper.class)) {

            mapper.when(() -> ContactMapper.toEntity(requestDto))
                    .thenReturn(contact);

            when(repository.save(contact)).thenReturn(contact);

            mapper.when(() -> ContactMapper.toDTO(contact))
                    .thenReturn(responseDto);

            ContactResponsedto result = service.create(requestDto);

            assertNotNull(result);
            verify(repository).save(contact);
        }
    }

    // GET BY ID 

    @Test
    void testGetById_Success() {
        try (MockedStatic<ContactMapper> mapper = mockStatic(ContactMapper.class)) {

            when(repository.findById(1))
                    .thenReturn(Optional.of(contact));

            mapper.when(() -> ContactMapper.toDTO(contact))
                    .thenReturn(responseDto);

            ContactResponsedto result = service.getById(1);

            assertEquals(responseDto, result);
        }
    }

    @Test
    void testGetById_NotFound() {
        when(repository.findById(1))
                .thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> service.getById(1));
    }

    // GET ALL LIST 

    @Test
    void testGetAll_List() {
        try (MockedStatic<ContactMapper> mapper = mockStatic(ContactMapper.class)) {

            when(repository.findAll())
                    .thenReturn(List.of(contact));

            mapper.when(() -> ContactMapper.toDTO(contact))
                    .thenReturn(responseDto);

            List<ContactResponsedto> result = service.getAll();

            assertEquals(1, result.size());
        }
    }

    //  GET ALL PAGE

    @Test
    void testGetAll_Page() {
        Pageable pageable = PageRequest.of(0, 5);
        Page<Contact> page = new PageImpl<>(List.of(contact));

        when(repository.findAll(pageable)).thenReturn(page);

        try (MockedStatic<ContactMapper> mapper = mockStatic(ContactMapper.class)) {

            mapper.when(() -> ContactMapper.toDTO(contact))
                    .thenReturn(responseDto);

            Page<ContactResponsedto> result = service.getAll(pageable);

            assertEquals(1, result.getTotalElements());
        }
    }

    //  DELETE 

    @Test
    void testDelete() {
        doNothing().when(repository).deleteById(1);

        service.delete(1);

        verify(repository).deleteById(1);
    }

    //  SEARCH 

    @Test
    void testSearch() {
        Pageable pageable = PageRequest.of(0, 5);
        Page<Contact> page = new PageImpl<>(List.of(contact));

        when(repository.search("john", pageable))
                .thenReturn(page);

        try (MockedStatic<ContactMapper> mapper = mockStatic(ContactMapper.class)) {

            mapper.when(() -> ContactMapper.toDTO(contact))
                    .thenReturn(responseDto);

            Page<ContactResponsedto> result =
                    service.search("john", pageable);

            assertEquals(1, result.getTotalElements());
        }
    }

    //  UPDATE 

    @Test
    void testUpdate_Success() {

        when(repository.findById(1))
                .thenReturn(Optional.of(contact));

        when(repository.save(any(Contact.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        try (MockedStatic<ContactMapper> mapper = mockStatic(ContactMapper.class)) {

            mapper.when(() -> ContactMapper.toDTO(any(Contact.class)))
                    .thenReturn(responseDto);

            ContactResponsedto result =
                    service.update(1, requestDto);

            assertNotNull(result);
            verify(repository).save(contact);
        }
    }

    @Test
    void testUpdate_NotFound() {
        when(repository.findById(1))
                .thenReturn(Optional.empty());

        assertThrows(RuntimeException.class,
                () -> service.update(1, requestDto));
    }
}
