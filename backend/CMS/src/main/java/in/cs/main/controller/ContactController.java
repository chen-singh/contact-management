
package in.cs.main.controller;

import in.cs.main.dto.ContactRequestdto;
import in.cs.main.dto.ContactResponsedto;
import in.cs.main.service.ContactService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
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
    public Page<ContactResponsedto> getAll(Pageable pageable) {
        return service.getAll(pageable);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }


    @GetMapping("/search")
    public Page<ContactResponsedto> search(
            @RequestParam String keyword,
            Pageable pageable) {

        return service.search(keyword, pageable);
    }
    @PutMapping("/{id}")
    public ContactResponsedto update(
            @PathVariable Integer id,
            @RequestBody ContactRequestdto dto) {

        return service.update(id, dto);
    }
}
