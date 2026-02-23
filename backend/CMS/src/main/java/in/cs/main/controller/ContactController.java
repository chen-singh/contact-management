
package in.cs.main.controller;

import in.cs.main.dto.ContactRequestdto;
import in.cs.main.dto.ContactResponsedto;
import in.cs.main.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;



import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@RequiredArgsConstructor
public class ContactController {


    @Autowired
    private final ContactService service;

    @PostMapping
    public ContactResponsedto create(@RequestBody ContactRequestdto dto) {
        return service.create(dto);
    }

    @GetMapping("/{id}")
    public ContactResponsedto getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    @GetMapping
    public List<ContactResponsedto> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
    @GetMapping("/filter")
    public Page<ContactResponsedto> filter(
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName,
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String phone,
            Pageable pageable) {

        return service.filter(firstName, lastName, email, phone, pageable);
    }

}
