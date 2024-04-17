import React from 'react'
import styled from 'styled-components'
import { Nft, NftCollection } from 'config/constants/types'

interface PreviewProps {
  nft: NftCollection
  isOwned?: boolean
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 200px;
`

const StyledImage = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  transition: opacity 1s linear;
  height: 200px;
  object-fit: cover;
  border-radius: 24px 24px 0 0;
`


const CollectionPreview: React.FC<PreviewProps> = ({ nft, isOwned = false }) => {
  const { bannerImage, name } = nft
  const previewImageSrc = `${bannerImage}`

  const previewImage = <StyledImage src={previewImageSrc} alt={name} />

  return (
    <Container>
      {
        previewImage
      }
    </Container>
  )
}

export default CollectionPreview
