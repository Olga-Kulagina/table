import React, {ChangeEvent, useState} from 'react';
import Search from 'antd/es/input/Search';

type TableSearchType = {
    onSearch: (value: string) => void
}

export const TableSearch = (props: TableSearchType) => {

    let [searchText, setSearchText] = useState<string>('')

    const onSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.currentTarget.value)
    }

    return (
        <div>
            <Search placeholder="Search" onSearch={props.onSearch}
                    enterButton value={searchText} onChange={onSearchInputChange}/>
        </div>
    )
}