import remark from 'remark';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(require('remark-html'))
    .use(require('remark-prism'), {
      plugins: ['line-numbers', 'treeview'],
    })
    .process(markdown);
  return result.toString();
}
