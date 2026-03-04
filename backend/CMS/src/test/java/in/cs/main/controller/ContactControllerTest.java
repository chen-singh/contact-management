package in.cs.main.controller;
import in.cs.main.dto.ContactRequestdto;
import in.cs.main.dto.ContactResponsedto;
import in.cs.main.service.ContactService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ContactControllerTest {

    @Mock
    private ContactService service;

    @InjectMocks
    private ContactController controller;

    private ContactRequestdto requestDto;
    private ContactResponsedto responseDto;

    @BeforeEach
    void setUp() {
        requestDto = new ContactRequestdto();
        responseDto = new ContactResponsedto();
    }

    @Test
    void testCreate() {
        when(service.create(requestDto)).thenReturn(responseDto);

        ContactResponsedto result = controller.create(requestDto);

        assertNotNull(result);
        assertEquals(responseDto, result);
        verify(service, times(1)).create(requestDto);
    }

    @Test
    void testGetById() {
        Integer id = 1;
        when(service.getById(id)).thenReturn(responseDto);

        ContactResponsedto result = controller.getById(id);

        assertNotNull(result);
        assertEquals(responseDto, result);
        verify(service).getById(id);
    }

    @Test
    void testGetAll() {
        Pageable pageable = PageRequest.of(0, 5);
        Page<ContactResponsedto> page =
                new PageImpl<>(List.of(responseDto));

        when(service.getAll(pageable)).thenReturn(page);

        Page<ContactResponsedto> result = controller.getAll(pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(service).getAll(pageable);
    }

    @Test
    void testDelete() {
        Integer id = 1;

        doNothing().when(service).delete(id);

        controller.delete(id);

        verify(service, times(1)).delete(id);
    }

    @Test
    void testSearch() {
        String keyword = "john";
        Pageable pageable = PageRequest.of(0, 5);
        Page<ContactResponsedto> page =
                new PageImpl<>(List.of(responseDto));

        when(service.search(keyword, pageable)).thenReturn(page);

        Page<ContactResponsedto> result =
                controller.search(keyword, pageable);

        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        verify(service).search(keyword, pageable);
    }

    @Test
    void testUpdate() {
        Integer id = 1;

        when(service.update(id, requestDto))
                .thenReturn(responseDto);

        ContactResponsedto result =
                controller.update(id, requestDto);

        assertNotNull(result);
        assertEquals(responseDto, result);
        verify(service).update(id, requestDto);
    }
}