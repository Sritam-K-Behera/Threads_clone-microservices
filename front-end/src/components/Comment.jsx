import { Flex, Text, Avatar, Divider } from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import { useState } from 'react'
import { Actions } from './Actions'

export const Comment = ({reply,lastreply}) => {
    return (
        <>
            <Flex gap={4} py={2} my={2} w={'full'}>
                <Avatar src={reply.userProfilePic} size={'sm'} />
                <Flex gap={1} w={'full'} flexDirection={'column'}>
                    <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'}>
                        <Text fontSize={'sm'} fontWeight={'bold'}>
                            {reply.username}
                        </Text>
                        
                    </Flex>
                    <Text>{reply.text}</Text>

                
                </Flex>
            </Flex>
            {!lastreply ? <Divider />:null}
        </>

    )
}
export default Comment