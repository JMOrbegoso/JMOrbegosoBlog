import { PostTag } from '../enums/postTag';

export function getTagTitle(tag: string) {
  switch (tag) {
    case PostTag.Android:
      return 'Android';
    case PostTag.Angular:
      return 'Angular';
    case PostTag.Bootstrap:
      return 'Bootstrap';
    case PostTag.CSharp:
      return 'C#';
    case PostTag.Jest:
      return 'Jest';
    case PostTag.MySQL:
      return 'MySQL';
    case PostTag.NetCore:
      return 'Net Core';
    case PostTag.NestJS:
      return 'NestJS';
    case PostTag.NextJS:
      return 'NextJS';
    case PostTag.ReactJS:
      return 'ReactJS';
    case PostTag.Redux:
      return 'Redux';
    case PostTag.SqlServer:
      return 'Sql Server';
    case PostTag.TypeScript:
      return 'TypeScript';
    case PostTag.Windows10:
      return 'Windows10';
    case PostTag.WSL:
      return 'WSL';
    case PostTag.Xamarin:
      return 'Xamarin';
    case PostTag.Yarn:
      return 'Yarn';

    default:
      throw new Error(`Invalid tag: ${tag}`);
  }
}
