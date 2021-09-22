import { Center, Text } from '@chakra-ui/layout'
import React, { useCallback, useEffect } from 'react'

interface Props {}

const FileDropZone = (props: Props) => {
  const onDragEnter = useCallback((e) => {
    // setIsVisible(true);
    e.stopPropagation()
    e.preventDefault()
    return false
  }, [])
  const onDragOver = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }, [])
  const onDragLeave = useCallback((e) => {
    // setIsVisible(false);
    e.stopPropagation()
    e.preventDefault()
    return false
  }, [])
  const onDrop = useCallback((e) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    console.log('Files dropped: ', files)
    // Upload files
    // setIsVisible(false);
    return false
  }, [])

  useEffect(() => {
    window.addEventListener('mouseup', onDragLeave)
    window.addEventListener('dragenter', onDragEnter)
    window.addEventListener('dragover', onDragOver)
    window.addEventListener('drop', onDrop)
    return () => {
      window.removeEventListener('mouseup', onDragLeave)
      window.removeEventListener('dragenter', onDragEnter)
      window.removeEventListener('dragover', onDragOver)
      window.removeEventListener('drop', onDrop)
    }
  }, [onDragEnter, onDragLeave, onDragOver, onDrop])
  return (
    <Center flex={1} h={'80vh'} flexDirection={'column'}>
      <Text fontFamily={'Inter'} fontSize="2xl" mb={2} color={'grey'}>
        Press ⌘+K for block search,{' '}
      </Text>
      <Text mb={2} fontFamily={'Inter'} fontSize="2xl" color={'grey'}>
        or drag in a block file.
      </Text>
      {/* <PlusSquareIcon w={10} h={10} color={'grey'} /> */}
    </Center>
  )
}

export default FileDropZone
