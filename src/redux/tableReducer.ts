import {Dispatch} from 'redux';
import {tableAPI} from '../api/api';

type SetTableDataType = ReturnType<typeof setTableData>
type SetIsTableLoadingType = ReturnType<typeof setIsTableLoading>

type ActionsType = SetTableDataType | SetIsTableLoadingType
type TableReducerStateType = typeof initialState

const initialState = {
    tableData: [],
    isTableLoading: false
}

export const tableReducer = (state: TableReducerStateType = initialState, action: ActionsType): TableReducerStateType => {
    switch (action.type) {
        case 'SET_TABLE_DATA': {
            return {...state, tableData: action.tableData}
        }
        case 'SET_IS_TABLE_LOADING': {
            return {...state, isTableLoading: action.isTableLoading}
        }
        default:
            return state;
    }
}

export const setTableData = (tableData: any) => {
    return {type: 'SET_TABLE_DATA', tableData} as const
}
export const setIsTableLoading = (isTableLoading: boolean) => {
    return {type: 'SET_IS_TABLE_LOADING', isTableLoading} as const
}

export const getSmallTableThunkCreator = () => (dispatch: Dispatch) => {
    dispatch(setIsTableLoading(true))
    tableAPI.getSmallTable()
        .then((res) => {
            dispatch(setTableData(res.data))
        })
        .catch((err) => {
            console.error('Some error occur')
        })
        .finally(() => {
            dispatch(setIsTableLoading(false))
        })
}

