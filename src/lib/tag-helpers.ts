import { Tag } from '../enums/tag';

export function getTagTitle(tag: string) {
  switch (tag) {
    case Tag.Android:
      return 'Android';
    case Tag.Angular:
      return 'Angular';
    case Tag.Bootstrap:
      return 'Bootstrap';
    case Tag.CSharp:
      return 'C#';
    case Tag.Jest:
      return 'Jest';
    case Tag.MySQL:
      return 'MySQL';
    case Tag.NetCore:
      return 'Net Core';
    case Tag.NestJS:
      return 'NestJS';
    case Tag.NextJS:
      return 'NextJS';
    case Tag.ReactJS:
      return 'ReactJS';
    case Tag.Redux:
      return 'Redux';
    case Tag.SqlServer:
      return 'Sql Server';
    case Tag.TypeScript:
      return 'TypeScript';
    case Tag.Windows10:
      return 'Windows10';
    case Tag.WSL:
      return 'WSL';
    case Tag.Xamarin:
      return 'Xamarin';
    case Tag.Yarn:
      return 'Yarn';

    default:
      throw new Error(`Invalid tag: ${tag}`);
  }
}
