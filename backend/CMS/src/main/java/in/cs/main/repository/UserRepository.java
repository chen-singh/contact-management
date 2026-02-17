package in.cs.main.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.cs.main.entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {

	Optional<Users> findById(Long id);

}
 