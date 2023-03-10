import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer, toast } from 'react-toastify';
import { fetchImages } from '../helpers/api/index';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { AppWrap } from './App.styled';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    images: [],
    search: '',
    currentPage: 1,
    currentImage: '',
    status: 'idle',
    showModal: false,
  };

  async componentDidMount() {
    try {
      this.setState({ status: 'pending' });

      const { search } = this.state;

      const images = await fetchImages(search);

      this.setState({ images, status: 'resolve' });
    } catch (error) {
      this.setState({ status: 'reject' });
      toast.error('ooops something went wrong');
    }
  }

  async componentDidUpdate(_, prevState) {
    try {
      const { search, currentPage } = this.state;
      const prevSearch = prevState.search;
      const PrevPage = prevState.currentPage;

      if (prevSearch !== search) {
        this.setState({ status: 'pending' });
        const images = await fetchImages(search);

        this.setState({ images, status: 'resolve' });

        if (images.length === 0) {
          toast.info(`on request ${search} Nothing found`);
        }
      }

      if (PrevPage !== currentPage) {
        this.setState({ status: 'pending' });

        const images = await fetchImages(search, currentPage);

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          status: 'resolve',
        }));
      }
    } catch (error) {
      this.setState({ status: 'reject' });
      toast.error('ooops something went wrong');
    }
  }

  handleSearchValue = (value, { resetForm }) => {
    this.setState({ search: value.search });

    resetForm();
  };

  handleNextPageClick = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };

  handleCurrentImgClick = evt => {
    this.setState({ currentImage: evt, showModal: true });
  };

  handleModalClose = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { images, status, showModal, currentImage } = this.state;
    const hasImages = images.length;
    return (
      <AppWrap>
        <Searchbar onSubmit={this.handleSearchValue} />
        <ImageGallery imgList={images} onClick={this.handleCurrentImgClick} />

        {status === 'pending' && <Loader />}

        {hasImages !== 0 && status === 'resolve' && (
          <Button onClick={this.handleNextPageClick} />
        )}

        {showModal && (
          <Modal
            image={currentImage}
            handleModalClose={this.handleModalClose}
          />
        )}

        <ToastContainer />
      </AppWrap>
    );
  }
}
