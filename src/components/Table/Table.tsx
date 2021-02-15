import {Spin, Table} from 'antd';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getSmallTableThunkCreator} from '../../redux/tableReducer';
import {AppRootStateType} from '../../redux/redux-store';


export const UsersTable = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSmallTableThunkCreator())
    }, [dispatch])
//Тестовые пользователи для таблицы
    let testData = [
        {
            "id": 274,
            "firstName": "Sangita",
            "lastName": "Jessica",
            "email": "GCoggins@lacus.org",
            "phone": "(888)759-1115",
            "address": {
                "streetAddress": "2122 Adipiscing Ct",
                "city": "Philadelphia",
                "state": "IL",
                "zip": "11243"
            },
            "description": "ipsum facilisis consequat magna nec amet nullam mi convallis ac vitae velit nec augue massa vel elit malesuada eget nunc lacus mattis dolor lacus nullam pharetra mattis libero vel lorem aliquam augue"
        },
        {
            "id": 638,
            "firstName": "Corey",
            "lastName": "Maddalone",
            "email": "PWilliamson@vestibulum.ly",
            "phone": "(371)506-4152",
            "address": {
                "streetAddress": "754 Placerat St",
                "city": "New Port Richey",
                "state": "IA",
                "zip": "25145"
            },
            "description": "convallis amet amet nullam placerat sit vestibulum dolor tellus massa vitae nec mattis hendrerit tellus hendrerit elit tincidunt et sit convallis et at at lacus molestie ipsum aenean ipsum odio amet sapien"
        }
    ]

    let tableData = useSelector<AppRootStateType, any>(state => state.table.tableData)
    let isTableLoading = useSelector<AppRootStateType, boolean>(state => state.table.isTableLoading)

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'First name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'Last name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
    ]

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            {isTableLoading ?
                <Spin style={{marginTop: '100px'}}/> :
                <Table dataSource={tableData} columns={columns} rowKey={'phone'} pagination={false}/>
            }
        </div>
    );
}