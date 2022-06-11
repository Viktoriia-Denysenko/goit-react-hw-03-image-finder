import { Component } from 'react';
import axios from 'axios';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Searchbar from '../components/Searchbar/Searchbar'
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export class App extends Component{
  state = {
    request: '',
    pictures: [],
    status: 'idle',
    page: 1,
    loading: false,
    error: null,
    showModal: false,
  }

  toggleModal = () => {
    this.setState(({showModal}) => ({
    showModal: !showModal
  }))
}

  handleRequestValue = requestValue => {
   this.setState({request: requestValue})
  }

  // getApi = () => {
  //   return fetch(
  //         `https://pixabay.com/api/?q=${this.state.request}&page=${this.state.page}&key=26520489-9dedc914612f42cfe7de51211&image_type=photo&orientation=horizontal&per_page=12`
  //       )
  //       .then(res => {
  //         if (res.ok) {
  //           return res.json();
  //         }
  //         return Promise.reject(
  //           new Error(`no pictures found`),
  //         );
  //       })
  // }

    async getApi() {
    const { page, request } = this.state;
    try {
      const response = await axios.get(`https://pixabay.com/api/?q=${request}&page=${page}&key=25937561-4be56ebc67dabae3f5d5abc9c&image_type=photo&orientation=horizontal&per_page=12`);
      return response.data;
    } catch (error) {
      this.setState({ status: 'rejected' });
      console.log(error.toJSON());
      return error.toJSON();
    }
  }

    async componentDidUpdate (prevProps, prevState) {
   
    if (prevState.request !== this.state.request ) {
      this.setState({ loading: true})
      // setTimeout(() => {
        this.getApi()
          .then(response => {
            // let pictures = [];
            // response.hits.forEach(picture => {
            //   pictures.push(picture)
            //    return this.setState(prevState => {
            //     return { pictures}
            //   })
            // });
          this.setState({pictures: response.hits, loading: false, page: 1})
          })
      //  this.setState({ loading: false })
      // }, 3000);
  
    }
      
       if (prevState.page !== this.state.page && prevState.request === this.state.request) {
         this.setState({ loading: true })
         
          this.getApi()
          .then(response => {
            response.hits.forEach(picture => {
               return this.setState(prevState => {
                return { pictures: [...prevState.pictures, picture]}
              })
            });

          });
       this.setState({ loading: false })
  
    }

// this.setState({request: ''})
  }  

  loadMore = () => {
    this.setState(prevState => {
    return { page: prevState.page + 1 };
  });
  }



  render() {

    const { showModal, pictures, loading, error } = this.state

    if(error ){
          <div>{error.message}</div>
    }

    return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
        <Searchbar onSubmit={this.handleRequestValue} />
        {loading && <Loader />}
        {pictures && <ImageGallery pictures={pictures} onClick={this.toggleModal} />}
        {showModal && <Modal pictures={pictures} onClose={this.toggleModal}></Modal>}
        {pictures.length !== 0 && <Button loadMore={this.loadMore}/>}
    </div>
  )
}
}
