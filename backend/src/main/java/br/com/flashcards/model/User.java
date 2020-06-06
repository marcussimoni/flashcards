
package br.com.flashcards.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;

@Data
@Entity
@Table(name = "TB_USER", schema = "FLASHCARDS")
@SequenceGenerator(name = "SQ_USER",sequenceName = "SQ_USER", allocationSize = 1, schema = "FLASHCARDS")
public class User implements Serializable, UserDetails {

	public User() {
		this.timestamp = LocalDateTime.now();
	}
	
	private static final long serialVersionUID = 2834007606288276147L;

	@Id
	@GeneratedValue(generator = "SQ_USER", strategy = GenerationType.SEQUENCE)
	private long id;
	
	@Column(name = "first_name", nullable = false, length = 100)
	private String firstName;
	
	@Column(name = "last_name", nullable = false, length = 100)
	private String lastName;
	
	@Column(name = "email", nullable = false, length = 100)
	private String email;
	
	@Column(name = "password", nullable = false, length = 100)
	private String password;
	
	@Column(name = "username", nullable = false, length = 100)
	private String username;
	
	@Column(name = "timestamp", nullable = false)
	private LocalDateTime timestamp;
	
	@ManyToMany(fetch = FetchType.EAGER)
	private List<Profile> profiles = new ArrayList<>();
	
 	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return profiles;
	}
	@Override
	public String getPassword() {
		return password;
	}
	@Override
	public String getUsername() {
		return email;
	}
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return true;
	}
	
}
