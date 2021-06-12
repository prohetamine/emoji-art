const Share = {
	vkontakte: function(purl, ptitle, pimg, text) {
		let url  = 'http://vkontakte.ru/share.php?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&image='       + encodeURIComponent(pimg);
		url += '&noparse=true';
		Share.popup(url);
	},
	odnoklassniki: function(purl, ptitle, pimg, text) {
	  let url  = 'https://connect.ok.ru/offer?'
    url += 'url='           + encodeURIComponent(purl)
    url += '&title='        + encodeURIComponent(ptitle)
    url += '&description='  + encodeURIComponent(text)
    url += '&imageUrl='     + encodeURIComponent(pimg)
		Share.popup(url);
	},
	facebook: function(purl, ptitle, pimg, text) {
		let url  = 'http://www.facebook.com/sharer.php?s=100';
		url += '&p[title]='     + encodeURIComponent(ptitle);
		url += '&p[summary]='   + encodeURIComponent(text);
		url += '&p[url]='       + encodeURIComponent(purl);
		url += '&p[images][0]=' + encodeURIComponent(pimg);
		Share.popup(url);
	},
	twitter: function(purl, ptitle) {
		let url  = 'http://twitter.com/share?';
		url += 'text='      + encodeURIComponent(ptitle);
		url += '&url='      + encodeURIComponent(purl);
		url += '&counturl=' + encodeURIComponent(purl);
		Share.popup(url);
	},
	mailru: function(purl, ptitle, pimg, text) {
		let url  = 'http://connect.mail.ru/share?';
		url += 'url='          + encodeURIComponent(purl);
		url += '&title='       + encodeURIComponent(ptitle);
		url += '&description=' + encodeURIComponent(text);
		url += '&imageurl='    + encodeURIComponent(pimg);
		Share.popup(url)
	},
	pinterest: function(purl, text, pimg) {
		let url  = 'https://www.pinterest.ru/pin-builder?'
		url += 'url='          + encodeURIComponent(purl)
		url += '&description=' + encodeURIComponent(text)
		url += '&media='    + encodeURIComponent(pimg)
		url += '&method=link'
		Share.popup(url)
	},
	popup: function(url) {
		window.open(url, '', 'toolbar=0,status=0,width=626,height=436')
	}
}

module.exports = Share
