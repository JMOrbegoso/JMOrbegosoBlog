import remark from 'remark';
import { TABLE_OF_CONTENT_KEYWORDS } from './constants';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(require('remark-html'))
    .use(require('remark-slug'))
    .use(require('remark-autolink-headings'))
    .use(require('remark-toc'), {
      heading: TABLE_OF_CONTENT_KEYWORDS.join('|'),
    })
    .use(require('remark-prism'), {
      plugins: ['line-numbers', 'treeview'],
    })
    .process(markdown);
  return result.toString();
}
