import { useRecoilState } from 'recoil'

import { blocks, BlockType } from '@recoil/atoms'

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const useBlocks: () => [
  BlockType[],
  {
    addBlock: (b) => void
    removeBlock: (b, id?: string) => void
    clearAllBlocks: () => void
    moveBlocks: (newState) => void
  }
] = () => {
  const [blockList, setBlocks] = useRecoilState(blocks)

  const addBlock = (b) => {
    const uid = uuidv4()
    const newBlock = { ...b, uuid: uid }
    setBlocks((prevBlocks) => [...prevBlocks, newBlock])
  }

  const removeBlock = (b, id?: string) => {
    if (id) {
      setBlocks(blockList.filter((blockItem) => blockItem.uuid !== id))
    } else {
      setBlocks(blockList.filter((blockItem) => blockItem.uuid !== b.uuid))
    }
  }

  const clearAllBlocks = () => {
    setBlocks([])
  }

  const moveBlocks = (newState) => {
    setBlocks(newState)
  }

  return [blockList, { addBlock, removeBlock, clearAllBlocks, moveBlocks }]
}
