import { useSetRecoilState } from 'recoil'
import postsAtom from '../atoms/postsAtom'
import userAtom from '../atoms/userAtom'
import useShowToast from './useShowToast'

const useLogOut = () => {
    const setUser = useSetRecoilState(userAtom)
    const showToast = useShowToast()
    const logout = async () => {
        try {
            const res = await fetch("/api/users/logout", {
                method: 'POST',
                headers: {
                    'Content-type': "application/json"
                }
            })
            const data = await res.json()
            // console.log(data)
            if (data.error) {
                showToast('Error', data.error, 'error')
                return
            }
            localStorage.removeItem('user-threads')
            setUser(null)
            window.location.reload();

        } catch (error) {
            // console.log(error)
            showToast("Error", error, "error");
        }
    }
    return logout
}
export default useLogOut
