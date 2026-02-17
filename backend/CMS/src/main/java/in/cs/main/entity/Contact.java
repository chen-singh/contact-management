package in.cs.main.entity;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Entity;
//import jakarta.persistence.GeneratedValue;
//import jakarta.persistence.GenerationType;
//import jakarta.persistence.Id;
//import jakarta.persistence.JoinColumn;
//import jakarta.persistence.ManyToOne;
//import jakarta.persistence.OneToMany;
//import jakarta.persistence.Table;
//import lombok.Getter;
//import lombok.Setter;
//
//@Entity
//@Table(name = "contacts")
//@Getter @Setter
//public class Contact {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long contact_id;
//
//    private String firstName;
//    private String lastName;
//    private String title;
//
//    @ManyToOne
//    @JoinColumn(name = "user_id")
//    private Users user;
//
//    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<EmailAddress> emails = new ArrayList<>();
//
//    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<PhoneNumber> phones = new ArrayList<>();
//
//	public Long getId() {
//		return contact_id;
//	}
//
//	public void setId(Long id) {
//		this.contact_id = id;
//	}
//
//}
//



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "contacts")
@Setter @Getter
public class Contact {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer contactId;

    @Column(nullable = false, length = 100)
    private String firstName;

    @Column(nullable = false, length = 100)
    private String lastName;

    @Column(length = 150)
    private String title;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ContactEmail> emails = new ArrayList<>();

    @OneToMany(mappedBy = "contact", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ContactPhone> phones = new ArrayList<>();

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
}
