import { useAppDispatch, useAppSelector } from '@store/hooks'
import { useEffect } from 'react'
import { getCategories } from '@store/categories/thunk/thunkGatCategories'
const useCategories = () => {
  const { error, loading, records } = useAppSelector(
    (state) => state.categories
  )

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (records.length > 0) return
    // this condition to prevent firing getCategories dispatch ever re-render
    // why cose categories dose not change frequently it stay the same for long time
    // if we have recorded so we do not need to fire dispatch
    if (loading === 'idle') {
      dispatch(getCategories())
    }
  }, [dispatch, loading, records.length])

  return { error, loading, records }
}

export default useCategories
