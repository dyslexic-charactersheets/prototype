const copyrightAttribution = `<div class='copyright-attribution'><p>
<b>&copy; Marcus Downing &nbsp; <a href='https://www.dyslexic-charactersheets.com/'>dyslexic-charactersheets.com</a></b>
<span>This character sheet uses trademarks and/or copyrights owned by Paizo Publishing, LLC, which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This character sheet is not published, endorsed, or specifically approved by Paizo Publishing. For more information about Paizo's Community Use Policy, please visit <a href='http://paizo.com/communityuse'>paizo.com/communityuse</a>. For more information about Paizo Publishing and Paizo products, please visit <a href='http://paizo.com'>paizo.com</a>.</span>        
</p></div>`;

var nextPageNumber = 1;

register('page', {
    numbered: true,
    id: null,
}, args => {
    var id = elementID('page', args.id);
    var cls = elementClass('page', null, args, [ 'balanced' ]);

    var pageNumber = args.numbered ? `<div class='page-number'>${nextPageNumber++}</div>` : '';
    
    return `
<div${id}${cls}>
${copyrightAttribution}${pageNumber}${render(args.contents)}
</div>
`;
});