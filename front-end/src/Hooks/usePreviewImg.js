import { useState } from "react"
import useShowToast from "./useShowToast"

export const usePreviewImg = () => {
 const [imgUrl,setImgUrl]=useState(null)
 const showToastToast=useShowToast()
const handleImgChange=(e)=>{
    const file=e.target.files[0]
    // console.log(file) to know type of file img is
    if(file && file.type.startsWith('image/')){
        const reader=new FileReader()

        reader.onloadend=()=>{
            setImgUrl(reader.result)
        }
        reader.readAsDataURL(file)
    }
    else{
        showToastToast("Not an Image","Select an Image",error)
        setImgUrl(null)
    }
}
// console.log(imgUrl)
  return {handleImgChange,imgUrl,setImgUrl}
}

export default usePreviewImg
