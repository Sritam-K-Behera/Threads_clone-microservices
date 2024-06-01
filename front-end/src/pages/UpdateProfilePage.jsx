import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { useRef, useState } from 'react'
import userAtom from '../atoms/userAtom'
import { useRecoilState } from 'recoil'
import usePreviewImg from '../Hooks/usePreviewImg'
import useShowToast from '../Hooks/useShowToast'

export default function UpdateProfilePage() {
    const [user, setUser] = useRecoilState(userAtom)
    const [inputs, setInputs] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
        password: "",
    })
    const fileRef = useRef(null)
    const [updating, setUpdating] = useState(false)

    const showToast = useShowToast()
    const { handleImgChange, imgUrl } = usePreviewImg()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (updating) return
        setUpdating(true)
        try {
            const res = await fetch(`/api/users/update/${user._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
            })
            const data = await res.json()
            console.log(data)
            showToast('Success', data.message, 'success')
            setUser(data)
            localStorage.setItem("user-threads", JSON.stringify(data))
        }
        catch (error) {
            showToast("Error", error, error)
        }finally{
            setUpdating(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Flex
                my={6}
                minH={'100vh'}
                align={'center'}
                justify={'center'}>
                <Stack
                    spacing={4}
                    w={'full'}
                    maxW={'md'}
                    bg={useColorModeValue('white', 'gray.dark')}
                    rounded={'xl'}
                    boxShadow={'lg'}
                    p={6}
                    my={12}>
                    <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                        User Profile Edit
                    </Heading>
                    <FormControl id="userName">
                        <Stack direction={['column', 'row']} spacing={6}>
                            <Center>
                                <Avatar size="xl" src={imgUrl || user.profilePic} />
                            </Center>
                            <Center w="full">
                                <Button w="full" onClick={() => fileRef.current.click()}>Change Avatar</Button>
                                <Input type='file' hidden ref={fileRef} onChange={handleImgChange} />
                            </Center>
                        </Stack>
                    </FormControl>
                    <FormControl >
                        <FormLabel>Name</FormLabel>
                        <Input
                            placeholder="Fullname"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                            value={inputs.name}
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>User name</FormLabel>
                        <Input
                            placeholder="UserName"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                            value={inputs.username}
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Email</FormLabel>
                        <Input
                            placeholder="your-email@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            value={inputs.email}
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Bio</FormLabel>
                        <Input
                            placeholder="something about you"
                            _placeholder={{ color: 'gray.500' }}
                            type="text"
                            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                            value={inputs.bio}
                        />
                    </FormControl>
                    <FormControl >
                        <FormLabel>Password</FormLabel>
                        <Input
                            placeholder="password"
                            _placeholder={{ color: 'gray.500' }}
                            type="password"
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            value={inputs.password}
                        />
                    </FormControl>
                    <Stack spacing={6} direction={['column', 'row']}>
                        <Button
                            bg={'red.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'red.500',
                            }}>
                            Cancel
                        </Button>
                        <Button
                            bg={'blue.400'}
                            color={'white'}
                            w="full"
                            _hover={{
                                bg: 'blue.500',
                            }}
                            type='submit'
                            isLoading={updating}>
                            Submit
                        </Button>
                    </Stack>
                </Stack>
            </Flex>
        </form>
    )
}
