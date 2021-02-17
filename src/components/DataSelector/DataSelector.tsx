import React from 'react'
import {Button} from 'antd';
import {getBigTableThunkCreator, getSmallTableThunkCreator, setIsDataSelected} from '../../redux/tableReducer';
import {useDispatch} from 'react-redux';

export const DataSelector = () => {
    const dispatch = useDispatch()

    const onSmallBtnClick = () => {
        dispatch(setIsDataSelected(true))
        dispatch(getSmallTableThunkCreator())
    }
    const onBigBtnClick = () => {
        dispatch(setIsDataSelected(true))
        dispatch(getBigTableThunkCreator())
    }



    return (
        <div>
            <p>Select dataset</p>
            <Button onClick={onSmallBtnClick}>Small</Button>
            <Button onClick={onBigBtnClick}>Big</Button>
        </div>
    )
}