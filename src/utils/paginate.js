import _ from 'lodash';

// This function takes an array, page number, and page size to determine the exact array used for pagination
export function paginate(items, pageNumber, pageSize) {
    const startIndex = (pageNumber - 1) * pageSize;

    //use lodash to chain a conversion, slice array, take items, convert back
    return _(items)
    .slice(startIndex)
    .take(pageSize)
    .value();
}