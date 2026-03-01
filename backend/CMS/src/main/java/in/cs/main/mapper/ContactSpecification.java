package in.cs.main.mapper;


import in.cs.main.entity.Contact;
import jakarta.persistence.criteria.*;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

public class ContactSpecification {

    public static Specification<Contact> filter(
            String firstName,
            String lastName,
            Pageable pageable
    ) {

        return (Root<Contact> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {

            query.distinct(true);

            Predicate firstNamePredicate = null;
            Predicate lastNamePredicate = null;

            if (firstName != null && !firstName.isBlank()) {
                firstNamePredicate = cb.like(
                        cb.lower(root.get("firstName")),
                        "%" + firstName.toLowerCase() + "%"
                );
            }

            if (lastName != null && !lastName.isBlank()) {
                lastNamePredicate = cb.like(
                        cb.lower(root.get("lastName")),
                        "%" + lastName.toLowerCase() + "%"
                );
            }


            if (firstNamePredicate != null && lastNamePredicate != null) {
                return cb.or(firstNamePredicate, lastNamePredicate);
            }


            if (firstNamePredicate != null) {
                return firstNamePredicate;
            }


            if (lastNamePredicate != null) {
                return lastNamePredicate;
            }


            return cb.conjunction();
        };
    }


}
