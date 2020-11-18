import React from 'react';
import styled from 'styled-components/macro';

export default function Idea({ discovery, className }) {
    return (
        <DiscoveryStyled className={className}>
            <h2>{discovery.title}</h2>
        </DiscoveryStyled>
    );
}

const DiscoveryStyled = styled.div`
background-color: var(--white);

`