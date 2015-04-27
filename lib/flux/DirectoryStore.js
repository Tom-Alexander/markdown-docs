import {Store} from 'flummox';

class DirectoryStore extends Store {

  constructor(flux) {
    super();
    const directoryActionIds = flux.getActionIds('directories');

    this.registerAsync(
      directoryActionIds.fetchDirectory,
      this.progressBeginHandler,
      this.directorySuccessHandler,
      this.progressFailureHandler
    );

    this.registerAsync(
      directoryActionIds.fetchDocument,
      this.progressBeginHandler,
      this.documentSuccessHandler,
      this.progressFailureHandler
    );

    this.state = {
      document: {content: ''},
      directory: window.gon.directory
    };
  }

  progressBeginHandler() {
    this.setState({
      progress: true,
      error: false,
      document: {content: ''}
    });
  }

  directorySuccessHandler(directory) {
    this.setState({
      directory,
      progress: false
    });
  }

  documentSuccessHandler(content) {
    this.setState({
      document: {content},
      progress: false
    });
  }

  progressFailureHandler() {
    this.setState({
      error: true,
      progress: false,
      document: {content: ''}
    });
  }
}

export default DirectoryStore;
