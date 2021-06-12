import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import shareBlack from './assets/share-black.svg'
import share from './assets/share.svg'

const Body = styled.div`
  position: fixed;
  z-index: 999;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100vh;
  background: rgba(46, 46, 46, 0.84);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`

const Message = styled.div`
  padding: 25px 10px 25px 10px;
  background: #F3DC1E;
  border-radius: 9px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 75px;
  color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Button = (() => {
  const Body = styled(motion.button)`
    padding: 0px;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 18px;
    width: 245px;
    height: 45px;
    background: #000000;
    border: 3px solid #000000;
    box-sizing: border-box;
    border-radius: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
  `

  const Text = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 35px;
    color: #F3DC1E;
  `

  const Img = styled.img`
    margin-left: 10px;
    height: 15px;
  `

  return ({ label, icon, onClick, style }) => {
    const [active, setActive] = useState(false)
    return (
      <Body
        style={style}
        animate={{ background: active ? '#000000' : '#F3DC1E' }}
        onClick={e => onClick(e)}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onTouchStart={() => setActive(true)}
        onTouchEnd={() => setActive(false)}
      >
        <Text style={{ color: active ? '#F3DC1E' : '#000000' }}>{label}</Text>
        <Img src={active ? icon[0] : icon[1] } />
      </Body>
    )
  }
})()

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

const ShareAlert = () => {
  const dispatch = useDispatch()
  const _share = useSelector(store => store.share)

  return _share
          ? (
            <Body onClick={() => dispatch({ type: 'hidden-share' })}>
              <Message>
                <Button
                  style={{ marginTop: '0px' }}
                  label='pinterest.com'
                  icon={[share, shareBlack]}
                  onClick={e => {
                    Share.pinterest('https://prohetamine.github.io/emoji-art', 'Emoji art — new art, images from emoji, art generator, send a picture of the art in your window', 'https://raw.githubusercontent.com/prohetamine/emoji-art/main/public/post.png')
                  }}
                />
                <Button
                  label='facebook.com'
                  icon={[share, shareBlack]}
                  onClick={e => {
                    Share.facebook('https://prohetamine.github.io/emoji-art', 'Emoji art', 'https://raw.githubusercontent.com/prohetamine/emoji-art/main/public/post.png', 'Emoji art — new art, images from emoji, art generator, send a picture of the art in your window')
                  }}
                />
                <Button
                  label='twitter.com'
                  icon={[share, shareBlack]}
                  onClick={e => {
                    Share.twitter('https://prohetamine.github.io/emoji-art', 'Emoji art — new art, images from emoji, art generator, send a picture of the art in your window')
                  }}
                />
                <Button
                  label='vk.com'
                  icon={[share, shareBlack]}
                  onClick={e => {
                    Share.vkontakte('https://prohetamine.github.io/emoji-art', 'Emoji art', 'https://raw.githubusercontent.com/prohetamine/emoji-art/main/public/post.png', 'Emoji art — new art, images from emoji, art generator, send a picture of the art in your window')
                  }}
                />
                <Button
                  label='ok.ru'
                  icon={[share, shareBlack]}
                  onClick={e => {
                    Share.odnoklassniki('https://prohetamine.github.io/emoji-art', 'Emoji art', 'https://raw.githubusercontent.com/prohetamine/emoji-art/main/public/post.png', 'Emoji art — new art, images from emoji, art generator, send a picture of the art in your window')
                  }}
                />
                <Button
                  label='mail.ru'
                  icon={[share, shareBlack]}
                  onClick={e => {
                    Share.mailru('https://prohetamine.github.io/emoji-art', 'Emoji art', 'https://raw.githubusercontent.com/prohetamine/emoji-art/main/public/post.png', 'Emoji art — new art, images from emoji, art generator, send a picture of the art in your window')
                  }}
                />
              </Message>
            </Body>
          )
          : null
}

export default ShareAlert