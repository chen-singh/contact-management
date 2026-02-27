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

            // If both are present → use OR
            if (firstNamePredicate != null && lastNamePredicate != null) {
                return cb.or(firstNamePredicate, lastNamePredicate);
            }

            // If only firstName
            if (firstNamePredicate != null) {
                return firstNamePredicate;
            }

            // If only lastName
            if (lastNamePredicate != null) {
                return lastNamePredicate;
            }

            // If nothing provided → return all
            return cb.conjunction();
        };
    }

//    public static Specification<Contact> filterBy(
//            String firstName,
//            String lastName,
//            Pageable pageable
//    ) {
//
//        return (Root<Contact> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
//
//            query.distinct(true);
//
//            Predicate predicate = cb.conjunction();
//
//            if (firstName != null && !firstName.isBlank()) {
//                predicate = cb.and(predicate,
//                        cb.like(cb.lower(root.get("firstName")),
//                                "%" + firstName.toLowerCase() + "%"));
//            }
//
//            if (lastName != null && !lastName.isBlank()) {
//                predicate = cb.and(predicate,
//                        cb.like(cb.lower(root.get("lastName")),
//                                "%" + lastName.toLowerCase() + "%"));
//            }
//
////            if (email != null && !email.isBlank()) {
////                Join<Object, Object> emailJoin = root.join("emails", JoinType.LEFT);
////                predicate = cb.and(predicate,
////                        cb.like(cb.lower(emailJoin.get("emailAddress")),
////                                "%" + email.toLowerCase() + "%"));
////            }
//
////            if (phone != null && !phone.isBlank()) {
////                Join<Object, Object> phoneJoin = root.join("phones", JoinType.LEFT);
////                predicate = cb.and(predicate,
////                        cb.like(phoneJoin.get("phoneNumber"),
////                                "%" + phone + "%"));
////            }
//
//            return predicate;
//        };
//    }
}
