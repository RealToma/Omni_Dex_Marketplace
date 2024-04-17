import React, { useState } from 'react'
import styled from 'styled-components'
import { ethers } from 'ethers'
import {
  Card,
  CardBody,
  Heading,
  Image,
  Tag,
  Button,
  Text,
  CardFooter,
  useModal,
} from 'pancakeswap-uikit'
import { useProfile } from 'state/profile/hooks'
import { useTranslation } from 'contexts/Localization'
import history from 'routerHistory'
import { Nft, NftCollection } from 'config/constants/types'
import InfoRow from '../InfoRow'
import CollectionPreview from './CollectionPreview'

export interface NftCardProps {
  nftCollection: NftCollection
  canClaim?: boolean
  tokenIds?: number[]
  onClaim?: () => Promise<ethers.providers.TransactionResponse>
  refresh: () => void
}

const Header = styled(InfoRow)`
  min-height: 28px;
`

const NftCollectionCard: React.FC<NftCardProps> = ({ nftCollection, canClaim = false, tokenIds = [], onClaim, refresh }) => {
  const { t } = useTranslation()
  const { profile } = useProfile()
  const { name, description, userImage, address } = nftCollection
  const walletOwnsNft = tokenIds.length > 0


  const gotoCollection = () => {
    history.push(`/collectibles/${address}`)
  }

  return (
    <Card isActive={walletOwnsNft} onClick={gotoCollection}>
      <CollectionPreview nft={nftCollection} isOwned={walletOwnsNft} />
      <CardBody>
        <Header>
          <Image
            src={userImage}
            height={50}
            width={50}
            style={{ borderRadius: '25px', overflow: 'hidden' }}
          />
          <Heading>{name}</Heading>
        </Header>
      </CardBody>
    </Card>
  )
}

export default NftCollectionCard
