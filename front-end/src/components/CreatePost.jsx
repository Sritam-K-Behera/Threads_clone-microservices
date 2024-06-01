import { AddIcon } from "@chakra-ui/icons"
import { Input, Text, ModalBody, ModalFooter, ModalCloseButton, ModalHeader, ModalContent, ModalOverlay, Modal, Button, useColorModeValue, useDisclosure, FormControl, Textarea, Flex, Image, CloseButton } from "@chakra-ui/react"
import { useState, useRef } from "react"
import usePreviewImg from '../Hooks/usePreviewImg'
import { BsFillImageFill } from "react-icons/bs"
import { useRecoilState, useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import useShowToast from "../Hooks/useShowToast"
import postsAtom from "../atoms/postsAtom"
import { useParams } from "react-router-dom"


const MAX_CHAR = 500
export const CreatePost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [postText, setPostText] = useState('')
  const { handleImgChange, imgUrl, setImgUrl } = usePreviewImg()
  const imageRef = useRef(null)
  const [remainingChar, setRemainingChar] = useState(MAX_CHAR)
  const user = useRecoilValue(userAtom)
  const showToast = useShowToast()
  const [loading, setLoading] = useState(false)
  const [posts,setPosts]=useRecoilState(postsAtom)
  const {username} =useParams

  const handleTextChange = (e) => {
    const inputText = e.target.value
    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR)
      setPostText(truncatedText)
      setRemainingChar(0)
    } else {
      setPostText(inputText)
      setRemainingChar(MAX_CHAR - inputText.length)
    }

  }
  const handleCreatePost = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/posts/create', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ postedBy: user._id, text: postText, image: imgUrl })
      })
      const data = await res.json()
      console.log(data)
      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }

      showToast('Success', "Posted", 'success')
      if (username===user.username){
        setPosts([data, ...posts])

      }
      onClose()
      setPostText("")
      setImgUrl("")
    } catch (error) {
      showToast('Error', error, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        position={'fixed'}
        bottom={10}
        right={5}
        // leftIcon={<AddIcon />}
        bg={useColorModeValue("gray.300", "gray.dark")}
        onClick={onOpen}
        size={{base:'sm' , sm:'md'}}
      ><AddIcon />

      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Textarea
                placeholder="Post Content goes here"
                onChange={handleTextChange}
                value={postText}
              />
              <Text fontSize='xs'
                textAlign={'right'}
                fontWeight={'bold'}
                margin={'1'}
                color={'gray.800'}>
                {remainingChar}/{MAX_CHAR}
              </Text>
              <Input type="file" hidden ref={imageRef}
                onChange={handleImgChange}
              />

              <BsFillImageFill style={{ marginLeft: "5px", cursor: 'pointer' }}
                size={16}
                onClick={() => imageRef.current.click()} />
            </FormControl>
            {imgUrl && (
              <Flex mt={5} w={'full'} position={'relative'}>
                <Image src={imgUrl} alt="Selected Image" />
                <CloseButton onClick={() => {
                  setImgUrl('')
                }}
                  bg={'gray.800'}
                  position={'absolute'}
                  top={2}
                  right={2}
                />
              </Flex>
            )}

          </ModalBody>


          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleCreatePost}
              isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost
