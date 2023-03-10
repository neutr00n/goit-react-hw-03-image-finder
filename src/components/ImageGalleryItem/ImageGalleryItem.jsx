import { GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {
  return (
    <GalleryImg
      src={webformatURL}
      alt=""
      onClick={() => onClick(largeImageURL)}
    />
  );
};
