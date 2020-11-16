package de.benjaminranft.spotown.dao;

import de.benjaminranft.spotown.model.SpotownUser;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface UserDao extends PagingAndSortingRepository <SpotownUser, String> {

}
