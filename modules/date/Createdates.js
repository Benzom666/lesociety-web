import React, { useState } from 'react';

import CreateStepOne from 'modules/date/createStepOne'
import CreateStepTwo from 'modules/date/createStepTwo'
import CreateStepThree from 'modules/date/createStepThree'
import CreateStepFour from 'modules/date/createStepFour'
import DatePreview from 'modules/date/datePreview'


const CreateDate = props => {
  const [page, setPage] = useState(0);
  const nextPage = () => {
    setPage(page + 1)
  }
  const previousPage = () => {
    setPage(page - 1)
  }
  return (
    <div>
      {page == 0 &&
        <CreateStepOne onSubmit={nextPage} />
      }
      {page == 1 &&
        <>
            <CreateStepTwo previousPage={previousPage} onSubmit={nextPage} />
        </>
      }
      {page == 2 && (
        <>
            <CreateStepThree
              previousPage={previousPage}
              onSubmit={nextPage}
            />
            
        </>
      )}
      {page == 3 && (
        <>
            <CreateStepFour
              previousPage={previousPage}
              onSubmit={nextPage}
            />
        </>
      )}
      {page == 4 && (
        <>
            <DatePreview />
        </>
      )}
    </div>
  )
}

export default CreateDate