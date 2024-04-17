import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import useTheme from 'hooks/useTheme'
import { ImArrowRight } from 'react-icons/im'
import Select, { OptionProps } from 'components/Select/Select'
import { useTranslation } from 'contexts/Localization'
import { Heading, Flex } from 'pancakeswap-uikit'
import { AppBody } from '../../components/App'
import Page from '../Page'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import leftimage from '../../images/lendingicon.png'
import ethereumimg from '../../images/chain/ethereum.png'
import fantomimg from '../../images/chain/fantom.png'
import ConnectWalletButton from '../../components/ConnectWalletButton'
import { Field } from '../../state/swap/actions'
import { CurrencyAmount, JSBI, Token, Trade } from '../../sdk'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from '../../state/swap/hooks'

const Bridge: React.FC = () => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const handleSortOptionChange = (option: OptionProps): void => {
    // setSortOption(option.value)
  }
  const { v2Trade, currencyBalances, parsedAmount, currencies, inputError: swapInputError } = useDerivedSwapInfo()
  const { onSwitchTokens, onCurrencySelection, onUserInput, onChangeRecipient } = useSwapActionHandlers()
  const maxAmountInput: CurrencyAmount | undefined = maxAmountSpend(currencyBalances[Field.INPUT])
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  const handleMaxInput = useCallback(() => {
    if (maxAmountInput) {
      onUserInput(Field.INPUT, maxAmountInput.toExact())
    }
  }, [maxAmountInput, onUserInput])
  const handleTypeInput = useCallback(
    (value: string) => {
      onUserInput(Field.INPUT, value)
    },
    [onUserInput],
  )
  const handleInputSelect = useCallback(
    (inputCurrency) => {
      setApprovalSubmitted(false) // reset 2 step UI for approvals
      onCurrencySelection(Field.INPUT, inputCurrency)
    },
    [onCurrencySelection],
  )


  return (
    <>
      <Page>
        <Flex justifyContent="center" flexDirection={['column', null, null, 'column']}>
          <Flex flexDirection="row">
            <Flex flex="1" flexDirection="column" justifyContent="center" minWidth="320px" mb="50px" mr={['8px', 0]}>
              <Heading as="h1" scale="xxl" color="text" mb="24px">
                {t('Bridge')}
              </Heading>
              <Heading scale="md" color="text">
                {t('Bridge to and from Fantom Opera')}
              </Heading>
            </Flex>
            <Flex maxWidth="100px" maxHeight="110px" flex={[null, null, null, '1']}>
              <img src={leftimage} alt="" />
            </Flex>
          </Flex>
          <Flex flex="1" height="fit-content" justifyContent="center" mt={['24px', null, '0']}>
            <AppBody>
              <Flex flexDirection="column" padding="1rem" alignItems="center" width="100%">
                <Flex width="100%" marginTop="5%">
                  <Flex flex="1" flexDirection="column" alignItems="center" width="100%">
                    <Flex justifyContent="center" alignItems="center" width="100%">
                      From Chain
                    </Flex>
                    <Flex justifyContent="center" alignItems="center" width="100%" marginTop="10%">
                      <img
                        src={ethereumimg}
                        style={{ width: '30%', height: 100, maxWidth: 'unset !important' }}
                        alt=""
                      />
                    </Flex>
                    <Flex justifyContent="center" alignItems="center" marginTop="10%">
                      <Select
                        options={[
                          {
                            label: t('Ethereum'),
                            value: 'ethereum',
                          },
                          {
                            label: t('Cronos'),
                            value: 'cronos',
                          },
                          {
                            label: t('BSC'),
                            value: 'bsc',
                          },
                          {
                            label: t('OEC'),
                            value: 'oec',
                          },
                          {
                            label: t('Polygon'),
                            value: 'polygon',
                          },
                          {
                            label: t('Fantom'),
                            value: 'fantom',
                          },
                          {
                            label: t('Arbitum'),
                            value: 'arbitum',
                          },
                          {
                            label: t('Avalanche'),
                            value: 'avalanche',
                          },
                          {
                            label: t('Harmony'),
                            value: 'harmony',
                          },
                        ]}
                        onChange={handleSortOptionChange}
                      />
                    </Flex>
                  </Flex>
                  <Flex flex="0.1" alignItems="center" justifyContent="center">
                    <ImArrowRight />
                  </Flex>
                  <Flex flex="1" flexDirection="column" alignItems="center">
                    <Flex justifyContent="center" alignItems="center" width="100%">
                      To Chain
                    </Flex>
                    <Flex justifyContent="center" alignItems="center" width="100%" marginTop="10%">
                      <img
                        src={fantomimg}
                        style={{ width: '40%', height: 100, maxWidth: 'unset !important' }}
                        alt=""
                      />
                    </Flex>
                    <Flex justifyContent="center" alignItems="center" marginTop="10%">
                      <Select
                        options={[
                          {
                            label: t('Ethereum'),
                            value: 'ethereum',
                          },
                          {
                            label: t('Cronos'),
                            value: 'cronos',
                          },
                          {
                            label: t('BSC'),
                            value: 'bsc',
                          },
                          {
                            label: t('OEC'),
                            value: 'oec',
                          },
                          {
                            label: t('Polygon'),
                            value: 'polygon',
                          },
                          {
                            label: t('Fantom'),
                            value: 'fantom',
                          },
                          {
                            label: t('Arbitum'),
                            value: 'arbitum',
                          },
                          {
                            label: t('Avalanche'),
                            value: 'avalanche',
                          },
                          {
                            label: t('Harmony'),
                            value: 'harmony',
                          },
                        ]}
                        onChange={handleSortOptionChange}
                      />
                    </Flex>
                  </Flex>
                </Flex>
                <Flex marginTop='5%' width='100%'>
                  <CurrencyInputPanel
                    label={t('Token to Bridge')}
                    value='0.0'
                    showMaxButton={false}
                    currency={currencies[Field.INPUT]}
                    onUserInput={handleTypeInput}
                    onMax={handleMaxInput}
                    onCurrencySelect={handleInputSelect}
                    otherCurrency={null}
                    id="swap-currency-input"

                  />
                </Flex>
                <Flex flexDirection='column' width='100%' marginTop='5%'>
                  <Flex width='100%' marginTop='2%'>
                    <Flex flex='1' justifyContent='flex-start'>
                      Bridgeable Range:
                    </Flex>
                  </Flex>
                  <Flex width='100%' marginTop='2%'>
                    <Flex flex='1' justifyContent='flex-start'>
                      Max
                    </Flex>
                    <Flex flex='1' justifyContent='flex-end'>
                      1700 AVE
                    </Flex>
                  </Flex>
                  <Flex width='100%' marginTop='2%'>
                    <Flex flex='1' justifyContent='flex-start'>
                      Min
                    </Flex>
                    <Flex flex='1' justifyContent='flex-end'>
                      0.27 AVE
                    </Flex>
                  </Flex>
                  <Flex width='100%' marginTop='2%'>
                    <Flex flex='1' justifyContent='flex-start'>
                      Fee
                    </Flex>
                    <Flex flex='1' justifyContent='flex-end'>
                      0 AVE
                    </Flex>
                  </Flex>
                  <Flex width='100%' marginTop='2%'>
                    <Flex flex='1' justifyContent='flex-start'>
                      Amount greater than 3,300AAVE could take up to 12 hours
                    </Flex>
                  </Flex>
                </Flex>
                <Flex width='100%' marginTop='5%'>
                  <ConnectWalletButton width="100%" />
                </Flex>

              </Flex>
            </AppBody>
          </Flex>
        </Flex>
      </Page>
    </>
  )
}

export default Bridge
