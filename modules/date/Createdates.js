import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateStepOne from 'modules/date/createStepOne'
import CreateStepTwo from 'modules/date/createStepTwo'
import CreateStepThree from 'modules/date/createStepThree'
import CreateStepFour from 'modules/date/createStepFour'
import DatePreview from 'modules/date/datePreview'
import ConfirmDate from './confirmDate';
import { useRouter } from 'next/router';
import useWindowSize from "utils/useWindowSize";

const CreateDate = props => {
  const [page, setPage] = useState(0);
  const router = useRouter();
  const [confirmPopup, setConfirmPopup] = useState(false);
  const cityState = useSelector(state => state?.form?.ChooseCity?.values);
  const { width } = useWindowSize();

  if (!cityState?.enter_city) {
    router.push("/create-date/choose-city");
    window.scrollTo(0, 0);
  }

  const toggle = () => setConfirmPopup(!confirmPopup)

  const nextPage = () => {
    setPage(page + 1)
    window.scrollTo(0, 0);
  }
  const previousPage = () => {
    setPage(page - 1)
    window.scrollTo(0, 0);
  }
  return (
    <div>
      {!router.query.drafted && page == 0 &&
        <CreateStepOne onSubmit={nextPage} onClose={toggle} />
      }
      {!router.query.drafted && page == 1 &&
        <>
          <CreateStepTwo previousPage={previousPage} onSubmit={nextPage} onClose={toggle} />
        </>
      }
      {!router.query.drafted && page == 2 && (
        <>
          <CreateStepThree
            previousPage={previousPage}
            onSubmit={nextPage}
            onClose={toggle}
          />

        </>
      )}
      {!router.query.drafted && page == 3 && (
        <>
          <CreateStepFour
            previousPage={previousPage}
            onSubmit={nextPage}
            onClose={toggle}
          />
        </>
      )}
      {(router.query.drafted || page == 4) && (
        <>
          <DatePreview />
        </>
      )}
      {width < 767 && (
        <ConfirmDate
          isOpen={confirmPopup}
          toggle={toggle}
        />)}
    </div>
  )
}

export default CreateDate