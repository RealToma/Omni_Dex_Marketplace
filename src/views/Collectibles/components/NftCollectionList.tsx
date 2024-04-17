import React from 'react'
import orderBy from 'lodash/orderBy'
import { useWeb3React } from '@web3-react/core'
import { NftCollections } from 'config/constants/nfts'
import { useAppDispatch } from 'state'
import { fetchWalletNfts } from 'state/collectibles'
import { useGetCollectibles } from 'state/collectibles/hooks'
import NftGrid from './NftGrid'
import EasterNftCard from './NftCard/EasterNftCard'
import NftCollectionCard from './NftCard/NftCollectionCard'


/**
 * A map of bunnyIds to special campaigns (NFT distribution)
 * Each NftCard is responsible for checking it's own claim status
 *
 */
const nftComponents = {
  'easter-storm': EasterNftCard,
  'easter-flipper': EasterNftCard,
  'easter-caker': EasterNftCard,
}

const NftCollectionList = () => {
  const { tokenIds } = useGetCollectibles()
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const handleRefresh = () => {
    dispatch(fetchWalletNfts(account))
  }

  return (
    <NftGrid>
      {orderBy(NftCollections, 'sortOrder').map((collection) => {
        return (
          <div key={collection.name}>
            <NftCollectionCard nftCollection={collection} refresh={handleRefresh} />
          </div>
        )
      })}
    </NftGrid>
  )
}

export default NftCollectionList
