import {Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { VscSend } from "react-icons/vsc";
const MessageInput = () => {
    return (
        <form>
            <InputGroup>
                <Input w={'full'} placeholder='type a message...' />
                <InputRightElement>
                    <VscSend/>
                </InputRightElement>
            </InputGroup>
        </form>
    )
}

export default MessageInput