import { TaskImage } from '@/types'
import { parseAsString, useQueryState } from 'nuqs'

export function useTaskVersion(taskImages: TaskImage[]) {
  if (!taskImages.length) {
    return {
      selectedVersion: '',
      selectedImage: null,
      latestImage: null,
      setSelectedVersion: () => {},
    }
  }

  const sortedImages = [...taskImages].sort((a, b) => b.version - a.version)

  const latestImage = sortedImages[0]

  const [selectedVersion, setSelectedVersion] = useQueryState(
    'version',
    parseAsString.withDefault(latestImage.id).withOptions({
      clearOnDefault: false,
    }),
  )

  const selectedImage =
    sortedImages.find((img) => img.id === selectedVersion) ?? latestImage

  return {
    selectedVersion,
    setSelectedVersion,
    selectedImage,
    latestImage,
  }
}
