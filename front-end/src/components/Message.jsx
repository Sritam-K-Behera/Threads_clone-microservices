import { Flex, Text, Box, Avatar } from '@chakra-ui/react'
import { BsCheck2All } from 'react-icons/bs'

const Message = ({ ownMessage }) => {
    return (
        <>
            {ownMessage ? (

                <Flex gap={2} alignSelf={"flex-end"}>
                    {/* <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}> */}
                        <Text maxW={'350px'} bg={'blue.400'} p={1} borderRadius={'md'}>lorem50</Text>
                        <Avatar src='' w='7' h={7} />
                        
                    </Flex>
                // </Flex>
            ) : (
                <Flex gap={2}>
                    {/* <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}> */}
                        <Avatar src='' w='7' h={7} />
                        <Text maxW={'350px'} color={'black'} bg={'gray.400'} p={1} borderRadius={'md'}>lorem50</Text>
                        
                    </Flex>
                // </Flex>
            )}
        </>
    )
}

export default Message