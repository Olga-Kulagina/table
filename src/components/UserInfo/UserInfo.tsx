import React from 'react';
import {UserType} from '../UsersTable/UsersTable';

type UserInfoType = {
    userData: UserType
}

export const UserInfo = (props: UserInfoType) => {

    let user = {...props.userData}

    return (
        <div>
            <p>Выбран пользователь <b>{`${user.firstName} ${user.lastName}`}</b></p>
            <p>Описание:</p>
            <p><textarea value={user.description} readOnly></textarea></p>
            <p>Адрес проживания: <b>{user.address.streetAddress}</b></p>
            <p>Город: <b>{user.address.city}</b></p>
            <p>Провинция/штат: <b>{user.address.state}</b></p>
            <p>Индекс: <b>{user.address.zip}</b></p>
        </div>
    )
}