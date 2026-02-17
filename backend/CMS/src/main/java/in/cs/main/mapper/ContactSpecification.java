package in.cs.main.mapper;


import in.cs.main.entity.Contact;
import jakarta.persistence.criteria.*;
import org.springframework.data.jpa.domain.Specification;

public class ContactSpecification {

    public static Specification<Contact> filterBy(
            String firstName,
            String lastName,
            String email,
            String phone
    ) {

        return (Root<Contact> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {

            query.distinct(true); // avoid duplicates (because of joins)

            Predicate predicate = cb.conjunction();

            if (firstName != null && !firstName.isBlank()) {
                predicate = cb.and(predicate,
                        cb.like(cb.lower(root.get("firstName")),
                                "%" + firstName.toLowerCase() + "%"));
            }

            if (lastName != null && !lastName.isBlank()) {
                predicate = cb.and(predicate,
                        cb.like(cb.lower(root.get("lastName")),
                                "%" + lastName.toLowerCase() + "%"));
            }

            if (email != null && !email.isBlank()) {
                Join<Object, Object> emailJoin = root.join("emails", JoinType.LEFT);
                predicate = cb.and(predicate,
                        cb.like(cb.lower(emailJoin.get("emailAddress")),
                                "%" + email.toLowerCase() + "%"));
            }

            if (phone != null && !phone.isBlank()) {
                Join<Object, Object> phoneJoin = root.join("phones", JoinType.LEFT);
                predicate = cb.and(predicate,
                        cb.like(phoneJoin.get("phoneNumber"),
                                "%" + phone + "%"));
            }

            return predicate;
        };
    }
}
