import React from 'react';
import { useDispatch } from 'react-redux';
import awsIcon from '../public/aws_edited.png'
import cloudflareIcon from '../public/cloudflare_edited.png'
import {updateOriginName} from '../slice'

const RemoteSelection = (props) => {
    const dispatch = useDispatch()

  const changeSourceHandler = (e) => {
    const value = e.target.id
     dispatch(updateOriginName(value))
  }

  return (
    <>
    <h1>{props.source}</h1>
   <button typeof='button' onClick={changeSourceHandler}><img id='AWS' src={awsIcon} alt='aws'></img>AWS</button>
   <button typeof='button' onClick={changeSourceHandler}><img id='Cloudflare' src={cloudflareIcon} alt='cloudflare'></img>Cloudflare</button>
   <button typeof='button' onClick={changeSourceHandler}><img id='azureblob' src={awsIcon} alt='azure'></img>MS Azure</button>
    </>

  )
};

export default RemoteSelection;
