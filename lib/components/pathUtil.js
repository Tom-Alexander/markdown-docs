var pathUtil = {

  /**
   * @param path
   * @returns {*}
   */
  clean(path) {
    path = path === '/' ? '/source' : path;
    path = path.replace('wiki', '');
    const prefix = (/^\//g);
    const suffix = (/\/$/g);
    const hasExtension = (/(.*)[.md]/g);
    let file = suffix.test(path) ? 'index.md' : '/index.md';
    path = hasExtension.test(path) ? path : (path + file);
    return path.replace(prefix, '');
  }
};

export default pathUtil;
