import { useDisclosure } from '@chakra-ui/hooks'
import { DragHandleIcon } from '@chakra-ui/icons'
import {
  Button,
  ButtonGroup,
  Flex,
  List,
  ListIcon,
  ListItem,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { MdCheckCircle, MdSettings } from 'react-icons/md'

interface Props {}

const PopoverOnBlock = (props: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const firstFieldRef = React.useRef(null)
  return (
    <Popover placement="right">
      <PopoverTrigger>
        <div
          // {...provided.dragHandleProps}
          style={{ position: 'absolute', top: 15, right: 10 }}
        >
          <DragHandleIcon color="white" />
        </div>
      </PopoverTrigger>
      <Portal>
        <PopoverContent zIndex={1000}>
          <PopoverBody>
            <PopoverArrow />
            <Flex
              zIndex="popover"
              mb={3}
              justify="space-between"
              flexDirection={'column'}
            >
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Assumenda, quia temporibus eveniet a libero incidunt suscipit
                </ListItem>
                <ListItem>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </ListItem>
                {/* You can also use custom icons from react-icons */}
                <ListItem>
                  <ListIcon as={MdSettings} color="green.500" />
                  Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                </ListItem>
              </List>
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default PopoverOnBlock
