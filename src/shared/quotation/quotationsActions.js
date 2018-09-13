import QuotationsApi from './quotationsApi'

export const REQUEST_QUOTATIONS = 'REQUEST_QUOTATIONS';
export const RECEIVE_QUOTATIONS = 'RECEIVE_QUOTATIONS';
export const INVALIDATE_QUOTATIONS = 'INVALIDATE_QUOTATIONS';

export const requestQuotations = () => {
    return {
        type:'REQUEST_QUOTATIONS',
    }
};

export const receiveQuotations = (Items) => {
    return {
        type:'RECEIVE_QUOTATIONS',
        Items
    }
};

export const invalidateQuotations = () => {
    return {
        type:'INVALIDATE_QUOTATIONS'
    }
};

export function fetchQuotations() {
    return function (dispatch) {
        dispatch(requestQuotations())

        return QuotationsApi.getQuotations()
            .then(QuotationsResponse => {
                return dispatch(receiveQuotations(QuotationsResponse))
            })
            .catch(QuotationsError => {
                return dispatch(invalidateQuotations())
            })
    }
}