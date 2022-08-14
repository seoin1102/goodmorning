import React, { useEffect, useCallback } from 'react';
import { get, post } from '../../apis/Axios';
import { useSelector, useDispatch, shallowEqual  } from 'react-redux';
import { setCrew, addCrew, deleteCrew } from '../../redux/crew';
import Grid from '@mui/material/Grid';
import '../../styles/scss/modal/modal.scss';
import NavigationCrew from './navigation/NavigationCrew';
import NavigationDM from './navigation/NavigationDM';
import NavigationEct from './navigation/NavigationEct';

function Navigation() {
    const dispatch = useDispatch();
    const crewList = useSelector(state => (state.crew), shallowEqual);

    /**
     * 크루 목록
     * @param channelNo 채널 번호
     */
    const initialChannel = useCallback(async(channelNo) => {
        const crews = await get(`/crew/${channelNo}`);
        dispatch(setCrew(crews));
    }, [dispatch])

    /**
     * 크루 생성
     * @param {*} channelNo 크루를 생성할 채널 번호
     * @param {*} crew 생성할 크루 데이터
     */
    const onCreateCrew = useCallback(async(channelNo, crew) => {
        await post(`/crew/${channelNo}`, crew);
        dispatch(addCrew(crew));
    }, [dispatch])

    /**
     * 초기 화면
     */
    useEffect(() => {
        initialChannel(2);
        console.log("mount");
        return () => (console.log('unmount'))
    }, [])

    return (
    <>
        <Grid item xs={2} style={{ height: '840px'}}>
            <NavigationEct onCreate={onCreateCrew} />
            <NavigationCrew crewList={crewList} />
            <NavigationDM />
        </Grid>
    </>
    );
}

export default React.memo(Navigation);