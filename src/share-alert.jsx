import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

const Body = styled.div`
  position: absolute;
  z-index: 999;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(46, 46, 46, 0.84);
  display: flex;
  justify-content: center;
  align-items: center;
`

const Message = styled.div`
  width: 330px;
  height: 143px;
  background: #F3DC1E;
  border-radius: 9px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 64px;
  line-height: 75px;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
`

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
	odnoklassniki: function(purl, text) {
		let url  = 'http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1';
		url += '&st.comments=' + encodeURIComponent(text);
		url += '&st._surl='    + encodeURIComponent(purl);
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

	popup: function(url) {
		window.open(url, '', 'toolbar=0,status=0,width=626,height=436')
	}
}

const ShareAlert = () => {
  return null /*(
    <Body>
      <Message>
        <div onClick={() => Share.vkontakte('https://prohetamine.github.io/emoji-art', 'Emoji art', 'IMG_PATH', 'Emoji art — new art, images from emoji, art generator, send a picture of the art in your window')}>vk</div>
        <div onClick={() => Share.odnoklassniki('https://prohetamine.github.io/emoji-art', 'Emoji art', 'IMG_PATH', 'Emoji art — new art, images from emoji, art generator, send a picture of the art in your window')}>ok</div>
        <div onClick={() => Share.twitter('https://prohetamine.github.io/emoji-art', 'Emoji art', 'IMG_PATH', 'Emoji art — new art, images from emoji, art generator, send a picture of the art in your window')}>twitter</div>
        <div onClick={() => Share.facebook('https://prohetamine.github.io/emoji-art', 'Emoji art — new art, images from emoji, art generator, send a picture of the art in your window')}>facebook</div>
        <div onClick={() => Share.mailru('https://prohetamine.github.io/emoji-art', 'Emoji art — new art, images from emoji, art generator, send a picture of the art in your window')}>mailru</div>
      </Message>
    </Body>
  )*/
}

export default ShareAlert
