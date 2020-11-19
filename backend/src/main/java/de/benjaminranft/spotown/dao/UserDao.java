package de.benjaminranft.spotown.dao;

import de.benjaminranft.spotown.model.User;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDao extends PagingAndSortingRepository <User, String> {

}
