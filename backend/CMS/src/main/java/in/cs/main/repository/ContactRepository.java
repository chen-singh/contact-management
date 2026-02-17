package in.cs.main.repository;



//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import in.cs.main.entity.Contact;
//
//@Repository
//public interface ContactRepository extends JpaRepository<Contact, Long> {
//
////    Page<Contact> findByFirstNameContainingIgnoreCaseOrLastNameContainingIgnoreCase(
////            String firstName, String lastName, Pageable pageable);
//
//
//}



import in.cs.main.entity.ContactEmail;
import in.cs.main.entity.ContactPhone;
import org.springframework.data.jpa.repository.JpaRepository;
import in.cs.main.entity.Contact;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> , JpaSpecificationExecutor<Contact> {



    @Query("""
    SELECT DISTINCT c FROM Contact c
    LEFT JOIN c.emails e
    WHERE LOWER(e.emailAddress) LIKE LOWER(CONCAT('%', :email, '%'))
""")
    List<Contact> searchByEmail(@Param("email") String email);


    @Query("""
    SELECT DISTINCT c FROM Contact c
    LEFT JOIN c.phones p
    WHERE p.phoneNumber LIKE CONCAT('%', :phone, '%')
""")
    List<Contact> searchByFirstName(@Param("firstName") String phone);


}

@Repository
interface ContactEmailRepository extends JpaRepository<ContactEmail, Integer> {
}
@Repository
interface ContactPhoneRepository extends JpaRepository<ContactPhone, Integer> {
}