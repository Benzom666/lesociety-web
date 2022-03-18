import React, { useState, useEffect } from 'react';
import SecondStep from './steps/secondStep'
import ThirdStep from './steps/thirdStep'
import CompleteProfile from './steps/completeProfile'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const RegisterForm = props => {
  const router = useRouter()
  const [page, setPage] = useState(0);
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const user = useSelector(state => state.authReducer.user)

  const nextPage = () => {
    setPage(page + 1)
    window.scrollTo(0, 0);
  }

  const nextPageMale = () => {
    setPage(page + 1)
    setMale(!male);
    window.scrollTo(0, 0);
  }

  const nextPageFemale = () => {
    setPage(page + 1)
    setFemale(!female);
    window.scrollTo(0, 0);
  }

  const previousPage = () => {
    if(page === 0){
      router.push('/auth/registration')
    }else{
      setPage(page - 1)
    }
    window.scrollTo(0, 0);
    setFemale(false);
    setMale(false);
  }

  useEffect(() => {
    if(user.step_completed === 2){
      setPage(1)
    }
    if(user.step_completed === 3){
      setPage(2)
    }
  }, [user])

  return (
    <div>

      {page == 0 && !router?.query?.token && <SecondStep previousPage={previousPage} onSubmit={nextPage} /> }

      {page == 1 && !router?.query?.token && <ThirdStep previousPage={previousPage} onSubmit={nextPage} /> }

      {(page == 2 || router?.query?.token) && <CompleteProfile /> }

    </div>
  )
}

export default RegisterForm