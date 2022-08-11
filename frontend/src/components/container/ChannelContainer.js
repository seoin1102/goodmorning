import React, { useEffect, useCallback } from 'react';
import { get, post } from '../../apis/Axios';
import { useSelector, useDispatch } from 'react-redux';
import { setChannel, addChannel, deleteChannel } from '../../redux/channel';
/**
 * 
 * @returns 채널리스트(모달)
 */
function ChannelContainer() {
    const dispatch = useDispatch();
    const channels = useSelector(state => state.channel)

    const initialChannel = useCallback(async(userNo) => {
        const getChannels = await get(`/channel/${userNo}`);
        dispatch(setChannel(getChannels));
    })

    useEffect(() => {
        initialChannel(1);
    }, [])

    return (
        <div>
            {channels.map((channel, index) => <p key={index} >{channel.name}</p>)}
        </div>
    );
}

export default ChannelContainer;