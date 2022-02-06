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

export const imageUploader = async files => {
    if(files.length > 0) {
        const formData = new FormData();
        files.forEach(file => formData.append(`files`, file[0]))
       const res = await apiRequest({
         url: 'files',
         method: 'POST',
         data: formData
       }).then(success => {
         return success
       }).catch(error => {
         return false
       })
       return res.data.data.files
    } else {
        return false;
    }
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