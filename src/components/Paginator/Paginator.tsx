import React, {useState} from 'react';
import {Button} from 'antd';

type PaginatorPropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

export const Paginator: React.FC<PaginatorPropsType> = (props) => {
//Количество страниц (кнопок)
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize)
//Массив кнопок
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
//Количество отображаемых кнопок в пагинаторе
    let portionCount = Math.ceil(pagesCount / props.portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber - 1) * props.portionSize + 1
    let rightPortionPageNumber = portionNumber * props.portionSize

    return (
        <div style={{textAlign: 'center'}}>
            <Button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}
                    disabled={portionNumber === 1}>Prev
            </Button>
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p, index) =>
                    <Button key={index} type={p === props.currentPage ? 'primary' : 'default'}
                             onClick={() => {
                        props.onPageChanged(p)
                    }}>{p}</Button>
                )}
            <Button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}
                    disabled={portionNumber === portionCount}>Next
            </Button>
        </div>
    )
}