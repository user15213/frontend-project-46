import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const form = (tree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(tree);
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    default:
      throw new Error(
        `format ${format} not supported. Choose 'stylish', 'plain' or 'json'`,
      );
  }
};
export default form;
