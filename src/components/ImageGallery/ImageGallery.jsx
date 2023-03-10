import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { GalleryList, GalleryItem } from './ImageGallery.styled';

export const ImageGallery = ({ imgList, onClick }) => {
  return (
    <GalleryList>
      {imgList.map(({ id, webformatURL, largeImageURL }) => (
        <GalleryItem key={id}>
          <ImageGalleryItem
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            onClick={onClick}
          />
        </GalleryItem>
      ))}
    </GalleryList>
  );
};
