import { Avatar, Flex, Text, Image, Box, Divider, Button, Spinner } from '@chakra-ui/react'
import { Actions } from '../components/Actions'
import { Comment } from '../components/Comment'
import useGetUserProfile from '../Hooks/useGetUserProfile'
import { useNavigate, useParams } from 'react-router-dom'
import useShowToast from '../Hooks/useShowToast'
import { useEffect } from 'react'
import { formatDistanceToNowStrict } from 'date-fns'
import { DeleteIcon } from "@chakra-ui/icons"
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import postsAtom from '../atoms/postsAtom'



const PostPage = () => {
    const { user, loading } = useGetUserProfile()
    const [posts, setPosts] = useRecoilState(postsAtom)
    const showToast = useShowToast()
    const { pid } = useParams()
    const currentUser = useRecoilValue(userAtom)
    const navigate = useNavigate()

    const currentPost = posts[0]

    useEffect(() => {

        const getPosts = async () => {
            try {
                const res = await fetch(`/api/posts/${pid}`,)
                const data = await res.json()
                if (data.error) {
                    showToast('Error', data.error, 'error')
                    return
                }
                // console.log(data)
                setPosts([data])
            } catch (error) {
                showToast('Error', error.message, 'error')
                setPosts([])
            }
        }
        getPosts()
    }, [showToast, pid, setPosts])

    const handleDeletePost = async () => {
        try {
            // e.preventDefault()
            if (!window.confirm("Pakka delete karega ?")) return
            const res = await fetch(`/api/posts/${currentPost._id}`, {
                method: 'DELETE'
            })
            const data = await res.json()
            if (data.error) {
                showToast('Error', data.error, 'error')
            }
            showToast('Deleted', "Delete ho gaya bro", 'success')
            navigate(`/${user.username}`)
        } catch (error) {
            showToast('Error', error, 'error')
        }
    }



    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size='xl' />
            </Flex>
        )
    }
    if (!currentPost) return null

    return (
        <>
            <Flex > 
                <Flex w={'full'} alignItems={'center'} gap={2}>
                    <Avatar src={user.profilePic} size={'md'} name={user.name} />
                    <Flex>
                        <Text fontSize={'sm'} fontWeight={'bold'}>{user.name}</Text>
                        <Image src='/verified.png' w={4} h={4} ml={1} mt={1} />
                    </Flex>
                </Flex>
                <Flex gap={4} alignItems={'center'}>
                    <Text fontSize={'xs'} width={36} textAlign={'right'} color={'gray.light'} >
                        {formatDistanceToNowStrict(new Date(currentPost.createdAt))} ago
                    </Text>
                    {currentUser?._id === user._id && (<DeleteIcon size={20}
                        cursor={'pointer'}
                        onClick={handleDeletePost}
                    />)}
                </Flex>
            </Flex>
            <Text my={3}>{currentPost.text}</Text>
            {currentPost.image && (
                <Box borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
                    <Image src={currentPost.image} w={'full'} />
                </Box>
            )}
            <Flex>
                <Actions post={currentPost}  />
            </Flex>
            <Divider my={4} />
            <Flex justifyContent={'space-between'}>
                <Flex gap={2} alignItems={'center'}>
                    <Text fontSize={'2xl'}>👋</Text>
                    <Text color={'gray.light'}>Get the app to like and reply and post.</Text>
                </Flex>
                <Button>Get</Button>
            </Flex>
            <Divider my={4} />
            {currentPost.replies.map(reply => (
                <Comment
                    key={reply._id}
                    reply={reply}
                    lastreply={reply._id === currentPost.replies[currentPost.replies.length - 1]._id}
                />
            ))}

        </>
    )
}

export default PostPage