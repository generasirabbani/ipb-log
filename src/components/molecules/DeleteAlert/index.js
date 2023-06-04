import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from '@chakra-ui/react'
import React from 'react'

const DeleteAlert = ({
  deletedItem,
  isConfirmationOpen,
  cancelRef,
  cancelDelete,
  confirmDelete,
}) => {
  return (
    <AlertDialog isOpen={isConfirmationOpen} leastDestructiveRef={cancelRef}>
    <AlertDialogOverlay />

    <AlertDialogContent>
      <AlertDialogHeader fontSize="lg" fontWeight="bold">
        Delete {deletedItem}
      </AlertDialogHeader>

      <AlertDialogBody>
        Yakin akan menghapus {deletedItem} ini?
      </AlertDialogBody>
      <AlertDialogBody>
        *{deletedItem} yang sudah dihapus tidak dapat dipulihkan.
      </AlertDialogBody>

      <AlertDialogFooter>
        <Button ref={cancelRef} onClick={cancelDelete}>
          Cancel
        </Button>
        <Button colorScheme="red" onClick={confirmDelete} ml={3}>
          Delete
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  )
}

export default DeleteAlert;