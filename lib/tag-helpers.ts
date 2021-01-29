import { PostTag } from '../src/enums/postTag';

export function getTagTitle(tag: string) {
  switch (tag) {
    case PostTag.Angular:
      return 'Angular';
    case PostTag.Bootstrap:
      return 'Bootstrap';
    case PostTag.Jest:
      return 'Jest';
    case PostTag.MySQL:
      return 'MySQL';
    case PostTag.NestJS:
      return 'NestJS';
    case PostTag.NextJS:
      return 'NextJS';
    case PostTag.ReactJS:
      return 'ReactJS';
    case PostTag.Redux:
      return 'Redux';
    case PostTag.TypeScript:
      return 'TypeScript';
    case PostTag.WSL:
      return 'WSL';
    case PostTag.Yarn:
      return 'Yarn';

    default:
      throw new Error(`Invalid tag: ${tag}`);
  }
}
