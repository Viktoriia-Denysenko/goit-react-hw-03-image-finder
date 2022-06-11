import { Component } from 'react';
import s from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    request: '',
  };

  handleRequest = event => {
    this.setState({ request: event.currentTarget.value.toLowerCase().trim() });
    // this.setState({ request: '' });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.request);
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={s.button}>
            <span className={s.label}>Search</span>
          </button>

          <input
            className={s.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleRequest}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
