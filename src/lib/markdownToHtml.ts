import remark from 'remark';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(require('remark-html'))
    .use(require('remark-prism'))
    .process(markdown);
  return result.toString();
}
