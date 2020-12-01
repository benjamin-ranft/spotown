import React from 'react';
import styled from 'styled-components/macro';
import TimeAgo from "react-timeago/lib";

export default function Discovery({ discovery }) {

    return (
        <DiscoveryStyled>
            <StyledThumbnail>
                <img src={discovery.thumbnail} alt={discovery.name}/>
            </StyledThumbnail>
            <StyledDiscoveryContentShort>
                <NameAndAddress>
                    <h2>{discovery.name}</h2>
                    <p>{discovery.address}</p>
                </NameAndAddress>
                <CreationDate>
                    <p>
                        <TimeAgo date={discovery.timestamp}/>
                    </p>
                </CreationDate>
            </StyledDiscoveryContentShort>
        </DiscoveryStyled>
    );
}

const DiscoveryStyled = styled.div`
background-color: var(--white);
box-shadow: var(--center-box-shadow);
border-radius: 10px;
display: grid;
grid-template-rows: 1fr 0.5fr;
width: auto;
height: auto;
`

const StyledThumbnail = styled.div`
border-radius: 10px 10px 0 0;
height: 140px;

img{
object-fit: cover;
border-radius: 10px 10px 0 0;
height: 100%;
width: 100%;
}
`

const StyledDiscoveryContentShort = styled.div`
display: grid;
grid-template-columns: 3fr 1fr;
padding: 15px;

  h2{
  font-size: var(--size-lplus);
  }
  
  p{
  font-size: var(--size-m);
  }
`

const NameAndAddress = styled.div`

`

const CreationDate = styled.div`
justify-self: right;
p{
font-size: var(--size-m);
}
`
