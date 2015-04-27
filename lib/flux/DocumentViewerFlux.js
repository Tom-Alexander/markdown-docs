import {Flux} from 'flummox';
import DirectoryStore from './DirectoryStore';
import DirectoryActions from './DirectoryActions';

class DocumentViewerFlux extends Flux {
  constructor() {
    super();
    this.createActions('directories', DirectoryActions);
    this.createStore('directories', DirectoryStore, this);
  }
}

export default (new DocumentViewerFlux());