import { Component } from 'react';
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

  getApi = () => {
    return fetch(
          `https://pixabay.com/api/?q=${this.state.request}&page=${this.state.page}&key=26520489-9dedc914612f42cfe7de51211&image_type=photo&orientation=horizontal&per_page=12`
        )
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(
            new Error(`no pictures found`),
          );
        })
  }

    componentDidUpdate = (prevProps, prevState) => {
   
    if (prevState.request !== this.state.request ) {
      this.setState({ loading: true, page: 1})
      // setTimeout(() => {
        // fetch(
        //   `https://pixabay.com/api/?q=${this.state.request}&page=${this.state.page}&key=26520489-9dedc914612f42cfe7de51211&image_type=photo&orientation=horizontal&per_page=12`
        // )
        // .then(res => res.json())
        this.getApi()
          .then(response => {
            // let pictures = [];
            // response.hits.forEach(picture => {
            //   pictures.push(picture)
            //    return this.setState(prevState => {
            //     return { pictures}
            //   })
            // });
          this.setState({pictures: response.hits, loading: false})
          })
          .catch(error =>
            this.setState({ error, loading: false }));
      //  this.setState({ loading: false })
      // }, 3000);
  
    }
      
       if (prevState.page !== this.state.page && prevState.request === this.state.request) {
      this.setState({ loading: true})
      // setTimeout(() => {
        // fetch(
        //   `https://pixabay.com/api/?q=${this.state.request}&page=${this.state.page}&key=26520489-9dedc914612f42cfe7de51211&image_type=photo&orientation=horizontal&per_page=12`
        // )
        // .then(res => res.json())
           this.getApi()
          .then(response => {
            // let pictures = [];
            response.hits.forEach(picture => {
               return this.setState(prevState => {
                return { pictures: [...prevState.pictures, picture]}
              })
            });

          });
       this.setState({ loading: false })
      // }, 3000);
  
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
