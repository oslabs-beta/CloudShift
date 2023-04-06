import React, { useEffect } from 'react';
import {
  updateDestinationAccessId,
  updateDestinationSecretKey,
  updateAccountId,
  updateDestinationBuckets,
  updateDestinationBucketLoading
} from '../slice';
import { useDispatch, useSelector } from 'react-redux';
import BucketSelect from './BucketSelect';
import aws_edited from '../public/aws_edited.png'
import cloudflare_edited from '../public/cloudflare_edited.png'


const Destination = (props) => {
  const dispatch = useDispatch();
  const { origin, destination } = useSelector((state) => state.GUI);

  let bucketSelect;

  const requireAccountId = props.name === 'Cloudflare' ? true : false;

  if (!requireAccountId) {
    bucketSelect = destination.accessId && destination.secretKey && (
      <BucketSelect remote={'destination'}></BucketSelect>
    );
  } else {
    bucketSelect = destination.accessId &&
      destination.secretKey &&
      destination.accountId && (
        <BucketSelect remote={'destination'}></BucketSelect>
      );
  }

  useEffect(() => {
    if (destination.accessId && destination.secretKey) {
      dispatch(updateDestinationBucketLoading(true))
      if (destination.name === 'Cloudflare' && !destination.accountId) return;
      (async () => {
        const res = await fetch('/listBuckets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            accessId: destination.accessId,
            secretKey: destination.secretKey,
            serviceProvider: destination.name,
            accountId: destination.accountId
          })
        });
        const data = await res.json();
        console.log(data)
        dispatch(updateDestinationBuckets(data))
        dispatch(updateDestinationBucketLoading(false));
      })();
    }
  }, [
    destination.accessId,
    destination.secretKey,
    destination.name,
    destination.accountId
  ]);

  return (
    <>
      <div>
        <div class="relative z-0 w-4/5 mb-6 group text-center text-lg">
          {!destination.name ?
            null :
            <img src={destination.name === 'AWS' ?
              aws_edited :
              cloudflare_edited} >
            </img>
          }
          Destination
          {props.name && (
            <>
              : {props.name} {props.service}
            </>
          )}
        </div>

        <div class="relative z-0 w-4/5 mb-6 group">
          <input
            type="key"
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            name="destAccessId"
            id="destinationAccessId"
            onChange={(e) => {
              const newState = props.accessIdHandler(e, origin, destination);
              dispatch(updateDestinationAccessId(newState));
            }}
          ></input>
          <label
            htmlFor="destAccessId"
            for="destinationAccessId"
            class="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Access ID{destination.accessId ? <>{' \u2705'}</> : <></>}
          </label>
        </div>

        <div class="block relative z-0 w-4/5 mb-6 group">
          <input
            class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            type="key"
            name="destSecretKey"
            id="destSecretKey"
            onChange={(e) => {
              const newState = props.secretKeyHandler(e, origin, destination);
              dispatch(updateDestinationSecretKey(newState));
            }}
          ></input>

          <label
            htmlFor="destSecretKey"
            for="destSecretKey"
            class="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Secret Key{destination.secretKey ? <>{' \u2705'}</> : <></>}
          </label>
        </div>

        {props.name === 'Cloudflare' && (
          <div class="relative z-0 w-4/5 mb-6 group">
            <input
              class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-800 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              type="id"
              id="destAccountId"
              name="destAccountId"
              onChange={(e) => {
                const newState = props.accountIdHandler(
                  e,
                  origin,
                  destination,
                  props.remoteType
                );
                dispatch(updateAccountId(newState));
              }}
            ></input>
            <label
              for="destAccountId"
              class="peer-focus:font-medium absolute text-base duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Account ID {destination.accountId.length > 1 && <>{'\u2705'}</>}
            </label>
          </div>
        )}
        <div class="relative z-0 w-4/5 mb-6 group">{bucketSelect}</div>
      </div>
    </>
  );
};

export default Destination;
