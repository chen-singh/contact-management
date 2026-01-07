package com.main.contact.repository;

import com.main.contact.entity.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CrudRepository extends JpaRepository<Contact ,Long> {

  Optional<Contact> findById(Long id);

}
