import { Link, useNavigate } from 'react-router-dom'
import { VStack, Text, Flex, Box, Avatar, MenuButton, Menu, Portal, MenuList, MenuItem, useToast, Image ,Divider} from "@chakra-ui/react"
import { BsThreeDots } from 'react-icons/bs'
import { Actions } from './Actions'
import { useEffect, useState } from 'react'
import useShowToast from '../Hooks/useShowToast'
import { formatDistanceToNowStrict } from 'date-fns'
import { DeleteIcon } from "@chakra-ui/icons"
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import postsAtom from '../atoms/postsAtom'

export const Posts = ({ post, postedBy }) => {
    const [user, setUser] = useState(null)
    const showToast = useShowToast()
    const navigate = useNavigate()
    const currentUser = useRecoilValue(userAtom)
    const [posts, setPosts] = useRecoilState(postsAtom)

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch('/api/users/profile/' + postedBy)
                const data = await res.json()
                // console.log(data)
                if (data.error) {
                    showToast("error", data.error, 'error')
                }
                setUser(data)
            } catch (error) {
                showToast("Error", error.message, 'error')
                setUser(null)
            }
        }
        getUser()
    }, [postedBy, showToast])

    const handleDeletePost = async (e) => {
        try {
            e.preventDefault()
            if (!window.confirm("Pakka delete karega ?")) return
            const res = await fetch(`/api/posts/${post._id}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            if (data.error) {
                showToast('Error', data.error, 'error')
            }
            showToast('Deleted', "Delete ho gaya bro", 'success')
            setPosts(posts.filter((p) => p._id !== post._id))
            // setPosts((prev)=> prev.filter((p)=>p._id !== post._id))
            // window.location.reload();
        } catch (error) {
            showToast('Error', error, 'error')
        }
    }


    if (!user) return null



    return (
        <Link to={`/${user.username}/post/${post._id}`}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={'column'} alignItems={'center'}>
                    <Avatar size={'md'} name={user?.name} src={user?.profilePic}
                        onClick={(e) => {
                            e.preventDefault()
                            navigate(`/${user.username}`)
                        }}
                    />
                    <Box w='1px' h={'full'} bg='gray.light' my={2}></Box>
                    <Box position={'relative'} w={'full'}>
                        {post.replies.length === 0 && <Text textAlign={'center'}>🥱</Text>}
                        {post.replies[0] && (
                            <Avatar
                                size={'xs'}
                                name='Dan Abrahmov'
                                position={'absolute'}
                                src={post.replies[0].userProfilePic}
                                top={'0px'}
                                left='15px'
                                padding={'2px'}
                            />
                        )}
                        {post.replies[1] && (
                            <Avatar
                                size={'xs'}
                                name={post.name}
                                position={'absolute'}
                                src={post.replies[1].userProfilePic}
                                bottom={'0px'}
                                right='-5px'
                                padding={'2px'}
                            />
                        )}
                        {post.replies[2] && (
                            <Avatar
                                size={'xs'}
                                name='Christian Nwamba'
                                position={'absolute'}
                                src={post.replies[2].userProfilePic}
                                bottom={'0px'}
                                left='4px'
                                padding={'2px'}
                            />
                        )}


                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={'column'} gap={2}>
                    <Flex justifyContent={'space-between'} w={'full'}>
                        <Flex w={'full'} alignItems={'center'}>
                            <Text fontSize={'sm'} fontWeight={'bold'}
                                onClick={(e) => {
                                    e.preventDefault()
                                    navigate(`/${user.username}`)
                                }}
                            >{user?.username}</Text>
                            <Image src='/verified.png' w={4} h={4} ml={1} />
                        </Flex>
                        <Flex gap={4} alignItems={'center'}>
                            <Text fontSize={'xs'} width={36} textAlign={'right'} color={'gray.light'} >
                                {formatDistanceToNowStrict(new Date(post.createdAt))} ago
                            </Text>
                            {currentUser?._id === user._id && (<DeleteIcon size={20}
                                cursor={'pointer'}
                                onClick={handleDeletePost}
                            />)}
                        </Flex>
                    </Flex>
                    <Text fontSize={'sm'}>{post.text}</Text>
                    {post.image && (

                        <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
                            <Image src={post.image} w={'full'} />
                        </Box>
                    )}
                    <Flex gap={3} my={1}>
                        <Actions post={post} />
                    </Flex>

                </Flex>
            </Flex>
            <Divider />
        </Link>
    )
}
export default Posts