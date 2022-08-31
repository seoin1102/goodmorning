import { getHtml } from './Axios2';

export const linkPreview = async (url) => {
    const html =await getHtml();
    console.log(html);
    const metaTagOGRegex = /<meta[^>]*(?:property=[ '"]*og:([^'"]*))?[^>]*(?:content=["]([^"]*)["])?[^>]*>/gi;
    const matches = html.match(metaTagOGRegex);
    const meta = {};
    
    if (matches) {
        const metaPropertyRegex = /<meta[^>]*property=[ "]*og:([^"]*)[^>]*>/i;
        const metaContentRegex = /<meta[^>]*content=[ "]([^"]*)[^>]*>/i;
        matches.map((item) => {
            const propertyMatch = metaPropertyRegex.exec(item);
            if (propertyMatch) {
                const property = metaPropertyRegex.exec(propertyMatch[0]);
                const content = metaContentRegex.exec(propertyMatch[0]);
                if (property && content) {
                    meta[property[1]] = content[1];
                }
            }
        });
    }

    return meta;
}