import { PostTag } from './enums/postTag';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faNode,
  faReact,
  faAngular,
  faYarn,
  faLinux,
} from '@fortawesome/free-brands-svg-icons';

library.add(faNode, faReact, faAngular, faYarn, faLinux);

export function getTagTitle(tag: string) {
  switch (tag) {
    case PostTag.Node:
      return 'Node JS';
    case PostTag.React:
      return 'React JS';
    case PostTag.Angular:
      return 'Angular';
    case PostTag.Yarn:
      return 'Yarn';
    case PostTag.WSL:
      return 'WSL';

    default:
      throw new Error(`Invalid tag: ${tag}`);
  }
}

export function getFontAwesomeIcon(tag: string) {
  switch (tag) {
    case PostTag.Node:
      return faNode;
    case PostTag.React:
      return faReact;
    case PostTag.Angular:
      return faAngular;
    case PostTag.Yarn:
      return faYarn;
    case PostTag.WSL:
      return faLinux;

    default:
      throw new Error(`Invalid tag: ${tag}`);
  }
}
