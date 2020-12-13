import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { MdDelete, MdModeEdit } from "react-icons/md";
import DiscoveriesContext from "../../contexts/DiscoveriesContext";

export default function ActionButtons({ id }) {
  const history = useHistory();
  const { remove } = useContext(DiscoveriesContext);

  return (
    <Layout>
      <nav onClick={() => history.push(`/edit/${id}`)}>
        <EditIcon />
      </nav>
      <nav onClick={handleDelete}>
        <DeleteIcon />
      </nav>
    </Layout>
  );

  function handleDelete() {
    remove(id);
    history.goBack();
  }
}

const Layout = styled.section`
  justify-self: end;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;
`;

const EditIcon = styled(MdModeEdit)`
  color: var(--dark-grey);
  font-size: 25px;
`;

const DeleteIcon = styled(MdDelete)`
  color: var(--dark-grey);
  font-size: 25px;
`;
