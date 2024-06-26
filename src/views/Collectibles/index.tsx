import React from 'react'
import styled from 'styled-components'
import { Heading } from 'pancakeswap-uikit'
import { useTranslation } from 'contexts/Localization'
import Page from 'components/Layout/Page'
// import NftList from './components/NftList'
import NftCollectionList from './components/NftCollectionList'

const StyledHero = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.textSubtle};
  margin-bottom: 24px;
  padding-bottom: 32px;
`

const Collectibles = () => {
  const { t } = useTranslation()

  return (
    <Page>
      <StyledHero>
        <Heading as="h1" scale="xxl" color="secondary">
          {t('Demo Swap Collectibles')}
        </Heading>
      </StyledHero>
      {/* <NftList /> */}
      <NftCollectionList />
    </Page>
  )
}

export default Collectibles
