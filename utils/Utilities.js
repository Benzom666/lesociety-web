import axios from "axios";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router'
import configureStore from '../engine';

export const apiRequest = async(args = {}) => {
    args.url = `${'https://staging-api.secrettime.com/api/v1'}/${args.url}`
    return axios({
        ...args,
        headers: {
            'token': configureStore().getState().authReducer.user?.token || ''
        }
    })
}

export const showToast = (message, type) => {
    if (type === 'error') {
        toast.error(message)
    }
    if (type === 'success') {
        toast.success(message)
    }

}

export const redirect = (route) => {
    const router = useRouter()
    router.push(route)
}