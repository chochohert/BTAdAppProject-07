// @ts-nocheck
import {Box, Stack} from "@mui/material";
import React, {useEffect, useState} from "react";
import {MaybeHexString, WalletClient} from "@martiandao/aptos-web3-bip44.js";
import {FAUCET_URL, NODE_URL} from "../utils/common";
import {NextPage} from "next";
import NFTItem from "./NFTItem";

interface CollectedItemsProps {
  address?: MaybeHexString
}

const MyCollectedList: NextPage<CollectedItemsProps> = (props) => {
  const {address} = props
  const [collectedCollections, setCollectedCollections] = useState([])

  useEffect(() => {
    getResources()
  }, [address])

  const getResources = async () => {
    if (address !== null ) {
      const walletClient = new WalletClient(NODE_URL, FAUCET_URL)
      const tokens = await walletClient.getTokenIds(address)

      Promise.all(tokens.tokenIds.map(async (token) => {
        const myNft = await walletClient.getToken(token.data)
        const {collection, uri, name, description} = myNft
        return {
          collection: collection,
          name: name,
          image: uri,
          description: description,
          tokenId: token.data,
          isMine: true
        }
      })).then(collectedNFTs => {
        setCollectedCollections(collectedNFTs)
      })
    }
  }

  return (
    <>
      <Box>
        <Stack direction={{xs: 'column', sm: 'row'}} sx={{flexWrap: 'wrap', justifyContent: 'center'}}
               spacing={{xs: 1, sm: 2, md: 4}}>
          {
            collectedCollections.length === 0 ?
              <Box sx={{margin: '10rem auto'}}>
               보유한 NFT가 없습니다.
              </Box>
              :
              collectedCollections.map((item, i) =>
                <NFTItem
                  key={i}
                  collection_title={item.collection_title}
                  image={item.image}
                  name={item.name}
                  description={item.description}
                  tokenId={item.tokenId}
                  isMine={item.isMine}
                />
              )
          }
        </Stack>
      </Box>
    </>
  )
}

export default MyCollectedList
