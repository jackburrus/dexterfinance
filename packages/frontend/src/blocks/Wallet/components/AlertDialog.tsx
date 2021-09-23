import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
export function AlertDialogInvalidAddress(props) {
  const { validAddressModalOpen } = props
  const [isOpen, setIsOpen] = React.useState(validAddressModalOpen)
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Please enter a valid Ethereum Address
          </AlertDialogHeader>

          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
