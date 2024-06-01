import { Flex, Box, Text, Image, WrapItem, Stack, Avatar, AvatarBadge, useColorModeValue } from '@chakra-ui/react'
import { BsCheck2All } from "react-icons/bs"
const Conversation = () => {
    return (
        <Flex gap={4}
            p={1}
            _hover={{
                cursor: "pointer",
                bg: useColorModeValue("gray.600", "gray.dark"),
                color: "white",
            }}
            alignItems={'center'}
            borderRadius={"md"}>
            <WrapItem>
                <Avatar
                    size={{
                        base: "xs",
                        sm: "sm",
                        md: "md",
                    }}
                    src="https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_640,q_50/lsci/db/PICTURES/CMS/316600/316605.png"
                >
                    {true ? <AvatarBadge boxSize='1em' bg='green.500' /> : ""}
                </Avatar>
            </WrapItem>

            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight='700' display={"flex"} alignItems={"center"}>
                    Virat <Image src='/verified.png' w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={'xs'} display={'flex'} align={"center"} gap={1}>
                    Hlw
                </Text>
            </Stack>

        </Flex>

    )
}

export default Conversation